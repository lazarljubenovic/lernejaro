import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartDataDirective} from './chart-data.directive';
import {VerticalBarsDirective} from './vertical-bars.directive';
import { ChartDirective } from './chart.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ChartDirective,
        ChartDataDirective,
        VerticalBarsDirective,
        ChartDirective,
    ],
    exports: [
        ChartDirective,
        ChartDataDirective,
        VerticalBarsDirective,
    ],
})
export class ChartModule {
}
