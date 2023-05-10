import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { MenuService } from '../menu.service';
import { map } from 'rxjs';
import { CloseMenuDirective } from '../close-menu.directive';

@Component({
  selector: 'opy-nav-menu',
  standalone: true,
  imports: [CommonModule, CloseMenuDirective],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('false', style({
        height: AUTO_STYLE,
        visibility: AUTO_STYLE
      })),
      state('true', style({
        height: '0',
        visibility: 'hidden'
      })),
      transition('false => true', animate('250ms ease-in')),
      transition('true => false', animate('250ms ease-out'))
    ])
  ]
})
export class NavMenuComponent {
  collapse$ = this.menuService.menuState$.pipe(
    map(menuState => !menuState)
  );
  constructor(private menuService: MenuService) {
  }
}
