import { Injectable, OnDestroy } from '@angular/core';
import { animationFrameScheduler, observeOn, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollerService implements OnDestroy {
  private updateChildrenSubject = new Subject<void>();
  private destroy$ = new Subject<void>();
  updateChildren$ = this.updateChildrenSubject.asObservable().pipe(
    observeOn(animationFrameScheduler),
    takeUntil(this.destroy$)
  );

  update() {
    this.updateChildrenSubject.next();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
