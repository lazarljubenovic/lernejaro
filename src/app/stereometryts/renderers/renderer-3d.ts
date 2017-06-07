import {Point3D} from '../objects/point-3d'
import {Line3D} from '../objects/line-3d'
import {Plane3D} from '../objects/plane-3d'
import {Segment3D} from '../objects/segment-3d'
import {StereometryObject} from '../stereometry-object'

export abstract class Renderer3D {

    protected abstract renderPoint3D(point: Point3D);

    protected abstract renderLine3D(line: Line3D);

    protected abstract renderPlane3D(plane: Plane3D);

    protected abstract renderSegment3D(segment: Segment3D);

    protected beforeObjectsRender(objects: StereometryObject[]) {
        // Do nothing
    }

    protected afterObjectsRender(objects: StereometryObject[]) {
        // Do nothing
    }

    protected beforeEachObjectRender(object: StereometryObject) {
        // Do nothing
    }

    protected afterEachObjectRender(object: StereometryObject) {
        // Do nothing
    }

    public render(objects: StereometryObject[]) {
        this.beforeObjectsRender(objects)
        objects.forEach(object => {
            this.beforeEachObjectRender(object)
            console.log(object)
            switch (object.kind) {
                case 'point':
                    this.renderPoint3D(<Point3D>object)
                    break
                case 'plane':
                    this.renderLine3D(<Line3D>object)
                    break
                case 'line':
                    this.renderLine3D(<Line3D>object)
                    break
                case 'segment':
                    this.renderSegment3D(<Segment3D>object)
                    break
            }
            this.afterEachObjectRender(object)
        })
        this.afterObjectsRender(objects)
    }

}
