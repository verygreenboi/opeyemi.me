import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HamburgerComponent } from '../hamburger/hamburger.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { BehaviorSubject, distinctUntilChanged, map, startWith, Subject, takeUntil, tap } from 'rxjs';
import { BgService } from '../../core/services';

@Component({
  selector: 'header[opy-header]',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, HamburgerComponent, NavMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  destroy$ = new Subject<void>();
  collapse = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.collapse.asObservable().pipe(
    startWith(false),
    map(collapse => !collapse),
    takeUntil(this.destroy$)
  );

  headerBgClass$ = this.bgService.headerDarkBg$.pipe(
    map(darkBg => darkBg ? 'dark-bg' : ''),
    startWith(''),
    distinctUntilChanged(),
    takeUntil(this.destroy$)
  );


  constructor(
    private el: ElementRef,
    private bgService: BgService,
  ) {}

}
