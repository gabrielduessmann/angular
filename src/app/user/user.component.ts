import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'username',
    templateUrl: './user.component.html'
})

export class UserComponent  {
    username :String;
    canAddNewUser :boolean = false;

    containsUsername() {
        // return this.username != '';
        return false;
    }

    onUpdateUsername(event: any){
        if (event.target.value != '')
            this.canAddNewUser = true;
        else
            this.canAddNewUser = false;
    }
}

