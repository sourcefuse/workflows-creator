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
            build: jasmine
              .createSpy('build')
              .and.returnValue(Promise.resolve('<built/>')),
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

  it('restores a saved workflow passed in before the first render', async () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const builder = TestBed.inject(BuilderService);

    fixture.componentRef.setInput('diagram', '<saved/>');
    fixture.componentRef.setInput('state', {node1: {value: 'x'}});
    fixture.detectChanges();
    await fixture.whenStable();

    expect(builder.restore).toHaveBeenCalledOnceWith('<saved/>');
  });

  it('restores a saved workflow passed in after the first render', async () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const builder = TestBed.inject(BuilderService);
    fixture.detectChanges();

    fixture.componentRef.setInput('diagram', '<saved/>');
    fixture.componentRef.setInput('state', {node1: {value: 'x'}});
    fixture.detectChanges();
    await fixture.whenStable();

    expect(builder.restore).toHaveBeenCalledOnceWith('<saved/>');
  });

  it('restores only the saved diagram when state is set before diagram', async () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const builder = TestBed.inject(BuilderService);
    fixture.componentRef.setInput('localizedStringMap', {doThisLbl: 'Do'});
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentRef.setInput('state', {node1: {value: 'x'}});
    fixture.detectChanges();
    fixture.componentRef.setInput('diagram', '<saved/>');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(builder.restore).toHaveBeenCalledOnceWith('<saved/>');
  });

  it('restores when the diagram is set before its state', async () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const builder = TestBed.inject(BuilderService);
    fixture.detectChanges();

    fixture.componentRef.setInput('diagram', '<saved/>');
    fixture.detectChanges();
    fixture.componentRef.setInput('state', {node1: {value: 'x'}});
    fixture.detectChanges();
    await fixture.whenStable();

    expect(builder.restore).toHaveBeenCalledOnceWith('<saved/>');
  });

  it('emits the initial diagram when a localized string map is passed in', async () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    const emitted: string[] = [];
    fixture.componentInstance.diagram.subscribe(d => emitted.push(d));

    fixture.componentRef.setInput('localizedStringMap', {doThisLbl: 'Do'});
    fixture.detectChanges();
    await fixture.whenStable();

    expect(emitted).toEqual(['<built/>']);
  });
});
