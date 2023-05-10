import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWrapperComponent } from './carousel-wrapper.component';

describe('CarouselWrapperComponent', () => {
  let component: CarouselWrapperComponent;
  let fixture: ComponentFixture<CarouselWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CarouselWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
