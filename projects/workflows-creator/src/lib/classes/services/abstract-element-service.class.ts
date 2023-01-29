import {WorkflowElement} from '../element/abstract-element.class';
import {RecordOfAnyType} from '../../types/base.types';
import {StatementNode} from '../statement';

/*
 * This class is used to create instances of the different types of workflow elements.
 * The createInstanceByName function is used to create a new instance of a workflow element based on its name.
 * The cloneInstance function is used to clone an existing workflow element.
 * The createElementByName function is used to create a new instance of a workflow element based on its name.
 * The createElement function is used to create a new instance of a workflow element based on the workflow element itself.
 */
export abstract class ElementService<T> {
  abstract createElement(
    element: WorkflowElement<T>,
    node: StatementNode<T>,
    attrs?: RecordOfAnyType,
  ): T;
  abstract createElementByName(
    name: string,
    node: StatementNode<T>,
    attrs?: RecordOfAnyType,
  ): T;
  abstract cloneInstance(element: WorkflowElement<T>): WorkflowElement<T>;
  abstract createInstanceByName(name: string): WorkflowElement<T>;
}
