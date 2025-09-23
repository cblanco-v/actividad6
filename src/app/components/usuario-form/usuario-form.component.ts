import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iusuario.interfaces';
import Swal from 'sweetalert2';


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
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)       
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),]),      
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\//)
      ]),
    });
  }

  async getDataForm() {
  try {
    if (this.userForm.value._id) { 
      // update
      const resp = await this.srv.update(this.userForm.value);
      if (resp) {
        this.router.navigate(['/home']);
        await Swal.fire({
          title: 'Usuario actualizado',
          icon: 'success',
          draggable: true,
          confirmButtonColor: '#3085d6' // opcional: color botón
        });
      }
    } else { 
      // create
      const resp = await this.srv.insert(this.userForm.value);
      if (resp) {
        this.router.navigate(['/home']);
        await Swal.fire({
          title: 'Usuario creado',
          icon: 'success',
          draggable: true,
          confirmButtonColor: '#3085d6'
        });
      }
    }
  } catch (msg) {
    console.log(msg);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema con la operación',
      icon: 'error',
      confirmButtonColor: '#d33'
    });
  }
}
  async ngOnInit() {
    console.log('a'+this.userForm.valid)
    if (this.id) {
      this.title = 'Actualizar';
      this.user = await this.srv.getUsuarioById(this.id);
      this.userForm = new FormGroup({
        _id: new FormControl(this.user._id, []),
        first_name: new FormControl(this.user.first_name, [
          Validators.required,
          Validators.minLength(3) 
        ]),
        last_name: new FormControl(this.user.last_name, [
          Validators.required,
          Validators.minLength(2) 
        ]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
        ]),
        image: new FormControl(this.user.image, [
          Validators.required,
          Validators.pattern(/^https?:\/\//)
        ]),
      });
    }
    console.log('b' + this.userForm.valid)
  }

  checkForm(errorName: string, campoName: string): boolean | undefined{
    return this.userForm.get(campoName)?.hasError(errorName) && this.userForm.get(campoName)?.touched

  }
}
