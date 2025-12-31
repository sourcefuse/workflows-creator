import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NodeComponent} from './node.component';

describe('NodeComponent', () => {
  let component: NodeComponent<any>;
  let fixture: ComponentFixture<NodeComponent<any>>;

  @Component({
    template: '<ng-template #testTemplate></ng-template>',
    standalone: true,
  })
  class TestHostComponent {
    @ViewChild('testTemplate', {static: true}) template!: TemplateRef<any>;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeComponent, TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    const mockTemplate = hostFixture.componentInstance.template;

    fixture = TestBed.createComponent(NodeComponent);
    component = fixture.componentInstance;

    // Set required inputs using fixture.componentRef.setInput()
    fixture.componentRef.setInput('node', {
      node: {statement: 'test'},
    });
    fixture.componentRef.setInput('inputTemplate', mockTemplate);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeClick', () => {
    it('should emit true when removeClick is called', () => {
      spyOn(component.remove, 'emit');
      component.removeClick();
      expect(component.remove.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('addClick', () => {
    it('should emit true when addClick is called', () => {
      spyOn(component.add, 'emit');
      const ev = new MouseEvent('click');
      component.addClick(ev);
      expect(component.add.emit).toHaveBeenCalledWith(ev);
    });
  });
});
