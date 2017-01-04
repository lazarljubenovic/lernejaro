/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LessonIconMappingService } from './lesson-icon-mapping.service';

describe('LessonIconMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonIconMappingService]
    });
  });

  it('should ...', inject([LessonIconMappingService], (service: LessonIconMappingService) => {
    expect(service).toBeTruthy();
  }));
});
