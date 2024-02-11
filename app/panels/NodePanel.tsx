import React, { DragEvent } from 'react';
import { TextNodeThumb } from '../nodes/TextNodes';

export const NodePanel = () => {
    /**
     * @description use DragEvent API to share node type
     */
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/reactflow', nodeType);
            event.dataTransfer.effectAllowed = 'move';
        }
    };

    const nodeStyle = "h-5 p-1 border-purple-900 rounded-sm mb-3 flex justify-center align-middle cursor-grab"
    return (
        <aside className='border-r-[1px] border-slate-200 text-xs bg-slate-50 text-purple-900'>
            <TextNodeThumb onDragStart={onDragStart} />
        </aside>
    );
};
