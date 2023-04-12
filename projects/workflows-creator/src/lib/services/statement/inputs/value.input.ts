import {State, WorkflowListPrompt} from '../../../classes';
import {
  ConditionTypes,
  InputTypes,
  NotificationRecipientTypesEnum,
  ValueTypes,
} from '../../../enum';
import {BpmnEvent, BpmnNode, RecordOfAnyType} from '../../../types';

export class ValueInput extends WorkflowListPrompt {
  prefix: string | {state: string} = '';
  suffix: string | {state: string} = {state: 'valueSuffix'};
  inputKey = 'value';
  listNameField = 'text';
  listValueField = 'value';
  placeholder = 'Something';

  isHidden = (node: BpmnNode) => {
    return (
      [
        NotificationRecipientTypesEnum.NotifyMe,
        NotificationRecipientTypesEnum.NotifyEveryoneOnProject,
        NotificationRecipientTypesEnum.NotifyProjectOwners,
      ].includes(node.state.get('emailTo')) ||
      node.state.get('condition') === ConditionTypes.PastToday ||
      ((node as BpmnEvent).trigger &&
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

  prevchange = <S extends RecordOfAnyType>(state: State<S>) => {
    state.remove('value');
    state.remove('valueName');
  };
  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('values') as [];
  typeFunction = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('valueInputType') as InputTypes;
  static identifier = 'ValueInput';

  getIdentifier(): string {
    return ValueInput.identifier;
  }
}
