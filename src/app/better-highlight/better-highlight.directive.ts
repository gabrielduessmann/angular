import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    
  }

  setStyling(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
  }

  removeStyling(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'color');
    this.renderer.removeStyle(this.elementRef.nativeElement, 'font-size');
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  @HostListener('mouseenter') mouseEnter(event: Event) {
    this.setStyling();
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouveLeave(event: Event) {
    this.removeStyling();
    this.backgroundColor = 'pink';
  }

  

}
