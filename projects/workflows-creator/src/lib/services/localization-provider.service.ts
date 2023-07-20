import {Injectable} from '@angular/core';
import {RecordOfAnyType} from '../types';
import {LocalizedStringKeys} from '../enum';

@Injectable({
  providedIn: 'root',
})
export class LocalizationProviderService {
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
  }

  setLocalizedStrings(stringMap: RecordOfAnyType) {
    if (stringMap &&  Object.keys(stringMap).length>0) {
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
