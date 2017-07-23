import {
  AfterViewInit,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'

const getBodyFontSize = (): number => {
  const computedStyle = window.getComputedStyle(document.body, null)
  const fontSizeString = computedStyle.getPropertyValue('font-size')
  return parseFloat(fontSizeString)
}

@Directive({selector: '[lrnFitText]'})
export class FitTextDirective implements OnInit, AfterViewInit, OnDestroy {

  private view: EmbeddedViewRef<{}>

  @Input() public minSizePx: number = getBodyFontSize()
  @Input() public maxSizePx: number = 1000

  constructor(private templateRef: TemplateRef<Object>,
              private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef) {
  }

  public ngOnInit(): void {
    this.view = this.viewContainerRef.createEmbeddedView(this.templateRef)

    // Wrap contents into a span
    this.view.rootNodes.forEach(parent => {
      const spanWrapper = document.createElement('span')
      while (parent.firstChild) {
        spanWrapper.appendChild(parent.firstChild)
      }
      parent.appendChild(spanWrapper)
    })

    // TODO Angular bug https://github.com/angular/angular/issues/14191
    window.addEventListener('resize', this.update.bind(this))

    document['fonts'].ready.then(() => {
      this.update()
    })
  }

  public ngAfterViewInit(): void {
    this.update()
  }

  // TODO go up and down
  // TODO try binary finding for perf reasons

  private update() {
    this.view.rootNodes.forEach(rootNode => {
      const span = rootNode.children[0]

      const box = rootNode.getBoundingClientRect()
      const boxStyle = window.getComputedStyle(rootNode)
      const boxWidth = box.width - parseFloat(boxStyle.paddingRight) -
        parseFloat(boxStyle.paddingLeft)
      const boxHeight = box.height - parseFloat(boxStyle.paddingTop) -
        parseFloat(boxStyle.paddingBottom)

      let rect = span.getBoundingClientRect()
      let currentFontSizePx: number = this.minSizePx
      while (currentFontSizePx++ < this.maxSizePx) {
        rect = span.getBoundingClientRect()
        if (rect.width < boxWidth && rect.height < boxHeight) {
          span.style.fontSize = `${currentFontSizePx + 1}px`
        } else {
          span.style.fontSize = `${currentFontSizePx - 1}px`
          break
        }
      }
    })
  }

  public ngOnDestroy() {
  }

}
