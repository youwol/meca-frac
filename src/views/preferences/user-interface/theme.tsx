import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../context/theme-context'
import { ItemDropdown } from '../../../components/preferences/item-dropdown'
import { ItemDropdownBanner } from '../../../components/preferences/item-dropdown-banner'

export function Theme() {
    const themes = [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
    ]

    const { theme, changeTheme, loadTheme } = useTheme()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleThemeChange = (newTheme: string) => {
        changeTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        loadTheme(newTheme)
    }
    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (
            savedTheme &&
            themes.some((themeOption) => themeOption.value === savedTheme)
        ) {
            changeTheme(savedTheme)
            loadTheme(savedTheme)
        }
    }, [changeTheme, loadTheme, themes])
    return (
        <>
            <ItemDropdownBanner
                title={'Theme'}
                handleDropdown={handleDropdown}
                isOpen={isOpen}
            />
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                {themes.map((themeOption) => (
                    <div
                        className="form-check ms-3 align-self-start d-flex"
                        key={themeOption.value}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="themeRadios"
                            id={`themeRadio_${themeOption.value}`}
                            value={themeOption.value}
                            checked={theme === themeOption.value}
                            onChange={() =>
                                handleThemeChange(themeOption.value)
                            }
                        />
                        <label
                            className="form-check-label ms-4"
                            htmlFor={`themeRadio_${themeOption.value}`}
                        >
                            {themeOption.name}
                        </label>
                    </div>
                ))}
            </ItemDropdown>
        </>
    )
}
