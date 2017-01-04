import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {PresentationModule} from "./presentation/presentation.module";
import {MarkdownParserService} from "./markdown/markdown-parser.service";
import {MarkdownModule} from "./markdown/markdown.module";
import {LessonNavigatorModule} from "./lesson-navigator/lesson-navigator.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        PresentationModule,
        MarkdownModule,
        LessonNavigatorModule,
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
