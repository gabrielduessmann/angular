import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isLogin: boolean = true
  isLoading: boolean = false
  errorMessage: string = null

  ngOnInit(): void {
  }

  switchMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return

    this.isLoading = true
    const email = form.value.email
    const password = form.value.password
    let authObservable: Observable<AuthResponseData>;

    if (this.isLogin) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signup(email, password)
    }
    
    this.authenticate(authObservable);
    form.reset()
  }


  authenticate(authObservable: Observable<AuthResponseData>) {
    authObservable.subscribe(
      res => {
        console.log(res)
        this.isLoading = false
        this.router.navigate(['./recipes'])
      },
      errorMessage => {
        this.errorMessage = errorMessage
        this.isLoading = false
      }
    )
  }

  onHandleError() {
    this.errorMessage = null;
  }

}
