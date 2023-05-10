import { Directive, HostListener } from '@angular/core';
import { MenuService } from './menu.service';

@Directive({
  selector: '[opyCloseMenu]',
  standalone: true
})
export class CloseMenuDirective {

  @HostListener('click')
  closeMenu() {
    this.menuService.closeMenu();
  }

  constructor(private readonly menuService: MenuService) { }

}
