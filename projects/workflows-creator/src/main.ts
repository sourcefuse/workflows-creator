import {createApplication} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {Injector} from '@angular/core';
import {BuilderComponent} from './lib/builder/builder.component';
import {provideWorkflowCreator} from './lib/provide-workflow-creator';
import {InputTypes} from './lib/enum';
import {
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
} from './lib';

// Create application context for custom element (no component bootstrapping)
createApplication({
  providers: [provideWorkflowCreator((window as any).workflowEnv)],
})
  .then(appRef => {
    // Create and register the custom element
    const webComponent = createCustomElement(BuilderComponent, {
      injector: appRef.injector,
    });
    customElements.define('sourceloop-workflow-element', webComponent);

    // Export services for vanilla JS projects
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
  })
  .catch(err => console.error(err));
