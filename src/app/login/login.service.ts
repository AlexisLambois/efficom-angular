import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  createTeam(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://51.75.122.159:3000/auth/login', {
        email: email,
        password: password
      }, httpOptions).subscribe((response: any) => {
        this.setTokenSession(response);
        return resolve(response);
      });
    });
  }

  setTokenSession(connectionObject: any): void {
    localStorage.setItem('auth', JSON.stringify(connectionObject));
  }

  checkConnection(): any {
    return localStorage.getItem('auth') ? localStorage.getItem('auth') : false;
  }
}
