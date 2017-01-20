import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultipleChoiceComponent} from './multiple-choice/multiple-choice.component';
import {UiModule} from '../ui/ui.module';
import {ChoiceComponent} from './multiple-choice/choice/choice.component';
import {QuestionComponent} from './question/question.component';
import { CorrectDirective } from './multiple-choice/choice/correct.directive';
import { FillInTheBlankComponent } from './fill-in-the-blank/fill-in-the-blank.component';
import { BlankComponent } from './fill-in-the-blank/blank/blank.component';

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
        FillInTheBlankComponent,
        BlankComponent,
    ],
    exports: [
        MultipleChoiceComponent,
        ChoiceComponent,
        QuestionComponent,
        CorrectDirective,
        FillInTheBlankComponent,
        BlankComponent,
    ],
})
export class QuizModule {
}
