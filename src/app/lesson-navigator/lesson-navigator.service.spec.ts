/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LessonNavigatorService } from './lesson-navigator.service';

describe('LessonNavigatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonNavigatorService]
    });
  });

  it('should ...', inject([LessonNavigatorService], (service: LessonNavigatorService) => {
    expect(service).toBeTruthy();
  }));
});
