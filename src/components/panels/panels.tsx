import React, { ReactNode } from 'react'

export const PanelDefault = ({
    children,
    setClass,
}: {
    children: ReactNode
    setClass?: string
}) => {
    return (
        <div
            className={`test h-100 p-2 overflow-auto text-white ${setClass ?? ''}`}
        >
            {children}
        </div>
    )
}
export const Panel3D = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className={'component3D'}
            style={{
                height: '100%',
                padding: '20px',
                color: 'white',
                overflow: 'auto',
                background: 'red',
            }}
        >
            {children}
        </div>
    )
}

export const TabComponent = ({ icon }: { icon?: string }) => {
    return (
        <div style={{ width: 'fit-content', color: 'white' }}>
            <img src={icon} alt={''} />
        </div>
    )
}
