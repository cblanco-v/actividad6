import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IError, IUser } from '../interfaces/iuser.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private urlAPI: string = 'https://peticiones.online/api/users/';

  getAllUsuarios(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.urlAPI));
  }
  getUsuarioById(id: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.urlAPI}${id}`));
  }

  changePage(nPage: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.urlAPI}?page=${nPage}`));
  }

  remove(id: string): Promise<IUser | IError> {
    return lastValueFrom(this.httpClient.delete<IUser | any>(`${this.urlAPI}${id}`));
  }

  insert(user: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.urlAPI, user));
  }

  update(user: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.put<IUser>(`${this.urlAPI}${user._id}`, user));
  }
}
