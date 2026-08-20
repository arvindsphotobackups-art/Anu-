import { useRef, useState } from "react";
import { Music } from "lucide-react";

export default function MusicControl() {
    const audioRef = useRef(null);
    const fadeRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const fadeTo = (target, done) => {
        const a = audioRef.current;
        if (!a) return;
        clearInterval(fadeRef.current);
        fadeRef.current = setInterval(() => {
            const next = a.volume + (target > a.volume ? 0.04 : -0.04);
            const finished =
                (target === 0 && next <= 0) || (target > 0 && next >= target);
            a.volume = finished ? target : Math.max(0, Math.min(1, next));
            if (finished) {
                clearInterval(fadeRef.current);
                if (done) done();
            }
        }, 70);
    };

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) {
            setPlaying(false);
            fadeTo(0, () => a.pause());
        } else {
            a.volume = 0;
            a.play()
                .then(() => {
                    setPlaying(true);
                    fadeTo(0.5);
                })
                .catch(() => setPlaying(false));
        }
    };

    return (
        <div className="fixed right-5 top-5 z-[70] flex items-center gap-2">
            <audio ref={audioRef} loop preload="none" src="/audio/ambient.wav" />
            {playing && (
                <span className="flex h-3 items-end gap-[3px]" data-testid="music-playing-indicator">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="eq-bar"
                            style={{ animationDelay: `${i * 0.18}s` }}
                        />
                    ))}
                </span>
            )}
            <button
                data-testid="music-toggle"
                onClick={toggle}
                aria-label="toggle music"
                className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-500 ${
                    playing
                        ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37]"
                        : "border-[#fdfbf7]/15 bg-[#0e0e11]/80 text-[#a1a1a6] hover:text-[#fdfbf7]"
                }`}
            >
                <Music size={15} />
            </button>
        </div>
    );
}
