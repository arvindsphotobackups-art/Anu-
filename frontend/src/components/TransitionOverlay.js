import { useMemo } from "react";

export default function TransitionOverlay({ phase }) {
    const stars = useMemo(
        () =>
            Array.from({ length: 42 }, () => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 2 + 1,
            })),
        [],
    );

    if (!phase) return null;
    const closing = phase === "close";

    return (
        <div
            data-testid="chapter-transition"
            className={`fixed inset-0 z-[80] overflow-hidden bg-[#030305] transition-opacity duration-[900ms] ${
                closing ? "opacity-100" : "opacity-0"
            }`}
        >
            {stars.map((s, i) => {
                const dx = 50 - s.left;
                const dy = 50 - s.top;
                return (
                    <span
                        key={i}
                        className="absolute rounded-full bg-[#fdfbf7]"
                        style={{
                            left: `${s.left}%`,
                            top: `${s.top}%`,
                            width: s.size,
                            height: s.size,
                            boxShadow: "0 0 6px rgba(253,251,247,0.8)",
                            transform: closing
                                ? `translate(${dx}vw, ${dy}vh) scale(0.15)`
                                : `translate(0, 0) scale(1)`,
                            opacity: closing ? 0.9 : 0,
                            transition: `transform 1.3s cubic-bezier(0.5, 0, 0.2, 1) ${i * 12}ms, opacity 1.1s ease ${i * 12}ms`,
                        }}
                    />
                );
            })}
            <div
                className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(245,242,235,0.9) 0%, rgba(212,175,55,0.25) 40%, rgba(3,3,5,0) 70%)",
                    transform: `translate(-50%, -50%) scale(${closing ? 1 : 0.1})`,
                    opacity: closing ? 0.9 : 0,
                    transition: "transform 1.2s ease 0.5s, opacity 1s ease 0.5s",
                }}
            />
        </div>
    );
}
