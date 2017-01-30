import {
    Directive, TemplateRef, ElementRef, OnInit, EmbeddedViewRef,
    ViewContainerRef
} from '@angular/core';

@Directive({selector: '[lrnFitText]'})
export class FitTextDirective implements OnInit {

    private view: EmbeddedViewRef<{}>;

    private originalWidth: number;
    private originalHeight: number;

    constructor(private templateRef: TemplateRef<Object>,
                private elementRef: ElementRef,
                private viewContainerRef: ViewContainerRef) {
        console.log('fix text constructor');
    }

    public ngOnInit(): void {
        this.view = this.viewContainerRef.createEmbeddedView(this.templateRef);

        console.log(this.view.rootNodes);

        // Wrap contents into a span
        this.view.rootNodes.forEach(parent => {
            const spanWrapper = document.createElement('span');
            while (parent.firstChild) {
                spanWrapper.appendChild(parent.firstChild);
            }
            parent.appendChild(spanWrapper);
        });

        this.view.rootNodes.forEach(rootNode => {

            console.log(rootNode);
            const span = rootNode.children[0];
            console.log(span);
            const style = window.getComputedStyle(span);

            let box = rootNode.getBoundingClientRect();
            let rect = span.getBoundingClientRect();
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
