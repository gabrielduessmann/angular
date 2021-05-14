import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef) { }

  @HostBinding('class.open') isDropdownOpen: boolean = false;

  @HostListener('document:click', ['$event']) toggleDropdown(event: Event): void {
    this.isDropdownOpen = this.elRef.nativeElement.contains(event.target) ? !this.isDropdownOpen : false;
  }
}
