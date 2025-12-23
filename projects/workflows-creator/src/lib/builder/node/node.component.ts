import {
  Component,
  EventEmitter,
  Input,
  Output,
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
})
export class NodeComponent<E> {
  @Input()
  node: NodeWithInput<E>;

  @Input()
  isLast = false;

  @Input()
  isFirst = false;

  @Input()
  inputTemplate!: TemplateRef<RecordOfAnyType>;

  @Output()
  remove = new EventEmitter<boolean>();

  @Output()
  add = new EventEmitter<MouseEvent>();

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
