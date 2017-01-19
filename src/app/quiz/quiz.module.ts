import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultipleChoiceComponent} from './multiple-choice/multiple-choice.component';
import {UiModule} from '../ui/ui.module';
import { QuestionComponent } from './multiple-choice/question/question.component';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
    ],
    declarations: [
        MultipleChoiceComponent,
        QuestionComponent,
    ],
    exports: [
        MultipleChoiceComponent,
        QuestionComponent,
    ],
})
export class QuizModule {
}
