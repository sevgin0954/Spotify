import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-fit',
  templateUrl: './text-fit.component.html',
  styleUrls: ['./text-fit.component.scss', '../styles.scss']
})
export class TextFitComponent implements AfterViewChecked {
  @Input()
  text: string;

  @Input()
  displayRows: number;

  @ViewChild('textElement') textElement: ElementRef;

  // Replace with style file
  ngAfterViewChecked(): void {
    this.textElement.nativeElement.setAttribute('style', `-webkit-line-clamp: ${this.displayRows}`);
  }
}
