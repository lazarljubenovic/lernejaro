export type LrnPaletteColor =
    'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue' | 'light-blue' | 'cyan'
        | 'teal' | 'green' | 'light-green' | 'lime' | 'yellow' | 'amber' | 'orange'
        | 'deep-orange';

export type LrnPaletteTheme = 'light' | 'dark';

export interface LrnPalette {
    color: LrnPaletteColor;
    theme: LrnPaletteTheme;
}
