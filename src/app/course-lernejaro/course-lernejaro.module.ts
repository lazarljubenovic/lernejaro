import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LessonNavigatorModule} from '../lesson-navigator/lesson-navigator.module';
import {IntroductionComponent} from './introduction/introduction.component';
import {CourseLernejaroComponent} from './course-lernejaro.component';
import {RouterModule} from '@angular/router';
import {MarkdownModule} from '../markdown/markdown.module';
import {PresentationModule} from '../presentation/presentation.module';
import { MarkdownMarkupComponent } from './markdown-markup/markdown-markup.component';
import { IntroducingFlowchartsComponent } from './introducing-flowcharts/introducing-flowcharts.component';
import {FlowchartModule} from '../flowchart/flowchart.module';
import { IntroducingTablesComponent } from './introducing-tables/introducing-tables.component';
import {TableModule} from '../table/table.module';

@NgModule({
    imports: [
        CommonModule,
        LessonNavigatorModule,
        MarkdownModule,
        PresentationModule,
        FlowchartModule,
        TableModule,
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
            }
        ]),
    ],
    declarations: [
        CourseLernejaroComponent,
        IntroductionComponent,
        MarkdownMarkupComponent,
        IntroducingFlowchartsComponent,
        IntroducingTablesComponent,
    ]
})
export class CourseLernejaroModule {
}
