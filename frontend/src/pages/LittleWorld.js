import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LittleWorld({ onVisit, onNext }) {
    const [hugged, setHugged] = useState(false);
    const [phoneLit, setPhoneLit] = useState(false);
    const [phoneNote, setPhoneNote] = useState(false);
    const [lampNote, setLampNote] = useState(false);
    const [clockTap, setClockTap] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        onVisit();
        const t = setTimeout(() => setReady(true), 6000);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hug = () => {
        setHugged(true);
        setTimeout(() => setHugged(false), 3500);
    };

    const tapPhone = () => {
        setPhoneLit((p) => !p);
        setPhoneNote(true);
        setTimeout(() => setPhoneNote(false), 4500);
    };

    const tapLamp = () => {
        setLampNote(true);
        setTimeout(() => setLampNote(false), 4500);
    };

    const tapClock = () => {
        setClockTap(true);
        setTimeout(() => setClockTap(false), 5000);
    };

    return (
        <div
            data-testid="little-world-page"
            className="relative h-screen w-full overflow-hidden"
            style={{
                background:
                    "linear-gradient(180deg, #0c0c12 0%, #0b101e 55%, #0a0a0c 100%)",
            }}
        >
            {/* wall glow */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 78% 70%, rgba(212,175,55,0.06), rgba(3,3,5,0) 70%), radial-gradient(ellipse 45% 55% at 18% 35%, rgba(120,140,190,0.07), rgba(3,3,5,0) 70%)",
                }}
            />

            {/* window + moon + curtains */}
            <div className="absolute left-[7%] top-[12%] h-[44%] w-[26%] min-w-[200px]">
                <div className="relative h-full w-full overflow-hidden border-[6px] border-[#060609] bg-[#070b16]">
                    <div
                        className="absolute right-[18%] top-[14%] h-12 w-12 rounded-full"
                        style={{
                            background: "#f5f2eb",
                            opacity: 0.85,
                            boxShadow: "0 0 40px 12px rgba(245,242,235,0.18)",
                            animation: "moonbeam 14s ease-in-out infinite",
                        }}
                    />
                    {[...Array(9)].map((_, i) => (
                        <span
                            key={i}
                            className="anim-twinkle absolute h-[2px] w-[2px] rounded-full bg-[#fdfbf7]"
                            style={{
                                left: `${10 + ((i * 37) % 80)}%`,
                                top: `${8 + ((i * 23) % 50)}%`,
                                animationDelay: `${i * 0.7}s`,
                            }}
                        />
                    ))}
                    {/* moonlight beam */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(115deg, rgba(245,242,235,0.10) 0%, rgba(245,242,235,0) 55%)",
                            animation: "moonbeam 12s ease-in-out infinite",
                        }}
                    />
                    {/* curtains */}
                    <div
                        className="anim-sway absolute left-0 top-0 h-full w-[34%]"
                        style={{
                            background: "linear-gradient(90deg, #151222 0%, #1c1830 60%, rgba(28,24,48,0.2) 100%)",
                            animationDuration: "9s",
                        }}
                    />
                    <div
                        className="anim-sway absolute right-0 top-0 h-full w-[34%]"
                        style={{
                            background: "linear-gradient(270deg, #151222 0%, #1c1830 60%, rgba(28,24,48,0.2) 100%)",
                            animationDuration: "10.5s",
                            animationDelay: "1.2s",
                        }}
                    />
                </div>
                <div className="mx-auto h-2 w-[110%] -translate-x-[5%] bg-[#060609]" />
            </div>

            {/* clock */}
            <button
                className="absolute right-[12%] top-[10%] flex flex-col items-center"
                data-testid="world-clock"
                onClick={tapClock}
                aria-label="clock"
            >
                <div className="relative h-24 w-24 rounded-full border-2 border-[#f5f2eb]/15 bg-[#0a0a0e]">
                    {[...Array(12)].map((_, i) => (
                        <span
                            key={i}
                            className="absolute left-1/2 top-1/2 h-1.5 w-[2px] bg-[#f5f2eb]/25"
                            style={{
                                transform: `rotate(${i * 30}deg) translateY(-42px)`,
                                transformOrigin: "center",
                            }}
                        />
                    ))}
                    <span
                        className="absolute bottom-1/2 left-1/2 h-7 w-[3px] origin-bottom rounded bg-[#f5f2eb]/70"
                        style={
                            clockTap
                                ? { transform: "translateX(-50%) rotate(32deg)", transition: "transform 1.4s ease" }
                                : { animation: "spin 240s linear infinite" }
                        }
                    />
                    <span
                        className="absolute bottom-1/2 left-1/2 h-10 w-[2px] origin-bottom rounded bg-[#d4af37]/80"
                        style={
                            clockTap
                                ? { transform: "translateX(-50%) rotate(4deg)", transition: "transform 1.4s ease" }
                                : { animation: "spin 24s linear infinite" }
                        }
                    />
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f2eb]" />
                </div>
                <p className="f-hand mt-2 text-lg text-[#a1a1a6]" data-testid="clock-caption">
                    {clockTap ? "somewhere past 1am, again." : "somewhere past 1am"}
                </p>
            </button>

            {/* desk + lamp */}
            <div className="absolute bottom-0 right-[4%] h-[30%] w-[34%] min-w-[260px]">
                <div className="absolute bottom-0 h-[26%] w-full bg-gradient-to-t from-[#0c0a08] to-[#12100c]" />
                <div
                    className="anim-breathe absolute -top-16 left-[30%] h-64 w-64 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.05) 45%, rgba(3,3,5,0) 70%)",
                        animation: "breathe 6s ease-in-out infinite, lampHum 11s linear infinite",
                    }}
                />
                <button
                    data-testid="world-lamp"
                    onClick={tapLamp}
                    aria-label="lamp"
                    className="absolute bottom-[20%] left-[34%]"
                >
                    <svg viewBox="0 0 120 140" className="w-24">
                        <rect x="56" y="52" width="6" height="70" fill="#181410" />
                        <ellipse cx="59" cy="126" rx="24" ry="6" fill="#181410" />
                        <path d="M34 20 h50 l12 36 h-74 z" fill="#241d14" />
                        <path d="M34 20 h50 l4 12 h-58 z" fill="#2e2517" />
                        <ellipse cx="59" cy="57" rx="34" ry="5" fill="#d4af37" opacity="0.35" />
                    </svg>
                </button>
                <AnimatePresence>
                    {lampNote && (
                        <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="f-hand absolute -top-8 left-[6%] w-44 text-lg leading-tight text-[#f5ecd7]"
                            data-testid="lamp-memory-note"
                        >
                            this light has heard every
                            <br />
                            3am conversation.
                        </motion.p>
                    )}
                </AnimatePresence>
                {/* phone on the desk */}
                <button
                    data-testid="world-phone"
                    onClick={tapPhone}
                    className="absolute bottom-[26%] right-[14%] h-24 w-12 rotate-[8deg] rounded-lg border border-[#f5f2eb]/10 bg-[#101014] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                    aria-label="phone"
                >
                    <span
                        className="absolute inset-1 rounded-md bg-[#1a2030]"
                        style={{
                            opacity: phoneLit ? 0.95 : undefined,
                            animation: phoneLit ? "none" : "screenGlow 11s linear infinite",
                        }}
                    />
                    <span
                        className="absolute inset-2 flex flex-col items-center justify-center gap-1 rounded"
                        style={{
                            opacity: phoneLit ? 1 : undefined,
                            animation: phoneLit ? "none" : "reelGlow 11s linear infinite",
                        }}
                    >
                        <span className="f-ui text-[8px] font-medium tracking-wide text-[#f5f2eb]">anushika</span>
                        <span className="f-hand text-[11px] leading-none text-[#f5f2eb]">sent you a reel ❤️</span>
                        <span className="f-ui text-[7px] tracking-widest text-[#a1a1a6]">now</span>
                    </span>
                </button>
                <AnimatePresence>
                    {phoneNote && (
                        <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="f-hand absolute -top-10 right-[2%] w-44 text-right text-lg leading-tight text-[#f5ecd7]"
                            data-testid="phone-memory-note"
                        >
                            'just one reel,' we said.
                            <br />
                            two hours later…
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* teddy */}
            <div className="absolute bottom-[6%] left-[10%]" data-testid="world-teddy">
                <button onClick={hug} aria-label="teddy bear" className="relative block" data-testid="world-teddy-button">
                    <svg viewBox="0 0 120 130" className={`anim-breathe-scale w-28 transition-transform duration-700 ${hugged ? "scale-95" : ""}`}>
                        <ellipse cx="60" cy="88" rx="30" ry="34" fill="#2e2620" />
                        <ellipse cx="60" cy="92" rx="17" ry="22" fill="#3a3028" />
                        <circle cx="40" cy="26" r="10" fill="#2e2620" />
                        <circle cx="80" cy="26" r="10" fill="#2e2620" />
                        <circle cx="40" cy="26" r="5" fill="#3a3028" />
                        <circle cx="80" cy="26" r="5" fill="#3a3028" />
                        <circle cx="60" cy="44" r="24" fill="#2e2620" />
                        <ellipse cx="60" cy="52" rx="10" ry="7" fill="#3a3028" />
                        <circle cx="51" cy="40" r="2.4" fill="#0a0a0c" />
                        <circle cx="69" cy="40" r="2.4" fill="#0a0a0c" />
                        <ellipse cx="60" cy="50" rx="3" ry="2.2" fill="#0a0a0c" />
                        <g style={{ transformBox: "fill-box", transformOrigin: "right center", animation: hugged ? "none" : "armAskL 9s ease-in-out infinite" }}>
                            <ellipse cx="30" cy="82" rx="9" ry="18" fill="#2e2620" transform="rotate(20 30 82)" />
                        </g>
                        <g style={{ transformBox: "fill-box", transformOrigin: "left center", animation: hugged ? "none" : "armAskR 9s ease-in-out infinite" }}>
                            <ellipse cx="90" cy="82" rx="9" ry="18" fill="#2e2620" transform="rotate(-20 90 82)" />
                        </g>
                    </svg>
                    <span
                        className="f-hand pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-[#f5f2eb]/15 bg-[#121214] px-3 py-1 text-base text-[#f5f2eb]"
                        style={{ animation: hugged ? "none" : "bubbleAsk 9s ease-in-out infinite", opacity: hugged ? 0 : undefined }}
                        data-testid="teddy-hug-bubble"
                    >
                        hug?
                    </span>
                    {hugged && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="f-hand absolute -top-14 left-1/2 w-48 -translate-x-1/2 text-center text-lg leading-tight text-[#f5ecd7]"
                            data-testid="teddy-hugged-message"
                        >
                            you baby me like this.
                            <br />
                            i pretend to mind.
                        </motion.span>
                    )}
                </button>
            </div>

            {/* shelf with our little constellation */}
            <div className="absolute left-[38%] top-[26%] hidden md:block">
                <div className="h-[3px] w-36 bg-[#181410]" />
                <svg
                    viewBox="0 0 90 34"
                    className="anim-sway absolute -top-7 left-3 w-20"
                    style={{ animationDuration: "9s" }}
                    data-testid="world-constellation"
                >
                    <path d="M10 24 Q45 6 80 20" fill="none" stroke="#d4af37" strokeWidth="1.1" strokeDasharray="3 4" opacity="0.65" />
                    <path d="M10 20 l1.5 3 l3 0.3 l-2.3 2.1 l0.7 3 l-2.9 -1.6 l-2.9 1.6 l0.7 -3 l-2.3 -2.1 l3 -0.3 z" fill="none" stroke="#f5ecd7" strokeWidth="1.1" />
                    <path d="M80 16 l1.5 3 l3 0.3 l-2.3 2.1 l0.7 3 l-2.9 -1.6 l-2.9 1.6 l0.7 -3 l-2.3 -2.1 l3 -0.3 z" fill="none" stroke="#f5ecd7" strokeWidth="1.1" />
                </svg>
            </div>

            {/* floor */}
            <div className="absolute bottom-0 h-[10%] w-full bg-gradient-to-b from-[#0a0908] to-[#060505]" />

            {/* central message */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="f-serif max-w-xl text-2xl font-light italic leading-relaxed text-[#fdfbf7]/95 sm:text-3xl"
                    data-testid="world-message"
                >
                    "I find myself missing the little world
                    <br />
                    we used to make out of ordinary days."
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 2.6 }}
                    className="f-hand mt-6 text-xl text-[#a1a1a6]"
                >
                    (look around. it's all still here.)
                </motion.p>
            </div>

            {/* continue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: ready ? 1 : 0 }}
                transition={{ duration: 1.5 }}
                className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
            >
                <button
                    data-testid="world-next-chapter"
                    onClick={onNext}
                    className={`f-ui text-xs tracking-[0.35em] text-[#a1a1a6] underline decoration-[#d4af37]/30 underline-offset-8 transition-colors duration-500 hover:text-[#f5ecd7] ${ready ? "" : "pointer-events-none"}`}
                >
                    THE THINGS I SHOULD HAVE DONE BETTER →
                </button>
            </motion.div>

            {/* vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(3,3,5,0) 50%, rgba(3,3,5,0.6) 100%)",
                }}
            />
        </div>
    );
}
