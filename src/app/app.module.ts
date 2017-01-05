import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {PresentationModule} from './presentation/presentation.module';
import {MarkdownParserService} from './markdown/markdown-parser.service';
import {MarkdownModule} from './markdown/markdown.module';
import {LessonNavigatorModule} from './lesson-navigator/lesson-navigator.module';
import {IconComponent} from './icon/icon.component';
import { CourseLernejaroComponent } from './course-lernejaro/course-lernejaro.component';
import {RouterModule} from '@angular/router';
import {CourseLernejaroModule} from './course-lernejaro/course-lernejaro.module';
import { FlowchartComponent } from './flowchart/flowchart.component';
import { TableComponent } from './table/table.component';
import { BitmapComponent } from './bitmap/bitmap.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
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
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
