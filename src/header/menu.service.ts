import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly menuStateSubject = new BehaviorSubject<boolean>(false);
  readonly menuState$ = this.menuStateSubject.asObservable();

  toggleMenuState() {
    this.menuStateSubject.next(!this.menuStateSubject.value);
  }

  closeMenu() {
    this.menuStateSubject.next(false);
  }

  openMenu() {
    this.menuStateSubject.next(true);
  }
}
