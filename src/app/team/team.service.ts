import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
  }

  getMyTeam(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      this.http.get<any>((environment.mock ? './assets/mocks/pokemon.json' : `${environment.apiUrl}/trainers/me/team`),
        {headers: this.httpHeaders}).subscribe((response: number[]) => {
        return resolve(response);
      }, error => {
        if (error.status === 401) {
          localStorage.removeItem('auth');
          location.reload();
          return resolve(null);
        }
      });
    });
  }

  updateTeam(ids: number[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.http.put<any>(`${environment.apiUrl}/trainers/me/team`, ids,
        {headers: this.httpHeaders}).subscribe((response) => {
        return resolve(response);
      }, error => {
        if (error.status === 400) {
          localStorage.removeItem('auth');
          location.reload();
          return resolve(null);
        }
      });
    });
  }

  get token(): string {
    return JSON.parse(localStorage.getItem('auth')).access_token;
  }

}
