// tslint:disable-next-line
import {Component, ContentChild, ContentChildren, Input, OnInit, QueryList, ViewEncapsulation} from '@angular/core'
import {CardHeaderComponent} from './card-header/card-header.component'
import {CardFooterComponent} from './card-footer/card-footer.component'
import {CardContentComponent} from './card-content/card-content.component'

@Component({
    selector: 'lrn-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {

    @Input() public header: string = null
    @ContentChild(CardHeaderComponent) public cardHeader: CardHeaderComponent

    @ContentChild(CardFooterComponent) public cardFooter: CardFooterComponent

    @ContentChildren(CardContentComponent) public cardContents: QueryList<CardContentComponent>

    constructor() {
    }

    ngOnInit() {
    }

}
