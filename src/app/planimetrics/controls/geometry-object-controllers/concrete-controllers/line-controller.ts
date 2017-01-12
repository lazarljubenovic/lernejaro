import {
    GeometryObjectController, Strategy,
    DestructImpossibleError
} from '../geometry-object-controller';
import {Line} from '../../../../planimetryts/geometry-objects/line';

export class LineController extends GeometryObjectController {

    private line: Line;

    private generalDestructStrategy(): {A: number, B: number, C: number} {
        return this.line.getGeneralForm();
    }

    private generalReconstructStrategy(obj: {A: number, B: number, C: number}): Line {
        const {A, B, C} = obj;
        return Line.FromGeneralForm(A, B, C);
    }

    private explicitDestructStrategy(): {k: number, n: number} {
        try {
            return this.line.getExplicitForm();
        } catch (e) {
            throw new DestructImpossibleError();
        }
    }

    private explicitReconstructStrategy(obj: {k: number, n: number}): Line {
        const {k, n} = obj;
        return Line.FromExplicitForm(k, n);
    }

    private segmentDestructStrategy(): {m: number, n: number} {
        try {
            return this.line.getSegmentForm();
        } catch (e) {
            throw new DestructImpossibleError();
        }
    }

    private segmentReconstructStrategy(obj: {m: number, n: number}): Line {
        const {n, m} = obj;
        return Line.FromSegmentForm(m, n);
    }

    private generalStrategy: Strategy = {
        destruct: this.generalDestructStrategy.bind(this),
        reconstruct: this.generalReconstructStrategy,
    };

    private explicitStrategy: Strategy = {
        destruct: this.explicitDestructStrategy.bind(this),
        reconstruct: this.explicitReconstructStrategy,
    };

    private segmentStrategy: Strategy = {
        destruct: this.segmentDestructStrategy.bind(this),
        reconstruct: this.segmentReconstructStrategy,
    };

    constructor(line: Line) {
        super();
        this.line = line.clone();
        this.strategies
            .set('general', this.generalStrategy)
            .set('explicit', this.explicitStrategy)
            .set('segment', this.segmentStrategy);
    }

    public getGeometryObject(): Line {
        return this.line;
    }

}
