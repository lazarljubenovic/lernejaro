import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LatexService} from './latex.service'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LatexService,
  ],
})
export class LatexModule {
}
