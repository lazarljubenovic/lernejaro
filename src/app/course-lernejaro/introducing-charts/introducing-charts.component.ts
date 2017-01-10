import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'lrn-introducing-charts',
    templateUrl: './introducing-charts.component.html',
    styleUrls: ['./introducing-charts.component.scss']
})
export class IntroducingChartsComponent implements OnInit {

    public data = [
        {
            value: 10,
            label: 'a',
        }
    ];

    public addData() {
        this.data.push({
            value: Math.floor(Math.random() * 50 + 1),
            label: Math.random().toString(36).slice(2, 6),
        });
    }

    constructor() {
    }

    ngOnInit() {
    }

}
