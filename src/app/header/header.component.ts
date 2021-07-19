import { Component } from "@angular/core";
import { DataStorageService } from "../data-storage/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {


    constructor(private dataStorageService: DataStorageService) {}

    public saveData(): void {
        this.dataStorageService.saveRecipes();
    }


    public fetchData(): void {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}