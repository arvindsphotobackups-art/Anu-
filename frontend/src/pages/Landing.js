import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const HIDDEN_STARS = [
    { x: 16, y: 20, msg: "she had a crush. he had absolutely no clue. 💀" },
    { x: 74, y: 13, msg: "still my favourite notification." },
    { x: 52, y: 33, msg: "somehow you made annoying me your full-time job." },
    { x: 34, y: 10, msg: "you really thought i wouldn't notice that smile?" },
    { x: 20, y: 62, msg: "plot twist: the annoying girl became my favourite person." },
];

const line = {
    hidden: { opacity: 0, y: 24 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 1 + i * 0.6, duration: 1.5, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function Landing({ onEnter }) {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [starMsg, setStarMsg] = useState(null);
    const [starHint, setStarHint] = useState(true);
    const [heartTapped, setHeartTapped] = useState(false);
    const [heartMsg, setHeartMsg] = useState(false);
    const [nearCouple, setNearCouple] = useState(false);

    const stars = useMemo(
        () =>
            Array.from({ length: 130 }, () => ({
                left: Math.random() * 100,
                top: Math.random() * 62,
                size: Math.random() * 1.8 + 0.6,
                delay: Math.random() * 5,
                dur: 2.4 + Math.random() * 3,
            })),
        [],
    );

    const bokeh = useMemo(
        () =>
            Array.from({ length: 16 }, (_, i) => ({
                left: 3 + Math.random() * 94,
                bottom: 4 + Math.random() * 60,
                size: 3 + Math.random() * 7,
                warm: i % 3 !== 0,
                delay: Math.random() * 6,
            })),
        [],
    );

    const onMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({
            x: (e.clientX - r.left) / r.width - 0.5,
            y: (e.clientY - r.top) / r.height - 0.5,
        });
    };

    const par = (fx, fy) => ({
        transform: `translate3d(${mouse.x * fx}px, ${mouse.y * fy}px, 0)`,
        transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
    });

    const tapHeart = () => {
        setHeartTapped(true);
        setHeartMsg(true);
        setTimeout(() => setHeartTapped(false), 1200);
        setTimeout(() => setHeartMsg(false), 4200);
    };

    return (
        <div
            data-testid="landing-page"
            onMouseMove={onMove}
            className="relative h-screen w-full overflow-hidden"
            style={{
                background:
                    "linear-gradient(180deg, #030305 0%, #070a14 45%, #0b101e 78%, #0a0c14 100%)",
            }}
        >
            {/* stars */}
            <div
                className="absolute inset-0 opacity-0"
                style={{ ...par(-16, -10), opacity: 1, transition: "opacity 3s ease 0.4s, transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
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

            {/* hidden special stars */}
            {HIDDEN_STARS.map((s, i) => (
                <div key={i} className="absolute z-20" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                    <button
                        data-testid={`hidden-star-${i + 1}`}
                        onClick={() => {
                            setStarMsg(starMsg === i ? null : i);
                            setStarHint(false);
                        }}
                        aria-label="a special star"
                        className="anim-twinkle block h-2.5 w-2.5 rounded-full bg-[#f5ecd7]"
                        style={{
                            boxShadow: "0 0 10px 2px rgba(212,175,55,0.55)",
                            animationDuration: "4.5s",
                            animationDelay: `${i * 1.3}s`,
                        }}
                    />
                    {starMsg === i && (
                        <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`f-hand absolute top-2 w-44 text-lg leading-tight text-[#f5ecd7] ${s.x > 70 ? "right-4 text-right" : "left-4"}`}
                            data-testid={`hidden-star-message-${i + 1}`}
                        >
                            {s.msg}
                        </motion.p>
                    )}
                </div>
            ))}

            {/* city skyline + bokeh */}
            <div className="absolute inset-x-0 bottom-0 h-[30%]" style={par(-8, -4)}>
                <motion.svg
                    viewBox="0 0 1200 220"
                    preserveAspectRatio="none"
                    className="absolute bottom-0 h-full w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, delay: 1.2 }}
                >
                    <g fill="#060609">
                        <rect x="0" y="120" width="90" height="100" />
                        <rect x="80" y="90" width="70" height="130" />
                        <rect x="140" y="140" width="110" height="80" />
                        <rect x="240" y="70" width="60" height="150" />
                        <rect x="290" y="120" width="100" height="100" />
                        <rect x="380" y="95" width="55" height="125" />
                        <rect x="425" y="150" width="120" height="70" />
                        <rect x="535" y="80" width="75" height="140" />
                        <rect x="600" y="130" width="95" height="90" />
                        <rect x="685" y="60" width="60" height="160" />
                        <rect x="735" y="120" width="110" height="100" />
                        <rect x="835" y="100" width="65" height="120" />
                        <rect x="890" y="145" width="100" height="75" />
                        <rect x="980" y="85" width="70" height="135" />
                        <rect x="1040" y="125" width="90" height="95" />
                        <rect x="1120" y="105" width="80" height="115" />
                    </g>
                </motion.svg>
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3.5, delay: 1.8 }}
                >
                    {bokeh.map((b, i) => (
                        <span
                            key={i}
                            className="anim-flicker absolute rounded-full blur-[3px]"
                            style={{
                                left: `${b.left}%`,
                                bottom: `${b.bottom}%`,
                                width: b.size,
                                height: b.size,
                                background: b.warm
                                    ? "rgba(212,175,55,0.75)"
                                    : "rgba(245,242,235,0.6)",
                                animationDelay: `${b.delay}s`,
                            }}
                        />
                    ))}
                </motion.div>
                {/* haze above city */}
                <div
                    className="absolute inset-x-0 bottom-0 h-full"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212,175,55,0.08), rgba(3,3,5,0) 70%)",
                    }}
                />
            </div>

            {/* foreground foliage */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[36%]" style={par(10, 6)}>
                <svg viewBox="0 0 400 200" className="anim-sway absolute -left-10 bottom-0 h-full w-[46%]" style={{ animationDuration: "11s" }}>
                    <g fill="#050507">
                        <path d="M40 200 q-30 -70 10 -130 q20 60 30 130 z" />
                        <path d="M90 200 q-20 -90 30 -150 q10 80 20 150 z" />
                        <path d="M150 200 q-10 -60 25 -110 q15 60 15 110 z" />
                        <ellipse cx="65" cy="70" rx="34" ry="16" transform="rotate(-24 65 70)" />
                        <ellipse cx="120" cy="52" rx="30" ry="14" transform="rotate(14 120 52)" />
                    </g>
                </svg>
                <svg viewBox="0 0 400 200" className="anim-sway absolute -right-10 bottom-0 h-full w-[46%]" style={{ animationDuration: "13s", animationDelay: "1.5s", transform: "scaleX(-1)" }}>
                    <g fill="#050507">
                        <path d="M40 200 q-30 -70 10 -130 q20 60 30 130 z" />
                        <path d="M95 200 q-20 -95 32 -155 q10 85 18 155 z" />
                        <ellipse cx="70" cy="66" rx="36" ry="16" transform="rotate(-20 70 66)" />
                        <ellipse cx="135" cy="50" rx="28" ry="13" transform="rotate(16 135 50)" />
                    </g>
                </svg>
            </div>

            {/* ambient warm glow when near couple */}
            <div
                className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-[1500ms]"
                style={{
                    opacity: nearCouple || heartTapped ? 1 : 0,
                    background:
                        "radial-gradient(ellipse 55% 45% at 32% 88%, rgba(212,175,55,0.14), rgba(3,3,5,0) 70%)",
                }}
            />

            {/* couple silhouette */}
            <div
                className="absolute bottom-[7%] left-[26%] z-10 md:left-[30%]"
                style={par(6, 4)}
                onMouseEnter={() => setNearCouple(true)}
                onMouseLeave={() => setNearCouple(false)}
                data-testid="couple-silhouette"
            >
                <motion.svg
                    viewBox="0 0 300 170"
                    className="w-44 md:w-56"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, delay: 2.2 }}
                >
                    <rect x="30" y="150" width="240" height="6" rx="3" fill="#050507" />
                    <g fill="#040406">
                        <circle cx="118" cy="60" r="17" />
                        <path d="M100 80 q18 -11 36 0 l7 56 q-25 9 -50 0 z" />
                        <circle cx="159" cy="72" r="13.5" />
                        <path d="M146 86 q15 -9 28 2 l5 48 q-19 7 -37 -2 z" />
                    </g>
                </motion.svg>
                {nearCouple && (
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="f-hand absolute -top-10 left-1/2 w-48 -translate-x-1/2 text-center text-xl text-[#f5ecd7]/90"
                        data-testid="couple-hover-message"
                    >
                        This part comes later.
                    </motion.p>
                )}
            </div>

            {/* heart accent */}
            <div className="absolute bottom-[24%] left-[26%] z-20 md:left-[30%]" style={{ marginLeft: "4.2rem" }}>
                <button
                    data-testid="heart-accent"
                    onClick={tapHeart}
                    aria-label="a small heart"
                    className={`block ${heartTapped ? "" : "anim-heartbeat"}`}
                    style={
                        heartTapped
                            ? { animation: "heartbeat 0.7s ease-in-out 2" }
                            : undefined
                    }
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                        <path
                            d="M12 21 c-6.5-4.4-10-8-10-11.8 c0-3 2.3-5.2 5-5.2 c2 0 3.6 1.1 5 3 c1.4-1.9 3-3 5-3 c2.7 0 5 2.2 5 5.2 c0 3.8-3.5 7.4-10 11.8z"
                            fill="#c76d63"
                            style={{ filter: "drop-shadow(0 0 8px rgba(199,109,99,0.7))" }}
                        />
                    </svg>
                </button>
                {heartMsg && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="f-hand absolute -top-9 left-1/2 w-40 -translate-x-1/2 text-center text-lg text-[#f5ecd7]"
                        data-testid="heart-message"
                    >
                        still beating. always.
                    </motion.p>
                )}
            </div>

            {/* title */}
            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
                <motion.h1
                    custom={0}
                    variants={line}
                    initial="hidden"
                    animate="show"
                    data-testid="landing-title"
                    className="f-serif text-5xl font-light tracking-wide text-[#fdfbf7] sm:text-6xl lg:text-7xl"
                >
                    A little place
                </motion.h1>
                <motion.p
                    custom={1}
                    variants={line}
                    initial="hidden"
                    animate="show"
                    className="f-serif mt-2 text-4xl font-light italic text-[#f5ecd7] sm:text-5xl lg:text-6xl"
                >
                    that's just ours.
                </motion.p>
                <motion.p
                    custom={2}
                    variants={line}
                    initial="hidden"
                    animate="show"
                    className="f-ui mt-8 text-xs font-light tracking-[0.25em] text-[#a1a1a6] sm:text-sm"
                >
                    SOME MEMORIES. SOME FEELINGS.
                    <br />
                    AND A LOT OF LOVE.
                </motion.p>
            </div>

            {/* discovery hint */}
            {starHint && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 6, duration: 2.2 }}
                    className="f-hand absolute bottom-24 left-1/2 z-30 -translate-x-1/2 text-lg text-[#a1a1a6]/75"
                    data-testid="star-discovery-hint"
                >
                    there are a few things hiding in the stars.
                </motion.p>
            )}

            {/* enter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.4, duration: 1.6 }}
                className="absolute bottom-9 left-1/2 z-30 -translate-x-1/2"
            >
                <button
                    data-testid="enter-button"
                    onClick={onEnter}
                    className="f-serif group relative border border-[#d4af37]/30 px-10 py-3 text-lg tracking-[0.35em] text-[#f5ecd7] transition-colors duration-700 hover:border-[#d4af37]/70 hover:bg-[#d4af37]/5"
                >
                    enter
                    <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ boxShadow: "0 0 40px rgba(212,175,55,0.15)" }} />
                </button>
            </motion.div>

            {/* vignette */}
            <div
                className="pointer-events-none absolute inset-0 z-40"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(3,3,5,0) 55%, rgba(3,3,5,0.55) 100%)",
                }}
            />
        </div>
    );
}
