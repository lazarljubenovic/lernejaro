import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {KatexComponent} from './katex.component'
import {KatexService} from './katex.service'
import {BMatrixPipe} from './pipes/matrix-b.pipe'
import {VMatrixPipe} from './pipes/matrix-v.pipe'

/**
 * A simple module which enables using LaTeX inside written materials.
 * Exports a single component, `KatexComponent`.
 *
 * It also exports a transformer service which has some utilities for
 * quicker writing some common LaTeX constructions. The transformers
 * also come as pipes.
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    KatexComponent,
    BMatrixPipe,
    VMatrixPipe,
  ],
  providers: [
    KatexService,
  ],
  exports: [
    KatexComponent,
    BMatrixPipe,
    VMatrixPipe,
  ],
})
export class KatexModule {
}
