import {Line} from '../../../planimetryts/geometry-objects/line';
import {LineController} from './concrete-controllers/line-controller';
import {Point} from '../../../planimetryts/geometry-objects/point';
import {PointController} from './concrete-controllers/point-controller';
import {GeometryObjectController} from './geometry-object-controller';
import {GeometryObject} from '../../../planimetryts/geometry-objects/geometry-object';

export function WrapGeometryObjectIntoController(obj: GeometryObject): GeometryObjectController {
    switch (obj.kind) {
        case 'point':
            return new PointController(<Point>obj);
        case 'line':
            return new LineController(<Line>obj);
        default:
            debugger;
    }
}
