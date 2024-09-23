import { DockviewApi } from 'dockview'
import RoseIconIcon from '../../../assets/panel-tabs/rose_diagram.svg'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ItemDropdownBanner } from '../../../components/preferences/item-dropdown-banner'
import { SvgIcon } from '../../../components/icons/svg-icon'
import ShowIcon from '../../../assets/show_icon.svg'
import { CircleColorSection } from '../../../components/color/circle-color-section'
import { ItemDropdown } from '../../../components/preferences/item-dropdown'
import PickerIcon from '../../../assets/select_icon.svg'
import LockPickerIcon from '../../../assets/picker-locked.svg'
import SettingIcon from '../../../assets/settings_icon.svg'
import TrashIcon from '../../../assets/trash_icon.svg'
import AddIcon from '../../../assets/add_icon.svg'

import { Locker } from '../../../components/locker'
// @ts-ignore
import { RoseDiagram } from 'rose-diagram'
import { ColorResult } from 'react-color'
import { generateUniqueId } from '../../../utils/generateUniqueId'

interface Section {
    label: string
    id: string
}

interface SelectRossProps {
    placeHolder: Section[]
    onAddRoseElem: (newSection: Section) => void
}

export const Panel2d = (api: DockviewApi) => {
    const d2Panel = api.addPanel({
        id: 'idD2Panel',
        component: 'default',
        tabComponent: 'tab_2',
        params: {
            icon: RoseIconIcon,
            children: <Content />,
        },
        position: { referencePanel: 'idD3Panel', direction: 'right' },
    })

    d2Panel.api.setSize({
        width: 150,
    })

    return d2Panel
}

const RoseSection = (props: {
    section: Section
    onDelete: (id: string) => void
}) => {
    const { section, onDelete } = props
    const [isOpen, setIsOpen] = useState(false)

    const sectionsRef = useRef<Section[]>([
        { id: 'initial-section', label: 'Initial Section' },
    ])
    const [renderTrigger, setRenderTrigger] = useState<number>(0)
    const [roseGroup, setRoseGroup] = useState<Section[]>([
        { id: 'initial-section', label: 'Well A' },
    ])

    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }
    const handleAddRoseElem = (newSection: Section) => {
        sectionsRef.current.push(newSection)
        setRenderTrigger((prev) => prev + 1)
        setRoseGroup((prevGroup) => [...prevGroup, newSection])
    }
    const handleDeleteRoseElement = (id: string) => {
        sectionsRef.current = sectionsRef.current.filter(
            (section) => section.id !== id,
        )

        const isValidSection = (section: Section, validSections: Section[]) => {
            return (
                section.id === 'initial-section' ||
                validSections.some(({ id }) => id === section.id)
            )
        }

        const filterGroup = (
            prevGroup: Section[],
            validSections: Section[],
        ) => {
            return prevGroup.filter((section) =>
                isValidSection(section, validSections),
            )
        }

        setRoseGroup((prevGroup) => filterGroup(prevGroup, sectionsRef.current))
    }

    return (
        <>
            <ItemDropdownBanner
                id={section.id}
                title={section.label}
                handleDropdown={handleDropdown}
                isOpen={isOpen}
                actions={<Actions data={section} onDelete={onDelete} />}
            />
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                <div>
                    <SelectRoss
                        onAddRoseElem={handleAddRoseElem}
                        placeHolder={roseGroup}
                    />
                    <RoseSetting />
                    <RoseSections
                        sections={sectionsRef.current}
                        onDeleteRoseElem={handleDeleteRoseElement}
                    />
                </div>
            </ItemDropdown>
        </>
    )
}
const Actions = (props: { data: Section; onDelete: (id: string) => void }) => {
    return (
        <>
            {props.data.id !== 'initial-section' && (
                <TrashAction data={props.data} onDelete={props.onDelete} />
            )}

            <SvgIcon icon={ShowIcon} />
        </>
    )
}
const TrashAction = (props: {
    data: Section
    onDelete: (id: string) => void
}) => {
    const { data, onDelete } = props
    const handleDeletedSection = (
        ev:
            | React.MouseEvent<HTMLImageElement | HTMLInputElement, MouseEvent>
            | undefined,
    ) => {
        ev?.preventDefault()
        onDelete(data.id)
    }

    return <SvgIcon icon={TrashIcon} onclick={handleDeletedSection} />
}
const AddRoseSection = ({
    onAddRoseContainer,
}: {
    onAddRoseContainer: (v: string) => void
}) => {
    const [inputValue, setInputValue] = useState('')
    const handleAddRoseSection = () => {
        if (inputValue.trim()) {
            onAddRoseContainer(inputValue.trim())
            setInputValue('')
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            onAddRoseContainer(inputValue.trim())
            setInputValue('')
        }
    }
    return (
        <div className={'d-flex justify-content-start align-items-center'}>
            <div className={'ms-3'}>
                <input
                    type={'text'}
                    placeholder={'New Section Name'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div role={'none'} onClick={handleAddRoseSection}>
                <SvgIcon icon={AddIcon} w={'30px'} h={'30px'} />
            </div>
        </div>
    )
}
const Content = () => {
    const [roseSections, setRoseSections] = useState<Section[]>([
        { id: 'initial-section', label: 'Default Well' },
    ])

    const handleAddRoseContainer = (name: string) => {
        setRoseSections([
            ...roseSections,
            { id: Date.now().toString(), label: name },
        ])
    }

    const handleDeletedSection = (id: string) => {
        setRoseSections(roseSections.filter((section) => section.id !== id))
    }
    return (
        <div id={'rose-diagram-container'}>
            <AddRoseSection onAddRoseContainer={handleAddRoseContainer} />
            {roseSections.map((section) => (
                <RoseSection
                    key={section.id}
                    section={section}
                    onDelete={handleDeletedSection}
                />
            ))}
        </div>
    )
}

const SelectRoss = ({ placeHolder, onAddRoseElem }: SelectRossProps) => {
    const [inputValue, setInputValue] = useState('')
    const [lock, setLock] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.target.value)

    const handleAddRoseElem = () => {
        if (inputValue.trim()) {
            onAddRoseElem({ label: inputValue.trim(), id: generateUniqueId() })
            setInputValue('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            onAddRoseElem({ label: inputValue.trim(), id: generateUniqueId() })
            setInputValue('')
        }
    }

    const handleLock = () => setLock(!lock)

    const placeHolderText = placeHolder.map((l) => l.label).join(', ')
    const isLocked = lock

    return (
        <div
            className={`d-flex justify-content-start align-items-center ${isLocked ? 'not-allowed' : 'pointer'}`}
            style={{ color: isLocked ? '#8C876E' : 'inherit' }}
        >
            <button className="p-0 bg-transparent border-0" disabled={isLocked}>
                <SvgIcon
                    icon={isLocked ? LockPickerIcon : PickerIcon}
                    w="30px"
                    h="30px"
                />
            </button>
            <div className="ms-3">
                <input
                    type="text"
                    placeholder={placeHolderText}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    title={placeHolderText}
                    disabled={isLocked}
                />
            </div>
            <div>
                <Locker lock={lock} handleLock={handleLock} />
                <button onClick={handleAddRoseElem} disabled={isLocked}>
                    Add Section
                </button>
            </div>
        </div>
    )
}

const RoseSetting = () => {
    return (
        <div className={'d-flex justify-content-start align-items-center'}>
            <div>
                <SvgIcon icon={SettingIcon} w={'30px'} h={'30px'} />
            </div>
            <div className={'ms-3'}> Graph Setting</div>
        </div>
    )
}
const RoseSections = ({
    sections,
    onDeleteRoseElem,
}: {
    sections: Section[]
    onDeleteRoseElem: (id: string) => void
}) => {
    const initColor = {
        hex: '#fda1ff',
        hsl: {
            a: 1,
            h: 112.19040697674419,
            l: 0.47846099999999997,
            s: 0.1974296755639436,
        },
        rgb: { r: 253, g: 161, b: 255, a: 1 },
    }
    const [obsColor, setObsColor] = useState<ColorResult>(initColor)
    const [simColor, setSimColor] = useState<ColorResult>({
        ...initColor,
        hsl: {
            ...initColor.hsl,
            h: 8.842105263157897,
        },
    })
    const color = {
        observation: obsColor,
        simulation: simColor,
    }

    useEffect(() => {
        setObsColor((prevColor) =>
            prevColor !== obsColor ? obsColor : prevColor,
        )
        setSimColor((prevColor) =>
            prevColor !== simColor ? simColor : prevColor,
        )
    }, [obsColor, simColor])

    return (
        <div className={'rose-sections'}>
            <div className={'d-flex '}>
                <div
                    className={'col-6'}
                    style={{ borderRight: '5px solid white' }}
                >
                    <CircleColorSection
                        title={'Observation'}
                        initColor={color.observation}
                        setColor={(c) => setObsColor(c)}
                    />
                </div>
                <div className={'col-6 ms-2'}>
                    <CircleColorSection
                        title={'Simulation'}
                        initColor={color.simulation}
                        setColor={(c) => setSimColor(c)}
                    />
                </div>
            </div>
            <div className={'d-flex flex-column'}>
                {sections.map((section: Section, index: number) => (
                    <RoseSectionElements
                        key={section.id}
                        id={section.id}
                        color={color}
                        label={section.label}
                        onDeleteSection={
                            index > 0 ? onDeleteRoseElem : undefined
                        }
                    />
                ))}
            </div>
        </div>
    )
}

const RoseSectionElements = ({
    id,
    label,
    onDeleteSection,
    color,
}: {
    id: string
    label: string
    onDeleteSection: ((id: string) => void) | undefined
    color: {
        observation: ColorResult
        simulation: ColorResult
    }
}) => {
    const parentRef = useRef(null)
    const roseId1 = useRef(generateUniqueId())
    const roseId2 = useRef(generateUniqueId())

    useEffect(() => {
        if (parentRef.current) {
            appendRose(
                parentRef.current,
                roseId1.current,
                false,
                color.observation,
            )
            appendRose(
                parentRef.current,
                roseId2.current,
                true,
                color.simulation,
            )
        }
    }, [color])

    return (
        <>
            <div
                className={
                    'd-flex w-100 justify-content-between  align-items-center'
                }
            >
                <div
                    className={'d-flex col-6 justify-content-start'}
                    style={{ borderRight: '5px solid white' }}
                >
                    {label}
                </div>
                {onDeleteSection ? (
                    <div
                        className={
                            'd-flex col-6 justify-content-end border-left-2'
                        }
                        onClick={() => onDeleteSection(id)}
                        role={'none'}
                    >
                        <SvgIcon icon={TrashIcon} />
                    </div>
                ) : undefined}
            </div>

            <div
                ref={parentRef}
                id={id}
                className={'rose-elements d-flex w-100'}
            ></div>
        </>
    )
}

function appendRose(
    parent: HTMLElement,
    id: string,
    rightRose: boolean,
    color: ColorResult,
) {
    let roseDiv = document.querySelector(`#rose-${id}`) as HTMLDivElement
    if (!roseDiv) {
        roseDiv = document.createElement('div')
        roseDiv.id = `rose-${id}`
        roseDiv.className = `col-6 p-2`
        roseDiv.style.width = 'fit-content'
        roseDiv.style.fill = 'white'
        if (rightRose) {
            roseDiv.style.borderLeft = '5px solid white'
        }
        parent.appendChild(roseDiv)
    }

    const rose = new RoseDiagram(
        roseDiv.id,
        Array.from({ length: 20 }, () => Math.random() * 360),
        {
            width: 150,
            height: 150,
            margin: { left: 0, right: 0, top: 0, bottom: 0 },
            draw: {
                labels: false,
                circles: true,
                binBorder: true,
                cardinals: true,
            },
            is360: false,
            innerR: 5,
            deltaAngle: 10,
            fillColor: ` ${color.hex}`,
            lineColor: '#f3efef',
            gradTickSpacing: 7,
            colourHover: 'purple',
        },
    )

    rose.update()
}
