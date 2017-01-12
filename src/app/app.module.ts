import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {MarkdownParserService} from './markdown/markdown-parser.service';
import {RouterModule} from '@angular/router';

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
