import {State, WorkflowListPrompt} from '../../../classes';
import {InputTypes} from '../../../enum';
import {BpmnNode, RecordOfAnyType} from '../../../types';

export class ValueTypeInput extends WorkflowListPrompt {
  prefix = {state: 'valueTypePrefix'};
  suffix = {state: 'valueTypeSuffix'};
  typeFunction = () => InputTypes.List;
  inputKey = 'valueType';
  listNameField = 'text';
  listValueField = 'value';
  placeholder = 'Something';

  options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('valueTypes') as [];

  isHidden = (node: BpmnNode) => {
    return ![
      '',
      InputTypes.Text,
      InputTypes.Number,
      InputTypes.People,
      InputTypes.Percentage,
    ].includes(node.state.get('valueInputType'));
  };

  static identifier = 'ValueTypeInput';

  getIdentifier(): string {
    return ValueTypeInput.identifier;
  }
}
