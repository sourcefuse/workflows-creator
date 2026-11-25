import {Component, ViewEncapsulation} from '@angular/core';
import {
  BuilderComponent,
  OnChangeEvent,
  OnValueEvent,
  OnIntervalEvent,
  OnAddItemEvent,
  ChangeColumnValueAction,
  SendEmailAction,
  ValueInput,
  IntervalInput,
  TriggerColumnInput,
  ColumnInput,
  ConditionInput,
  ToColumnInput,
  EmailDataInput,
  EmailToInput,
  EmailRecepientInput,
  BASE_XML_VALUE,
  StateMap,
  RecordOfAnyType,
} from '@sourceloop/workflows-creator';
import {
  ColumnOption,
  TimescaleOption,
  FieldValuesMap,
  ConditionsMap,
  WorkflowEvent,
} from './interfaces';

@Component({
  standalone: true,
  selector: 'workflow-app-root',
  imports: [BuilderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  NORMALIZED_COLUMN: ColumnOption[] = [
    {text: 'Status', value: '1952177d-9a3e-6ef4-ae8f-522c08153026'},
    {text: 'Priority', value: '1952177d-9a3e-6ef4-ae8f-522c08153026'},
    {text: 'Text', value: '2069d144-db46-0737-2c9d-bc339949d684'},
    {text: 'Number', value: '47beeecd-712c-6f8b-c595-92c3712780cb'},
  ];

  allColumns: ColumnOption[] = [
    {text: 'Status', value: '{{Status}}'},
    {text: 'People', value: '{{People}}'},
    {text: 'Text', value: '{{Text}}'},
    {text: 'Number', value: '{{Number}}'},
    {text: 'Date/Time', value: '{{Date/Time}}'},
    {text: 'Date', value: '{{Date}}'},
    {text: 'Assignee', value: '{{Assignee}}'},
  ];

  EMAIL_RECIPIENTS: ColumnOption[] = [
    {text: 'Me', value: 'me'},
    {text: 'Everyone on project', value: 'everyone'},
    {text: 'Project owners', value: 'owners'},
    {text: 'Specific people', value: 'specific'},
  ];

  localizedStringMap: Record<string, string> = {
    whenThisHappensLbl: 'When This Happens',
    doThisLbl: 'Do This',
    columnChangesLbl: 'Column Changes',
    onIntervalLbl: 'On Interval',
    onAddItemLbl: 'On Add Item',
    itemCreatedLbl: 'Item Created',
    checkValueLbl: 'Check Value',
    changeValueLbl: 'Change Value',
    sendAnEmailLbl: 'Send An Email',
    elseLbl: 'else',
    typeSubjectLbl: 'Type Subject',
    typeEmailLbl: 'Type Email',
    selectColumnTooltip: 'Select Column Tooltip',
    setLbl: 'Set',
  };

  TIMESCALE: TimescaleOption[] = [
    {text: 'Days', value: 'D', timescale: ''},
    {text: 'Hours', value: 'H', timescale: 'T'},
    {text: 'Seconds', value: 'S', timescale: 'T'},
  ];

  FIELD_VALUES: FieldValuesMap = {
    status: {
      valueInputType: 'list',
      values: [
        {text: 'Todo', value: 'todo'},
        {text: 'In Progress', value: 'in_progress'},
      ],
    },
    priority: {
      valueInputType: 'list',
      values: [
        {text: 'Critical', value: 'critical'},
        {text: 'High', value: 'high'},
        {text: 'Medium', value: 'medium'},
        {text: 'Low', value: 'low'},
      ],
    },
    date: {valueInputType: 'date'},
    datetime: {valueInputType: 'datetime'},
    people: {valueInputType: 'people'},
    text: {valueInputType: 'text'},
    number: {valueInputType: 'number'},
  };

  DEFAULT_CONDITION = [
    {text: 'Equal', value: 'equal'},
    {text: 'Not Equal', value: 'notequal'},
  ];

  DATE_CONDITIONS = [
    {text: 'Past Today', value: 'pastToday'},
    {text: 'Coming In', value: 'comingIn'},
    {text: 'Past by', value: 'pastby'},
  ];

  CONDITIONS: ConditionsMap = {
    date: this.DATE_CONDITIONS,
    datetime: this.DATE_CONDITIONS,
  };

  state: StateMap<RecordOfAnyType> = {};
  _diagram = BASE_XML_VALUE;

  onEventAdded(event: WorkflowEvent) {
    this.handleElementClick(event);
  }

  onActionAdded(event: WorkflowEvent) {
    this.handleElementClick(event);
  }

  onItemChanged(event: WorkflowEvent) {
    this.handleValueChange(event);
  }

  handleElementClick(event: WorkflowEvent) {
    const selected = event.event ?? event.action;

    if (!selected) {
      return;
    }

    switch (selected.getIdentifier()) {
      case OnIntervalEvent.identifier:
        selected.state.change('intervalList', this.TIMESCALE);
        selected.state.change('valuePlaceholder', 'n');
        break;

      case OnChangeEvent.identifier:
      case OnValueEvent.identifier:
        selected.state.change(
          'columns',
          this.NORMALIZED_COLUMN.filter(
            (col: ColumnOption) => col.text.toLowerCase() !== 'priority',
          ),
        );
        break;

      case ChangeColumnValueAction.identifier:
        selected.state.change('columns', this.NORMALIZED_COLUMN);
        break;

      case SendEmailAction.identifier:
        selected.state.change('emailToInputType', 'list');
        selected.state.change('emailToValues', this.EMAIL_RECIPIENTS);
        break;
    }
  }
  private selectedCol?: ColumnOption;

  handleValueChange(event: WorkflowEvent) {
    if (!event.item) {
      return;
    }

    switch (event.field) {
      case ValueInput.identifier:
        if (event.item.getIdentifier() === OnIntervalEvent.identifier) {
          event.item.state.change('intervalList', this.TIMESCALE);
        }
        break;

      case IntervalInput.identifier:
        event.item.state.change(
          'timescale',
          this.TIMESCALE.find(t => t.value === event.value)?.timescale,
        );
        break;

      case TriggerColumnInput.identifier:
      case ColumnInput.identifier:
        this.selectedCol = this.NORMALIZED_COLUMN.find(
          col => col.value === event.value,
        );
        if (!this.selectedCol) return;

        const type = this.selectedCol.text.toLowerCase();
        event.item.state.change(
          'conditions',
          this.CONDITIONS[type] || this.DEFAULT_CONDITION,
        );

        event.item.state.change(
          'valueInputType',
          this.FIELD_VALUES[type].valueInputType,
        );
        if (this.FIELD_VALUES[type].values) {
          event.item.state.change('values', this.FIELD_VALUES[type].values);
        }
        break;

      case ConditionInput.identifier:
        const columnId =
          event.item.state.get('column') ||
          event.item.state.get('triggerColumn');
        this.selectedCol = this.NORMALIZED_COLUMN.find(
          col => col.value === columnId,
        );

        if (!this.selectedCol) return;

        const columnType = this.selectedCol.text.toLowerCase();

        event.item.state.change(
          'valueInputType',
          this.FIELD_VALUES[columnType].valueInputType,
        );
        if (this.FIELD_VALUES[columnType].values) {
          event.item.state.change(
            'values',
            this.FIELD_VALUES[columnType].values,
          );
        }
        break;

      case ToColumnInput.identifier:
        const toColumnId = event.value;
        const toCol = this.NORMALIZED_COLUMN.find(
          col => col.value === toColumnId,
        );

        if (!toCol) return;

        const toColumnType = toCol.text.toLowerCase();
        event.item.state.change(
          'valueInputType',
          this.FIELD_VALUES[toColumnType].valueInputType,
        );
        if (this.FIELD_VALUES[toColumnType].values) {
          event.item.state.change(
            'values',
            this.FIELD_VALUES[toColumnType].values,
          );
        }
        break;

      case EmailDataInput.identifier:
        break;
    }
  }
}
