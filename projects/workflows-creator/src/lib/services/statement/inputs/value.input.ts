import {State, WorkflowListPrompt} from '../../../classes';
import {
  ConditionTypes,
  EventTypes,
  InputTypes,
  NotificationRecipientTypesEnum,
  ValueTypes,
} from '../../../enum';
import {BpmnNode, RecordOfAnyType} from '../../../types';

export class ValueInput extends WorkflowListPrompt {
  override prefix: string | {state: string} = '';
  override suffix: string | {state: string} = {state: 'valueSuffix'};
  override inputKey = 'value';
  override listNameField = 'text';
  override listValueField = 'value';
  override placeholder = 'Something';
  customPlaceholder: string | {state: string} = {state: 'valuePlaceholder'};

  override isHidden = (node: BpmnNode) => {
    return (
      [
        NotificationRecipientTypesEnum.NotifyMe,
        NotificationRecipientTypesEnum.NotifyEveryoneOnProject,
        NotificationRecipientTypesEnum.NotifyProjectOwners,
      ].includes(node.state.get('emailTo')) ||
      node.state.get('condition') === ConditionTypes.PastToday ||
      (node.getIdentifier() === EventTypes.OnChangeEvent &&
        [
          '',
          InputTypes.Text,
          InputTypes.Number,
          InputTypes.People,
          InputTypes.Percentage,
        ].includes(node.state.get('valueInputType')) &&
        node.state.get('valueType') !== ValueTypes.Custom)
    );
  };

  override prevchange = <S extends RecordOfAnyType>(state: State<S>) => {
    state.remove('value');
    state.remove('valueName');
  };
  override options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('values') as [];
  override typeFunction = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('valueInputType') as InputTypes;
  static identifier = 'ValueInput';

  override getIdentifier(): string {
    return ValueInput.identifier;
  }
}
