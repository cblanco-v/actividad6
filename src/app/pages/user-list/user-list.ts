import { Component, EventEmitter, inject } from '@angular/core';
import { IUser, IUserResponse } from '../../interfaces/iuser.interfaces';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  imports: [UserCardComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  srv = inject(UserService);
  users: IUser[] = [];
  nPage: number = 1;
  totalPage: number = 0;

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const resp: IUserResponse = await this.srv.getAllUsuarios();
      this.users = resp.results;
      this.nPage = resp.page;
      this.totalPage = resp.total_pages;
    } catch (error) {
      console.log(error);
    }
  }
  async nextPage() {
    this.nPage++;
    this.changePage(this.nPage);
  }
  async prevPage() {
    this.nPage--;
    this.changePage(this.nPage);
  }

  async changePage(nPage: number) {
    try {
      const resp: IUserResponse = await this.srv.changePage(this.nPage);
      this.users = resp.results;
      this.nPage = resp.page;
    } catch (error) {
      console.log(error);
    }
  }
  getMensajeOK(message: string) {
    Swal.fire({
      icon: 'success',
      draggable: true,
    });
  }
}
