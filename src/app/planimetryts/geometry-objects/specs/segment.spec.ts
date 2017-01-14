import {Point} from '../point';
import {Line} from '../line';
import {MaterialColor} from '../material-colors';
import {Segment} from '../segment';

const customEqualities = function (first: any, second: any) {
    if (first.kind == 'line' && second.kind == 'line') {
        return Line.AreEqual(first, second);
    }
    if (first.kind == 'point' && second.kind == 'point') {
        return Point.AreEqual(first, second);
    }
    if (first.kind == 'segment' && second.kind == 'segment') {
        return Segment.AreEqual(first, second);
    }
};

describe(`Segment`, () => {

    beforeEach(() => jasmine.addCustomEqualityTester(customEqualities));

    describe(`Segment.AreEqual`, () => {
        const point11 = Point.FromCartesianCoordinates(1, 2);
        const point12 = Point.FromCartesianCoordinates(3, 4);
        const point21 = point11.clone();
        const point22 = point12.clone();

        it(`should determine that segments are equal with equivalent points`, () => {
            const segment1 = Segment.FromTwoPoints(point11, point12);
            const segment2 = Segment.FromTwoPoints(point21, point22);
            expect(Segment.AreEqual(segment1, segment2)).toBe(true);
            expect(Segment.AreEqual(segment2, segment1)).toBe(true);
            expect(segment1).toEqual(segment2);
        });

        it(`should determine that segments are equal with swapped points`, () => {
            const segment1 = Segment.FromTwoPoints(point11, point12);
            const segment2 = Segment.FromTwoPoints(point22, point21);
            expect(Segment.AreEqual(segment1, segment2)).toBe(true);
            expect(Segment.AreEqual(segment2, segment1)).toBe(true);
            expect(segment1).toEqual(segment2);
        });

    });

    it(`should get bisector of a segment`, () => {
        const point1 = Point.FromCartesianCoordinates(2, 1.5);
        const point2 = Point.FromCartesianCoordinates(4, 2.5);
        const segment = Segment.FromTwoPoints(point1, point2);
        const actual = segment.getBisector();
        const expected = Line.FromExplicitForm(-2, 8);
        expect(actual).toEqual(expected);
    });

    describe(`Segment#copyValuesFrom`, () => {

        it(`should copy by value to an object`, () => {
            const segmentSrc = Segment.FromGeneralForm(1, 2, 3, 4);
            const segmentDst = Segment.FromGeneralForm(2, 3, 4, 5);
            segmentDst.copyValuesFrom(segmentSrc);
            expect(segmentDst).toEqual(segmentSrc);
            expect(segmentDst).not.toBe(segmentSrc);
        });

        it(`should not copy view data`, () => {
            const segmentSrc = Segment.FromGeneralForm(1, 2, 3, 4)
                .label('a')
                .fillColor(MaterialColor.BLUE)
                .strokeColor(MaterialColor.LIGHT_BLUE);
            const segmentDst = Segment.FromGeneralForm(5, 6, 7, 8)
                .label('b')
                .fillColor(MaterialColor.BROWN)
                .strokeColor(MaterialColor.CYAN);
            segmentDst.copyValuesFrom(segmentSrc);
            expect(segmentDst).toEqual(segmentSrc);
            expect(segmentDst).not.toBe(segmentSrc);
            expect(segmentDst.label()).toEqual('b');
            expect(segmentDst.fillColor()).toEqual(MaterialColor.BROWN);
            expect(segmentDst.strokeColor()).toEqual(MaterialColor.CYAN);
        });

    });

    describe(`Segment#copyViewDataFrom`, () => {

        it(`should copy only label, stroke color and fill color`, () => {
            const segmentSrc = Segment.FromGeneralForm(1, 2, 3, 4)
                .label('a')
                .fillColor(MaterialColor.BLUE)
                .strokeColor(MaterialColor.LIGHT_BLUE);
            const segmentDst = Segment.FromGeneralForm(5, 6, 7, 8)
                .label('b')
                .fillColor(MaterialColor.BROWN)
                .strokeColor(MaterialColor.CYAN);
            segmentDst.copyViewDataFrom(segmentSrc);
            expect(segmentDst).not.toEqual(segmentSrc);
            expect(segmentDst).not.toBe(segmentSrc);
            expect(segmentDst.label()).toEqual('a');
            expect(segmentDst.fillColor()).toEqual(MaterialColor.BLUE);
            expect(segmentDst.strokeColor()).toEqual(MaterialColor.LIGHT_BLUE);
        });

    });

    describe(`Segment#copyFrom`, () => {

        it(`should copy everything`, () => {
            const segmentSrc = Segment.FromGeneralForm(1, 2, 3, 4)
                .label('a')
                .fillColor(MaterialColor.BLUE)
                .strokeColor(MaterialColor.LIGHT_BLUE);
            const segmentDst = Segment.FromGeneralForm(5, 6, 7, 8)
                .label('b')
                .fillColor(MaterialColor.BROWN)
                .strokeColor(MaterialColor.CYAN);
            segmentDst.copyFrom(segmentSrc);
            expect(segmentDst).toEqual(segmentSrc);
            expect(segmentDst).not.toBe(segmentSrc);
            expect(segmentDst.label()).toEqual('a');
            expect(segmentDst.fillColor()).toEqual(MaterialColor.BLUE);
            expect(segmentDst.strokeColor()).toEqual(MaterialColor.LIGHT_BLUE);
        });

    });

    it(`should get middle`, () => {
        const segment = Segment.FromGeneralForm(1, 2, 3, 4);
        const expected = Point.FromCartesianCoordinates(2, 3);
        const actual = segment.getMiddle();
        expect(actual).toEqual(expected);
    });

    it(`should get line`, () => {
        const point1 = Point.FromCartesianCoordinates(1, 2);
        const point2 = Point.FromCartesianCoordinates(5, 1);
        const segment = Segment.FromTwoPoints(point1, point2);
        const expected = Line.FromTwoPoints(point1, point2);
        const actual = segment.getLine();
        expect(actual).toEqual(expected);
    });

});
