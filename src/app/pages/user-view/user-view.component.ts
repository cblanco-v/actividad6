import { Component, inject, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUser } from '../../interfaces/iusuario.interfaces';
import { RouterModule } from '@angular/router';

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
  async ngOnInit(){
    try{
     this.user = await this.srv.getUsuarioById(this.id)
    }
    catch(msg:any){
      console.log(msg)

    }
  }
}
