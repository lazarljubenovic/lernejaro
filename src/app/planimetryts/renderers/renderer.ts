import {GeometryObject} from '../geometry-objects/geometry-object';
import {Point} from '../geometry-objects/point';
import {Line} from '../geometry-objects/line';
import {Segment} from '../geometry-objects/segment';
import {Circle} from '../geometry-objects/circle';

export abstract class Renderer {

    public abstract renderPoint(point: Point);

    public abstract renderLine(line: Line);

    public abstract renderSegment(segment: Segment);

    public abstract renderCircle(circle: Circle);

    public render(object: GeometryObject) {
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
        }
    }

}
