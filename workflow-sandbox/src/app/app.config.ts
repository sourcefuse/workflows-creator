import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayModule} from '@angular/cdk/overlay';

import {routes} from './app.routes';
import {provideWorkflowCreator} from '@sourceloop/workflows-creator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),

    // App-level Angular modules
    importProvidersFrom(BrowserAnimationsModule, OverlayModule),

    provideWorkflowCreator((window as any).workflowEnv),
  ],
};
