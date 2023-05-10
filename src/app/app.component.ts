import { Component, ElementRef, HostListener } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ScrollerItemDirective } from '../shared/scroller';
import { BgService } from '../core/services';

@Component({
  selector: 'opy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
    ScrollerItemDirective
  ],
  standalone: true
})
export class AppComponent {
  title = 'opeyemi-me';


  constructor(
    private el: ElementRef,
    private bgService: BgService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const rec = this.el.nativeElement.getBoundingClientRect();
    this.bgService.toggleHeaderDarkBg(rec.top <= -1);
  }
  logger(inView: boolean) {
    console.log('inView', inView);
  }
}
