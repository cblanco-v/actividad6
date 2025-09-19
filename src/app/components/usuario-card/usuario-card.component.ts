import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { IError, IUser } from '../../interfaces/iusuario.interfaces';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-card',
  imports: [RouterLink],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css',
})
export class UsuarioCardComponent {
  @Input() user!: IUser
  usuario = input<IUser>();
  srv = inject(UsuariosService);
  @Output() usuarioBorrado: EventEmitter <string> = new EventEmitter()

  async borrarUsuario(id: string) {
    console.log('llego aqui')
    const resp: any = await this.srv.remove(id);
    if (!resp.error){
      this.usuarioBorrado.emit('El usuario ha sido eliminado')
    }else{
      alert(resp.error)
    }
  }

}
