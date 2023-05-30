import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appBlockStyle]',
  host: {'(document:keyup)': 'initKeyUp($event)'},
  exportAs: 'blocksStyle'
})
export class BlockStyleDirective implements OnInit, AfterViewInit {

  @Input() selector: string;
  @Input() initFirst: boolean = false;

  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement [];
  private index: number = 0;
  public activeElementIndex: number = 0;

  constructor(private el: ElementRef) { }

  ngOnInit(): void  {

  };

  ngAfterViewInit() {
    this.activeElementIndex = 0;
    if(this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    } else {
      console.error('Не передан селектор')
    }
    setTimeout(() => {
      this.renderComplete.emit(true);
    })
  }

  initKeyUp(ev: KeyboardEvent): void {
    if (this.index < this.items.length-1 && ev.key === 'ArrowRight' || this.index > 0 &&  ev.key === 'ArrowLeft') {
        (this.items[this.index] as HTMLElement).removeAttribute('style');

    }
    if(ev.key === 'ArrowRight' && this.index != this.items.length-1){
        this.index++;
        if (this.items[this.index]) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
        }

    } else if (ev.key === 'ArrowLeft' && this.index != 0) {
      if (this.index>0) {
      this.index--;
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
      }
    }}
    if (this.index >= 0) {
      this.activeElementIndex = this.index;
    }
  }

  initStyle (index:number) {
    if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }

}
