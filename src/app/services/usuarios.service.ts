import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IError, IUser } from '../interfaces/iusuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private httpClient = inject (HttpClient)
  private urlAPI: string ="https://peticiones.online/api/users/"

  getAllUsuarios(url:string):Promise <any>{
    const urlParam = (url==="") ? this.urlAPI : url
    return lastValueFrom(this.httpClient.get<any>(urlParam))
  }
  getUsuarioById(id: string):Promise <any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.urlAPI}${id}`))

  }

  changePage(nPage: number):Promise <any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.urlAPI}?page=${nPage}`))
  }

  remove(id:string): Promise <IUser|IError>{
    return lastValueFrom(this.httpClient.delete<IUser|any>(`${this.urlAPI}${id}`))
  }

  insert(user:IUser):Promise <IUser>{
    return lastValueFrom(this.httpClient.post<IUser>(this.urlAPI, user))
  }

  update (user:IUser):Promise <IUser>{
    return lastValueFrom(this.httpClient.put<IUser>(`${this.urlAPI}${user._id}`, user))
  }
   
  
}
