import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DisplayQuoteComponent} from './display-quote/display-quote.component';
import { QuoteTextComponent } from './quote-text/quote-text.component';
import { PersonInfoComponent } from './person-info/person-info.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DisplayQuoteComponent,
        QuoteTextComponent,
        PersonInfoComponent,
    ],
    exports: [
        DisplayQuoteComponent,
        QuoteTextComponent,
        PersonInfoComponent,
    ],
})
export class DisplayQuoteModule {
}
