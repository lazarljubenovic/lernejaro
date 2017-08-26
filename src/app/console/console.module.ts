import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ConsoleComponent} from './console/console.component'
import {LoggerModule} from '../logger/logger.module'
import {UiModule} from '../ui/ui.module'
import {
  ConsoleClashingInterpretersErrorComponent,
  ConsoleNoLanguageErrorComponent, ConsoleUnknownLanguageErrorComponent,
} from './errors'
import {MarkdownModule} from '../markdown/markdown.module'
import {CodeModule} from '../code/code.module'
import {CounterInterpreter} from './interpreters/counter'
import {LRN_CONSOLE_INTERPRETER} from './console'
import {JavaScriptInterpreter} from './interpreters/javascript'

const errors = [
  ConsoleNoLanguageErrorComponent,
  ConsoleUnknownLanguageErrorComponent,
  ConsoleClashingInterpretersErrorComponent,
]

@NgModule({
  imports: [
    CommonModule,
    LoggerModule,
    MarkdownModule,
    CodeModule,
    UiModule,
  ],
  declarations: [
    ConsoleComponent,
    ...errors,
  ],
  exports: [
    ConsoleComponent,
  ],
  providers: [
    {
      provide: LRN_CONSOLE_INTERPRETER,
      useClass: CounterInterpreter,
      multi: true,
    },
    {
      provide: LRN_CONSOLE_INTERPRETER,
      useClass: JavaScriptInterpreter,
      multi: true,
    },
  ],
  entryComponents: [
    ...errors,
  ],
})
export class ConsoleModule {
}
