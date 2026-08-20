import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Lock } from "lucide-react";
import { CHAPTERS } from "@/data/chapters";

export default function ChapterNav({ current, unlocked, onNavigate }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[70]">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 14 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute bottom-14 right-0 w-60 rounded-md border border-[#d4af37]/15 bg-[#0e0e11]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-md"
                        data-testid="chapter-nav-panel"
                    >
                        <p className="f-ui px-3 pb-2 pt-2 text-[10px] uppercase tracking-[0.3em] text-[#a1a1a6]">
                            chapters
                        </p>
                        {CHAPTERS.map((c, i) => {
                            const locked = i > unlocked;
                            const active = i === current;
                            return (
                                <button
                                    key={c.id}
                                    data-testid={`chapter-nav-item-${c.id}`}
                                    disabled={locked}
                                    onClick={() => {
                                        setOpen(false);
                                        onNavigate(i);
                                    }}
                                    className={`group flex w-full items-center gap-3 rounded px-3 py-2.5 text-left transition-colors duration-300 ${
                                        locked
                                            ? "cursor-not-allowed opacity-35"
                                            : "hover:bg-[#d4af37]/8"
                                    }`}
                                >
                                    <span
                                        className={`f-serif w-6 text-sm italic ${
                                            active ? "text-[#d4af37]" : "text-[#a1a1a6]"
                                        }`}
                                    >
                                        {c.numeral}
                                    </span>
                                    <span
                                        className={`f-serif flex-1 text-base ${
                                            active ? "text-[#fdfbf7]" : "text-[#a1a1a6] group-hover:text-[#fdfbf7]"
                                        }`}
                                    >
                                        {c.title}
                                    </span>
                                    {locked && <Lock size={12} className="text-[#a1a1a6]" />}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                data-testid="chapter-nav-toggle"
                onClick={() => setOpen((o) => !o)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#0e0e11]/90 text-[#d4af37]/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors duration-300 hover:border-[#d4af37]/50 hover:text-[#d4af37]"
                aria-label="chapters"
            >
                <BookOpen size={16} />
            </button>
        </div>
    );
}
