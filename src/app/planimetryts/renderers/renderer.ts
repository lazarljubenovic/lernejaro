import {GeometryObject} from '../geometry-objects/geometry-object';
import {Point} from '../geometry-objects/point';
import {Line} from '../geometry-objects/line';
import {Segment} from '../geometry-objects/segment';
import {Circle} from '../geometry-objects/circle';
import {Polygon} from '../geometry-objects/polygon';

export abstract class Renderer {

    protected abstract renderPoint(point: Point);

    protected abstract renderLine(line: Line);

    protected abstract renderSegment(segment: Segment);

    protected abstract renderCircle(circle: Circle);

    protected abstract renderPolygon(polygon: Polygon);

    protected beforeObjectsRender(objects: GeometryObject[]) {
        // Do nothing
    }

    protected afterObjectsRender(objects: GeometryObject[]) {
        // Do nothing
    }

    protected beforeEachObjectRender(object: GeometryObject) {
        // Do nothing
    }

    protected afterEachObjectRender(object: GeometryObject) {
        // Do nothing
    }

    public render(objects: GeometryObject[]) {
        this.beforeObjectsRender(objects);
        objects.forEach(object => {
            this.beforeEachObjectRender(object);
            switch (object.kind) {
                case 'point':
                    this.renderPoint(<Point>object);
                    break;
                case 'line':
                    this.renderLine(<Line>object);
                    break;
                case 'segment':
                    this.renderSegment(<Segment>object);
                    break;
                case 'circle':
                    this.renderCircle(<Circle>object);
                    break;
                case 'polygon':
                    this.renderPolygon(<Polygon>object);
                    break;
            }
            this.afterEachObjectRender(object);
        });
        this.afterObjectsRender(objects);
    }

}
