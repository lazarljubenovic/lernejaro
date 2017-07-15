import {Component, ElementRef, forwardRef, Inject, OnInit, Optional} from '@angular/core'
import {MultipleChoiceComponent} from '../multiple-choice/multiple-choice.component'
import {LoggerService} from '../../logger.service'

@Component({
    selector: 'lrn-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

    constructor(@Inject(forwardRef(() => MultipleChoiceComponent))
                @Optional() private multipleChoiceComponent: MultipleChoiceComponent,
                logger: LoggerService,
                elementRef: ElementRef) {
        if (multipleChoiceComponent == null) {
            logger.error(`lrn-question must be inside a lrn-multiple-choice component.`,
                elementRef.nativeElement)
        }
    }

    ngOnInit() {
    }

}
