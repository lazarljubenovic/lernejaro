import {Component, OnInit, Input, ContentChild} from '@angular/core';
import {CardHeaderComponent} from './card-header/card-header.component';

@Component({
    selector: 'lrn-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() public padding: number = 0;

    @Input() public header: string = null;

    @ContentChild(CardHeaderComponent) public cardHeader: CardHeaderComponent;

    constructor() {
    }

    ngOnInit() {
    }

}
