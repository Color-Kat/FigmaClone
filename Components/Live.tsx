import React, { memo, FC, useCallback, useState, useEffect } from 'react';
import { LiveCursors } from "@/Components/cursor/LiveCursors";
import { useMyPresence, useOthers } from "@/liveblocks.config";
import { CursorChat } from "@/Components/cursor/CursorChat";
import { CursorMode, CursorState } from "@/types/type";


export const Live: FC = memo(({}) => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    });

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault();

        const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    const handlePointerLeave = useCallback((e: React.PointerEvent) => {
        setCursorState({ mode: CursorMode.Hidden });

        updateMyPresence({ cursor: null, message: null });
    }, []);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === '/')
                setCursorState({
                    mode           : CursorMode.Chat,
                    previousMessage: null,
                    message        : ''
                });

            else if (e.key === 'Escape'){
                updateMyPresence({ message: null });
                setCursorState({
                    mode           : CursorMode.Hidden,
                });
            }
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') e.preventDefault();
        }

        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [updateMyPresence]);

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

            {cursor && (
                <CursorChat
                    cursor={cursor}
                    cursorState={cursorState}
                    setCursorState={setCursorState}
                    updateMyPresence={updateMyPresence}
                />
            )}

            <LiveCursors others={others} />
        </div>
    );
});