import {WorkflowPrompt} from '..';
import {NodeTypes} from '../../enum';
import {Constructor, WorkflowNode} from '../../types/base.types';
import {AbstractBaseGroup} from '../nodes';

export abstract class NodeService<E> {
  abstract getActions(): WorkflowNode<E>[];
  abstract getEvents(trigger?: boolean): WorkflowNode<E>[];
  abstract getGroups(
    trigger?: boolean,
    type?: NodeTypes,
    isElseGroup?: boolean,
  ): AbstractBaseGroup<E>[];
  abstract getNodeByName(
    name: string,
    groupType: string,
    groupId: string,
    id?: string,
    isElseAction?: boolean,
  ): WorkflowNode<E>;
  abstract getGroupByName(
    name: string,
    nodeType: NodeTypes,
    id?: string,
  ): AbstractBaseGroup<E>;
  abstract mapInputs(prompts: string[]): WorkflowPrompt[];
}
