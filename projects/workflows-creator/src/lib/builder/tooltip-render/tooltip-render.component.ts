import {Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'workflow-tooltip-render',
  templateUrl: './tooltip-render.component.html',
  styleUrls: ['./tooltip-render.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TooltipRenderComponent {
  showsTooltip = input(true);
  tooltipText = input('Default tooltip text');
  topPosition = input(215);
  leftPosition = input(400);

  constructor() {}
}
