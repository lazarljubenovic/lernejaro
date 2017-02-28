import {Injectable} from '@angular/core';

@Injectable()
export class PaletteService {

    // TODO inject these default values from forRoot for UI module
    // public theme$ = new BehaviorSubject<string>('light'); // TODO proper type as string union
    // public color$ = new BehaviorSubject<string>('indigo'); // TODO proper type as string union

    public theme: string = 'light';
    public color: string = 'indigo';

    // TODO type this properly, those are not strings but actual strings 'blue' 'orange' etc
    public selectColor(color: string) {
        document.body.className = document.body.className
            .replace(/lrn-theme-color-.*?(\s|$)/, '')
            .trim();
        document.body.classList.add(`lrn-theme-color-${color}`);
        // TODO this string should be created from the service
        this.color = color;
    }

    // TODO see above
    public selectTheme(theme: string) {
        document.body.classList.remove(`lrn-theme-light`);
        document.body.classList.remove(`lrn-theme-dark`);
        document.body.classList.add(`lrn-theme-${theme}`);
        this.theme = theme;
    }

    constructor() {
    }


}
