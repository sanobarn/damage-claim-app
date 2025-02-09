import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'damage-assessment', loadChildren: () => import('./components/damage-assessment/damage-assessment.routes')
    .then(m => m.routes) },
  // Wildcard route for handling unknown paths (redirects to home)
  { path: '**', redirectTo: '', pathMatch: 'full' }];
