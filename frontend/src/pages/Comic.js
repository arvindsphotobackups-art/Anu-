import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InkDoodle } from "@/components/comic/InkCharacters";
import StoryScene from "@/components/comic/Scenes";
import { SLIDES } from "@/data/comicStory";

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

                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    onDragEnd={(e, info) => {
                        if (info.offset.x < -70) go(1);
                        else if (info.offset.x > 70) go(-1);
                    }}
                    whileDrag={{ scale: 0.99, cursor: "grabbing" }}
                    style={{ touchAction: "pan-y" }}
                    className="rounded-[3px] border-2 border-[#1a1a1a]/80 bg-[#fdfbf7] p-4 shadow-[6px_8px_0_rgba(26,26,26,0.15)] sm:p-8"
                    data-testid="comic-swipe-area"
                >
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
                                    <StoryScene index={idx} />
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
                </motion.div>

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
                <p className="f-hand mt-5 text-center text-lg text-[#1a1a1a]/45 md:hidden">
                    swipe to turn the page
                </p>
            </div>
        </div>
    );
}
