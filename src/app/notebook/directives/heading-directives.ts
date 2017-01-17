import {Directive, ElementRef, Injectable, AfterContentInit} from '@angular/core';

@Injectable()
export abstract class HDirective {
    constructor(protected elementRef: ElementRef) {}
}

@Directive({selector: 'h1'})
export class H1Directive extends HDirective implements AfterContentInit {

    public title: string;

    ngAfterContentInit() {
        this.title = this.elementRef.nativeElement.textContent;
    }

}

@Directive({selector: 'h2'})
export class H2Directive extends HDirective {
}

@Directive({selector: 'h3'})
export class H3Directive extends HDirective {
}

@Directive({selector: 'h4'})
export class H4Directive extends HDirective {
}

@Directive({selector: 'h5'})
export class H5Directive extends HDirective {
}

@Directive({selector: 'h6'})
export class H6Directive extends HDirective {
}
