import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LessonNavigatorModule} from '../lesson-navigator/lesson-navigator.module'
import {IntroductionComponent} from './introduction/introduction.component'
import {CourseLernejaroComponent} from './course-lernejaro.component'
import {RouterModule} from '@angular/router'
import {MarkdownModule} from '../markdown/markdown.module'
import {PresentationModule} from '../presentation/presentation.module'
import {MarkdownMarkupComponent} from './markdown-markup/markdown-markup.component'
// tslint:disable-next-line
import {IntroducingFlowchartsComponent} from './introducing-flowcharts/introducing-flowcharts.component';
import {FlowchartModule} from '../flowchart/flowchart.module'
import {IntroducingTablesComponent} from './introducing-tables/introducing-tables.component'
import {TableModule} from '../table/table.module'
import {IntroducingBitmapsComponent} from './introducing-bitmaps/introducing-bitmaps.component'
import {BitmapModule} from '../bitmap/bitmap.module'
import {IntroducingGeometryComponent} from './introducing-geometry/introducing-geometry.component'
import {PlanimetricsModule} from '../planimetrics/planimetrics.module'
import {ChartModule} from '../chart/chart.module'
import {IntroducingChartsComponent} from './introducing-charts/introducing-charts.component'
import {FormsModule} from '@angular/forms'
import {UiModule} from '../ui/ui.module'
import {IntroducingNotebookComponent} from './introducing-notebook/introducing-notebook.component'
import {NotebookModule} from '../notebook/notebook.module'
import {KatexModule} from '../katex/katex.module'
import {QuizModule} from '../quiz/quiz.module'
import {TaxonomyModule} from '../taxonomy/taxonomy.module'
import {DisplayQuoteModule} from '../display-quote/display-quote.module'
import {MultipleViewsModule} from '../multiple-views/multiple-views.module'
import { IntroducingKvizoComponent } from './introducing-kvizo/introducing-kvizo.component'
import {LayoutModule} from '../layout/layout.module'

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
        UiModule,
        NotebookModule,
        KatexModule,
        QuizModule,
        TaxonomyModule,
        DisplayQuoteModule,
        MultipleViewsModule,
        LayoutModule,
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
            {
                path: '11-Class',
                component: null,
            },
            {
                path: '12-Pseudocode',
                component: null,
            },
            {
                path: '13-Console',
                component: null,
            },
            {
                path: '14-Latex',
                component: null,
            },
            {
                path: '15-Notebook',
                component: IntroducingNotebookComponent,
            },
            {
                path: '16-Kvizo',
                component: IntroducingKvizoComponent,
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
        IntroducingNotebookComponent,
        IntroducingKvizoComponent,
    ]
})
export class CourseLernejaroModule {
}
