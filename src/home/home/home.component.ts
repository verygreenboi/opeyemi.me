import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header';
import { IntroSectionComponent } from '../../sections';
import { FooterComponent } from '../../footer/footer.component';
import { SectionComponent } from '../../core/component';
import { CarouselItemComponent, CarouselWrapperComponent } from '../../shared/carousel';
import { ContactComponent } from '../../contact/contact.component';
import { MenuService } from '../../header/menu.service';
import { combineLatest, delay, distinctUntilChanged, map, of, startWith, switchMap, tap } from 'rxjs';
import { NgxGlideComponent } from 'ngx-glide';
import { BgService } from '../../core/services';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScrollerContainerDirective, ScrollerItemDirective } from '../../shared/scroller';

@Component({
  selector: 'opy-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, IntroSectionComponent, FooterComponent, CarouselWrapperComponent, CarouselItemComponent, ContactComponent, NgxGlideComponent, ScrollerContainerDirective, ScrollerItemDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {
  collapse$ = this.menuService.menuState$.pipe(
    map(menuState => !menuState),
  );
  headerBgClass$ = combineLatest([
    this.bgService.headerDarkBg$,
    this.collapse$
  ]).pipe(
    map(([darkBg, collapse]) => darkBg || !collapse),
    map(darkBg => darkBg ? 'dark-bg' : ''),
    startWith(''),
    distinctUntilChanged(),
  );

  isMobile$ = this.breakpointObserver.observe('(max-width: 767px)').pipe(
    map(state => state.matches),
  );

  @ViewChildren(SectionComponent) sections!: QueryList<SectionComponent>;
  readonly menuOpened$ = this.menuService.menuState$.pipe(
    switchMap(state => state ?
      of(state) : of(state).pipe(
        delay(350)
      )
    )
  );

  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLElement>;

  currentIndex = 0;

  carouselItems = [
    {
      title: 'Designing a User-Friendly Website: Tips and Tricks',
      description: 'Learn how to create a website that is not only visually appealing but also easy to navigate. Discover useful tips and tricks from a seasoned UI/UX designer.',
      imageUrl: 'assets/img/tunnel-img.png',
      url: 'https://www.google.com'
    },
    {
      title: 'The Power of Color in Design: A Guide for UI/UX Designers',
      description: 'Color is a powerful tool in design, and as a UI/UX designer, it\'s essential to understand its impact on user experience. This guide will teach you how to use color effectively to create stunning designs.',
      imageUrl: 'assets/img/empire-otel.png',
      url: 'https://www.google.com'
    },
    {
      title: 'The Importance of Responsive Design for Mobile Users',
      description: 'Mobile devices are now the primary way that people access the internet. As a UI/UX designer, it\'s crucial to design websites that are responsive and mobile-friendly. Learn why this is so important and how to do it effectively.',
      imageUrl: 'assets/img/kandy.png',
      url: 'https://www.google.com'
    },
    {
      title: 'Creating an Engaging User Experience with Animation',
      description: 'Animation is a powerful way to engage users and bring your designs to life. This guide will teach you how to use animation effectively to create a memorable user experience.',
      imageUrl: 'assets/img/rewired-fest.png',
      url: 'https://www.google.com'
    },
    {
      title: 'Designing for Accessibility: A Guide for UI/UX Designers',
      description: 'Accessibility is an important consideration for UI/UX designers. This guide will teach you how to design websites that are accessible to all users, including those with disabilities. Learn best practices and get tips from experts in the field.',
      imageUrl: 'assets/img/voxauth.png',
      url: 'https://www.google.com'
    }
  ];

  constructor(
    private readonly menuService: MenuService,
    private bgService: BgService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngAfterViewInit(): void {
    if (!this.sections) {
      console.warn('No sections found.');
      return;
    }
    this.bgService.init();
  }

  onMoved(data: { direction: '=' | '<' | '>'; steps: number }) {
    const {direction, steps} = data;
    switch (direction) {
      case '=':
        this.currentIndex = steps;
        break;
      case '<':
        if (steps > 0) {
          this.currentIndex = this.carouselItems.length - steps;
        } else {
          this.currentIndex = this.currentIndex - 1 < 0 ? this.carouselItems.length - 1 : this.currentIndex - 1;
        }
        break;
      case '>':
        this.currentIndex = this.currentIndex + 1 > this.carouselItems.length - 1 ? 0 : this.currentIndex + 1
        break;
    }
  }

  logger(inView: boolean) {
    console.log(`InView: ${inView}`);
  }
}
