import {Injectable} from '@angular/core';
import {NgxPopperjsContentComponent} from 'ngx-popperjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  public previousPopper?: NgxPopperjsContentComponent;

  constructor() {}
}
