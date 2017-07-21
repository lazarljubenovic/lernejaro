import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HorizontalDirective} from './horizontal.directive'
import {BoxDirective} from './box.directive'
import {VerticalDirective} from './vertical.directive'
import {FullScreenDirective} from './full-screen.directive'
import {CenterDirective} from './center.directive'

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
  ],
  exports: [
    BoxDirective,
    HorizontalDirective,
    VerticalDirective,
    FullScreenDirective,
    CenterDirective,
  ],
})
export class LayoutModule {
}
