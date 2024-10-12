import React, { memo, FC, useCallback } from 'react';
import { LiveCursors } from "@/Components/cursor/LiveCursors";
import { useMyPresence, useOthers } from "@/liveblocks.config";


export const Live: FC = memo(({}) => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault();

        const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    const handlePointerLeave = useCallback((e: React.PointerEvent) => {
        e.preventDefault();

        updateMyPresence({ cursor: null, message: null });
    }, []);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    return (
        <div
            className="h-screen w-full flex justify-center items-center text-center"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
        >
            <h1 className="text-2xl text-white">
                LiveBlocks app
            </h1>

            <LiveCursors others={others} />
        </div>
    );
});