import React, { ChangeEvent, useEffect, useState } from 'react'
import { ItemDropdownBanner } from '../../../components/preferences/item-dropdown-banner'
import { ItemDropdown } from '../../../components/preferences/item-dropdown'
import {
    CircleColorSection,
    PaletteColorSection,
} from '../../../components/color/circle-color-section'
import { SvgIcon } from '../../../components/icons/svg-icon'
import ShowIcon from '../../../assets/show_icon.svg'
import PreferencesIcon from '../../../assets/preferences_icon_dark.svg'
import { RadioOption } from '../../../components/radio-option'
import { useShapeContext } from '../../../context/display-panel/basic/shape'
import { RangeSlider } from '../../../components/range-slider'
import { useTransparencyContext } from '../../../context/display-panel/basic/surface'
import { factoryHandleChange } from '../model-control/remote-stress'
import { useSizeContext } from '../../../context/display-panel/basic/nodes'
import { CustomInput } from '../../../components/custom-input'
import ResizableDraggablePopup from '../../../components/custom-popup'
import { ColorResult } from 'react-color'
import { updateBasicSection } from '../../../redux/basic-slice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'

export function FillSection() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <ItemDropdownBanner
                handleDropdown={handleDropdown}
                isOpen={isOpen}
                actions={<SvgIcon icon={ShowIcon} />}
            >
                <PaletteColorSection title={'Fill'} />
            </ItemDropdownBanner>
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                <div>
                    <div>this is test</div>
                </div>
            </ItemDropdown>
        </>
    )
}

export function SurfaceSection() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const dispatch: AppDispatch = useDispatch()
    const surfaceSection = useSelector(
        (state: RootState) => state.basic.sections.surface,
    )

    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleColor = (c: ColorResult) => {
        dispatch(
            updateBasicSection({
                sectionName: 'surface',
                data: { color: c },
            }),
        )
    }

    return (
        <>
            <ItemDropdownBanner
                handleDropdown={handleDropdown}
                isOpen={isOpen}
                actions={<SvgIcon icon={ShowIcon} />}
            >
                <CircleColorSection
                    title={'Surface'}
                    initColor={surfaceSection.color as ColorResult}
                    setColor={handleColor}
                />
            </ItemDropdownBanner>
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                <div>
                    <Transparency />
                    <SurfaceProperties />
                    {/*<Divider />*/}
                </div>
            </ItemDropdown>
        </>
    )
}

const Transparency = () => {
    const { min, max } = { min: 0, max: 1 }

    const {
        transparencyValue,
        lastTransparencyValidValue,
        setTransparencyValue,
        setLastTransparencyValidValue,
    } = useTransparencyContext()
    const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTransparencyValue(+event.target.value)
    }
    const handleChange = factoryHandleChange(
        setTransparencyValue,
        lastTransparencyValidValue,
        setLastTransparencyValidValue,
        min,
        max,
    )
    return (
        <RangeSlider
            value={transparencyValue}
            title={'Transparency'}
            min={min}
            max={max}
            step={0.1}
            lock={{ isLocked: false }}
            handleRangeChange={handleRangeChange}
            handleChange={handleChange}
        />
    )
}

const SurfaceProperties = () => {
    const [showPopup, setShowPopup] = useState(false)
    const [lightingChecked, setLightingChecked] = useState(true)
    const [flatChecked, setFlatChecked] = useState(true)

    const handleCloseBox = () => {
        setShowPopup(false)
    }
    const handleOpenModal = () => {
        setShowPopup(true)
    }
    const handleLightingChange = (e: number | boolean) => {
        setLightingChecked(e as boolean)
    }

    const handleFlatChange = (e: number | boolean) => {
        setFlatChecked(e as boolean)
    }
    return (
        <div className={'d-flex flex-column  m-2'}>
            <div className={'d-flex w-100 justify-content-between'}>
                <CustomInput
                    name={'surfaceProperties'}
                    title={'Lighting'}
                    id={'1'}
                    value={lightingChecked}
                    type={'checkbox'}
                    handleOnchange={handleLightingChange}
                    disabled={false}
                />
                <div>
                    <SvgIcon icon={PreferencesIcon} onclick={handleOpenModal} />
                    {showPopup && (
                        <ResizableDraggablePopup
                            title={'test'}
                            icon={<SvgIcon icon={PreferencesIcon} />}
                            onClose={handleCloseBox}
                        >
                            <p>
                                This is a resizable and draggable popup window.
                            </p>
                            <p>You can put any content here.</p>
                        </ResizableDraggablePopup>
                    )}
                </div>
            </div>
            <div className={'d-flex w-100 justify-content-between'}>
                <CustomInput
                    name={'surfaceProperties'}
                    title={'Flat'}
                    id={'2'}
                    value={flatChecked}
                    type={'checkbox'}
                    handleOnchange={handleFlatChange}
                    disabled={false}
                />
                <SvgIcon icon={PreferencesIcon} />
            </div>
        </div>
    )
}

export function NodesSection() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const nodesSection = useSelector(
        (state: RootState) => state.basic.sections.nodes,
    )
    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleNodeColor = (c: ColorResult) => {
        dispatch(
            updateBasicSection({
                sectionName: 'nodes',
                data: { color: c },
            }),
        )
    }

    return (
        <>
            <ItemDropdownBanner
                handleDropdown={handleDropdown}
                isOpen={isOpen}
                actions={<SvgIcon icon={ShowIcon} />}
            >
                <CircleColorSection
                    title={'Nodes'}
                    initColor={nodesSection.color as ColorResult}
                    setColor={handleNodeColor}
                />
            </ItemDropdownBanner>
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                <div>
                    <NodeSize />
                    <NodeCircleSquare />
                </div>
            </ItemDropdown>
        </>
    )
}

const NodeSize = () => {
    const { min, max } = { min: 0, max: 10 }

    const {
        sizeValue,
        lastSizeValidValue,
        setSizeValue,
        setLastSizeValidValue,
    } = useSizeContext()
    const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSizeValue(+event.target.value)
    }
    const handleChange = factoryHandleChange(
        setSizeValue,
        lastSizeValidValue,
        setLastSizeValidValue,
        min,
        max,
    )
    return (
        <RangeSlider
            value={sizeValue}
            title={'Size'}
            min={min}
            max={max}
            step={1}
            lock={{ isLocked: false }}
            handleRangeChange={handleRangeChange}
            handleChange={handleChange}
        />
    )
}

const NodeCircleSquare = () => {
    const { setCircle, setSquare } = useShapeContext()
    const [selectedOption, setSelectedOption] = useState('disk')

    const handleRadioChange = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setSelectedOption(event.target.value)
        if (event.target.value === 'disk') {
            setSquare(false)
            setCircle(true)
        } else {
            setSquare(true)
            setCircle(false)
        }
    }
    return (
        <div
            className={
                'd-flex flex-column align-items-start justify-content-between px-2 w-100 '
            }
        >
            <RadioOption
                name={'circleSquare'}
                options={[
                    {
                        title: 'Circle',
                        value: 'disk',
                    },
                    {
                        title: 'Square',
                        value: 'square',
                    },
                ]}
                selectedOption={selectedOption}
                handleRadioChange={handleRadioChange}
            />
        </div>
    )
}

export function MeshSection() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [_color, setColor] = useState<ColorResult>()
    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }

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
    useEffect(() => {
        setColor(initColor)
    }, [setColor])
    return (
        <>
            <ItemDropdownBanner
                handleDropdown={handleDropdown}
                isOpen={isOpen}
                actions={<SvgIcon icon={ShowIcon} />}
            ></ItemDropdownBanner>
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                <div>
                    <div>this is test</div>
                </div>
            </ItemDropdown>
        </>
    )
}
