/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {VerticalBarService} from './vertical-bar.service';

xdescribe('VerticalBarService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VerticalBarService]
        });
    });

    it('should ...', inject([VerticalBarService], (service: VerticalBarService) => {
        expect(service).toBeTruthy();
    }));
});
