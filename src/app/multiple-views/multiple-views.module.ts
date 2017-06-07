import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MultipleViewsComponent} from './multiple-views/multiple-views.component'
import {ViewComponent} from './view/view.component'
import {ViewInputComponent} from './view-input/view-input.component'
import {UiModule} from '../ui/ui.module'

@NgModule({
    imports: [
        CommonModule,
        UiModule,
    ],
    declarations: [
        MultipleViewsComponent,
        ViewComponent,
        ViewInputComponent,
    ],
    exports: [
        MultipleViewsComponent,
        ViewComponent,
        ViewInputComponent,
    ],
})
export class MultipleViewsModule {
}
