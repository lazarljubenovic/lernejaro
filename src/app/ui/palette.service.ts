import {Injectable, OnDestroy} from '@angular/core'
import {LrnPaletteColor, LrnPaletteTheme} from './palette'
import {PaletteConfigService} from './palette-config.service'

@Injectable()
export class PaletteService implements OnDestroy {

  ngOnDestroy(): void {
    // Force creation of service eagerly so the app doesn't remain colorless
  }

  // public theme$ = new BehaviorSubject<LrnPaletteTheme>('light');
  // public color$ = new BehaviorSubject<LrnPaletteColor>('indigo');

  public color: LrnPaletteColor
  public theme: LrnPaletteTheme

  private selectFromConfig() {
    this.selectTheme(this.paletteConfig.theme)
    this.selectColor(this.paletteConfig.color)
  }

  constructor(private paletteConfig: PaletteConfigService) {
    this.selectFromConfig()
  }

  public selectColor(color: LrnPaletteColor = this.color, element: HTMLElement = document.body) {
    element.className = document.body.className
      .replace(/lrn-theme-color-.*?(\s|$)/, '')
      .trim()
    element.classList.add(`lrn-theme-color-${color}`)
    this.color = color
  }

  public selectTheme(theme: LrnPaletteTheme = this.theme, element: HTMLElement = document.body) {
    element.classList.remove(`lrn-theme-light`)
    element.classList.remove(`lrn-theme-dark`)
    element.classList.add(`lrn-theme-${theme}`)
    this.theme = theme
  }


}
