import {Component} from '@angular/core'
import {Point} from '../../planimetryts/geometry-objects/point'
import {MaterialColor} from '../../planimetryts/geometry-objects/material-colors'
import {EvaluateFunction} from '../../planimetrics/planimetrics.component'
import {AxisConfiguration} from '../../planimetryts/geometry-objects/macros/axis.interface'
import {format} from '../../code/code'
import {Segment} from '../../planimetryts/geometry-objects/segment'
import {Line} from '../../planimetryts/geometry-objects/line'
import {Triangle} from '../../planimetryts/geometry-objects/triangle'
import {Ellipse} from '../../planimetryts/geometry-objects/ellipse'

interface Example {
  interactivePoints?: Point[]
  evaluate?: EvaluateFunction
  code?: string
}

@Component({
  selector: 'lrn-introducing-geometry',
  templateUrl: './introducing-geometry.component.html',
  styleUrls: ['./introducing-geometry.component.scss'],
})
export class IntroducingGeometryComponent {

  public examples: { [name: string]: Example } = {
    'simplest': {
      evaluate: () => [
        Point.FromCartesianCoordinates(-100, 0),
        Point.FromCartesianCoordinates(100, 0),
      ],
      code: format`
      // component (.ts)
      @Component({ /* ... */ })
      export class DemoComponent {
        evaluateFn = () => [
          Point.FromCartesianCoordinates(-100, 0),
          Point.FromCartesianCoordinates(100, 0),
        ],
      }
      
      // template (.html)
      <lrn-planimetrics [evaluate]="evaluateFn">
      </lrn-planimetrics>
      `,
    },
    'colored': {
      evaluate: () => [
        Point.FromCartesianCoordinates(-100, 0).strokeColor(MaterialColor.RED).label('A'),
        Point.FromCartesianCoordinates(100, 0).strokeColor(MaterialColor.BLUE).label('B'),
      ],
      code: format`
      // component (.ts)
      @Component({ /* ... */ })
      export class DemoComponent {
        evaluateFn = () => [
        
          Point.FromCartesianCoordinates(-100, 0)
            .strokeColor(MaterialColor.RED)
            .label('A'),
            
          Point.FromCartesianCoordinates(100, 0)
            .strokeColor(MaterialColor.BLUE)
            .label('B'),
            
        ],
      }`,
    },
    'interactive': {
      interactivePoints: [
        Point.FromCartesianCoordinates(-100, 0).strokeColor(MaterialColor.RED).label('A'),
        Point.FromCartesianCoordinates(100, 0).strokeColor(MaterialColor.BLUE).label('B'),
      ],
      code: format`
      // component (.ts)
      @Component({ /* ... */ })
      export class DemoComponent {
        points = [
          Point.FromCartesianCoordinates(-100, 0)
            .strokeColor(MaterialColor.RED)
            .label('A'),
          Point.FromCartesianCoordinates(100, 0)
            .strokeColor(MaterialColor.BLUE)
            .label('B'),
        ],
      }
    
      // template (.html)
      <lrn-planimetrics [interactivePoints]="points">
      </lrn-planimetrics>
      `,
    },
    'eval': {
      interactivePoints: [
        Point.FromCartesianCoordinates(-100, 0).strokeColor(MaterialColor.RED).label('A'),
        Point.FromCartesianCoordinates(100, 0).strokeColor(MaterialColor.BLUE).label('B'),
      ],
      evaluate: ({interactivePoints: [A, B]}) => [
        Segment.FromTwoPoints(A, B),
        A, B,
      ],
      code: format`
      // component (.ts)
      @Component({ /* ... */ })
      export class DemoComponent {
        points = [ /* ... */ ], // Two points, A and B
        evaluate = ({interactivePoints: [A, B]}) => [
          Segment.FromTwoPoints(A, B),
          A, B,
        ]
      }
    
      // template (.html)
      <lrn-planimetrics [interactivePoints]="points"
                        [evaluate]="evaluate"
      ></lrn-planimetrics>
      `,
    },
    'normal': {
      interactivePoints: [
        Point.FromCartesianCoordinates(-100, 0).strokeColor(MaterialColor.RED).label('A'),
        Point.FromCartesianCoordinates(100, 0).strokeColor(MaterialColor.BLUE).label('B'),
      ],
      evaluate: ({interactivePoints: [A, B]}) => {
        const midpoint = Point.GetPointBetween(A, B)
        const lineThough = Line.FromTwoPoints(A, B).strokeColor(MaterialColor.AMBER)
        const normal = Line.OrthogonalThroughPoint(lineThough, midpoint)
        return [lineThough, normal, midpoint, A, B]
      },
      code: format`
      evaluate = ({interactivePoints: [A, B]}) => {
        const midpoint = Point.GetPointBetween(A, B)
        const lineThough = Line.FromTwoPoints(A, B).strokeColor(MaterialColor.AMBER)
        const normal = Line.OrthogonalThroughPoint(lineThough, midpoint)
        return [lineThough, normal, midpoint, A, B]
      }
      `,
    },
    'circum': {
      interactivePoints: [
        Point.FromCartesianCoordinates(-200, -200)
          .label('A').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(200, -200)
          .label('B').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(0, 250)
          .label('C').strokeColor(MaterialColor.AMBER),
      ],
      evaluate: ({interactivePoints: [A, B, C]}) => {
        const triangle = Triangle.FromVertices(A, B, C)
          .strokeColor(MaterialColor.YELLOW)
          .fillColor(MaterialColor.YELLOW) as Triangle

        const midA = Point.GetPointBetween(B, C)
        const midB = Point.GetPointBetween(A, C)
        const midC = Point.GetPointBetween(A, B)

        const a = Line.OrthogonalThroughPoint(Line.FromTwoPoints(B, C), midA)
        const b = Line.OrthogonalThroughPoint(Line.FromTwoPoints(A, C), midB)
        const c = Line.OrthogonalThroughPoint(Line.FromTwoPoints(A, B), midC)

        const center = Line.GetIntersection(a, b)
        const circumcircle = Ellipse.Circle
          .FromCenterAndPoint(center, A)
          .strokeColor(MaterialColor.PINK)

        return [triangle, a, b, c, circumcircle, A, B, C]
      },
      code: format`
      evaluate: ({interactivePoints: [A, B, C]}) => {
        const triangle = Triangle.FromVertices(A, B, C)

        const midA = Point.GetPointBetween(B, C)
        const midB = Point.GetPointBetween(A, C)
        const midC = Point.GetPointBetween(A, B)

        const a = Line.OrthogonalThroughPoint(Line.FromTwoPoints(B, C), midA)
        const b = Line.OrthogonalThroughPoint(Line.FromTwoPoints(A, C), midB)
        const c = Line.OrthogonalThroughPoint(Line.FromTwoPoints(A, B), midC)

        const center = Line.GetIntersection(a, b)
        const circumcircle = Ellipse.Circle.FromCenterAndPoint(center, A)

        return [triangle, a, b, c, circumcircle, A, B, C]
      }
      `,
    },
    'axis': {
      interactivePoints: [
        Point.FromCartesianCoordinates(-200, -200)
          .label('A').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(200, -200)
          .label('B').strokeColor(MaterialColor.AMBER),
        Point.FromCartesianCoordinates(0, 250)
          .label('C').strokeColor(MaterialColor.AMBER),
      ],
      code: format`
      <lrn-planimetrics [interactivePoints]="points"
                        [evaluate]="evaluate"
                        [axis]="true">
      </lrn-planimetrics>
      `
    },
  }

  public axis: AxisConfiguration = {}

}
