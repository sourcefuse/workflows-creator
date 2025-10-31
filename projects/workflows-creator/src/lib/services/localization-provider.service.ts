import {Injectable} from '@angular/core';
import {RecordOfAnyType} from '../types';
import {LocalizedStringKeys} from '../enum';

@Injectable({
  providedIn: 'root',
})
export class LocalizationProviderService {
  /**
   * Returns all Jira-related localization strings as a single object.
   */
  getJiraStrings(): Record<string, string> {
    return {
      connectToJiraLbl: this.getLocalizedString(
        LocalizedStringKeys.connectToJira,
      ),
      connectJiraDescLbl: this.getLocalizedString(
        LocalizedStringKeys.connectJiraDesc,
      ),
      connectLbl: this.getLocalizedString(LocalizedStringKeys.connect),
      connectOnJiraThisSiteLbl: this.getLocalizedString(
        LocalizedStringKeys.connectOnJiraThisSite,
      ),
      jiraMultipleAccountDescLbl: this.getLocalizedString(
        LocalizedStringKeys.jiraMultipleAccountDesc,
      ),
      anotherAccountLbl: this.getLocalizedString(
        LocalizedStringKeys.anotherAccount,
      ),
      createJiraIssueLbl: this.getLocalizedString(
        LocalizedStringKeys.CreateJiraIssue,
      ),
    };
  }
  localizedStringMap: RecordOfAnyType = {};

  constructor() {
    this.setDefaultStrings();
  }

  setDefaultStrings() {
    this.localizedStringMap[LocalizedStringKeys.WhenThisHappens] =
      'When this happens';
    this.localizedStringMap[LocalizedStringKeys.DoThis] = 'Do this';
    this.localizedStringMap[LocalizedStringKeys.ColumnChanges] =
      'Column changes';
    this.localizedStringMap[LocalizedStringKeys.ChangesTo] = 'Changes to';
    this.localizedStringMap[LocalizedStringKeys.OnInterval] = 'On Interval';
    this.localizedStringMap[LocalizedStringKeys.OnAddItem] = 'On add item';
    this.localizedStringMap[LocalizedStringKeys.ItemCreated] =
      'When an item/subitem is created';
    this.localizedStringMap[LocalizedStringKeys.CheckValue] = 'Check value ';
    this.localizedStringMap[LocalizedStringKeys.ChangeValue] =
      'Change column value';
    this.localizedStringMap[LocalizedStringKeys.SendAnEmail] = 'Send an email';
    this.localizedStringMap[LocalizedStringKeys.Else] = 'Else';
    this.localizedStringMap[LocalizedStringKeys.TypeSubject] =
      'Type your subject';
    this.localizedStringMap[LocalizedStringKeys.TypeEmail] = 'Type your email';
    this.localizedStringMap[LocalizedStringKeys.SelectColumnTooltip] =
      'Select a column first';
    this.localizedStringMap[LocalizedStringKeys.SetLbl] = 'Set';
    this.localizedStringMap[LocalizedStringKeys.CreateJiraIssue] =
      'Create Jira Issue';
    this.localizedStringMap[LocalizedStringKeys.connectToJira] =
      'Connect to Jira';
    this.localizedStringMap[LocalizedStringKeys.connectJiraDesc] =
      'Connect your Jira account to start creating issues.';
    this.localizedStringMap[LocalizedStringKeys.connect] = 'Connect';
    this.localizedStringMap[LocalizedStringKeys.connectOnJiraThisSite] =
      'Connect on Jira with this site';
    this.localizedStringMap[LocalizedStringKeys.jiraMultipleAccountDesc] =
      'Your account is connected to more than one Jira site. Please pick a site to continue:';
    this.localizedStringMap[LocalizedStringKeys.anotherAccount] =
      'Another account';
  }

  setLocalizedStrings(stringMap: RecordOfAnyType) {
    if (stringMap) {
      this.localizedStringMap = stringMap;
    } else {
      this.setDefaultStrings();
    }
  }

  getLocalizedString(key: LocalizedStringKeys) {
    return this.localizedStringMap[key];
  }

  getLocalizedStringMap(): RecordOfAnyType {
    return this.localizedStringMap;
  }
}
