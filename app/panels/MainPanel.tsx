import React, { useState, useCallback, DragEvent } from 'react';
import ReactFlow, {
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    ReactFlowInstance,
    Node,
    Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TextNode } from '../nodes/TextNodes';

let id = 0;
const getId = () => `dndnode_${id++}`;
// Custom Node Type
const nodeTypes = {
    textNode: TextNode
}

const MainPanel = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any> | undefined>();

    const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    /**
     * @description: On dropping Node in window add to list of Nodes
    */
    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type || !reactFlowInstance) {
            return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });
        const newNode: Node = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node`, msg: `text message ${id}` },
        };

        setNodes((nds) => nds.concat(newNode));
    };

    return (
        <div className="flex-grow h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default MainPanel;
