import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LessonNavigatorModule} from '../lesson-navigator/lesson-navigator.module';
import {IntroductionComponent} from './introduction/introduction.component';
import {CourseLernejaroComponent} from './course-lernejaro.component';
import {RouterModule} from '@angular/router';
import {MarkdownModule} from '../markdown/markdown.module';
import {PresentationModule} from '../presentation/presentation.module';
import {MarkdownMarkupComponent} from './markdown-markup/markdown-markup.component';
import {IntroducingFlowchartsComponent} from './introducing-flowcharts/introducing-flowcharts.component';
import {FlowchartModule} from '../flowchart/flowchart.module';
import {IntroducingTablesComponent} from './introducing-tables/introducing-tables.component';
import {TableModule} from '../table/table.module';
import {IntroducingBitmapsComponent} from './introducing-bitmaps/introducing-bitmaps.component';
import {BitmapModule} from '../bitmap/bitmap.module';
import {IntroducingGeometryComponent} from './introducing-geometry/introducing-geometry.component';
import {PlanimetricsModule} from '../planimetrics/planimetrics.module';
import {ChartModule} from '../chart/chart.module';
import {IntroducingChartsComponent} from './introducing-charts/introducing-charts.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LessonNavigatorModule,
        MarkdownModule,
        PresentationModule,
        FlowchartModule,
        TableModule,
        BitmapModule,
        PlanimetricsModule,
        ChartModule,
        RouterModule.forChild([
            {
                path: '',
                component: CourseLernejaroComponent,
            },
            {
                path: '1-Introduction',
                component: IntroductionComponent,
            },
            {
                path: '2-Markdown',
                component: MarkdownMarkupComponent,
            },
            {
                path: '4-Flowcharts',
                component: IntroducingFlowchartsComponent,
            },
            {
                path: '5-Tables',
                component: IntroducingTablesComponent,
            },
            {
                path: '6-Bitmaps',
                component: IntroducingBitmapsComponent,
            },
            {
                path: '9-Geometry',
                component: IntroducingGeometryComponent,
            },
            {
                path: '10-Charts',
                component: IntroducingChartsComponent,
            },
        ]),
    ],
    declarations: [
        CourseLernejaroComponent,
        IntroductionComponent,
        MarkdownMarkupComponent,
        IntroducingFlowchartsComponent,
        IntroducingTablesComponent,
        IntroducingBitmapsComponent,
        IntroducingGeometryComponent,
        IntroducingChartsComponent,
    ]
})
export class CourseLernejaroModule {
}
