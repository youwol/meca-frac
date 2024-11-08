import { DockviewApi } from 'dockview'
import React, { Key, useEffect, useState } from 'react'
import TreeIcon from '../../../assets/tree_icon_dark.svg'
import Tree from 'rc-tree'
import 'rc-tree/assets/index.css'
import './style.css'
import { switcherIcon } from './switcher-icon'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { DataNode } from 'rc-tree/lib/interface'
import { TreeNode } from '../../../redux/interface'
import { selectTreeNode } from '../../../redux/tree-view-slice'
import { EventDataNode } from 'rc-tree/es/interface'
import { CheckInfo } from 'rc-tree/es/Tree'

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

interface CategorizedData {
    grids: DataNode[]
    faults: DataNode[]
    horizons: DataNode[]
}

const categorizeDataTree = (dataTree: TreeNode[]) => {
    return dataTree.reduce<CategorizedData>(
        (acc, item) => {
            if (item.title.toLowerCase().includes('grid')) {
                acc.grids.push(item)
            } else if (item.title.toLowerCase().includes('fault')) {
                acc.faults.push(item)
            } else if (item.title.toLowerCase().includes('horizon')) {
                acc.horizons.push(item)
            }
            return acc
        },
        { grids: [], faults: [], horizons: [] },
    )
}

const TreeViews = () => {
    const dataTree = useSelector((state: RootState) => state.treeView.treeData)
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
    const dispatch = useDispatch()

    const categorizedData = categorizeDataTree(dataTree)

    const treeData: DataNode[] = [
        {
            key: '0-0',
            title: 'Data',
            children: [
                {
                    key: '0-0-0',
                    title: 'Faults',
                    isLeaf: false,
                    selectable: true,
                    children: categorizedData.faults.map(
                        (item: TreeNode | DataNode) => ({
                            key: item.key,
                            title: item.title,
                            style: {
                                backgroundColor: (item as TreeNode)
                                    .selectedObject
                                    ? '#5f5454'
                                    : '',
                            },
                            isLeaf: true,
                        }),
                    ),
                },
                {
                    key: '0-0-1',
                    title: 'Horizons',
                    isLeaf: false,
                },
                {
                    key: '0-0-2',
                    title: 'Grids',
                    isLeaf: false,
                    children: categorizedData.grids.map(
                        (item: TreeNode | DataNode) => ({
                            key: item.key,
                            title: item.title,
                            style: {
                                backgroundColor: (item as TreeNode)
                                    .selectedObject
                                    ? '#5f5454'
                                    : '',
                            },
                            isLeaf: true,
                        }),
                    ),
                },
                {
                    key: '0-0-3',
                    title: 'Fractures',
                    isLeaf: false,
                    children: [],
                },
            ],
        },
    ]

    useEffect(() => {
        const parentKeys = ['0-0', `${dataTree.length > 0 ? '0-0-0' : ''}`]
        setExpandedKeys(parentKeys)
    }, [dataTree])

    const selectedKeys: string[] = dataTree
        .filter((item) => item.selectedObject)
        .map((item) => item.key)

    const handleExpand = (expandedKeys: Key[]) => {
        setExpandedKeys(expandedKeys)
    }
    const handleSelect = (_keys: Key[], node: EventDataNode<DataNode>) => {
        dispatch(
            selectTreeNode({
                key: node.key,
                selected: !dataTree.find(
                    (dataNode) => dataNode.key === node.key,
                )?.selectedObject,
            }),
        )
    }
    const handleCheckNodes = (
        checkedKeys: Key[] | { checked: React.Key[]; halfChecked: React.Key[] },
        info: CheckInfo<DataNode>,
    ) => {
        const node = dataTree.find((node) => node.key === info.node.key)
        if (!node) {
            return null
        }

        node.mesh.visible = !info.checked
    }
    return (
        <Tree
            checkable
            defaultExpandAll={true}
            expandedKeys={expandedKeys}
            onExpand={handleExpand}
            className="myCls  customIcon text-start"
            selectable={true}
            onSelect={(selectedKeys, info) =>
                handleSelect(selectedKeys, info.node)
            }
            treeData={treeData}
            draggable={true}
            switcherIcon={switcherIcon}
            selectedKeys={selectedKeys}
            onCheck={handleCheckNodes}
        />
    )
}

const content = (
    <div>
        <h1> Tree View Panel content</h1>
        <TreeViews />
    </div>
)
