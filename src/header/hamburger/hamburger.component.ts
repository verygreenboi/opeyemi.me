import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../menu.service';
import { CloseMenuDirective } from '../close-menu.directive';

@Component({
  selector: 'opy-hamburger',
  standalone: true,
  imports: [CommonModule, CloseMenuDirective],
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HamburgerComponent {
  isActive$ = this.menuService.menuState$;

  constructor(private readonly menuService: MenuService) {
  }
  @HostListener('click')
  toggleActive() {
    this.menuService.toggleMenuState();
  }
}
