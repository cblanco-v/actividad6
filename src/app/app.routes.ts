import { Routes } from '@angular/router';
import { ListaUsuarios } from './pages/lista-usuarios/lista-usuarios';

export const routes: Routes = [
    {path:"",pathMatch:'full', redirectTo: 'home'},
    {path:"home", component:ListaUsuarios },
    {path:"**", redirectTo: "home"}
];
