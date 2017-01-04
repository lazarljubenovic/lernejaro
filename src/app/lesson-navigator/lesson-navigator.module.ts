import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LessonNavigatorComponent} from "./lesson-navigator.component";
import {LessonColorMappingService} from "./lesson-color-mapping.service";
import {LessonIconMappingService} from "./lesson-icon-mapping.service";
import {IconPipe} from './icon.pipe';
import {ColorPipe} from './color.pipe';
import {LessonCardComponent} from './lesson-card/lesson-card.component';
import {LessonNavigatorService} from './lesson-navigator.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LessonNavigatorComponent,
        IconPipe,
        ColorPipe,
        LessonCardComponent,
    ],
    exports: [
        LessonNavigatorComponent,
    ],
    providers: [
        LessonColorMappingService,
        LessonIconMappingService,
        LessonNavigatorService,
    ],
})
export class LessonNavigatorModule {
}
