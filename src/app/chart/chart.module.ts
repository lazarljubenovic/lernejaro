import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartDataDirective} from './chart-data.directive';
import {VerticalBarsDirective} from './directives/bars/vertical/vertical-bars.directive';
import { ChartDirective } from './internal/chart/chart.directive';
import { PieDirective } from './directives/pie/pie.directive';
import { ChartComponent } from './chart/chart.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ChartDirective,
        ChartDataDirective,
        VerticalBarsDirective,
        PieDirective,
        ChartComponent,
    ],
    exports: [
        ChartDataDirective,
        VerticalBarsDirective,
        PieDirective,
        ChartComponent,
    ],
})
export class ChartModule {
}
