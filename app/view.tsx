import React, { useState } from 'react'
import MainPanel from './panels/MainPanel'
import { NodePanel } from './panels/NodePanel'
import { useOnSelectionChange } from 'reactflow'
import Settingpanel from './panels/Settingpanel'
import TaskbarPanel from './panels/TaskbarPanel'

export const View = () => {
    const [nodeSelected, setNodeSelected] = useState(false);    

    // toggle state if node selected
    useOnSelectionChange({
        onChange: ({ nodes }) => {
            setNodeSelected(nodes.length === 1);
        }
    })

    return (
        <>
            <TaskbarPanel />
            <div className="w-full flex-[19] flex flex-column h-full">
                <MainPanel />
                <div className="w-[20%] bg-slate-50 border-l">
                    {nodeSelected ? <Settingpanel /> : <NodePanel />}
                </div>
            </div>
        </>
    )
}