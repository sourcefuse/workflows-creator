import {ValueInput} from './value.input';
import {State, WorkflowPrompt} from '../../../classes';
import {InputTypes, NotificationRecipientTypesEnum} from '../../../enum';
import {RecordOfAnyType} from '../../../types/base.types';
import {BpmnNode} from '../../../types';

export class EmailDataInput extends WorkflowPrompt {
  override prefix = '';
  override suffix = '';
  override typeFunction = () => InputTypes.Email;
  override inputKey = 'email';
  override placeholder = 'Email';
  static identifier = 'EmailDataInput';

  override getIdentifier(): string {
    return EmailDataInput.identifier;
  }
}

export class EmailToInput extends WorkflowPrompt {
  override prefix = 'to';
  override suffix = '';
  override placeholder = 'someone';
  override inputKey = 'emailTo';
  listNameField = 'text';
  listValueField = 'value';
  override prevchange = <S extends RecordOfAnyType>(state: State<S>) => {};
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    (state.get('emailToValues') as []) || [];
  override typeFunction = <S extends RecordOfAnyType>(state: State<S>) =>
    (state.get('emailToInputType') as InputTypes) || InputTypes.List;
  static identifier = 'EmailToInput';

  override getIdentifier(): string {
    return EmailToInput.identifier;
  }
}

export class EmailRecepientInput extends ValueInput {
  override inputKey = 'specificRecepient';
  override placeholder = 'recipients';

  override isHidden = (node: BpmnNode) => {
    return ![
      NotificationRecipientTypesEnum.NotifySpecificPeople,
      NotificationRecipientTypesEnum.NotifySpecificColumn,
    ].includes(node.state.get('emailTo'));
  };

  static identifier = 'EmailRecepientInput';

  override getIdentifier(): string {
    return EmailRecepientInput.identifier;
  }
}
