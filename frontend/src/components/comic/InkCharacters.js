const INK = "#1a1a1a";
const CORAL = "#c76d63";
const GOLD = "#d4af37";
const PAPER = "#f5f2eb";

const BoyFace = ({ expr, cx, cy }) => {
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

const GirlFace = ({ expr, cx, cy }) => {
    const eyeY = cy - 3;
    switch (expr) {
        case "shy":
        case "love":
            return (
                <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
                    <path d={`M${cx - 13} ${eyeY} q4 5 8 0`} />
                    <path d={`M${cx + 5} ${eyeY} q4 5 8 0`} />
                    <path d={`M${cx - 8} ${cy + 9} q8 8 16 0`} />
                    {expr === "love" && (
                        <path
                            d={`M${cx + 15} ${cy + 5} c-2-3-7-1-6 3 c1 3 6 5 6 5 c0 0 5-2 6-5 c1-4-4-6-6-3z`}
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
                    <ellipse cx={cx} cy={cy + 10} rx="4" ry="5.5" />
                </g>
            );
        case "sad":
            return (
                <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
                    <path d={`M${cx - 13} ${eyeY - 6} l7 3`} />
                    <path d={`M${cx + 13} ${eyeY - 6} l-7 3`} />
                    <circle cx={cx - 8} cy={eyeY} r="2" fill={INK} stroke="none" />
                    <circle cx={cx + 8} cy={eyeY} r="2" fill={INK} stroke="none" />
                    <path d={`M${cx - 6} ${cy + 12} q6 -5 12 0`} />
                </g>
            );
        case "nervous":
            return (
                <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
                    <circle cx={cx - 8} cy={eyeY} r="2" fill={INK} stroke="none" />
                    <circle cx={cx + 8} cy={eyeY} r="2" fill={INK} stroke="none" />
                    <path d={`M${cx - 7} ${cy + 10} q3 3 6 0 q3 -3 6 0`} />
                </g>
            );
        default:
            // her signature bright open smile
            return (
                <g>
                    <circle cx={cx - 8} cy={eyeY} r="2.2" fill={INK} />
                    <circle cx={cx + 8} cy={eyeY} r="2.2" fill={INK} />
                    <path
                        d={`M${cx - 11} ${cy + 6} Q${cx} ${cy + 18} ${cx + 11} ${cy + 6} Q${cx + 5.5} ${cy + 16} ${cx} ${cy + 16} Q${cx - 5.5} ${cy + 16} ${cx - 11} ${cy + 6} Z`}
                        fill={INK}
                    />
                    <path
                        d={`M${cx - 9} ${cy + 7.5} Q${cx} ${cy + 13} ${cx + 9} ${cy + 7.5}`}
                        stroke={PAPER}
                        strokeWidth="1.5"
                        fill="none"
                    />
                </g>
            );
    }
};

const Jhumka = ({ x, y }) => (
    <g stroke="none" fill={GOLD}>
        <circle cx={x} cy={y} r="1.7" />
        <path d={`M${x - 2.6} ${y + 3.2} q2.6 -2.4 5.2 0 l-0.9 4.6 q-1.7 1.5 -3.4 0 z`} />
        <circle cx={x} cy={y + 9.2} r="0.9" />
    </g>
);

export const Boy = ({ expr = "smile", flip = false, className = "", style }) => (
    <svg
        viewBox="0 0 120 175"
        className={className}
        style={{ ...(flip ? { transform: "scaleX(-1)" } : {}), ...style }}
        aria-label="him"
    >
        <g filter="url(#inkRough)">
            <circle cx="60" cy="48" r="26" fill={PAPER} stroke={INK} strokeWidth="3" />
            {/* messy tousled hair */}
            <path
                d="M33 52 q-7 -40 28 -42 q34 -2 29 42 l-7 1 q3 -13 -2 -19 q-7 -7 -13 -5 q-5 -7 -11 -5 q-9 -2 -14 6 q-6 7 -3 22 z"
                fill={INK}
                stroke="none"
            />
            <g stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none">
                <path d="M47 33 q-2 7 -5 10" />
                <path d="M60 29 q1 8 -2 11" />
                <path d="M72 33 q3 7 1 11" />
            </g>
            {/* light stubble + mustache */}
            <path d="M38 55 q5 16 22 18 q17 -2 22 -18" stroke={INK} strokeWidth="2" opacity="0.7" fill="none" />
            {expr !== "shock" && (
                <path d="M51 54 q9 4 18 0" stroke={INK} strokeWidth="2.4" fill="none" />
            )}
            <BoyFace expr={expr} cx={60} cy={48} />
            {/* collared shirt */}
            <path d="M38 88 q22 -14 44 0 l9 60 q-31 10 -62 0 z" fill={PAPER} stroke={INK} strokeWidth="3" />
            <path d="M48 85 l12 13 l12 -13" fill="none" stroke={INK} strokeWidth="3" />
            <path d="M60 98 v42" stroke={INK} strokeWidth="2" />
            <circle cx="60" cy="112" r="1.5" fill={INK} stroke="none" />
            <circle cx="60" cy="126" r="1.5" fill={INK} stroke="none" />
            <path d="M38 94 q-10 20 -6 42" fill="none" stroke={INK} strokeWidth="3" />
            <path d="M82 94 q10 20 6 42" fill="none" stroke={INK} strokeWidth="3" />
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
        <g filter="url(#inkRough)">
            {/* long wavy hair strands */}
            <g fill={INK} stroke="none">
                <path d="M35 46 q-10 34 -6 68 q1 14 -3 26 l14 2 q4 -12 2 -27 q-1 -30 2 -56 z" />
                <path d="M85 46 q10 34 6 68 q-1 14 3 26 l-14 2 q-4 -12 -2 -27 q1 -30 -2 -56 z" />
            </g>
            <circle cx="60" cy="50" r="24" fill={PAPER} stroke={INK} strokeWidth="3" />
            {/* side-parted sweep */}
            <path
                d="M37 48 q-3 -24 23 -26 q26 -2 24 26 q-6 -14 -18 -15 q-6 8 -14 9 q-9 1 -15 6 z"
                fill={INK}
                stroke="none"
            />
            <GirlFace expr={expr} cx={60} cy={50} />
            <Jhumka x={35} y={55} />
            <Jhumka x={85} y={55} />
            {/* top */}
            <path d="M40 98 q20 -11 40 0 l11 58 q-31 11 -62 0 z" fill={PAPER} stroke={INK} strokeWidth="3" />
            <path d="M40 104 q-9 20 -5 40" fill="none" stroke={INK} strokeWidth="3" />
            <path d="M80 104 q9 20 5 40" fill="none" stroke={INK} strokeWidth="3" />
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
