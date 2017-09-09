import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LatexService} from './latex.service'

/**
 * A module which provides a service for rendering articles as Latex documents.
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    LatexService,
  ],
})
export class LatexModule {
}
