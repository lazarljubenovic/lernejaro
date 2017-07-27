import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HorizontalDirective} from './horizontal.directive'
import {BoxDirective} from './box.directive'
import {VerticalDirective} from './vertical.directive'
import {FullScreenDirective} from './full-screen.directive'
import {CenterDirective} from './center.directive'
import {MaximizeDirective} from './maximize.directive'
import {SpreadDirective} from './spread.directive'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BoxDirective,
    HorizontalDirective,
    VerticalDirective,
    FullScreenDirective,
    CenterDirective,
    MaximizeDirective,
    SpreadDirective,
  ],
  exports: [
    BoxDirective,
    HorizontalDirective,
    VerticalDirective,
    FullScreenDirective,
    CenterDirective,
    MaximizeDirective,
    SpreadDirective,
  ],
})
export class LayoutModule {
}
