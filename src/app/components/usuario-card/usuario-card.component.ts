import { Component, input } from '@angular/core';
import { IUser } from '../../interfaces/iusuario.interfaces';

@Component({
  selector: 'app-usuario-card',
  imports: [],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  usuario = input <IUser>()

}
