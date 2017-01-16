import {Directive, ElementRef, Injectable} from '@angular/core';

@Injectable()
export abstract class HDirective {
    constructor(private elementRef: ElementRef) {}
}

@Directive({selector: 'h1'})
export class H1Directive extends HDirective {
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
