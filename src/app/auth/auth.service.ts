import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable()
export class AuthService {

  webApiKey: string = "AIzaSyDSorMMvBaD2bdkTbdIDLvZr1YZvAFfivg";

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.webApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
  }

}
