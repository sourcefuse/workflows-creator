import {LocalizationProviderService} from '../services/localization-provider.service';
import {LocalizedStringKeys} from '../enum';
import {TestBed} from '@angular/core/testing';
import {LocalizationPipe} from './localization.pipe';

describe('LocalizationPipe', () => {
  let pipe: LocalizationPipe;
  let localizationSvc: LocalizationProviderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalizationPipe],
      providers: [LocalizationProviderService, LocalizationPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    localizationSvc = jasmine.createSpyObj('LocalizationProviderService', [
      'getLocalizedString',
    ]);
    pipe = new LocalizationPipe(localizationSvc);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call getLocalizedString method of LocalizationProviderService', () => {
    const key: LocalizedStringKeys = LocalizedStringKeys.DoThis;
    pipe.transform(key);
    expect(localizationSvc.getLocalizedString).toHaveBeenCalledWith(key);
  });
});
