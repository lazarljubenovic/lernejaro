import {Component, OnInit, Input, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import {LessonIcon} from '../lesson-navigator/lesson-icon.enum';

@Component({
    selector: 'lrn-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit, OnChanges {

    @Input() public icon: LessonIcon;

    public fontAwesomeIconId: string;

    constructor() {
    }

    ngOnChanges() {
        let id: string;
        switch (this.icon) {
            case LessonIcon.Calendar:
                id = 'calendar';
                break;
            case LessonIcon.Circle:
                id = 'circle';
                break;
            case LessonIcon.Cog:
                id = 'cog';
                break;
            case LessonIcon.Cubes:
                id = 'cubes';
                break;
            case LessonIcon.Eye:
                id = 'eye';
                break;
            case LessonIcon.Flask:
                id = 'flask';
                break;
            default:
                id = 'folder'
        }
        this.fontAwesomeIconId = 'fa fa-' + id;
    }

    ngOnInit() {
    }

}
