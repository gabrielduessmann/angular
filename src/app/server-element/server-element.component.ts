import { 
  Component, 
  OnInit, 
  Input, 
  ViewEncapsulation, 
  OnChanges,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, Native (options)
})
export class ServerElementComponent implements OnInit, OnChanges, OnDestroy {

  @Input('serverElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {

  }


}
