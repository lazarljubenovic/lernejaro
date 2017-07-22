import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {CanvasRenderer} from '../planimetryts/renderers/canvas-renderer'
import {RendererService} from './renderer.service'
import {GeometryObject} from '../planimetryts/geometry-objects/geometry-object'
import {Point} from '../planimetryts/geometry-objects/point'
import {areEqualFloats} from '../planimetryts/util'

export interface EvaluateFunctionArgumentObject {
  interactivePoints: Point[]
  transformationMatrix: number[][]
}

export type EvaluateFunction = (arg: EvaluateFunctionArgumentObject) => GeometryObject[]

@Component({
  selector: 'lrn-planimetrics',
  templateUrl: './planimetrics.component.html',
  styleUrls: ['./planimetrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RendererService],
})
export class PlanimetricsComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() public interactivePoints: Point[] = []
  @Input() public evaluate: EvaluateFunction = ({interactivePoints}) => interactivePoints
  public objects: GeometryObject[] = []

  @Output() public interactivePointsChange = new EventEmitter<EvaluateFunctionArgumentObject>()

  @Input() @HostBinding('style.width.px') width: number = 600
  @Input() @HostBinding('style.height.px') height: number = 600

  @Input() withAxis: boolean = false

  // private wrapperEvaluate(interactivePoints: Point[]): GeometryObject[] {
  // }

  public getPointAt(x: number, y: number, eps: number = 6): Point {
    return (this.objects as Point[])
      .filter(object => object.kind == 'point')
      .filter((point: Point) => {
        return areEqualFloats(point.x(), x, eps)
          && areEqualFloats(point.y(), y, eps)
      })
      .slice(-1)[0]
  }

  @ViewChild('canvas') public canvasRef: ElementRef

  public context: CanvasRenderingContext2D
  public canvas: HTMLCanvasElement

  constructor(private renderer: RendererService) {
  }

  private updateObjects() {
    this.objects = this.evaluate({
      interactivePoints: this.interactivePoints,
      transformationMatrix: this.renderer.getTransformationMatrix(),
    })
  }

  private onInteractivePointsChange() {
    this.interactivePointsChange.emit(
      {
        interactivePoints: this.interactivePoints,
        transformationMatrix: this.renderer.getTransformationMatrix(),
      },
    )
  }

  private render(): void {
    const set = new Set()
    this.objects.forEach(o => set.add(o))
    this.renderer.render(Array.from(set))
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.context = this.canvas.getContext('2d')
    this.renderer.setRenderer(new CanvasRenderer(this.canvas))
    this.renderer.mouseDown$.subscribe(this.onMouseDown.bind(this))
    this.renderer.mouseDrag$.subscribe(this.onMouseDrag.bind(this))
    this.renderer.mouseUp$.subscribe(this.onMouseUp.bind(this))
    this.updateObjects()
    this.render()
  }

  public ngOnChanges(): void {
    if (this.context != null) {
      this.render()
    }
  }

  private currentPoint: Point = null

  private onMouseUp(position: Coordinate): void {
    this.currentPoint = null
  }

  private onMouseDown(position: Coordinate): void {
    const {x, y} = position
    this.currentPoint = this.getPointAt(x, y)
    // console.log('current point is', this.currentPoint)
  }

  private onMouseDrag(offset: { logic: Offset, canvas: Offset }): void {
    if (this.currentPoint != null) {
      const {dx, dy} = offset.logic
      this.currentPoint.x(x => x + dx).y(y => y + dy)
      this.onInteractivePointsChange()
      this.updateObjects()
    } else {
      const {dx, dy} = offset.canvas
      this.renderer.move(dx, dy)
    }
    this.render()
  }

}
