import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CAROUSEL_COMPONENT_TOKEN, ICarouselComponent } from '../../../core/component';
import { filter, interval, skipUntil, Subject } from 'rxjs';

@Component({
  selector: 'section[opy-carousel]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-wrapper.component.html',
  styleUrls: ['./carousel-wrapper.component.scss'],
})
export class CarouselWrapperComponent implements AfterContentInit, OnInit {
  @Input() mode: 'horizontal' | 'vertical' = 'horizontal';
  @ContentChildren(CAROUSEL_COMPONENT_TOKEN) items: QueryList<ICarouselComponent> = new QueryList<ICarouselComponent>();
  private currentIndex = 0;
  start$ = new Subject<void>();
  looper$ = interval(5000).pipe(
    skipUntil(this.start$),
  );
  nexter$ = this.looper$.pipe(
    filter((i) => i % 5 === 0)
  );

constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.nexter$.subscribe(() => {
        this.next();
        this.cdr.detectChanges();
    });
  }

  ngAfterContentInit() {
    this.next();
    this.start$.next();
  }

  next() {
    if (this.items.length === 0) {
      return;
    }
    console.log('next');
    this.reset();
    if (this.currentIndex >= this.items.length) {
      this.currentIndex = 0;
    }

    const previousItem = this.items.get(this.currentIndex - 1);
    const currentItem = this.items.get(this.currentIndex);
    const nextItem = this.items.get(this.currentIndex + 1);

    if (currentItem) {
      this.activateItem(currentItem);
    }

    if (previousItem) {
      this.setPreviousItem(previousItem);
    }
    if (nextItem) {
      this.setNextItem(nextItem);
    }
    this.currentIndex = this.currentIndex + 1;
  }

  activateItem(item: ICarouselComponent) {
    item.setActiveState(true);
    item.setPreviousState(false);
    item.setNextState(false);
  }

  setNextItem(item: ICarouselComponent) {
    item.setActiveState(false);
    item.setPreviousState(false);
    item.setNextState(true);
  }

  setPreviousItem(item: ICarouselComponent) {
    item.setActiveState(false);
    item.setPreviousState(true);
    item.setNextState(false);
  }

  reset() {
    this.items.forEach(item => {
      item.setActiveState(false);
      item.setPreviousState(false);
      item.setNextState(false);
    });
  }

}
