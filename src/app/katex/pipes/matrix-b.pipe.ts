import {Pipe, PipeTransform} from '@angular/core'
import {KatexService} from '../katex.service'

@Pipe({name: 'bMatrix'})
export class BMatrixPipe implements PipeTransform {

  constructor(private service: KatexService) {
  }

  transform(matrix: string[][]): string {
    return this.service.bMatrix(matrix)
  }

}
