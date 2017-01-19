import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {MarkdownParserService} from './markdown/markdown-parser.service';
import {RouterModule} from '@angular/router';
import {ObjectEditorModule} from './object-editor/object-editor.module';
import {UiModule} from './ui/ui.module';
import {PlanimetricsModule} from './planimetrics/planimetrics.module';
import {StereometricsModule} from './stereometrics/stereometrics.module';
import {NotebookModule} from './notebook/notebook.module';
import {KatexModule} from './katex/katex.module';
import { QuizComponent } from './quiz/quiz.component';
import {QuizModule} from './quiz/quiz.module';
import {UniqueIdService} from './unique-id.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ObjectEditorModule,
        UiModule,
        PlanimetricsModule,
        StereometricsModule,
        NotebookModule,
        KatexModule,
        QuizModule,
        RouterModule.forRoot([
            {
                path: 'courses',
                children: [
                    {
                        path: 'lernejaro',
                        loadChildren: './course-lernejaro/course-lernejaro.module#CourseLernejaroModule',
                    }
                ]
            }
        ])
    ],
    providers: [
        MarkdownParserService,
        UniqueIdService,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
