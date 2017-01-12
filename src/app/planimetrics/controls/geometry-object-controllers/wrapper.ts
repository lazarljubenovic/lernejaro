import {Line} from '../../../planimetryts/geometry-objects/line';
import {LineController} from './concrete-controllers/line-controller';
import {Point} from '../../../planimetryts/geometry-objects/point';
import {PointController} from './concrete-controllers/point-controller';
import {GeometryObjectController} from './geometry-object-controller';
import {GeometryObject} from '../../../planimetryts/geometry-objects/geometry-object';
import {SegmentController} from './concrete-controllers/segment-controller';
import {CircleController} from './concrete-controllers/circle-controller';
import {Circle} from '../../../planimetryts/geometry-objects/circle';
import {Segment} from '../../../planimetryts/geometry-objects/segment';

export function WrapGeometryObjectIntoController(obj: GeometryObject): GeometryObjectController {
    switch (obj.kind) {
        case 'point':
            return new PointController(<Point>obj);
        case 'line':
            return new LineController(<Line>obj);
        case 'segment':
            return new SegmentController(<Segment>obj);
        case 'circle':
            return new CircleController(<Circle>obj);
        default:
            debugger;
    }
}
