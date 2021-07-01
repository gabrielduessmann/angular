import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html'
})

export class RecipeEditComponent implements OnInit{

    private isEditMode: boolean = false;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                   const index: number = params["id"]; 
                   const isEditMode: boolean = index != null;
                }
            );
    }
}