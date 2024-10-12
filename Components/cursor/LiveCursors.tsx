import React, {memo, FC} from 'react';
import { LiveCursorProps } from "@/types/type";
import { Cursor } from "@/Components/cursor/Cursor";
import { COLORS } from "@/constants";

interface LiveCursorsProps {
    others: LiveCursorProps['others']
}

export const LiveCursors: FC<LiveCursorsProps> = ({
    others
}) => {
    return others.map(({connectionId, presence}) => {
        if(!presence?.cursor) return null;

        return (
            <Cursor
                key={connectionId}
                color={COLORS[Number(connectionId) % COLORS.length]}
                x={presence.cursor.x}
                y={presence.cursor.y}
                message={presence.message}
            />
        );
    });
}