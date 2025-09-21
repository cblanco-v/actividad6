import { Component, inject } from '@angular/core';
import { IUser, IUserResponse } from '../../interfaces/iusuario.interfaces';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-lista-usuarios',
  imports: [UsuarioCardComponent],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  srv = inject(UsuariosService);
  users: IUser[] = [];
  nPage: number = 1;
  totalPage: number = 0;

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios(url: string = '') {
    try {
      const resp: IUserResponse = await this.srv.getAllUsuarios(url);
      this.users = resp.results;
      this.nPage = resp.page;
      this.totalPage = resp.total_pages;
    } catch (error) {
      console.log(error);
    }
  }
  async nextPage() {
    try {
       this.nPage++
      const resp: IUserResponse = await this.srv.changePage(this.nPage);
      this.users = resp.results;
      this.nPage = resp.page;
    } catch (error) {
      console.log(error);
    }
  }
  async prevPage() {
    try {
      this.nPage--
      const resp: IUserResponse = await this.srv.changePage(this.nPage);
      this.users = resp.results;
      this.nPage = resp.page;
    } catch (error) {
      console.log(error);
    }
  }
  getMensajeOK(event:string){
    Swal.fire({
  title: event,
  icon: "success",
  draggable: true
});
   
  }
}
