import {
    Component, OnInit, Input, TemplateRef,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'lrn-title-slide',
    templateUrl: './title-slide.component.html',
    styleUrls: ['./title-slide.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TitleSlideComponent implements OnInit {

    @Input() author: string = 'Unknown Author';

    @Input() description: TemplateRef<any>;

    @Input() title: TemplateRef<any>;

    @Input() backgroundImageUrl: string = 'https://unsplash.it/720?random';

    constructor() {
    }

    ngOnInit() {
    }

}
