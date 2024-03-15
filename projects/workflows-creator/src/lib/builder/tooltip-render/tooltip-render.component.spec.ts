import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipRenderComponent } from './tooltip-render.component';

describe('TooltipRenderComponent', () => {
  let component: TooltipRenderComponent;
  let fixture: ComponentFixture<TooltipRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipRenderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.showsTooltip).toBeTrue();
    expect(component.tooltipText).toBe('Default tooltip text');
    expect(component.topPosition).toBe(215);
    expect(component.leftPosition).toBe(400);
  });
});