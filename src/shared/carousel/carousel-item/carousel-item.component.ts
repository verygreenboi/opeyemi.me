import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CAROUSEL_COMPONENT_TOKEN, ICarouselComponent } from '../../../core/component';
import * as uuid from 'uuid';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: '[opy-carousel-item]',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  providers: [
    {
      provide: CAROUSEL_COMPONENT_TOKEN,
      useExisting: CarouselItemComponent
    }
  ]
})
export class CarouselItemComponent implements ICarouselComponent {
  readonly id: string = uuid.v4();
  @Input() description: string = '';
  @Input() imageUrl?: string;
  @Input() title: string = '';
  @Input() url?: string;
  @Input() template?: TemplateRef<any>;
  @Input() mode: 'carousel' | 'slider' = 'carousel';
  isActive = false;
  isPrevious = false;
  isNext = false;
  isMobile = this.breakpointObserver.isMatched('(max-width: 599px)');
  isTablet = this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959px)');
  isDesktop = this.breakpointObserver.isMatched('(min-width: 960px)') && !this.isTablet;

  @HostBinding('class') get active(): string {
    return this.mode === 'carousel' ? 'carousel' : 'slider';
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {}

  setActiveState(isActive: boolean) {
    this.isActive = isActive;
    this.cdr.detectChanges();
  }

  setPreviousState(isPrevious: boolean) {
    this.isPrevious = isPrevious;
    this.cdr.detectChanges();
  }

  setNextState(isNext: boolean) {
    this.isNext = isNext;
    this.cdr.detectChanges();
  }
  get width(): number {
    switch (true) {
      case this.isMobile:
        return 240;
      case this.isTablet:
        return 400;
      case this.isDesktop:
        return 600;
      default:
        return 240;
    }
  }
}
