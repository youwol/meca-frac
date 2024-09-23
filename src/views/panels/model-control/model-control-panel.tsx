import { DockviewApi } from 'dockview'
import React from 'react'
import { RemoteStress } from './remote-stress'
import { RemoteStressDomain } from './remote-stress-domain'
import { DomainSettings } from './domain-settings'
import RemoteStressIcon from '../../../assets/remote_stress_icon.svg'

export const ModelControlPanel = (api: DockviewApi) => {
    const controlVisuPanel = api.addPanel({
        id: 'idControlModelPanel',
        component: 'default',
        tabComponent: 'tab_2',
        position: { referencePanel: 'idD3Panel', direction: 'below' },
    })
    controlVisuPanel.api.setSize({
        height: 300,
    })
    api.addPanel({
        id: 'panel_13_3',
        component: 'default',
        params: {
            icon: RemoteStressIcon,
            children: <Content />,
        },
        tabComponent: 'tab_2',
        position: { referenceGroup: controlVisuPanel.group },
    })

    return controlVisuPanel
}

function Content() {
    return (
        <div className={'d-flex h-100'}>
            <RemoteStress />
            <RemoteStressDomain />
            <DomainSettings />
        </div>
    )
}
