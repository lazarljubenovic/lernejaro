import {
  AfterContentInit,
  Component,
  ComponentFactory,
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
import {TitleSlideComponent} from './title-slide/title-slide.component'

interface SlideIdentifier {
  type: string // 'title' | 'user' | 'questions' | 'thank-you'
  index?: number
}

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

  @Input() public withoutTitleSlide: boolean = false
  @Input() public withoutQuestionsSlide: boolean = false
  @Input() public withoutThankYouSlide: boolean = false

  private _currentSlideIndex: number = 0

  public set currentSlideIndex(currentSlideIndex: number) {
    this._currentSlideIndex = currentSlideIndex
    this.currentSlideIdentifier = this.slideIdentifiers[currentSlideIndex]
  };

  public get currentSlideIndex(): number {
    return this._currentSlideIndex
  }

  private get slideIdentifiers(): SlideIdentifier[] {
    return [
      ...(!this.withoutTitleSlide ? [{type: 'title'}] : []),
      ...this.slideComponents.map((_, index) => ({type: 'user', index})),
      ...(!this.withoutQuestionsSlide ? [{type: 'questions'}] : []),
      ...(!this.withoutThankYouSlide ? [{type: 'thank-you'}] : [])
    ]
  }

  private mapGlobalIndexToUserSlideIndex(globalIndex): number {
    if (this.withoutTitleSlide) {
      return globalIndex
    } else {
      return globalIndex - 1
    }
  }

  private _currentSlideIdentifier: SlideIdentifier = null

  public get currentSlideIdentifier(): SlideIdentifier {
    return this._currentSlideIdentifier
  }

  public set currentSlideIdentifier(value: SlideIdentifier) {
    this._currentSlideIdentifier = value
    if (this.slideComponents != null) {
      this.updateView()
    }
  }

  @ViewChild('outlet') public outlet: ElementRef

  @ContentChildren(SlideComponent)
  public slideComponents: QueryList<SlideComponent>

  public showPalettePicker: boolean = false

  private updateView(): void {
    const userProvidedSlides = this.slideComponents
      .map(element => element.elementRef.nativeElement)

    // Remove all slides
    this.renderer.detachView(userProvidedSlides)

    // Here we care only for attaching user slides
    if (this.currentSlideIdentifier.type == 'user') {
      // Attach only the current user slide, after the outlet.
      const userSlideIndex = this.mapGlobalIndexToUserSlideIndex(this.currentSlideIndex)
      const currentSlide = userProvidedSlides[userSlideIndex]
      this.renderer.attachViewAfter(this.outlet.nativeElement, [currentSlide])
    } else {

    }

    // Update route
    // TODO: What if multiple presentations on the same screen?
    const slide = this.currentSlideIndex + 1
    this.router.navigate(['.', {slide}], {relativeTo: this.route})
  }

  public isFirstSlide(): boolean {
    return this.currentSlideIndex == 0
  }

  public isLastSlide(): boolean {
    return this.currentSlideIndex == this.slideIdentifiers.length - 1
  }

  public goToFirstSlide(): void {
    this.currentSlideIndex = 0
  }

  public goToLastSlide(): void {
    this.currentSlideIndex = this.slideIdentifiers.length - 1
  }

  public goToNext(): void {
    if (!this.isLastSlide()) {
      this.currentSlideIndex++
    }
  }

  public goToPrevious(): void {
    if (!this.isFirstSlide()) {
      this.currentSlideIndex--
    }
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    if (event.target != document.body) {
      return
    }
    switch (event.code) {
      case 'End':
        this.goToLastSlide()
        break
      case 'KeyJ':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case 'Space':
        this.goToNext()
        break
      case 'KeyK':
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        this.goToPrevious()
        break
      case 'Home':
        this.goToFirstSlide()
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
    this.currentSlideIdentifier = this.slideIdentifiers[0]

    this.route.params
      .distinctUntilKeyChanged('slide')
      .subscribe(params => {
        const slideIndex = +params['slide'] - 1
        if (slideIndex != null && !isNaN(slideIndex) && slideIndex < this.slideIdentifiers.length) {
          this.currentSlideIndex = slideIndex
        } else {
          this.goToFirstSlide()
        }
      })

    this.slideComponents.forEach(slide => slide.logo = this.logo)
  }

}
