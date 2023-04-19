import {Pipe, PipeTransform} from '@angular/core';
import {LocalizationProviderService} from '../services/localization-provider.service';
import {LocalizedStringKeys} from '../enum';

@Pipe({
  name: 'localization',
})
export class LocalizationPipe implements PipeTransform {
  constructor(private readonly localizationSvc: LocalizationProviderService) {}

  transform(key: LocalizedStringKeys): string {
    return this.localizationSvc.getLocalizedString(key);
  }
}
