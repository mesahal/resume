import { useEffect, useRef, useState } from 'react';
import word from './assets/word-clues.webp';
import butterfly from './assets/butterfly-home.webp';
import './studio.css';

export const studioProjects = {
  word:{title:'Word Detective',category:'An independent product',description:'A word-deduction game I built and published. Offline puzzles for a quiet moment; online duels for a little competition.',stack:'Flutter · Dart · Supabase',url:'https://play.google.com/store/apps/details?id=com.mdsahal.worddetective',link:'Get it on Google Play',image:word},
  butterfly:{title:'My Butterfly',category:'A professional team contribution',description:'SwiftUI interfaces, API integration, and application delivery workflows for the My Butterfly iOS app.',stack:'Swift · SwiftUI · iOS',url:'https://apps.apple.com/sg/app/my-butterfly/id6800672279',link:'View on the App Store',image:butterfly},
  accelera:{title:'Accelera GP — Noshinow',category:'My current project',description:'Website-builder controls, rich-text formatting, gallery presentation, and consistency between editing and publishing.',stack:'TypeScript · React · Next.js',note:'Illustrative exhibit for website-builder contributions. No private product screen is shown.'},
};

export default function Studio() {
  const host=useRef(null), scene=useRef(null), heading=useRef(null), selectedRef=useRef(null), controls=useRef({});
  const [selected,setSelected]=useState(null), [ready,setReady]=useState(false), [failed,setFailed]=useState(false);
  const [paused,setPaused]=useState(false), [systemReduced,setSystemReduced]=useState(()=>typeof window.matchMedia==='function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const reduced=paused || systemReduced;
  const reducedRef=useRef(reduced);
  selectedRef.current=selected;reducedRef.current=reduced;
  useEffect(()=>{
    const previousTitle=document.title;
    document.title='The idea room — Md Sahal / 3D study';
    const robots=document.querySelector('meta[name="robots"]');const previousRobots=robots?.content;
    if(robots) robots.content='noindex, nofollow';
    const media=typeof window.matchMedia==='function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const changed=()=>setSystemReduced(media.matches);media?.addEventListener('change',changed);
    let cancelled=false;
    import('./studioScene').then(({createStudio})=>createStudio(host.current,{
      onSelect:id=>{if(!cancelled)setSelected(id);},
      onReady:()=>{if(!cancelled)setReady(true);},
      onError:()=>{if(!cancelled)setFailed(true);},
      reduced:reducedRef.current,
    })).then(api=>{
      if(cancelled){api?.dispose();return;}
      scene.current=api;api?.select(selectedRef.current);api?.setReduced(reducedRef.current);
    }).catch(()=>{if(!cancelled)setFailed(true);});
    return ()=>{cancelled=true;scene.current?.dispose();scene.current=null;media?.removeEventListener('change',changed);document.title=previousTitle;if(robots)robots.content=previousRobots;};
  },[]);
  useEffect(()=>{scene.current?.select(selected);if(selected)heading.current?.focus({preventScroll:window.innerWidth>900});},[selected]);
  useEffect(()=>{scene.current?.setReduced(reduced);},[reduced]);
  const back=()=>{const previous=selected;setSelected(null);controls.current[previous]?.focus();};
  const project=studioProjects[selected];
  return <main className={`sr-root ${selected?'sr-focused':''}`} data-reduced={reduced?'true':'false'}>
    <header className="sr-header"><a href="/__concepts/" className="sr-logo"><span aria-hidden="true">s.</span><span>MD SAHAL<br/><small>Engineer. Maker. Curious mind.</small></span></a><div><a href="/__concepts/">Other directions</a><a className="sr-contact" href="mailto:mdsahal.info@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></div></header>
    <div className="sr-stage">
      <div className="sr-intro" aria-hidden={!!selected}><p>As-salamu alaykum. Welcome to my</p><h1>room for <br/><em>big ideas.</em></h1><p className="sr-intro-note">A little world of things I build.<br/>Come in. Pick something up.</p></div>
      <div ref={host} className="sr-canvas" aria-hidden="true" />
      {!ready && !failed && <p className="sr-loading" role="status">Setting the room…</p>}
      {failed && <div className="sr-fallback">{(!project || project.image) && <img src={project?.image || word} alt={`${project?.title || "Word Detective"} actual application screen`}/>}<p>3D isn’t available here. Explore the projects below.</p></div>}
      {project && <section className="sr-project" aria-label="Selected project"><button className="sr-back" aria-label="Back to the room" onClick={back}>← Back to the room</button><p className="sr-eyebrow">{project.category}</p><h2 ref={heading} tabIndex={-1}>{project.title}</h2><p className="sr-description">{project.description}</p><p className="sr-stack">{project.stack}</p>{project.url && <a className="sr-project-link" href={project.url} target="_blank" rel="noreferrer">{project.link} <span aria-hidden="true">↗</span></a>}{project.note && <p className="sr-project-note">{project.note}</p>}</section>}
      <div className="sr-scene-controls"><div><button aria-label="Rotate room left" onClick={()=>scene.current?.rotate(-.3)} disabled={!ready||failed}>↶</button><button aria-label="Rotate room right" onClick={()=>scene.current?.rotate(.3)} disabled={!ready||failed}>↷</button><span>{selected?'Look around the exhibit':'Drag to turn the room'}</span></div><button aria-pressed={reduced} disabled={systemReduced} onClick={()=>setPaused(!paused)}>{systemReduced?'Reduced motion':paused?'Motion off':'Motion on'}</button></div>
      <p className="sr-room-note">A miniature portfolio world.<br/>Real projects. An imagined room.</p>
    </div>
    <footer className="sr-footer"><div className="sr-identity"><strong>Software Engineer II</strong><span>Brain Station 23 · Dhaka, Bangladesh</span><small>Company tenure: April 2024–Present</small></div><nav className="sr-exhibits" aria-label="Explore the room">{Object.entries(studioProjects).map(([id,p],i)=><button key={id} ref={node=>{controls.current[id]=node;}} onClick={()=>setSelected(id)} aria-pressed={selected===id} aria-label={`Explore ${id==='accelera'?'Accelera GP':p.title}`}><span className={`sr-dot sr-dot-${id}`} aria-hidden="true"/><span><small>0{i+1} / {['PLAY','CONNECT','CREATE'][i]}</small><strong>{id==='accelera'?'Accelera GP':p.title}</strong></span><span aria-hidden="true">↗</span></button>)}</nav></footer>
  </main>;
}
