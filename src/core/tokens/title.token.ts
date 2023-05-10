import { InjectionToken } from "@angular/core";

export const TITLE_TOKEN = new InjectionToken<string>('TITLE_TOKEN', {
  providedIn: 'root',
  factory: () => 'Opeyemi.me'
});