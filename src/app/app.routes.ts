import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { TITLE_TOKEN } from '../core';

export const routes: Routes = [
  {
    path: 'work',
    loadComponent: () => import('../work/work.component').then(m => m.WorkComponent),
    title: () => {
      const rootTitle = inject(TITLE_TOKEN);
      return `${rootTitle} - Work`;
    }
  },
  {
    path: '',
    loadComponent: () => import('../home').then(m => m.HomeComponent),
    title: () => {
      const rootTitle = inject(TITLE_TOKEN);
      return `${rootTitle} - Home`;
    }
  },
];