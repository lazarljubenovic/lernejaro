import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaxonomyComponent} from './taxonomy/taxonomy.component';
import { TaxonomyItemComponent } from './taxonomy-item/taxonomy-item.component';
// tslint:disable-next-line
import { TaxonomyItemDescriptionComponent } from './taxonomy-item-description/taxonomy-item-description.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TaxonomyComponent,
        TaxonomyItemComponent,
        TaxonomyItemDescriptionComponent,
    ],
    exports: [
        TaxonomyComponent,
        TaxonomyItemComponent,
        TaxonomyItemDescriptionComponent,
    ],
})
export class TaxonomyModule {
}
