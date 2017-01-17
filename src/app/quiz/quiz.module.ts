import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultipleChoiceComponent} from './multiple-choice/multiple-choice.component';
import {UiModule} from '../ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
    ],
    declarations: [
        MultipleChoiceComponent,
    ],
    exports: [
        MultipleChoiceComponent,
    ],
})
export class QuizModule {
}
