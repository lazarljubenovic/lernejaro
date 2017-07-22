import {Injectable} from '@angular/core'
import {GeometryObject} from '../planimetryts/geometry-objects/geometry-object'
import {CanvasRenderer} from '../planimetryts/renderers/canvas-renderer'
import {Subject} from 'rxjs'
import {EvaluateFunction} from './planimetrics.component'

@Injectable()
export class RendererService {

  // TODO Make this possible with every Renderer (missing events atm)
  private renderer: CanvasRenderer

  public mouseDown$: Subject<Coordinate>
  public mouseDrag$: Subject<{ logic: Offset, canvas: Offset }>
  public mouseUp$: Subject<Coordinate>

  public setRenderer(renderer: CanvasRenderer): void {
    this.renderer = renderer
    this.mouseDown$ = this.renderer.mouseDown$
    this.mouseDrag$ = this.renderer.mouseDrag$
    this.mouseUp$ = this.renderer.mouseUp$
  }

  public move(dx: number, dy: number): void {
    this.renderer.move(dx, dy)
  }

  public zoom(value: number): void {
    this.renderer.zoom(value)
  }

  public getTransformationMatrix(): number[][] {
    return this.renderer.appliedMatrix
  }

  public setPreRenderHook(evaluateFunctions: EvaluateFunction[]) {

  }

  constructor() {
  }

  public render(objects: GeometryObject[]): void {
    this.renderer.render(objects)
  }

}
