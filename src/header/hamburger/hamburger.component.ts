import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../menu.service';

@Component({
  selector: 'opy-hamburger',
  standalone: true,
  imports: [CommonModule],
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
