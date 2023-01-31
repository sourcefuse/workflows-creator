import {Inject, Injectable} from '@angular/core';
import {WorkflowElement} from '../../../../classes';
import {LinkStrategy} from '../../../../interfaces';
import {
  CustomBpmnModdle,
  ModdleElement,
  BpmnStatementNode,
  ConditionOperatorPair,
  RecordOfAnyType,
} from '../../../../types';
import {CONDITION_LIST} from '../../../../const';
import {UtilsService} from '../../../utils.service';
import {ConditionTypes, InputTypes} from '../../../../enum';
import {OrGatewayElement} from '../../elements';

const BPMN_SEQ_FLOW = 'bpmn:SequenceFlow';
@Injectable()
export class OrGatewayLinkStrategy implements LinkStrategy<ModdleElement> {
  constructor(
    private readonly moddle: CustomBpmnModdle,
    private readonly utils: UtilsService,
    @Inject(CONDITION_LIST)
    private readonly conditions: Array<ConditionOperatorPair>,
  ) {}
  /**
   * It creates a link between the element and the node
   * @param element - The element that is being processed.
   * @param {BpmnStatementNode} node - BpmnStatementNode
   * @returns An array of ModdleElements
   */
  execute(
    element: WorkflowElement<ModdleElement>,
    node: BpmnStatementNode,
  ): ModdleElement[] {
    const links = this.createLink(node);
    return links;
  }

  /**
   * > Create a link between two nodes
   * @param {BpmnStatementNode} node - BpmnStatementNode
   * @returns An array of links
   */
  private createLink(node: BpmnStatementNode) {
    const link = [];
    const from = node.tag;
    for (let nextNode of node.next) {
      const flag = nextNode.element.id?.split('_').includes('true');
      const id = flag
        ? (node.element as OrGatewayElement).elseOutGoing
        : node.outgoing;
      const to = nextNode.tag;
      nextNode.incoming = id;
      const attrs = this.createLinkAttrs(id, from, to);
      const {script, name} = this.createScript(node, id, flag);
      const expression = this.moddle.create('bpmn:FormalExpression', {
        body: script,
        language: 'Javascript',
        'xsi:type': 'bpmn:tFormalExpression',
      });
      attrs['conditionExpression'] = expression;
      attrs['name'] = name;
      const _link = this.moddle.create(BPMN_SEQ_FLOW, attrs);
      const outgoing = from.get('outgoing');
      const incoming = to.get('incoming');
      if (!outgoing.find((item: ModdleElement) => item.id === id)) {
        outgoing.push(_link);
      }
      if (!incoming.find((item: ModdleElement) => item.id === id)) {
        incoming.push(_link);
      }
      link.push(_link);
    }
    return link;
  }

  /**
   * It creates a link between two nodes
   * @param {string} id - The id of the link
   * @param {ModdleElement} from - ModdleElement - the source element of the link
   * @param {ModdleElement} to - ModdleElement - the element that the link is going to
   * @returns An object with the id, sourceRef, and targetRef properties.
   */
  private createLinkAttrs(id: string, from: ModdleElement, to: ModdleElement) {
    const start = this.moddle.create('bpmn:FlowNode', {
      id: from.id,
    });
    const end = this.moddle.create('bpmn:FlowNode', {
      id: to.id,
    });
    const attrs: RecordOfAnyType = {
      id: id,
      sourceRef: start,
      targetRef: end,
    };
    return attrs;
  }

  /**
   * It creates a script that loops through the rows of the table and adds the taskIds of the rows that
   * match the condition to an array
   * @param {BpmnStatementNode} node - The node that we're creating the script for.
   * @param {string} flowId - The id of the flow that is being created.
   * @param {boolean} [isElse] - boolean - This is a flag that tells the function whether or not the
   * script is for the else statement.
   * @returns An object with a script and a name.
   */
  private createScript(
    node: BpmnStatementNode,
    flowId: string,
    isElse?: boolean,
  ) {
    const lastNodes = this.getLastNodeWithOutput(node);
    let read = '';
    let loop = '';
    let condition = '';
    for (let i = 1; i <= lastNodes.length; i++) {
      read += `var readObj${i} = JSON.parse(execution.getVariable('${
        lastNodes[i - 1].id
      }')); \n`;
      condition = this.getCondition(node.prev[i - 1]);
      loop += this.createLoopScript(node, condition, i);
    }
    const declarations = `var flag = false;var ids = [];var json = S("{}");`;
    const column = node.workflowNode.state.get('columnName');
    const setters = `
      json.prop("taskIds", ids);
      execution.setVariable('${flowId}',json);
      if(${isElse ? '!' : ''}(flag)){true;}else {false;}
      `;
    return {
      script: [read, declarations, loop, setters].join('\n'),
      name: isElse ? `!(${column}${condition})` : `${column}${condition}`,
    };
  }

  /**
   * It creates a loop script that loops through the read object and pushes the task ids to the ids
   * array if the condition is met
   * @param {BpmnStatementNode} node - BpmnStatementNode - The node that is being processed
   * @param {string} condition - The condition to be evaluated.
   * @param [isElse=false] - This is a boolean value that determines whether the loop is for the else
   * condition or not.
   * @returns A string of javascript code.
   */
  private createLoopScript(
    node: BpmnStatementNode,
    condition: string,
    num: number,
  ) {
    switch (node.workflowNode.state.get('condition')) {
      case ConditionTypes.PastToday:
        return `
                for(var key in readObj){
                  var taskValuePair = readObj[key];
                  ids = [taskValuePair.id];
                  if(taskValuePair && taskValuePair.value){
                    var readDateValue = new Date(taskValuePair.value);
                    if(readDateValue < new Date()){
                      flag = true;
                    }
                  }
                }
              `;
      case ConditionTypes.ComingIn:
      case ConditionTypes.PastBy:
        return `
                for(var key in readObj){
                  var taskValuePair = readObj[key];
                  ids = [taskValuePair.id];
                  if(taskValuePair && taskValuePair.value){
                    var readDateValue = new Date(taskValuePair.value);
                    if(readDateValue > new Date() && readDateValue.setDate(readDateValue.getDate()${condition}) < new Date()){
                      flag = true;
                    }
                  }
                }
              `;
      default:
        return `
              for(var key in readObj${num}){
                var taskValuePair = readObj${num}[key];
                ids = [taskValuePair.id];
                if(taskValuePair && (taskValuePair.value${condition})){
                  flag = true;
                }
              }
            `;
    }
  }

  /**
   * > Get the last node with outputs
   * @param {BpmnStatementNode} node - The node to start from
   * @returns The last node with an output.
   */
  private getLastNodeWithOutput(node: BpmnStatementNode) {
    return node.tag.get('incoming');
  }

  /**
   * It returns a string that represents the condition of the node
   * @param {BpmnStatementNode} node - BpmnStatementNode - the node that is being processed
   * @returns The condition is being returned.
   */
  private getCondition(node: BpmnStatementNode) {
    let value = node.workflowNode.state.get('value');
    const valueType = node.workflowNode.state.get('valueInputType');
    if (valueType === InputTypes.Text || valueType === InputTypes.List) {
      value = `'${value}'`;
    }
    if (valueType === InputTypes.People) {
      value = `'${JSON.stringify(value)}'`;
    }
    const condition = node.workflowNode.state.get('condition');
    const pair = this.conditions.find(item => item.condition === condition);
    if (!pair) {
      return `===${value}`;
    }
    if (pair.value) {
      return `${pair.operator}${value}`;
    } else {
      return `${pair.operator}`;
    }
  }
}
