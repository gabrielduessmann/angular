import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../data-storage/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

    private userSub: Subscription
    isAuthenticated: boolean = false;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.subscribeToUser()
    }

    public saveData(): void {
        this.dataStorageService.saveRecipes();
    }


    public fetchData(): void {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    private subscribeToUser() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user
        })
    }

    logout(): void {
        this.authService.logout();
    }

    ngOnDestroy() {
        if (this.userSub) this.userSub.unsubscribe()
    }
}