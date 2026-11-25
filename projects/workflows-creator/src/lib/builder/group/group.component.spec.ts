import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {NodeService} from '../../classes';
import {AbstractBaseGroup} from '../../classes/nodes';
import {InputTypes, NodeTypes, ValueTypes} from '../../enum';
import {LocalizationPipe} from '../../pipes/localization.pipe';
import {
  AndGroup,
  LocalizationProviderService,
  OnChangeEvent,
  ValueInput,
} from '../../services';
import {GroupComponent} from './group.component';
import {TooltipRenderComponent} from '../tooltip-render/tooltip-render.component';
import {NodeComponent} from '../node/node.component';
import {ModdleElement, RecordOfAnyType} from '../../types';

describe('GroupComponent', () => {
  let component: GroupComponent<any>;
  let fixture: ComponentFixture<GroupComponent<any>>;
  const mockEvents: any = [
    {
      id: 'event1',
      trigger: true,
      type: 'someType' /* Add other properties as needed */,
    },
    {
      id: 'event2',
      trigger: false,
      type: 'someOtherType' /* Add other properties as needed */,
    },
  ];

  const mockActions: any = [
    {
      id: 'action1',
      trigger: true,
      type: 'someActionType' /* Add other properties as needed */,
    },
    {
      id: 'action2',
      trigger: false,
      type: 'anotherActionType' /* Add other properties as needed */,
    },
  ];
  const eventStub = new OnChangeEvent({}, '', '', '');
  let nodeServiceSpy: any;
  beforeEach(async () => {
    const nodeServiceMock = {
      getActions: () => [],
      getEvents: () => [],
      getNodeByName: eventStub,
      getGroupByName: () => {},
      getGroups: () => [],
      mapInputs: () => [],
    };
    nodeServiceSpy = jasmine.createSpyObj('NodeService', nodeServiceMock);
    nodeServiceSpy.getEvents.and.returnValue(mockEvents);
    nodeServiceSpy.getActions.and.returnValue(mockActions);

    await TestBed.configureTestingModule({
      imports: [
        GroupComponent,
        NodeComponent,
        TooltipRenderComponent,
        LocalizationPipe,
      ],
      providers: [
        {provide: NodeService, useValue: nodeServiceSpy},
        {
          provide: LocalizationProviderService,
          useValue: {
            getLocalizedString: (key: string) => key,
            getLocalizedStringMap: () => ({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;

    // Set inputs using fixture.componentRef.setInput() for signals
    fixture.componentRef.setInput(
      'group',
      new AndGroup({}, '', NodeTypes.EVENT, false),
    );
    fixture.componentRef.setInput('isLast', false);
    fixture.componentRef.setInput('isFirst', false);
    fixture.componentRef.setInput('eventGroups', []);
    fixture.componentRef.setInput('nodeType', NodeTypes.EVENT);
    fixture.componentRef.setInput('allColumns', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize events and actions properties', () => {
    component.ngOnInit();
    expect(component.events).toEqual(mockEvents);
    expect(component.actions).toEqual(mockActions);
  });

  it('should set the templateMap', () => {
    component.ngAfterViewInit();

    expect(component.computedTemplateMap).toBeDefined();
  });

  it('should emit the remove event', () => {
    spyOn(component.remove, 'emit');
    component.removeClick();
    expect(component.remove.emit).toHaveBeenCalledWith(true);
  });

  it('should emit the add event', () => {
    spyOn(component.add, 'emit');
    component.addClick();
    expect(component.add.emit).toHaveBeenCalledWith(true);
  });

  it('should add the node to the group', () => {
    component.onNodeAdd(eventStub, 'groupType', 'groupId', 'id');
    expect(component.group().children.length).toBeGreaterThan(0);
  });

  it('should throw an error if the node type is neither EVENT nor ACTION', () => {
    const node = eventStub;
    nodeServiceSpy.getNodeByName.and.throwError('');
    expect(() =>
      component.onNodeAdd(node, 'groupType', 'groupId', 'id'),
    ).toThrowError('');
  });

  it('should remove the node at the given index from the group', () => {
    component.group().children.push({
      node: eventStub,
      inputs: [],
    });
    component.onNodeRemove(0);
    expect(component.group().children.length).toEqual(0);
  });

  it('should emit the eventRemoved event', () => {
    spyOn(component.eventRemoved, 'emit');
    component.onNodeRemove(0);
    expect(component.eventRemoved.emit).toHaveBeenCalled();
  });

  it('createCallback should close overlay after execution', () => {
    // Simulate overlayRef being present
    spyOn(component, 'closeOverlay');
    const callback = component.createCallback(
      {node: eventStub, inputs: []},
      new ValueInput(),
    );
    callback({value: 'testValue'} as any);
    expect(component.closeOverlay).toHaveBeenCalled();
  });

  it('onPoperClick replacement: opening a new overlay closes existing overlay', () => {
    // Simulate existing overlayRef and ensure closeOverlay called when opening new overlay
    spyOn(component, 'closeOverlay');
    const event = new MouseEvent('click');
    // Call the method that would open overlay in new implementation
    component.openNodeOverlay(event);
    expect(component.closeOverlay).toHaveBeenCalled();
  });

  it('should set the tooltipText, showsTooltip, topPosition, and leftPosition properties', () => {
    const event = new MouseEvent('click');
    component.showTooltip(
      event,
      {
        node: eventStub,
        inputs: [],
      },
      new ValueInput(),
    );
    expect(component.tooltipText).toBe('selectColumnTooltip');
    expect(component.showsTooltip).toBe(true);
    expect(component.topPosition).toBe(event.clientY + 10);
    expect(component.leftPosition).toBe(event.clientX);
  });

  it('should reset the showsTooltip, topPosition, and leftPosition properties', () => {
    component.hideTooltip();
    expect(component.showsTooltip).toBe(false);
    expect(component.topPosition).toBeNull();
    expect(component.leftPosition).toBeNull();
  });

  it('hidePopper should call closeOverlay', () => {
    spyOn(component, 'closeOverlay');
    const hidePopperFn = component.hidePopper();
    hidePopperFn();
    expect(component.closeOverlay).toHaveBeenCalled();
  });

  describe('hideUnlessDropdownPanelClick', () => {
    const clickOn = (target: HTMLElement, hide: jasmine.Spy) => {
      const listener = (event: Event) =>
        component.hideUnlessDropdownPanelClick(event, hide);
      document.addEventListener('click', listener);
      target.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      document.removeEventListener('click', listener);
    };

    it('keeps the popup open for clicks inside the ng-select dropdown panel', () => {
      // ng-select renders its panel in a separate CDK overlay, outside the popup
      const panel = document.createElement('ng-dropdown-panel');
      const option = document.createElement('div');
      option.className = 'ng-option';
      panel.appendChild(option);
      document.body.appendChild(panel);
      const hide = jasmine.createSpy('hide');

      clickOn(option, hide);
      panel.remove();

      expect(hide).not.toHaveBeenCalled();
    });

    it('hides the popup for clicks outside the dropdown panel', () => {
      const outside = document.createElement('div');
      document.body.appendChild(outside);
      const hide = jasmine.createSpy('hide');

      clickOn(outside, hide);
      outside.remove();

      expect(hide).toHaveBeenCalled();
    });
  });

  it('should set enableActionIcon to false if the node type is OnChangeEvent and the value is ValueTypes.AnyValue', () => {
    const element = {node: eventStub, inputs: []};
    const input = new ValueInput();
    element.node.type = NodeTypes.EVENT;
    element.node.getIdentifier = () => 'OnChangeEvent';
    element.node.state.change('valueInputType', 'valueInputType');
    spyOn(component.itemChanged, 'emit');
    component.addValue(element, input, ValueTypes.AnyValue);
    expect(component.enableActionIcon).toBe(false);
    expect(component.itemChanged.emit).toHaveBeenCalledWith({
      field: input.getIdentifier(),
      value: ValueTypes.AnyValue,
      item: element.node,
    });
  });

  it('should set enableActionIcon to true if the node type is OnChangeEvent and the value is not ValueTypes.AnyValue', () => {
    const element = {node: eventStub, inputs: []};
    const input = new ValueInput();

    element.node.type = NodeTypes.EVENT;
    element.node.getIdentifier = () => 'OnChangeEvent';

    element.node.state.change('valueInputType', 'valueInputType');
    spyOn(component.itemChanged, 'emit');
    component.addValue(element, input, 'value');
    expect(component.enableActionIcon).toBe(true);
    expect(component.itemChanged.emit).toHaveBeenCalledWith({
      field: input.getIdentifier(),
      value: 'value',
      item: element.node,
    });
  });

  it('should set the selectedItems to the list of selected items', () => {
    // Arrange
    const list = [{id: '1'}, {id: '2'}, {id: '3'}];

    // Act
    component.onSelectAll(list as any[]); // Casting to any[] to resolve type issue

    // Assert
    expect(component.selectedItems.length).toBe(3);
  });

  it('should prevent the default action if the key is not a digit or backspace/delete', () => {
    // Arrange
    const event = new KeyboardEvent('keypress', {keyCode: 65});
    spyOn(event, 'preventDefault');
    const targetWithMockedValue = {value: 'test'} as EventTarget & {
      value: string;
    };
    spyOnProperty(event, 'target', 'get').and.returnValue(
      targetWithMockedValue,
    );

    // Act
    component.handleKeyPress(event);

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
  });
  it('should prevent the default action if the input value is not a valid number', () => {
    // Arrange
    const event = new KeyboardEvent('keypress', {keyCode: 48});
    spyOn(event, 'preventDefault');
    const targetWithMockedValue = {value: 'test'} as EventTarget & {
      value: string;
    };
    spyOnProperty(event, 'target', 'get').and.returnValue(
      targetWithMockedValue,
    );

    // Act
    component.handleKeyPress(event);

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
  });
  it('should not prevent the default action if the key is a digit or backspace/delete and the input value is a valid number', () => {
    // Arrange
    const event1 = new KeyboardEvent('keypress', {keyCode: 48});
    const event2 = new KeyboardEvent('keypress', {keyCode: 8});
    const targetWithMockedValue1 = {value: '0'} as EventTarget & {
      value: string;
    };
    const targetWithMockedValue2 = {value: 'test'} as EventTarget & {
      value: string;
    };
    spyOnProperty(event1, 'target', 'get').and.returnValue(
      targetWithMockedValue1,
    );
    spyOnProperty(event2, 'target', 'get').and.returnValue(
      targetWithMockedValue2,
    );

    spyOn(event1, 'preventDefault');
    spyOn(event2, 'preventDefault');

    // Act
    component.handleKeyPress(event1);
    component.handleKeyPress(event2);

    // Assert
    expect(event1.preventDefault).not.toHaveBeenCalled();
    expect(event2.preventDefault).toHaveBeenCalled();
  });

  describe('popup templates', () => {
    const render = (
      template: TemplateRef<RecordOfAnyType>,
      context: RecordOfAnyType,
    ) => {
      const view = fixture.componentRef.injector
        .get(ViewContainerRef)
        .createEmbeddedView(template, context);
      view.detectChanges();
      return view;
    };

    it('saves the selected people when the searchable dropdown loses focus', () => {
      const list = [
        {id: 1, displayValue: 'Ann'},
        {id: 2, displayValue: 'Bob'},
      ];
      const callback = jasmine.createSpy('callback');
      component.selectedItems = ['2'];
      const view = render(component.searchableDropdownTemplate, {
        list,
        callback,
        nodeWithInput: {node: eventStub, inputs: []},
        hide: () => undefined,
      });

      const select = view.rootNodes[0].querySelector('ng-select');
      select.querySelector('input').dispatchEvent(new FocusEvent('blur'));

      expect(callback).toHaveBeenCalledOnceWith([list[1]]);
      view.destroy();
    });

    it('commits the number and closes the popup on Enter', () => {
      const callback = jasmine.createSpy('callback');
      const input = new ValueInput();
      const view = render(component.numberTemplate, {
        callback,
        input,
        nodeWithInput: {node: eventStub, inputs: []},
        hide: () => undefined,
      });
      const field: HTMLInputElement = view.rootNodes[0].querySelector('input');
      document.body.appendChild(view.rootNodes[0]);
      field.focus();
      field.value = '42';

      field.dispatchEvent(
        new KeyboardEvent('keydown', {key: 'Enter', keyCode: 13}),
      );

      expect(callback).toHaveBeenCalledOnceWith(field);
      view.rootNodes[0].remove();
      view.destroy();
    });
  });

  describe('handleEnterEvent', () => {
    const keydown = (keyCode: number) =>
      new KeyboardEvent('keydown', {keyCode});

    it('does not commit or reset the typed date on intermediate keystrokes', () => {
      const callback = jasmine.createSpy('callback');
      component.date = '2026-11-23';

      component.handleEnterEvent(
        callback,
        eventStub,
        {target: {value: component.date}} as unknown as Event,
        InputTypes.Date,
        keydown(50),
      );

      expect(callback).not.toHaveBeenCalled();
      expect(component.date).toBe('2026-11-23');
    });

    it('commits the typed date on Enter', () => {
      const callback = jasmine.createSpy('callback');
      component.date = '2026-11-23';

      component.handleEnterEvent(
        callback,
        eventStub,
        {target: {value: component.date}} as unknown as Event,
        InputTypes.Date,
        keydown(13),
      );

      expect(callback).toHaveBeenCalledOnceWith({
        day: 23,
        month: 11,
        year: 2026,
      });
    });
  });

  describe('handleEscape', () => {
    let overlayElement: HTMLElement;
    let field: HTMLInputElement;
    let focusOut: jasmine.Spy;

    beforeEach(() => {
      overlayElement = document.createElement('div');
      field = document.createElement('input');
      overlayElement.appendChild(field);
      document.body.appendChild(overlayElement);
      field.focus();
      focusOut = jasmine.createSpy('focusout');
      field.addEventListener('focusout', focusOut);
      component['overlayRef'] = {
        overlayElement,
        dispose: () => undefined,
      } as OverlayRef;
    });

    afterEach(() => {
      overlayElement.remove();
      component['overlayRef'] = null;
    });

    it('saves the focused input and closes the popup', () => {
      spyOn(component, 'closeOverlay');

      component.handleEscape(new KeyboardEvent('keydown', {key: 'Escape'}));

      expect(focusOut).toHaveBeenCalledTimes(1);
      expect(component.closeOverlay).toHaveBeenCalled();
    });

    it('leaves the popup open when ng-select already handled the key', () => {
      spyOn(component, 'closeOverlay');
      const select = document.createElement('ng-select');
      const selectInput = document.createElement('input');
      select.appendChild(selectInput);
      overlayElement.appendChild(select);
      select.addEventListener('keydown', event => event.preventDefault());
      const listener = (event: KeyboardEvent) => component.handleEscape(event);
      document.addEventListener('keydown', listener);

      selectInput.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          cancelable: true,
        }),
      );
      document.removeEventListener('keydown', listener);

      expect(component.closeOverlay).not.toHaveBeenCalled();
    });

    it('closes the popup when an input already prevented the key default', () => {
      spyOn(component, 'closeOverlay');
      field.addEventListener('keydown', event => event.preventDefault());
      const listener = (event: KeyboardEvent) => component.handleEscape(event);
      document.addEventListener('keydown', listener);

      field.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          cancelable: true,
        }),
      );
      document.removeEventListener('keydown', listener);

      expect(component.closeOverlay).toHaveBeenCalled();
    });

    it('does nothing when no popup is open', () => {
      component['overlayRef'] = null;
      spyOn(component, 'closeOverlay');

      component.handleEscape(new KeyboardEvent('keydown', {key: 'Escape'}));

      expect(component.closeOverlay).not.toHaveBeenCalled();
    });
  });
});

describe('GroupComponent inside a parent view', () => {
  @Component({
    template: `<workflow-group
      [group]="group"
      [nodeType]="nodeType"
      [eventGroups]="[]"
      [allColumns]="[]"
    ></workflow-group>`,
    standalone: true,
    imports: [GroupComponent],
  })
  class HostComponent {
    group: AbstractBaseGroup<ModdleElement> = new AndGroup<ModdleElement>(
      {},
      '',
      NodeTypes.EVENT,
      false,
    );
    nodeType = NodeTypes.EVENT;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        {
          provide: NodeService,
          useValue: {
            getActions: () => [],
            getEvents: () => [],
            getGroups: () => [],
          },
        },
        {
          provide: LocalizationProviderService,
          useValue: {
            getLocalizedString: (key: string) => key,
            getLocalizedStringMap: () => ({}),
          },
        },
      ],
    }).compileComponents();
  });

  it('shows nodes added to the group from outside, like a restored workflow', () => {
    const host = TestBed.createComponent(HostComponent);
    host.detectChanges();

    host.componentInstance.group.children.push({
      node: new OnChangeEvent({}, '', '', ''),
      inputs: [],
    });
    // what the builder does after a restore: re-check its own view only
    host.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    host.detectChanges();

    const el: HTMLElement = host.nativeElement;
    expect(el.querySelectorAll('workflow-node').length).toBe(1);
    expect(el.querySelector('.tree-group')?.classList).not.toContain(
      'no-node',
    );
  });
});
