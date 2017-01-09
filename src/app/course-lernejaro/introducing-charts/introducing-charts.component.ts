import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'lrn-introducing-charts',
    templateUrl: './introducing-charts.component.html',
    styleUrls: ['./introducing-charts.component.scss']
})
export class IntroducingChartsComponent implements OnInit {

    public color: string = 'red';
    public value: number = 20;
    public label: string = 'label';

    public change() {
        this.color = this.color == 'blue' ? 'red' : 'blue';
        this.value = this.value == 20 ? 10 : 20;
        this.label = this.label == 'label' ? 'title' : 'label';
    }

    constructor() {
    }

    ngOnInit() {
    }

}
