import React, { useState } from 'react'
import { useEdges, useNodes } from 'reactflow';

const TaskbarPanel = () => {
    const [invalidNodes, setState] = useState(false);

    const edges = useEdges();
    const nodes = useNodes();

    // check if all nodes have edges
    const onClick = () => {
        if (nodes.length !== 1) {
            const validNodes = nodes.filter(node => {
                const flag = edges.find(edge => edge.source === node.id || edge.target === node.id);
                return (flag);
            })
            if (validNodes.length !== nodes.length) setState(true)
            else setState(false)
        }
        else setState(false);
    }

    return (
        <div className="bg-slate-100 w-full flex-[1] flex justify-end align-middle px-8 py-2">
            <div className={`${invalidNodes ? 'visible' : 'invisible'} bg-red-300 rounded font-bold p-2 mx-auto`}>Cannot save Flow</div>
            <button onClick={onClick} className="border px-4 py-1 border-blue-700 text-blue-700 rounded-md active:bg-blue-600 active:text-white">Save Changes</button>
        </div>
    )
}

export default TaskbarPanel