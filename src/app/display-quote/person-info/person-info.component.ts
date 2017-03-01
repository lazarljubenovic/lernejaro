import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'lrn-person-info',
    templateUrl: './person-info.component.html',
    styleUrls: ['./person-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PersonInfoComponent implements OnInit {

    @Input() name: string;
    @Input() lifeSpan: number[] = [];

    constructor() {
    }

    ngOnInit() {
    }

}
