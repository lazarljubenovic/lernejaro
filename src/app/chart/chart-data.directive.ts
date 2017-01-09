import {Directive, Input} from '@angular/core';
import {ChartService} from './chart.service';

@Directive({
    selector: 'lrn-chart-data',
})
export class ChartDataDirective {

    @Input() public color: string;
    @Input() public value: number;
    @Input() public label: string;

    private done: boolean = false;

    constructor(private chartService: ChartService) {
    }

    ngOnChanges() {
        if (this.done) {
            this.chartService.reRender();
        }
    }

    ngOnInit() {
        this.done = true;
    }

}
