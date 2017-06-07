import {Pipe, PipeTransform} from '@angular/core'
// tslint:disable-next-line
import {GeometryObjectController} from '../../geometry-object-controllers/geometry-object-controller';

@Pipe({name: 'destruct'})
export class DestructPipe implements PipeTransform {

    transform(controller: GeometryObjectController,
              strategyName: string): any {
        return controller.destruct(strategyName)
    }

}
