import {Pipe, PipeTransform} from '@angular/core'
import {KatexService} from '../katex.service'

@Pipe({name: 'vMatrix'})
export class VMatrixPipe implements PipeTransform {

  constructor(private service: KatexService) {
  }

  transform(matrix: string[][]): string {
    return this.service.vMatrix(matrix)
  }

}
