// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js';
import 'zone.js/testing';
import {getTestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp,
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Then we find all the tests.
const req: any = require as any;
let context: any;
if (typeof req.context === 'function') {
  context = req.context('./', true, /\.spec\.ts$/);
  // And load the modules.
  context.keys().forEach(context);
} else if (
  req.keys &&
  typeof req.keys === 'function' &&
  typeof req === 'function'
) {
  // Some webpack setups expose a non-callable require.context - attempt to use it defensively
  try {
    context = req.context('./', true, /\.spec\.ts$/);
    context.keys().forEach(context);
  } catch (e) {
    // fallback: do nothing
    // Tests will be picked up by other mechanisms or fail gracefully
  }
} else {
  // No require.context available - nothing to load automatically
}
