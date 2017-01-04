/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LessonColorMappingService } from './lesson-color-mapping.service';

describe('LessonColorMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonColorMappingService]
    });
  });

  it('should ...', inject([LessonColorMappingService], (service: LessonColorMappingService) => {
    expect(service).toBeTruthy();
  }));
});
