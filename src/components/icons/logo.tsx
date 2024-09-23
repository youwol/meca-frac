import React from 'react'
import AppLogo from '../../assets/app_logo_1.svg'

export function Logo(props: { w?: string; h?: string }) {
    return (
        <img
            src={AppLogo}
            alt={'Fracture Modeling'}
            style={{ width: props.w, height: props.h }}
        />
    )
}
