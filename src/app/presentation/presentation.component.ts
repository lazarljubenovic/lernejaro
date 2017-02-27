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

    // TODO This should be provided app-wide (probably a service from the UI module should handle
    // it), but definitely not here, this is not specific to presentation
    @Input() public theme: string = 'dark';
    @Input() public themeColor: string = 'amber';

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

    public showPalettePicker: boolean = false;

    // TODO This should be a separate component
    // and this array should actually be injected or something
    public colors = [
        'red',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'light-green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deep-orange',
    ];

    // TODO type this properly, those are not strings but actual strings 'blue' 'orange' etc
    public selectColor(color: string = this.themeColor) {
        document.body.className = document.body.className
            .replace(/lrn-theme-color-.*?(\s|$)/, '')
            .trim();
        this.themeColor = color;
        document.body.classList.add(`lrn-theme-color-${this.themeColor}`);
    }

    // TODO see above
    public selectTheme(theme: string = this.theme) {
        document.body.classList.remove(`lrn-theme-light`);
        document.body.classList.remove(`lrn-theme-dark`);
        this.theme = theme;
        document.body.classList.add(`lrn-theme-${this.theme}`);
    }

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
        this.selectColor();
        this.selectTheme();
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
