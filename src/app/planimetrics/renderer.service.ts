import {Injectable} from '@angular/core';
import {Renderer} from '../planimetryts/renderers/renderer';
import {GeometryObject} from '../planimetryts/geometry-objects/geometry-object';

@Injectable()
export class RendererService {

    private renderer: Renderer;

    public setRenderer(renderer: Renderer): void {
        this.renderer = renderer;
    }

    constructor() {
    }

    public render(objects: Set<GeometryObject>): void {
        this.renderer.render(objects);
    }

}
