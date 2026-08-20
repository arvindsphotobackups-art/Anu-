const INK = "#1a1a1a";
const CORAL = "#c76d63";
const PAPER = "#f5f2eb";

const Face = ({ expr, cx, cy }) => {
    const eyeY = cy - 3;
    switch (expr) {
        case "shy":
        case "love":
            return (
                <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
                    <path d={`M${cx - 12} ${eyeY} q4 5 8 0`} />
                    <path d={`M${cx + 4} ${eyeY} q4 5 8 0`} />
                    <path d={`M${cx - 6} ${cy + 10} q6 6 12 0`} />
                    {expr === "love" && (
                        <path
                            d={`M${cx + 16} ${cy + 6} c-2-3-7-1-6 3 c1 3 6 5 6 5 c0 0 5-2 6-5 c1-4-4-6-6-3z`}
                            fill={CORAL}
                            stroke="none"
                            opacity="0.85"
                        />
                    )}
                </g>
            );
        case "shock":
            return (
                <g stroke={INK} strokeWidth="2.4" fill="none">
                    <circle cx={cx - 8} cy={eyeY} r="2.6" fill={INK} stroke="none" />
                    <circle cx={cx + 8} cy={eyeY} r="2.6" fill={INK} stroke="none" />
                    <ellipse cx={cx} cy={cy + 11} rx="4" ry="5.5" />
                </g>
            );
        case "sad":
            return (
                <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
                    <path d={`M${cx - 13} ${eyeY - 6} l7 3`} />
                    <path d={`M${cx + 13} ${eyeY - 6} l-7 3`} />
                    <circle cx={cx - 8} cy={eyeY} r="2" fill={INK} stroke="none" />
                    <circle cx={cx + 8} cy={eyeY} r="2" fill={INK} stroke="none" />
                    <path d={`M${cx - 6} ${cy + 13} q6 -5 12 0`} />
                </g>
            );
        case "nervous":
            return (
                <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
                    <circle cx={cx - 8} cy={eyeY} r="2" fill={INK} stroke="none" />
                    <circle cx={cx + 8} cy={eyeY} r="2" fill={INK} stroke="none" />
                    <path d={`M${cx - 7} ${cy + 11} q3 3 6 0 q3 -3 6 0`} />
                    <path d={`M${cx - 20} ${cy + 2} q2 4 0 7`} opacity="0.6" />
                </g>
            );
        default:
            return (
                <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
                    <circle cx={cx - 8} cy={eyeY} r="2.2" fill={INK} stroke="none" />
                    <circle cx={cx + 8} cy={eyeY} r="2.2" fill={INK} stroke="none" />
                    <path d={`M${cx - 6} ${cy + 9} q6 7 12 0`} />
                </g>
            );
    }
};

export const Boy = ({ expr = "smile", flip = false, className = "", style }) => (
    <svg
        viewBox="0 0 120 175"
        className={className}
        style={{ ...(flip ? { transform: "scaleX(-1)" } : {}), ...style }}
        aria-label="him"
    >
        <g filter="url(#inkRough)" stroke={INK} strokeWidth="3" strokeLinecap="round">
            <path d="M38 84 q22 -13 44 0 l9 62 q-31 10 -62 0 z" fill={PAPER} />
            <path d="M46 84 l14 12 l14 -12" fill="none" />
            <path d="M38 90 q-10 20 -6 42" fill="none" />
            <path d="M82 90 q10 20 6 42" fill="none" />
            <circle cx="60" cy="48" r="26" fill={PAPER} />
            <path
                d="M33 46 q-1 -27 27 -27 q28 0 27 27 q-6 -14 -14 -11 q-4 -12 -15 -7 q-12 -5 -25 18 z"
                fill={INK}
                stroke="none"
            />
            <Face expr={expr} cx={60} cy={48} />
        </g>
    </svg>
);

export const Girl = ({ expr = "smile", flip = false, className = "", style }) => (
    <svg
        viewBox="0 0 120 185"
        className={className}
        style={{ ...(flip ? { transform: "scaleX(-1)" } : {}), ...style }}
        aria-label="her"
    >
        <g filter="url(#inkRough)" stroke={INK} strokeWidth="3" strokeLinecap="round">
            <path
                d="M31 52 q-4 -34 29 -34 q33 0 29 34 q6 40 10 72 q-9 9 -17 2 q3 -36 -1 -54 l-42 0 q-4 18 -1 54 q-8 7 -17 -2 q4 -32 10 -72 z"
                fill={INK}
                stroke="none"
            />
            <circle cx="60" cy="50" r="24" fill={PAPER} />
            <path d="M36 48 q0 -26 24 -26 q24 0 24 26 q-10 -14 -24 -14 q-14 0 -24 14 z" fill={INK} stroke="none" />
            <rect x="76" y="30" width="9" height="5" rx="2" fill={CORAL} stroke="none" transform="rotate(18 80 32)" />
            <Face expr={expr} cx={60} cy={50} />
            <path d="M40 96 q20 -11 40 0 l11 60 q-31 11 -62 0 z" fill={PAPER} />
            <path d="M40 102 q-9 20 -5 40" fill="none" />
            <path d="M80 102 q9 20 5 40" fill="none" />
        </g>
    </svg>
);

export const InkDoodle = ({ kind = "heart", className = "", style }) => {
    if (kind === "heart")
        return (
            <svg viewBox="0 0 24 24" className={className} style={style}>
                <path
                    d="M12 20 c-6-4-9-7.5-9-11 c0-3 2.5-5 5-5 c1.8 0 3.2 1 4 2.4 c0.8-1.4 2.2-2.4 4-2.4 c2.5 0 5 2 5 5 c0 3.5-3 7-9 11z"
                    fill="none"
                    stroke={CORAL}
                    strokeWidth="1.8"
                    filter="url(#inkRough)"
                />
            </svg>
        );
    if (kind === "arrow")
        return (
            <svg viewBox="0 0 60 30" className={className} style={style}>
                <path
                    d="M4 26 q20 -22 44 -16 m0 0 l-8 -3 m8 3 l-4 7"
                    fill="none"
                    stroke={INK}
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#inkRough)"
                />
            </svg>
        );
    return (
        <svg viewBox="0 0 24 24" className={className} style={style}>
            <path
                d="M12 2 l2.4 6.4 l6.6 0.4 l-5.2 4.2 l1.8 6.4 l-5.6 -3.8 l-5.6 3.8 l1.8 -6.4 l-5.2 -4.2 l6.6 -0.4 z"
                fill="none"
                stroke={INK}
                strokeWidth="1.6"
                filter="url(#inkRough)"
            />
        </svg>
    );
};
