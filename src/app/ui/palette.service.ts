import {Injectable, OnDestroy} from '@angular/core';
import {LrnPalette, LrnPaletteColor, LrnPaletteTheme} from './palette';
import {PaletteConfigService} from './palette-config.service';

@Injectable()
export class PaletteService implements OnDestroy {

    ngOnDestroy(): void {
        // Force creation of service eagerly so the app doesn't remain colorless
    }

    // public theme$ = new BehaviorSubject<LrnPaletteTheme>('light');
    // public color$ = new BehaviorSubject<LrnPaletteColor>('indigo');

    public color: LrnPaletteColor;
    public theme: LrnPaletteTheme;

    constructor(public paletteConfig: PaletteConfigService) {
        this.selectTheme(paletteConfig.theme);
        this.selectColor(paletteConfig.color);
    }

    public selectColor(color: LrnPaletteColor = this.color) {
        document.body.className = document.body.className
            .replace(/lrn-theme-color-.*?(\s|$)/, '')
            .trim();
        document.body.classList.add(`lrn-theme-color-${color}`);
        this.color = color;
    }

    public selectTheme(theme: LrnPaletteTheme = this.theme) {
        document.body.classList.remove(`lrn-theme-light`);
        document.body.classList.remove(`lrn-theme-dark`);
        document.body.classList.add(`lrn-theme-${theme}`);
        this.theme = theme;
    }


}
