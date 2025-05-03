import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const MAIN_ROUTES: Routes = [
  { path: '', component: HomeComponent }
  // Add child routes here as needed
];