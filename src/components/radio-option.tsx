import React from 'react'

interface RadioOptionProps {
    name: string
    options: {
        title: string
        value: string
        input?: {
            title: string
            value: number
            handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
            disabled: boolean
        }
    }[]
    selectedOption: string
    handleRadioChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

export function RadioOption({
    name,
    options,
    selectedOption,
    handleRadioChange,
}: RadioOptionProps) {
    return (
        <>
            {options.map((option, index) => {
                const isChecked = selectedOption === option.value
                return (
                    <div
                        key={'index-' + index}
                        className={`form-check form-check-inline  justify-content-start my-2`}
                        role={'none'}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name={`inlineRadioOptions${name.replace(/\s/g, '')}`}
                            value={option.value}
                            checked={isChecked}
                            onChange={handleRadioChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`inlineRadio1${option.value.replace(/\s/g, '')}`}
                        >
                            {option.title}
                        </label>
                        {option.input && (
                            <>
                                <label
                                    className="form-check-label ms-5"
                                    htmlFor={`inlineRadio2${option.value.replace(/\s/g, '')}`}
                                >
                                    {option.input.title}
                                </label>
                                <input
                                    className=" nb-input mb-2 pointer ms-2"
                                    type="number"
                                    min="0"
                                    max="3"
                                    step="0.01"
                                    value={option.input.value}
                                    onChange={option.input.handleOnChange}
                                    disabled={!option.input.disabled}
                                />
                            </>
                        )}
                    </div>
                )
            })}
        </>
    )
}
