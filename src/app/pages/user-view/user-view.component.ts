import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUser } from '../../interfaces/iusuario.interfaces';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-view',
  imports: [RouterModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() id: string ="" 
  srv = inject(UsuariosService)  
  user!:IUser
  router = inject(Router);

  async ngOnInit(){
    try{
     this.user = await this.srv.getUsuarioById(this.id)
    }
    catch(msg:any){
      console.log(msg)

    }
  }
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
        this.router.navigate(['/home']);
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
