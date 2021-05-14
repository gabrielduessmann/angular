import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor() { }

  @HostBinding('class.open') isDropdownOpen: boolean = false;

  @HostListener('click') toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
