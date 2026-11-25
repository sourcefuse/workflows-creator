import {TestBed} from '@angular/core/testing';
import {BuilderService, ElementService, NodeService} from '../classes';
import {BuilderComponent} from './builder.component';
import {LocalizationProviderService} from '../services';
import {NodeTypes} from '../enum';
import {OrGroup} from '../services/statement/groups/or.group';

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
            getEvents: () => [],
            getActions: () => [],
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

  it('opens the AND/OR popup from a click event', () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    fixture.detectChanges();
    const icon = document.createElement('span');
    document.body.appendChild(icon);
    icon.addEventListener('click', e =>
      fixture.componentInstance.openPopup(NodeTypes.GROUP, e),
    );

    icon.dispatchEvent(new MouseEvent('click', {bubbles: true}));

    expect(document.querySelector('.cdk-overlay-pane')).toBeTruthy();
    fixture.componentInstance.closeOverlay();
    icon.remove();
  });

  it('closes its popup when destroyed', () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    fixture.detectChanges();
    const icon = document.createElement('span');
    document.body.appendChild(icon);
    icon.addEventListener('click', e =>
      fixture.componentInstance.openPopup(NodeTypes.GROUP, e),
    );
    icon.dispatchEvent(new MouseEvent('click', {bubbles: true}));

    fixture.destroy();

    expect(document.querySelector('.cdk-overlay-pane')).toBeNull();
    icon.remove();
  });

  it('shows the group picked from the AND/OR popup', () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    fixture.detectChanges();
    const nodes = TestBed.inject(NodeService);
    (nodes.getGroups as jasmine.Spy).and.returnValue([
      new OrGroup({}, 'or-group', NodeTypes.EVENT),
    ]);
    const icon = document.createElement('span');
    document.body.appendChild(icon);
    icon.addEventListener('click', e =>
      fixture.componentInstance.openPopup(NodeTypes.GROUP, e),
    );
    icon.dispatchEvent(new MouseEvent('click', {bubbles: true}));

    (
      document.querySelector('.cdk-overlay-pane .option-div') as HTMLElement
    ).click();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll('workflow-group').length,
    ).toBe(1);
    expect(document.querySelector('.cdk-overlay-pane')).toBeNull();
    icon.remove();
  });

  it('logs and survives an error while reacting to input changes', () => {
    const fixture = TestBed.createComponent(BuilderComponent);
    fixture.detectChanges();
    const localization = TestBed.inject(LocalizationProviderService);
    (localization.setLocalizedStrings as jasmine.Spy).and.throwError('boom');
    spyOn(console, 'error');

    fixture.componentRef.setInput('localizedStringMap', {doThisLbl: 'Do'});
    expect(() => fixture.detectChanges()).not.toThrow();

    expect(console.error).toHaveBeenCalledWith(
      'Effect error in BuilderComponent:',
      jasmine.any(Error),
    );
  });
});
