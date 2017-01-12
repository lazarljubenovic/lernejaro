import {Pipe, PipeTransform} from '@angular/core';
import {GeometryObjectController} from '../../geometry-object-controllers/geometry-object-controller';
import {MaterialColor} from '../../../../planimetryts/geometry-objects/material-colors';

@Pipe({name: 'strokeColor'})
export class StrokeColorPipe implements PipeTransform {

    transform(controller: GeometryObjectController,
              defaultColor: MaterialColor = MaterialColor.BLUE_GREY): MaterialColor {
        try {
            const strokeColor = controller.getGeometryObject().strokeColor();
            if (!strokeColor) {
                return defaultColor;
            } else {
                return strokeColor;
            }
        } catch (e) {
            return defaultColor;
        }
    }

}
