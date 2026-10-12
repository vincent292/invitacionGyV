import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, CalendarDays, Check, Clock3, Flower2, Heart, MapPin, Music2, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { INVITACION as data } from './config';

gsap.registerPlugin(ScrollTrigger);

function remaining(targetIso: string) {
  const delta = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const seconds = Math.floor(delta / 1000);
  return {
    dias: Math.floor(seconds / 86400),
    horas: Math.floor((seconds % 86400) / 3600),
    minutos: Math.floor((seconds % 3600) / 60),
    segundos: seconds % 60,
  };
}

function Ornament({ className = '' }: { className?: string }) {
  return <span className={`ornament ${className}`} aria-hidden="true"><span /><Flower2 size={17} strokeWidth={1.15} /><span /></span>;
}

function SectionIntro({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="section-intro reveal">
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>
      <Ornament />
      {children && <p>{children}</p>}
    </div>
  );
}

function Opening({ onOpen, opening }: { onOpen: () => void; opening: boolean }) {
  return (
    <div className="opening" id="opening" role="dialog" aria-modal="true" aria-label="Abrir la invitación de Valeria y Gabriel">
      <div className="opening-door left-door">
        <img src="/assets/floral-marco-superior.png" className="door-ornament flower-top-left" alt="" />
        <img src="/assets/floral-marco-inferior.png" className="door-ornament flower-bottom-left" alt="" />
        <div className="door-border door-border-left" />
        <span className="door-letter door-letter-left">V</span>
      </div>
      <div className="opening-door right-door">
        <img src="/assets/floral-marco-superior.png" className="door-ornament flower-top-right" alt="" />
        <img src="/assets/floral-marco-inferior.png" className="door-ornament flower-bottom-right" alt="" />
        <div className="door-border door-border-right" />
        <span className="door-letter door-letter-right">G</span>
      </div>
      <div className="opening-top">
        <Flower2 size={20} strokeWidth={1} />
        <span>NUESTRA BODA</span>
        <span className="top-line" />
      </div>
      <div className="opening-seal" aria-hidden="true"><span>&</span></div>
      <div className="opening-bottom">
        <p>Una historia, un sí, una vida juntos</p>
        <button className="open-button" onClick={onOpen} disabled={opening}>
          {opening ? 'Abriendo...' : 'Abrir invitación'}
          <ArrowRight size={17} strokeWidth={1.5} />
        </button>
        <span className="opening-date">12 · 12 · 2026</span>
      </div>
    </div>
  );
}

function MusicControl({ audioRef, playing, setPlaying }: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
}) {
  const toggle = async () => {
    const player = audioRef.current;
    if (!player) return;
    if (playing) { player.pause(); setPlaying(false); return; }
    try { await player.play(); setPlaying(true); } catch { setPlaying(false); }
  };
  return (
    <button className="music-control" onClick={toggle} aria-label={playing ? 'Pausar música' : 'Reproducir música'} title={playing ? 'Pausar música' : 'Reproducir música'}>
      <span className={playing ? 'music-control-disc spinning' : 'music-control-disc'}><Music2 size={20} strokeWidth={1.6} /></span>
      <span className="music-control-text">{playing ? 'Música activada' : 'Activar música'}</span>
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-shimmer" aria-hidden="true" />
      <img src="/assets/ramo-acuarela.png" className="hero-wreath" alt="" />
      <span className="hero-tiny-star star-one" aria-hidden="true">✦</span>
      <span className="hero-tiny-star star-two" aria-hidden="true">✧</span>
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">CON LA ALEGRÍA DE NUESTROS CORAZONES</p>
        <p className="hero-script">¡Nos casamos!</p>
        <h1><span>{data.pareja.primero}</span><em>&</em><span>{data.pareja.segundo}</span></h1>
        <p className="hero-intro">El día más importante de nuestras vidas merece ser compartido con nuestra gente favorita.</p>
        <Ornament />
        <p className="hero-date">12 <b>·</b> 12 <b>·</b> 2026</p>
        <p className="hero-place">{data.lugar}</p>
      </div>
      <a className="scroll-down" href="#historia" aria-label="Desplazarse para ver la invitación"><span>DESLIZA PARA DESCUBRIR</span><ArrowDown size={18} /></a>
    </section>
  );
}

function Story() {
  return (
    <section className="story section-pad" id="historia">
      <img src="/assets/flores-laterales.png" alt="" className="story-flowers" loading="lazy" />
      <span className="chapter-number reveal">01 / UN DÍA ESPECIAL</span>
      <div className="story-card reveal">
        <span className="story-kicker">Con amor, te invitamos</span>
        <h2>La celebración<br /><i>de nuestro amor</i></h2>
        <Ornament />
        <p>Hay momentos que se vuelven inolvidables cuando los compartimos con quienes más queremos.</p>
        <p>Por eso, sería un honor que nos acompañes en nuestra <strong>ceremonia civil</strong> y en esta nueva etapa que comienza.</p>
        <div className="story-signature">V <span>&</span> G</div>
      </div>
    </section>
  );
}

function Countdown() {
  const [count, setCount] = useState(() => remaining(data.fechaISO));
  useEffect(() => {
    const id = setInterval(() => setCount(remaining(data.fechaISO)), 1000);
    return () => clearInterval(id);
  }, []);
  const arrived = Object.values(count).every((v) => v === 0);
  return (
    <section className="countdown section-pad" id="fecha">
      <SectionIntro kicker="GUARDA LA FECHA" title="Nuestro gran día">Cada día falta menos para vivir este momento juntos.</SectionIntro>
      <div className="date-banner reveal"><CalendarDays size={24} strokeWidth={1.1} /><p>SÁBADO</p><strong>12</strong><p>DICIEMBRE · 2026</p><span>16:00 HRS</span></div>
      <div className="countdown-label reveal">{arrived ? '¡Llegó nuestro momento!' : 'FALTAN'}</div>
      <div className="countdown-grid reveal" aria-live="off">
        {([
          ['DÍAS', count.dias], ['HORAS', count.horas], ['MINUTOS', count.minutos], ['SEGUNDOS', count.segundos],
        ] as const).map(([label, value]) => <div className="countdown-box" key={label}><span>{String(value).padStart(2, '0')}</span><small>{label}</small></div>)}
      </div>
      <a href="/boda-valeria-gabriel.ics" download className="text-link reveal"><CalendarDays size={16} /> Agregar a mi calendario <ArrowRight size={16} /></a>
    </section>
  );
}

function Location() {
  return (
    <section className="location section-pad" id="lugar">
      <SectionIntro kicker="DÓNDE NOS ENCONTRAREMOS" title="El lugar del sí">Nos encantará recibirte para celebrar juntos este día tan especial.</SectionIntro>
      <div className="location-card reveal">
        <div className="location-card-art"><img src="/assets/ramo-acuarela.png" alt="" loading="lazy" /></div>
        <div className="location-pin"><MapPin size={24} strokeWidth={1.35} /></div>
        <p className="small-caps">CEREMONIA Y CELEBRACIÓN</p>
        <h3>{data.lugar}</h3>
        <p className="location-hour"><Clock3 size={17} /> 12 de diciembre · {data.horaInicio} h</p>
        <a className="button-primary" href={data.ubicacionUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17} /> Ver ubicación <ArrowRight size={17} /></a>
        <p className="location-caption">Enlace obtenido del QR de nuestra invitación</p>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="schedule section-pad" id="itinerario">
      <SectionIntro kicker="CADA MOMENTO CUENTA" title="Nuestro itinerario">Una tarde de emociones, buenos recuerdos y mucha alegría.</SectionIntro>
      <div className="timeline">
        {data.cronograma.map((event, index) => (
          <div className="timeline-row reveal" key={`${event.hora}-${event.titulo}`}>
            <div className="timeline-time">{event.hora}<span>HRS</span></div>
            <span className="timeline-node"><Heart size={12} fill="currentColor" /></span>
            <div className="timeline-card"><span className="timeline-emoji" aria-hidden="true">{event.emoji}</span><div><h3>{event.titulo}</h3><p>{event.detalle}</p></div><span className="timeline-index">0{index + 1}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DressCode() {
  return (
    <section className="dresscode section-pad" id="vestimenta">
      <div className="dress-panel reveal">
        <img src="/assets/floral-marco-superior.png" alt="" className="dress-flower-left" loading="lazy" />
        <img src="/assets/floral-marco-inferior.png" alt="" className="dress-flower-right" loading="lazy" />
        <span className="eyebrow">PARA ESTE DÍA ESPECIAL</span>
        <h2>Dress <i>code</i></h2>
        <Ornament />
        <p className="dress-name">{data.vestimenta}</p>
        <p className="dress-description">Elegancia en colores vibrantes y alegres. Nos encantará verlos en atuendos formales y frescos, ¡llenos de primavera!</p>
        <div className="colors"><span style={{ background: '#e67e43' }} /><span style={{ background: '#d57aaf' }} /><span style={{ background: '#928ae8' }} /><span style={{ background: '#f7d85b' }} /><span style={{ background: '#558951' }} /><span style={{ background: '#d45f6a' }} /></div>
        <div className="dontwear"><span>POR FAVOR, EVITAR</span><strong>Blanco y verde turquesa oscuro</strong></div>
      </div>
    </section>
  );
}

function RSVP() {
  const [name, setName] = useState('');
  const [people, setPeople] = useState('1');
  const [answer, setAnswer] = useState<'si' | 'no'>('si');
  const [warn, setWarn] = useState(false);
  const handleWhatsapp = () => {
    const cleanName = name.trim();
    if (!cleanName) { setWarn(true); return; }
    const message = answer === 'si'
      ? `¡Hola, Valeria y Gabriel! 💕 Soy ${cleanName} y confirmo mi asistencia a su boda del 12 de diciembre de 2026. Asistiremos ${people} ${people === '1' ? 'persona' : 'personas'}. ¡Con mucho cariño!`
      : `¡Hola, Valeria y Gabriel! 💕 Soy ${cleanName}. Muchas gracias por invitarme a su boda. Esta vez no podré acompañarlos, pero les deseo todo lo mejor.`;
    const num = data.whatsappNumero.replace(/[^0-9]/g, '');
    // Sin destinatario configurado, WhatsApp permite seleccionar a quién compartir.
    window.open(`https://wa.me/${num ? `${num}` : ''}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <section className="rsvp section-pad" id="confirmar">
      <img className="rsvp-flowers" src="/assets/ramo-acuarela.png" alt="" loading="lazy" />
      <div className="rsvp-inner reveal">
        <span className="eyebrow">NOS HARÁ MUCHA ILUSIÓN VERTE</span>
        <h2>¿Nos acompañas?</h2>
        <Ornament />
        <p>Tu presencia será uno de los regalos más bonitos. Confírmanos si podrás acompañarnos.</p>
        <div className="rsvp-form">
          <label htmlFor="guest-name">Tu nombre</label>
          <input id="guest-name" value={name} maxLength={80} onChange={(e) => { setName(e.target.value); setWarn(false); }} placeholder="Nombre y apellido" autoComplete="name" />
          {warn && <span className="form-error">Escribe tu nombre antes de continuar.</span>}
          <label htmlFor="guest-answer">¿Asistirás?</label>
          <div className="answer-options" id="guest-answer">
            <button className={answer === 'si' ? 'choice selected' : 'choice'} onClick={() => setAnswer('si')} type="button"><Check size={17} /> Sí, asistiré</button>
            <button className={answer === 'no' ? 'choice selected' : 'choice'} onClick={() => setAnswer('no')} type="button">No podré asistir</button>
          </div>
          {answer === 'si' && <><label htmlFor="guest-people">¿Cuántas personas?</label><select id="guest-people" value={people} onChange={(e) => setPeople(e.target.value)}><option value="1">1 persona</option><option value="2">2 personas</option><option value="3">3 personas</option><option value="4">4 personas</option><option value="5">5 personas</option><option value="6">6 personas</option></select></>}
          <button type="button" className="button-primary rsvp-send" onClick={handleWhatsapp}>Confirmar por WhatsApp <ArrowRight size={18} /></button>
        </div>
        <p className="rsvp-footnote">Prepararemos el mensaje para enviarlo desde tu WhatsApp.</p>
      </div>
    </section>
  );
}

function Footer({ replay }: { replay: () => void }) {
  return (
    <footer className="footer">
      <div className="footer-floral" aria-hidden="true" />
      <span className="eyebrow">GRACIAS POR FORMAR PARTE DE NUESTRA HISTORIA</span>
      <div className="footer-signature">Valeria <span>&</span> Gabriel</div>
      <p>12 · 12 · 2026</p>
      <div className="footer-heart"><Heart size={17} fill="currentColor" /></div>
      <button type="button" onClick={replay} className="replay-link">Repetir la apertura <Sparkles size={14} /></button>
    </footer>
  );
}

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [opening, setOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [openCompleted, setOpenCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const reducedMotion = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (showOpening) document.body.classList.add('is-closed');
    else document.body.classList.remove('is-closed');
    return () => document.body.classList.remove('is-closed');
  }, [showOpening]);

  useLayoutEffect(() => {
    if (!openCompleted || !mainRef.current || reducedMotion.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content > *', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'power2.out' });
      gsap.fromTo('.hero-wreath', { opacity: 0, scale: 0.93 }, { opacity: 0.89, scale: 1, duration: 2.1, ease: 'power2.out' });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 87%', once: true } });
      });
      ScrollTrigger.refresh();
    }, mainRef);
    return () => ctx.revert();
  }, [openCompleted]);

  const startMusic = useCallback(async () => {
    try { if (audioRef.current) { audioRef.current.volume = 0.42; await audioRef.current.play(); setPlaying(true); } } catch { setPlaying(false); }
  }, []);

  const openInvitation = useCallback(() => {
    if (opening) return;
    setOpening(true);
    void startMusic();
    if (reducedMotion.current) {
      setShowOpening(false); setOpening(false); setOpenCompleted(true); return;
    }
    const timeline = gsap.timeline({
      onComplete: () => { setShowOpening(false); setOpening(false); setOpenCompleted(true); },
    });
    animationRef.current = timeline;
    timeline
      .to('.opening-bottom', { y: 25, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0)
      .to('.opening-top', { y: -20, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0)
      .to('.opening-seal', { scale: 0.7, opacity: 0, duration: 0.5, ease: 'back.in(1.4)' }, 0.2)
      .to('.left-door', { xPercent: -104, duration: 1.65, ease: 'power3.inOut' }, 0.35)
      .to('.right-door', { xPercent: 104, duration: 1.65, ease: 'power3.inOut' }, 0.35);
  }, [opening, startMusic]);

  const replayOpening = useCallback(() => {
    animationRef.current?.kill();
    gsap.set(['.opening-door', '.opening-top', '.opening-bottom', '.opening-seal'], { clearProps: 'all' });
    window.scrollTo({ top: 0, behavior: 'instant' });
    setOpenCompleted(false); setShowOpening(true); setOpening(false);
  }, []);

  return (
    <>
      <audio ref={audioRef} src={data.musicaUrl} preload="none" loop onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
      <div ref={mainRef} className="site-shell">
        <Hero />
        <Story />
        <Countdown />
        <Location />
        <Schedule />
        <DressCode />
        <RSVP />
        <Footer replay={replayOpening} />
      </div>
      {openCompleted && <MusicControl audioRef={audioRef} playing={playing} setPlaying={setPlaying} />}
      {showOpening && <Opening onOpen={openInvitation} opening={opening} />}
    </>
  );
}
