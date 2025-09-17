import { Component, input } from '@angular/core';
import { IUser } from '../../interfaces/iusuario.interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-card',
  imports: [RouterLink],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  usuario = input <IUser>()

}
