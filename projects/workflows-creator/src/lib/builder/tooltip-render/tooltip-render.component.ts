import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'workflow-tooltip-render',
  templateUrl: './tooltip-render.component.html',
  styleUrls: ['./tooltip-render.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TooltipRenderComponent {
  @Input() showsTooltip = true;
  @Input() tooltipText = 'Default tooltip text';
  @Input() topPosition = 215;
  @Input() leftPosition = 400;

  constructor() {}
}
