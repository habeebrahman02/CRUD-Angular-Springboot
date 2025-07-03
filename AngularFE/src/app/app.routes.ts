import { Routes } from "@angular/router";
import { ShowUsersComponent } from "./show-users/show-users.component";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";
import { LoginComponent } from "./login/login.component";


export const routes: Routes = [
    
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'users', component: ShowUsersComponent },
  { path: 'add-user', component: AddEditUserComponent },
  { path: 'edit-user/:id', component: AddEditUserComponent },
  { path: 'login', component: LoginComponent},
];