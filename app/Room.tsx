"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children }: { children: ReactNode }) {
    const apiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!;

    console.log(apiKey);

    return (
        <LiveblocksProvider publicApiKey={apiKey}>
            <RoomProvider id="my-room">
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}