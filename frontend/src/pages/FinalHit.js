import { useMemo, useState } from "react";
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

export default function FinalHit() {
    const [step, setStep] = useState(0);
    const [codaOpen, setCodaOpen] = useState(false);
    const [codaIdx, setCodaIdx] = useState(0);
    const [ended, setEnded] = useState(false);

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
    const showStars = STEPS.slice(0, step + 1).some((s) => s.stars);

    const advance = () => {
        if (ended) return;
        if (codaOpen) {
            if (codaIdx < CODA.length - 1) setCodaIdx((c) => c + 1);
            else setEnded(true);
            return;
        }
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    };

    return (
        <div
            data-testid="final-page"
            onClick={advance}
            className="relative flex min-h-screen w-full cursor-pointer items-center justify-center overflow-hidden bg-[#030305] px-6"
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

            <AnimatePresence mode="wait">
                {!codaOpen && !ended && (
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
                                    src="/images/final/photo.svg"
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

                        {isLast && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 4, duration: 2 }}
                                data-testid="final-one-last-thing"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCodaOpen(true);
                                }}
                                className="f-hand mt-16 text-xl text-[#a1a1a6] underline decoration-[#d4af37]/25 underline-offset-8 transition-colors duration-500 hover:text-[#f5ecd7]"
                            >
                                one last thing…
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {codaOpen && !ended && (
                    <motion.p
                        key={`coda-${codaIdx}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        className="f-serif relative z-10 max-w-xl text-center text-2xl font-light italic leading-relaxed text-[#fdfbf7]/95 sm:text-3xl"
                        data-testid={`final-coda-${codaIdx}`}
                    >
                        {CODA[codaIdx]}
                    </motion.p>
                )}

                {ended && (
                    <motion.p
                        key="end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 3 }}
                        className="f-ui relative z-10 text-[10px] uppercase tracking-[0.5em] text-[#a1a1a6]/60"
                        data-testid="final-end"
                    >
                        — end —
                    </motion.p>
                )}
            </AnimatePresence>

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
