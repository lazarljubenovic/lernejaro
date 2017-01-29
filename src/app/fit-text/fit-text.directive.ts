import {Directive, TemplateRef, ElementRef, OnInit, EmbeddedViewRef} from '@angular/core';

@Directive({selector: '[lrnFitText]'})
export class FitTextDirective implements OnInit {

    private view: EmbeddedViewRef<{}>;

    private originalWidth: number;
    private originalHeight: number;

    constructor(private templateRef: TemplateRef<any>, private elementRef: ElementRef) {
    }

    public ngOnInit(): void {
        // TODO Wrap content in a <span> here instead of in consumer code

        const el: HTMLElement = this.elementRef.nativeElement;
        this.view = this.templateRef.createEmbeddedView({});
        this.view.rootNodes.forEach(rootNode => {
            el.parentNode.insertBefore(rootNode, el);
        });

        this.view.rootNodes.forEach(rootNode => {
            const span = rootNode.children[0];
            const style = window.getComputedStyle(span);

            let box = rootNode.getBoundingClientRect();
            let rect = span.getBoundingClientRect();
            console.log(box, rect);
            let i = 1000;
            while (true) {
                let currentFontSize: number = parseFloat(style.fontSize);
                rect = span.getBoundingClientRect();
                if (rect.width < box.width && rect.height < box.height && i-- > 0) {
                    span.style.fontSize = `${currentFontSize + 1}px`;
                } else {
                    span.style.fontSize = `${currentFontSize - 1}px`;
                    break;
                }
            }
        });
    }

    // TODO go up and down
    // TODO try binary finding for perf reasons

    private update() {

    }

}
