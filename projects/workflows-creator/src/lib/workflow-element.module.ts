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
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {createCustomElement} from '@angular/elements';
import {LocalizationPipe} from './pipes/localization.pipe';
import {
  ChangeColumnValueAction,
  OnChangeEvent,
  ColumnInput,
  ConditionInput,
  ToColumnInput,
  OnValueEvent,
  EmailToInput,
  EmailDataInput,
  EmailRecepientInput,
  ValueInput,
  IntervalInput,
  OnIntervalEvent,
  OnAddItemEvent,
  TriggerColumnInput,
  ValueTypeInput,
} from './services';
import {InputTypes} from './enum';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgxPopperjsModule,
    WorkflowBuilderModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  entryComponents: [BuilderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkflowElementModule {
  [x: string]: any;
  constructor(private injector: Injector, private local: LocalizationPipe) {}
  ngDoBootstrap() {
    const webComponent = createCustomElement(BuilderComponent, {
      injector: this.injector,
      // Render the web component's template
    });
    customElements.define('sourceloop-workflow-element', webComponent);

    // to export the service for vanilla JS projects
    Object.assign(window, {
      ChangeColumnValueAction,
      OnAddItemEvent,
      OnIntervalEvent,
      ColumnInput,
      ConditionInput,
      ToColumnInput,
      ValueInput,
      OnChangeEvent,
      IntervalInput,
      OnValueEvent,
      EmailDataInput,
      EmailToInput,
      TriggerColumnInput,
      ValueTypeInput,
      EmailRecepientInput,
      InputTypes,
    });
  }
}
