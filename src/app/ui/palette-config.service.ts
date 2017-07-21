import {Injectable} from '@angular/core'
import {LrnPalette, LrnPaletteColor, LrnPaletteTheme} from './palette'

// TODO this should prolly be opaque token not a class
@Injectable()
export class PaletteConfigService implements LrnPalette {
  public color: LrnPaletteColor
  public theme: LrnPaletteTheme
}
