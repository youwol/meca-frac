import React, { useState } from 'react'
import { ItemDropdownBanner } from '../../../components/preferences/item-dropdown-banner'
import RemoteDomainStressIcon from '../../../assets/domain_icon.svg'
import { ItemDropdown } from '../../../components/preferences/item-dropdown'

export function RemoteStressDomain() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <ItemDropdownBanner
                title={'Remote Stress Domain'}
                customClass={'yw-rotate-90 flex-row-reverse'}
                icon={{ svg: RemoteDomainStressIcon }}
                handleDropdown={handleDropdown}
                isOpen={isOpen}
            />
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                <div> test control panel</div>
            </ItemDropdown>
        </>
    )
}
