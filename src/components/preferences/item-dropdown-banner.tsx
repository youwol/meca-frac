import React, { CSSProperties, ReactNode } from 'react'

interface ItemDropdownBannerProps {
    id?: string
    title?: string
    children?: ReactNode
    icon?: {
        svg?: string
        style?: CSSProperties
    }
    customClass?: string
    isOpen: boolean
    handleDropdown: (ev?: React.MouseEvent) => void
    actions?: ReactNode
}

export function ItemDropdownBanner(props: ItemDropdownBannerProps) {
    const {
        id,
        title,
        children,
        icon,
        customClass,
        isOpen,
        actions,
        handleDropdown,
    } = props
    const isOpenRotate90 = isOpen ? 'right' : 'up'
    const isOpenNormal = isOpen ? 'down' : 'right'
    const isRotated = customClass ? isOpenRotate90 : isOpenNormal
    return (
        <div
            id={id}
            role={'none'}
            className={`d-flex  ${customClass ?? 'py-2'} pointer h-100 align-items-center justify-content-start yw-btn-bg-darker text-white border-0 btn-h-30 yw-btn-text`}
            onClick={handleDropdown}
            style={
                customClass ? { width: '35px' } : { height: '34px !important' }
            }
        >
            <i
                className={`fas fa-caret-${isRotated} ${!customClass && 'ms-3 me-2'} fa-lg`}
                style={{ width: '15px' }}
            />
            {icon && (
                <span
                    className={'my-3'}
                    style={
                        icon.style ?? { filter: 'brightness(0) invert(100%)' }
                    }
                >
                    <img src={icon.svg} alt={title} />
                </span>
            )}
            <div
                className={
                    children ? 'd-flex w-100 justify-content-start' : 'w-100'
                }
                style={customClass ? { transform: ' rotateZ(180deg)' } : {}}
            >
                {title ?? children}
            </div>
            <div className={'w-100 text-end px-2'}>{actions}</div>
        </div>
    )
}
