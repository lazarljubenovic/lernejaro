import {Point} from '../point';
import {Segment} from '../segment';
import {Line} from '../line';

describe(`Segment`, () => {

    it(`should get bisector of a segment`, () => {
        const point1 = Point.FromCartesianCoordinates(2, 1.5);
        const point2 = Point.FromCartesianCoordinates(4, 2.5);
        const segment = Segment.FromTwoPoints(point1, point2);
        const actual = segment.getBisector();
        const expected = Line.FromExplicitForm(-2, 8);
        expect(actual).toEqual(expected);
    });

});
