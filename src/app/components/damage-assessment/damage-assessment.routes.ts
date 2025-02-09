import { Routes } from '@angular/router';
import { DamageListComponent } from './damage-list/damage-list.component';
import { DamageFormComponent } from './damage-form/damage-form.component';

export const routes: Routes = [
  { path: 'list', component: DamageListComponent },
  { path: 'form', component: DamageFormComponent }
];

