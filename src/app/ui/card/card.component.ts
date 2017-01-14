import {Component, OnInit, Input, HostBinding} from '@angular/core';

@Component({
    selector: 'lrn-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() public padding: number = 0;

    constructor() {
    }

    ngOnInit() {
    }

}
