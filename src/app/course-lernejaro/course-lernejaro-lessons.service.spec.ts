/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseLernejaroLessonsService } from './course-lernejaro-lessons.service';

describe('CourseLernejaroLessonsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseLernejaroLessonsService]
    });
  });

  it('should ...', inject([CourseLernejaroLessonsService], (service: CourseLernejaroLessonsService) => {
    expect(service).toBeTruthy();
  }));
});
