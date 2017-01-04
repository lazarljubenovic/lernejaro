import {
    Component,
    OnInit,
    Input,
    ContentChildren,
    QueryList,
    ViewChild,
    ElementRef,
    Renderer,
    AfterContentInit, HostListener
} from "@angular/core";
import {SlideComponent} from "./slide/slide.component";

@Component({
    selector: 'lrn-presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent implements OnInit, AfterContentInit {

    private _currentSlideIndex: number = 0;

    @Input()
    public set currentSlideIndex(currentSlideIndex: number) {
        this._currentSlideIndex = currentSlideIndex;
        this.updateView();
    };

    public get currentSlideIndex(): number {
        return this._currentSlideIndex;
    }

    @ViewChild('outlet')
    public outlet: ElementRef;

    @ContentChildren(SlideComponent)
    public slideComponents: QueryList<SlideComponent>;

    private updateView(): void {
        // Called when setting another currentSlideIndex. The first time this
        // happens, the slide components are not yet available.
        if (this.slideComponents == null) {
            return;
        }

        const slidesArray = this.slideComponents
            .map(element => element.elementRef.nativeElement);
        const outlet = this.outlet.nativeElement;

        // Remove all slides
        this.renderer.detachView(slidesArray);

        // Attach only the current slide, after the outlet.
        const currentSlide = slidesArray[this.currentSlideIndex];
        this.renderer.attachViewAfter(outlet, [currentSlide]);
    }

    public isFirstSlide(): boolean {
        return this.currentSlideIndex == 0;
    }

    public isLastSlide(): boolean {
        return this.currentSlideIndex == this.slideComponents.length - 1;
    }

    public goToNext() {
        if (!this.isLastSlide()) {
            this.currentSlideIndex++;
        }
    }

    public goToPrevious() {
        if (!this.isFirstSlide()) {
            this.currentSlideIndex--;
        }
    }

    @HostListener('window:keypress', ['$event.key'])
    public onKeyPress(key: string) {
        switch (key.toLocaleLowerCase()) {
            case 'j':
                this.goToNext();
                break;
            case 'k':
                this.goToPrevious();
                break;
        }
    }

    constructor(private renderer: Renderer) {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.updateView();
    }

}
