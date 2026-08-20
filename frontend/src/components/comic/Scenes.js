import { motion } from "framer-motion";
import { Boy, Girl, InkDoodle, MiniPerson } from "@/components/comic/InkCharacters";

const INK = "#1a1a1a";
const CORAL = "#c76d63";
const GOLD = "#d4af37";

const Panel = ({ children, className = "", ...rest }) => (
    <div
        {...rest}
        className={`relative min-h-[280px] overflow-hidden rounded-[4px] border-2 border-[#1a1a1a] bg-[#faf7ef] ${className}`}
        style={{ boxShadow: "3px 4px 0 rgba(26,26,26,0.2)" }}
    >
        {children}
    </div>
);

const Bubble = ({ children, className = "", delay = 0, tail = "left" }) => (
    <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`f-hand absolute z-20 rounded-[14px] border-2 border-[#1a1a1a] bg-[#fdfbf7] px-3 py-1.5 text-lg leading-tight text-[#1a1a1a] shadow-[2px_3px_0_rgba(26,26,26,0.85)] ${className}`}
    >
        {children}
        <span
            className={`absolute -bottom-[9px] h-4 w-4 rotate-45 border-b-2 border-r-2 border-[#1a1a1a] bg-[#fdfbf7] ${
                tail === "left" ? "left-5" : "right-5"
            }`}
        />
    </motion.div>
);

const Note = ({ children, className = "", delay = 0 }) => (
    <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.8 }}
        className={`f-hand absolute z-20 text-lg leading-tight text-[#c76d63] ${className}`}
    >
        {children}
    </motion.p>
);

/* ---------- environment bits ---------- */

const Bookshelf = ({ className = "" }) => (
    <svg viewBox="0 0 200 76" className={className}>
        <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.5">
            <rect x="2" y="2" width="196" height="72" fill="#f1ebdd" />
            <line x1="2" y1="38" x2="198" y2="38" fill="none" />
            {[...Array(8)].map((_, i) => (
                <rect
                    key={i}
                    x={10 + i * 24}
                    y={8}
                    width={9 + (i % 3) * 3}
                    height={30}
                    fill={i % 4 === 1 ? "rgba(199,109,99,0.22)" : i % 4 === 3 ? "rgba(212,175,55,0.22)" : "none"}
                />
            ))}
            {[...Array(7)].map((_, i) => (
                <rect
                    key={i}
                    x={16 + i * 26}
                    y={44}
                    width={10 + (i % 2) * 4}
                    height={30}
                    fill={i % 3 === 0 ? "rgba(26,26,26,0.08)" : "none"}
                />
            ))}
        </g>
    </svg>
);

const LibTable = ({ className = "" }) => (
    <svg viewBox="0 0 170 56" className={className}>
        <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.5" fill="#efe9dc">
            <rect x="4" y="8" width="162" height="13" rx="3" />
            <path d="M24 21 l-5 30 M146 21 l5 30 M70 21 l-2 30 M104 21 l2 30" fill="none" />
            <rect x="60" y="0" width="18" height="8" rx="1" fill="rgba(26,26,26,0.12)" />
            <rect x="84" y="2" width="14" height="6" rx="1" fill="none" />
        </g>
    </svg>
);

const NightWindow = ({ className = "" }) => (
    <svg viewBox="0 0 90 110" className={className}>
        <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.5" fill="none">
            <rect x="4" y="4" width="82" height="102" fill="#e9e4d6" />
            <line x1="45" y1="4" x2="45" y2="106" />
            <line x1="4" y1="55" x2="86" y2="55" />
            <circle cx="63" cy="28" r="11" fill="#fdfbf7" />
            <circle cx="59" cy="25" r="11" fill="#e9e4d6" stroke="none" />
            {[...Array(4)].map((_, i) => (
                <circle key={i} cx={14 + i * 15} cy={70 + (i % 2) * 14} r="1.3" fill={INK} stroke="none" />
            ))}
        </g>
    </svg>
);

const Bed = ({ className = "" }) => (
    <svg viewBox="0 0 150 70" className={className}>
        <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.5" fill="#efe9dc">
            <rect x="4" y="28" width="142" height="20" rx="4" />
            <rect x="10" y="13" width="36" height="17" rx="6" fill="#fdfbf7" />
            <path d="M4 48 l0 18 M146 48 l0 18" fill="none" />
            <path d="M54 32 q34 9 66 2" fill="none" />
        </g>
    </svg>
);

const ChatCard = ({ className = "", children }) => (
    <div className={`rounded-xl border-[3px] border-[#1a1a1a] bg-[#fdfbf7] p-2 ${className}`} style={{ boxShadow: "2px 3px 0 rgba(26,26,26,0.7)" }}>
        {children}
    </div>
);

const ChatLine = ({ right = false, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.45 }}
        className={`f-hand mt-1.5 max-w-[85%] rounded-lg border-2 border-[#1a1a1a] px-2 py-0.5 text-base leading-tight ${
            right ? `ml-auto rounded-br-none bg-[#efe9dc] ${""}` : "rounded-bl-none"
        }`}
    >
        {children}
    </motion.div>
);

/* ---------- scenes ---------- */

const LibraryScene = () => (
    <Panel className="min-h-[340px]" data-testid="comic-scene-1">
        {/* shelves */}
        <Bookshelf className="absolute left-[3%] top-[4%] w-[44%]" />
        <Bookshelf className="absolute right-[3%] top-[4%] w-[44%]" />
        {/* her table + friends */}
        <LibTable className="absolute bottom-[16%] left-[4%] w-[38%]" />
        <Girl expr="nervous" className="absolute bottom-[24%] left-[7%] w-20" />
        <MiniPerson className="anim-bob absolute bottom-[24%] left-[22%] w-9" />
        <MiniPerson className="anim-bob absolute bottom-[24%] left-[31%] w-9" style={{ animationDelay: "0.5s" }} />
        {/* his table */}
        <LibTable className="absolute bottom-[16%] right-[4%] w-[38%]" />
        <Boy expr="smile" className="absolute bottom-[24%] right-[10%] w-20" flip />
        <MiniPerson className="absolute bottom-[24%] right-[26%] w-9" />
        <MiniPerson className="absolute bottom-[24%] right-[34%] w-9" />
        {/* walking her */}
        <motion.div
            className="absolute bottom-[24%] z-10"
            initial={{ left: "30%", opacity: 0 }}
            animate={{ left: "56%", opacity: 1 }}
            transition={{ delay: 3.2, duration: 3, ease: "easeInOut" }}
        >
            <Girl expr="shy" className="w-14" />
        </motion.div>
        {/* bubbles */}
        <Bubble delay={0.6} className="left-[6%] top-[36%]">truth or dare?</Bubble>
        <Bubble delay={1.6} className="left-[26%] top-[46%]">"go talk to him."</Bubble>
        <Bubble delay={4.4} tail="right" className="right-[8%] top-[40%]">???</Bubble>
        <Note delay={2.6} className="left-[8%] top-[24%] rotate-[-3deg]">*she looks over. twice.*</Note>
        <Note delay={3.8} className="left-[46%] top-[62%] rotate-[2deg]">tuk… tuk…</Note>
    </Panel>
);

const FirstMessageScene = () => (
    <Panel className="min-h-[330px]" data-testid="comic-scene-2">
        <NightWindow className="absolute left-[4%] top-[6%] w-[22%]" />
        <Bed className="absolute bottom-[6%] left-[3%] w-[42%]" />
        <div className="anim-tremble absolute bottom-[8%] right-[10%]">
            <Boy expr="nervous" className="w-24" />
        </div>
        {/* phone in his hand */}
        <div className="absolute bottom-[24%] right-[26%] h-16 w-9 rotate-[-8deg] rounded-md border-2 border-[#1a1a1a] bg-[#fdfbf7]" />
        <ChatCard className="absolute left-[6%] top-[34%] w-[46%] max-md:w-[58%]">
            <ChatLine delay={0.6}>"Hi, I'm Anushika, your classmate."</ChatLine>
            <ChatLine delay={2.2}>"what did you say about me in the library??"</ChatLine>
            <ChatLine delay={4} right>
                …about that. funny story.
            </ChatLine>
        </ChatCard>
        {/* sweat drop */}
        <motion.svg
            viewBox="0 0 20 28"
            className="absolute right-[26%] top-[30%] w-4"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.5 }}
        >
            <path d="M10 2 q8 12 0 22 q-8 -10 0 -22z" fill="none" stroke={INK} strokeWidth="2" filter="url(#inkRough)" />
        </motion.svg>
        <Note delay={3.4} className="right-[8%] top-[18%] rotate-[3deg]">*panic typing*</Note>
    </Panel>
);

const CallScene = () => (
    <Panel className="min-h-[330px]" data-testid="comic-scene-3">
        {/* divider */}
        <div className="absolute bottom-[6%] left-1/2 top-[6%] border-l-2 border-dashed border-[#1a1a1a]/40" />
        {/* his room */}
        <NightWindow className="absolute left-[3%] top-[6%] w-[18%]" />
        <Bed className="absolute bottom-[6%] left-[2%] w-[34%]" />
        <div className="anim-tremble absolute bottom-[10%] left-[26%]">
            <Boy expr="nervous" className="w-16 sm:w-24" />
        </div>
        {/* ringing phone */}
        <div className="absolute left-[16%] top-[30%] max-md:left-[24%]">
            <span className="anim-ring absolute -inset-3 rounded-full border-2 border-[#1a1a1a]" />
            <span className="anim-ring absolute -inset-3 rounded-full border-2 border-[#1a1a1a]" style={{ animationDelay: "0.4s" }} />
            <div className="flex h-16 w-9 items-center justify-center rounded-md border-2 border-[#1a1a1a] bg-[#fdfbf7]">
                <span className="f-hand text-xs leading-tight text-[#1a1a1a]">anushika<br />calling…</span>
            </div>
        </div>
        <Note delay={0.4} className="left-[7%] top-[20%] rotate-[-4deg]">trrr… trrr…</Note>
        {/* her room */}
        <NightWindow className="absolute right-[3%] top-[6%] w-[18%]" flip style={{ transform: "scaleX(-1)" }} />
        <Bed className="absolute bottom-[6%] right-[2%] w-[34%]" />
        <div className="anim-bob absolute bottom-[10%] right-[26%]">
            <Girl expr="shy" className="w-16 sm:w-24" />
        </div>
        <div className="absolute bottom-[34%] right-[38%] h-14 w-8 rotate-[8deg] rounded-md border-2 border-[#1a1a1a] bg-[#fdfbf7] max-md:bottom-[30%] max-md:right-[6%]" />
        {/* connection line */}
        <svg viewBox="0 0 400 40" className="absolute left-[24%] top-[22%] w-[52%]">
            <path d="M6 30 Q200 -6 394 26" fill="none" stroke={GOLD} strokeWidth="1.6" strokeDasharray="4 5" filter="url(#inkRough)" />
            <path d="M196 12 c-4 -3 -9 -1 -8 3 c1 3 8 6 8 6 c0 0 7 -3 8 -6 c1 -4 -4 -6 -8 -3z" fill={CORAL} opacity="0.85" />
        </svg>
        <Bubble delay={0.8} className="left-[8%] top-[52%]">*stares at phone*</Bubble>
        <Bubble delay={2.4} tail="right" className="right-[10%] top-[44%]">"h-hlo?"</Bubble>
    </Panel>
);

const FlirtingScene = () => (
    <Panel className="min-h-[330px]" data-testid="comic-scene-4">
        {/* day side */}
        <svg viewBox="0 0 120 90" className="absolute left-[2%] top-[6%] w-[26%]">
            <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.4" fill="none">
                <path d="M20 84 v-30 M10 54 q10 -26 22 -10 q12 -16 22 8 q10 -8 12 10" />
                <path d="M8 84 h60" />
                <circle cx="86" cy="18" r="10" fill="rgba(212,175,55,0.35)" />
            </g>
        </svg>
        {/* bench */}
        <svg viewBox="0 0 140 44" className="absolute bottom-[26%] left-[4%] w-[32%]">
            <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.4" fill="#efe9dc">
                <rect x="4" y="4" width="132" height="8" />
                <rect x="4" y="18" width="132" height="8" />
                <path d="M18 26 v14 M122 26 v14" fill="none" />
            </g>
        </svg>
        <div className="anim-bob absolute bottom-[34%] left-[8%]"><Girl expr="smile" className="w-20" /></div>
        <div className="anim-bob absolute bottom-[34%] left-[22%]" style={{ animationDelay: "0.7s" }}><Boy expr="smile" className="w-20" /></div>
        {/* kitkat between them */}
        <div className="absolute bottom-[46%] left-[19%] rotate-[-6deg]">
            <div className="f-hand border-2 border-[#c76d63] px-1.5 py-0 text-xs tracking-widest text-[#c76d63]">KITKAT</div>
        </div>
        {/* night side — phones + reels */}
        <div className="absolute bottom-[10%] right-[4%] top-[8%] w-[46%] rounded-lg border-2 border-dashed border-[#1a1a1a]/35 max-md:w-[56%]">
            <p className="f-hand absolute -top-4 right-2 bg-[#faf7ef] px-2 text-base text-[#1a1a1a]/60">later that night</p>
            <ChatCard className="absolute left-[6%] top-[12%] w-[64%] max-md:w-[82%]">
                <ChatLine delay={0.6}>send that reel</ChatLine>
                <ChatLine delay={1.5} right>already sent you three 😌</ChatLine>
                <ChatLine delay={2.4}>…one more?</ChatLine>
            </ChatCard>
            <InkDoodle kind="heart" className="anim-float-heart absolute right-[10%] top-[18%] w-5" />
            <InkDoodle kind="heart" className="anim-float-heart absolute right-[24%] top-[42%] w-4" style={{ animationDelay: "1.1s" }} />
            <div className="absolute bottom-[8%] right-[10%] h-16 w-9 rotate-[6deg] rounded-md border-2 border-[#1a1a1a] bg-[#fdfbf7] p-1">
                <div className="h-full w-full rounded-sm bg-[rgba(199,109,99,0.18)]" />
            </div>
        </div>
        <Note delay={3} className="left-[8%] top-[58%] rotate-[-2deg]">*smiling at the phone like an idiot*</Note>
    </Panel>
);

const JealousyScene = () => (
    <Panel className="min-h-[300px]" data-testid="comic-scene-5">
        {/* college corridor hint */}
        <svg viewBox="0 0 120 100" className="absolute left-[3%] top-[6%] w-[26%]">
            <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.4" fill="none">
                <rect x="6" y="10" width="30" height="44" fill="#e9e4d6" />
                <rect x="46" y="10" width="30" height="44" fill="#e9e4d6" />
                <path d="M2 96 h110" />
            </g>
        </svg>
        <Girl expr="smile" className="anim-bob absolute bottom-[8%] left-[10%] w-20" />
        <ChatCard className="absolute left-[26%] top-[16%] w-[38%] max-md:w-[48%]">
            <ChatLine delay={0.6}>saleel was so funny today lol</ChatLine>
            <ChatLine delay={1.8} right>ha. hilarious.</ChatLine>
        </ChatCard>
        {/* him: forced smile then storm */}
        <div className="absolute bottom-[8%] right-[12%]">
            <Boy expr="nervous" className="w-24" />
            <motion.svg viewBox="0 0 60 34" className="absolute -top-9 left-2 w-14"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.7 }}>
                <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.2" fill="none">
                    <path d="M8 18 q4 -12 16 -8 q6 -10 16 -4 q10 -2 12 10 q-20 8 -44 2z" fill="rgba(26,26,26,0.08)" />
                    <path d="M22 24 l-3 6 M34 25 l-3 6" />
                </g>
            </motion.svg>
        </div>
        <Note delay={3} className="right-[24%] top-[50%] rotate-[-3deg]">grrr…</Note>
        <Note delay={1.4} className="right-[10%] top-[18%] rotate-[3deg]">"totally not jealous."</Note>
    </Panel>
);

const BrokenPhoneScene = () => (
    <Panel className="min-h-[320px]" data-testid="comic-scene-6">
        {/* night road */}
        <svg viewBox="0 0 400 120" className="absolute bottom-[16%] left-0 w-full">
            <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.4" fill="none">
                <path d="M0 100 h400" />
                <path d="M30 100 v-56 q0 -6 6 -6 h4 q6 0 6 6 v56" />
                <ellipse cx="38" cy="34" rx="10" ry="6" fill="rgba(212,175,55,0.4)" stroke="none" />
                <path d="M140 104 h34 M230 104 h34 M320 104 h34" strokeDasharray="10 12" />
                <path d="M250 76 q30 -18 70 -6 q20 6 46 2 l8 20 q-60 10 -130 0 z" fill="rgba(26,26,26,0.08)" />
                <circle cx="280" cy="94" r="8" />
                <circle cx="350" cy="94" r="8" />
            </g>
        </svg>
        {/* falling phone */}
        <motion.div
            className="absolute left-[30%] top-[18%]"
            initial={{ y: -46, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 1, rotate: -8 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.3, 1.4, 0.5, 1] }}
        >
            <div className="h-14 w-8 rounded-md border-2 border-[#1a1a1a] bg-[#fdfbf7]" />
        </motion.div>
        <Note delay={1.4} className="left-[24%] top-[10%]">*phone: falls*</Note>
        <Note delay={1.7} className="left-[8%] bottom-[52%] rotate-[-5deg]">krrk!!</Note>
        {/* cracked phone, huge */}
        <div className="absolute bottom-[10%] left-[8%] h-40 w-24 rotate-[-6deg] rounded-xl border-[3px] border-[#1a1a1a] bg-[#fdfbf7] p-2">
            <div className="f-hand mt-1 border-b-2 border-[#1a1a1a]/40 pb-1 text-sm leading-tight">you still awake?</div>
            <div className="f-hand mt-1 border-b-2 border-[#1a1a1a]/40 pb-1 text-sm leading-tight">don't sleep yet</div>
            <svg viewBox="0 0 80 60" className="absolute bottom-1 left-1 h-[58%] w-[90%]">
                <g stroke={INK} strokeWidth="1.6" fill="rgba(26,26,26,0.10)">
                    <path d="M6 4 l20 18 l-8 14 l22 20" fill="none" />
                    <path d="M40 6 l14 16 l-10 10 l18 18" fill="none" />
                    <polygon points="0,18 30,30 20,60 0,60" />
                    <polygon points="46,20 80,34 80,60 40,60" />
                </g>
            </svg>
            <p className="f-hand absolute bottom-1 left-0 right-0 text-center text-xs text-[#1a1a1a]/60">(two lines still work)</p>
        </div>
        {/* him, determined */}
        <div className="absolute bottom-[12%] right-[12%]">
            <Boy expr="smile" className="w-24" />
            <motion.div
                className="absolute -left-8 top-16 h-12 w-7 rounded-md border-2 border-[#1a1a1a] bg-[#fdfbf7]"
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
            />
        </div>
        <Note delay={2.2} className="right-[10%] top-[14%] rotate-[3deg]">*typing intensifies*</Note>
    </Panel>
);

const QuietSemesterScene = () => (
    <Panel className="min-h-[300px]" data-testid="comic-scene-7">
        {/* calendar */}
        <svg viewBox="0 0 90 90" className="absolute left-[5%] top-[8%] w-[22%]">
            <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.4" fill="none">
                <rect x="6" y="12" width="78" height="70" fill="#fdfbf7" />
                <rect x="6" y="12" width="78" height="18" fill="rgba(199,109,99,0.25)" />
                <path d="M24 40 h10 M50 40 h10 M24 56 h10 M50 56 h10 M24 70 h10" strokeDasharray="4 5" />
            </g>
        </svg>
        {/* quiet phone */}
        <div className="absolute left-[16%] top-[48%] h-20 w-11 rotate-[4deg] rounded-lg border-2 border-[#1a1a1a] bg-[#fdfbf7] p-1.5 opacity-80">
            <div className="h-full w-full rounded-sm bg-[#1a1a1a]/5" />
            <p className="f-hand mt-0.5 text-center text-[10px] text-[#1a1a1a]/45">no new messages</p>
        </div>
        {/* empty chat */}
        <ChatCard className="absolute right-[8%] top-[14%] w-[40%] opacity-75 max-md:w-[50%]">
            <div className="f-hand mt-1 max-w-[85%] rounded-lg rounded-bl-none border-2 border-[#1a1a1a]/40 px-2 py-0.5 text-base text-[#1a1a1a]/45">
                goodnight ✨
            </div>
            <p className="f-hand mt-3 text-center text-sm text-[#1a1a1a]/40">— 3 weeks later —</p>
        </ChatCard>
        <Bubble delay={1.6} tail="right" className="right-[10%] top-[52%]">
            "she got committed<br />to saleel."
        </Bubble>
        {/* him stepping back, fading */}
        <motion.div
            className="absolute bottom-[6%]"
            initial={{ left: "52%", opacity: 1 }}
            animate={{ left: "30%", opacity: 0.55 }}
            transition={{ delay: 2.4, duration: 3, ease: "easeInOut" }}
        >
            <Boy expr="sad" className="w-20" flip />
        </motion.div>
    </Panel>
);

const WonderlaScene = () => (
    <div className="space-y-5" data-testid="comic-scene-8">
        <Panel className="min-h-[290px]">
            {/* coaster */}
            <svg viewBox="0 0 400 130" className="absolute left-0 top-[4%] w-full">
                <g filter="url(#inkRough)" stroke={INK} strokeWidth="3" fill="none">
                    <path d="M0 100 q70 -80 140 -34 q56 30 124 4 q80 -28 136 16" />
                    <path d="M70 66 v54 M210 70 v50 M330 68 v52" strokeWidth="2" />
                </g>
                {[...Array(6)].map((_, i) => (
                    <polygon
                        key={i}
                        points={`${20 + i * 66},4 ${30 + i * 66},16 ${10 + i * 66},16`}
                        fill={i % 2 ? "rgba(199,109,99,0.55)" : "rgba(212,175,55,0.55)"}
                    />
                ))}
            </svg>
            {/* crowd */}
            {[...Array(5)].map((_, i) => (
                <MiniPerson key={i} className="absolute bottom-[4%] w-8" style={{ left: `${4 + i * 7}%` }} />
            ))}
            {/* ride car with both */}
            <div className="anim-coaster absolute left-[16%] top-[30%] z-10 max-md:top-[38%]">
                <div className="relative h-14 w-36 rounded-lg border-[3px] border-[#1a1a1a] bg-[rgba(199,109,99,0.28)] max-md:h-12 max-md:w-28">
                    <Girl expr="shock" className="absolute -top-[4.4rem] left-2 w-14 max-md:-top-14 max-md:w-11" />
                    <Boy expr="nervous" className="absolute -top-16 right-2 w-14 max-md:-top-[3.2rem] max-md:w-11" />
                    <span className="f-hand absolute bottom-0.5 left-1/2 -translate-x-1/2 text-sm leading-none text-[#c76d63]">
                        dhak dhak dhak
                    </span>
                </div>
                <Note delay={1.4} className="-left-6 top-16 w-40 max-md:top-14">*death grip on his bicep*</Note>
            </div>
            <Bubble delay={0.8} className="right-[8%] top-[10%] max-md:right-[2%] max-md:top-[3%]" tail="right">"MURUGAAAA!!"</Bubble>
            <Bubble delay={2.2} className="left-[38%] top-[58%]">"open your eyes!"<br />"NO."</Bubble>
        </Panel>
        <Panel className="min-h-[220px]">
            {/* path + railings */}
            <svg viewBox="0 0 400 60" className="absolute bottom-[14%] left-0 w-full">
                <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.2" fill="none">
                    <path d="M0 30 h400 M0 44 h400" />
                    {[...Array(9)].map((_, i) => (
                        <path key={i} d={`M${20 + i * 45} 30 v14`} />
                    ))}
                </g>
            </svg>
            <div className="anim-bob absolute bottom-[24%] left-[16%]"><Boy expr="love" className="w-20" /></div>
            <div className="anim-bob absolute bottom-[24%] left-[34%]" style={{ animationDelay: "0.6s" }}><Girl expr="shy" className="w-20" /></div>
            {/* hand detail inset */}
            <div className="absolute bottom-[16%] right-[8%] h-24 w-24 rounded-full border-2 border-[#1a1a1a] bg-[#fdfbf7]">
                <svg viewBox="0 0 80 80" className="h-full w-full">
                    <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.2" fill="none">
                        <rect x="34" y="14" width="7" height="36" rx="3.5" fill="#efe9dc" />
                        <rect x="44" y="12" width="7" height="38" rx="3.5" fill="#efe9dc" />
                        <path d="M26 56 q-10 -20 4 -30 q-2 16 8 18 l8 2 q12 2 8 -16 q14 10 4 30 q-16 8 -32 -4z" fill="#fdfbf7" />
                        <path d="M62 18 c-3 -2.5 -7 -1 -6.5 2.5 c0.5 2.5 6.5 5 6.5 5 c0 0 6 -2.5 6.5 -5 c0.5 -3.5 -3.5 -5 -6.5 -2.5z" fill={CORAL} stroke="none" opacity="0.85" />
                    </g>
                </svg>
            </div>
            <Note delay={1.2} className="left-[8%] top-[10%] rotate-[-2deg]">her whole hand. two of his fingers.</Note>
        </Panel>
    </div>
);

const GirlsRoomScene = () => (
    <Panel className="min-h-[320px]" data-testid="comic-scene-9">
        {/* room: bed + string lights */}
        <svg viewBox="0 0 400 46" className="absolute left-0 top-[5%] w-full">
            <path d="M0 26 Q200 44 400 20" fill="none" stroke={INK} strokeWidth="1.6" filter="url(#inkRough)" />
            {[...Array(9)].map((_, i) => (
                <circle key={i} cx={24 + i * 44} cy={28 + (i % 2 ? 5 : -2)} r="3" fill="rgba(212,175,55,0.6)" />
            ))}
        </svg>
        <Bed className="absolute bottom-[8%] left-[3%] w-[40%]" />
        {/* friends */}
        <MiniPerson className="anim-bob absolute bottom-[12%] right-[8%] w-11" />
        <MiniPerson className="anim-bob absolute bottom-[12%] right-[17%] w-11" style={{ animationDelay: "0.5s" }} />
        <MiniPerson className="absolute bottom-[34%] right-[6%] w-11" />
        <Bubble delay={2.2} tail="right" className="right-[8%] top-[24%]">"awww"</Bubble>
        <Bubble delay={2.8} tail="right" className="right-[26%] top-[40%]">"oi oi oi"</Bubble>
        {/* him + her on his lap */}
        <Boy expr="shock" className="absolute bottom-[14%] left-[38%] w-24" />
        <motion.div
            className="absolute bottom-[28%] left-[35%] z-10"
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.3, 1.3, 0.5, 1] }}
        >
            <Girl expr="shy" className="w-20" style={{ transform: "rotate(-5deg)" }} />
        </motion.div>
        <InkDoodle kind="heart" className="anim-float-heart absolute left-[55%] top-[30%] w-5" />
        <Note delay={2} className="left-[52%] top-[21%]">muah~</Note>
        <Note delay={1.8} className="left-[36%] top-[16%] rotate-[-2deg] max-md:top-[10%]">*kisses her hand*</Note>
    </Panel>
);

const ConfessionScene = () => (
    <Panel className="min-h-[310px]" data-testid="comic-scene-10">
        {/* calm night */}
        <NightWindow className="absolute left-[38%] top-[5%] w-[24%]" />
        <svg viewBox="0 0 160 40" className="absolute bottom-[10%] left-[30%] w-[40%]">
            <g filter="url(#inkRough)" stroke={INK} strokeWidth="2.4" fill="#efe9dc">
                <rect x="4" y="6" width="152" height="10" rx="3" />
                <path d="M20 16 l-4 20 M140 16 l4 20" fill="none" />
            </g>
        </svg>
        <motion.div className="absolute bottom-[18%]" initial={{ left: "14%" }} animate={{ left: "26%" }} transition={{ delay: 3, duration: 2.6, ease: "easeInOut" }}>
            <Girl expr="shy" className="w-20" />
        </motion.div>
        <motion.div className="absolute bottom-[18%]" initial={{ right: "14%" }} animate={{ right: "26%" }} transition={{ delay: 3, duration: 2.6, ease: "easeInOut" }}>
            <Boy expr="love" className="w-20" flip />
        </motion.div>
        <Bubble delay={0.8} className="left-[6%] top-[30%]">"i have feelings…<br />but i'm scared."</Bubble>
        <Bubble delay={2} tail="right" className="right-[6%] top-[44%]">"then take the chance.<br />with me."</Bubble>
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 5.4, duration: 1 }}
            className="absolute left-1/2 top-[52%] -translate-x-1/2"
        >
            <InkDoodle kind="heart" className="w-7" />
        </motion.div>
    </Panel>
);

const CoverScene = () => (
    <Panel className="flex min-h-[300px] items-end justify-center gap-6 pb-2" data-testid="comic-scene-0">
        <Girl expr="shy" className="w-28" />
        <Boy expr="smile" flip className="w-28" />
        <InkDoodle kind="heart" className="absolute left-[46%] top-[16%] w-6 rotate-6" />
        <InkDoodle kind="star" className="absolute left-[12%] top-[20%] w-5 -rotate-12" />
        <InkDoodle kind="star" className="absolute right-[14%] top-[32%] w-4 rotate-6" />
        <p data-testid="comic-dedication" className="f-hand absolute bottom-3 right-4 rotate-[-3deg] text-xl text-[#c76d63]">
            for Anushika ♡
        </p>
    </Panel>
);

const SCENES = [
    CoverScene,
    LibraryScene,
    FirstMessageScene,
    CallScene,
    FlirtingScene,
    JealousyScene,
    BrokenPhoneScene,
    QuietSemesterScene,
    WonderlaScene,
    GirlsRoomScene,
    ConfessionScene,
];

export default function StoryScene({ index }) {
    const SceneComp = SCENES[index] || CoverScene;
    return <SceneComp />;
}
