import {Component, OnInit} from '@angular/core';

interface ComplexAlgebraic {
    realPart: number;
    imaginaryPart: number;
}

interface ComplexEuler {
    modulo: number;
    argument: number;
}

@Component({
    selector: 'lrn-introducing-notebook',
    templateUrl: './introducing-notebook.component.html',
    styleUrls: ['./introducing-notebook.component.scss']
})
export class IntroducingNotebookComponent implements OnInit {

    public complexNumber: ComplexAlgebraic = {
        realPart: 1,
        imaginaryPart: 2,
    };

    public algebraicToEuler(algebraic: ComplexAlgebraic): ComplexEuler {
        const modulo = Math.hypot(algebraic.realPart, algebraic.imaginaryPart);
        const argument = Math.atan2(algebraic.imaginaryPart, algebraic.realPart);
        return {modulo, argument};
    }

    public eulerToAlgebraic(euler: ComplexEuler): ComplexAlgebraic {
        const realPart = euler.modulo * Math.cos(euler.argument);
        const imaginaryPart = euler.modulo * Math.sin(euler.argument);
        return {realPart, imaginaryPart};
    }

    constructor() {
    }

    ngOnInit() {
    }

}
