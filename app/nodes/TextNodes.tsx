import React, { useMemo } from 'react'
import { Handle, HandleProps, NodeProps, Position, getConnectedEdges, getOutgoers, useNodeId, useStore } from 'reactflow'
import Image from 'next/image'
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';

const TextNodeThumb = ({ onDragStart }: any) => {
    return (
        <div
            className="px-16 py-8 border-purple-900 rounded mb-3 flex justify-center align-middle cursor-grab border"
            onDragStart={(event) => onDragStart(event, "textNode")}
            draggable
        >
            Message
        </div>
    );
}

const selector = (s: any) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

const TextNode = ({ data, isConnectable }: NodeProps) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    /** 
     * @description: If source already has an edge then not connectable
    */
    const isHandleConnectable = useMemo(() => {
        const node = nodeInternals.get(nodeId);
        const connectedEdges = getConnectedEdges([node], edges);
        const filter = connectedEdges.filter(edge => edge.source === nodeId)
        if (filter.length >= 1) return false;
        else return isConnectable;
    }, [nodeInternals, edges, nodeId, isConnectable]);

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
            />
            <div className="rounded text-black border border-black min-w-72 bg-white">
                <div className="w-full bg-teal-200 flex gap-1 justify-between items-center py-1 px-3">
                    <BiMessageRoundedDetail size={'0.85rem'} />
                    <div className="mr-auto font-medium">
                        Send Message
                    </div>
                    <BsWhatsapp size={'0.65rem'} />

                </div>
                <div className="p-3 py-1">
                    {data.msg}
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isHandleConnectable}
            />
        </>
    )
}

export { TextNode, TextNodeThumb }