import {Injectable} from '@angular/core'
import {CanvasRenderer3D} from '../stereometryts/renderers/canvas-renderer-3d'
import {StereometryObject} from '../stereometryts/stereometry-object'

@Injectable()
export class RendererService {

    private renderer: CanvasRenderer3D

    public setRenderer(renderer: CanvasRenderer3D): void {
        this.renderer = renderer
    }

    constructor() {
    }

    public rollX(φ: number): void {
        // TODO
    }

    public rollY(φ: number): void {
        // TODO
    }

    public rollZ(φ: number): void {
        // TODO
    }

    public move(dx: number, dy: number, dz: number): void {
        // TODO
    }

    public render(objects: StereometryObject[]): void {
        this.renderer.render(objects)
    }

}
