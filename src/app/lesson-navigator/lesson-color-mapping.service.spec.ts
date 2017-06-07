/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing'
import {LessonColorMappingService} from './lesson-color-mapping.service'

xdescribe('LessonColorMappingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LessonColorMappingService]
        })
    })

    it('should ...', inject([LessonColorMappingService], (service: LessonColorMappingService) => {
        expect(service).toBeTruthy()
    }))
})
