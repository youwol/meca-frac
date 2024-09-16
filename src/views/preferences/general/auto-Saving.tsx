import React, {useState} from 'react'
import {ItemDropdownBanner} from "../../../components/preferences/item-dropdown-banner"
import {ItemDropdown} from "../../../components/preferences/item-dropdown"
export function AutoSaving(){
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }
    return(
        <>
            <ItemDropdownBanner title={'Auto Saving'} handleDropdown={handleDropdown} isOpen={isOpen}/>
            <ItemDropdown class={!isOpen ? 'd-none' : ''}>
                <div>
                    test
                </div>
            </ItemDropdown>

        </>
    )
}