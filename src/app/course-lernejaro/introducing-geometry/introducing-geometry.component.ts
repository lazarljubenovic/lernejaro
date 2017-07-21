import {Component} from '@angular/core'
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object'
import {Point} from '../../planimetryts/geometry-objects/point'
import {MaterialColor} from '../../planimetryts/geometry-objects/material-colors'
import {Segment} from '../../planimetryts/geometry-objects/segment'

@Component({
  selector: 'lrn-introducing-geometry',
  templateUrl: './introducing-geometry.component.html',
  styleUrls: ['./introducing-geometry.component.scss'],
})
export class IntroducingGeometryComponent {

  public interactivePoints: Point[] = [
    Point.FromCartesianCoordinates(-200, -200)
      .label('A').strokeColor(MaterialColor.AMBER),
    Point.FromCartesianCoordinates(200, -200)
      .label('B').strokeColor(MaterialColor.AMBER),
  ]

  public evaluate(points: Point[]): GeometryObject[] {
    const [A, B] = points
    const segment = Segment.FromTwoPoints(A, B)
    return [segment, A, B]
  }

}
