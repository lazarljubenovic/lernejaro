import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StereometricsComponent} from './stereometrics.component'
import {RendererService} from './renderer.service'

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        StereometricsComponent,
    ],
    exports: [
        StereometricsComponent,
    ],
    providers: [
        RendererService,
    ],
})
export class StereometricsModule {
}
