import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable()
export class AuthService {

  webApiKey: string = "AIzaSyDSorMMvBaD2bdkTbdIDLvZr1YZvAFfivg";

  constructor(private http: HttpClient) { }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.webApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError))
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.webApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let formattedErrorMessage: string = "An unkown error occured!"

    if (errorRes.error && errorRes.error.error) {
      let errorMessage: string = errorRes.error.error.message

      switch(errorMessage) {
        case 'EMAIL_EXISTS':
          formattedErrorMessage = "The email address is already in use by another account."
          break
        case 'EMAIL_NOT_FOUND':
          formattedErrorMessage = "There is no user record corresponding to this identifier. The user may have been deleted."
          break
        case 'INVALID_PASSWORD':
          formattedErrorMessage = "The password is invalid."
          break
      }
    }

    return throwError(formattedErrorMessage)
  }

}
