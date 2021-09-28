import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert/alert.component';
import { PlaceholderDirective } from '../placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  isLogin: boolean = true
  isLoading: boolean = false
  errorMessage: string = null
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective
  private closeSub: Subscription

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
        this.showErrorAlert(errorMessage)
        this.isLoading = false
      }
    )
  }

  onHandleError() {
    this.errorMessage = null
  }


  private showErrorAlert(errorMessage: string): void {
    let alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    let hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    let componentRef = hostViewContainerRef.createComponent(alertComponentFactory)
    componentRef.instance.message = errorMessage
    this.closeSub = componentRef.instance.close.subscribe(()=> {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }

  ngOnDestroy() {
    if (this.closeSub) this.closeSub.unsubscribe()
  }

}
