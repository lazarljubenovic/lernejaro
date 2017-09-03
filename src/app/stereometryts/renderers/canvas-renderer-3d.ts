import {Renderer3D} from './renderer-3d'
import {Point3D} from '../objects/point-3d'
import {Line3D} from '../objects/line-3d'
import {Plane3D} from '../objects/plane-3d'
import {Segment3D} from '../objects/segment-3d'

import {
  MaterialColor as MaterialColorEnum,
  Matrix,
} from '../../planimetryts/geometry-objects/everything'
import {MaterialColor} from '../../planimetryts/renderers/color'
// tslint:disable-next-line

export class CanvasRenderer3D extends Renderer3D {

  private ctx: CanvasRenderingContext2D

  // private width: number = 600;
  // private height: number = 600;

  private getColor = MaterialColor

  private projectionMatrix: number[][]
  private viewMatrix: number[][]
  private canvasMatrix: number[][]

  // private inverseProjectionMatrix: number[][];
  // private inverseViewMatrix: number[][];

  private setIdentityView() {
    this.viewMatrix = Matrix.ThreeD.Homogeneous.Identity()
  }

  private prepareProjection() {
    this.projectionMatrix = Matrix.ThreeD.Projection.Oblique.Cabinet()
  }

  private prepareCanvasMatrix() {
    this.canvasMatrix = Matrix.GetIdentity(3)
    const toCenter = Matrix.Homogeneous.Translate(300, 300)
    const zoomIn = Matrix.Homogeneous.Stretch(.8)
    this.canvasMatrix = Matrix.Multiply(toCenter, zoomIn)
  }

  private prepareContext() {
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
  }

  // TODO Unused method
  // private applyMatrix(matrix: number[][], leftMul: boolean = true): void {
  //     if (leftMul) {
  //         this.viewMatrix = Matrix.Multiply(matrix, this.viewMatrix);
  //     } else {
  //         this.viewMatrix = Matrix.Multiply(this.viewMatrix, matrix);
  //     }
  // }

  constructor(canvas: HTMLCanvasElement) {
    super()
    this.ctx = canvas.getContext('2d')
    this.prepareContext()

    this.prepareCanvasMatrix()
    this.prepareProjection()
    this.setIdentityView()

    // this.applyMatrix(Matrix.ThreeD.Homogeneous.Translate(300, 300, 0));
  }

  private getMatrix(): number[][] {
    return Matrix.Multiply(this.projectionMatrix, this.viewMatrix)
  }

  protected renderPoint3D(point: Point3D) {
    const clone = point.clone().applyMatrix(this.getMatrix())
    let m = clone.getMatrixCoordinates(true)
    m = [...m.slice(0, 2), ...m.slice(-1)]
    console.log(`canvasMatrix = ${JSON.stringify(this.canvasMatrix)}`)
    console.log(`m = ${JSON.stringify(m)}`)
    const M = Matrix.Multiply(this.canvasMatrix, m)
    console.log(`M = ${JSON.stringify(M)}`)
    const p = Point3D.FromMatrix(M)
    const {x, y} = p.getCartesianCoordinates()

    console.log(x, y)

    this.ctx.save()
    let fillColor = point.strokeColor()
    if (fillColor == null) {
      fillColor = MaterialColorEnum.BLUE_GREY // TODO should be class member
    }
    this.ctx.fillStyle = this.getColor(fillColor, 400).css()
    let strokeColor = point.strokeColor()
    if (strokeColor == null) {
      strokeColor = MaterialColorEnum.BLUE_GREY // TODO should be class member
    }
    this.ctx.strokeStyle = this.getColor(strokeColor, 800).css()
    this.ctx.beginPath()
    this.ctx.arc(x, y, 3, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.restore()
  }

  protected renderLine3D(line: Line3D) {
  }

  protected renderPlane3D(plane: Plane3D) {
  }

  protected renderSegment3D(segment: Segment3D) {
  }

}
