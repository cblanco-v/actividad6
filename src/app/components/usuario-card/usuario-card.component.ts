import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { IError, IUser } from '../../interfaces/iusuario.interfaces';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2'

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
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas borrar al usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    });
  
    if (result.isConfirmed) {
      try {
        const resp: any = await this.srv.remove(id);
        if (!resp.error) {
          await Swal.fire({
            title: '¡Eliminado!',
            text: 'El usuario ha sido eliminado.',
            icon: 'success',
            confirmButtonColor: '#ffc107'
          });
        } else {
          Swal.fire('Error', resp.error, 'error');
        }
      } catch (err: any) {
        Swal.fire('Error', 'Hubo un problema al eliminar el usuario', 'error');
        console.error(err);
      }
    }
  }

}
