# PRD — "a little place" (interactive romantic story website)

## Original problem statement
Build a FRONTEND-ONLY interactive romantic story website (personal gift). No backend, database, auth, APIs, or accounts. Cinematic + dark + intimate + sophisticated + warm aesthetic (near-black, midnight navy, deep charcoal, warm cream, amber/gold, restrained muted coral — never predominantly pink, no Valentine clichés). Six chapters: Landing, Photos/Memories, The Little World, The Apology, Our Story Comic, Final Hit. Chapter-based navigation (no navbar), cinematic transitions, progressive unlocking, placeholder photos in `/public/images/{landing,memories,comic,final}` that the user will replace later. Exact apology letter texts provided (used verbatim). Comic: scrapbook/journal style — cream paper, black ink, limited coral accents, consistent hand-drawn couple (no uploaded reference photos were accessible in this environment, so characters are original ink SVG illustrations in `src/components/comic/InkCharacters.js`).

## Architecture
- React 19 SPA (craco), framer-motion, lucide-react, Tailwind. No backend used.
- `src/App.js` — chapter state machine, localStorage progress (`alittleplace.progress.v1`), cinematic veil transitions, global MusicControl + ChapterNav + film grain.
- `src/pages/` — Landing, Memories, LittleWorld, Apology, Comic, FinalHit (one file per chapter, independently editable).
- `src/data/` — chapters.js, letters.js (exact apology texts), comicStory.js (captions).
- `src/components/` — ChapterNav, TransitionOverlay, MusicControl, comic/InkCharacters.js (Boy/Girl SVG characters with expressions).
- `public/images/` — replaceable placeholder SVGs; `public/audio/` — drop `ambient.mp3` for music.

## User personas
- The gift recipient (her): explores chapters sequentially, discovers hidden interactions.
- The creator (him): edits texts in `src/data/*` and swaps placeholder images.

## Implemented (2026-08-21, iteration 2)
- Comic couple redrawn from the user's real reference photos: him = tousled messy fringe, stubble + mustache, collared shirt; her = side-parted long wavy hair, gold jhumka earrings, signature bright open smile (`src/components/comic/InkCharacters.js`).
- Comic page-turning by finger swipe/drag (framer-motion drag, elastic snap) + mobile "swipe to turn the page" hint.
- Music enabled: generated soft ambient placeholder track at `public/audio/ambient.wav` (slow pad + sparse music-box notes, 36s loop); corner button fades it in/out. User can replace with their own song.

## Implemented (2026-08-20)
- Ch I Landing: night scene, gradual stars/city fade-in, mouse parallax, 3 hidden clickable stars w/ handwritten notes, interactive beating heart accent, couple silhouette hover ("This part comes later."), foliage sway, vignette, Enter → cinematic star-convergence transition.
- Ch II Memories: 5 polaroids each with unique interaction (flip, pull-tab note, corner peel, crumpled note unfold, film-develop), progress "Memories discovered: x/5", 3 hidden stars, "open when…" envelope, unlock gate to Ch III.
- Ch III Little World: late-night room — moon/curtains/moonlight shift, moving clock, breathing lamp, hug-asking teddy (click to hug), phone that lights with romantic-reel placeholder, beating shelf heart, fixed central quote, continue link.
- Ch IV Apology: lamp-lit dark room, 5 envelopes → exact handwritten letters, final sealed envelope after all 5, "I'm sorry. I mean it." + "You deserved a softer version of me.", unlocks comic.
- Ch V Comic: 10-slide scrapbook comic (cream paper, ink, coral accents, tape, doodles, speech bubbles), consistent Boy/Girl ink characters, full story arc incl. library dare, Vadivelu, "Hi, I'm Anushika…", Saleel heartbreak, Wonderla, confession; ends "To be continued." → Ch VI.
- Ch VI Final Hit: tap-through gradual text reveals (exact script), placeholder photo reveal, stars fade in, "This was always for you.", "one last thing…" coda (library callback), quiet END.
- Progressive chapter unlocking persisted in localStorage; chapter nav (book icon, bottom-right) with locks.

## Verified
- Desktop + mobile screenshots of all six chapters; enter transition; memory flip/pull interactions increment progress; apology letter opens with exact text; comic pager (fixed stale-closure bug); final chapter full tap-through incl. coda.

## Known gaps / notes
- `public/audio/ambient.mp3` intentionally absent — user adds their track; button stays silent until then.
- Uploaded comic/couple reference photos were NOT accessible in this environment — characters are original ink SVGs; user can restyle in InkCharacters.js.

## Backlog
- P0: user replaces placeholder photos + adds ambient.mp3.
- P1: restyle comic characters from real reference photos; add more comic panels per beat.
- P2: swipe gestures for comic on mobile; reduced-motion refinement; landing placeholder image integration.
