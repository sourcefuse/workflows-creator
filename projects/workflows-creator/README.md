An Angular Client to develop workflows using an intuitive statement based UI.

## Installation

```bash

npm i @sourceloop/workflows-creator

```

## Usage

- Install the workflows-creator
  `npm i @sourceloop/workflows-creator`
- Import the `WorkflowBuilderModule` in the required module -

  ```typescript
    ...
    imports: [
        ...
        WorkflowBuilderModule,
        ...
    ],
  ```

- Use the component selector in your application -

  ```html
  <workflow-builder
    [(state)]="state"
    [(diagram)]="diagram"
    (eventAdded)="elementClick($event)"
    (actionAdded)="elementClick($event)"
    (itemChanged)="valueChanges($event)"
  ></workflow-builder>
  ```

  - `state` is the initial state object
  - `diagram` is initial BPMN Diagram respectively.
  - `eventAdded` - this event fires whenever a new event is added in the workflow
  - `actionAdded` - this event fires whenever a new action is added in the workflow
  - `itemChange` - this event fires whenever a user input changes

### Configurations

#### Nodes

- Each Statement is made up of nodes -

  - Events - Triggers or Checks that lead to an action
  - Action - Actually task performed by the workflow

- You can create your own nodes by extending the `WorkflowNode` class.
- To register this node for use, provide it to the `BPMN_NODES` token -

```typescript
{provide: BPMN_NODES, useValue: CustomNode, multi: true},
```

#### Element

- Each Node is based on certain base elements like tasks, gateways, etc.
- You can create your own BPMN Elements by extending the `BpmnElement` class.
- You can also create any custom element by extending the `WorkflowElement` class(in case working with a non-BPMN workflow engine).
- To register this element for use, provide it to the `BPMN_INPUTS` token -

```typescript
{provide: BPMN_ELEMENTS, useValue: CustomElement, multi: true},
```

#### Prompts

- Each Node also has some prompts or inputs from the users.
- You can create your own Prompt by extending the `WorkflowPrompt` class.
- To register this prompt for use, provide it to the token -

```typescript
{provide: BPMN_INPUTS, useValue: CustomInput, multi: true},
```

## Web Component

- This library is also available as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) so users of frameworks like React and Vue
  can also integrate this workflow creator element in their application with minimal effort.

### Installation

```bash
npm i @sourceloop/workflows-creator
```

- In the node modules you can find two files relevant to the element - `workflows-element/dist/workflows-element.js` & `workflows-element/dist/style.css`.
  How you serve and include these files in your non Angular project depend on the framework that you are using. For example, for Vanilla JS and HTML you can simply import the js and styles in your HTML ->

```html
<script type="text/javascript" src="workflows-element.js"></script>
```

### Usage

The web component accepts all the same inputs and services as the regular Angular Module, but instead of passing them through bindings and DI, you pass them as properties of the element as shown below.

```html
<!DOCTYPE html>
<html>
  <head>
      <link rel="stylesheet" type="text/css" href="/assets/icons/icomoon/style.css"/>
      <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
     <sourceloop-workflow-element></sourceloop-workflow-element>
     <script type="text/javascript" src="workflows-element.js"></script>

    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const element = document.querySelector("sourceloop-workflow-element");

        element.allColumns = [
        {
          text: 'Status',
          value: '{{Status}}',
        },
        {
          text: 'People',
          value: '{{People}}',
        },
        {
          text: 'Text',
          value: '{{Text}}',
        },
      ];

      const NORMALIZED_COLUMN = [
          {
            text: "Status",
            value: "1952177d-9a3e-6ef4-ae8f-522c08153026",
          },
          {
            text: "Priority",
            value: "1952177d-9a3e-6ef4-ae8f-522c08153026",
          },
          {
            text: "Text",
            value: "2069d144-db46-0737-2c9d-bc339949d684",
          },
          
        ];

        const CONDITIONS = {
          date: DATE_CONDITIONS,
          datetime: DATE_CONDITIONS,
        };

        const DEFAULT_CONDITION = [
          { text: "Equal", value: "equal" },
          { text: "Not Equal", value: "notequal" },

        ];
        const DATE_CONDITIONS = [
          { text: "Past Today", value: "pastToday" },
          { text: "Coming In", value: "comingIn" },
          { text: "Past by", value: "pastby" },

        ];
         const VALUE_TYPES = [
          {
            text: "ANYTHING",
            value: "anyValue",
          },
          {
            text: "CUSTOM_VALUE",
            value: "customValue",
          },
        ];
        element.state={
          columns: NORMALIZED_COLUMN,
          conditions: [],
          values: [],
        };
      })
       </script>
        </body>
      </html>
```
      

