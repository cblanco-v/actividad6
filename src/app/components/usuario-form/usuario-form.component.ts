import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iusuario.interfaces';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  userForm: FormGroup;
  srv = inject(UsuariosService);
  router = inject(Router);
  @Input() id: string = '';
  title: string = 'Crear';
  user: IUser | any;
  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl('', []),
      last_name: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', []),
    });
  }

  async getDataForm() {
    try {
      if (this.userForm.value._id) {//update
        const resp = await this.srv.update(this.userForm.value);
        if (resp) {
          this.router.navigate(['/home']);
          alert('Usuario actualizado');
        }
      } else { //create
        const resp = await this.srv.insert(this.userForm.value);
        if (resp) {
          this.router.navigate(['/home']);
          alert('Usuario creado');
        }
      }
    } catch (msg) {
      console.log(msg);
    }
  }
  async ngOnInit() {
    if (this.id) {
      this.title = 'Actualizar';
      this.user = await this.srv.getUsuarioById(this.id);
      this.userForm = new FormGroup({
        _id: new FormControl(this.user._id, []),
        first_name: new FormControl(this.user.first_name, []),
        last_name: new FormControl(this.user.last_name, []),
        email: new FormControl(this.user.email, []),
        image: new FormControl(this.user.image, []),
      });
    }
  }
}
