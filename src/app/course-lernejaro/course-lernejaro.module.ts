import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LessonNavigatorModule} from '../lesson-navigator/lesson-navigator.module';
import {IntroductionComponent} from './introduction/introduction.component';
import {CourseLernejaroComponent} from './course-lernejaro.component';
import {RouterModule} from '@angular/router';
import {MarkdownModule} from '../markdown/markdown.module';
import {PresentationModule} from '../presentation/presentation.module';

@NgModule({
    imports: [
        CommonModule,
        LessonNavigatorModule,
        MarkdownModule,
        PresentationModule,
        RouterModule.forChild([
            {
                path: '',
                component: CourseLernejaroComponent,
            },
            {
                path: '1-Introduction',
                component: IntroductionComponent,
            }
        ]),
    ],
    declarations: [
        CourseLernejaroComponent,
        IntroductionComponent,
    ]
})
export class CourseLernejaroModule {
}
