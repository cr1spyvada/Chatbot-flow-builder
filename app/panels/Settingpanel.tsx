import React, { useEffect, useMemo, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useReactFlow } from 'reactflow'

const Settingpanel = () => {
    const [editedMsg, setMsg] = useState('');
    const reactFlow = useReactFlow();
    const nodes = reactFlow.getNodes();

    // Update Local state of text message
    const onChange = (e: any) => {
        e.preventDefault();
        const newMsg = e.target.value
        setMsg(newMsg)
    }

    // Get Selected Node Data
    const getNodeData = useMemo((): string => {
        const filteredNode = nodes.find(node => node.selected);
        if (filteredNode) return filteredNode.data.msg;
        else return ''
    }, [nodes]);

    useEffect(() => {
        setMsg(getNodeData);
    }, [])

    // On update of text message, update node data
    useEffect(() => {
        const newNodes = nodes.map(node => {
            if (node.selected) node.data.msg = editedMsg;
            return node;
        })
        reactFlow.setNodes(newNodes)
    }, [editedMsg])

    return (
        <aside className='h-full text-xs bg-slate-50 text-purple-900'>
            <div className="flex text-black border px-2 py-1">
                <FaArrowLeft />
                <div className="mx-auto">Message</div>
            </div>
            <div className="border p-2">
                <div className="pt-3 pb-2">Text</div>
                <textarea className='w-full border p-2 rounded' onChange={onChange} value={editedMsg} />
            </div>
        </aside>
    )
}

export default Settingpanel