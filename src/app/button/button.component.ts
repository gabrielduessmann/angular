import { DYNAMIC_TYPE } from '@angular/compiler';
import {Component} from '@angular/core';;

@Component({
    selector: 'button-password',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})

export class ButtonComponent {

    color :String = '';
    countClicks :Date[] = [];

    toggleColor() {
        this.updateCountClickNumber();
        if (this.color === '') {
            this.color = 'green';
        }
        else if (this.color === 'green'){
            this.color = 'red';
        }
        else {
            this.color = 'green';
        }
    }

    updateCountClickNumber() {
        // this.countClicks.push(this.countClicks.length + 1);
        this.countClicks.push(new Date()); 
    }

    stylyLabel(click) {
        return click >= 4 ? 'blue' : 'white';
    }
}