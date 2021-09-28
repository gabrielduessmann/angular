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

const USER_DATA_STORAGE = "userData"

@Injectable()
export class AuthService {

  webApiKey: string = "AIzaSyDSorMMvBaD2bdkTbdIDLvZr1YZvAFfivg"
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any

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
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  logout(): void {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem(USER_DATA_STORAGE)
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  autoLogin(): void {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem(USER_DATA_STORAGE))
    if (!userData) {
      return
    } 

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadedUser.token) {
      this.user.next(loadedUser)
      const durationTimeToExpire: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(durationTimeToExpire)
    }
  }

autoLogout(expirationDuration: number): void {
  this.tokenExpirationTimer = setTimeout(() => {
    this.logout()
  }, expirationDuration)
}

}
