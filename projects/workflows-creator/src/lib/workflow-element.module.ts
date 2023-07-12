/* eslint-disable @angular-eslint/use-lifecycle-interface */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Injector} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgxPopperjsModule} from 'ngx-popperjs';
import {BuilderComponent} from './builder/builder.component';
import {FormsModule} from '@angular/forms';
import {WorkflowBuilderModule} from './workflow-builder.module';
import {
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {createCustomElement} from '@angular/elements';
import { LocalizationPipe } from './pipes/localization.pipe';
import { InputTypes, LocalizedStringKeys } from './enum';
import { ChangeColumnValueAction, OnChangeEvent, ColumnInput, ConditionInput, ToColumnInput, OnValueEvent, EmailToInput, EmailDataInput, EmailRecepientInput, ValueInput, IntervalInput, OnIntervalEvent, OnAddItemEvent, TriggerColumnInput, ValueTypeInput } from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgxPopperjsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    WorkflowBuilderModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  entryComponents: [BuilderComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
 
})
export class WorkflowElementModule {
  [x: string]: any;
  constructor(private injector: Injector,
    private local:LocalizationPipe) {}
  ngDoBootstrap() {
    const webComponent = createCustomElement(BuilderComponent, {
      injector: this.injector,
      // Render the web component's template
    });
    customElements.define('sourceloop-workflow-element', webComponent);
    const changeColumnValue = this.injector.get(ChangeColumnValueAction);
    const onAddItem = this.injector.get(OnAddItemEvent);
    const onInterval = this.injector.get(OnIntervalEvent);
    const columnInput = this.injector.get(ColumnInput);
    const conditionInput   = this.injector.get(ConditionInput );
    const toColumnInput = this.injector.get(ToColumnInput);
    const valueInput= this.injector.get(ValueInput);
    const onChangeEvent = this.injector.get(OnChangeEvent);
    const onValueEvent = this.injector.get(OnValueEvent);
    const emailDataInput = this.injector.get(EmailDataInput);
    const emailToInput = this.injector.get(EmailToInput);
    const intervalInput = this.injector.get(IntervalInput);
    const triggerColumnInput = this.injector.get(TriggerColumnInput);
    const valueTypeInput = this.injector.get(ValueTypeInput);
    const emailRecepientInput = this.injector.get(EmailRecepientInput);
    const inputTypes = this.injector.get(InputTypes);
    
    // to export the service for vanilla JS projects
    Object.assign(window, {
      changeColumnValue,
      onAddItem,
      onInterval,
      columnInput,
      conditionInput,
      toColumnInput,
      valueInput,
      onChangeEvent,
      onValueEvent,
      emailDataInput,
      emailToInput,
      intervalInput,
      triggerColumnInput,
      valueTypeInput,
      emailRecepientInput,
      inputTypes
    });
  }
}
