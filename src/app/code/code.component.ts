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
import {LoggerService} from '../logger/logger.service'
import {PresentationComponent} from '../presentation/presentation.component'
import {NoLanguageSpecifiedErrorComponent} from './errors'

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
    highlightElement(element, false)
  }

  ngOnInit() {
    if (this.language == null) {
      this.logger.displayError(NoLanguageSpecifiedErrorComponent)
    }
  }

  ngAfterViewInit() {
    this.render()
    if (this.presentation != null) {
      this.presentation.slideChange$.subscribe(() => this.render())
    }
  }

}
