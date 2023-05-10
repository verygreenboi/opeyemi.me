import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { resizeInitProvider } from './core/services';
import { LayoutModule } from '@angular/cdk/layout';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      BrowserAnimationsModule,
      LayoutModule
    ]),
    resizeInitProvider
  ]
}).catch(err => console.error(err));
