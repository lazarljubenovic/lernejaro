import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core'
import {highlightElement} from 'prismjs'
import {LoggerService} from '../logger.service'
import {PresentationComponent} from '../presentation/presentation.component'

@Component({
  selector: 'code[lrnCode]',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CodeComponent implements AfterViewInit, OnInit {

  @Input('lrnCode') public language: string = 'javascript'

  constructor(private elementRef: ElementRef,
              private changeDetectorRef: ChangeDetectorRef,
              private logger: LoggerService,
              @Optional() private presentation: PresentationComponent) {
    this.changeDetectorRef.detach()
  }

  private render() {
    const element = this.elementRef.nativeElement
    element.classList.add(`language-${this.language}`)
    // debugger
    // element.addAttribute('data-lrn-code', this.language)
    highlightElement(element, false)
  }

  ngOnInit() {
    if (this.language == null) {
      // TODO Provide a full list of languages.
      this.logger.error(`You've created a code snippet using directive lrnCode, ` +
        `but you haven't provided the language which you've used. Provide a language ` +
        `to the directive; eg. language="javascript", language="c", language="cpp" or ` +
        `language="lisp".`, this.elementRef.nativeElement)
    }
  }

  ngAfterViewInit() {
    this.render()
    if (this.presentation == null) {
      this.presentation.slideChange$.subscribe(() => this.render())
    }
  }

}
