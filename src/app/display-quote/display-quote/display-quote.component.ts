import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'lrn-display-quote',
    templateUrl: './display-quote.component.html',
    styleUrls: ['./display-quote.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DisplayQuoteComponent implements OnInit {

    @Input() public imageUrl: string;

    constructor() {
    }

    ngOnInit() {
    }

}
