import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LETTERS, FINAL_LETTER } from "@/data/letters";

const LetterModal = ({ title, body, closing, handwritten, onClose, testid }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[75] flex items-center justify-center bg-[#030305]/85 p-5 backdrop-blur-sm"
        onClick={onClose}
    >
        <motion.div
            initial={{ opacity: 0, y: 40, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, rotate: -0.5 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="paper max-h-[82vh] w-full max-w-xl overflow-y-auto p-8 shadow-[0_40px_120px_rgba(0,0,0,0.8)] sm:p-12"
            data-testid={testid}
        >
            <h3 className="f-hand text-2xl leading-snug text-[#1a1a1a] sm:text-3xl">{title}</h3>
            <div className="my-5 h-px w-16 bg-[#1a1a1a]/20" />
            <p className="f-hand whitespace-pre-line text-xl leading-relaxed text-[#1a1a1a]/90">{body}</p>
            {closing && (
                <p className="f-serif mt-8 whitespace-pre-line text-2xl italic text-[#1a1a1a]">{closing}</p>
            )}
            {handwritten && (
                <p className="f-hand mt-6 rotate-[-1deg] text-2xl text-[#c76d63]">{handwritten}</p>
            )}
            <button
                data-testid="letter-close-button"
                onClick={onClose}
                className="f-ui mt-10 text-xs uppercase tracking-[0.3em] text-[#1a1a1a]/50 underline underline-offset-4 transition-colors hover:text-[#1a1a1a]"
            >
                fold it back
            </button>
        </motion.div>
    </motion.div>
);

const Envelope = ({ letter, opened, onOpen, index }) => (
    <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 + index * 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onOpen(letter)}
        data-testid={`envelope-${letter.id}`}
        className="group relative h-28 w-44 [perspective:700px] sm:h-32 sm:w-52"
        style={{ rotate: `${[-2, 1.5, -1, 2.5, -1.5][index]}deg` }}
    >
        <span
            className={`absolute inset-0 rounded-[3px] shadow-[0_18px_45px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:-translate-y-1.5 ${
                opened ? "bg-[#d9d1bd]" : "bg-[#efe9dc]"
            }`}
        />
        <span
            className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-[3px] bg-[#e4dcc9] transition-transform duration-700"
            style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transform: opened ? "rotateX(160deg)" : "rotateX(0deg)",
            }}
        />
        {!opened && (
            <span className="absolute left-1/2 top-[46%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c76d63] shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
        )}
        <span className="f-hand absolute inset-x-2 bottom-2 text-center text-base leading-tight text-[#1a1a1a]/80">
            {letter.title}
        </span>
        {opened && (
            <span className="f-hand absolute right-2 top-2 rotate-12 text-lg text-[#c76d63]">read</span>
        )}
    </motion.button>
);

export default function Apology({ opened, onOpenLetter, finalRead, onFinalRead, onNext }) {
    const [active, setActive] = useState(null);
    const [finalOpen, setFinalOpen] = useState(false);
    const allOpened = opened.length >= LETTERS.length;

    const openLetter = (letter) => {
        setActive(letter);
        onOpenLetter(letter.id);
    };

    return (
        <div
            data-testid="apology-page"
            className="relative min-h-screen overflow-hidden"
            style={{
                background:
                    "radial-gradient(ellipse 70% 50% at 24% 30%, rgba(212,175,55,0.07) 0%, rgba(3,3,5,0) 55%), linear-gradient(180deg, #08080a 0%, #0a0a0c 60%, #060607 100%)",
            }}
        >
            {/* desk lamp */}
            <div className="absolute left-[8%] top-[16%] hidden md:block">
                <div
                    className="absolute -left-10 top-6 h-72 w-72 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.04) 45%, rgba(3,3,5,0) 70%)",
                        animation: "breathe 7s ease-in-out infinite, lampHum 13s linear infinite",
                    }}
                />
                <svg viewBox="0 0 120 160" className="relative w-24">
                    <rect x="57" y="60" width="5" height="80" fill="#1a1510" />
                    <ellipse cx="59" cy="146" rx="26" ry="6" fill="#1a1510" />
                    <path d="M36 24 h48 l11 38 h-70 z" fill="#2a2216" />
                    <ellipse cx="60" cy="63" rx="32" ry="5" fill="#d4af37" opacity="0.4" />
                </svg>
                {/* light cone */}
                <div
                    className="absolute left-1/2 top-[62px] h-[420px] w-[340px] -translate-x-1/2"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(212,175,55,0.09) 0%, rgba(212,175,55,0.02) 60%, rgba(3,3,5,0) 100%)",
                        clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0% 100%)",
                        animation: "lampHum 13s linear infinite",
                    }}
                />
            </div>

            <header className="relative z-10 mx-auto max-w-2xl px-6 pt-24 text-center">
                <p className="f-ui text-[10px] uppercase tracking-[0.4em] text-[#a1a1a6]">chapter iv</p>
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="f-serif mt-4 text-4xl font-light text-[#fdfbf7] sm:text-5xl"
                    data-testid="apology-title"
                >
                    The things I should have done better.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.6, delay: 0.8 }}
                    className="f-serif mt-8 text-xl font-light italic leading-relaxed text-[#a1a1a6]"
                >
                    I don't always know how to show what I feel.
                    <br />
                    But I know there were times when that wasn't enough.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4, delay: 1.6 }}
                    className="f-hand mt-6 text-xl text-[#a1a1a6]/70"
                >
                    five envelopes. take your time.
                </motion.p>
            </header>

            {/* desk */}
            <div className="relative z-10 mx-auto mt-20 max-w-5xl px-6 pb-16">
                <div className="relative rounded-sm bg-gradient-to-b from-[#14110c] to-[#0c0a07] px-6 py-14 shadow-[inset_0_1px_0_rgba(212,175,55,0.06)]">
                    <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-8">
                        {LETTERS.map((l, i) => (
                            <Envelope
                                key={l.id}
                                letter={l}
                                index={i}
                                opened={opened.includes(l.id)}
                                onOpen={openLetter}
                            />
                        ))}
                    </div>

                    {/* final envelope */}
                    <AnimatePresence>
                        {allOpened && (
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-14 flex flex-col items-center"
                            >
                                <p className="f-hand mb-5 text-xl text-[#a1a1a6]">
                                    one more. the one that matters most.
                                </p>
                                <button
                                    data-testid="final-envelope"
                                    onClick={() => setFinalOpen(true)}
                                    className="group relative h-32 w-56 [perspective:700px]"
                                >
                                    <span className="absolute inset-0 rounded-[3px] border border-[#c76d63]/40 bg-[#efe9dc] shadow-[0_0_50px_rgba(199,109,99,0.12),0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-1.5" />
                                    <span
                                        className="absolute inset-x-0 top-0 h-1/2 bg-[#e4dcc9]"
                                        style={{
                                            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                                            transform: finalRead ? "rotateX(160deg)" : "rotateX(0deg)",
                                            transformOrigin: "top",
                                            transition: "transform 0.7s",
                                        }}
                                    />
                                    <span className="anim-heartbeat absolute left-1/2 top-[46%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c76d63]" />
                                    <span className="f-hand absolute inset-x-3 bottom-2 text-center text-lg text-[#1a1a1a]">
                                        read this one last
                                    </span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {finalRead && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4 }}
                        className="mt-16 flex justify-center pb-20"
                    >
                        <button
                            data-testid="apology-next-chapter"
                            onClick={onNext}
                            className="f-serif border border-[#d4af37]/30 px-10 py-3 text-lg tracking-[0.3em] text-[#f5ecd7] transition-colors duration-700 hover:border-[#d4af37]/70 hover:bg-[#d4af37]/5"
                        >
                            our story, from the beginning →
                        </button>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {active && (
                    <LetterModal
                        testid={`letter-${active.id}`}
                        title={active.title}
                        body={active.body}
                        onClose={() => setActive(null)}
                    />
                )}
                {finalOpen && (
                    <LetterModal
                        testid="letter-final"
                        title={FINAL_LETTER.title}
                        body={FINAL_LETTER.body}
                        closing={FINAL_LETTER.closing}
                        handwritten={FINAL_LETTER.handwritten}
                        onClose={() => {
                            setFinalOpen(false);
                            onFinalRead();
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
