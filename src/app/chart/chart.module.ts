import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartDataDirective} from './chart-data.directive';
import {VerticalBarsDirective} from './vertical-bars.directive';
import { ChartDirective } from './chart.directive';
import { PieDirective } from './pie.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ChartDirective,
        ChartDataDirective,
        VerticalBarsDirective,
        PieDirective,
    ],
    exports: [
        ChartDirective,
        ChartDataDirective,
        VerticalBarsDirective,
        PieDirective,
    ],
})
export class ChartModule {
}
