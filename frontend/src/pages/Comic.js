import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Boy, Girl, InkDoodle } from "@/components/comic/InkCharacters";
import { SLIDES } from "@/data/comicStory";

const Bubble = ({ children, className = "", tail = "left" }) => (
    <div
        className={`f-hand absolute rounded-[14px] border-2 border-[#1a1a1a] bg-[#fdfbf7] px-3 py-1.5 text-lg leading-tight text-[#1a1a1a] shadow-[2px_3px_0_rgba(26,26,26,0.85)] ${className}`}
    >
        {children}
        <span
            className={`absolute -bottom-[9px] h-4 w-4 rotate-45 border-b-2 border-r-2 border-[#1a1a1a] bg-[#fdfbf7] ${
                tail === "left" ? "left-5" : "right-5"
            }`}
        />
    </div>
);

const Panel = ({ children, className = "" }) => (
    <div
        className={`relative min-h-[230px] overflow-hidden rounded-[4px] border-2 border-[#1a1a1a] bg-[#faf7ef] ${className}`}
        style={{ boxShadow: "3px 4px 0 rgba(26,26,26,0.2)" }}
    >
        {children}
    </div>
);

const Scene = ({ index }) => {
    switch (index) {
        case 0:
            return (
                <Panel className="flex min-h-[300px] items-end justify-center gap-6 pb-2">
                    <Girl expr="shy" className="w-28" />
                    <Boy expr="smile" flip className="w-28" />
                    <InkDoodle kind="heart" className="absolute left-[46%] top-[16%] w-6 rotate-6" />
                    <InkDoodle kind="star" className="absolute left-[12%] top-[20%] w-5 -rotate-12" />
                    <InkDoodle kind="star" className="absolute right-[14%] top-[32%] w-4 rotate-6" />
                </Panel>
            );
        case 1:
            return (
                <Panel>
                    {/* classroom */}
                    <div className="absolute left-[8%] top-[30%] h-2 w-40 bg-[#1a1a1a]/70" />
                    <div className="absolute left-[12%] top-[32%] h-20 w-2 bg-[#1a1a1a]/70" />
                    <Girl expr="shy" className="absolute bottom-0 left-[6%] w-24" />
                    <Boy expr="smile" className="absolute bottom-0 right-[10%] w-24" />
                    <InkDoodle kind="heart" className="absolute left-[38%] top-[18%] w-5 rotate-12" />
                    <InkDoodle kind="heart" className="absolute left-[46%] top-[10%] w-4 -rotate-6" />
                    <InkDoodle kind="arrow" className="absolute left-[34%] top-[44%] w-16" />
                    <Bubble className="right-[6%] top-[8%]" tail="left">she knew.</Bubble>
                </Panel>
            );
        case 2:
            return (
                <Panel>
                    {/* library table */}
                    <div className="absolute bottom-[34%] left-[10%] right-[10%] h-3 rounded bg-[#1a1a1a]/75" />
                    <Girl expr="shock" className="absolute bottom-[8%] left-[16%] w-24" />
                    <Girl expr="smile" className="absolute bottom-[8%] right-[16%] w-20 opacity-80" flip />
                    <Bubble className="left-[6%] top-[6%]">truth or dare?</Bubble>
                    <Bubble className="right-[6%] top-[24%]" tail="right">"go talk to him."</Bubble>
                    <InkDoodle kind="star" className="absolute left-[46%] top-[14%] w-5 rotate-12" />
                </Panel>
            );
        case 3:
            return (
                <Panel>
                    <Boy expr="nervous" className="absolute bottom-0 left-[12%] w-28" />
                    <Girl expr="shock" className="absolute bottom-0 right-[12%] w-24" flip />
                    <Bubble className="left-[8%] top-[6%]">
                        …a vadivelu
                        <br />
                        movie reference
                    </Bubble>
                    <p className="f-hand absolute bottom-[10%] left-1/2 -translate-x-1/2 rotate-[-3deg] text-xl text-[#c76d63]">
                        smooth, da.
                    </p>
                </Panel>
            );
        case 4:
            return (
                <Panel className="flex items-center justify-center">
                    {/* phone */}
                    <div className="relative h-56 w-32 rounded-2xl border-[3px] border-[#1a1a1a] bg-[#fdfbf7] p-2">
                        <div className="f-hand ml-1 mt-1 w-24 rounded-lg rounded-bl-none border-2 border-[#1a1a1a] px-2 py-1 text-base leading-tight">
                            "Hi, I'm Anushika, your classmate."
                        </div>
                        <div className="f-hand ml-auto mr-1 mt-2 w-24 rounded-lg rounded-br-none border-2 border-[#1a1a1a] bg-[#efe9dc] px-2 py-1 text-base leading-tight">
                            what did you say about me??
                        </div>
                        <div className="f-hand ml-1 mt-2 w-16 rounded-lg rounded-bl-none border-2 border-[#1a1a1a] px-2 py-1 text-base">
                            *panics*
                        </div>
                    </div>
                    <Boy expr="nervous" className="absolute bottom-0 right-[8%] w-24" />
                    <InkDoodle kind="arrow" className="absolute bottom-[30%] right-[30%] w-14 -scale-x-100" />
                </Panel>
            );
        case 5:
            return (
                <Panel>
                    {/* moon + night */}
                    <div className="absolute left-[8%] top-[10%] h-14 w-14 rounded-full border-2 border-[#1a1a1a] bg-[#f5f2eb]" />
                    <div className="absolute left-[11%] top-[12%] h-14 w-14 rounded-full bg-[#faf7ef]" />
                    <Boy expr="love" className="absolute bottom-0 left-[10%] w-24" />
                    <Girl expr="love" className="absolute bottom-0 right-[10%] w-24" flip />
                    <Bubble className="left-[24%] top-[10%]">2:14 am — still awake?</Bubble>
                    <Bubble className="right-[22%] top-[34%]" tail="right">send that reel</Bubble>
                    {/* kitkat doodle */}
                    <div className="absolute bottom-[8%] left-[42%] rotate-[-6deg]">
                        <div className="f-hand border-2 border-[#c76d63] px-2 py-0.5 text-sm tracking-widest text-[#c76d63]">
                            KITKAT
                        </div>
                    </div>
                </Panel>
            );
        case 6:
            return (
                <Panel>
                    {/* rain */}
                    {[...Array(14)].map((_, i) => (
                        <span
                            key={i}
                            className="absolute h-6 w-[2px] rotate-[18deg] bg-[#1a1a1a]/25"
                            style={{ left: `${4 + ((i * 71) % 92)}%`, top: `${(i * 29) % 70}%` }}
                        />
                    ))}
                    {/* broken phone */}
                    <div className="absolute bottom-[14%] left-[10%] h-40 w-24 rotate-[-8deg] rounded-xl border-[3px] border-[#1a1a1a] bg-[#fdfbf7]">
                        <div className="mx-2 mt-3 h-5 border-b-2 border-[#1a1a1a]/40" />
                        <div className="mx-2 mt-2 h-5 border-b-2 border-[#1a1a1a]/40" />
                        <div className="mx-2 mt-2 h-14 bg-[#1a1a1a]/12" style={{ clipPath: "polygon(0 0, 100% 12%, 88% 100%, 12% 88%)" }} />
                        <p className="f-hand mt-1 text-center text-sm text-[#1a1a1a]/70">two lines left</p>
                    </div>
                    <Boy expr="sad" className="absolute bottom-0 right-[12%] w-28" flip />
                    <Bubble className="right-[8%] top-[8%]" tail="right">
                        "she got committed
                        <br />
                        to saleel."
                    </Bubble>
                    <InkDoodle kind="heart" className="absolute left-[42%] top-[16%] w-6 rotate-12 opacity-50" />
                </Panel>
            );
        case 7:
            return (
                <Panel>
                    {/* roller coaster */}
                    <svg viewBox="0 0 400 90" className="absolute left-0 top-[8%] w-full">
                        <path
                            d="M0 70 q60 -60 120 -20 q50 34 110 6 q70 -32 170 10"
                            fill="none"
                            stroke="#1a1a1a"
                            strokeWidth="3"
                            filter="url(#inkRough)"
                        />
                        <path d="M60 50 v30 M180 56 v24 M300 50 v30" stroke="#1a1a1a" strokeWidth="2" />
                    </svg>
                    <Girl expr="shock" className="absolute bottom-0 left-[30%] w-24" />
                    <Boy expr="smile" className="absolute bottom-0 left-[52%] w-24" />
                    <Bubble className="left-[6%] top-[10%]">"MURUGA, MURUGA!!"</Bubble>
                    {/* gripping hand doodle */}
                    <div className="f-hand absolute bottom-[36%] left-[46%] rotate-[-8deg] text-lg text-[#c76d63]">
                        *grips bicep*
                    </div>
                    <InkDoodle kind="heart" className="absolute bottom-[12%] right-[10%] w-5 -rotate-12" />
                </Panel>
            );
        case 8:
            return (
                <Panel>
                    <Girl expr="shy" className="absolute bottom-0 left-[14%] w-26" />
                    <Boy expr="love" className="absolute bottom-0 right-[14%] w-26" flip />
                    <Bubble className="left-[8%] top-[8%]">"i have feelings…"</Bubble>
                    <Bubble className="right-[8%] top-[30%]" tail="right">"take the chance."</Bubble>
                    <InkDoodle kind="heart" className="absolute left-[46%] top-[18%] w-7 rotate-3" />
                    <InkDoodle kind="heart" className="absolute left-[52%] top-[10%] w-4 -rotate-6" />
                </Panel>
            );
        default:
            return null;
    }
};

export default function Comic({ onFinish }) {
    const [idx, setIdx] = useState(0);
    const last = SLIDES.length - 1;

    const go = (delta) => setIdx((i) => Math.max(0, Math.min(last, i + delta)));

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx]);

    const slide = SLIDES[idx];

    return (
        <div data-testid="comic-page" className="paper min-h-screen pb-24 text-[#1a1a1a]">
            {/* hidden global rough-ink filter */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <filter id="inkRough">
                        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" result="n" />
                        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
                    </filter>
                </defs>
            </svg>

            <header className="mx-auto max-w-3xl px-6 pt-16 text-center">
                <p className="f-ui text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/50">chapter v</p>
                <h2 className="f-hand mt-2 text-5xl text-[#1a1a1a] sm:text-6xl">our story</h2>
                <p className="f-hand mt-1 text-xl text-[#1a1a1a]/60">
                    (badly drawn. accurately remembered.)
                </p>
            </header>

            <div className="relative mx-auto mt-10 max-w-3xl px-4 sm:px-6">
                <div className="tape -top-3 left-8 z-10 rotate-[-6deg]" />
                <div className="tape tape-coral -top-3 right-8 z-10 rotate-[5deg]" />

                <div className="rounded-[3px] border-2 border-[#1a1a1a]/80 bg-[#fdfbf7] p-4 shadow-[6px_8px_0_rgba(26,26,26,0.15)] sm:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 40, rotate: 0.6 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            exit={{ opacity: 0, x: -40, rotate: -0.6 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            data-testid={`comic-slide-${idx}`}
                        >
                            {slide.kicker && (
                                <p className="f-hand mb-4 inline-block rotate-[-1.5deg] bg-[#c76d63]/12 px-3 py-0.5 text-xl text-[#c76d63]">
                                    {slide.kicker}
                                </p>
                            )}

                            {!slide.ending ? (
                                <>
                                    <Scene index={idx} />
                                    <div className="mt-6 space-y-1 text-center">
                                        {slide.caption.map((c, i) => (
                                            <p key={i} className="f-hand text-2xl leading-snug text-[#1a1a1a]/90">
                                                {c}
                                            </p>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="py-14 text-center">
                                    <p className="f-serif text-3xl italic text-[#1a1a1a] sm:text-4xl">
                                        And somehow, after everything…
                                    </p>
                                    <p className="f-serif mt-4 text-4xl text-[#1a1a1a] sm:text-5xl">
                                        we still found our way to each other.
                                    </p>
                                    <InkDoodle kind="heart" className="mx-auto mt-8 w-8" />
                                    <p className="f-hand mt-8 rotate-[-2deg] text-3xl text-[#c76d63]">
                                        To be continued.
                                    </p>
                                    <button
                                        data-testid="comic-finish-button"
                                        onClick={onFinish}
                                        className="f-hand mt-10 border-b-2 border-[#1a1a1a] pb-1 text-2xl text-[#1a1a1a] transition-colors duration-300 hover:border-[#c76d63] hover:text-[#c76d63]"
                                    >
                                        turn the last page →
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* controls */}
                <div className="mt-8 flex items-center justify-between">
                    <button
                        data-testid="comic-prev-button"
                        onClick={() => go(-1)}
                        disabled={idx === 0}
                        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-[#f5f2eb] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-[#1a1a1a]"
                        aria-label="previous page"
                    >
                        <ArrowLeft size={17} />
                    </button>
                    <div className="flex items-center gap-2" data-testid="comic-progress">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                aria-label={`page ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    i === idx ? "w-6 bg-[#1a1a1a]" : "w-1.5 bg-[#1a1a1a]/25"
                                }`}
                            />
                        ))}
                    </div>
                    <button
                        data-testid="comic-next-button"
                        onClick={() => go(1)}
                        disabled={idx === last}
                        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-[#f5f2eb] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-[#1a1a1a]"
                        aria-label="next page"
                    >
                        <ArrowRight size={17} />
                    </button>
                </div>
            </div>
        </div>
    );
}
