import React from 'react'
import { useActivePanel } from '../../context/active-preferences-tab-context'

export const PreferencesBtn = (props: {
    id: string
    title: string
    customClass?: string
}) => {
    const { activePanel, setActivePanel } = useActivePanel()
    const handleClick = () => {
        setActivePanel(props.id)
    }
    return (
        <div
            className={`yw-btn yw-btn-text yw-pl-10 yw-mb-4 ${activePanel !== props.id ? 'yw-btn-bg yw-text-white-selected' : 'yw-btn-bg-selected  yw-text-white-unselected'} ${props.customClass}`}
            style={{ width: '100%' }}
            onClick={handleClick}
            role={'none'}
        >
            {props.title}
        </div>
    )
}
