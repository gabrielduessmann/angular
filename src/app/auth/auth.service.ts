import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

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
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.webApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.authenticateUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      )
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
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.authenticateUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    )
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

  private authenticateUser(email: string, localId: string, token: string, expiresIn: number ) {
    const expirationDate: Date = new Date(new Date().getTime() + expiresIn * 1000)
    const user: User = new User(
      email, 
      localId, 
      token, 
      expirationDate
    )
    this.user.next(user)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  logout(): void {
    this.user.next(null)
    this.router.navigate(['/auth'])
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    } 

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadedUser.token) {
      this.user.next(loadedUser)
    }
  }
}
