import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HamburgerComponent } from '../hamburger/hamburger.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@Component({
  selector: 'header[opy-header]',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, HamburgerComponent, NavMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
