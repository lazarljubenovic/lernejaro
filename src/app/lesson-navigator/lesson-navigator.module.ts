import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LessonNavigatorComponent} from './lesson-navigator.component'
import {LessonColorMappingService} from './lesson-color-mapping.service'
import {ColorPipe} from './color.pipe'
import {LessonCardComponent} from './lesson-card/lesson-card.component'
import {CourseLernejaroLessonsService} from '../course-lernejaro/course-lernejaro-lessons.service'
import {RouterModule} from '@angular/router'
import {UiModule} from '../ui/ui.module'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule,
  ],
  declarations: [
    LessonNavigatorComponent,
    ColorPipe,
    LessonCardComponent,
  ],
  exports: [
    LessonNavigatorComponent,
  ],
  providers: [
    LessonColorMappingService,
    CourseLernejaroLessonsService,
  ],
})
export class LessonNavigatorModule {
}
