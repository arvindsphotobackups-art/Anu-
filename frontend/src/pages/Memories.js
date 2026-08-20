import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HIDDEN = [
    { x: "88%", y: "6%", msg: "you + me + a late-night call = tomorrow's sleep schedule destroyed." },
    { x: "3%", y: "58%", msg: "this one remembers the first hello." },
    { x: "55%", y: "88%", msg: "remember when our 'just one reel' became two hours of talking?" },
];

const Tape = ({ className = "", style }) => (
    <div className={`tape ${className}`} style={style} />
);

const Frame = ({ rot = 0, className = "", style, children, testid }) => (
    <div
        data-testid={testid}
        className={`relative w-[240px] md:absolute ${className}`}
        style={{ rotate: `${rot}deg`, ...style }}
    >
        <Tape className="-top-3 left-1/2 z-10 -translate-x-1/2 -rotate-3" />
        <div className="bg-[#f5f2eb] p-3 pb-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-shadow duration-500 hover:shadow-[0_34px_80px_rgba(0,0,0,0.65)]">
            {children}
        </div>
    </div>
);

const Caption = ({ children }) => (
    <p className="f-hand mt-2 text-center text-xl leading-tight text-[#1a1a1a]">{children}</p>
);

const DoneMark = () => (
    <span className="f-hand absolute -right-2 -top-4 z-20 rotate-12 text-2xl text-[#c76d63]">✦</span>
);

export default function Memories({ discovered, onDiscover, onNext }) {
    const [starMsg, setStarMsg] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const [pulled, setPulled] = useState(false);
    const [peeled, setPeeled] = useState(false);
    const [unfolded, setUnfolded] = useState(false);
    const [developed, setDeveloped] = useState(false);
    const [envelopeOpen, setEnvelopeOpen] = useState(false);

    const has = (id) => discovered.includes(id);
    const discover = (id) => onDiscover(id);
    const count = discovered.length;

    return (
        <div
            data-testid="memories-page"
            className="relative min-h-screen overflow-hidden"
            style={{
                background:
                    "radial-gradient(ellipse 90% 60% at 50% 0%, #14131a 0%, #0a0a0c 60%, #030305 100%)",
            }}
        >
            {/* hidden stars */}
            {HIDDEN.map((s, i) => (
                <div key={i} className="absolute z-30" style={{ left: s.x, top: s.y }}>
                    <button
                        data-testid={`memory-hidden-star-${i + 1}`}
                        aria-label="a quiet star"
                        onClick={() => setStarMsg(starMsg === i ? null : i)}
                        className="anim-twinkle block h-2 w-2 rounded-full bg-[#f5ecd7]"
                        style={{ boxShadow: "0 0 8px 2px rgba(212,175,55,0.5)", animationDuration: "5s", animationDelay: `${i * 1.6}s` }}
                    />
                    {starMsg === i && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`f-hand absolute top-3 w-44 text-lg leading-tight text-[#f5ecd7] ${parseInt(s.x) > 50 ? "right-4 text-right" : "left-4"}`}
                        >
                            {s.msg}
                        </motion.p>
                    )}
                </div>
            ))}

            <header className="relative z-10 px-6 pt-20 text-center">
                <p className="f-ui text-[10px] uppercase tracking-[0.4em] text-[#a1a1a6]">chapter ii</p>
                <h2 className="f-serif mt-3 text-4xl font-light text-[#fdfbf7] sm:text-5xl">
                    photographs &amp; other evidence
                </h2>
                <p className="f-hand mt-3 text-xl text-[#a1a1a6]">
                    go on, touch things. that's what they're here for.
                </p>
                <div
                    data-testid="memory-progress"
                    className="f-ui mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-[#d4af37]/20 px-5 py-2 text-xs tracking-[0.2em] text-[#f5ecd7]"
                >
                    <span className="flex gap-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <span
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full transition-colors duration-700 ${
                                    i < count ? "bg-[#d4af37]" : "bg-[#a1a1a6]/30"
                                }`}
                            />
                        ))}
                    </span>
                    MEMORIES DISCOVERED: {count} / 5
                </div>
            </header>

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 pb-48 pt-20 md:block md:h-[1500px]">
                {/* 1 — First Talk : flip */}
                <Frame rot={-4} className="md:left-[4%] md:top-[2%]" testid="memory-first-talk">
                    {has("first-talk") && <DoneMark />}
                    <motion.div
                        className="relative h-[210px] cursor-pointer [perspective:900px]"
                        onClick={() => {
                            setFlipped(true);
                            discover("first-talk");
                        }}
                        data-testid="memory-first-talk-card"
                    >
                        <motion.div
                            className="absolute inset-0 [transform-style:preserve-3d]"
                            animate={{ rotateY: flipped ? 180 : 0 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="absolute inset-0 [backface-visibility:hidden]">
                                <img src="/images/memories/memory-1.svg" alt="first talk" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-center gap-2 bg-[#efe9dc] p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <p className="f-hand text-lg leading-snug text-[#1a1a1a]">
                                    her: "so… vadivelu, huh?"
                                    <br />
                                    him: "i panicked okay"
                                    <br />
                                    her: "i know. it worked."
                                </p>
                                <p className="f-hand text-right text-base text-[#c76d63]">— worth it.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    <Caption>first talk</Caption>
                </Frame>

                {/* 2 — First Outing : pull the note */}
                <Frame rot={3} className="md:right-[8%] md:top-[10%]" testid="memory-first-outing">
                    {has("first-outing") && <DoneMark />}
                    <motion.div
                        className="f-hand pointer-events-none absolute left-1/2 top-6 -z-10 w-[180px] -translate-x-1/2 bg-[#efe9dc] p-4 pb-6 text-lg leading-snug text-[#1a1a1a] shadow-lg"
                        animate={{ y: pulled ? -130 : 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        we walked nowhere in particular and it still felt like somewhere.
                    </motion.div>
                    <button
                        className="relative z-10 block w-full cursor-pointer"
                        onClick={() => {
                            setPulled(true);
                            discover("first-outing");
                        }}
                        data-testid="memory-first-outing-card"
                    >
                        <img src="/images/memories/memory-2.svg" alt="first outing" className="h-[210px] w-full object-cover" />
                        {!pulled && (
                            <span className="f-hand absolute -right-3 top-1/2 rotate-90 bg-[#c76d63] px-3 py-1 text-sm text-[#fdfbf7]">
                                pull
                            </span>
                        )}
                    </button>
                    <Caption>first outing</Caption>
                </Frame>

                {/* 3 — First Memory Together : peel the corner */}
                <Frame rot={2} className="md:left-[12%] md:top-[34%]" testid="memory-first-memory">
                    {has("first-memory") && <DoneMark />}
                    <div
                        className="relative h-[210px] cursor-pointer overflow-hidden"
                        onClick={() => {
                            setPeeled(true);
                            discover("first-memory");
                        }}
                        data-testid="memory-first-memory-card"
                    >
                        <img src="/images/memories/memory-3.svg" alt="first memory together" className="h-full w-full object-cover" />
                        <AnimatePresence>
                            {peeled && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex items-center justify-center bg-[#efe9dc]/95 p-4"
                                >
                                    <p className="f-hand text-center text-xl leading-snug text-[#1a1a1a]">
                                        the day ordinary days
                                        <br />
                                        started feeling different.
                                        <span className="mt-2 block text-2xl text-[#c76d63]">♡</span>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {!peeled && (
                            <motion.div
                                className="absolute bottom-0 right-0 h-16 w-16 cursor-pointer bg-[#ded6c2] shadow-[-4px_-4px_10px_rgba(0,0,0,0.2)]"
                                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                                whileHover={{ scale: 1.15 }}
                                data-testid="memory-peel-corner"
                            />
                        )}
                    </div>
                    <Caption>first memory together</Caption>
                </Frame>

                {/* 4 — That Stupid Fight : crumpled note */}
                <Frame rot={-3} className="md:right-[6%] md:top-[48%]" testid="memory-stupid-fight">
                    {has("stupid-fight") && <DoneMark />}
                    <img src="/images/memories/memory-4.svg" alt="that stupid fight" className="h-[210px] w-full object-cover" />
                    <Caption>that stupid fight 😂</Caption>
                    <div className="absolute -bottom-8 -left-6 z-20">
                        {!unfolded ? (
                            <motion.button
                                data-testid="memory-crumpled-note"
                                onClick={() => {
                                    setUnfolded(true);
                                    discover("stupid-fight");
                                }}
                                className="h-12 w-12 rounded-full bg-[#efe9dc] shadow-[inset_-4px_-6px_10px_rgba(0,0,0,0.25),0_10px_20px_rgba(0,0,0,0.5)]"
                                whileHover={{ scale: 1.12, rotate: 8 }}
                                aria-label="a crumpled note"
                            />
                        ) : (
                            <motion.div
                                initial={{ scale: 0.3, rotate: -14, opacity: 0 }}
                                animate={{ scale: 1, rotate: -3, opacity: 1 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="f-hand w-44 bg-[#efe9dc] p-4 text-lg leading-snug text-[#1a1a1a] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
                                data-testid="memory-unfolded-note"
                            >
                                we were both so stupid.
                                <br />
                                <span className="text-[#c76d63]">10/10 would fight again.</span>
                            </motion.div>
                        )}
                    </div>
                </Frame>

                {/* 5 — Best Day Ever : develops like film */}
                <Frame rot={1} className="md:left-[38%] md:top-[64%]" testid="memory-best-day">
                    {has("best-day") && <DoneMark />}
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            setDeveloped(true);
                            discover("best-day");
                        }}
                        data-testid="memory-best-day-card"
                    >
                        <img
                            src="/images/memories/memory-5.svg"
                            alt="best day ever"
                            className="h-[210px] w-full object-cover transition-all duration-[2600ms] ease-out"
                            style={{
                                filter: developed
                                    ? "brightness(1) blur(0px) saturate(1)"
                                    : "brightness(0.45) blur(7px) saturate(0.2)",
                            }}
                        />
                        {!developed && (
                            <p className="f-hand absolute left-1/2 top-[38%] -translate-x-1/2 text-lg text-[#f5ecd7]/80">
                                click to develop…
                            </p>
                        )}
                    </div>
                    <Caption>best day ever</Caption>
                </Frame>

                {/* open-when envelope */}
                <div className="relative md:absolute md:right-[14%] md:top-[76%]" style={{ rotate: "-2deg" }} data-testid="open-when-envelope">
                    <Tape className="tape-coral -top-3 left-1/2 z-10 -translate-x-1/2 rotate-2" />
                    <button
                        onClick={() => setEnvelopeOpen((o) => !o)}
                        className="relative block h-32 w-48 bg-[#efe9dc] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-1"
                        data-testid="open-when-envelope-button"
                        aria-label="open when envelope"
                    >
                        <span className="f-hand absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xl text-[#1a1a1a]">
                            open when…
                            <span className="block text-base text-[#a1a1a6]">you miss me</span>
                        </span>
                        <motion.span
                            className="absolute inset-x-0 top-0 h-14 origin-top bg-[#ded6c2]"
                            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                            animate={{ rotateX: envelopeOpen ? 165 : 0 }}
                            transition={{ duration: 0.7 }}
                        />
                    </button>
                    <AnimatePresence>
                        {envelopeOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 24, rotate: 2 }}
                                animate={{ opacity: 1, y: -150, rotate: 1 }}
                                exit={{ opacity: 0, y: 24 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="f-hand absolute left-1/2 top-0 z-30 w-52 -translate-x-1/2 bg-[#f5f2eb] p-5 text-lg leading-snug text-[#1a1a1a] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                                data-testid="open-when-letter"
                            >
                                i'm closer than you think.
                                <br />
                                check the stars —
                                <br />
                                i leave things there.
                                <span className="mt-1 block text-right text-[#c76d63]">— always</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* next chapter */}
            <AnimatePresence>
                {count >= 5 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-20 -mt-28 flex justify-center pb-24"
                    >
                        <button
                            data-testid="memories-next-chapter"
                            onClick={onNext}
                            className="f-serif border border-[#d4af37]/30 px-10 py-3 text-lg tracking-[0.3em] text-[#f5ecd7] transition-colors duration-700 hover:border-[#d4af37]/70 hover:bg-[#d4af37]/5"
                        >
                            the little world →
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
