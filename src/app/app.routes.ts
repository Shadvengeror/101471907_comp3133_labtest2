import { Routes } from '@angular/router';
import { CharacterlistComponent } from './characterlist/characterlist'; 
import { CharacterDetailsComponent } from './characterdetails/characterdetails';

export const routes: Routes = [
  { path: '', component: CharacterlistComponent },
  { path: 'details/:id', component: CharacterDetailsComponent } 
];