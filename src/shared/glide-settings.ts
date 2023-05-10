export interface Settings {
  type: string;
  startAt: number;
  perView: number;
  focusAt: number | string;
  gap: number;
  autoplay: number | boolean;
  hoverpause: boolean;
  keyboard: boolean;
  bound: boolean;
  swipeThreshold: number | boolean;
  dragThreshold: number | boolean;
  perTouch: number | boolean;
  touchRatio: number;
  touchAngle: number;
  animationDuration: number;
  rewind: boolean;
  rewindDuration: number;
  animationTimingFunc: string;
  direction: string;
  peek: number | Record<string, unknown>;
  breakpoints: Record<string, unknown>;
  classes: Record<string, unknown>;
  throttle: number;
}

export const defaultSettings: Settings = {
  type: 'slider',
  startAt: 0,
  perView: 1,
  focusAt: 0,
  gap: 10,
  autoplay: false,
  hoverpause: true,
  keyboard: true,
  bound: false,
  swipeThreshold: 80,
  dragThreshold: 120,
  perTouch: false,
  touchRatio: 0.5,
  touchAngle: 45,
  animationDuration: 400,
  rewind: true,
  rewindDuration: 800,
  animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  direction: 'ltr',
  peek: 0,
  breakpoints: {},
  classes: {
    direction: {
      ltr: 'glide--ltr',
      rtl: 'glide--rtl',
    },
    slider: 'glide--slider',
    carousel: 'glide--carousel',
    swipeable: 'glide--swipeable',
    dragging: 'glide--dragging',
    cloneSlide: 'glide__slide--clone',
    activeNav: 'glide__bullet--active',
    activeSlide: 'glide__slide--active',
    disabledArrow: 'glide__arrow--disabled',
  },
  throttle: 25,
};