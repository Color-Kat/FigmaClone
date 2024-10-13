import React, { memo, FC } from 'react';
import CursorSVG from "@/public/assets/CursorSVG";

interface CursorProps {
    x: number;
    y: number;
    color: string;
    message: string;
}

export const Cursor: FC<CursorProps> = memo(({
    color,
    x,
    y,
    message
}) => {


    return (
        <div
            className="pointer-events-none absolute top-0 left-0"
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
        >
            <CursorSVG color={color} />

            {/*    Message    */}
            {message && (
                <div
                    className="absolute left-2 top-5 rounded-3xl px-4 py-2"
                    style={{
                        background: color
                    }}
                >
                    <p
                        className="text-white whitespace-nowrap text-sm leading-relaxed"
                    >{message}</p>
                </div>
            )}
        </div>
    );
});