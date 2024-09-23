import React, { useState, ReactNode, ReactElement } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'

interface CustomPopoverProps {
    trigger: ReactNode
    title?: string
    content: ReactNode
    closeIcon?: ReactNode
    popoverId: string
}

export function CustomPopover({
    trigger,
    title,
    content,
    closeIcon,
    popoverId,
}: CustomPopoverProps) {
    const [showPopover, setShowPopover] = useState(false)

    const togglePopover = () => setShowPopover(!showPopover)

    const popover = (
        <Popover id={popoverId} className={'mh-50'}>
            <Popover.Header
                as="h3"
                className="d-flex justify-content-between align-items-center"
            >
                {title ?? 'Information'}
                {closeIcon ?? (
                    <i
                        className="fas fa-times"
                        onClick={togglePopover}
                        role={'none'}
                    />
                )}
            </Popover.Header>
            <Popover.Body className={'overflow-auto'}>
                <div className={'overflow-auto'}>{content}</div>
            </Popover.Body>
        </Popover>
    )

    return (
        <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={popover}
            show={showPopover}
            rootClose
            onToggle={togglePopover}
        >
            {trigger as ReactElement}
        </OverlayTrigger>
    )
}
