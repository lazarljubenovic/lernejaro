import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CodeComponent} from './code.component'
import {LoggerModule} from '../logger/logger.module'
import {NoLanguageSpecifiedErrorComponent} from './errors'

@NgModule({
  imports: [
    CommonModule,
    LoggerModule,
  ],
  declarations: [
    CodeComponent,
    NoLanguageSpecifiedErrorComponent,
  ],
  exports: [
    CodeComponent,
  ],
  entryComponents: [
    NoLanguageSpecifiedErrorComponent,
  ],
})
export class CodeModule {
}
