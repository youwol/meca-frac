import chroma from 'chroma-js'

export interface Palette {
    title: string
    color: string[]
}

export const paletteRedPur: Palette = {
    title: 'Default',
    color: chroma
        .scale(['red', 'yellow', 'green', 'aqua', 'blue', 'purple'])
        .colors(10),
}

export const paletteBlueRed: Palette = {
    title: 'Insar',
    color: chroma.scale(['blue', 'aqua', 'green', 'yellow', 'red']).colors(10),
}
export const palettePurRed: Palette = {
    title: 'Rainbow',
    color: chroma
        .scale(['purple', 'blue', 'aqua', 'green', 'yellow', 'red'])
        .colors(10),
}
export const paletteWhiteRed: Palette = {
    title: 'Spectrum',
    color: chroma
        .scale([
            'white',
            'red',
            'purple',
            'blue',
            'aqua',
            'green',
            'yellow',
            'red',
        ])
        .colors(12),
}

export const palettesArray = [
    paletteRedPur,
    paletteBlueRed,
    palettePurRed,
    paletteWhiteRed,
]

export const defaultColor = [
    '#4D4D4D',
    '#999999',
    '#FFFFFF',
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
    '#333333',
    '#808080',
    '#cccccc',
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
    '#000000',
    '#666666',
    '#B3B3B3',
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294',
    '#AB149E',
]
