import {Directive, Input} from '@angular/core';
import {ChartService} from './chart.service';

@Directive({
    selector: 'lrn-chart',
    providers: [
        ChartService,
    ],
})
export class ChartDirective {

    @Input() public displayLegend: boolean = false;
    @Input() public titlePosition: 'above' | 'below' = 'above';
    @Input() public legendPosition: 'left' | 'right' = 'right';

    constructor(private chartService: ChartService) {
    }

}
