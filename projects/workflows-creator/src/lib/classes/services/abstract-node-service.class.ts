import {WorkflowPrompt} from '..';
import {NodeTypes} from '../../enum';
import {Constructor, WorkflowNode} from '../../types/base.types';
import {AbstractBaseGroup} from '../nodes';

export abstract class NodeService<E> {
  abstract getActions(localizedStringMap: {
    [key: string]: string;
  }): WorkflowNode<E>[];
  abstract getEvents(
    localizedStringMap: {[key: string]: string},
    trigger?: boolean,
  ): WorkflowNode<E>[];
  abstract getGroups(
    localizedStringMap: {[key: string]: string},
    trigger?: boolean,
    type?: NodeTypes,
    isElseGroup?: boolean,
  ): AbstractBaseGroup<E>[];
  abstract getNodeByName(
    localizedStringMap: {[key: string]: string},
    name: string,
    groupType: string,
    groupId: string,
    id?: string,
    isElseAction?: boolean,
  ): WorkflowNode<E>;
  abstract getGroupByName(
    localizedStringMap: {[key: string]: string},
    name: string,
    nodeType: NodeTypes,
    id?: string,
  ): AbstractBaseGroup<E>;
  abstract mapInputs(prompts: string[]): WorkflowPrompt[];
}
