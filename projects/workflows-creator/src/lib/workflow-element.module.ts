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
  }
}
