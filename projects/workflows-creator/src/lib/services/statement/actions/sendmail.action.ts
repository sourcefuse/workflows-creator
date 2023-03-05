import {BpmnAction} from '../../../types/bpmn.types';
import {SendEmail} from '../../bpmn/elements/tasks/send-email.task';
import {
  EmailDataInput,
  EmailRecepientInput,
  EmailToInput,
} from '../inputs/email.input';

export class SendEmailAction extends BpmnAction {
  isElseAction: boolean;
  groupType: string;
  groupId: string;
  elements = [SendEmail.identifier];
  name = 'Send Email';
  statement = 'send an';
  prompts = [
    EmailDataInput.identifier,
    EmailToInput.identifier,
    EmailRecepientInput.identifier,
  ];
  static identifier = 'SendEmailAction';
  constructor(
    id: string,
    groupType: string,
    groupId: string,
    isElseAction: boolean,
  ) {
    super();
    this.id = id;
    this.groupType = groupType;
    this.groupId = groupId;
    this.isElseAction = isElseAction || false;
  }

  getIdentifier(): string {
    return SendEmailAction.identifier;
  }
}
