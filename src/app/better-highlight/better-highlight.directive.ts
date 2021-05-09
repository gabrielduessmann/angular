import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultBackgroundColor;
  }

  setStyling(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
  }

  removeStyling(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'color');
    this.renderer.removeStyle(this.elementRef.nativeElement, 'font-size');
  }

  @Input() defaultBackgroundColor: string = 'pink';

  // set alias 'appBetterHighlight' (HTML), same name as my directive selector
  @Input('appBetterHighlight') highlightBackgroundColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  @HostListener('mouseenter') mouseEnter(event: Event) {
    this.setStyling();
    this.backgroundColor = this.highlightBackgroundColor;
  }

  @HostListener('mouseleave') mouveLeave(event: Event) {
    this.removeStyling();
    this.backgroundColor = this.defaultBackgroundColor;
  }

  

}
