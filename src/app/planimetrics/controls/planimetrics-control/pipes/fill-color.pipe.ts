import {Pipe, PipeTransform} from '@angular/core';
import {GeometryObjectController} from '../../geometry-object-controllers/geometry-object-controller';
import {MaterialColor} from '../../../../planimetryts/geometry-objects/material-colors';

@Pipe({name: 'fillColor'})
export class FillColorPipe implements PipeTransform {

    transform(controller: GeometryObjectController,
              defaultColor: MaterialColor = MaterialColor.BLUE_GREY): MaterialColor {
        try {
            const fillColor = controller.getGeometryObject().fillColor();
            if (!fillColor) {
                return defaultColor;
            } else {
                return fillColor;
            }
        } catch (e) {
            return defaultColor;
        }
    }

}
