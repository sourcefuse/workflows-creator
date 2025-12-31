import {
  AfterViewInit,
  Component,
  input,
  output,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Overlay, OverlayRef, OverlayModule} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {isSelectInput, NodeService, WorkflowPrompt} from '../../classes';
import {AbstractBaseGroup} from '../../classes/nodes';
import {
  DateTimeFields,
  InputTypes,
  LocalizedStringKeys,
  NodeTypes,
  NUMBER,
  ValueTypes,
} from '../../enum';
import {InvalidEntityError} from '../../errors/base.error';
import {
  AllowedValues,
  AllowedValuesMap,
  BpmnNode,
  NodeWithInput,
  RecordOfAnyType,
  WorkflowNode,
} from '../../types';
import {
  EventWithInput,
  ActionWithInput,
  DateTime,
  EmailInput,
  Select,
  DateType,
} from '../../types/base.types';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {
  ChangeColumnValue,
  GatewayElement,
  LocalizationProviderService,
  ReadColumnValue,
  TriggerWhenColumnChanges,
} from '../../services';
import {LocalizationPipe} from '../../pipes/localization.pipe';
import moment from 'moment';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NodeComponent} from '../node/node.component';
import {TooltipRenderComponent} from '../tooltip-render/tooltip-render.component';

@Component({
  selector: 'workflow-group',
  templateUrl: './group.component.html',
  styleUrls: [
    './group.component.scss',
    '../../../assets/icons/icomoon/style.css',
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    NgSelectModule,
    NodeComponent,
    TooltipRenderComponent,
    LocalizationPipe,
  ],
  providers: [LocalizationPipe],
})
export class GroupComponent<E> implements OnInit, AfterViewInit {
  constructor(
    private readonly nodes: NodeService<E>,
    private readonly localizationSvc: LocalizationProviderService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {}
  public inputType = InputTypes;
  public dateTimeFields = DateTimeFields;
  private isMouseDown: boolean = false;
  group = input.required<AbstractBaseGroup<E>>();

  isLast = input(false);

  isFirst = input(false);

  eventGroups = input<AbstractBaseGroup<E>[]>([]);

  nodeType = input.required<NodeTypes>();

  remove = output<boolean>();

  add = output<boolean>();

  eventAdded = output<unknown>();

  eventRemoved = output<void>();

  actionAdded = output<unknown>();

  itemChanged = output<unknown>();

  date: string = '';
  dateTime: any = {
    date: '',
    time: '',
  };
  emailInput: EmailInput = {
    subject: '',
    body: '',
    focusKey: '',
  };

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'fullName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 2,
    allowSearchFilter: true,
    defaultOpen: true,
  };
  selectedItems = [];
  showDateTimePicker = true;
  enableActionIcon = true;
  events: WorkflowNode<E>[] = [];
  triggerEvents: WorkflowNode<E>[] = [];
  actions: WorkflowNode<E>[] = [];

  nodeList: WorkflowNode<E>[];

  showsTooltip = false;
  tooltipText = 'This is default parent component text';
  topPosition: any;
  leftPosition: any;

  public types = NodeTypes;
  private overlayRef: OverlayRef | null = null;
  private currentTriggerElement: HTMLElement | null = null;

  typeSubjectPlaceholder = '';
  typeEmailPlaceholder = '';

  localizedStringKeys = LocalizedStringKeys;

  templateMap = input<{
    [key: string]: TemplateRef<RecordOfAnyType>;
  }>();

  allColumns = input<Select[]>([]);

  // Local variable to store computed template map
  private _computedTemplateMap: {[key: string]: TemplateRef<RecordOfAnyType>} =
    {};

  get computedTemplateMap() {
    return this._computedTemplateMap;
  }

  @ViewChild('emailTemplate') emailTemplate: TemplateRef<RecordOfAnyType>;

  @ViewChild('listTemplate')
  listTemplate: TemplateRef<RecordOfAnyType>;

  @ViewChild('numberTemplate')
  numberTemplate: TemplateRef<RecordOfAnyType>;

  @ViewChild('textTemplate')
  textTemplate: TemplateRef<RecordOfAnyType>;

  @ViewChild('searchableDropdownTemplate')
  searchableDropdownTemplate: TemplateRef<RecordOfAnyType>;

  @ViewChild('dateTemplate')
  dateTemplate: TemplateRef<RecordOfAnyType>;

  @ViewChild('dateTimeTemplate')
  dateTimeTemplate: TemplateRef<RecordOfAnyType>;

  @ViewChild('inputPopupTemplate')
  inputPopupTemplate: TemplateRef<RecordOfAnyType>;

  @ViewChild('nodePopupTemplate')
  nodePopupTemplate: TemplateRef<any>;

  /**
   * It gets the events and actions from the nodes service and stores them in the events and actions
   * variables
   */
  ngOnInit(): void {
    this.events = this.nodes.getEvents();
    this.triggerEvents = this.nodes.getEvents(true);
    this.actions = this.nodes.getActions();
    this.typeSubjectPlaceholder = this.localizationSvc.getLocalizedString(
      LocalizedStringKeys.TypeSubject,
    );
    this.typeEmailPlaceholder = this.localizationSvc.getLocalizedString(
      LocalizedStringKeys.TypeEmail,
    );
  }

  /**
   * If the user has provided a custom template for a given input type, use that template. Otherwise,
   * use the default template
   */
  ngAfterViewInit() {
    const inputTemplateMap = this.templateMap();
    this._computedTemplateMap = {
      [InputTypes.Boolean]:
        inputTemplateMap?.[InputTypes.Boolean] || this.listTemplate,
      [InputTypes.List]:
        inputTemplateMap?.[InputTypes.List] || this.listTemplate,
      [InputTypes.Text]:
        inputTemplateMap?.[InputTypes.Text] || this.textTemplate,
      [InputTypes.Number]:
        inputTemplateMap?.[InputTypes.Number] || this.numberTemplate,
      [InputTypes.Percentage]:
        inputTemplateMap?.[InputTypes.Percentage] || this.numberTemplate,
      [InputTypes.Date]:
        inputTemplateMap?.[InputTypes.Date] || this.dateTemplate,
      [InputTypes.DateTime]:
        inputTemplateMap?.[InputTypes.DateTime] || this.dateTimeTemplate,
      [InputTypes.People]:
        inputTemplateMap?.[InputTypes.People] ||
        this.searchableDropdownTemplate,
      [InputTypes.Interval]:
        inputTemplateMap?.[InputTypes.Interval] || this.listTemplate,
      [InputTypes.Email]:
        inputTemplateMap?.[InputTypes.Email] || this.emailTemplate,
    };
  }

  /**
   * If the input is a value input, then set the value of the input to the value of the node
   * @param {WorkflowPrompt} input - WorkflowPrompt - The input that was passed in from the workflow.
   * @param nodeWithInput - The node that has the input.
   */
  setInput(input: WorkflowPrompt, nodeWithInput: NodeWithInput<E>) {
    const allowedInputs = ['ValueInput', 'EmailDataInput', 'ToValueInput'];
    if (allowedInputs.includes(input.getIdentifier())) {
      const value = input.getModelValue(nodeWithInput.node.state);
      if (nodeWithInput.node.state.get('email')) {
        this.emailInput = value;
      } else {
        switch (nodeWithInput.node.state.get('valueInputType')) {
          case InputTypes.Date:
            this.date = value;
            break;
          case InputTypes.DateTime:
            this.dateTime = value;
            break;
          case InputTypes.People:
            this.selectedItems = value.map((item: {id: string}) => item.id);
            break;
        }
      }
    }
  }

  /**
   * The removeClick() function emits a boolean value of true to the parent component
   */
  removeClick() {
    this.remove.emit(true);
  }

  /**
   * The addClick() function emits the add event, which is a boolean value of true
   */
  addClick() {
    this.add.emit(true);
  }

  /**
   * If the focusKey is subject, append the value of the item to the subject. If the focusKey is body,
   * append the value of the item to the body
   * @param {Select} item - Select - this is the item that was selected from the dropdown
   * @param {EmailInput} emailInput - EmailInput - this is the object that contains the email input
   * values.
   */
  appendEmailBody(item: Select, emailInput: EmailInput) {
    if (emailInput.focusKey === 'subject') {
      emailInput.subject += ` ${item.value}`;
    }
    if (emailInput.focusKey === 'body') {
      emailInput.body += ` ${item.value}`;
    }
  }

  /**
   * Set the focus key of the email input to the key.
   * @param {EmailInput} emailInput - EmailInput - This is the email input object that you created in
   * the previous step.
   * @param {string} key - The key of the input.
   */
  setFocusKey(emailInput: EmailInput, key: string) {
    emailInput.focusKey = key;
  }

  /**
   * If the type is an action, set the node list to the actions, otherwise if the type is an event, set
   * the node list to the trigger events if there is only one event group and no children, otherwise
   * set the node list to the events. If event is provided, open overlay with node popup.
   * @param {NodeTypes} type - NodeTypes
   * @param {MouseEvent} event - Optional click event to trigger overlay
   */
  openPopup(type: NodeTypes, event?: MouseEvent) {
    if (type === NodeTypes.ACTION) {
      this.nodeList = this.actions;
    } else if (type === NodeTypes.EVENT) {
      this.nodeList =
        this.eventGroups().length === 1 && !this.group().children.length
          ? this.triggerEvents
          : this.events;
    } else {
      throw new InvalidEntityError('' + type);
    }

    // If event and popupTemplate are provided, open the overlay
    if (event && this.nodePopupTemplate) {
      this.openNodeOverlay(event);
    }
  }

  /**
   * Opens overlay for node selection
   * @param {MouseEvent} event - The click event
   */
  openNodeOverlay(event: MouseEvent) {
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

    // Create a simple node list template
    const context = {
      nodeList: this.nodeList,
      groupId: this.group().id,
      groupIdentifier: this.group().getIdentifier(),
    };

    const portal = new TemplatePortal(
      this.nodePopupTemplate,
      this.viewContainerRef,
      context,
    );
    this.overlayRef.attach(portal);

    // Close overlay on backdrop click
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  /**
   * `onNodeAdd` is a function that takes in a node, a group type, a group id, and an id, and then
   * emits an event with a node and a new node
   * @param node - The node that was added.
   * @param {string} groupType - string - The type of group that the node is being added to.
   * @param {string} groupId - The id of the group that the node is being added to.
   * @param {string} [id] - The id of the node.
   */
  onNodeAdd(
    node: WorkflowNode<E>,
    groupType: string,
    groupId: string,
    id?: string,
  ) {
    this.dateTime = {
      date: '',
      time: '',
    };
    this.date = '';
    this.emailInput = {
      subject: '',
      body: '',
      focusKey: '',
    };
    const newNode = {
      node: this.nodes.getNodeByName(
        node.getIdentifier(),
        groupType,
        groupId,
        id,
        this.group().isElseGroup,
      ),
      inputs: this.nodes.mapInputs(node),
    };
    if (node.type === NodeTypes.EVENT) {
      this.eventAdded.emit({
        node: node,
        newNode: newNode,
      });
      if (newNode.node.getIdentifier() === 'OnIntervalEvent') {
        newNode.node.state.change('valueInputType', 'number');
      }
      this.group().children.push(newNode as EventWithInput<E>);
    } else if (node.type === NodeTypes.ACTION) {
      this.actionAdded.emit({
        node: node,
        newNode: newNode,
      });
      this.group().children.push(newNode as ActionWithInput<E>);
    } else {
      throw new InvalidEntityError('Node');
    }
  }

  /**
   * It removes the node at the given index from the group
   * @param {number} index - The index of the node that was removed.
   */
  onNodeRemove(index: number) {
    this.group().children.splice(index, 1);
    this.eventRemoved.emit(undefined);
  }

  /**
   * It takes in an element, an input, and returns a function that takes in a value, and
   * if that value is defined, it adds the value to the element, and hides the overlay
   * @param element - NodeWithInput<E>
   * @param {WorkflowPrompt} input - WorkflowPrompt - this is the input object that was clicked on
   * @returns A function that takes a value and returns a function that takes a value and emits an event
   */
  createCallback(element: NodeWithInput<E>, input: WorkflowPrompt) {
    return (value?: AllowedValues) => {
      if (value) {
        this.addValue(
          element,
          input,
          input.setValue(element.node.state, value),
          input.typeFunction(element.node.state) === InputTypes.List,
        );
      }
      this.closeOverlay();
    };
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
    this.currentTriggerElement = target;

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
      this.currentTriggerElement = null;
    }
  }

  /**
   * shows custom tooltip
   * @param {MouseEvent} e - event object
   * @param element - NodeWithInput<E>
   * @param {WorkflowPrompt} input - WorkflowPrompt - this is the input object that was clicked on
   */
  showTooltip(e: MouseEvent, element: NodeWithInput<E>, input: WorkflowPrompt) {
    if (
      ['condition', 'value'].includes(input.inputKey) &&
      (element.node.elements.includes(ChangeColumnValue.identifier) ||
        element.node.elements.includes(ReadColumnValue.identifier) ||
        element.node.elements.includes(ReadColumnValue.identifier)) &&
      !element.node.state.get('column')
    ) {
      this.tooltipText = this.localizationSvc.getLocalizedString(
        LocalizedStringKeys.SelectColumnTooltip,
      );
      this.showsTooltip = true;
      this.topPosition = e.clientY + 10;
      this.leftPosition = e.clientX;
    }
  }

  /**
   * hides custom tooltip
   */
  hideTooltip() {
    this.showsTooltip = false;
    this.topPosition = null;
    this.leftPosition = null;
  }

  /**
   * It returns a function that hides the overlay
   * @returns A function that calls the closeOverlay method.
   */
  hidePopper() {
    return () => {
      this.closeOverlay();
    };
  }

  /**
   * It takes in a node, an input, a value, and a boolean, and then it changes the state of the node
   * based on the input and value
   * @param element - NodeWithInput<E> - The element that is being changed.
   * @param {WorkflowPrompt} input - WorkflowPrompt - this is the input that was changed
   * @param {AllowedValues | AllowedValuesMap} value - AllowedValues | AllowedValuesMap,
   * @param [select=false] - boolean - This is a flag that tells the function whether the input is a
   * select input or not.
   */
  addValue(
    element: NodeWithInput<E>,
    input: WorkflowPrompt,
    value: AllowedValues | AllowedValuesMap,
    select = false,
  ) {
    this.enableActionIcon = true;
    if (
      (input.getIdentifier() === 'ValueTypeInput' ||
        input.getIdentifier() === 'ValueInput') &&
      element.node.getIdentifier() === 'OnChangeEvent'
    ) {
      if ((value as AllowedValuesMap).value === ValueTypes.AnyValue) {
        /**
         * Remove node on changes event
         */
        element.node.elements.splice(-NUMBER.TWO, NUMBER.TWO);
        // element.inputs[1].prefix = '';
        this.enableActionIcon = false;
      } else {
        element.node.elements = [
          TriggerWhenColumnChanges.identifier,
          ReadColumnValue.identifier,
          GatewayElement.identifier,
        ];
      }
    }
    if (select && isSelectInput(input)) {
      element.node.state.change(
        `${input.inputKey}Name`,
        (value as AllowedValuesMap)[input.listNameField],
      );
      value =
        element.node.state.get('columnName') === 'Priority' &&
        input.inputKey === 'value'
          ? value
          : (value as AllowedValuesMap)[input.listValueField];
      element.node.state.change(input.inputKey, value);
      this.handleSubsequentInputs(element, input);
      this.itemChanged.emit({
        field: input.getIdentifier(),
        value:
          element.node.state.get('columnName') === 'Priority' &&
          input.inputKey === 'value'
            ? (value as AllowedValuesMap)[input.listValueField]
            : value,
        element: element,
      });
    }
    element.node.state.change(input.inputKey, value);
    this.handleSubsequentInputs(element, input);
    this.itemChanged.emit({
      field: input.getIdentifier(),
      value: value,
      element: element,
    });
    this.enableActionIcon =
      element.node.state.get('value') !== ValueTypes.AnyValue;
  }

  onSelectAll(list: any) {
    this.selectedItems = list.map((item: any) => item.id);
  }

  onClearAll() {
    this.selectedItems = [];
  }

  getLibraryValue(
    node: BpmnNode,
    $event: any,
    type: string,
    metaObj: RecordOfAnyType,
  ) {
    const value = $event.target?.value ?? $event;
    this.dateTime = {
      date: '',
      time: '',
    };
    this.date = '';
    switch (type) {
      case InputTypes.People:
        const selectedIds = metaObj.list.filter((item: {id: any}) =>
          (this.selectedItems as any[]).includes(`${item.id}`),
        );
        return selectedIds;
      case InputTypes.Date: {
        if (value) {
          const dateObj = moment(value);
          return {
            day: dateObj.date(),
            month: dateObj.month() + 1,
            year: dateObj.year(),
          };
        }
        break;
      }
      case InputTypes.DateTime:
        if (value) {
          if (value.time === '') {
            value.time = node.state.get('defaultTime') ?? '9:00';
          }
          const dateObj = moment(`${value.date} ${value.time}`);
          return {
            date: {
              day: dateObj.date(),
              month: dateObj.month() + 1,
              year: dateObj.year(),
            },
            time: {
              hour: dateObj.hour(),
              minute: dateObj.minute(),
            },
          };
        }
        break;
    }
    return;
  }

  handleMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
  }

  handleMouseUp(): void {
    this.isMouseDown = false;
  }

  handleMouseLeave(event: MouseEvent): void {
    this.isMouseDown = false;
  }

  handleDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Check if the click is outside the input element and not part of a drag
    if (!this.isMouseDown) {
      // If not a drag and click outside the input, hide the input box
      this.hidePopper();
    }
  }

  handleKeyPress(event: any) {
    const keyCode = event.which || event.keyCode;
    const isDigit = keyCode >= 48 && keyCode <= 57;
    const isBackspaceOrDelete = [8, 46].includes(keyCode);
    const inputValue = event.target.value;
    const isValidInput = /^-?\d*\.?\d*$/.test(inputValue);
    if (!(isDigit || isBackspaceOrDelete) || !isValidInput) {
      event.preventDefault();
    }
  }
  handleEnterEvent(
    callback: any,
    node: BpmnNode,
    $event: any,
    type: string,
    event: any,
  ) {
    const response = this.getLibraryValue(node, $event, type, {});

    //check whether the entered key is "ENTER" key
    if (event.keyCode === 13) {
      callback(response);
    }
  }

  updateSecondVariable(
    event: any,
    inputType: InputTypes,
    dateTimeField?: string,
  ) {
    //if inputType->dateTime
    switch (inputType) {
      case InputTypes.DateTime:
        if (dateTimeField == 'date') {
          this.dateTime.date = event;
        } else {
          this.dateTime.time = event;
        }
        break;
      case InputTypes.Date:
        this.date = event;
    }
  }

  /**
   * It removes all the inputs that come after the current input
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
}
