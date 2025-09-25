import { Routes } from '@angular/router';
import { UserList } from './pages/user-list/user-list';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    {path:"",pathMatch:'full', redirectTo: 'home'},
    {path:"home", component:UserList },
    {path: "users/:id", component: UserViewComponent },
    {path: "newuser", component:UserFormComponent},
    {path: "updateuser/:id", component: UserFormComponent},
    {path:"**", redirectTo: "home"}
];
