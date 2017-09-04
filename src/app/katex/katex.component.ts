import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import * as KaTeX from 'katex'

/**
 * A component which encapsulates KaTeX. This is a text rendering
 * engine which mimics LaTeX; it's an open-source project maintained
 * by Khan Academy.
 *
 * Use it to create easy-to-read mathematical formulas, no matter
 * how complex they are.
 *
 * To use it, use an empty element `lrn-tag` and pass in an input
 * `math` with LaTeX code. Check KaTeX documentation for information
 * about which subset of LaTeX is supported and which packages you
 * can consider having in global namespace.
 *
 * To use the display mode, use `displayMode` flag.
 *
 * If you fail to provide `math` input, the component will raise en
 * error because it does not make sense to have an empty LaTex
 * snippet of text.
 */
@Component({
  selector: 'lrn-katex',
  template: `
    <span #original><ng-content></ng-content></span>
    <span #result></span>
  `,
  styleUrls: ['../../../node_modules/katex/dist/katex.min.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  interpolation: ['[[', ']]'],
})
export class KatexComponent implements OnChanges {

  @Input() public math: string
  @Input() public displayMode: boolean = false

  @ViewChild('result') public result: ElementRef

  constructor() {
  }

  ngOnChanges() {
    const options: KaTeX.KatexOptions = {
      displayMode: this.displayMode,
    }
    KaTeX.render(this.math, this.result.nativeElement, options)
  }

}
