import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  isLogin: boolean = true;

  ngOnInit(): void {
  }

  switchMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return

    if (this.isLogin) {

    } else {
      const email = form.value.email
      const password = form.value.password
      this.authService.signup(email, password).subscribe(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    }

    form.reset()
  }

}
