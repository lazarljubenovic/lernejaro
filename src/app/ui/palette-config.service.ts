import {Injectable} from '@angular/core';
import {LrnPaletteColor, LrnPaletteTheme, LrnPalette} from './palette';

// TODO this should prolly be opaque token not a class
@Injectable()
export class PaletteConfigService implements LrnPalette {

    public color: LrnPaletteColor;
    public theme: LrnPaletteTheme;

}
