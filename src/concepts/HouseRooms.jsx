import { useState } from 'react';
import { experience, dateLabel, additionalProjects, featuredProjects, socials, services } from './houseData/profile';
import { skillArchive, careerDetails, problemRecords } from './houseData/background';
import { blogs } from './houseData/blogs';
import { videos } from './houseData/videos';

const External = ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
export function MoreProjects() {
  return <details className="hs-disclosure"><summary>More work · 8 projects</summary>
    {[...featuredProjects.filter((p) => ['city-remit', 'omnizia'].includes(p.id)), ...additionalProjects].map((p) => <article className="hs-record" key={p.title}><h3>{p.title}</h3><p>{p.contribution || p.description}</p><small>{p.role} · {p.technologies.join(' / ')}</small>{(p.liveUrl || p.url) && <External href={p.liveUrl || p.url}>Visit project</External>}</article>)}
  </details>;
}
export function Study({ heading }) {
  return <section aria-label="The study"><p className="hs-eyebrow">03 / The study · Experience & skills</p><h2 ref={heading} tabIndex={-1}>Built on<br /><em>experience.</em></h2><p className="hs-body">From solving algorithms to shipping products with a team.</p>
    {experience.map((job) => <article className="hs-record" key={job.company}><small>{dateLabel(job.start)}–{job.end ? dateLabel(job.end) : 'Present'}</small><h3>{job.company}</h3><strong>{job.role}</strong><p>{job.description}</p></article>)}
    <details className="hs-disclosure"><summary>Open the skills notebook</summary><dl className="hs-tools">{skillArchive.map((g) => <div key={g.title}><dt>{g.title}</dt><dd>{g.skills.map(s => s.name).join(' · ')}</dd></div>)}<div><dt>Mobile & current project tools</dt><dd>Swift · SwiftUI · Flutter · Dart · Supabase · Next.js · TypeScript</dd></div></dl></details>
    <details className="hs-disclosure"><summary>Earlier career notes</summary><p className="hs-note">Preserved from my earlier portfolio. Impact figures are historical self-reported records.</p>{careerDetails.map((job) => <article className="hs-record" key={job.company}><h3>{job.company}</h3><ul>{job.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</details>
  </section>;
}
export function Lounge({ heading }) {
  return <section aria-label="The lounge"><p className="hs-eyebrow">04 / The lounge · The foundations</p><h2 ref={heading} tabIndex={-1}>Always<br /><em>a student.</em></h2><p className="hs-body">A love of problem-solving, a university community, and a habit of sharing what I learn.</p>
    <article className="hs-record"><small>Feb 2018–Mar 2023</small><h3>Jahangirnagar University</h3><p>BSc in Information Technology · Institute of Information Technology</p><strong>CGPA 3.51 / 4.00</strong></article>
    <details className="hs-disclosure"><summary>Earlier education</summary><article className="hs-record"><small>2015–2017</small><h3>Notre Dame College</h3><p>HSC · Science · GPA 5.00 / 5.00</p></article><article className="hs-record"><small>2007–2014</small><h3>Faizur Rahman Ideal Institute</h3><p>SSC · Science · GPA 5.00 / 5.00</p></article></details>
    <details className="hs-disclosure" open><summary>The trophy shelf</summary><p className="hs-note">Historical contest records from my previous portfolio.</p><div className="hs-record"><p>MBSTU — 11th · RUET — 35th · AUST — 42nd</p><p>Peak ratings: Codeforces 1694 · LeetCode 1747 · AtCoder 678 · CodeChef 1759</p></div></details>
    <details className="hs-disclosure"><summary>Problem-solving archive</summary><p className="hs-note">Recorded totals, not live counts.</p><div className="hs-record">{problemRecords.map(p => <p key={p.name}>{p.name} <strong>{p.count.toLocaleString()} solved</strong></p>)}</div></details>
  </section>;
}
export function MediaStudio({ heading }) {
  const [tab, setTab] = useState('writing');
  return <section aria-label="The studio"><p className="hs-eyebrow">05 / The studio · Beyond the code</p><h2 ref={heading} tabIndex={-1}>Curiosity,<br /><em>out loud.</em></h2><p className="hs-body">Writing about technology. Making videos about the things that make me curious.</p><div className="hs-tabs" role="group" aria-label="Creative work"><button aria-pressed={tab === 'writing'} onClick={() => setTab('writing')}>Writing · {blogs.length}</button><button aria-pressed={tab === 'videos'} onClick={() => setTab('videos')}>Videos · {videos.length}</button></div>
    <div className="hs-media-list">{(tab === 'writing' ? blogs : videos).map((item, i) => <article className="hs-record" key={item.title}><small>{String(i + 1).padStart(2, '0')} / {item.category}</small><h3><External href={item.link || `https://www.youtube.com/watch?v=${item.videoId}`}>{item.title}</External></h3><p>{item.excerpt || item.description}</p></article>)}</div>
  </section>;
}
export function Porch({ heading }) {
  const [draft, setDraft] = useState(null);
  const [service, setService] = useState('Launch a product');
  return <section aria-label="The porch"><p className="hs-eyebrow">06 / The porch · A new beginning</p><h2 ref={heading} tabIndex={-1}>Your idea.<br /><em>Our next chapter.</em></h2><p className="hs-body">Have a product to build or a team to join? Pull up a chair.</p>
    <div className="hs-services" role="group" aria-label="Project type">{services.map(s => <button key={s.id} aria-pressed={service === s.label} onClick={() => {setService(s.label); setDraft(null);}}>{s.label}</button>)}</div><p className="hs-note">{services.find(s => s.label === service).description}</p>
    <form className="hs-form" onChange={() => setDraft(null)} onSubmit={e => {e.preventDefault(); const fields = new FormData(e.currentTarget); setDraft(`mailto:mdsahal.info@gmail.com?subject=${encodeURIComponent(service)}&body=${encodeURIComponent(`Hello Sahal,\n\n${fields.get('message')}\n\n${fields.get('name')}\n${fields.get('email')}`)}`);}}>
      <label>Your name<input required name="name" autoComplete="name" maxLength={100} /></label><label>Email address<input required name="email" type="email" autoComplete="email" maxLength={200} /></label><label>What would you like to build?<textarea required name="message" rows={3} maxLength={3000} /></label><button className="hs-primary" type="submit">Prepare email draft</button>
    </form>{draft && <div className="hs-draft" role="status"><p>Your draft is ready. Review and send it in your email app.</p><a className="hs-link" href={draft}>Open draft in email app</a></div>}
    <p className="hs-note">Or email <a href="mailto:mdsahal.info@gmail.com">mdsahal.info@gmail.com</a></p><nav className="hs-socials" aria-label="Social profiles">{socials.map(([name, href]) => <External key={name} href={href}>{name}</External>)}</nav>
  </section>;
}
