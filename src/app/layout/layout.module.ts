import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HorizontalDirective} from './horizontal.directive'
import {BoxDirective} from './box.directive'
import {VerticalDirective} from './vertical.directive'

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        BoxDirective,
        HorizontalDirective,
        VerticalDirective,
    ],
    exports: [
        BoxDirective,
        HorizontalDirective,
        VerticalDirective,
    ],
})
export class LayoutModule {
}
