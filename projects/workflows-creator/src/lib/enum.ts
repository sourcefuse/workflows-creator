/* Defining the types of elements that can be used in the application. */
export enum ElementTypes {
  End = 'end.event',
  Extension = 'extension',
  Gateway = 'gateway',
  Process = 'process',
  Start = 'start.event',
  ServiceTask = 'service.task',
}

/* Defining the types of inputs that can be used in the application. */
export enum InputTypes {
  Boolean = 'boolean',
  Date = 'date',
  DateTime = 'datetime',
  Email = 'Email',
  Interval = 'interval',
  List = 'list',
  Number = 'number',
  People = 'people',
  Percentage = 'percentage',
  Text = 'text',
}

/* Defining the types of conditions that can be used in the application. */
export enum ConditionTypes {
  ComingIn = 'comingin',
  DueInDays = 'dueindays',
  Equal = 'equal',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan',
  Like = 'like',
  NotEqual = 'notequal',
  PastToday = 'pasttoday',
  PastBy = 'pastby',
}

export enum ValueTypes {
  Today = 'today',
  PastToday = 'pasttoday',
  AnyValue = 'anyValue',
  Custom = 'customValue',
}

/* Defining the types of nodes that can be used in the application. */
export enum NodeTypes {
  ACTION = 'action',
  EVENT = 'event',
  GROUP = 'group',
}

/* Defining the types of elements that can be used in the application. */
export enum ElementNames {
  gateway = 'gateway',
  readColumnValue = 'read column value',
}

/* Defining a constant. */
export enum NUMBER {
  TWO = 2,
  THREE = 3,
  NINE = 9,
}

/* Defining the types of notifications that can be used in the application. */
export enum NotificationRecipientTypesEnum {
  NotifyMe = 'me',
  NotifyEveryoneOnProject = 'everyone_on_project',
  NotifyProjectOwners = 'project_owners',
  NotifySpecificPeople = 'specific_people',
  NotifySpecificColumn = 'contact_in_cell',
}

/* Defining the types of events that can be used in the application. */
export enum EventTypes {
  OnAddItemEvent = 'OnAddItemEvent',
  OnChangeEvent = 'OnChangeEvent',
  OnIntervalEvent = 'OnIntervalEvent',
  OnValueEvent = 'OnValueEvent',
}

export enum ActionTypes {
  ChangeColumnValueAction = 'ChangeColumnValueAction',
  SendEmailAction = 'SendEmailAction',
}

export enum StartElementTypes {
  BasicStartElement = 'StartElement',
  StartOnIntervalElement = 'StartOnIntervalElement',
}

export enum LocalizedStringKeys {
  WhenThisHappens = 'whenThisHappensLbl',
  DoThis = 'doThisLbl',
  ColumnChanges = 'columnChangesLbl',
  ChangesTo = 'triggerColumnSuffix',
  OnInterval = 'onIntervalLbl',
  OnAddItem = 'onAddItemLbl',
  ItemCreated = 'itemCreatedLbl',
  CheckValue = 'checkValueLbl',
  ChangeValue = 'changeValueLbl',
  SendAnEmail = 'sendAnEmailLbl',
  Else = 'elseLbl',
  TypeSubject = 'typeSubjectLbl',
  TypeEmail = 'typeEmailLbl',
  SelectColumnTooltip = 'selectColumnTooltip',
  SetLbl = 'setLbl',
}
