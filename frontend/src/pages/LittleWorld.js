import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LittleWorld({ onVisit, onNext }) {
    const [hugged, setHugged] = useState(false);
    const [phoneLit, setPhoneLit] = useState(false);
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
            <div className="absolute right-[12%] top-[10%] flex flex-col items-center" data-testid="world-clock">
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
                        className="absolute bottom-1/2 left-1/2 h-7 w-[3px] origin-bottom -translate-x-1/2 rounded bg-[#f5f2eb]/70"
                        style={{ animation: "spin 240s linear infinite" }}
                    />
                    <span
                        className="absolute bottom-1/2 left-1/2 h-10 w-[2px] origin-bottom -translate-x-1/2 rounded bg-[#d4af37]/80"
                        style={{ animation: "spin 24s linear infinite" }}
                    />
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f2eb]" />
                </div>
                <p className="f-hand mt-2 text-lg text-[#a1a1a6]">somewhere past 1am</p>
            </div>

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
                <svg viewBox="0 0 120 140" className="absolute bottom-[20%] left-[34%] w-24">
                    <rect x="56" y="52" width="6" height="70" fill="#181410" />
                    <ellipse cx="59" cy="126" rx="24" ry="6" fill="#181410" />
                    <path d="M34 20 h50 l12 36 h-74 z" fill="#241d14" />
                    <path d="M34 20 h50 l4 12 h-58 z" fill="#2e2517" />
                    <ellipse cx="59" cy="57" rx="34" ry="5" fill="#d4af37" opacity="0.35" />
                </svg>
                {/* phone on the desk */}
                <button
                    data-testid="world-phone"
                    onClick={() => setPhoneLit((p) => !p)}
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
                        <span className="f-hand text-[9px] leading-none text-[#f5f2eb]">romantic reels</span>
                        <svg viewBox="0 0 24 24" className="h-3 w-3">
                            <path d="M12 20 c-6-4-9-7.5-9-11 a5 5 0 0 1 9-3 a5 5 0 0 1 9 3 c0 3.5-3 7-9 11z" fill="#c76d63" />
                        </svg>
                        <span className="f-ui text-[7px] tracking-widest text-[#a1a1a6]">12:47 AM</span>
                    </span>
                </button>
            </div>

            {/* teddy */}
            <div className="absolute bottom-[6%] left-[10%]" data-testid="world-teddy">
                <button onClick={hug} aria-label="teddy bear" className="relative block">
                    <svg viewBox="0 0 120 130" className={`w-28 transition-transform duration-700 ${hugged ? "scale-95" : ""}`}>
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
                            className="f-hand absolute -top-9 left-1/2 w-32 -translate-x-1/2 text-center text-lg text-[#f5ecd7]"
                            data-testid="teddy-hugged-message"
                        >
                            there there.
                        </motion.span>
                    )}
                </button>
            </div>

            {/* shelf with beating heart */}
            <div className="absolute left-[38%] top-[26%] hidden md:block">
                <div className="h-[3px] w-36 bg-[#181410]" />
                <svg viewBox="0 0 24 24" className="anim-heartbeat absolute -top-6 left-6 h-5 w-5" style={{ animationDuration: "2.6s" }}>
                    <path
                        d="M12 21 c-6.5-4.4-10-8-10-11.8 c0-3 2.3-5.2 5-5.2 c2 0 3.6 1.1 5 3 c1.4-1.9 3-3 5-3 c2.7 0 5 2.2 5 5.2 c0 3.8-3.5 7.4-10 11.8z"
                        fill="#c76d63"
                        opacity="0.9"
                        style={{ filter: "drop-shadow(0 0 6px rgba(199,109,99,0.5))" }}
                    />
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
