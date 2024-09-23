import React, { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

export const generateUniqueId = () => {
    return (
        'id-' +
        new Date().getTime() +
        '-' +
        Math.random().toString(36).substring(2, 11)
    )
}
export const createDivAtCursor = (param: {
    children: ReactNode
    event: React.MouseEvent<HTMLDivElement>
}) => {
    const { event, children } = param
    let div = document.getElementById('popupModalId')
    if (!div) {
        div = document.createElement('div')
        div.id = 'popupModalId'
        div.style.position = 'absolute'
        div.style.left = `${event.clientX}px`
        div.style.top = `${event.clientY}px`
        div.style.zIndex = `99`
        div.style.overflow = `none`
        document.body.appendChild(div)
    } else {
        div.style.left = `${event.clientX}px`
        div.style.top = `${event.clientY}px`
    }

    const htmlBody = createRoot(div)
    htmlBody.render(children)

    const handleClickOutside = (event: MouseEvent) => {
        if (div && !div.contains(event.target as Node)) {
            div.remove()
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }
    document.addEventListener('mousedown', handleClickOutside)
}
