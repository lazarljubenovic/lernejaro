import {Component, OnInit} from '@angular/core';
import {PaletteService} from '../palette.service';

@Component({
    selector: 'lrn-palette-picker',
    templateUrl: 'palette-picker.component.html',
    styleUrls: ['palette-picker.component.scss']
})
export class PalettePickerComponent implements OnInit {

    // TODO This should be provided app-wide (probably a service from the UI module should handle
    // it), but definitely not here, this is not specific to presentation
    // public theme: string = 'light';
    // public themeColor: string = 'indigo';

    // TODO This should be a separate component
    // and this array should actually be injected or something
    public colors = [
        'red',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'light-green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deep-orange',
    ];

    // TODO type this properly, those are not strings but actual strings 'blue' 'orange' etc
    public selectColor(color: string = this.palette.color) {
        this.palette.selectColor(color);
    }

    // TODO see above
    public selectTheme(theme: string = this.palette.theme) {
        this.palette.selectTheme(theme);
    }

    constructor(private palette: PaletteService) {
    }

    ngOnInit() {
    }

}
