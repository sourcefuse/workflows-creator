import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxPopperjsModule, NgxPopperjsContentComponent} from 'ngx-popperjs';
import {
  NodeService,
  AbstractBaseGroup,
  WorkflowPrompt,
  State,
  WorkflowEvent,
} from '../../classes';
import {NodeTypes, ValueTypes, InputTypes} from '../../enum';
import {InvalidEntityError} from '../../errors';
import BPMNModdle from 'bpmn-moddle';
import {LocalizationPipe} from '../../pipes/localization.pipe';
import {
  AndGroup,
  BpmnNodesService,
  ChangeColumnValueAction,
  LocalizationProviderService,
  OnAddItemEvent,
  OnChangeEvent,
  OnIntervalEvent,
  OnValueEvent,
  OrGroup,
  SendEmailAction,
  ValueInput,
} from '../../services';
import {GroupComponent} from './group.component';
import {TooltipRenderComponent} from '../tooltip-render/tooltip-render.component';
import {BPMN_NODES} from '../../const';
import {NodeComponent} from '../node/node.component';
import {
  ElementRef,
  Renderer2,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import {AllowedValues, RecordOfAnyType} from '../../types';
import {popper} from '@popperjs/core';

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
      getActions: () => [], // Implement a mock method to return an empty array or mock data
      getEvents: () => [],
      getNodeByName: eventStub,
      // getIdentifier: () => 'OnChangeEvent',

      getGroupByName: () => {},
      getGroups: () => [],
      mapInputs: () => [],
    };
    nodeServiceSpy = jasmine.createSpyObj('NodeService', nodeServiceMock);
    nodeServiceSpy.getEvents.and.returnValue(mockEvents);
    nodeServiceSpy.getActions.and.returnValue(mockActions);

    await TestBed.configureTestingModule({
      declarations: [
        GroupComponent,
        NodeComponent,
        TooltipRenderComponent,
        LocalizationPipe,
      ],
      providers: [
        {provide: NodeService, useValue: nodeServiceSpy},
        LocalizationProviderService,
        LocalizationPipe,
      ],
      imports: [NgxPopperjsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    component.group = new AndGroup({}, '', NodeTypes.EVENT, false);
    component.isLast = false;
    component.isFirst = false;
    component.eventGroups = [];
    component.nodeType = NodeTypes.ACTION;
    component.nodeType = NodeTypes.EVENT;
    component.allColumns = [];

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

    expect(component.templateMap).toBeDefined();
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
    expect(component.group.children.length).toBeGreaterThan(0);
  });

  it('should throw an error if the node type is neither EVENT nor ACTION', () => {
    const node = eventStub;
    nodeServiceSpy.getNodeByName.and.throwError('');
    expect(() =>
      component.onNodeAdd(node, 'groupType', 'groupId', 'id'),
    ).toThrowError('');
  });

  it('should remove the node at the given index from the group', () => {
    component.group.children.push({
      node: eventStub,
      inputs: [],
    });
    component.onNodeRemove(0);
    expect(component.group.children.length).toEqual(0);
  });

  it('should emit the eventRemoved event', () => {
    spyOn(component.eventRemoved, 'emit');
    component.onNodeRemove(0);
    expect(component.eventRemoved.emit).toHaveBeenCalled();
  });

  it('should return a function that hides the popper and emits the value', () => {
    const popper = {hide: () => {}} as NgxPopperjsContentComponent;
    const callback = component.createCallback(
      {
        node: eventStub,
        inputs: [],
      },
      new ValueInput(),
      popper,
    );
    spyOn(popper, 'hide');

    callback();
    expect(popper.hide).toHaveBeenCalled();
  });

  // Create a mock class for NgxPopperjsContentComponent

  // Create a spy object to mock the methods of NgxPopperjsContentComponent
  const popperSpy = jasmine.createSpyObj('NgxPopperjsContentComponent', [
    'show',
    'hide',
  ]);

  it('should hide the previous popper and show the current popper', () => {
    // Arrange
    const event = new MouseEvent('click');
    component.prevPopperRef = popperSpy; // Assign the spy object to prevPopperRef

    // Act
    component.onPoperClick(event, popperSpy);

    // Assert
    expect(component.prevPopperRef.hide).toHaveBeenCalled();
    expect(popperSpy.show).toHaveBeenCalled(); // Spy on the show method of popperSpy
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
    expect(component.tooltipText).toBe('Select a column first');
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

  it('should return a function that hides the previous popper', () => {
    const mockElementRef = {} as ElementRef<any>;
    const mockRenderer = {} as Renderer2;
    const mockViewContainerRef = {} as ViewContainerRef;
    const mockChangeDetectorRef = {} as ChangeDetectorRef;

    const mockNgxPopperjsContentComponent = jasmine.createSpyObj(
      'NgxPopperjsContentComponent',
      ['hide'],
    );

    component.prevPopperRef = mockNgxPopperjsContentComponent;

    const hidePopperFn = component.hidePopper();
    hidePopperFn();

    expect(component.prevPopperRef.hide).toHaveBeenCalled();
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
      element: element,
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
      element: element,
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
});
