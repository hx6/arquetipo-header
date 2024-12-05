import { Routes } from '@angular/router';
import { NavigatorComponent } from './modules/components/navigator/navigator.component';

export const routes: Routes = [
  { path: 'navigator', component: NavigatorComponent },
  { path: '', redirectTo: '/navigator', pathMatch: 'full' }
];
