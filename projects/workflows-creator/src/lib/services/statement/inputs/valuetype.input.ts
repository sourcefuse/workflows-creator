import {State, WorkflowListPrompt} from '../../../classes';
import {InputTypes} from '../../../enum';
import {BpmnNode, RecordOfAnyType} from '../../../types';

export class ValueTypeInput extends WorkflowListPrompt {
  override prefix = {state: 'valueTypePrefix'};
  override suffix = {state: 'valueTypeSuffix'};
  override typeFunction = () => InputTypes.List;
  override inputKey = 'valueType';
  override listNameField = 'text';
  override listValueField = 'value';
  override placeholder = 'Something';

  override options = <S extends RecordOfAnyType>(state: State<S>) =>
    state.get('valueTypes') as [];

  override isHidden = (node: BpmnNode) => {
    return ![
      InputTypes.Text,
      InputTypes.Number,
      InputTypes.People,
      InputTypes.Percentage,
    ].includes(node.state.get('valueInputType'));
  };

  static identifier = 'ValueTypeInput';

  override getIdentifier(): string {
    return ValueTypeInput.identifier;
  }
}
