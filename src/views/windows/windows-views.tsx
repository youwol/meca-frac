import {FormCheck} from "react-bootstrap"
import React from "react"
import {useToggleViewsContext} from "../../context/toggle-views-context"


export function WindowsViews(){
    const {treeViewChecked,
        setTreeViewChecked,
        graphChecked,
        setGraphChecked,
        informationChecked,
        setInformationChecked,
        controlChecked,
        setControlChecked} = useToggleViewsContext()
    const handleTreeViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTreeViewChecked(event.target.checked)
    }
    const handleGraphChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGraphChecked(event.target.checked)

    }
    const handleInformationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInformationChecked(event.target.checked?? false)

    }
    const handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setControlChecked(event.target.checked)
    }

    return (
        <>
            <FormCheck
                className={'mx-3 py-1 '}
                style={{width: "max-content"}}
                id="custom-switch-treeView"
                label="Object"
                checked={treeViewChecked}
                onChange={handleTreeViewChange}

            >
            </FormCheck>
            <FormCheck
                className={'mx-3 py-1'}
                style={{width: "max-content"}}
                id="custom-switch-2D-graph"
                label="2D graph"
                checked={graphChecked}
                onChange={handleGraphChange}
            >
            </FormCheck>
            <FormCheck
                className={'mx-3 py-1'}
                style={{width: "max-content"}}
                id="custom-switch-Display"
                label="Display"
                checked={informationChecked}
                onChange={handleInformationChange}
            >
            </FormCheck>
            <FormCheck
                className={'mx-3 py-1'}
                style={{width: "max-content"}}
                id="custom-switch-Control"
                label="Control"
                checked={controlChecked}
                onChange={handleControlChange}
            >
            </FormCheck>
        </>
    )
}