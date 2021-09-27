import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      .pipe(catchError(
        err => {
          let formattedErrorMessage: string = "An unkown error occured!"

          if (err.error && err.error.error) {
            let errorMessage: string = err.error.error.message

            switch(errorMessage) {
              case 'EMAIL_EXISTS':
                formattedErrorMessage = "This email already exists!"
                break
            }
          }

          return throwError(formattedErrorMessage)
        }
      ))
  }

}
