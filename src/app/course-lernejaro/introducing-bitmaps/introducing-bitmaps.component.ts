import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'lrn-introducing-bitmaps',
    templateUrl: './introducing-bitmaps.component.html',
    styleUrls: ['./introducing-bitmaps.component.scss']
})
export class IntroducingBitmapsComponent implements OnInit {

    public bitmap = [
        ['red', 'red', 'red', 'red', 'red'],
        ['green', 'green', 'blue', 'yellow', 'white'],
        ['rgba(21, 24, 46, .1)', '', '', '', ''],
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
