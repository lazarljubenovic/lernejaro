import {
    Directive,
    TemplateRef,
    ElementRef,
    OnInit,
    EmbeddedViewRef,
    ViewContainerRef,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';

@Directive({selector: '[lrnFitText]'})
export class FitTextDirective implements OnInit, AfterViewInit, OnDestroy {

    private view: EmbeddedViewRef<{}>;

    @Input() public minSizePx: number = 1;
    @Input() public maxSizePx: number = 1000;

    constructor(private templateRef: TemplateRef<Object>,
                private elementRef: ElementRef,
                private viewContainerRef: ViewContainerRef) {
    }

    public ngOnInit(): void {
        this.view = this.viewContainerRef.createEmbeddedView(this.templateRef);

        // Wrap contents into a span
        this.view.rootNodes.forEach(parent => {
            const spanWrapper = document.createElement('span');
            while (parent.firstChild) {
                spanWrapper.appendChild(parent.firstChild);
            }
            parent.appendChild(spanWrapper);
        });

        // TODO Angular bug https://github.com/angular/angular/issues/14191
        window.addEventListener('resize', (event) => {
            console.log(event);
            this.update();
        });
    }

    public ngAfterViewInit(): void {
        this.update();
    }

    // TODO go up and down
    // TODO try binary finding for perf reasons

    private update() {
        this.view.rootNodes.forEach(rootNode => {
            const span = rootNode.children[0];
            const style = window.getComputedStyle(span);

            let box = rootNode.getBoundingClientRect();
            let rect = span.getBoundingClientRect();
            let currentFontSizePx: number = this.minSizePx;
            while (currentFontSizePx++ < this.maxSizePx) {
                rect = span.getBoundingClientRect();
                if (rect.width < box.width && rect.height < box.height) {
                    span.style.fontSize = `${currentFontSizePx + 1}px`;
                } else {
                    span.style.fontSize = `${currentFontSizePx - 1}px`;
                    break;
                }
            }
        });
    }

    public ngOnDestroy() {
    }

}
