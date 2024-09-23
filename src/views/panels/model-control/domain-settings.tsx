import React, { useState } from 'react'
import { ItemDropdownBanner } from '../../../components/preferences/item-dropdown-banner'
import DomainSettingIcon from '../../../assets/settings_icon.svg'
import { ItemDropdown } from '../../../components/preferences/item-dropdown'

export function DomainSettings() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <ItemDropdownBanner
                title={'Domain Settings'}
                customClass={'yw-rotate-90 flex-row-reverse'}
                icon={{ svg: DomainSettingIcon }}
                handleDropdown={handleDropdown}
                isOpen={isOpen}
            />
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                <div> test control panel</div>
            </ItemDropdown>
        </>
    )
}
