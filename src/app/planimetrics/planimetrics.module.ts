import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PlanimetricsComponent} from './planimetrics.component'
import {RendererService} from './renderer.service'
import {TableModule} from '../table/table.module'
import {FormsModule} from '@angular/forms'
import {UiModule} from '../ui/ui.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    TableModule,
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
