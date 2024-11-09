import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    title: 'Users List',
  },
  {
    path: 'addNewUser',
    component: AddNewUserComponent,
    title: 'Add New User',
  },
];
