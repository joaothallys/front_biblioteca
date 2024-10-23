import { Routes } from '@angular/router';
import { ListComponent } from './components/users/list/list.component';
import { UsersComponent } from './components/users/users.component';
import { NewComponent } from './components/users/new/new.component';
import { DetailsComponent } from './components/users/details/details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'new',
        component: NewComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      }
    ]
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'list', pathMatch: 'full' }
];
