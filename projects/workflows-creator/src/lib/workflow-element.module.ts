/* eslint-disable @angular-eslint/use-lifecycle-interface */
import {NgModule, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Injector} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import BPMNModdle from 'bpmn-moddle';
import {CustomBpmnModdle} from './types/bpmn.types';
import {CAMUNDA} from './schema/camunda.json';
import {NgxPopperjsModule} from 'ngx-popperjs';
import {BuilderComponent} from './builder/builder.component';
import {NodeComponent} from './builder/node/node.component';
import {FormsModule} from '@angular/forms';
import {GroupComponent} from './builder/group/group.component';
import {TooltipRenderComponent} from './builder/tooltip-render/tooltip-render.component';
import {LocalizationPipe} from './pipes/localization.pipe';
import {
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {createCustomElement} from '@angular/elements';
import {
  StateMap,
  RecordOfAnyType,
  Select,
  EventAddition,
  ActionAddition,
  InputChanged,
} from './types';
import {Input, Output, EventEmitter} from '@angular/core';
import {ElementService, NodeService, BuilderService} from './classes';
import {
  BASE_XML,
  BASE_XML_VALUE,
  BPMN_NODES,
  BPMN_ELEMENTS,
  BPMN_INPUTS,
  CONDITION_LIST,
  typeTuppleList,
} from './const';
import {AutoLayoutService, DiFactoryService} from './layout';
import {
  BpmnElementService,
  BpmnNodesService,
  BpmnBuilderService,
  ChangeColumnValueAction,
  SendEmailAction,
  OnChangeEvent,
  OnValueEvent,
  OnIntervalEvent,
  OnAddItemEvent,
  AndGroup,
  OrGroup,
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
  CREATE_BASIC_STRATEGY,
  CreateBasicStrategy,
  CREATE_BASIC_INTERVAL_STRATEGY,
  CreateBasicIntervalStrategy,
  CREATE_GATEWAY_STRATEGY,
  CreateGatewayStrategy,
  CREATE_OR_GATEWAY_STRATEGY,
  CreateOrGatewayStrategy,
  CREATE_TASK_STRATEGY,
  CreateTaskStrategy,
  CREATE_PROPERTIES_STRATEGY,
  CreatePropertyStrategy,
  LINK_BASIC_STRATEGY,
  BasicLinkStrategy,
  LINK_GATEWAY_STRATEGY,
  GatewayLinkStrategy,
  LINK_OR_GATEWAY_STRATEGY,
  OrGatewayLinkStrategy,
  LINK_NONE_STRATEGY,
  NoLinkStrategy,
} from './services';
@NgModule({
  declarations: [
    BuilderComponent,
    GroupComponent,
    NodeComponent,
    TooltipRenderComponent,
    LocalizationPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPopperjsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  entryComponents: [BuilderComponent],
  providers: [
    {
      provide: CustomBpmnModdle,
      useFactory: () => new BPMNModdle({camunda: CAMUNDA}),
    },
    {
      provide: BASE_XML,
      useValue: BASE_XML_VALUE,
    },
    {provide: ElementService, useClass: BpmnElementService},
    {provide: NodeService, useClass: BpmnNodesService},
    {provide: BuilderService, useClass: BpmnBuilderService},
    AutoLayoutService,
    DiFactoryService,
    {provide: BPMN_NODES, useValue: ChangeColumnValueAction, multi: true},
    {provide: BPMN_NODES, useValue: SendEmailAction, multi: true},
    {provide: BPMN_NODES, useValue: OnChangeEvent, multi: true},
    {provide: BPMN_NODES, useValue: OnValueEvent, multi: true},
    {provide: BPMN_NODES, useValue: OnIntervalEvent, multi: true},
    {provide: BPMN_NODES, useValue: OnAddItemEvent, multi: true},
    {provide: BPMN_NODES, useValue: AndGroup, multi: true},
    {provide: BPMN_NODES, useValue: OrGroup, multi: true},
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
    {provide: CONDITION_LIST, useValue: typeTuppleList},
  ],
})
@NgModule({
  declarations: [
    BuilderComponent,
    GroupComponent,
    NodeComponent,
    TooltipRenderComponent,
    LocalizationPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPopperjsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  entryComponents: [BuilderComponent],
})
export class WorkflowElementModule {
  [x: string]: any;
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    const webComponent = createCustomElement(BuilderComponent, {
      injector: this.injector,
      // Render the web component's template
    });
    customElements.define('sourceloop-workflow-element', webComponent);
  }
}
