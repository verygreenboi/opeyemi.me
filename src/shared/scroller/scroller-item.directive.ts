import { AfterViewInit, Directive, ElementRef, Inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { ScrollerService } from './scroller.service';
import { WINDOW } from '../../core';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ICarouselComponent } from '../../core/component';

@Directive({
  selector: '[opyScrollerItem]',
  standalone: true
})
export class ScrollerItemDirective implements OnDestroy, AfterViewInit {
  @Input() forceEnabled = false;
  @Input() topThreshold = 0;
  @Input() callback?: (inView: boolean) => void;

  destroy$ = new Subject<void>();
  constructor(
    private service: ScrollerService,
    private elementRef: ElementRef<HTMLElement>,
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngAfterViewInit() {
    this.service.update();

    const isTabletInView = () => {
      const { top, bottom, height } = this.elementRef.nativeElement.getBoundingClientRect();
      const { innerHeight } = this.window;
      return {inView: (top + 500) < innerHeight && bottom > (600), top};
    };

    const isDesktopInView = () => {
      const { top} = this.elementRef.nativeElement.getBoundingClientRect();
      const { clientHeight: innerHeight } = this.window.document.querySelectorAll('.scrolling-portfolio-wrapper')[0];
      const topDiff = 150;
      return {inView: top > topDiff && top < 466, top};
    }

    const calcForceEnabled = (topThreshold: number) => {
      const { top, bottom, height } = this.elementRef.nativeElement.getBoundingClientRect();
      const { innerHeight } = this.window;
      return {inView: (top + 500) < innerHeight && bottom > (600), top};
    };

    this.service.updateChildren$.pipe(
      map(() => {
        const isTablet = this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959px)');
        const isDesktop = this.breakpointObserver.isMatched('(min-width: 960px)') && !isTablet;
        return isTablet ? 'tablet' : isDesktop ? 'desktop' : 'mobile';
      }),
      map((view) => {
        if (this.forceEnabled) {
          return calcForceEnabled(this.topThreshold);
        }
        switch (view) {
          case 'tablet':
            return isTabletInView();
          case 'desktop':
            return isDesktopInView();
          default:
            return {inView: false, top: 0};
        }
      }),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(({inView, top}) => {

      if (this.forceEnabled) {
        console.log('forceEnabled', inView);
        this.callback && this.callback(inView);
        return;
      }

      if (inView) {
        this.renderer.addClass(this.elementRef.nativeElement, 'in-view');
        this.renderer.setAttribute(this.elementRef.nativeElement, 'data-top', `${top}`);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, 'in-view');
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'data-top');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
