import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgxPopperjsContentComponent } from 'ngx-popperjs';
import { NodeComponent } from './node.component';

describe('NodeComponent', () => {
  let component: NodeComponent<any>;
  let fixture: ComponentFixture<NodeComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeComponent);
    component = fixture.componentInstance;
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
      component.addClick();
      expect(component.add.emit).toHaveBeenCalledWith(true);
    });
  });
});