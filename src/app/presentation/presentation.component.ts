import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  Renderer,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import {SlideComponent} from './slide/slide.component'
import {ActivatedRoute, Router} from '@angular/router'
import {PaletteService} from '../ui/palette.service'

@Component({
  selector: 'lrn-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent implements OnInit, AfterContentInit {

  @Input() public author: string | TemplateRef<any>
  @Input() public description: string | TemplateRef<any>
  @Input() public title: string | TemplateRef<any>
  @Input() public logo: string | TemplateRef<any> =
    'https://akimg0.ask.fm/assets/149/346/095/normal/elfaklogo.png'

  private _currentSlideIndex: number = 0

  @Input()
  public set currentSlideIndex(currentSlideIndex: number) {
    this._currentSlideIndex = currentSlideIndex
    this.updateView()
  };

  public get currentSlideIndex(): number {
    return this._currentSlideIndex
  }

  @ViewChild('outlet') public outlet: ElementRef

  @ContentChildren(SlideComponent)
  public slideComponents: QueryList<SlideComponent>

  public showPalettePicker: boolean = false

  private updateView(): void {
    // Called when setting another currentSlideIndex. The first time this
    // happens, the slide components are not yet available.
    if (this.slideComponents == null) {
      return
    }

    // Give logo data to all slides
    this.slideComponents.forEach(slide => slide.logo = this.logo)

    const slidesArray = this.slideComponents
      .map(element => element.elementRef.nativeElement)
    const outlet = this.outlet.nativeElement

    // Remove all slides
    this.renderer.detachView(slidesArray)

    // Attach only the current slide, after the outlet.
    const currentSlide = slidesArray[this.currentSlideIndex]
    this.renderer.attachViewAfter(outlet, [currentSlide])

    // Update route
    // TODO: What if multiple presentations on the same screen?
    const slide = this.currentSlideIndex + 1
    this.router.navigate(['.', {slide}], {relativeTo: this.route})
  }

  public isFirstSlide(): boolean {
    return this.currentSlideIndex == 0
  }

  public isLastSlide(): boolean {
    return this.currentSlideIndex == this.slideComponents.length - 1
  }

  public goToFirst() {
    this.currentSlideIndex = 0
  }

  public goToLast() {
    this.currentSlideIndex = this.slideComponents.length - 1
  }

  public goToNext() {
    if (!this.isLastSlide()) {
      this.currentSlideIndex++
    }
  }

  public goToPrevious() {
    if (!this.isFirstSlide()) {
      this.currentSlideIndex--
    }
  }

  // TODO Try to refactor this so you dont need this function but do some keypress.l magic in
  // their respective functions
  @HostListener('window:keypress', ['$event.key'])
  public onKeyPress(key: string) {
    switch (key.toLowerCase()) {
      case 'l':
        this.goToLast()
        break
      case 'k':
      case ']':
        this.goToNext()
        break
      case 'j':
      case '[':
        this.goToPrevious()
        break
      case 'h':
        this.goToFirst()
        break
    }
  }

  constructor(private renderer: Renderer,
              private route: ActivatedRoute,
              private router: Router,
              private palette: PaletteService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.route.params
      .distinctUntilKeyChanged('slide')
      .subscribe(params => {
        const slideIndex = +params['slide'] - 1
        if (slideIndex != null && !isNaN(slideIndex)) {
          if (slideIndex >= this.slideComponents.length) {
            this.goToFirst()
          } else {
            this.currentSlideIndex = slideIndex
          }
        } else {
          this.goToFirst()
        }
      })
    this.updateView()
  }

}
