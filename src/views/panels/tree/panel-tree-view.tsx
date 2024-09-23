import { DockviewApi } from 'dockview'
import React, { useEffect, useState } from 'react'
import TreeIcon from '../../../assets/tree_icon_dark.svg'
import Tree from 'rc-tree'
import 'rc-tree/assets/index.css'
import './style.css'
import { switcherIcon } from './switcher-icon'
import { useDataFrameContext } from '../../../context/data-frames/data-frame-context'

export const PanelTreeView = (api: DockviewApi) => {
    const TreeView = api.addPanel({
        id: 'idTreeViewPanel',
        tabComponent: 'tab_2',
        component: 'default',
        position: { referencePanel: 'idD3Panel', direction: 'left' },
    })
    TreeView.api.setSize({ width: 100 })

    api.addPanel({
        id: 'TreeViewPanelTab1',
        component: 'default',
        params: {
            icon: TreeIcon,
            children: content,
        },
        tabComponent: 'tab_2',
        position: { referenceGroup: TreeView.group },
    })

    return TreeView
}

const TreeViews = () => {
    const { dataframeValue } = useDataFrameContext()

    const [faultsData, setFaultsData] = useState<
        { key: string; title: string }[]
    >([])

    useEffect(() => {
        if (dataframeValue.length > 0) {
            const transformedData = dataframeValue.map((item, index) => ({
                key: `0-0-k-a-${index}`,
                title: item.userData.name,
            }))
            setFaultsData(transformedData)
        }
    }, [dataframeValue])

    const treeData = [
        {
            key: '0-0',
            title: 'Data',
            children: [
                {
                    key: '0-0-0',
                    title: 'Faults',
                    isLeaf: false,
                    children: faultsData,
                },
                {
                    key: '0-0-1',
                    title: 'Horizons',
                    children: [
                        {
                            key: '0-0-1-0',
                            title: 'parent Horizons-0',
                        },
                        { key: '0-0-1-1', title: 'parent Horizons-1' },
                        { key: '0-0-1-2', title: 'parent Horizons-2' },
                        { key: 1128, title: 1128 },
                    ],
                },
                {
                    key: '0-0-2',
                    title: 'Grids',
                    children: [
                        { key: '0-0-2-0', title: 'parent Grids 1' },
                        { key: '0-0-2-1', title: 'parent Grids 2' },
                    ],
                },
                {
                    key: '0-0-3',
                    title: 'Fractures',
                    children: [{ key: '0-0-3-0', title: 'parent Fractures' }],
                },
            ],
        },
    ]

    return (
        <Tree
            checkable
            className="myCls  customIcon text-start"
            selectable={false}
            treeData={treeData}
            switcherIcon={switcherIcon}
        />
    )
}

const content = (
    <div>
        <h1> Tree View Panel content</h1>
        <TreeViews />
    </div>
)
