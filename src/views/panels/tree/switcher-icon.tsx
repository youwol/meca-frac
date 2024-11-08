import React, { useState } from 'react'
import { TreeNodeProps } from 'rc-tree'
import { SvgIcon } from '../../../components/icons/svg-icon'
import FolderCloseIcon from '../../../assets/tree-view/folder_closed_icon_dark.svg'
import FolderOpenIcon from '../../../assets/tree-view/folder_open_icon_dark.svg'
import DownIcon from '../../../assets/down_icon.svg'
import NextIcon from '../../../assets/next_icon.svg'
import { DataNode } from 'rc-tree/lib/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Color, ColorRepresentation, MeshBasicMaterial } from 'three'
import { createDivAtCursor } from '../../../utils/generateUniqueId'
import { CircleContainer } from '../../../components/color/circle-color-section'

const getSvgIcon = (datas: TreeNodeProps<DataNode>) => (
    <i className={'d-flex align-items-center'}>
        <SvgIcon
            customClass={'me-2'}
            icon={datas.expanded && !datas.isLeaf ? DownIcon : NextIcon}
        />
        <SvgIcon
            customClass={'me-1'}
            icon={
                datas.expanded && !datas.isLeaf
                    ? FolderOpenIcon
                    : FolderCloseIcon
            }
            onclick={(
                ev:
                    | React.MouseEvent<
                          HTMLImageElement | HTMLInputElement,
                          MouseEvent
                      >
                    | undefined,
            ) => {
                ev?.stopPropagation()
            }}
        />
    </i>
)

export const switcherIcon = (data: TreeNodeProps) => {
    if (data.isLeaf) {
        return <MyComponent data={data} />
    }

    return getSvgIcon(data)
}

const MyComponent = (props: { data: TreeNodeProps }) => {
    const { data } = props
    const treeData = useSelector((state: RootState) => state.treeView.treeData)

    const node = treeData.find((node) => node.key === data?.data?.key)
    const [color, setColor] = useState(
        (node?.mesh.material as MeshBasicMaterial).color.getHexString(),
    )

    if (!node) {
        return null
    }

    const nodeMaterial = node.mesh.material as MeshBasicMaterial

    const handleColor = (color: { hex: ColorRepresentation }) => {
        nodeMaterial.color = new Color(color.hex)
        setColor(color?.hex.toString())
    }
    const handleColor3DObjects = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.stopPropagation()
        createDivAtCursor({
            children: <CircleContainer onClick={handleColor} />,
            event: ev,
        })
    }
    return (
        <div
            className={'d-flex me-1'}
            onClick={handleColor3DObjects}
            role={'none'}
        >
            <TriangleColor fill={color} />
        </div>
    )
}

const TriangleColor = (props: { fill: string }) => {
    const { fill } = props
    return (
        <div>
            <svg
                width="24"
                height="15"
                viewBox="0 0 24 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="Type=tri_surf_icon" clipPath="url(#clip0_1771_15007)">
                    <path
                        id="Vector"
                        d="M11.3702 0.925612L0.828125 7.01488L11.3405 13.0843C11.5388 13.2012 11.7648 13.2628 11.995 13.2628C12.2253 13.2628 12.4513 13.2012 12.6496 13.0843L23.1917 7.00496L12.6793 0.925612C12.4794 0.813552 12.254 0.754704 12.0248 0.754704C11.7956 0.754704 11.5702 0.813552 11.3702 0.925612Z"
                        fill={fill.startsWith('#') ? fill : `#${fill}`}
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <g id="Vector_2">
                        <path
                            d="M17.5785 3.78181L6.4314 10.2281L17.5785 3.78181Z"
                            fill="#0088B2"
                        />
                        <path
                            d="M17.5785 3.78181L6.4314 10.2281"
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <path
                        id="Vector_3"
                        d="M17.5685 10.2182L6.42139 3.78182"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        id="Vector_4"
                        d="M11.9951 0.766941V13.2628"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        id="Vector_5"
                        d="M6.42139 3.78182V10.2182"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        id="Vector_6"
                        d="M17.5686 3.78182V10.2182"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1771_15007">
                        <rect width="24" height="15" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}
