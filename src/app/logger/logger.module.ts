import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ErrorComponent} from './error/error.component'
import { WarningComponent } from './warning/warning.component'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ErrorComponent,
    WarningComponent,
  ],
  exports: [
    ErrorComponent,
  ],
})
export class LoggerModule {
}
