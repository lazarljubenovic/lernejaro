import {Component} from '@angular/core'
import {Point} from '../../planimetryts/geometry-objects/point'
import {MaterialColor} from '../../planimetryts/geometry-objects/material-colors'
import {Segment} from '../../planimetryts/geometry-objects/segment'
import {Triangle} from 'app/planimetryts/geometry-objects/triangle'
import {Line} from 'app/planimetryts/geometry-objects/line'
import {Circle} from '../../planimetryts/geometry-objects/circle'
import {EvaluateFunction} from '../../planimetrics/planimetrics.component'
import {Axis} from '../../planimetryts/geometry-objects/macros/axis'

interface Example {
  interactivePoints: Point[]
  evaluate: EvaluateFunction
}

@Component({
  selector: 'lrn-introducing-geometry',
  templateUrl: './introducing-geometry.component.html',
  styleUrls: ['./introducing-geometry.component.scss'],
})
export class IntroducingGeometryComponent {

  public examples: Example[] = [
    {
      interactivePoints: [
        Point.FromCartesianCoordinates(-200, -200)
          .label('A').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(200, -200)
          .label('B').strokeColor(MaterialColor.AMBER),
      ],
      evaluate: ({interactivePoints}) => {
        const [A, B] = interactivePoints
        const segment = Segment.FromTwoPoints(A, B)
        const midpoint = Point.GetPointBetween(A, B).label('M').strokeColor(MaterialColor.BLUE)
        return [segment, midpoint, A]
      },
    },
    {
      interactivePoints: [
        Point.FromCartesianCoordinates(-200, -200)
          .label('A').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(200, -200)
          .label('B').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(0, 250)
          .label('C').strokeColor(MaterialColor.AMBER),
      ],
      evaluate: ({interactivePoints}) => {
        const [A, B, C] = interactivePoints
        const triangle = Triangle.FromVertices(A, B, C)
          .strokeColor(MaterialColor.YELLOW).fillColor(MaterialColor.YELLOW)

        const midA = Point.GetPointBetween(B, C)
        const midB = Point.GetPointBetween(A, C)
        const midC = Point.GetPointBetween(A, B)

        const a = Line.OrthogonalThroughPoint(Line.FromTwoPoints(B, C), midA)
        const b = Line.OrthogonalThroughPoint(Line.FromTwoPoints(A, C), midB)
        const c = Line.OrthogonalThroughPoint(Line.FromTwoPoints(A, B), midC)

        const center = Line.GetIntersection(a, b)
        const circumcircle = Circle.FromCenterAndPoint(center, A).strokeColor(MaterialColor.PINK)

        return [triangle, a, b, c, circumcircle, A, B, C]
      },
    },
    {
      interactivePoints: [
        Point.CENTER.label(`A`).strokeColor(MaterialColor.DEEP_PURPLE),
      ],
      evaluate: ({interactivePoints, transformationMatrix}) => {
        const [center] = interactivePoints
        const axis = Axis()({interactivePoints, transformationMatrix})
        const circle = Circle.FromCenterAndRadius(center, 100)
        return [...axis, center, circle]
      },
    },
  ]

}
