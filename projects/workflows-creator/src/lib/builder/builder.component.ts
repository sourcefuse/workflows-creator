import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  output,
  effect,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
  ViewChild,
  ViewContainerRef,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  isSelectInput,
  Statement,
  StatementNode,
  WorkflowAction,
  WorkflowEvent,
  WorkflowPrompt,
} from '../classes';
import {AbstractBaseGroup} from '../classes/nodes';
import {BuilderService, ElementService, NodeService} from '../classes/services';
import {
  ActionTypes,
  ConditionTypes,
  EventTypes,
  LocalizedStringKeys,
  NodeTypes,
  NotificationRecipientTypesEnum,
  ValueTypes,
} from '../enum';
import {InvalidEntityError} from '../errors/base.error';
import {
  ActionAddition,
  ActionWithInput,
  AllowedValues,
  AllowedValuesMap,
  ElementsWithInput,
  EventAddition,
  EventWithInput,
  InputChanged,
  NodeWithInput,
  RecordOfAnyType,
  Select,
  StateMap,
  WorkflowNode,
} from '../types';
import {LocalizationProviderService} from '../services/localization-provider.service';
import {LocalizationPipe} from '../pipes/localization.pipe';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {GroupComponent} from './group/group.component';
import {NodeComponent} from './node/node.component';
import {TooltipRenderComponent} from './tooltip-render/tooltip-render.component';
@Component({
  selector: 'workflow-builder',
  templateUrl: './builder.component.html',
  styleUrls: [
    './builder.component.scss',
    '../../assets/icons/icomoon/style.css',
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    GroupComponent,
    LocalizationPipe,
  ],
  providers: [LocalizationPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderComponent<E> implements OnInit {
  private previousDiagram = '';
  private previousState: StateMap<RecordOfAnyType> | null = null;
  private previousLocalizedStringMap: RecordOfAnyType | null = null;
  private isInitialized = false;

  constructor(
    private injector: Injector,
    private readonly builder: BuilderService<E, RecordOfAnyType>,
    private readonly nodes: NodeService<E>,
    private readonly elements: ElementService<E>,
    private readonly cdr: ChangeDetectorRef,
    private readonly localizationSvc: LocalizationProviderService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {
    // Effect to handle input changes similar to ngOnChanges
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const currentLocalizedStringMap = this.localizedStringMap();
        const currentDiagram = this.diagram();
        const currentState = this.state();

        // Handle localizedStringMap changes (after initialization)
        if (
          this.isInitialized &&
          currentLocalizedStringMap &&
          currentLocalizedStringMap !== this.previousLocalizedStringMap &&
          Object.keys(currentLocalizedStringMap).length > 0
        ) {
          this.handleLocalizedStringMapChange(currentLocalizedStringMap);
          this.previousLocalizedStringMap = currentLocalizedStringMap;
        }

        // Handle diagram and state changes (after initialization)
        if (
          this.isInitialized &&
          currentDiagram &&
          currentState &&
          (currentDiagram !== this.previousDiagram ||
            currentState !== this.previousState)
        ) {
          this.handleDiagramAndStateChange(currentDiagram, currentState);
          this.previousDiagram = currentDiagram;
          this.previousState = currentState;
        }
      });
    });
  }

  state = input<StateMap<RecordOfAnyType>>({});

  localizedStringMap = input<RecordOfAnyType>({});

  diagram = input('');

  templateMap = input<{[key: string]: TemplateRef<RecordOfAnyType>}>({});

  allColumns = input<Select[]>([]);

  stateChange = output<StateMap<RecordOfAnyType>>();

  diagramChange = output<Object>();

  eventAdded = output<EventAddition<E>>();

  actionAdded = output<ActionAddition<E>>();

  itemChanged = output<InputChanged<E>>();
  selectedElseActions: ActionWithInput<E>[] = [];
  selectedEvents: EventWithInput<E>[] = [];
  selectedActions: ActionWithInput<E>[] = [];
  eventGroups: AbstractBaseGroup<E>[] = [];
  actionGroups: AbstractBaseGroup<E>[] = [];
  elseActionGroups: AbstractBaseGroup<E>[] = [];
  nodeList: AbstractBaseGroup<E>[] = [];
  processId: string;
  // sonarignore:start
  // TODO: Refactor this code to be more flexible
  // sonarignore:start
  elseBlockHidden = false;
  elseBlockRemoved = false;
  public types = NodeTypes;
  localizedStringKeys = LocalizedStringKeys;

  private overlayRef: OverlayRef | null = null;
  @ViewChild('nodePopupTemplate') nodePopupTemplate: TemplateRef<any>;

  /**
   * We're getting all the groups from the node service, and then we're adding them to the list of groups
   */
  ngOnInit(): void {
    this.initiateNode();
    // Set initial values
    this.previousLocalizedStringMap = this.localizedStringMap();
    this.previousDiagram = this.diagram();
    this.previousState = this.state();
    // Mark as initialized to enable effect-based change detection
    this.isInitialized = true;
  }

  initiateNode() {
    this.localizationSvc.setLocalizedStrings(this.localizedStringMap());
    this.eventGroups = [];
    this.actionGroups = [];
    this.elseActionGroups = [];
    this.nodes
      .getGroups(true, NodeTypes.EVENT)
      .forEach(group => this.onGroupAdd(group));
    this.nodes
      .getGroups(true, NodeTypes.ACTION)
      .forEach(group => this.onGroupAdd(group));
    this.nodes
      .getGroups(true, NodeTypes.ACTION, true)
      .forEach(group => this.elseActionGroups.push(group));
    this.cdr.detectChanges();
  }

  /**
   * Handle changes to localizedStringMap
   */
  private handleLocalizedStringMapChange(localizedStringMap: RecordOfAnyType) {
    if (localizedStringMap && Object.keys(localizedStringMap).length > 0) {
      this.initiateNode();
      this.updateDiagram();
    }
  }

  /**
   * Handle changes to diagram and state
   */
  private async handleDiagramAndStateChange(
    diagram: string,
    state: StateMap<RecordOfAnyType>,
  ) {
    if (
      diagram &&
      typeof diagram === 'string' &&
      diagram.trim().length > 0 &&
      state &&
      Object.keys(state).length > 0
    ) {
      const {
        events,
        actions,
        elseActions,
        groups,
        process,
        state: restoredState,
      } = await this.builder.restore(diagram);
      this.processId = process.id;
      this.selectedActions = actions;
      this.selectedEvents = events;
      this.selectedElseActions = elseActions;
      if (this.selectedActions.length) this.actionGroups = [];
      if (this.selectedEvents) this.eventGroups = [];
      groups.forEach(group => this.onGroupAdd(group));
      this.restoreState(restoredState);
      this.elseActionGroups[0].children = elseActions;
      this.elseActionGroups[0].children.forEach(action =>
        this.actionAdded.emit({
          name: action.node.getIdentifier(),
          action: action.node as WorkflowAction<E>,
        }),
      );
      events.forEach(event => {
        const groupId = event.node.groupId;
        this.eventGroups.forEach(group => {
          if (group.id === groupId) {
            group.children.push(event);
          }
        });
        this.eventAdded.emit({
          name: event.node.getIdentifier(),
          event: event.node,
        });
      });
      actions.forEach(action => {
        const groupId = action.node.groupId;
        this.actionGroups.forEach(group => {
          if (group.id === groupId) {
            group.children.push(action);
          }
        });
        this.actionAdded.emit({
          name: action.node.getIdentifier(),
          action: action.node as WorkflowAction<E>,
        });
      });
      this.updateDiagram();
      this.hideElseBlockIfRequired();
    }
  }
  /**
   * This function checks if the else block should be hidden based on the type and number of events in
   * the event group.
   */

  hideElseBlockIfRequired() {
    const events = this.eventGroups[0].children;
    const firstEvent = events[0]?.node;

    if (events.length !== 1 || !firstEvent) {
      this.elseBlockHidden = false;
      return;
    }

    // let value = firstEvent.state.get('value');
    let value = events.length > 0 ? firstEvent?.state.get('value') : undefined;

    if (typeof value === 'object') {
      value = value.value;
    }

    const eventType = firstEvent.getIdentifier();
    const eventValue = firstEvent.state.get('value');
    const eventValueType = firstEvent.state.get('valueType');

    this.elseBlockHidden =
      eventType === EventTypes.OnIntervalEvent ||
      eventType === EventTypes.OnAddItemEvent ||
      (eventType === EventTypes.OnChangeEvent &&
        (eventValue === ValueTypes.AnyValue ||
          eventValueType === ValueTypes.AnyValue));
  }

  /**
   * If the group is an event, add it to the eventGroups array, otherwise if it's an action, add it to
   * the actionGroups array
   * @param group - AbstractBaseGroup<E>
   */
  onGroupAdd(group: AbstractBaseGroup<E>) {
    if (group.nodeType === NodeTypes.EVENT) {
      this.eventGroups.push(group);
    } else if (group.nodeType === NodeTypes.ACTION) {
      this.actionGroups.push(group);
    } else {
      throw new Error('Invalid Group');
    }
  }
  /**
   * The function takes in an index number, and then removes the event group at that index from the
   * eventGroups array
   * @param {number} index - The index of the group to remove.
   */
  onGroupRemove(index: number) {
    this.eventGroups.splice(index, 1);
  }
  removeElseBlock() {
    this.elseBlockRemoved = true;
  }
  /**
   * The function is called when an event is added to the workflow. It emits an eventAdded event,
   * updates the diagram, updates the state, and shows the else block
   * @param event - ElementsWithInput<E>
   */
  onEventAdded(event: ElementsWithInput<E>) {
    this.eventAdded.emit({
      name: event.node.getIdentifier(),
      event: event.newNode.node as WorkflowEvent<E>,
    });
    this.updateDiagram();
    this.updateState(event.node, event.newNode.inputs);
    this.elseBlockHidden =
      !this.eventGroups[0]?.children?.length &&
      (event.node.getIdentifier() === EventTypes.OnIntervalEvent ||
        event.node.getIdentifier() === EventTypes.OnAddItemEvent);
  }
  /**
   * The function is called when an event is removed from the workflow.
   * Hides the else block when it is not needed.
   */
  onEventRemoved() {
    const events = this.eventGroups[0].children;
    this.elseBlockHidden =
      events.length === 1 &&
      (events[0].node.getIdentifier() === EventTypes.OnIntervalEvent ||
        events[0].node.getIdentifier() === EventTypes.OnAddItemEvent ||
        (events[0].node.getIdentifier() === EventTypes.OnChangeEvent &&
          (events[0].node.state.get('value') === ValueTypes.AnyValue ||
            events[0].node.state.get('valueType') === ValueTypes.AnyValue)));
    this.updateDiagram();
  }
  /**
   * When an action is added, emit an event with the name of the action and the action itself, update
   * the diagram, and update the state of the action
   * @param action - ElementsWithInput<E>
   */
  onActionAdded(action: ElementsWithInput<E>) {
    this.actionAdded.emit({
      name: action.node.getIdentifier(),
      action: action.newNode.node as WorkflowAction<E>,
    });
    this.updateDiagram();
    this.updateState(action.node, action.newNode.inputs);
    this.hideElseBlockIfRequired();
  }
  /**
   * The function is called when an item is changed in the UI. It emits an event to the parent
   * component, updates the state of the item, and updates the diagram
   * @param {RecordOfAnyType} item - RecordOfAnyType
   */
  onItemChanged(item: RecordOfAnyType) {
    this.itemChanged.emit({
      field: item.field,
      value: item.value,
      item: item.element.node,
    });
    this.updateState(item.element.node, item.element.inputs);
    this.hideElseBlockIfRequired();
    this.updateDiagram();
  }
  /**
   * "If the type is a group, then get the groups, otherwise throw an error."
   *
   * The above function is a good example of how to use the enum
   * @param {NodeTypes} type - The type of node to be added.
   * @param {MouseEvent} event - The click event from the trigger element
   */
  openPopup(type: NodeTypes, event?: MouseEvent) {
    if (type === NodeTypes.GROUP) {
      this.nodeList = this.nodes.getGroups();
      if (event && this.nodePopupTemplate) {
        this.openOverlay(event, this.nodePopupTemplate, {
          nodeList: this.nodeList,
        });
      }
    } else {
      throw new InvalidEntityError('' + type);
    }
  }

  /**
   * Opens an overlay at the trigger element position.
   * @param {MouseEvent} event - MouseEvent - The event that triggered the overlay to show.
   * @param {TemplateRef} template - The template to display in the overlay
   * @param {any} context - Context data to pass to the template
   */
  openOverlay(event: MouseEvent, template: TemplateRef<any>, context: any) {
    // Close existing overlay if open
    this.closeOverlay();

    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget as HTMLElement;

    // Create position strategy
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(target)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    // Create overlay
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    // Create portal from template
    const portal = new TemplatePortal(template, this.viewContainerRef, context);
    this.overlayRef.attach(portal);

    // Close overlay on backdrop click
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  /**
   * Closes the currently open overlay
   */
  closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  /**
   * It takes a state object, merges it with the current state, and then loops through the state object
   * and adds the values to the inputs
   * @param state - StateMap<RecordOfAnyType>
   */
  private restoreState(state: StateMap<RecordOfAnyType>) {
    state = this.mergeState(this.state(), state);
    const allNodes = [
      ...this.selectedEvents,
      ...this.selectedActions,
      ...this.selectedElseActions,
    ];
    Object.keys(state).forEach(nodeId => {
      const node = allNodes.find(n => n.node.id === nodeId);
      if (node) {
        node.inputs.forEach(input => {
          if (state[node.node.id]?.hasOwnProperty(input.inputKey)) {
            if (isSelectInput(input)) {
              this.addValue(
                node,
                input,
                {
                  [input.listValueField]: state[node.node.id][input.inputKey],
                  [input.listNameField]:
                    state[node.node.id][`${input.inputKey}Name`],
                },
                true,
              );
            } else {
              this.addValue(node, input, state[node.node.id][input.inputKey]);
            }
          }
        });
      }
    });
    this.cdr.detectChanges();
  }
  /**
   * It takes a node, an input, a value, and a boolean, and if the boolean is true and the input is a
   * select input, it sets the node's state to the value's listNameField, emits an event, sets the
   * value to the value's listValueField, and then calls the handleSubsequentInputs function, emits
   * another event, calls the updateState function, and calls the updateDiagram function
   * @param element - NodeWithInput<E> - this is the node that the user is currently editing.
   * @param {WorkflowPrompt} input - WorkflowPrompt - this is the input that was changed
   * @param {AllowedValues | AllowedValuesMap} value - AllowedValues | AllowedValuesMap
   * @param [select=false] - boolean - if true, the value is a map of values, and the value to be set
   * is the value of the listValueField
   */
  addValue(
    element: NodeWithInput<E>,
    input: WorkflowPrompt,
    value: AllowedValues | AllowedValuesMap,
    select = false,
  ) {
    if (select && isSelectInput(input)) {
      element.node.state.change(
        `${input.inputKey}Name`,
        (value as AllowedValuesMap)[input.listNameField],
      );
      this.itemChanged.emit({
        field: input.getIdentifier(),
        value: (value as AllowedValuesMap)[input.listValueField],
        item: element.node,
      });
      value = (value as AllowedValuesMap)[input.listValueField];
    }
    element.node.state.change(input.inputKey, value);
    this.handleSubsequentInputs(element, input);
    this.itemChanged.emit({
      field: input.getIdentifier(),
      value: value,
      item: element.node,
    });
    this.updateState(element.node, element.inputs);
    this.updateDiagram();
  }
  /**
   * It takes the state of the workflow and creates a new statement from it
   * @returns A function that takes a state and returns a boolean.
   */
  build() {
    const statement = new Statement<E>(this.state());
    const elseStatement = new Statement<E>(this.state());
    if (this.processId) {
      statement.processId = this.processId;
    }
    [...this.eventGroups, ...this.actionGroups].forEach(group => {
      if (group.name === 'and') {
        group.children
          .map(e => e.node)
          .forEach(node => {
            node.elements.forEach(element => {
              const instance = this.elements.createInstanceByName(element);
              statement.addNode(instance, node);
            });
          });
      } else if (group.name === 'or') {
        const statementNodes: StatementNode<E>[] = [];
        const elseNode = new StatementNode(
          this.elements.createInstanceByName('OrGatewayElement'),
        );
        group.children
          .map(e => e.node)
          .forEach(node => {
            node.elements.forEach(element => {
              const instance = this.elements.createInstanceByName(element);
              statementNodes.push(new StatementNode(instance, node));
            });
            elseNode.workflowNode = node;
          });
        statement.addNodes(statementNodes, elseNode);
      } else {
        throw new Error('Invalid Node type');
      }
    });
    if (this.elseActionGroups[0].children.length > 0) {
      this.elseActionGroups.forEach(group => {
        group.children
          .map(e => e.node)
          .forEach(node => {
            node.elements.forEach(element => {
              const instance = this.elements.createInstanceByName(element);
              elseStatement.addNode(instance, node);
            });
          });
      });
    }
    return this.builder.build(statement, elseStatement);
  }
  /**
   * It builds a new diagram, emits the new diagram, and then tells Angular to update the view
   */
  async updateDiagram() {
    const nodes = [
      ...this.eventGroups[0].children,
      ...this.actionGroups[0].children,
      ...this.elseActionGroups[0].children,
    ];
    let isValid =
      !!this.eventGroups[0].children.length &&
      (!!this.actionGroups[0].children.length ||
        !!this.elseActionGroups[0].children.length);
    if (isValid) {
      for (const node of nodes) {
        switch (node.node.getIdentifier()) {
          case EventTypes.OnChangeEvent:
          case EventTypes.OnValueEvent:
          case ActionTypes.ChangeColumnValueAction:
            const columnExists = !!node.node.state.get('column');
            let valueExists = false;
            if (typeof node.node.state.get('value') !== 'undefined') {
              valueExists = true;
            } else if (
              node.node.state.get('condition') === ConditionTypes.PastToday
            ) {
              valueExists = true;
            } else {
              valueExists = !!node.node.state.get('value');
            }
            const valueTypeIsAnyValue =
              node.node.state.get('valueType') === ValueTypes.AnyValue;
            isValid = columnExists && (valueExists || valueTypeIsAnyValue);
            break;
          case EventTypes.OnIntervalEvent:
            const intervalExists = !!node.node.state.get('interval');
            const intervalValueExists = !!node.node.state.get('value');
            isValid = intervalValueExists && intervalExists;
            break;
          case ActionTypes.SendEmailAction:
            const email = !!node.node.state.get('email');
            const emailTo = !!node.node.state.get('emailTo');
            const specificRecipientsRequired = [
              NotificationRecipientTypesEnum.NotifySpecificColumn,
              NotificationRecipientTypesEnum.NotifySpecificPeople,
            ].includes(node.node.state.get('emailTo'));
            const recipients = !!node.node.state.get('specificRecepient');
            isValid = specificRecipientsRequired
              ? email && emailTo && recipients
              : email && emailTo;
            break;
        }
        if (!isValid) {
          break; // exit the loop since we found an invalid input
        }
      }
    }
    const newDiagram = await this.build();
    this.diagramChange.emit({diagram: newDiagram, isValid: isValid});
    this.cdr.detectChanges();
  }
  /**
   * It updates the state of the workflow
   * @param node - WorkflowNode<E> - The node that is being updated.
   * @param {WorkflowPrompt[]} inputs - WorkflowPrompt[]
   * @param [remove=false] - boolean - if true, the state for the node will be removed
   */
  updateState(node: WorkflowNode<E>, inputs: WorkflowPrompt[], remove = false) {
    let currentState = this.state();
    if (!currentState) {
      currentState = {};
    }
    // Create a mutable copy
    const newState = {...currentState};
    if (remove) {
      delete newState[node.id];
    } else {
      const keys = inputs.map(input => input.inputKey);
      newState[node.id] = node.state.getAll([
        ...keys,
        ...keys.map(k => `${k}Name`),
      ]);
    }
    this.stateChange.emit(newState);
  }
  /**
   * > If the user has already entered data for a subsequent input, remove it
   * @param element - NodeWithInput<E>
   * @param {WorkflowPrompt} input - WorkflowPrompt - this is the input that was just changed
   */
  private handleSubsequentInputs(
    element: NodeWithInput<E>,
    input: WorkflowPrompt,
  ) {
    const currentIndex = element.inputs.findIndex(
      i => i.getIdentifier() === input.getIdentifier(),
    );
    const subsequentInputs = element.inputs.filter((r, i) => i > currentIndex);
    for (const nextInput of subsequentInputs) {
      if (nextInput.prevchange) nextInput.prevchange(element.node.state);
      const nextKey = nextInput.inputKey;
      element.node.state.remove(nextKey);
      element.node.state.remove(`${nextKey}Name`);
    }
  }
  /**
   * It takes two objects, and merges the second object into the first object
   * @param stateA - The state that is currently in the store.
   * @param stateB - The state that you want to merge into stateA.
   * @returns The state of the store.
   */
  private mergeState<S extends RecordOfAnyType>(
    stateA: StateMap<S>,
    stateB: StateMap<S>,
  ) {
    stateA = JSON.parse(JSON.stringify(stateA));
    Object.keys(stateB).forEach(id => {
      Object.keys(stateB[id]).forEach(key => {
        if (stateA[id]) {
          (stateA[id] as RecordOfAnyType)[key] = (stateB as RecordOfAnyType)[
            id
          ][key];
        } else {
          stateA[id] = stateB[id];
        }
      });
    });
    return stateA;
  }
}
