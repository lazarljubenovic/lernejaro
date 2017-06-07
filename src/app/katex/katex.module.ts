import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {KatexComponent} from './katex.component'

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        KatexComponent,
    ],
    exports: [
        KatexComponent,
    ],
})
export class KatexModule {
}
