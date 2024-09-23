import React, { useEffect, useRef, useState } from 'react'
import { CirclePicker, ColorResult } from 'react-color'
import { defaultColor, palettesArray } from './color-palettes'
import { Palette } from './palette'
import { createDivAtCursor } from '../../utils/generateUniqueId'

export function CircleColorSection(props: {
    title: string
    initColor: ColorResult
    setColor: (c: ColorResult) => void
}) {
    const [color, setColor] = useState(props.initColor)
    const refColor = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (refColor.current) {
            refColor.current.style.backgroundColor = `hsla(${color.hsl.h}, ${color.hsl.s * 100}%, ${color.hsl.l * 100}%, ${color.hsl.a})`
        }
    }, [color])
    const handleColor = (c: ColorResult) => {
        setColor(c)
        props.setColor(c)
    }

    return (
        <div
            className={'d-flex w-100 justify-content-start'}
            role={'none'}
            onClick={(ev) => ev.stopPropagation()}
        >
            <div
                className={'border border-white rounded-circle me-4'}
                role={'none'}
                ref={refColor}
                style={{
                    position: 'relative',
                    height: '18px',
                    width: '18px',
                    backgroundColor: `hsla(${color.hsl.h}, ${color.hsl.s * 100}%, ${color.hsl.l * 100}%, ${color.hsl.a})`,
                }}
                onClick={(ev) => {
                    ev.stopPropagation()
                    createDivAtCursor({
                        children: <CircleContainer onClick={handleColor} />,
                        event: ev,
                    })
                }}
            ></div>
            <div>{props.title}</div>
        </div>
    )
}

export const CircleContainer = (props: {
    onClick: (c: ColorResult) => void
}) => {
    return (
        <div
            role={'none'}
            style={{
                backgroundColor: '#474538',
                position: 'absolute',
                left: '120%',
                zIndex: 1,
            }}
        >
            <CirclePicker
                colors={defaultColor}
                onChangeComplete={props.onClick}
            />
        </div>
    )
}

export function PaletteColorSection(props: { title: string }) {
    const [color, setColor] = useState(palettesArray[0].color?.join(', '))

    const handlePalettes = (c: { title: string; color: string }) => {
        setColor(c.color)
    }
    const handleClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        ev.stopPropagation()
        createDivAtCursor({
            event: ev,
            children: <PalettesContainer handleOnclick={handlePalettes} />,
        })
    }

    return (
        <div className={'d-flex w-100 justify-content-start'}>
            <div
                className={'border border-white rounded-circle me-4'}
                style={{
                    position: 'relative',
                    height: '18px',
                    width: '18px',
                    border: '1px',
                    borderColor: 'white',
                    borderRadius: ' 5px',
                    backgroundImage: `linear-gradient(to right, ${color})`,
                }}
                onClick={(ev) => handleClick(ev)}
                role={'none'}
            />
            <div className={'me-4'}>{props.title}</div>
        </div>
    )
}

export const PalettesContainer = (props: {
    handleOnclick: (color: { title: string; color: string }) => void
}) => {
    return (
        <div
            className={'bg-black  p-2 rounded text-white '}
            style={{
                position: 'absolute',
                width: '30vh',
                top: '100%',
            }}
        >
            {palettesArray.map((palette) => (
                <Palette
                    key={palette.title}
                    title={palette.title}
                    colorPalette={palette.color?.join(', ')}
                    handlePalette={props.handleOnclick}
                />
            ))}
        </div>
    )
}
