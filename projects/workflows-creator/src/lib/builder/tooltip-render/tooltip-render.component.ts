import {Component, input} from '@angular/core';

@Component({
  selector: 'workflow-tooltip-render',
  templateUrl: './tooltip-render.component.html',
  styleUrls: ['./tooltip-render.component.scss'],
  standalone: true,
})
export class TooltipRenderComponent {
  showsTooltip = input(true);
  tooltipText = input('Default tooltip text');
  topPosition = input(215);
  leftPosition = input(400);

  constructor() {}
}
