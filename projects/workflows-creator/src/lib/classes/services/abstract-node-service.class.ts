import {WorkflowPrompt} from '..';
import {NodeTypes} from '../../enum';
import {RecordOfAnyType, WorkflowNode} from '../../types/base.types';
import {AbstractBaseGroup} from '../nodes';

export abstract class NodeService<E> {
  abstract getActions(localizedStringMap: {
    [key: string]: string;
  }): WorkflowNode<E>[];
  abstract getEvents(
    localizedStringMap: RecordOfAnyType,
    trigger?: boolean,
  ): WorkflowNode<E>[];
  abstract getGroups(
    localizedStringMap: RecordOfAnyType,
    trigger?: boolean,
    type?: NodeTypes,
    isElseGroup?: boolean,
  ): AbstractBaseGroup<E>[];
  abstract getNodeByName(
    localizedStringMap: RecordOfAnyType,
    name: string,
    groupType: string,
    groupId: string,
    id?: string,
    isElseAction?: boolean,
  ): WorkflowNode<E>;
  abstract getGroupByName(
    localizedStringMap: RecordOfAnyType,
    name: string,
    nodeType: NodeTypes,
    id?: string,
  ): AbstractBaseGroup<E>;
  abstract mapInputs(node: WorkflowNode<E>): WorkflowPrompt[];
}
