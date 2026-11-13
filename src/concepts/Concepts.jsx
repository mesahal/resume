import { useEffect, useRef, useState } from 'react';
import portrait from '../assets/optimized/myLogo.webp';
import wordHome from './assets/word-home.webp';
import wordClues from './assets/word-clues.webp';
import butterflyHome from './assets/butterfly-home.webp';
import butterflyProduct from './assets/butterfly-product.webp';
import './concepts.css';

const ROOT = '/__concepts';
const PLAY = 'https://play.google.com/store/apps/details?id=com.mdsahal.worddetective';
const APPLE = 'https://apps.apple.com/sg/app/my-butterfly/id6800672279';
const role = 'Software Engineer II · Brain Station 23';
const tenure = 'At Brain Station 23 since April 2024';
const concepts = [
  {id:'cinema', letter:'A', title:'The short film', note:'An opening with a sense of occasion.', form:'cinematic'},
  {id:'editorial', letter:'B', title:'Field notes', note:'A personal cover. A curious mind.', form:'editorial'},
  {id:'workshop', letter:'C', title:'The word workshop', note:'A small interaction with a real story.', form:'playful'},
];
const projects = [
  {name:'Word Detective', type:'Independent Android game', lead:'A question. A clue. A little discovery.', description:'I built and published a word-deduction game with offline puzzles and online duels.', stack:'Flutter / Dart / Supabase', href:PLAY, link:'Get Word Detective on Google Play', images:[wordClues,wordHome]},
  {name:'My Butterfly', type:'Professional iOS contribution', lead:'Everyday things, thoughtfully connected.', description:'I contributed SwiftUI interfaces, API integration, and application delivery workflows.', stack:'Swift / SwiftUI / iOS', href:APPLE, link:'View My Butterfly on the App Store', images:[butterflyHome,butterflyProduct]},
  {name:'Accelera GP — Noshinow', type:'Current professional project', lead:'From an idea to a place on the web.', description:'My work focuses on website-builder controls, rich-text formatting, and consistency from editing to publishing.', stack:'TypeScript / React / Next.js', images:[]},
];

function Header({kind}) {
  return <header className={`cr-header ${kind || ''}`}>
    <a href={`${ROOT}/`} className="cr-signature" aria-label="Md Sahal — all design directions">Md Sahal<span>Software engineer, Dhaka.</span></a>
    <a className="cr-contact" href="mailto:mdsahal.info@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a>
  </header>;
}
function Identity({className=''}) {
  return <div className={`cr-identity ${className}`}><p>{role}</p><p>{tenure} · Dhaka, Bangladesh</p></div>;
}
function ContactLine() {
  return <a className="cr-text-link" href="mailto:mdsahal.info@gmail.com">Have something in mind? Let’s talk <span aria-hidden="true">↗</span></a>;
}
function BuilderArtwork() {
  return <div className="cr-builder" aria-label="Illustrative restaurant website, not a client screenshot">
    <div className="cr-builder-top">a place at the table <span>Menu &nbsp; About</span></div>
    <div className="cr-builder-body"><span>GOOD FOOD.<br/>GOOD COMPANY.</span><div className="cr-plate"><i/><i/><i/></div></div>
    <p>Illustrative website-builder composition</p>
  </div>;
}

export function Cinema() {
  const [scene,setScene]=useState(0);
  const project=projects[scene];
  return <main className="cr-cinema">
    <Header />
    <section className="cr-film-intro"><p className="cr-kicker">Selected work, through my eyes.</p><h1>A little wonder.<br/><em>A lot of engineering.</em></h1><div className="cr-film-byline"><span>As-salamu alaykum. I’m Sahal.</span><p>I build software for the small moments<br className="cr-desktop"/> that make up a bigger day.</p></div></section>
    <section className={`cr-film-stage cr-scene-${scene}`} aria-label="Project cinema">
      <div className="cr-film-title" aria-hidden="true">{['play.','everyday.','create.'][scene]}</div>
      <div key={scene} className="cr-film-art">
        {project.images.length ? <><img className="cr-film-screen cr-film-screen-back" src={project.images[1]} alt={`${project.name} application screen`} /><img className="cr-film-screen cr-film-screen-front" src={project.images[0]} alt={`${project.name} application screen`} /></> : <BuilderArtwork/>}
      </div>
      <div className="cr-film-caption" key={`caption-${scene}`}><span>{project.type}</span><h2>{project.name}</h2><p>{project.lead}</p></div>
      <div className="cr-film-controls"><span>Scene {String(scene+1).padStart(2,'0')} of 03</span><button onClick={()=>setScene((scene+1)%3)} aria-label="Next scene">Next scene <span aria-hidden="true">→</span></button></div>
    </section>
    <div className="cr-film-bottom"><div aria-live="polite" aria-atomic="true"><p>{project.description}</p>{project.href ? <a className="cr-text-link" href={project.href} target="_blank" rel="noreferrer" aria-label={project.link}>Explore the app ↗</a> : <span className="cr-film-private">Website-builder contribution · illustrative visual</span>}</div><Identity/><ContactLine/></div>
  </main>;
}

export function Editorial() {
  const [open,setOpen]=useState(false);
  const notesHeading=useRef(null);
  useEffect(()=>{ if(open) notesHeading.current?.focus({preventScroll:true}); },[open]);
  return <main className="cr-editorial">
    <header className="cr-ed-header"><span>Personal portfolio / Dhaka, Bangladesh</span><a href="mailto:mdsahal.info@gmail.com">A conversation starts here ↗</a></header>
    <div className="cr-masthead"><span className="cr-masthead-name">Sahal<span className="cr-period">.</span></span><div><span>ENGINEER.<br/>MAKER.<br/>CURIOUS HUMAN.</span><p>As-salamu alaykum.<br/>Welcome to my side of the internet.</p></div></div>
    <section className="cr-ed-spread">
      <div className="cr-ed-copy"><p className="cr-ed-issue">A practice in making things work.</p><h1>Curiosity,<br/><em>put to work.</em></h1><p className="cr-ed-deck">From the logic behind a word game to the details inside an everyday app. I’m Md Sahal, and I like turning complicated things into something people can use.</p><Identity/><ContactLine/></div>
      <div className={`cr-notebook ${open?'cr-notebook-open':''}`}>
        <div className="cr-notebook-sheet" id="cr-working-notes" hidden={!open}>
          <p className="cr-note-label">From my working notes</p><h2 ref={notesHeading} tabIndex={-1}>Three kinds<br/><em>of making.</em></h2>
          <ol><li><span>01 / Independently built</span><h3>Word Detective</h3><p>Offline puzzles. Online duels. Flutter, Dart, Supabase.</p><a href={PLAY} target="_blank" rel="noreferrer">See the Android game ↗</a></li><li><span>02 / Team contribution</span><h3>My Butterfly</h3><p>SwiftUI interfaces, API integration, delivery workflows.</p><a href={APPLE} target="_blank" rel="noreferrer">See the iOS app ↗</a></li><li><span>03 / Current work</span><h3>Accelera GP — Noshinow</h3><p>Headers, rich text, and the space between editing and publishing.</p></li></ol>
        </div>
        <div className="cr-notebook-cover" aria-hidden={open}>
          <div className="cr-cover-top"><span>THE PERSON<br/>BEHIND THE WORK</span><span>↙</span></div><img src={portrait} alt="Illustrated portrait of Md Sahal"/>
          <div className="cr-cover-bottom"><span>Notes on<br/><em>building things.</em></span><small>MD SAHAL<br/>A WORK IN PROGRESS</small></div>
        </div>
        <button className="cr-notebook-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="cr-working-notes">{open?'Close my working notes':'Open my working notes'} <span aria-hidden="true">{open?'↙':'↗'}</span></button>
      </div>
      <span className="cr-margin-note" aria-hidden="true">a mind at work, always.</span>
    </section>
    <footer className="cr-ed-footer"><span>Software with purpose. Details with care.</span><a href="/resume.pdf" target="_blank" rel="noreferrer">The résumé ↗</a><a href="https://github.com/mesahal" target="_blank" rel="noreferrer">The code ↗</a></footer>
  </main>;
}

export function Workshop() {
  const [letters,setLetters]=useState([]);
  const [skip,setSkip]=useState(false);
  const solved=letters.join('')==='BUILD';
  const revealed=solved || skip;
  const storyHeading=useRef(null);
  useEffect(()=>{ if(revealed) storyHeading.current?.focus({preventScroll:true}); },[revealed]);
  const reset=()=>{setLetters([]);setSkip(false);};
  return <main className={`cr-workshop ${revealed?'cr-workshop-revealed':''}`}>
    <Header/>
    <section className="cr-workshop-intro"><div><p className="cr-kicker">A small invitation from Md Sahal.</p><h1>Let’s make<br/>something <em>click.</em></h1></div><div className="cr-workshop-bio"><p>I’m a software engineer.<br/>I also make games.</p><p>Here’s a little of how my mind works.<br/>You can have a go, or just look around.</p></div></section>
    <section className="cr-play-table" aria-label="Word workshop">
      <div className="cr-workshop-rule"><span>A tiny portfolio puzzle</span><span>Clue: turn an idea into something real.</span></div>
      <div className="cr-letter-space">
        {!revealed ? <><div className="cr-answer" aria-label={`Your answer: ${letters.join('') || 'empty'}`}>{Array.from({length:5},(_,i)=><span key={i} className={letters[i]?'cr-filled':''}>{letters[i] || <span aria-hidden="true">·</span>}</span>)}</div><div className="cr-letter-tray" aria-label="Choose letters in order">{['D','L','B','U','I'].map((letter,i)=><button key={letter} className={`cr-letter cr-letter-${i}`} disabled={letters.includes(letter)} onClick={()=>setLetters([...letters,letter])} aria-label={`Choose ${letter}`}>{letter}</button>)}</div><div className="cr-workshop-hint"><span aria-hidden="true">↖</span> Pick the letters. Make a word.</div></> : <div className="cr-workshop-story"><div><span className="cr-story-label">An idea I built and published</span><h2 ref={storyHeading} tabIndex={-1}>From a word<br/>to a <em>world.</em></h2><p>Word Detective turns questions into discovery. Offline puzzles for a quiet moment. Online duels for a little competition.</p><a href={PLAY} target="_blank" rel="noreferrer">Get Word Detective on Google Play <span aria-hidden="true">↗</span></a><span className="cr-story-stack">Flutter / Dart / Supabase</span></div><img src={wordClues} alt="Word Detective actual Android game screen"/><span className="cr-story-word" aria-hidden="true">BUILD</span></div>}
      </div>
      <div className="cr-workshop-tools"><p role="status">{solved?'Exactly. Let’s build.':skip?'Every product starts with a question.':letters.length===5?'Try another order. Hint: it starts with B.':'Five letters. One good place to start.'}</p><div><button onClick={reset}>Start again</button>{!revealed && <button onClick={()=>setSkip(true)}>Skip to the story <span aria-hidden="true">↗</span></button>}</div></div>
    </section>
    <div className="cr-workshop-bottom"><Identity/><div><p>Also on my workbench</p><a href={APPLE} target="_blank" rel="noreferrer">My Butterfly · iOS contribution ↗</a><span>Accelera GP — Noshinow · website-builder work</span></div><ContactLine/></div>
    <p className="cr-prototype-note">This original portfolio puzzle is inspired by my game. It is not the Word Detective game interface.</p>
  </main>;
}

function Gallery() {
  return <main className="cr-gallery"><p className="cr-kicker">Md Sahal / Creative reset / October 2026</p><h1>New ways<br/>to say <em>hello.</em></h1><p className="cr-gallery-intro">Same engineer. Same real work. Different worlds. Different first impressions.<br/>Open each direction and try its interaction.</p><a className="cr-spatial-invitation" href="/__concepts/house"><span>E / NEW — THE WALKABLE HOME</span><strong>Step inside the house. ↗</strong><span>Open the front door. Explore six rooms. Make yourself at home.</span></a><a className="cr-spatial-invitation" style={{background:'#263a3a',marginTop:'12px'}} href="/__concepts/studio"><span>D / 3D STUDY</span><strong>Step inside the idea room. ↗</strong><span>Rotate the room. Explore the exhibits.</span></a><div className="cr-directions">{concepts.map(concept=><a href={`${ROOT}/${concept.id}`} key={concept.id} className={`cr-direction cr-direction-${concept.id}`}><div className="cr-direction-art" aria-hidden="true">{concept.id==='cinema'?<><span>A little<br/><i>wonder.</i></span><img src={wordHome} alt=""/></>:concept.id==='editorial'?<><span>Sahal.</span><img src={portrait} alt=""/></>:<span className="cr-mini-tiles"><i>B</i><i>U</i><i>I</i><i>L</i><i>D</i></span>}</div><div className="cr-direction-info"><span>{concept.letter} / {concept.form}</span><h2>{concept.title} ↗</h2><p>{concept.note}</p></div></a>)}</div><div className="cr-gallery-foot"><p>Three hero studies, a 3D studio, and a complete house demo. The existing portfolio is untouched.</p><a href="/">View the existing portfolio ↗</a></div></main>;
}

export default function Concepts() {
  const id=window.location.pathname.replace(/\/$/,'').split('/').pop();
  const selected=concepts.find(c=>c.id===id);
  const [motion,setMotion]=useState(true);
  useEffect(()=>{
    const previousTitle=document.title;
    document.title=`${selected?selected.title:'Creative directions'} — Md Sahal / Preview`;
    const existing=document.querySelector('meta[name="robots"]');
    const meta=existing || document.createElement('meta');
    const previousRobots=meta.content;
    meta.name='robots';meta.content='noindex, nofollow';
    if(!existing) document.head.appendChild(meta);
    return ()=>{document.title=previousTitle;if(existing) meta.content=previousRobots;else meta.remove();};
  },[selected]);
  return <div className="cr-root" data-motion={motion?'on':'off'}><nav className="cr-review-bar" aria-label="Design previews"><a href={`${ROOT}/`}>Creative reset</a><div>{concepts.map(c=><a key={c.id} href={`${ROOT}/${c.id}`} aria-label={`${c.letter} / ${c.title}`} aria-current={id===c.id?'page':undefined}>{c.letter}<span> / {c.title}</span></a>)}</div><button aria-pressed={!motion} onClick={()=>setMotion(!motion)}>{motion?'Pause motion':'Enable motion'}</button></nav>{id==='cinema'?<Cinema/>:id==='editorial'?<Editorial/>:id==='workshop'?<Workshop/>:<Gallery/>}</div>;
}
