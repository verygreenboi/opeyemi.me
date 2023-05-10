import { Directive, ElementRef, HostListener } from '@angular/core';
import { ScrollerService } from './scroller.service';

@Directive({
  selector: '[opyScrollerContainer]',
  standalone: true
})
export class ScrollerContainerDirective {

  constructor(private service: ScrollerService) {}

  @HostListener('scroll', ['$event'])
  onScroll() {
    this.service.update()
  }

}
