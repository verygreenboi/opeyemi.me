import { APP_INITIALIZER, Inject, Injectable, OnDestroy, Provider, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil, throttleTime } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BgService implements OnDestroy {
  private readonly headerDarkBgSubject = new Subject<boolean>();
  private readonly resizeSubject = new Subject<string | null>();
  private readonly destroy$ = new Subject<void>();
  private renderer: Renderer2;

  headerDarkBg$ = this.headerDarkBgSubject.asObservable();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2,
    private breakpointObserver: BreakpointObserver
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.resizeSubject
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        filter(id => !!id),
        map(id => id ?? '')
      )
      .subscribe(id => this.doResize(id));
  }

  init() {
    console.log('BgService: init');
    this.resizeSubject.next('circles');
  }

  toggleHeaderDarkBg(isDark: boolean) {
    this.headerDarkBgSubject.next(isDark);
  }

  mobile(width: number, height: number) {
    console.log('BgService: mobile resize');
  }
  tablet(width: number, height: number) {
    console.log('BgService: tablet resize');
    const ellipses1 = this.document.body.querySelectorAll('.ellipses')[0];
    const ellipses2 = this.document.body.querySelectorAll('.ellipses')[1];
    this.renderer.setStyle(ellipses1, 'transform', `translateX(-${86}px)`);
    this.renderer.setStyle(ellipses2, 'transform', `translateX(${width - 140}px)`);
  }
  desktop(width: number, height: number) {
    this.tablet(width, height);
  }

  doResize(id: string) {
    const isMobile = this.breakpointObserver.isMatched('(max-width: 599px)');
    const isTablet = this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959px)');
    const isDesktop = this.breakpointObserver.isMatched('(min-width: 960px)') && !isTablet;

    console.log(`BgService: isMobile: ${isMobile}, isTablet: ${isTablet}, isDesktop: ${isDesktop}`);

    const resizeKey = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    console.log(`BgService: resizing ${id}`);
    // get the element by class
    const el = this.document.body.querySelectorAll(`.${id}`)[0];
    if (!el) {
      console.warn(`BgService: element with id ${id} not found`);
      return;
    }
    // get body width and height
    const root = this.document.querySelectorAll('opy-home')[0] as HTMLElement;
    const bodyWidth = root.offsetWidth;
    const bodyHeight = root.offsetHeight;

    console.log(`BgService: resizing ${id} to ${bodyWidth}x${bodyHeight}`);

    // set the element width and height
    this.renderer.setStyle(el, 'width', `${bodyWidth}px`);
    this.renderer.setStyle(el, 'height', `${bodyHeight}px`);

    if (this[resizeKey]) {
      this[resizeKey](bodyWidth, bodyHeight);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

const resizeBgFn = (bgService: BgService) => {
  return () => bgService.init();
}

export const resizeInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: resizeBgFn,
  deps: [BgService],
}
