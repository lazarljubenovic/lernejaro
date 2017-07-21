import {Component, OnInit} from '@angular/core'
import {GeometryObject} from '../../planimetryts/geometry-objects/geometry-object'
import {Point} from '../../planimetryts/geometry-objects/point'
import {MaterialColor} from '../../planimetryts/geometry-objects/material-colors'
import {Segment} from '../../planimetryts/geometry-objects/segment'

@Component({
  selector: 'lrn-introducing-geometry',
  templateUrl: './introducing-geometry.component.html',
  styleUrls: ['./introducing-geometry.component.scss'],
})
export class IntroducingGeometryComponent implements OnInit {

  public objects: GeometryObject[]

  public interactivePoints: Point[] = [
    Point.FromCartesianCoordinates(-200, -200)
      .label('A').strokeColor(MaterialColor.AMBER),
    Point.FromCartesianCoordinates(200, -200)
      .label('B').strokeColor(MaterialColor.AMBER),
  ]

  public evaluateObjects(...points: Point[]): void {
    const [A, B] = this.interactivePoints
    const segment = Segment.FromTwoPoints(A, B)
    this.objects = [segment]
  }

  public onInteractivePointsChange(points: Point[]): void {
    this.interactivePoints = [...points]
    this.evaluateObjects(...points)
  }

  constructor() {
    this.evaluateObjects(...this.interactivePoints)
  }

  ngOnInit() {
  }

}
