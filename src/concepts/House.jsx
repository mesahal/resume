import { useEffect, useRef, useState } from 'react';
import { studioProjects } from './Studio';
import './house.css';
import { Study, Lounge, MediaStudio, Porch, MoreProjects } from './HouseRooms';

// A guided tour, with a direct route to every room.
export const ROOMS = [
  { id: 'entrance', n: '00', name: 'Entrance' },
  { id: 'hall', n: '01', name: 'Hall' },
  { id: 'workshop', n: '02', name: 'Workshop' },
  { id: 'study', n: '03', name: 'Study' },
  { id: 'lounge', n: '04', name: 'Lounge' },
  { id: 'studio', n: '05', name: 'Studio' },
  { id: 'porch', n: '06', name: 'Porch' },
];
const OPEN = ROOMS;

const EXHIBITS = [
  { id: 'word', tag: 'PLAY', title: 'Word Detective' },
  { id: 'butterfly', tag: 'CONNECT', title: 'My Butterfly' },
  { id: 'accelera', tag: 'CREATE', title: 'Accelera GP' },
  { id: 'tools', tag: 'TOOLS', title: 'The pegboard' },
];

// Taken from the existing Skills section.
export const TOOL_DOMAINS = [
  { title: 'Backend', items: 'Java · Spring Boot · REST APIs · Microservices · Spring Security · Spring Data JPA · Spring Batch' },
  { title: 'Frontend', items: 'React · JavaScript · HTML5 · CSS3 · Tailwind CSS · Vue · Thymeleaf' },
  { title: 'AI tooling', items: 'OpenAI API · Claude Code · Cursor · Windsurf · ChatGPT · Antigravity · Gemini' },
  { title: 'Databases', items: 'Oracle · MySQL · PostgreSQL' },
  { title: 'DevOps', items: 'Docker · Jenkins · CI/CD · Git · Linux · Maven · GitHub Actions · AWS' },
];

// Deep links: #workshop, #workshop/word, and ?lights=off for the night house.
const initialLocation = () => {
  const [roomId, exhibit] = window.location.hash.replace('#', '').split('/');
  const room = OPEN.some((r) => r.id === roomId) ? roomId : 'entrance';
  const selected = room === 'workshop' && EXHIBITS.some((e) => e.id === exhibit) ? exhibit : null;
  return { room, selected };
};

export default function House() {
  const host = useRef(null), scene = useRef(null), heading = useRef(null);
  const triggers = useRef({}), firstRender = useRef(true), tileSequence = useRef([]);
  const [start] = useState(initialLocation);
  const [room, setRoom] = useState(start.room);
  const [selected, setSelected] = useState(start.selected);
  const [night, setNight] = useState(() => new URLSearchParams(window.location.search).get('lights') === 'off');
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [tileMessage, setTileMessage] = useState('');
  const [systemReduced, setSystemReduced] = useState(() => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const reduced = paused || systemReduced;

  // The scene calls back into the latest handlers without being re-created.
  const state = useRef({});
  state.current = { room, selected, night, reduced };
  const goRoom = (id) => { setRoom(id); setSelected(null); };
  const step = (direction) => {
    const index = OPEN.findIndex((r) => r.id === state.current.room);
    const next = OPEN[index + direction];
    if (next) goRoom(next.id);
  };
  const openExhibit = (id) => { setRoom('workshop'); setSelected(id); };
  const handlers = useRef({});
  handlers.current = {
    onHotspot: openExhibit,
    onDoor: () => step(1),
    onSwitch: () => setNight((value) => !value),
    onSwipe: step,
    onTile: (index) => {
      const sequence = tileSequence.current;
      if (index === sequence.length) sequence.push(index); else tileSequence.current = index === 0 ? [0] : [];
      if (tileSequence.current.length === 5) { setTileMessage('B-U-I-L-D. Exactly. Let’s build.'); tileSequence.current = []; }
      else setTileMessage(tileSequence.current.length ? 'BUILD'.slice(0, tileSequence.current.length) : 'Try the tiles in order: B, U, I, L, D.');
    },
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'At home with Md Sahal — Software Engineer II';
    const robots = document.querySelector('meta[name="robots"]');
    const previousRobots = robots?.content;
    if (robots) robots.content = 'noindex, nofollow';
    const media = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const changed = () => setSystemReduced(media.matches);
    media?.addEventListener('change', changed);
    let cancelled = false;
    import('./houseScene').then(({ createHouse }) => cancelled ? null : createHouse(host.current, {
      onHotspot: (id) => handlers.current.onHotspot(id),
      onDoor: () => handlers.current.onDoor(),
      onSwitch: () => handlers.current.onSwitch(),
      onSwipe: (d) => handlers.current.onSwipe(d),
      onTile: (i) => handlers.current.onTile(i),
      onReady: () => { if (!cancelled) setReady(true); },
      onError: () => { if (!cancelled) setFailed(true); },
      reduced: state.current.reduced, night: state.current.night, room: state.current.room,
    })).then((api) => {
      if (cancelled) { api?.dispose(); return; }
      scene.current = api;
      api?.goTo(state.current.room);
      api?.focus(state.current.selected);
      api?.setNight(state.current.night);
      api?.setReduced(state.current.reduced);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => {
      cancelled = true;
      scene.current?.dispose();
      scene.current = null;
      media?.removeEventListener('change', changed);
      document.title = previousTitle;
      if (robots) robots.content = previousRobots;
    };
  }, []);

  useEffect(() => { scene.current?.goTo(room); }, [room]);
  useEffect(() => { scene.current?.focus(selected); }, [selected]);
  useEffect(() => { window.history.replaceState(null, '', `#${room}${selected ? `/${selected}` : ''}`); }, [room, selected]);
  useEffect(() => { scene.current?.setNight(night); }, [night]);
  useEffect(() => { scene.current?.setReduced(reduced); }, [reduced]);
  // Move focus to the new heading after the visitor walks or opens something.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    heading.current?.focus({ preventScroll: true });
    if (window.innerWidth <= 900) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [room, selected]);
  useEffect(() => {
    const onKey = (event) => {
      if (event.target.closest?.('input, textarea, select, [role=group]')) return;
      if (event.key === 'ArrowRight') handlers.current.onSwipe(1);
      else if (event.key === 'ArrowLeft') handlers.current.onSwipe(-1);
      else if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const back = () => { const previous = selected; setSelected(null); setTimeout(() => triggers.current[previous]?.focus(), 0); };
  const project = studioProjects[selected];
  const roomIndex = OPEN.findIndex((r) => r.id === room);
  const current = ROOMS.find((r) => r.id === room);

  return (
    <main className={`hs-root ${night ? 'hs-night' : ''} ${selected ? 'hs-focused' : ''}`} data-reduced={reduced ? 'true' : 'false'} data-room={room}>
      <header className="hs-header">
        <a href="/__concepts/" className="hs-logo"><span aria-hidden="true">s.</span><span>MD SAHAL<br /><small>Engineer. Maker. Curious mind.</small></span></a>
        <div>
          <button className="hs-quick" onClick={() => goRoom('study')}>Experience</button>
          <a className="hs-resume" href="/resume-2026.pdf" download="Md-Sahal-Resume.pdf" aria-label="Download résumé">Résumé <span aria-hidden="true">↓</span></a>
          <a className="hs-contact" href="mailto:mdsahal.info@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <div className="hs-stage">
        <p className="hs-sr" role="status">{`You are in the ${current.name.toLowerCase()}.`}</p>
        <div className="hs-panel" key={room}>
          {!selected && room === 'entrance' && <section aria-label="The entrance">
            <p className="hs-eyebrow">A little house. A lot of possibilities.</p>
            <h1 ref={heading} tabIndex={-1}>Good things<br /><em>start with hello.</em></h1>
            <div className="hs-nameplate"><strong>Md Sahal</strong><span>Software Engineer II</span><small>Brain Station 23 · Dhaka, Bangladesh</small></div>
            <button className="hs-enter" onClick={() => goRoom('hall')}>Enter the house <span aria-hidden="true">↗</span></button>
            <p className="hs-body">Welcome to my corner of the internet. Come inside for the work, the stories, and the person behind the code.</p>
            <p className="hs-hint">Six rooms to explore. Take the tour, or choose a room below.</p>
          </section>}
          {!selected && room === 'study' && <Study heading={heading} />}
          {!selected && room === 'lounge' && <Lounge heading={heading} />}
          {!selected && room === 'studio' && <MediaStudio heading={heading} />}
          {!selected && room === 'porch' && <Porch heading={heading} />}
          {!selected && room === 'hall' && (
            <section aria-label="The hall">
              <p className="hs-eyebrow">01 / The hall</p>
              <h1 ref={heading} tabIndex={-1}>Come in.<br /><em>Make yourself at home.</em></h1>
              <p className="hs-body">As-salamu alaykum. I’m Md Sahal, a software engineer in Dhaka. Each room in this house holds a different part of my work.</p>
              <p className="hs-meta"><strong>Software Engineer II</strong> · Brain Station 23<br />Company tenure: April 2024–Present</p>
              <button className="hs-primary" onClick={() => step(1)}>Walk through to the workshop <span aria-hidden="true">→</span></button>
              <p className="hs-hint">Tap the letter tiles in order. Flip the light switch on the wall.</p>
              {tileMessage && <p className="hs-tile-message" role="status">{tileMessage}</p>}
            </section>
          )}
          {!selected && room === 'workshop' && (
            <section aria-label="The workshop">
              <p className="hs-eyebrow">02 / The workshop</p>
              <h2 ref={heading} tabIndex={-1}>Where things<br /><em>get built.</em></h2>
              <p className="hs-body">Pick something up. Three products, and the tools behind them.</p>
              <ul className="hs-exhibits">
                {EXHIBITS.map((exhibit, i) => (
                  <li key={exhibit.id}>
                    <button ref={(node) => { triggers.current[exhibit.id] = node; }} onClick={() => setSelected(exhibit.id)} aria-label={`Explore ${exhibit.title}`}>
                      <small>0{i + 1} / {exhibit.tag}</small><strong>{exhibit.title}</strong><span aria-hidden="true">↗</span>
                    </button>
                  </li>
                ))}
              </ul>
              <MoreProjects />
              <button className="hs-text-button" onClick={() => step(-1)}><span aria-hidden="true">←</span> Back to the hall</button>
            </section>
          )}
          {project && (
            <section aria-label="Selected exhibit" className="hs-project">
              <button className="hs-text-button" aria-label="Back to the workshop" onClick={back}><span aria-hidden="true">←</span> Back to the workshop</button>
              <p className="hs-eyebrow">{project.category}</p>
              <h2 ref={heading} tabIndex={-1}>{project.title}</h2>
              <p className="hs-body">{project.description}</p>
              <p className="hs-meta">{project.stack}</p>
              {project.url && <a className="hs-link" href={project.url} target="_blank" rel="noreferrer">{project.link} <span aria-hidden="true">↗</span></a>}
              {project.note && <p className="hs-note">{project.note}</p>}
            </section>
          )}
          {selected === 'tools' && (
            <section aria-label="Selected exhibit" className="hs-project">
              <button className="hs-text-button" aria-label="Back to the workshop" onClick={back}><span aria-hidden="true">←</span> Back to the workshop</button>
              <p className="hs-eyebrow">The tools I reach for</p>
              <h2 ref={heading} tabIndex={-1}>The pegboard</h2>
              <dl className="hs-tools">
                {TOOL_DOMAINS.map((domain) => <div key={domain.title}><dt>{domain.title}</dt><dd>{domain.items}</dd></div>)}
              </dl>
            </section>
          )}
        </div>

        <div ref={host} className="hs-canvas" aria-hidden="true" />
        {!ready && !failed && <p className="hs-loading" role="status">Building the house…</p>}
        {failed && <p className="hs-fallback">3D isn’t available here. Every room is still readable and navigable.</p>}

        <div className="hs-controls">
          <div>
            <button aria-label="Previous room" onClick={() => step(-1)} disabled={roomIndex <= 0 || !!selected}>←</button>
            <button aria-label="Next room" onClick={() => step(1)} disabled={roomIndex >= OPEN.length - 1 || !!selected}>→</button>
            <span>Choose a room · Use ← →</span>
          </div>
          <div>
            <button className="hs-pill" onClick={() => setNight(!night)}>{night ? 'Turn the lights on' : 'Turn the lights off'}</button>
            <button className="hs-pill" aria-pressed={reduced} disabled={systemReduced} onClick={() => setPaused(!paused)}>{systemReduced ? 'Reduced motion' : paused ? 'Motion off' : 'Motion on'}</button>
          </div>
        </div>
      </div>

      <footer className="hs-footer">
        <p className="hs-footnote">{current.n} / 06<br />{current.name === 'Entrance' ? 'Welcome home.' : 'Make yourself at home.'}</p>
        <nav aria-label="Floor plan">
          <ol className="hs-plan">
            {ROOMS.map((r) => (
              <li key={r.id}>
                <button onClick={() => goRoom(r.id)}  aria-current={r.id === room ? 'location' : undefined}
                  aria-label={`Go to the ${r.name.toLowerCase()}`}>
                  <small>{r.n}</small><strong>{r.name}</strong>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </footer>
    </main>
  );
}
