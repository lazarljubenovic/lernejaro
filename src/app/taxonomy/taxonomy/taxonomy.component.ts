import {
    Component, OnInit, ViewChildren, AfterViewInit, OnDestroy, QueryList,
    AfterContentInit, ContentChildren, ViewEncapsulation
} from '@angular/core';
import {TaxonomyItemComponent} from '../taxonomy-item/taxonomy-item.component';
// tslint:disable-next-line

@Component({
    selector: 'lrn-taxonomy',
    templateUrl: './taxonomy.component.html',
    styleUrls: ['./taxonomy.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TaxonomyComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {

    @ContentChildren(TaxonomyItemComponent)
    public taxonomyItems: QueryList<TaxonomyItemComponent>;

    public constructor() {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
    }

    public ngAfterContentInit(): void {
        this.taxonomyItems.changes
            .startWith(this.taxonomyItems)
            .subscribe(queryList => {
                console.log(queryList);
            });
    }

    public ngOnDestroy(): void {

    }

}
