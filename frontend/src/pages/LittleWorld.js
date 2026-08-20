import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OBJECTS = ["teddy", "phone", "clock", "window", "lamp"];

const MOTES = Array.from({ length: 10 }, (_, i) => ({
    left: `${8 + ((i * 29) % 84)}%`,
    top: `${18 + ((i * 37) % 58)}%`,
    size: 1.5 + ((i * 5) % 3) * 0.6,
    delay: (i * 2.1) % 10,
    dur: 12 + ((i * 3) % 7),
}));

const FoundMark = ({ className = "" }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-none absolute z-20 ${className}`}
    >
        <svg viewBox="0 0 24 24" className="h-3 w-3" style={{ filter: "drop-shadow(0 0 5px rgba(212,175,55,0.75))" }}>
            <path d="M12 3 l1.8 5.7 l5.7 1.8 l-5.7 1.8 l-1.8 5.7 l-1.8 -5.7 l-5.7 -1.8 l5.7 -1.8 z" fill="#d4af37" />
        </svg>
    </motion.span>
);

export default function LittleWorld({ onVisit, onNext }) {
    const [hugged, setHugged] = useState(false);
    const [phoneLit, setPhoneLit] = useState(false);
    const [phoneStage, setPhoneStage] = useState(-1);
    const [clockPhase, setClockPhase] = useState("idle");
    const [windowNote, setWindowNote] = useState(false);
    const [lampNote, setLampNote] = useState(false);
    const [found, setFound] = useState([]);
    const [finalStage, setFinalStage] = useState(0);
    const [activeId, setActiveId] = useState(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const timers = useRef([]);

    const later = (fn, ms) => {
        timers.current.push(setTimeout(fn, ms));
    };

    const play = (id) => ({ animationPlayState: activeId === id ? "paused" : "running" });
    const release = (id) => setActiveId((cur) => (cur === id ? null : cur));

    // near-imperceptible depth between the layers of the room
    const par = (fx, fy) => ({
        transform: `translate3d(${(mouse.x * fx).toFixed(1)}px, ${(mouse.y * fy).toFixed(1)}px, 0)`,
        transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
    });

    const onMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({
            x: (e.clientX - r.left) / r.width - 0.5,
            y: (e.clientY - r.top) / r.height - 0.5,
        });
    };

    useEffect(() => {
        onVisit();
        // the room settles into its nighttime state, then small things begin
        later(() => setPhoneLit(true), 4600);
        later(() => setPhoneLit(false), 9200);
        return () => timers.current.forEach(clearTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const discover = (id) => setFound((f) => (f.includes(id) ? f : [...f, id]));

    useEffect(() => {
        if (found.length === OBJECTS.length && finalStage === 0) {
            later(() => setFinalStage(1), 2600);
            later(() => setFinalStage(2), 6400);
            later(() => setFinalStage(3), 10300);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [found]);

    const hug = () => {
        discover("teddy");
        setActiveId("teddy");
        setHugged(true);
        later(() => {
            setHugged(false);
            release("teddy");
        }, 7000);
    };

    const tapPhone = () => {
        discover("phone");
        if (phoneStage >= 0) return;
        setActiveId("phone");
        setPhoneLit(true);
        setPhoneStage(0);
        later(() => setPhoneStage(1), 1700);
        later(() => setPhoneStage(2), 3400);
        later(() => setPhoneStage(3), 5100);
        later(() => {
            setPhoneStage(-1);
            setPhoneLit(false);
            release("phone");
        }, 11500);
    };

    const tapClock = () => {
        discover("clock");
        if (clockPhase !== "idle") return;
        setActiveId("clock");
        setClockPhase("spin");
        later(() => setClockPhase("settled"), 1800);
        later(() => {
            setClockPhase("idle");
            release("clock");
        }, 9500);
    };

    const tapWindow = () => {
        discover("window");
        setActiveId("window");
        setWindowNote(true);
        later(() => {
            setWindowNote(false);
            release("window");
        }, 6000);
    };

    const tapLamp = () => {
        discover("lamp");
        setActiveId("lamp");
        setLampNote(true);
        later(() => {
            setLampNote(false);
            release("lamp");
        }, 6000);
    };

    const handStyle = (idleAnim, settleDeg) =>
        clockPhase === "spin"
            ? { animation: "spin 0.7s linear infinite" }
            : clockPhase === "settled"
              ? { transform: `translateX(-50%) rotate(${settleDeg}deg)`, transition: "transform 1.2s ease" }
              : { animation: idleAnim, ...play("clock") };

    const phoneIdle = phoneStage === -1 && !phoneLit;

    return (
        <div
            data-testid="little-world-page"
            onMouseMove={onMove}
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
                    ...par(2, 1),
                    background:
                        "radial-gradient(ellipse 60% 50% at 78% 70%, rgba(212,175,55,0.06), rgba(3,3,5,0) 70%), radial-gradient(ellipse 45% 55% at 18% 35%, rgba(120,140,190,0.07), rgba(3,3,5,0) 70%)",
                }}
            />

            {/* the whole room breathing, almost imperceptibly */}
            <div
                className="anim-room-breath pointer-events-none absolute inset-0"
                style={{
                    ...par(2, 1),
                    background:
                        "radial-gradient(ellipse 70% 60% at 60% 62%, rgba(212,175,55,0.05) 0%, rgba(3,3,5,0) 70%)",
                }}
            />

            {/* dust drifting through the room */}
            <div className="pointer-events-none absolute inset-0" style={par(14, 9)}>
                {MOTES.map((m, i) => (
                    <span
                        key={i}
                        className="anim-mote absolute rounded-full bg-[#d4af37]"
                        style={{
                            left: m.left,
                            top: m.top,
                            width: m.size,
                            height: m.size,
                            animationDelay: `${m.delay}s`,
                            animationDuration: `${m.dur}s`,
                        }}
                    />
                ))}
            </div>

            {/* moonlight spilling onto the wall beside the window */}
            <div
                className="pointer-events-none absolute left-[33%] top-[16%] h-[52%] w-[16%]"
                style={{
                    background:
                        "linear-gradient(100deg, rgba(245,242,235,0.05) 0%, rgba(245,242,235,0) 70%)",
                    animation: "moonbeam 24s ease-in-out infinite",
                    ...play("window"),
                }}
            />

            {/* window + moon + curtains */}
            <div
                className="absolute left-[7%] top-[12%] h-[44%] w-[26%] min-w-[200px] cursor-pointer"
                onClick={tapWindow}
                data-testid="world-window"
                role="button"
                aria-label="window"
                style={par(5, 3)}
            >
                {found.includes("window") && <FoundMark className="-right-2 -top-3" />}
                <div className="relative h-full w-full overflow-hidden border-[6px] border-[#060609] bg-[#070b16]">
                    <div
                        className="absolute right-[18%] top-[14%] h-12 w-12 rounded-full"
                        style={{
                            background: "#f5f2eb",
                            opacity: 0.85,
                            boxShadow: "0 0 40px 12px rgba(245,242,235,0.18)",
                            animation: "moonbeam 17s ease-in-out infinite",
                            ...play("window"),
                        }}
                    />
                    {/* slow cloud crossing the moon */}
                    <div
                        className="anim-cloud absolute top-[16%] h-7 w-24 rounded-full bg-[#0b101e]/80 blur-[3px]"
                        style={play("window")}
                    />
                    {/* a distant vehicle passing, far below */}
                    <span
                        className="anim-car-light absolute bottom-[12%] left-0 h-[3px] w-8 rounded-full"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.55) 100%)",
                            filter: "blur(2px)",
                            animationDelay: "11s",
                            ...play("window"),
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
                                ...play("window"),
                            }}
                        />
                    ))}
                    {/* moonlight beam */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(115deg, rgba(245,242,235,0.10) 0%, rgba(245,242,235,0) 55%)",
                            animation: "moonbeam 19s ease-in-out infinite",
                            ...play("window"),
                        }}
                    />
                    {/* curtains */}
                    <div
                        className="anim-sway-calm absolute left-0 top-0 h-full w-[34%]"
                        style={{
                            background: "linear-gradient(90deg, #151222 0%, #1c1830 60%, rgba(28,24,48,0.2) 100%)",
                            animationDuration: "13s",
                            ...play("window"),
                        }}
                    />
                    <div
                        className="anim-sway-calm absolute right-0 top-0 h-full w-[34%]"
                        style={{
                            background: "linear-gradient(270deg, #151222 0%, #1c1830 60%, rgba(28,24,48,0.2) 100%)",
                            animationDuration: "17s",
                            animationDelay: "2.3s",
                            ...play("window"),
                        }}
                    />
                </div>
                <div className="mx-auto h-2 w-[110%] -translate-x-[5%] bg-[#060609]" />
            </div>
            <AnimatePresence>
                {windowNote && (
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="f-hand absolute left-[9%] top-[59%] z-20 w-60 text-xl leading-snug text-[#f5ecd7]"
                        data-testid="window-memory-note"
                    >
                        "We could turn an ordinary evening
                        <br />
                        into a whole little world."
                    </motion.p>
                )}
            </AnimatePresence>

            {/* clock */}
            <button
                className="absolute right-[12%] top-[10%] flex flex-col items-center"
                data-testid="world-clock"
                onClick={tapClock}
                aria-label="clock"
                style={par(3, 2)}
            >
                {found.includes("clock") && <FoundMark className="-left-6 top-0" />}
                <div className="relative h-24 w-24 rounded-full border-2 border-[#f5f2eb]/15 bg-[#0a0a0e]">
                    {/* faint reflected ambience around the clock */}
                    <span
                        className="absolute -inset-6 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0) 70%)",
                            animation: "clockHalo 17s ease-in-out infinite",
                            ...play("clock"),
                        }}
                    />
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
                        style={handStyle("spin 240s linear infinite", 32)}
                    />
                    <span
                        className="absolute bottom-1/2 left-1/2 h-10 w-[2px] origin-bottom rounded bg-[#d4af37]/80"
                        style={handStyle("spin 24s linear infinite", 4)}
                    />
                    <span
                        className="absolute bottom-1/2 left-1/2 h-10 w-[1px] origin-bottom rounded bg-[#f5f2eb]/45"
                        style={handStyle("spin 60s steps(60) infinite", 186)}
                    />
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f2eb]" />
                </div>
                <div className="anim-sway relative -mt-1 h-7 w-[2px] bg-[#f5f2eb]/20" style={{ animationDuration: "2.2s", ...play("clock") }}>
                    <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#d4af37]/50" />
                </div>
                <p className="f-hand mt-1 text-lg text-[#a1a1a6]" data-testid="clock-caption">
                    {clockPhase === "idle" ? "somewhere past 1am" : "somewhere past 1am, again."}
                </p>
                <AnimatePresence>
                    {clockPhase === "settled" && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="f-hand mt-1 w-56 text-center text-base leading-tight text-[#a1a1a6]/80"
                            data-testid="clock-memory-note"
                        >
                            those nights when we somehow always
                            <br />
                            had one more thing to talk about.
                        </motion.p>
                    )}
                </AnimatePresence>
            </button>

            {/* lamp light washing the wall */}
            <div
                className="pointer-events-none absolute bottom-[16%] right-[4%] h-[48%] w-[42%]"
                style={{
                    ...par(4, 2),
                    background:
                        "radial-gradient(ellipse 60% 60% at 55% 75%, rgba(212,175,55,0.09) 0%, rgba(3,3,5,0) 70%)",
                    animation: "lampWash 19s ease-in-out infinite",
                    ...play("lamp"),
                }}
            />

            {/* desk + lamp */}
            <div className="absolute bottom-0 right-[4%] h-[30%] w-[34%] min-w-[260px]" style={par(7, 4)}>
                <div className="absolute bottom-0 h-[26%] w-full bg-gradient-to-t from-[#0c0a08] to-[#12100c]" />
                <div
                    className="anim-breathe absolute -top-16 left-[30%] h-64 w-64 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.05) 45%, rgba(3,3,5,0) 70%)",
                        animation: "breathe 6s ease-in-out infinite, lampHum 11s linear infinite",
                        ...play("lamp"),
                    }}
                />
                {/* warm pool of light on the desk */}
                <div
                    className="absolute bottom-[16%] left-[14%] h-10 w-52 rounded-[50%]"
                    style={{
                        background: "radial-gradient(ellipse, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0) 70%)",
                        animation: "lampWash 23s ease-in-out infinite",
                        ...play("lamp"),
                    }}
                />
                {/* tiny sparks rising through the light */}
                {[...Array(3)].map((_, i) => (
                    <span
                        key={i}
                        className="anim-mote absolute rounded-full bg-[#d4af37]"
                        style={{
                            left: `${34 + i * 8}%`,
                            bottom: "34%",
                            width: 2,
                            height: 2,
                            animationDelay: `${i * 1.4}s`,
                            animationDuration: "5s",
                            ...play("lamp"),
                        }}
                    />
                ))}
                <button
                    data-testid="world-lamp"
                    onClick={tapLamp}
                    aria-label="lamp"
                    className="absolute bottom-[20%] left-[34%]"
                >
                    {found.includes("lamp") && <FoundMark className="-left-3 -top-6" />}
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
                            transition={{ duration: 1 }}
                            className="f-hand absolute -top-10 left-[2%] w-52 text-xl leading-snug text-[#f5ecd7]"
                            data-testid="lamp-memory-note"
                        >
                            "You made even doing nothing
                            <br />
                            feel like something."
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
                    {found.includes("phone") && <FoundMark className="-left-5 -top-3" />}
                    {/* the light it casts on the desk when it wakes */}
                    <span
                        className="absolute -inset-4 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(140,160,200,0.25) 0%, rgba(140,160,200,0) 70%)",
                            animation: phoneIdle || phoneLit ? "phoneCast 17s linear infinite" : "none",
                            ...play("phone"),
                        }}
                    />
                    <span
                        className="absolute inset-1 rounded-md bg-[#1a2030]"
                        style={{
                            opacity: phoneIdle ? undefined : 0.95,
                            animation: phoneIdle ? "screenGlow 17s linear infinite" : "none",
                            ...play("phone"),
                        }}
                    />
                    <span
                        className="absolute inset-2 flex flex-col items-center justify-center gap-1 rounded"
                        style={{
                            opacity: phoneIdle ? undefined : 1,
                            animation: phoneIdle ? "reelGlow 17s linear infinite" : "none",
                            ...play("phone"),
                        }}
                    >
                        <span className="f-ui text-[8px] font-medium tracking-wide text-[#f5f2eb]">anushika</span>
                        <span className="f-hand text-[11px] leading-none text-[#f5f2eb]">sent you a reel ❤️</span>
                        <span className="f-ui text-[7px] tracking-widest text-[#a1a1a6]">now</span>
                    </span>
                </button>

                {/* tiny chat sequence, then the memory */}
                <AnimatePresence>
                    {phoneStage >= 0 && phoneStage < 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.7 }}
                            className="absolute bottom-[78%] right-[4%] z-20 w-48 space-y-2"
                            data-testid="phone-chat-sequence"
                        >
                            <div className="rounded-lg border border-[#f5f2eb]/12 bg-[#12141c]/95 px-3 py-2">
                                <p className="f-ui text-[10px] font-semibold tracking-wide text-[#f5f2eb]">anushika ❤️</p>
                                <p className="f-hand text-base leading-tight text-[#f5f2eb]/90">sent you a reel</p>
                            </div>
                            {phoneStage >= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="ml-8 rounded-lg border border-[#f5f2eb]/12 bg-[#1a2030]/95 px-3 py-2"
                                >
                                    <p className="f-hand text-base leading-tight text-[#f5f2eb]/90">you: okay. LAST one.</p>
                                </motion.div>
                            )}
                            {phoneStage >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-lg border border-[#f5f2eb]/12 bg-[#12141c]/95 px-3 py-2"
                                >
                                    <p className="f-hand text-base leading-tight text-[#f5f2eb]/90">
                                        anushika: you said that 12 reels ago
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                    {phoneStage === 3 && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="f-hand absolute bottom-[78%] right-[4%] z-20 w-52 text-xl leading-snug text-[#f5ecd7]"
                            data-testid="phone-memory-note"
                        >
                            "One reel. One reply.
                            <br />
                            Then somehow two hours disappeared."
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* teddy */}
            <div className="absolute bottom-[6%] left-[10%]" data-testid="world-teddy" style={par(10, 6)}>
                <button onClick={hug} aria-label="teddy bear" className="relative block" data-testid="world-teddy-button">
                    {found.includes("teddy") && <FoundMark className="-right-6 -top-3" />}
                    <svg viewBox="0 0 120 130" className={`anim-teddy-idle w-28 transition-transform duration-700 ${hugged ? "scale-95" : ""}`} style={play("teddy")}>
                        <ellipse cx="60" cy="88" rx="30" ry="34" fill="#2e2620" />
                        <ellipse cx="60" cy="92" rx="17" ry="22" fill="#3a3028" />
                        <circle cx="40" cy="26" r="10" fill="#2e2620" />
                        <circle cx="40" cy="26" r="5" fill="#3a3028" />
                        <g className="anim-ear" style={play("teddy")}>
                            <circle cx="80" cy="26" r="10" fill="#2e2620" />
                            <circle cx="80" cy="26" r="5" fill="#3a3028" />
                        </g>
                        <circle cx="60" cy="44" r="24" fill="#2e2620" />
                        <ellipse cx="60" cy="52" rx="10" ry="7" fill="#3a3028" />
                        <circle cx="51" cy="40" r="2.4" fill="#0a0a0c" />
                        <circle cx="69" cy="40" r="2.4" fill="#0a0a0c" />
                        <ellipse cx="60" cy="50" rx="3" ry="2.2" fill="#0a0a0c" />
                        <g style={{ transformBox: "fill-box", transformOrigin: "right center", animation: "armAskL 9s ease-in-out infinite", ...play("teddy") }}>
                            <ellipse cx="30" cy="82" rx="9" ry="18" fill="#2e2620" transform="rotate(20 30 82)" />
                        </g>
                        <g style={{ transformBox: "fill-box", transformOrigin: "left center", animation: "armAskR 9s ease-in-out infinite", ...play("teddy") }}>
                            <ellipse cx="90" cy="82" rx="9" ry="18" fill="#2e2620" transform="rotate(-20 90 82)" />
                        </g>
                    </svg>
                    <span
                        className="f-hand pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-[#f5f2eb]/15 bg-[#121214] px-3 py-1 text-base text-[#f5f2eb]"
                        style={{ animation: "bubbleAsk 9s ease-in-out infinite", opacity: hugged ? 0 : undefined, ...play("teddy") }}
                        data-testid="teddy-hug-bubble"
                    >
                        hug?
                    </span>
                    {hugged && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 1.1 }}
                            className="f-hand absolute -top-24 left-1/2 w-60 -translate-x-1/2 text-center text-lg leading-snug text-[#f5ecd7]"
                            data-testid="teddy-hugged-message"
                        >
                            "I miss your childish little moments.
                            <br />
                            The way you'd baby me.
                            <br />
                            The version of you that made everything softer."
                        </motion.span>
                    )}
                </button>
            </div>

            {/* shelf with our little constellation */}
            <div className="absolute left-[38%] top-[26%] hidden md:block" style={par(5, 3)}>
                <div className="h-[3px] w-36 bg-[#181410]" />
                <svg
                    viewBox="0 0 90 34"
                    className="anim-sway absolute -top-7 left-3 w-20"
                    style={{ animationDuration: "12s" }}
                    data-testid="world-constellation"
                >
                    <path d="M10 24 Q45 6 80 20" fill="none" stroke="#d4af37" strokeWidth="1.1" strokeDasharray="3 4" opacity="0.65" />
                    <path d="M10 20 l1.5 3 l3 0.3 l-2.3 2.1 l0.7 3 l-2.9 -1.6 l-2.9 1.6 l0.7 -3 l-2.3 -2.1 l3 -0.3 z" fill="none" stroke="#f5ecd7" strokeWidth="1.1" />
                    <path d="M80 16 l1.5 3 l3 0.3 l-2.3 2.1 l0.7 3 l-2.9 -1.6 l-2.9 1.6 l0.7 -3 l-2.3 -2.1 l3 -0.3 z" fill="none" stroke="#f5ecd7" strokeWidth="1.1" />
                </svg>
            </div>

            {/* the discovered sparkles connect into our constellation */}
            {found.length === OBJECTS.length && (
                <svg
                    className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    data-testid="world-constellation-finale"
                >
                    <motion.path
                        d="M17 74 L33 11 L81 10 L89 78 L73 72 Z"
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth="1"
                        strokeDasharray="2.5 3"
                        opacity="0.5"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4, delay: 0.8, ease: "easeInOut" }}
                    />
                </svg>
            )}

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
                <AnimatePresence>
                    {finalStage >= 1 && (
                        <motion.p
                            key="final1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.8 }}
                            className="f-hand mt-10 text-2xl text-[#f5ecd7]"
                            data-testid="world-final-line-1"
                        >
                            "Maybe I don't miss the big things."
                        </motion.p>
                    )}
                    {finalStage >= 2 && (
                        <motion.p
                            key="final2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                            className="f-hand mt-2 text-2xl text-[#f5ecd7]"
                            data-testid="world-final-line-2"
                        >
                            "I miss the little ones."
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* continue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: finalStage >= 3 ? 1 : 0 }}
                transition={{ duration: 1.8 }}
                className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
            >
                <button
                    data-testid="world-next-chapter"
                    onClick={onNext}
                    className={`f-ui text-xs tracking-[0.35em] text-[#a1a1a6] underline decoration-[#d4af37]/30 underline-offset-8 transition-colors duration-500 hover:text-[#f5ecd7] ${finalStage >= 3 ? "" : "pointer-events-none"}`}
                >
                    THE THINGS I SHOULD HAVE DONE BETTER →
                </button>
            </motion.div>

            {/* the room settling into night when she arrives */}
            <div
                className="anim-reveal-room pointer-events-none absolute inset-0 z-30 bg-[#030305]"
                data-testid="world-settle-veil"
            />

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
