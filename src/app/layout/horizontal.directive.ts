import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding, Input,
  QueryList,
} from '@angular/core'
import {BoxDirective} from './box.directive'
import {LoggerService} from '../logger.service'
import {VerticalDirective} from './vertical.directive'
import {DomSanitizer} from '@angular/platform-browser'

@Directive({
  selector: '[lrnHorizontal]',
})
export class HorizontalDirective implements AfterContentInit {

  @Input()

  @HostBinding('style.display') public display: string = 'flex'
  @HostBinding('style.align-items') public alignItems: string = 'stretch'
  @HostBinding('style.width') public width: string = '100%'
  @HostBinding('style.justify-content') justifyContent: string = 'space-between'

  @ContentChildren(BoxDirective)
  public boxes: QueryList<BoxDirective>

  @ContentChildren(HorizontalDirective, {descendants: true})
  public horBoxes: QueryList<HorizontalDirective>

  @ContentChildren(VerticalDirective)
  public verBoxes: QueryList<VerticalDirective>

  constructor(private logger: LoggerService,
              private elementRef: ElementRef,
              private sanitizer: DomSanitizer) {
  }

  ngAfterContentInit() {
    this.assert()

    const numberOfBoxes = this.boxes.length
    const numberOfMargins = numberOfBoxes - 1

    const ems = numberOfMargins

    this.boxes.forEach(box => {
      this.setBoxWidth(box, numberOfMargins, numberOfBoxes)
    })
    this.horBoxes.filter(x => x != this).forEach(box => {
      this.setBoxWidth(box, numberOfMargins, numberOfBoxes)
    })
    this.verBoxes.forEach(box => {
      this.setBoxWidth(box, numberOfMargins, numberOfBoxes)
    })
  }

  private setBoxWidth(box: BoxDirective | HorizontalDirective | VerticalDirective,
                      numberOfMargins: number, numberOfBoxes: number) {
    const safeString =
      this.sanitizer.bypassSecurityTrustStyle(
        `calc((100% - ${numberOfMargins}em) / ${numberOfBoxes})`,
      )
    box.width = <string>safeString
  }

  private assert() {
    if (this.boxes.length == 0) {
      this.logger.error(`lrnHorizontal must have at least one lrnBox, lrnVertical ` +
        `or lrnHorizontal direct child.`, this.elementRef.nativeElement)
    }
  }
}
