import {makeEnvironmentProviders} from '@angular/core';
import BPMNModdle from 'bpmn-moddle';
import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';
import {CAMUNDA as CustomCamunda} from './schema/camunda.json';
import {
  // core services
  BuilderService,
  ElementService,
  NodeService,
  BpmnBuilderService,
  BpmnElementService,
  BpmnNodesService,
  AutoLayoutService,
  DiFactoryService,

  // moddle / xml
  CustomBpmnModdle,
  BASE_XML,
  BASE_XML_VALUE,

  // tokens
  BPMN_ELEMENTS,
  BPMN_NODES,
  BPMN_INPUTS,
  CONDITION_LIST,
  ENV_TOKEN,

  // nodes
  ChangeColumnValueAction,
  SendEmailAction,
  OnChangeEvent,
  OnValueEvent,
  OnIntervalEvent,
  OnAddItemEvent,
  AndGroup,
  OrGroup,

  // elements
  StartElement,
  StartOnIntervalElement,
  EndElement,
  GatewayElement,
  OrGatewayElement,
  ProcessElement,
  TriggerWhenColumnChanges,
  TriggerOnInterval,
  TriggerOnAddItem,
  ReadColumnValue,
  SendEmail,
  ChangeColumnValue,
  ProcessPropertiesElement,

  // inputs
  ColumnInput,
  TriggerColumnInput,
  IntervalInput,
  ConditionInput,
  EmailDataInput,
  EmailToInput,
  EmailRecepientInput,
  ToColumnInput,
  ToValueInput,
  ValueInput,
  ValueTypeInput,

  // strategies
  CREATE_BASIC_STRATEGY,
  CREATE_BASIC_INTERVAL_STRATEGY,
  CREATE_GATEWAY_STRATEGY,
  CREATE_OR_GATEWAY_STRATEGY,
  CREATE_TASK_STRATEGY,
  CREATE_PROPERTIES_STRATEGY,
  LINK_BASIC_STRATEGY,
  LINK_GATEWAY_STRATEGY,
  LINK_OR_GATEWAY_STRATEGY,
  LINK_NONE_STRATEGY,
  CreateBasicStrategy,
  CreateBasicIntervalStrategy,
  CreateGatewayStrategy,
  CreateOrGatewayStrategy,
  CreateTaskStrategy,
  CreatePropertyStrategy,
  BasicLinkStrategy,
  GatewayLinkStrategy,
  OrGatewayLinkStrategy,
  NoLinkStrategy,

  // misc
  typeTuppleList,
} from './index';

/**
 * Angular 16–19 compatible provider factory.
 * This replaces WorkflowBuilderModule.
 */
export function provideWorkflowCreator(env?: any) {
  return makeEnvironmentProviders([
    // 🔴 BPMN Moddle
    {
      provide: CustomBpmnModdle,
      useFactory: () => 
        new BPMNModdle({
          camunda: {
            ...camundaModdle,
            types: [...camundaModdle.types, ...CustomCamunda.types],
          },
        }),
    },

    {provide: BASE_XML, useValue: BASE_XML_VALUE},
    {provide: ENV_TOKEN, useValue: env},

    // 🔴 Core Services
    {provide: ElementService, useClass: BpmnElementService},
    {provide: NodeService, useClass: BpmnNodesService},
    {provide: BuilderService, useClass: BpmnBuilderService},

    AutoLayoutService,
    DiFactoryService,

    // 🔴 Nodes
    {provide: BPMN_NODES, useValue: ChangeColumnValueAction, multi: true},
    {provide: BPMN_NODES, useValue: SendEmailAction, multi: true},
    {provide: BPMN_NODES, useValue: OnChangeEvent, multi: true},
    {provide: BPMN_NODES, useValue: OnValueEvent, multi: true},
    {provide: BPMN_NODES, useValue: OnIntervalEvent, multi: true},
    {provide: BPMN_NODES, useValue: OnAddItemEvent, multi: true},
    {provide: BPMN_NODES, useValue: AndGroup, multi: true},
    {provide: BPMN_NODES, useValue: OrGroup, multi: true},

    // 🔴 Elements
    {provide: BPMN_ELEMENTS, useClass: StartElement, multi: true},
    {provide: BPMN_ELEMENTS, useClass: StartOnIntervalElement, multi: true},
    {provide: BPMN_ELEMENTS, useClass: EndElement, multi: true},
    {provide: BPMN_ELEMENTS, useClass: GatewayElement, multi: true},
    {provide: BPMN_ELEMENTS, useClass: OrGatewayElement, multi: true},
    {provide: BPMN_ELEMENTS, useClass: ProcessElement, multi: true},
    {provide: BPMN_ELEMENTS, useClass: TriggerWhenColumnChanges, multi: true},
    {provide: BPMN_ELEMENTS, useClass: TriggerOnInterval, multi: true},
    {provide: BPMN_ELEMENTS, useClass: TriggerOnAddItem, multi: true},
    {provide: BPMN_ELEMENTS, useClass: ReadColumnValue, multi: true},
    {provide: BPMN_ELEMENTS, useClass: SendEmail, multi: true},
    {provide: BPMN_ELEMENTS, useClass: ChangeColumnValue, multi: true},
    {provide: BPMN_ELEMENTS, useClass: ProcessPropertiesElement, multi: true},

    // 🔴 Inputs
    {provide: BPMN_INPUTS, useClass: ColumnInput, multi: true},
    {provide: BPMN_INPUTS, useClass: TriggerColumnInput, multi: true},
    {provide: BPMN_INPUTS, useClass: IntervalInput, multi: true},
    {provide: BPMN_INPUTS, useClass: ConditionInput, multi: true},
    {provide: BPMN_INPUTS, useClass: EmailDataInput, multi: true},
    {provide: BPMN_INPUTS, useClass: EmailToInput, multi: true},
    {provide: BPMN_INPUTS, useClass: EmailRecepientInput, multi: true},
    {provide: BPMN_INPUTS, useClass: ToColumnInput, multi: true},
    {provide: BPMN_INPUTS, useClass: ToValueInput, multi: true},
    {provide: BPMN_INPUTS, useClass: ValueInput, multi: true},
    {provide: BPMN_INPUTS, useClass: ValueTypeInput, multi: true},

    // 🔴 Strategies (this fixes your last error)
    {provide: CREATE_BASIC_STRATEGY, useClass: CreateBasicStrategy},
    {
      provide: CREATE_BASIC_INTERVAL_STRATEGY,
      useClass: CreateBasicIntervalStrategy,
    },
    {provide: CREATE_GATEWAY_STRATEGY, useClass: CreateGatewayStrategy},
    {provide: CREATE_OR_GATEWAY_STRATEGY, useClass: CreateOrGatewayStrategy},
    {provide: CREATE_TASK_STRATEGY, useClass: CreateTaskStrategy},
    {provide: CREATE_PROPERTIES_STRATEGY, useClass: CreatePropertyStrategy},

    {provide: LINK_BASIC_STRATEGY, useClass: BasicLinkStrategy},
    {provide: LINK_GATEWAY_STRATEGY, useClass: GatewayLinkStrategy},
    {provide: LINK_OR_GATEWAY_STRATEGY, useClass: OrGatewayLinkStrategy},
    {provide: LINK_NONE_STRATEGY, useClass: NoLinkStrategy},

    // 🔴 Misc
    {provide: CONDITION_LIST, useValue: typeTuppleList},
  ]);
}
