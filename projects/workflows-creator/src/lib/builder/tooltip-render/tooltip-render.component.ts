import {Component, Input} from '@angular/core';

@Component({
    selector: 'workflow-tooltip-render',
    templateUrl: './tooltip-render.component.html',
    styleUrls: ['./tooltip-render.component.scss'],
    standalone: false
})
export class TooltipRenderComponent {
  @Input() showsTooltip = true;
  @Input() tooltipText = 'Default tooltip text';
  @Input() topPosition = 215;
  @Input() leftPosition = 400;
}
