import {TestBed} from '@angular/core/testing';
import {BuilderService, ElementService, NodeService} from '../classes';
import {BuilderComponent} from './builder.component';
import {LocalizationProviderService} from '../services';

describe('BuilderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderComponent],
      providers: [
        {
          provide: BuilderService,
          useValue: {
            restore: jasmine.createSpy('restore').and.returnValue(
              Promise.resolve({
                events: [],
                actions: [],
                elseActions: [],
                groups: [],
                process: {id: 'test-process'},
                state: {},
              }),
            ),
          },
        },
        {
          provide: NodeService,
          useValue: {
            getGroups: jasmine.createSpy('getGroups').and.returnValue([]),
          },
        },
        {
          provide: ElementService,
          useValue: {},
        },
        {
          provide: LocalizationProviderService,
          useValue: {
            setLocalizedStrings: jasmine.createSpy('setLocalizedStrings'),
            getLocalizedString: (key: string) => key,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const app = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('state', {});
    fixture.componentRef.setInput('localizedStringMap', {});
    fixture.componentRef.setInput('diagram', '');
    fixture.componentRef.setInput('templateMap', {});
    fixture.componentRef.setInput('allColumns', []);

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
