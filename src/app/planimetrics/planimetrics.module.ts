import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanimetricsComponent} from './planimetrics.component';
import {RendererService} from './renderer.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PlanimetricsComponent,
    ],
    exports: [
        PlanimetricsComponent,
    ],
    providers: [
        RendererService,
    ],
})
export class PlanimetricsModule {
}
