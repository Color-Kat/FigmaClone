import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { LiveCursors } from "@/Components/cursor/LiveCursors";
import { useMyPresence, useOthers } from "@/liveblocks.config";
import { CursorChat } from "@/Components/cursor/CursorChat";
import { CursorMode, CursorState, Reaction } from "@/types/type";
import { ReactionSelector } from "@/Components/reactions/ReactionButton";


export const Live: FC = memo(({}) => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    });

    const [reaction, setReaction] = useState<Reaction[]>([]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault();

        if(cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
            const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
            const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

            updateMyPresence({ cursor: { x, y } });
        }
    }, []);

    const handlePointerLeave = useCallback((e: React.PointerEvent) => {
        setCursorState({ mode: CursorMode.Hidden });

        updateMyPresence({ cursor: null, message: null });
    }, []);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });

        setCursorState((prev) =>  (
            cursorState.mode == CursorMode.Reaction
                ? {...prev, isPressed: true}
                : prev
        ));
    }, [cursorState.mode, setCursorState]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        setCursorState((prev) =>  (
            cursorState.mode == CursorMode.Reaction
                ? {...prev, isPressed: true}
                : prev
        ));
    }, [cursorState.mode, setCursorState]);

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === '/')
                setCursorState({
                    mode           : CursorMode.Chat,
                    previousMessage: null,
                    message        : ''
                });

            else if (e.key === 'Escape') {
                updateMyPresence({ message: null });
                setCursorState({
                    mode: CursorMode.Hidden,
                });
            }

            else if (e.key === 'e') {
                setCursorState({
                    mode: CursorMode.ReactionSelector,
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

    const setReactions = useCallback((reaction: string) => {
        setCursorState({
            mode: CursorMode.Reaction,
            reaction,
            isPressed: false
        })
    }, []);

    return (
        <div
            className="h-screen w-full flex justify-center items-center text-center"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            <div className="max-w-sm text-center flex flex-col">
                <h1 className="text-2xl text-white">
                    LiveBlocks app
                </h1>

                <ul className="mt-4 flex items-center justify-center space-x-2">
                    <li className="flex items-center space-x-2 rounded-md bg-gray-100 py-2 px-3 text-sm">
                        <span>Reactions</span>
                        <span className="block rounded border border-gray-300 px-1 text-xs font-medium uppercase text-gray-500">
                            E
                          </span>
                    </li>

                    <li className="flex items-center space-x-2 rounded-md bg-gray-100 py-2 px-3 text-sm">
                        <span>Chat</span>
                        <span className="block rounded border border-gray-300 px-1 text-xs font-medium uppercase text-gray-500">
                            /
                          </span>
                    </li>

                    <li className="flex items-center space-x-2 rounded-md bg-gray-100 py-2 px-3 text-sm">
                        <span>Escape</span>
                        <span className="block rounded border border-gray-300 px-1 text-xs font-medium uppercase text-gray-500">
                            esc
                          </span>
                    </li>
                </ul>
            </div>

            {cursor && (
                <CursorChat
                    cursor={cursor}
                    cursorState={cursorState}
                    setCursorState={setCursorState}
                    updateMyPresence={updateMyPresence}
                />
            )}

            {cursorState.mode === CursorMode.ReactionSelector && (
                <ReactionSelector setReaction={setReactions} />
            )}

            <LiveCursors others={others} />
        </div>
    );
});