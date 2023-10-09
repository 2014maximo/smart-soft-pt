import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @HostBinding('class.fileover') fileOver: boolean = false;
  @Output() fileDropped: EventEmitter<any> =  new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public ondrop(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0 && files[0].type === "text/csv") {
      this.fileDropped.emit(files);
    }
  }

}
