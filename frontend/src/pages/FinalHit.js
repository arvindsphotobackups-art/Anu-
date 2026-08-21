import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
    { lines: ["Okay. One last thing."] },
    { photo: true },
    { lines: ["I don't think you realize how much of you I carry around with me."] },
    {
        lines: [
            "The things you say without thinking.",
            "The way you laugh.",
            "The stupid things you send me.",
            "The way you get scared and still do the thing anyway.",
            "The way you can be completely childish one minute and the person I need the next.",
        ],
    },
    {
        lines: [
            "I used to think the big moments were what mattered.",
            "But when I think about us, it's always the little things I remember first.",
        ],
    },
    {
        lines: [
            "The late nights.",
            "The random pictures.",
            "The reels.",
            "The flirting.",
            "The stupid conversations.",
            "Your hand around my fingers at Wonderla.",
            "You sitting in my lap.",
            "All those ordinary moments that somehow became mine.",
        ],
    },
    { lines: ["You didn't just become part of my life."] },
    { lines: ["You became part of how I imagine my life."], hold: true },
    {
        lines: [
            "If there are things I haven't said enough…",
            "If there are things I haven't shown enough…",
            "If there were moments when you wondered whether I cared…",
        ],
    },
    { lines: ["I did.", "I do."], strong: true },
    {
        lines: [
            "I don't know what our next chapters are going to look like.",
            "But after everything we've already lived…",
            "I still want to find out with you.",
        ],
    },
    { lines: ["I love you."], big: true },
    { stars: true, lines: ["This was always for you."] },
];

const CODA = [
    "Remember that girl who had a crush on me in the library?",
    "I wish I could go back and tell that idiot how lucky he was.",
    "He just didn't know it yet.",
];

const EDGE = [
    { l: 5, t: 12, r: -3 }, { l: 78, t: 10, r: 2 }, { l: 3, t: 36, r: 2 },
    { l: 80, t: 34, r: -2 }, { l: 6, t: 60, r: -1 }, { l: 79, t: 58, r: 3 },
    { l: 9, t: 82, r: 2 }, { l: 76, t: 80, r: -3 }, { l: 30, t: 4, r: 1 },
    { l: 60, t: 5, r: -1 }, { l: 2, t: 78, r: 1 }, { l: 84, t: 78, r: -1 },
    { l: 44, t: 3, r: 2 },
];

const ASSEMBLE = [
    { l: 10, t: 12, r: -2 }, { l: 42, t: 60, r: -1 }, { l: 6, t: 36, r: 2 },
    { l: 76, t: 4, r: 2 }, { l: 76, t: 34, r: -2 }, { l: 6, t: 64, r: -1 },
    { l: 72, t: 62, r: 1 }, { l: 16, t: 84, r: 2 }, { l: 24, t: 4, r: 1 },
    { l: 56, t: 4, r: -1 }, { l: 56, t: 86, r: -2 }, { l: 82, t: 82, r: 2 },
    { l: 40, t: 88, r: 0 },
];

const MOBILE_ASSEMBLE = [
    { l: 3, t: 2, r: -2 },
    { l: 32, t: 8, r: -1 },
    { l: 52, t: 2, r: 2 },
    { l: 3, t: 22, r: -1 },
    { l: 3, t: 37, r: 2 },
    { l: 52, t: 22, r: -1 },
    { l: 3, t: 43, r: 2 },
    { l: 52, t: 50, r: -2 },
    { l: 52, t: 41, r: 1 },
    { l: 3, t: 47, r: -1 },
    { l: 3, t: 57, r: -2 },
    { l: 3, t: 53, r: 2 },
    { l: 52, t: 54, r: 0 },
];

const Fragment = ({ s, i, assembled, isMobile }) => {
    const pos = assembled ? (isMobile ? MOBILE_ASSEMBLE[i] : ASSEMBLE[i]) : EDGE[i];
    return (
        <motion.div
            data-testid={`final-fragment-${i}`}
            className="absolute z-[5] max-w-[46vw] md:max-w-[210px]"
            initial={{ opacity: 0, left: `${EDGE[i].l}%`, top: `${EDGE[i].t}%`, rotate: EDGE[i].r }}
            animate={{ opacity: assembled ? 0.92 : 0.6, left: `${pos.l}%`, top: `${pos.t}%`, rotate: pos.r }}
            transition={{
                duration: assembled ? 2.8 : 1.6,
                delay: assembled ? 0.3 + i * 0.16 : 0,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div className="fragment-float" style={{ animationDelay: `${i * 0.65}s` }}>
                {s.photo ? (
                    <div className="border border-[#f5f2eb]/15 bg-[#0a0a0c] p-1">
                        <img
                            src="/images/final/final_photo.jpeg"
                            alt="us"
                            className={`transition-all duration-[2500ms] ${assembled ? "w-32 md:w-44" : "w-14 md:w-20"}`}
                        />
                    </div>
                ) : (
                    s.lines.map((l, j) => (
                        <p
                            key={j}
                            className={`f-serif font-light leading-snug transition-all duration-[2500ms] ${
                                assembled
                                    ? "text-xs text-[#fdfbf7]/80 md:text-sm"
                                    : "text-[10px] text-[#fdfbf7]/45 md:text-xs"
                            }`}
                        >
                            {l}
                        </p>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default function FinalHit() {
    const [step, setStep] = useState(0);
    const [assembled, setAssembled] = useState(false);
    const [codaOpen, setCodaOpen] = useState(false);
    const [codaIdx, setCodaIdx] = useState(0);
    const [ended, setEnded] = useState(false);
    const [isMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);

    const stars = useMemo(
        () =>
            Array.from({ length: 60 }, () => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 1.6 + 0.6,
                delay: Math.random() * 8,
                dur: 3 + Math.random() * 3,
            })),
        [],
    );

    const current = STEPS[step];
    const isLast = step === STEPS.length - 1;
    const showStars = assembled || ended || STEPS.slice(0, step + 1).some((s) => s.stars);

    const advance = () => {
        if (ended) return;
        if (codaOpen) {
            if (codaIdx < CODA.length - 1) setCodaIdx((c) => c + 1);
            else setEnded(true);
            return;
        }
        if (assembled) return;
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    };

    useEffect(() => {
        if (!isLast) return undefined;
        const t = setTimeout(() => setAssembled(true), 5200);
        return () => clearTimeout(t);
    }, [isLast]);

    const done = STEPS.slice(0, step);

    return (
        <div
            data-testid="final-page"
            onClick={advance}
            className={`relative min-h-screen w-full cursor-pointer overflow-x-hidden bg-[#030305] px-6 ${
                assembled ? "overflow-y-auto" : "flex items-center justify-center overflow-hidden"
            }`}
        >
            {/* stars appear near the end */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-[4000ms]"
                style={{ opacity: showStars || ended ? 1 : 0 }}
            >
                {stars.map((s, i) => (
                    <span
                        key={i}
                        className="anim-twinkle absolute rounded-full bg-[#fdfbf7]"
                        style={{
                            left: `${s.left}%`,
                            top: `${s.top}%`,
                            width: s.size,
                            height: s.size,
                            animationDelay: `${s.delay}s`,
                            animationDuration: `${s.dur}s`,
                        }}
                    />
                ))}
            </div>

            {/* tall canvas so the composition breathes on phones */}
            {assembled && isMobile && <div className="h-[170vh]" aria-hidden="true" />}

            {/* accumulated fragments of the story, hanging around the edges */}
            {done.map((s, i) => (
                <Fragment key={i} s={s} i={i} assembled={assembled} isMobile={isMobile} />
            ))}

            {/* current message, one at a time */}
            <AnimatePresence mode="wait">
                {!assembled && !codaOpen && !ended && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 max-w-2xl text-center"
                        data-testid={`final-step-${step}`}
                    >
                        {current.photo ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                                className="mx-auto w-64 border border-[#f5f2eb]/12 p-2 sm:w-80"
                                data-testid="final-photo"
                            >
                                <img
                                    src="/images/final/final_photo.jpeg"
                                    alt="us"
                                    className="w-full object-cover"
                                    style={{ filter: "brightness(0.9)" }}
                                />
                            </motion.div>
                        ) : (
                            <div className="space-y-4">
                                {current.lines.map((l, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1.2, delay: 0.5 + i * (current.hold ? 1.8 : 0.9) }}
                                        className={
                                            current.big
                                                ? "f-serif text-5xl font-light text-[#fdfbf7] sm:text-6xl"
                                                : current.strong
                                                  ? "f-serif text-3xl font-light text-[#fdfbf7] sm:text-4xl"
                                                  : "f-serif text-2xl font-light leading-relaxed text-[#fdfbf7]/90 sm:text-3xl"
                                        }
                                    >
                                        {l}
                                    </motion.p>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* the final assembly: everything returns to form one page */}
            {assembled && (!codaOpen || ended) && (
                <motion.div
                    initial={{ opacity: 0, y: 18, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    transition={{ duration: 2.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-[5%] z-10 w-full max-w-2xl px-6 text-center md:top-[20%]"
                    data-testid="final-assembly"
                >
                    <p className="f-serif text-4xl font-light text-[#fdfbf7] sm:text-5xl">
                        This was always for you.
                    </p>
                    {/* quiet references to the earlier chapters */}
                    <div className="mt-7 flex items-center justify-center gap-6 opacity-60">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                            <path d="M12 2 l2.4 6.4 l6.6 0.4 l-5.2 4.2 l1.8 6.4 l-5.6 -3.8 l-5.6 3.8 l1.8 -6.4 l-5.2 -4.2 l6.6 -0.4 z" fill="none" stroke="#d4af37" strokeWidth="1.4" />
                        </svg>
                        <div className="tape" style={{ position: "relative", width: 34, height: 12 }} />
                        <svg viewBox="0 0 28 20" className="h-4 w-6">
                            <rect x="1" y="1" width="26" height="18" rx="1" fill="none" stroke="#f5f2eb" strokeWidth="1.4" />
                            <path d="M1 1 l13 11 l13 -11" fill="none" stroke="#f5f2eb" strokeWidth="1.4" />
                        </svg>
                        <svg viewBox="0 0 40 16" className="h-4 w-9">
                            <path d="M4 12 Q20 2 36 10" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="2 3" />
                            <circle cx="4" cy="12" r="1.6" fill="#f5ecd7" />
                            <circle cx="36" cy="10" r="1.6" fill="#f5ecd7" />
                        </svg>
                    </div>
                </motion.div>
            )}

            {assembled && !codaOpen && !ended && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5, duration: 2 }}
                    data-testid="final-one-last-thing"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCodaOpen(true);
                    }}
                    className="f-hand absolute bottom-[7%] left-1/2 z-20 -translate-x-1/2 text-xl text-[#a1a1a6] underline decoration-[#d4af37]/25 underline-offset-8 transition-colors duration-500 hover:text-[#f5ecd7] max-md:bottom-auto max-md:top-[66%]"
                >
                    one last thing…
                </motion.button>
            )}

            {/* coda, over the dimmed composition */}
            <AnimatePresence mode="wait">
                {codaOpen && !ended && (
                    <motion.p
                        key={`coda-${codaIdx}`}
                        initial={{ opacity: 0, x: "-50%", y: "-40%" }}
                        animate={{ opacity: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, x: "-50%", y: "-60%" }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        className="f-serif fixed left-1/2 top-1/2 z-30 w-full max-w-xl rounded-sm bg-[#030305]/70 px-6 py-10 text-center text-2xl font-light italic leading-relaxed text-[#fdfbf7] backdrop-blur-[2px] sm:text-3xl"
                        data-testid={`final-coda-${codaIdx}`}
                    >
                        {CODA[codaIdx]}
                    </motion.p>
                )}
            </AnimatePresence>

            {ended && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                    className="f-ui fixed bottom-[7%] left-1/2 z-30 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-[#a1a1a6]/60"
                    data-testid="final-end"
                >
                    — end —
                </motion.p>
            )}

            {/* hint */}
            {!isLast && !codaOpen && !ended && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0.5, 0] }}
                    transition={{ duration: 5, times: [0, 0.2, 0.8, 1], repeat: Infinity }}
                    className="f-ui absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[#a1a1a6]"
                >
                    tap to continue
                </motion.p>
            )}
        </div>
    );
}
