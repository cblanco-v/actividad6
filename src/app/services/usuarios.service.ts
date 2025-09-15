import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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
  getUsuarioById(id: number):Promise <any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.urlAPI}${id}`))

  }

  getApiUrl(){
    return this.urlAPI
  }
  
}
