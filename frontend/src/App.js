import { useCallback, useEffect, useState } from "react";
import "@/App.css";
import Landing from "@/pages/Landing";
import Memories from "@/pages/Memories";
import LittleWorld from "@/pages/LittleWorld";
import Apology from "@/pages/Apology";
import Comic from "@/pages/Comic";
import FinalHit from "@/pages/FinalHit";
import ChapterNav from "@/components/ChapterNav";
import TransitionOverlay from "@/components/TransitionOverlay";
import MusicControl from "@/components/MusicControl";
import { STORAGE_KEY } from "@/data/chapters";

const loadProgress = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {
        /* ignore */
    }
    return { unlocked: 1, memories: [], letters: [], finalLetterRead: false, comicDone: false };
};

function App() {
    const [progress, setProgress] = useState(loadProgress);
    const [chapter, setChapter] = useState(0);
    const [veil, setVeil] = useState(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const navigate = useCallback(
        (target) => {
            if (target === chapter || veil) return;
            if (target > progress.unlocked) return;
            setVeil("close");
            window.setTimeout(() => {
                setChapter(target);
                setVeil("open");
                window.scrollTo(0, 0);
            }, 1450);
            window.setTimeout(() => setVeil(null), 2700);
        },
        [chapter, veil, progress.unlocked],
    );

    const markMemory = (id) =>
        setProgress((p) => {
            if (p.memories.includes(id)) return p;
            const memories = [...p.memories, id];
            return {
                ...p,
                memories,
                unlocked: memories.length >= 5 ? Math.max(p.unlocked, 2) : p.unlocked,
            };
        });

    const markLetter = (id) =>
        setProgress((p) =>
            p.letters.includes(id) ? p : { ...p, letters: [...p.letters, id] },
        );

    const markFinalRead = () =>
        setProgress((p) => ({ ...p, finalLetterRead: true, unlocked: Math.max(p.unlocked, 4) }));

    const touchWorld = () =>
        setProgress((p) => ({ ...p, unlocked: Math.max(p.unlocked, 3) }));

    const finishComic = () => {
        setProgress((p) => ({ ...p, comicDone: true, unlocked: Math.max(p.unlocked, 5) }));
        navigate(5);
    };

    return (
        <div className="App">
            <div className="grain" />
            <MusicControl />
            <ChapterNav current={chapter} unlocked={progress.unlocked} onNavigate={navigate} />
            <TransitionOverlay phase={veil} />

            {chapter === 0 && <Landing onEnter={() => navigate(1)} />}
            {chapter === 1 && (
                <Memories
                    discovered={progress.memories}
                    onDiscover={markMemory}
                    onNext={() => navigate(2)}
                />
            )}
            {chapter === 2 && (
                <LittleWorld onVisit={touchWorld} onNext={() => navigate(3)} />
            )}
            {chapter === 3 && (
                <Apology
                    opened={progress.letters}
                    onOpenLetter={markLetter}
                    finalRead={progress.finalLetterRead}
                    onFinalRead={markFinalRead}
                    onNext={() => navigate(4)}
                />
            )}
            {chapter === 4 && <Comic onFinish={finishComic} />}
            {chapter === 5 && <FinalHit />}
        </div>
    );
}

export default App;
