import { NavDropdown } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { loadObject } from '../../components/loaders/load-object'
import { useDataFrameContext } from '../../context/data-frames/data-frame-context'

export function UploadFiles() {
    const { setLoading, appendDataframeValue } = useDataFrameContext()
    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]

            try {
                setLoading(true)
                const buffer = await file.text()
                const dfs = await loadObject(file.name, buffer)
                appendDataframeValue(dfs)
            } catch (error) {
                console.error('Error loading object:', error)
            } finally {
                setLoading(false)
            }
        }
    }
    const openFileDialog = () => {
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = '.ts, .gcd'
        fileInput.addEventListener(
            'change',
            handleFileChange as unknown as EventListener,
        )

        fileInput.click()
    }
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'l') {
                openFileDialog()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <NavDropdown.Item
            className={'d-flex justify-content-between'}
            onClick={openFileDialog}
        >
            <div className={'me-5'}>Load Files</div>
            <div> Ctrl+L</div>
        </NavDropdown.Item>
    )
}
