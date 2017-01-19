import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultipleChoiceComponent} from './multiple-choice/multiple-choice.component';
import {UiModule} from '../ui/ui.module';
import {ChoiceComponent} from './multiple-choice/choice/choice.component';
import {QuestionComponent} from './question/question.component';
import { CorrectDirective } from './multiple-choice/choice/correct.directive';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
    ],
    declarations: [
        MultipleChoiceComponent,
        ChoiceComponent,
        QuestionComponent,
        CorrectDirective,
    ],
    exports: [
        MultipleChoiceComponent,
        ChoiceComponent,
        QuestionComponent,
        CorrectDirective,
    ],
})
export class QuizModule {
}
