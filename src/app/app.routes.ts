import { Routes } from '@angular/router';
import { Deals } from './deals/deals';
import { Activites } from './activites/activites';
import { Statistices } from './statistices/statistices';
import { Setting } from './setting/setting';
import { ErrorPage } from './error-page/error-page';
import { Login } from './account_managment/login/login';
import { SignUp } from './account_managment/sign-up/sign-up';

export const routes: Routes = [
  // { path: '', component: Deals },

  { path: '', component: Login },
  { path: 'sign_up', component: SignUp },
  { path: 'deals', component: Deals },
  { path: 'Activities', component: Activites },
  { path: 'Statistics', component: Statistices },
  { path: 'Setting', component: Setting },
  { path: '**', component: ErrorPage },
];
