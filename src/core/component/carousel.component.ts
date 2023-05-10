import { InjectionToken, TemplateRef } from '@angular/core';
import { BaseComponent } from './base-component';

export interface ICarouselComponent extends BaseComponent {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  template?: TemplateRef<any>;
  isActive?: boolean;
  isPrevious?: boolean;
  isNext?: boolean;

  setActiveState(isActive: boolean): void;
  setPreviousState(isPrevious: boolean): void;
  setNextState(isNext: boolean): void;
}

export const CAROUSEL_COMPONENT_TOKEN = new InjectionToken<ICarouselComponent>('CAROUSEL_COMPONENT_TOKEN');