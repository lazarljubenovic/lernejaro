import {ContentChildren, Directive, forwardRef, HostBinding, QueryList} from '@angular/core'
import {BoxDirective} from './box.directive'

@Directive({
    selector: '[lrnVertical]',
    providers: [{provide: BoxDirective, useExisting: forwardRef(() => VerticalDirective)}],
})
export class VerticalDirective extends BoxDirective {

    @HostBinding('style.display') public display: string = 'flex'
    @HostBinding('style.align-items') public alignItems: string = 'stretch'
    @HostBinding('style.justify-content') public justifyContent: string = 'space-between'
    @HostBinding('style.flex-direction') public flexDirection: string = 'column'

    @ContentChildren(BoxDirective, {descendants: true}) public boxes: QueryList<BoxDirective>

}
