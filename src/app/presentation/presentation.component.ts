import {
    Component,
    OnInit,
    Input,
    ContentChildren,
    QueryList,
    ViewChild,
    ElementRef,
    Renderer,
    AfterContentInit,
    HostListener,
    TemplateRef
} from '@angular/core';
import {SlideComponent} from './slide/slide.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'lrn-presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent implements OnInit, AfterContentInit {

    @Input() public author: string | TemplateRef<any>;
    @Input() public description: string | TemplateRef<any>;
    @Input() public title: string | TemplateRef<any>;
    @Input() public logo: string | TemplateRef<any> =
        'https://akimg0.ask.fm/assets/149/346/095/normal/elfaklogo.png';

    private _currentSlideIndex: number = 0;

    @Input()
    public set currentSlideIndex(currentSlideIndex: number) {
        this._currentSlideIndex = currentSlideIndex;
        this.updateView();
    };

    public get currentSlideIndex(): number {
        return this._currentSlideIndex;
    }

    @ViewChild('outlet') public outlet: ElementRef;

    @ContentChildren(SlideComponent)
    public slideComponents: QueryList<SlideComponent>;

    private updateView(): void {
        // Called when setting another currentSlideIndex. The first time this
        // happens, the slide components are not yet available.
        if (this.slideComponents == null) {
            return;
        }

        // Give logo data to all slides
        this.slideComponents.forEach(slide => slide.logo = this.logo);

        const slidesArray = this.slideComponents
            .map(element => element.elementRef.nativeElement);
        const outlet = this.outlet.nativeElement;

        // Remove all slides
        this.renderer.detachView(slidesArray);

        // Attach only the current slide, after the outlet.
        const currentSlide = slidesArray[this.currentSlideIndex];
        this.renderer.attachViewAfter(outlet, [currentSlide]);

        // Update route -- TODO ?
        this.router.navigate(['.', {slide: this.currentSlideIndex}], {relativeTo: this.route});
    }

    public isFirstSlide(): boolean {
        return this.currentSlideIndex == 0;
    }

    public isLastSlide(): boolean {
        return this.currentSlideIndex == this.slideComponents.length - 1;
    }

    // TODO Add host listener for keyboard shortcuts
    public goToFirst() {
        this.currentSlideIndex = 0;
    }

    public goToLast() {
        this.currentSlideIndex = this.slideComponents.length - 1;
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
        switch (key.toLowerCase()) {
            case 'j':
                this.goToNext();
                break;
            case 'k':
                this.goToPrevious();
                break;
        }
    }

    constructor(private renderer: Renderer,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.route.queryParams
            .distinctUntilKeyChanged('slide')
            .subscribe(params => {
                const slide = params['slide'];
                if (slide != null) {
                    this.currentSlideIndex = params['slide'];
                }
            });
    }

    ngAfterContentInit() {
        this.updateView();
    }

}
