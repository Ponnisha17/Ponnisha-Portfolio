import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowUpRight, Boxes, Braces, Code2, Coffee, Cpu,
  Database, Download, ExternalLink, Github, GraduationCap, Layers3, Mail,
  MapPin, Menu, Network, Palette, PanelsTopLeft, Share2, Sparkles, Terminal,
  X,
} from "lucide-react";
import { profile } from "./data/profile.js";
import { contact, profiles, resumeUrl } from "./data/links.js";
import { skillCategories, learningJourney, fundamentals } from "./data/skills.js";
import { projects } from "./data/projects.js";
import { achievements } from "./data/achievements.js";

const iconCycle = [Coffee, Terminal, Code2, Network, Database, Boxes, Cpu, Share2, PanelsTopLeft, Palette, Sparkles, Layers3];
const navItems = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Learning Journey", "journey"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Coding Profiles", "profiles"],
  ["Certifications", "achievements"],
  ["Resume", "resume"],
  ["Contact", "contact"],
];

function SectionTitle({ number, eyebrow, title, description }) {
  return (
    <div className="section-title reveal">
      <div>
        <p className="eyebrow"><span>{number}</span> / {eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      <span className="section-star" aria-hidden="true">✳</span>
    </div>
  );
}

function App() {
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const displayName = profile.name.trim();
  const categories = ["All", ...skillCategories.map((group) => group.name)];
  const visibleGroups = category === "All"
    ? skillCategories
    : skillCategories.filter((group) => group.name === category);

  useEffect(() => {
    document.title = displayName ? `${displayName} — Developer Portfolio` : "Developer Portfolio";
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [category, displayName]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <a className="brand" href="#home" aria-label={`${displayName || "Portfolio"}, home`}>
          <span className="brand-icon"><Code2 size={18} aria-hidden="true" /></span>
          <span>{displayName || "Portfolio"}<small>PORTFOLIO / {new Date().getFullYear()}</small></span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><i className="live-dot" /> OPEN TO LEARNING & COLLABORATION</p>
            <h1>Curious mind.<br />Building for<br /><span>what&apos;s next.</span></h1>
            <p className="hero-intro">{displayName ? <>Hey, I&apos;m <strong>{displayName}</strong> — an MCA student learning to build thoughtful digital experiences, one idea at a time.</> : "An MCA student learning to build thoughtful digital experiences, one idea at a time."}</p>
            <div className="hero-actions">
              <a className="button primary-button" href="#projects">Explore my work <ArrowUpRight size={16} /></a>
              <a className="plain-link" href="#about">A little about me <ArrowDown size={14} /></a>
            </div>
            <div className="hero-meta"><span><i />{profile.role}</span>{contact.location && <span><MapPin size={13} />{contact.location}</span>}</div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-glow" />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <div className="art-core"><Code2 size={54} /><i /></div>
            <div className="art-chip chip-one"><Code2 size={16} />curiosity.exe</div>
            <div className="art-chip chip-two"><Sparkles size={16} />design × code</div>
            <span className="coordinate coord-one">IDEAS / IN PROGRESS</span>
            <span className="coordinate coord-two">FIG. 001 — IN PROGRESS</span>
            <span className="art-star star-one">✳</span><span className="art-star star-two">✳</span>
          </div>
          <a className="scroll-cue" href="#about">SCROLL TO EXPLORE <ArrowDown size={13} /></a>
        </section>

        <section className="wrap section-pad" id="about">
          <SectionTitle number="01" eyebrow="THE PERSON" title="A bit about me" description="Learning the fundamentals, staying curious, and making things along the way." />
          <div className="about-grid">
            <div className="about-copy reveal">
              <p>{profile.about}</p>
              <div className="about-note"><span><Sparkles size={17} /></span><p>Currently focused on <strong>the fundamentals</strong> — and excited for what comes next.</p></div>
            </div>
          </div>
        </section>

        <section className="wrap section-pad" id="skills">
          <SectionTitle number="02" eyebrow="WHAT I'M LEARNING" title="Tools in my toolkit" description="A growing set of skills, built through study, practice, and projects." />
          <div className="filters" role="group" aria-label="Filter skills by category">
            {categories.map((name) => <button key={name} type="button" className={category === name ? "filter active" : "filter"} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}
          </div>
          <div className="skill-groups">
            {visibleGroups.map((group, groupIndex) => (
              <div className="skill-group reveal" key={group.name}>
                <div className="skill-group-heading"><span>0{groupIndex + 1}</span><h3>{group.name}</h3><small>{String(group.skills.length).padStart(2, "0")} SKILLS</small></div>
                <div className="skill-grid">
                  {group.skills.map((skill, index) => {
                    const SkillIcon = iconCycle[(groupIndex * 3 + index) % iconCycle.length];
                    return <article className="skill-card" key={skill}><span className="skill-icon" aria-hidden="true"><SkillIcon size={18} /></span><span>{skill}</span></article>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap section-pad" id="journey">
          <SectionTitle number="03" eyebrow="IN PROGRESS" title="The learning journey" description="The ideas and skills I'm exploring right now. Progress is a practice." />
          <div className="journey-grid">
            {learningJourney.map((item, index) => {
              const JourneyIcon = iconCycle[index + 1];
              return <article className="journey-card reveal" key={item.title} style={{ "--i": index }}>
                <div className="journey-top"><span>0{index + 1}</span><JourneyIcon size={19} /></div>
                <h3>{item.title}</h3><p>{item.detail}</p>
                <div className="learning-tag"><i /> LEARNING</div>
              </article>;
            })}
          </div>
        </section>

        <section className="wrap section-pad" id="fundamentals">
          <SectionTitle number="04" eyebrow="UNDER THE HOOD" title="Computer science, at the core" description="The foundations I'm building to understand how software really works." />
          <div className="fundamentals">
            {fundamentals.map((item, index) => <article className="fundamental reveal" key={item.short}>
              <span className="fundamental-index">{String(index + 1).padStart(2, "0")}</span><span className="fundamental-icon" aria-hidden="true"><Braces size={18} /></span><h3>{item.name}</h3><span className="fundamental-short">{item.short}</span>
            </article>)}
          </div>
        </section>

        <section className="wrap section-pad" id="projects">
          <SectionTitle number="05" eyebrow="SELECTED WORK" title="Things I've made" description="Small steps, real ideas. Here's what I'm working on." />
          <div className="projects">
            {projects.length ? projects.map((project, index) => <article className="project-card reveal" key={project.name}>
              <div className="project-visual" aria-hidden="true">
                <div className="project-orbit orbit-a" /><div className="project-orbit orbit-b" />
                <div className="project-art">
                  <span className="project-art-label">PROJECT / {String(index + 1).padStart(2, "0")}</span>
                  <div className="project-art-mark"><Layers3 size={28} /></div>
                  <strong>{project.name}</strong>
                  <span>{project.type}</span>
                </div>
                <span className="project-num">0{index + 1}</span><span className="project-status"><i className="live-dot" />{project.status}</span>
              </div>
              <div className="project-details">
                <div className="project-heading"><div><p>{project.type}</p><h3>{project.name}</h3></div>{project.url && <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ExternalLink size={17} /></a>}</div>
                <p className="project-description">{project.description}</p>
                <div className="tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              </div>
            </article>) : <div className="empty-state"><span aria-hidden="true"><Layers3 size={20} /></span><div><h3>No projects listed</h3><p>No project details are available to share here.</p></div></div>}
          </div>
        </section>

        <section className="wrap section-pad" id="education">
          <SectionTitle number="06" eyebrow="EDUCATION" title="Where I'm learning" description="My current course of study." />
          <article className="education-card reveal">
            <div className="education-top"><span>CURRENTLY STUDYING</span><GraduationCap size={21} aria-hidden="true" /></div>
            <span className="education-level">{profile.education.level}</span>
            <h3>{profile.education.degree}</h3>
            <p>{profile.education.institution}</p>
            {profile.education.location && <span className="education-location"><MapPin size={13} aria-hidden="true" />{profile.education.location}</span>}
            <div className="education-footer"><i className="live-dot" /> IN PROGRESS</div>
          </article>
        </section>

        <section className="wrap section-pad" id="profiles">
          <SectionTitle number="07" eyebrow="AROUND THE WEB" title="Coding profiles" description="Find me on the platforms where I learn and practise." />
          {profiles.some((item) => item.url) ?
            <div className="profile-grid">
              {profiles.filter((item) => item.url).map((item) => <article className="profile-card reveal" key={item.name}>
                <span className="profile-icon" aria-hidden="true">{item.name === "GitHub" ? <Github size={20} /> : item.name === "LeetCode" ? <Code2 size={20} /> : <Terminal size={20} />}</span>
                <div><h3>{item.name}</h3></div>
                <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Visit ${item.name}`}><ArrowUpRight size={17} /></a>
              </article>)}
            </div> :
            <div className="empty-state"><span aria-hidden="true"><Code2 size={20} /></span><div><h3>No coding profile links available</h3><p>There are no profile links to share here right now.</p></div></div>}
        </section>

        <section className="wrap section-pad" id="achievements">
          <SectionTitle number="08" eyebrow="MILESTONES" title="Certifications & achievements" description="A space for meaningful milestones." />
          {achievements.length ? <div className="achievement-grid">{achievements.map((item) => <article className="achievement-card reveal" key={item.title}><Sparkles size={20} /><div><h3>{item.title}</h3><p>{item.issuer}{item.date ? ` · ${item.date}` : ""}</p></div></article>)}</div> :
            <div className="empty-state reveal"><span aria-hidden="true"><Sparkles size={20} /></span><div><h3>No certifications or achievements listed</h3><p>No milestone details are available to share here.</p></div></div>}
        </section>

        <section className="wrap section-pad" id="resume">
          <div className="resume-card reveal"><div><p className="eyebrow"><span>09</span> / THE ONE-PAGER</p><h2>A little more<br /><span>on paper.</span></h2><p>{resumeUrl ? "View my resume." : "A resume link is not available here."}</p></div>
            {resumeUrl && <a className="button primary-button" href={resumeUrl} target="_blank" rel="noreferrer"><Download size={16} />View resume</a>}
          </div>
        </section>

        <section className="wrap section-pad contact-section" id="contact">
          <div className="contact-card reveal"><div><p className="eyebrow"><span>10</span> / SAY HELLO</p><h2>Have an idea?<br /><span>Let&apos;s connect.</span></h2><p>Always happy to meet curious people, talk about ideas, and learn together.</p></div>
            <div className="contact-action">
              {contact.email ? <a className="button primary-button" href={`mailto:${contact.email}`}><Mail size={16} />{contact.email}<ArrowUpRight size={15} /></a> : <p className="contact-unavailable">No contact details are available here.</p>}
              {contact.location && <p><MapPin size={13} />{contact.location}</p>}
            </div><span className="contact-star" aria-hidden="true">✳</span>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <a className="brand" href="#home"><span className="brand-icon"><Code2 size={16} aria-hidden="true" /></span><span>{displayName || "Portfolio"}<small>MADE WITH CURIOSITY</small></span></a>
        <p>Learning out loud. Building one step at a time.</p>
        <a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={13} /></a>
      </footer>
    </>
  );
}

export default App;
