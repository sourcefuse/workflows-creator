import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {WorkflowElementModule} from './lib/workflow-element.module';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(WorkflowElementModule)
  .catch(err => console.error(err));
