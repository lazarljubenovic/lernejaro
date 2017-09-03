import {Pipe, PipeTransform} from '@angular/core'
import {Line} from '../../../planimetryts/geometry-objects/everything'

@Pipe({name: 'line'})
export class LinePipe implements PipeTransform {

  transform(line: Line, strategy: string, get: string): any {
    if (line == null || strategy == null || get == null) {
      return null
    }

    if (strategy == 'general') {
      const l = line.getGeneralForm()
      return l[get]
    }

    if (strategy == 'explicit') {
      const l = line.getExplicitForm()
      if (l) {
        return l[get]
      } else {
        return null
      }
    }

    if (strategy == 'segment') {
      const l = line.getSegmentForm()
      if (l) {
        return l[get]
      } else {
        return null
      }
    }
  }

}
