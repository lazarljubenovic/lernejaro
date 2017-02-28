import {
    Component,
    OnInit,
    Input,
    QueryList,
    ContentChildren,
    AfterContentInit
} from '@angular/core';
// tslint:disable-next-line
import {TaxonomyItemDescriptionComponent} from '../taxonomy-item-description/taxonomy-item-description.component';
import {Observable} from 'rxjs';

@Component({
    selector: 'lrn-taxonomy-item',
    templateUrl: './taxonomy-item.component.html',
    styleUrls: ['./taxonomy-item.component.scss'],
})
export class TaxonomyItemComponent implements OnInit, AfterContentInit {

    @ContentChildren(TaxonomyItemDescriptionComponent)
    public taxonomyItemDescriptions: QueryList<TaxonomyItemDescriptionComponent>;

    @ContentChildren(TaxonomyItemComponent)
    public taxonomyItems: QueryList<TaxonomyItemComponent>;

    @Input() public title: string;

    public hasChildren: boolean = false;
    public hasExplicitDescription: boolean = false;

    public constructor() {
    }

    public ngOnInit(): void {
        if (this.title == null) {
            console.log(`There's a taxonomy-item without a title!`);
        }
    }

    public ngAfterContentInit(): void {
        Observable.combineLatest(
            this.taxonomyItemDescriptions.changes
                .startWith(this.taxonomyItemDescriptions),
            // TODO Angular bug https://github.com/angular/angular/issues/10098
            // taxonomy items (below) selects itself
            // this will be a breaking change for this module when it's fixed
            this.taxonomyItems.changes
                .startWith(this.taxonomyItems)
                .map(items => items.toArray().slice(1)),
            (descriptions, items) => ({descriptions, items})
        )
            .subscribe(({descriptions, items}) => {
                this.hasChildren = items.length != 0;
                this.hasExplicitDescription = descriptions.length == 1;
                // TODO Errors need some kind of awesome handler
                if (descriptions.length > 1) {
                    console.warn(`You can have only one description!`);
                }
                if (this.hasChildren && !this.hasExplicitDescription) {
                    // TODO This forces consumer to have a descriptions if there are children
                    console.warn(`If taxonomy-items has subitems, ` +
                        `its description needs a proper tag. "${this.title}" has ${items.length} ` +
                        `sub-items, but ${descriptions.length} descriptions.`, items);
                }
            });
    }

}
