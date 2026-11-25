import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import {RecordOfAnyType, NodeWithInput} from '../../types';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'workflow-node',
  templateUrl: './node.component.html',
  styleUrls: [
    './node.component.scss',
    '../../../assets/icons/icomoon/style.css',
  ],
  standalone: true,
  imports: [CommonModule],
  // Angular 22 makes OnPush the default. The builder mutates node objects in
  // place (e.g. when restoring a saved workflow), so keep the eager checking
  // this component had before.
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NodeComponent<E> {
  node = input.required<NodeWithInput<E>>();

  isLast = input(false);

  isFirst = input(false);

  inputTemplate = input.required<TemplateRef<RecordOfAnyType>>();

  remove = output<boolean>();

  add = output<MouseEvent>();

  /**
   * The removeClick() function emits a boolean value of true to the parent component
   */
  removeClick() {
    this.remove.emit(true);
  }

  /**
   * The addClick() function emits the click event to the parent component
   * @param {MouseEvent} event - The mouse click event
   */
  addClick(event: MouseEvent) {
    this.add.emit(event);
  }
}
