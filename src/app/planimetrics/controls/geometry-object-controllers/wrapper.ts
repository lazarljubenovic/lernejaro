import {LineController} from './concrete-controllers/line-controller'
import {PointController} from './concrete-controllers/point-controller'
import {GeometryObjectController} from './geometry-object-controller'
import {SegmentController} from './concrete-controllers/segment-controller'
import {CircleController} from './concrete-controllers/circle-controller'
import {
  Circle,
  GeometryObject,
  Line,
  Point,
  Segment,
} from '../../../planimetryts/geometry-objects/everything'

export function WrapGeometryObjectIntoController(obj: GeometryObject): GeometryObjectController {
  switch (obj.kind) {
    case 'point':
      return new PointController(<Point>obj)
    case 'line':
      return new LineController(<Line>obj)
    case 'segment':
      return new SegmentController(<Segment>obj)
    case 'circle':
      return new CircleController(<Circle>obj)
    default:
      throw new Error(`Unknown kind ${obj.kind}`)
  }
}
