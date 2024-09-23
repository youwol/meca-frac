import React, { ChangeEvent, useState } from 'react'
import { SvgIcon } from './icons/svg-icon'
import LockIcon from '../assets/lock_icon.svg'
import UnlockIcon from '../assets/unlock_icon.svg'
import LockUpdateIcon from '../assets/update_lock_icon.svg'
import UpdateIcon from '../assets/update_icon.svg'

interface CustomInputProps {
    name: string
    title: string
    id: string
    value: number | boolean
    type: 'number' | 'checkbox'
    handleOnchange: (value: number | boolean) => void
    handleOnclick?: (
        event:
            | React.MouseEvent<HTMLImageElement | HTMLInputElement, MouseEvent>
            | undefined,
    ) => void
    disabled: boolean
}

export const CustomInput = (props: CustomInputProps) => {
    const {
        name,
        title,
        id,
        value,
        type,
        disabled = false,
        handleOnchange,
        handleOnclick,
    } = props

    const [lock, setLock] = useState(false)
    const [tempValue, setTempValue] = useState<string>(
        type === 'number' ? value.toString() : '',
    )

    const handleLock = () => {
        setLock(!lock)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            const newValue = event.target.value
            if (newValue === '' || /^[0-9]\d{0,3}$/.test(newValue)) {
                setTempValue(newValue)
            }
        } else if (type === 'checkbox') {
            handleOnchange(event.target.checked)
        }
    }

    const handleBlur = () => {
        if (type === 'number') {
            const numericValue = Number(tempValue)

            if (
                tempValue === '' ||
                isNaN(numericValue) ||
                tempValue.length > 4
            ) {
                setTempValue(value.toString())
            } else {
                handleOnchange(numericValue)
            }
        }
    }

    const label = (
        <label
            htmlFor={id}
            className="form-check-label p-0 mx-4"
            style={{ minWidth: 'fit-content' }}
        >
            {title}
        </label>
    )

    return (
        <div className={'d-flex justify-content-start'}>
            {type !== 'checkbox' && label}
            <input
                name={`'fieldName'${name}`}
                id={id}
                className={` ${type !== 'checkbox' && 'nb-input'}  pointer ${lock && 'not-allowed'} `}
                type={type}
                value={type === 'number' ? tempValue : ''}
                checked={type === 'checkbox' && (value as boolean)}
                onChange={handleChange}
                onBlur={type === 'number' ? handleBlur : undefined}
                disabled={lock ?? disabled}
                onClick={handleOnclick}
            />
            {type === 'checkbox' && label}

            {type !== 'checkbox' && (
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <SvgIcon
                        icon={lock ? LockIcon : UnlockIcon}
                        customClass={'pointer'}
                        fill={lock ? 'red' : 'green'}
                        onclick={handleLock}
                    />
                    <SvgIcon
                        icon={lock ? LockUpdateIcon : UpdateIcon}
                        customClass={lock ? 'not-allowed' : ''}
                        onclick={handleOnclick}
                    />
                </div>
            )}
        </div>
    )
}

interface MaxMinInputsProps {
    maxTitle?: string
    minTitle?: string
    initialMaxValue?: number
    initialMinValue?: number
    maxDisabled?: boolean
    minDisabled?: boolean
    onMaxChange?: (value: number) => void
    onMinChange?: (value: number) => void
    onUpdate?: () => void
}

export const MaxMinInputs: React.FC<MaxMinInputsProps> = ({
    maxTitle = 'Maximum',
    minTitle = 'Minimum',
    initialMaxValue = 0,
    initialMinValue = 0,
    maxDisabled = false,
    minDisabled = false,
    onMaxChange,
    onMinChange,
    onUpdate,
}) => {
    const [maxValue, setMaxValue] = useState<number>(initialMaxValue)
    const [minValue, setMinValue] = useState<number>(initialMinValue)

    const handleMaxChange = (newValue: number) => {
        setMaxValue(newValue)
        onMaxChange && onMaxChange(newValue)
    }

    const handleMinChange = (newValue: number) => {
        setMinValue(newValue)
        onMinChange && onMinChange(newValue)
    }

    const handleUpdateClick = () => {
        onUpdate && onUpdate()
    }

    return (
        <div className={'w-100 align-items-start'}>
            <CustomInput
                name={'max-input'}
                title={maxTitle}
                id={'max'}
                value={maxValue}
                type={'number'}
                handleOnchange={(v) => handleMaxChange(v as number)}
                handleOnclick={handleUpdateClick}
                disabled={maxDisabled}
            />
            <CustomInput
                name={'min-input'}
                title={minTitle}
                id={'min'}
                value={minValue}
                type={'number'}
                handleOnchange={(v) => handleMinChange(v as number)}
                handleOnclick={handleUpdateClick}
                disabled={minDisabled}
            />
        </div>
    )
}
