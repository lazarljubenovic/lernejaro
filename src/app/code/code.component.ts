import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import {highlightElement} from 'prismjs'

@Component({
  selector: 'code[lrnCode]',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CodeComponent implements AfterViewInit {

  @Input('lrnCode') public language: string = 'javascript'

  constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef.detach()
  }

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement
    element.classList.add(`language-${this.language}`)
    const highlightedCodeHtml = highlightElement(element, true)
  }

}
