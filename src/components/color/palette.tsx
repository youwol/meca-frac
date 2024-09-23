import React from 'react'

export function Palette(props: {
    title: string
    colorPalette: string
    handlePalette?: (color: { title: string; color: string }) => void
}) {
    const { title, colorPalette, handlePalette } = props
    const handleOnclick = () => {
        handlePalette && handlePalette({ title: title, color: colorPalette })
    }
    return (
        <div>
            <div>{title}</div>
            <div
                style={{
                    height: '30px',
                    width: '100%',
                    border: '5px',
                    borderColor: 'white',
                    borderRadius: ' 5px',
                    backgroundImage: `linear-gradient(to right, ${colorPalette})`,
                }}
                role={'none'}
                onClick={handleOnclick}
            />
        </div>
    )
}
