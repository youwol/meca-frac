import React from 'react'

export function Locker(props: { lock: boolean; handleLock: () => void }) {
    const { lock, handleLock } = props
    return (
        <i
            className={`fas fa-${lock ? 'lock text-danger' : 'unlock text-success'} pointer px-2`}
            role={'none'}
            onClick={handleLock}
        />
    )
}
