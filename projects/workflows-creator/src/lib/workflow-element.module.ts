/* eslint-disable @angular-eslint/use-lifecycle-interface */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {Injector} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {BuilderComponent} from './builder/builder.component';
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
  imports: [BrowserModule, BuilderComponent],
  providers: [LocalizationPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkflowElementModule {
  [x: string]: unknown;
  constructor(private injector: Injector, private local: LocalizationPipe) {}
  ngDoBootstrap() {
    const webComponent = createCustomElement(BuilderComponent, {
      injector: this.injector,
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
