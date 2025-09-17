import { Routes } from '@angular/router';
import { ListaUsuarios } from './pages/lista-usuarios/lista-usuarios';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

export const routes: Routes = [
    {path:"",pathMatch:'full', redirectTo: 'home'},
    {path:"home", component:ListaUsuarios },
    {path: "users/:id", component: UserViewComponent },
    {path: "newuser", component:UsuarioFormComponent},
    {path:"**", redirectTo: "home"}
];
