import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output('routerChange') routeEmitter = new EventEmitter<string>();

  emitRoute(route: string) {
    this.routeEmitter.emit(route);
  }
}
