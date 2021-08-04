import { AfterViewChecked, ElementRef, OnChanges, Renderer2, SecurityContext, SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-text-fit-unescaped',
  templateUrl: './text-fit-unescaped.component.html',
  styleUrls: ['./text-fit-unescaped.component.scss', '../styles.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TextFitUnescapedComponent implements AfterViewChecked {
  @Input()
  text: string;

  @Input()
  displayRows: number;

  @ViewChild('textElement') 
  textElement: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private renderer2: Renderer2) { }

  ngAfterViewChecked(): void {
    this.renderer2.setProperty(this.textElement.nativeElement, 'innerHtml', this.text);
    this.textElement.nativeElement.setAttribute('style', `-webkit-line-clamp: ${this.displayRows}`);
  }
}
