# Angular v20 Migration Plan
## WorkflowCreator Library (@sourceloop/workflows-creator)

---

## Executive Summary

This document outlines the comprehensive migration strategy for upgrading the WorkflowCreator library from **Angular 13.3** to **Angular 20**, making it compatible with parent applications running Angular v20.

**Current State:**
- Angular: 13.3.0
- TypeScript: 4.6.2
- RxJS: 7.5.0
- Build: Angular CLI 13.3.10, ng-packagr 13.0.0
- Package Type: Library bundled as .tgz

**Target State:**
- Angular: 20.x
- TypeScript: 5.4+ (required for Angular 20)
- RxJS: 7.8+
- Build: Angular CLI 20.x, ng-packagr 20.x
- Full compatibility with Angular 20 applications

**Migration Complexity:** HIGH - Spanning 7 major Angular versions (13→14→15→16→17→18→19→20)

---

## Phase 1: Pre-Migration Assessment & Preparation

### 1.1 Backup & Version Control
- [ ] Create a new branch `angular-v20-migration` from current main/master
- [ ] Tag current version: `git tag v0.0.0-pre-angular20`
- [ ] Document current working state and functionality
- [ ] Create comprehensive test scenarios for regression testing

### 1.2 Environment Setup
- [ ] Update Node.js to v18.19+ or v20+ (required for Angular 20)
- [ ] Update npm to version 9+ or 10+
- [ ] Clear node_modules and package-lock.json
- [ ] Document all custom build scripts and their purposes

### 1.3 Dependency Audit
- [ ] List all custom/internal code dependencies
- [ ] Identify deprecated APIs currently in use:
  - `@ViewChild()` without `static` flag (check if already fixed)
  - `ComponentFactoryResolver` (deprecated, use ViewContainerRef.createComponent)
  - Any usage of `DOCUMENT` from `@angular/common` instead of proper injection
  - `ReflectiveInjector` (replaced by `Injector.create()`)
  - `ngModuleFactory` patterns (Ivy makes these unnecessary)

- [ ] Check for usage of deprecated RxJS operators
- [ ] Review custom decorators and metadata usage

### 1.4 Documentation
- [ ] Document all current API surface area
- [ ] List all public exports from `public-api.ts`
- [ ] Document breaking changes acceptable for library consumers
- [ ] Create migration guide for library users

---

## Phase 2: Core Angular Migration (13 → 20)

### 2.1 Incremental Upgrade Strategy

Angular provides update migrations that must be run sequentially. **DO NOT skip versions.**

#### Step 2.1.1: Angular 13 → 14
```bash
ng update @angular/core@14 @angular/cli@14 --force --allow-dirty
ng update @angular/material@14 --allow-dirty  # if applicable
```

**Key Breaking Changes 13→14:**
- [ ] Simplified Page Title accessibility (use built-in `TitleStrategy`)
- [ ] Strictly typed forms enabled by default
- [ ] Update to TypeScript 4.6+
- [ ] `providedIn: 'any'` removed from `@Injectable()`
- [ ] `RouterLink` null/undefined inputs no longer navigate
- [ ] Fix any issues with typed forms in components

**Files to Check:**
- `lib/builder/builder.component.ts` - Forms usage
- All service files for `providedIn: 'any'`

#### Step 2.1.2: Angular 14 → 15
```bash
ng update @angular/core@15 @angular/cli@15 --force --allow-dirty
```

**Key Breaking Changes 14→15:**
- [ ] Standalone APIs introduced (optional to adopt)
- [ ] Directive composition API available
- [ ] Router guards as functions (old class-based guards deprecated)
- [ ] `@angular/platform-server` changes if doing SSR
- [ ] Remove `relativeLinkResolution: 'legacy'` if present
- [ ] Update to TypeScript 4.8+
- [ ] Node.js 14.20+ or 16.13+ required

**Migration Actions:**
- [ ] Consider converting to standalone components (optional but recommended)
- [ ] Update any router guards to functional guards
- [ ] Test all dependency injection patterns

#### Step 2.1.3: Angular 15 → 16
```bash
ng update @angular/core@16 @angular/cli@16 --force --allow-dirty
```

**Key Breaking Changes 15→16:**
- [ ] Signals API introduced (optional)
- [ ] Required inputs with `@Input({ required: true })`
- [ ] TypeScript 4.9.3+ required
- [ ] Improved hydration for SSR
- [ ] `ngcc` removed (Ivy-only)
- [ ] `DestroyRef` for cleanup (replaces some `ngOnDestroy` patterns)
- [ ] Self-closing tags support in templates

**Migration Actions:**
- [ ] Review and mark required inputs: `@Input({ required: true })`
- [ ] Consider using `DestroyRef` for subscriptions cleanup
- [ ] Update templates to use self-closing tags where appropriate:
  ```html
  <!-- Old -->
  <workflow-node></workflow-node>

  <!-- New (optional) -->
  <workflow-node />
  ```

#### Step 2.1.4: Angular 16 → 17
```bash
ng update @angular/core@17 @angular/cli@17 --force --allow-dirty
```

**Key Breaking Changes 16→17:**
- [ ] New control flow syntax (`@if`, `@for`, `@switch`) - preferred over `*ngIf`, `*ngFor`
- [ ] Deferrable views (`@defer`) for lazy loading
- [ ] TypeScript 5.2+ required
- [ ] New application builder (esbuild-based) available
- [ ] View transitions API support
- [ ] SSR improvements with new `@angular/ssr` package

**Migration Actions:**
- [ ] **CRITICAL:** Migrate templates to new control flow:
  ```html
  <!-- Old -->
  <div *ngIf="condition">Content</div>
  <div *ngFor="let item of items">{{ item }}</div>

  <!-- New -->
  @if (condition) {
    <div>Content</div>
  }
  @for (item of items; track item.id) {
    <div>{{ item }}</div>
  }
  ```
  Run migration: `ng generate @angular/core:control-flow`

- [ ] Add `track` expression to all `@for` loops
- [ ] Update build configuration to use new builder (optional but recommended)

**Files to Migrate:**
- `lib/builder/builder.component.html`
- `lib/builder/group/group.component.html`
- `lib/builder/node/node.component.html`
- `lib/builder/tooltip-render/tooltip-render.component.html`
- All other template files

#### Step 2.1.5: Angular 17 → 18
```bash
ng update @angular/core@18 @angular/cli@18 --force --allow-dirty
```

**Key Breaking Changes 17→18:**
- [ ] Route redirects as functions
- [ ] New zoneless change detection (experimental, opt-in)
- [ ] Material 3 design system
- [ ] TypeScript 5.4+ required
- [ ] Enhanced debugging tools
- [ ] `ng-content` fallback content support

**Migration Actions:**
- [ ] Test zoneless change detection (optional): Set `provideExperimentalZonelessChangeDetection()`
- [ ] Review `ng-content` usage for fallback content opportunities
- [ ] Update any custom change detection logic

#### Step 2.1.6: Angular 18 → 19
```bash
ng update @angular/core@19 @angular/cli@19 --force --allow-dirty
```

**Key Breaking Changes 18→19:**
- [ ] Incremental hydration improvements
- [ ] `LinkedSignal` API for signal-based state management
- [ ] Hot module replacement (HMR) improvements
- [ ] TypeScript 5.4+ required
- [ ] Server-side rendering enhancements

**Migration Actions:**
- [ ] Consider adopting signals for state management (optional)
- [ ] Review and test HMR during development
- [ ] Update any custom server-side rendering code

#### Step 2.1.7: Angular 19 → 20
```bash
ng update @angular/core@20 @angular/cli@20 --force --allow-dirty
```

**Key Breaking Changes 19→20:**
- [ ] TypeScript 5.4 or 5.5 required
- [ ] Potential view encapsulation changes
- [ ] Further signal-based APIs
- [ ] Build optimizations
- [ ] Node.js 18.19+ or 20.x required

**Migration Actions:**
- [ ] Review all breaking changes in Angular 20 release notes
- [ ] Test all public APIs
- [ ] Verify build output size and performance

---

## Phase 3: TypeScript & Build Tooling Updates

### 3.1 TypeScript Migration
- [ ] Upgrade TypeScript from 4.6.2 to 5.4+ (required for Angular 20)
- [ ] Update `tsconfig.json` compiler options:
  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "ES2022",
      "lib": ["ES2022", "dom"],
      "useDefineForClassFields": false,  // Important for Angular decorators
      "strict": true,
      "strictPropertyInitialization": false
    }
  }
  ```
- [ ] Fix new TypeScript strict checks and type errors
- [ ] Update `tsconfig.lib.json` and `tsconfig.spec.json` accordingly

### 3.2 Build Tooling
- [ ] Upgrade `@angular/cli` to v20
- [ ] Upgrade `@angular-devkit/build-angular` to v20
- [ ] Upgrade `ng-packagr` to v20
- [ ] Update `angular.json` configuration:
  ```json
  {
    "cli": {
      "analytics": false,
      "schematicCollections": ["@angular-eslint/schematics"]
    }
  }
  ```
- [ ] Migrate to new esbuild-based builder (recommended):
  ```json
  {
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:application"
      }
    }
  }
  ```
- [ ] Update `ng-package.json` for any new options

### 3.3 Module System
- [ ] Keep using ES2022 modules
- [ ] Ensure `tslib` is updated to latest (^2.6.0+)
- [ ] Verify tree-shaking is working correctly

---

## Phase 4: Third-Party Library Updates

### 4.1 Critical Dependencies

#### 4.1.1 @ng-bootstrap/ng-bootstrap
**Current:** 12.1.2 → **Target:** 17.x

```bash
npm install @ng-bootstrap/ng-bootstrap@latest
```

**Breaking Changes:**
- [ ] Bootstrap 5 peer dependency required
- [ ] Remove Bootstrap 4 if present
- [ ] Update all `ng-bootstrap` component usages
- [ ] Check modal, dropdown, tooltip APIs for breaking changes
- [ ] Update imports if module structure changed

**Files to Check:**
- `lib/builder/builder.component.ts` - Check for ng-bootstrap imports
- All components using modals, tooltips, dropdowns

#### 4.1.2 ngx-popperjs
**Current:** 13.3.0 → **Check Latest Compatibility**

```bash
npm install ngx-popperjs@latest @popperjs/core@latest
```

**Actions:**
- [ ] Verify ngx-popperjs has Angular 20 compatible version
- [ ] If not compatible, consider alternatives:
  - Use `@ng-bootstrap/ng-bootstrap` tooltips/popovers
  - Use Angular CDK Overlay
  - Use Floating UI (successor to Popper.js)
- [ ] Update all `ngx-popperjs` directive usages
- [ ] Test tooltip rendering in `TooltipRenderComponent`

#### 4.1.3 ng-multiselect-dropdown
**Current:** 0.3.9 → **Target:** Latest or Alternative

```bash
npm install ng-multiselect-dropdown@latest
```

**Actions:**
- [ ] Check if library has Angular 20 support
- [ ] If not maintained, consider alternatives:
  - `@ng-select/ng-select` (recommended, actively maintained)
  - `primeng` MultiSelect
  - Angular Material Select with multiple
- [ ] Migration to `@ng-select/ng-select` (recommended):
  ```bash
  npm install @ng-select/ng-select
  ```
- [ ] Update component imports and templates
- [ ] Update styles and theme configuration

**Files to Check:**
- `lib/builder/tooltip-render/tooltip-render.component.ts`
- Search for `ng-multiselect-dropdown` usage

#### 4.1.4 bpmn-moddle
**Current:** 8.0.0 → **Target:** Latest (10.x)

```bash
npm install bpmn-moddle@latest
```

**Actions:**
- [ ] Review bpmn-moddle changelog for breaking changes
- [ ] Test BPMN generation and parsing
- [ ] Verify custom Camunda schema still works

**Files to Check:**
- `lib/services/bpmn/builder.service.ts`
- `lib/services/bpmn/element.service.ts`
- All BPMN-related services

#### 4.1.5 moment.js
**Current:** 2.29.4 → **Consider Migration to date-fns or Temporal API**

**Recommendation:** Migrate away from moment.js (legacy mode)

**Option A: Keep moment.js (Quick Fix)**
```bash
npm install moment@latest
```

**Option B: Migrate to date-fns (Recommended)**
```bash
npm install date-fns
npm uninstall moment
```

**Migration Actions (if using date-fns):**
- [ ] Replace all `moment()` calls with `date-fns` functions
- [ ] Common replacements:
  ```typescript
  // Old
  import * as moment from 'moment';
  moment().format('YYYY-MM-DD');

  // New
  import { format } from 'date-fns';
  format(new Date(), 'yyyy-MM-dd');
  ```
- [ ] Update date parsing logic
- [ ] Update timezone handling if used

**Files to Check:**
- Search codebase for `moment` imports
- Check interval/date handling in workflow inputs

#### 4.1.6 lodash
**Current:** 4.17.21 → **Target:** 4.17.21 (stable, no changes needed)

- [ ] Update to latest patch version if available
- [ ] Consider using ES module imports for better tree-shaking:
  ```typescript
  // Instead of
  import * as _ from 'lodash';

  // Use
  import { cloneDeep, isEqual } from 'lodash-es';
  ```

### 4.2 RxJS Update
**Current:** 7.5.0 → **Target:** 7.8+

```bash
npm install rxjs@latest
```

**Breaking Changes:**
- [ ] Review deprecated operators (most already removed in RxJS 7)
- [ ] Update subscription handling patterns
- [ ] Test all Observable chains
- [ ] Consider adopting RxJS 8 if released (major changes expected)

**Files to Check:**
- `lib/services/bpmn/builder.service.ts`
- `lib/classes/state/state.ts`
- All services using Observables

### 4.3 Development Dependencies

#### 4.3.1 ESLint & Angular ESLint
```bash
npm install --save-dev @angular-eslint/builder@latest \
  @angular-eslint/eslint-plugin@latest \
  @angular-eslint/eslint-plugin-template@latest \
  @angular-eslint/schematics@latest \
  @angular-eslint/template-parser@latest \
  @typescript-eslint/eslint-plugin@latest \
  @typescript-eslint/parser@latest \
  eslint@latest
```

**Actions:**
- [ ] Update `.eslintrc.json` configuration
- [ ] Fix new linting errors
- [ ] Update linting scripts

#### 4.3.2 Testing Framework
```bash
npm install --save-dev jasmine-core@latest \
  karma@latest \
  karma-chrome-launcher@latest \
  karma-coverage@latest \
  karma-jasmine@latest \
  karma-jasmine-html-reporter@latest \
  @types/jasmine@latest
```

**Actions:**
- [ ] Update `karma.conf.js` configuration
- [ ] Ensure tests run with new Jasmine version
- [ ] Update test utilities and helpers

#### 4.3.3 Prettier & Code Quality
```bash
npm install --save-dev prettier@latest \
  husky@latest \
  commitizen@latest \
  @commitlint/cli@latest \
  @commitlint/config-conventional@latest
```

**Actions:**
- [ ] Update Husky hooks (v8+ uses different setup)
- [ ] Run: `npx husky install`
- [ ] Update `.husky/` directory with new hook scripts
- [ ] Test git hooks functionality

#### 4.3.4 TypeDoc & Documentation
```bash
npm install --save-dev typedoc@latest typedoc-umlclass@latest
```

**Actions:**
- [ ] Update TypeDoc configuration
- [ ] Regenerate documentation
- [ ] Verify all exports are documented

---

## Phase 5: Code Migration & Breaking Changes

### 5.1 Template Migrations

#### 5.1.1 Control Flow Migration
Run automated migration:
```bash
ng generate @angular/core:control-flow
```

**Manual Review Required:**
- [ ] `lib/builder/builder.component.html` - Complex conditions and loops
- [ ] `lib/builder/group/group.component.html` - AND/OR group rendering
- [ ] `lib/builder/node/node.component.html` - Node type switching
- [ ] `lib/builder/tooltip-render/tooltip-render.component.html` - Input type rendering

**Pattern Updates:**
```html
<!-- BEFORE -->
<div *ngIf="events && events.length > 0">
  <div *ngFor="let event of events; let i = index">
    {{ event.name }}
  </div>
</div>

<!-- AFTER -->
@if (events && events.length > 0) {
  @for (event of events; track event.id || $index) {
    <div>{{ event.name }}</div>
  }
}
```

**Switch Statement Updates:**
```html
<!-- BEFORE -->
<div [ngSwitch]="inputType">
  <input *ngSwitchCase="'text'" type="text" />
  <input *ngSwitchCase="'email'" type="email" />
  <span *ngSwitchDefault>Unknown</span>
</div>

<!-- AFTER -->
@switch (inputType) {
  @case ('text') { <input type="text" /> }
  @case ('email') { <input type="email" /> }
  @default { <span>Unknown</span> }
}
```

#### 5.1.2 Track By Functions
- [ ] Add track expressions to all `@for` loops
- [ ] Use unique identifiers where available:
  ```html
  @for (item of items; track item.id) { ... }
  @for (item of items; track $index) { ... }
  ```

### 5.2 Component Class Updates

#### 5.2.1 Input Validation
Update component inputs with required flag:
```typescript
// Before
@Input() state: State;
@Input() diagram: string;

// After
@Input({ required: true }) state!: State;
@Input({ required: true }) diagram!: string;
@Input() localizedStringMap?: Record<string, string>; // Optional inputs
```

**Files to Update:**
- `lib/builder/builder.component.ts`
- `lib/builder/group/group.component.ts`
- `lib/builder/node/node.component.ts`
- All other components with `@Input()` decorators

#### 5.2.2 ViewChild Updates
Ensure all `@ViewChild` and `@ViewChildren` have proper static flags:
```typescript
// For elements accessed in ngOnInit
@ViewChild('template', { static: true }) template!: TemplateRef<any>;

// For elements accessed after ngOnInit
@ViewChild('dynamicContent', { static: false }) content!: ElementRef;
```

#### 5.2.3 Lifecycle Hooks & DestroyRef
Consider migrating to `DestroyRef` for cleanup:
```typescript
// Old pattern
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(...);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// New pattern (Angular 16+)
export class MyComponent {
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.service.data$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(...);
  }
}
```

### 5.3 Dependency Injection Updates

#### 5.3.1 Remove `providedIn: 'any'`
```typescript
// Before
@Injectable({ providedIn: 'any' })
export class MyService {}

// After
@Injectable({ providedIn: 'root' })
// or provide in specific modules/components
```

#### 5.3.2 Constructor Injection vs inject()
Consider using modern `inject()` function:
```typescript
// Traditional
constructor(
  private service: MyService,
  private http: HttpClient
) {}

// Modern (optional, more flexible)
private service = inject(MyService);
private http = inject(HttpClient);
```

### 5.4 Module Structure (Optional: Standalone Migration)

**Decision Point:** Convert to standalone components?

**Option A: Keep NgModule (Simpler)**
- Maintain `WorkflowBuilderModule`
- Less migration work
- Still fully supported in Angular 20

**Option B: Migrate to Standalone (Modern)**
- Remove `WorkflowBuilderModule`
- Make all components standalone
- Better tree-shaking
- Easier lazy loading

**Recommendation:** Keep NgModule for library to maintain backward compatibility, but mark components as standalone-compatible:
```typescript
@Component({
  selector: 'workflow-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ...],
  templateUrl: './builder.component.html'
})
```

Then provide compatibility module:
```typescript
@NgModule({
  imports: [BuilderComponent],
  exports: [BuilderComponent]
})
export class WorkflowBuilderModule {}
```

### 5.5 Zone.js Updates
**Current:** 0.11.4 → **Target:** 0.14.x

```bash
npm install zone.js@latest
```

**Actions:**
- [ ] Update zone.js import in `polyfills.ts` (if exists)
- [ ] Test change detection in all components
- [ ] Consider zoneless change detection for future (experimental)

### 5.6 SCSS/CSS Updates
- [ ] Review any deprecated SCSS features
- [ ] Update if using `/deep/`, `>>>`, or `::ng-deep` (deprecated but still works)
- [ ] Test all component styles render correctly
- [ ] Verify icon fonts and custom styles

---

## Phase 6: Build Configuration Updates

### 6.1 Update angular.json
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "cli": {
    "analytics": false,
    "schematicCollections": ["@angular-eslint/schematics"]
  },
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "workflows-creator": {
      "projectType": "library",
      "root": "projects/workflows-creator",
      "sourceRoot": "projects/workflows-creator/src",
      "prefix": "lib",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr",
          "options": {
            "project": "projects/workflows-creator/ng-package.json"
          },
          "configurations": {
            "production": {
              "tsConfig": "projects/workflows-creator/tsconfig.lib.prod.json"
            },
            "development": {
              "tsConfig": "projects/workflows-creator/tsconfig.lib.json"
            }
          },
          "defaultConfiguration": "production"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "tsConfig": "projects/workflows-creator/tsconfig.spec.json",
            "karmaConfig": "projects/workflows-creator/karma.conf.js",
            "polyfills": ["zone.js", "zone.js/testing"]
          }
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": [
              "projects/workflows-creator/**/*.ts",
              "projects/workflows-creator/**/*.html"
            ]
          }
        }
      }
    }
  }
}
```

### 6.2 Update ng-package.json
```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/workflows-creator",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

### 6.3 Update package.json Scripts
```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test --no-watch --browsers=ChromeHeadless",
    "test:watch": "ng test",
    "test:ci": "ng test --no-watch --no-progress --browsers=ChromeHeadlessCI --code-coverage",
    "lint": "ng lint",
    "lint:fix": "ng lint --fix",
    "prettier:check": "prettier \"**/*.{ts,js,html,scss,css,json,md}\" --check",
    "prettier:fix": "prettier \"**/*.{ts,js,html,scss,css,json,md}\" --write",
    "workflowBuild": "ng build workflows-creator && cp -r projects/workflows-creator/src/assets dist/workflows-creator/",
    "build:docs": "typedoc --out docs",
    "prepare": "husky install"
  }
}
```

### 6.4 Update karma.conf.js
```javascript
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Jasmine configuration
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/workflows-creator'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    restartOnFileChange: true
  });
};
```

---

## Phase 7: Testing & Quality Assurance

### 7.1 Unit Tests
- [ ] Run all unit tests: `npm test`
- [ ] Fix failing tests due to:
  - Template syntax changes
  - API signature changes
  - Mock/spy updates needed
  - Async testing patterns
- [ ] Ensure code coverage remains above threshold
- [ ] Update test utilities and helper functions

### 7.2 Component Testing
- [ ] Test `BuilderComponent` functionality
  - Event addition/deletion
  - Action addition/deletion
  - Group management (AND/OR)
  - State synchronization
  - Undo/Redo operations
- [ ] Test `GroupComponent` rendering
- [ ] Test `NodeComponent` interactions
- [ ] Test `TooltipRenderComponent` for all input types

### 7.3 Service Testing
- [ ] Test `BpmnBuilderService`
  - Statement to BPMN conversion
  - BPMN to Statement restoration
  - Complex workflow scenarios
- [ ] Test `BpmnElementService` element management
- [ ] Test `BpmnNodesService` node registry
- [ ] Test `AutoLayoutService` diagram layout
- [ ] Test `State` class undo/redo functionality

### 7.4 Integration Testing
- [ ] Create a test Angular 20 application
- [ ] Install the library as .tgz:
  ```bash
  npm run workflowBuild
  cd dist/workflows-creator
  npm pack
  cd /path/to/test-app
  npm install /path/to/workflows-creator-0.0.0.tgz
  ```
- [ ] Test all public APIs
- [ ] Test BPMN generation and parsing
- [ ] Test custom node registration
- [ ] Test custom element registration
- [ ] Test localization
- [ ] Test all input types rendering

### 7.5 Build Verification
- [ ] Build library: `npm run workflowBuild`
- [ ] Verify output in `dist/workflows-creator/`:
  - `fesm2022/` directory exists
  - `.d.ts` files generated
  - `package.json` has correct peer dependencies
  - Assets copied correctly
- [ ] Check bundle size (should not increase significantly)
- [ ] Verify tree-shaking works

### 7.6 Browser Compatibility
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Verify no console errors or warnings

---

## Phase 8: Documentation & Release Preparation

### 8.1 Update Documentation
- [ ] Update `README.md` with Angular 20 requirements
- [ ] Update `WORKFLOW_CREATOR_DOCUMENTATION.md`
- [ ] Create `MIGRATION_GUIDE.md` for library users:
  - Breaking changes in the library
  - Required peer dependency updates
  - Template syntax changes if any
  - API changes if any

### 8.2 Update package.json Metadata
```json
{
  "name": "@sourceloop/workflows-creator",
  "version": "1.0.0",
  "peerDependencies": {
    "@angular/animations": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "rxjs": "^7.8.0",
    "zone.js": "^0.14.0"
  },
  "dependencies": {
    "tslib": "^2.6.0"
  },
  "engines": {
    "node": ">=18.19.0 || >=20.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 8.3 Create CHANGELOG.md
Document all changes:
```markdown
# Changelog

## [1.0.0] - 2025-XX-XX

### Breaking Changes
- Upgraded to Angular 20 (requires Angular 20+ in consuming applications)
- Upgraded TypeScript to 5.4+ (peer dependency update required)
- Upgraded RxJS to 7.8+ (peer dependency update required)
- Migrated templates to new control flow syntax (`@if`, `@for`, `@switch`)
- [List any API changes]

### Added
- Support for Angular 20 signals (if applicable)
- Support for new Angular 20 features

### Changed
- Updated all dependencies to latest compatible versions
- Improved build configuration with esbuild
- Enhanced tree-shaking and bundle size optimization

### Deprecated
- [List any deprecated features]

### Removed
- [List any removed features]

### Fixed
- [List bug fixes]
```

### 8.4 Update Public API Exports
Review `public-api.ts`:
```typescript
/*
 * Public API Surface of workflows-creator
 */

// Main module
export * from './lib/workflow-builder.module';

// Components
export * from './lib/builder/builder.component';

// Services
export * from './lib/services/bpmn/builder.service';
export * from './lib/services/bpmn/element.service';
export * from './lib/services/bpmn/nodes.service';
// ... other exports

// Models & Types
export * from './lib/classes/nodes/node';
export * from './lib/classes/state/state';
export * from './lib/classes/statement/statement';
// ... other exports

// DI Tokens
export * from './lib/types/bpmn-elements.token';
export * from './lib/types/bpmn-inputs.token';
export * from './lib/types/bpmn-nodes.token';
```

### 8.5 Generate TypeDoc Documentation
```bash
npm run build:docs
```

### 8.6 Pre-Release Checklist
- [ ] All tests passing
- [ ] Linting passing
- [ ] Prettier formatting applied
- [ ] No console errors or warnings
- [ ] Build succeeds without errors
- [ ] Assets copied correctly
- [ ] Documentation updated
- [ ] CHANGELOG.md created
- [ ] Git history clean (squash if needed)

---

## Rollback Plan

If migration fails or issues are discovered:

### Immediate Rollback
1. Switch back to pre-migration branch:
   ```bash
   git checkout master
   git branch -D angular-v20-migration
   ```

2. Restore from tag:
   ```bash
   git checkout v0.0.0-pre-angular20
   ```

### Partial Rollback
1. Identify problematic phase
2. Revert specific commits:
   ```bash
   git revert <commit-hash>
   ```
3. Fix issues incrementally

---

## Risk Assessment & Mitigation

### High-Risk Areas

#### 1. Template Migration (`@if`, `@for`)
**Risk:** Complex templates may not migrate cleanly
**Mitigation:**
- Manually review each template after automated migration
- Test all conditional rendering scenarios
- Verify loop tracking functions work correctly

#### 2. Third-Party Library Compatibility
**Risk:** `ng-multiselect-dropdown` and `ngx-popperjs` may not support Angular 20
**Mitigation:**
- Identify alternative libraries before starting migration
- Budget time for library replacement
- Consider using Angular Material components

#### 3. BPMN Integration
**Risk:** Breaking changes in `bpmn-moddle` or BPMN generation logic
**Mitigation:**
- Comprehensive testing of BPMN workflows
- Keep BPMN test fixtures for regression testing
- Document BPMN format expectations

#### 4. Build Breaking Changes
**Risk:** ng-packagr or build pipeline breaks
**Mitigation:**
- Test build early and often
- Keep backup of working build configuration
- Review ng-packagr migration guides

#### 5. Consumer Application Integration
**Risk:** Breaking changes affect parent Angular 20 apps
**Mitigation:**
- Create comprehensive migration guide
- Offer support period for consumers
- Consider maintaining Angular 13 version temporarily

---

## Timeline Estimation

**Total Estimated Time:** 3-5 weeks (depending on issues encountered)

- **Phase 1 (Preparation):** 2-3 days
- **Phase 2 (Angular Migration):** 1-2 weeks (incremental upgrades)
- **Phase 3 (TypeScript/Build):** 2-3 days
- **Phase 4 (Dependencies):** 3-5 days
- **Phase 5 (Code Changes):** 1 week
- **Phase 6 (Build Config):** 1-2 days
- **Phase 7 (Testing):** 1 week
- **Phase 8 (Documentation):** 2-3 days

**Note:** Timeline excludes time for fixing unexpected issues or replacing incompatible libraries.

---

## Success Criteria

Migration is complete when:

- [ ] Library builds successfully with Angular 20
- [ ] All unit tests pass (>90% coverage maintained)
- [ ] Library can be installed in Angular 20 application
- [ ] All public APIs work as expected
- [ ] BPMN generation and parsing work correctly
- [ ] No console errors or warnings
- [ ] Performance is equal or better than Angular 13 version
- [ ] Documentation is updated
- [ ] Migration guide is created
- [ ] Changelog is published

---

## Post-Migration Tasks

### Immediate (Week 1)
- [ ] Create release branch
- [ ] Tag release version
- [ ] Publish to npm registry (or internal registry)
- [ ] Notify library consumers
- [ ] Monitor for issues

### Short-term (Month 1)
- [ ] Address any issues reported by consumers
- [ ] Create FAQ for common migration problems
- [ ] Consider blog post or announcement
- [ ] Update internal documentation

### Long-term (Quarter 1)
- [ ] Evaluate adopting new Angular features:
  - Signals for state management
  - Standalone components fully
  - Zoneless change detection
- [ ] Consider performance optimizations enabled by Angular 20
- [ ] Plan for Angular 21 when released

---

## Additional Resources

### Official Documentation
- [Angular Update Guide](https://update.angular.io/?v=13.0-20.0)
- [Angular v20 Release Notes](https://github.com/angular/angular/releases)
- [Angular CLI Migration Guides](https://angular.io/cli/update)
- [TypeScript 5.4 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html)

### Community Resources
- [Angular Blog](https://blog.angular.io/)
- [ng-conf talks on YouTube](https://www.youtube.com/c/ngconf)
- Stack Overflow `angular` tag

### Tools
- [Angular Update Guide Interactive Tool](https://update.angular.io/)
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) for dependency updates
- [depcheck](https://www.npmjs.com/package/depcheck) for unused dependencies

---

## Contact & Support

For migration questions or issues:
- Review this migration plan
- Check official Angular documentation
- Search existing issues in repository
- Create new issue with `[Migration]` prefix

---

**Document Version:** 1.0
**Last Updated:** 2025-01-11
**Prepared By:** Claude Code
**Status:** Ready for Implementation
