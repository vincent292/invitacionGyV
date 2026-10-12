import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CalendarDays, Check, Flower2, Heart, MapPin, Music2, VolumeX, X } from 'lucide-react';
import { INVITACION as data } from './config';
import { CoverCloseGesture } from './cover-gesture';

const chapters = [
  { id: 'inicio', label: 'La invitación' },
  { id: 'nosotros', label: 'Nuestro amor' },
  { id: 'celebracion', label: 'La celebración' },
  { id: 'detalles', label: 'Los detalles' },
  { id: 'confirmar', label: 'Tu presencia' },
];
const wreath = '/assets/corona-floral-v2.png';
const dogs = '/assets/perritos-acuarela.png';
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Ornament() {
  return <span className="ornament" aria-hidden="true"><span /><Flower2 size={17} strokeWidth={1} /><span /></span>;
}
function Intro({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return <div className="section-intro"><span className="eyebrow">{kicker}</span><h2>{title}</h2><Ornament />{children && <p>{children}</p>}</div>;
}
function FloralLayers() {
  return <div className="floral-layers" aria-hidden="true">
    <img src={wreath} className="floral-foliage" alt="" />
    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => <span key={corner} className={`floral-corner ${corner}`} />)}
  </div>;
}
function OpeningFlorals() {
  return <div className="opening-florals" aria-hidden="true">
    {['foliage', 'wreath', 'bouquets'].map(layer => <div key={layer} className={`opening-floral-layer layer-${layer}`}>
      {['left', 'right'].map(side => <div key={side} className={`floral-half floral-half-${side}`}>
        <div className="floral-half-print">
          {layer === 'foliage' ? <img src={wreath} className="floral-foliage" alt="" /> : layer === 'wreath' ? <img src={wreath} className="door-wreath" alt="" /> : <div className="floral-layers">{['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => <span key={corner} className={`floral-corner ${corner}`} />)}</div>}
        </div>
      </div>)}
    </div>)}
  </div>;
}
function Opening({ onOpen, opening, closing, visible }: { onOpen: () => void; opening: boolean; closing: boolean; visible: boolean }) {
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (visible && !opening) button.current?.focus({ preventScroll: true }); }, [visible, opening]);
  return <div className={`opening ${visible ? '' : 'is-open'}`} role="dialog" aria-modal={visible ? true : undefined} aria-hidden={!visible} inert={!visible} aria-labelledby="opening-title">
    <div className="opening-backdrop" aria-hidden="true" />
    <div className="paper-invitation">
    {['left', 'right'].map((side, i) => <div key={side} className={`opening-door ${side}-door`} aria-hidden="true">
      <div className="door-print"><div className="door-rule" /></div>
      <span className="door-letter">{data.pareja.iniciales[i]}</span>
    </div>)}
    <OpeningFlorals />
    <div className="opening-top"><span className="eyebrow" id="opening-title">Una invitación para ti</span><span className="opening-names">Valeria & Gabriel</span></div>
    <button className="opening-seal" onClick={onOpen} disabled={opening} aria-label="Abrir la invitación tocando el sello"><i>&</i></button>
    <div className="opening-bottom"><p>Una historia, un sí,<br className="mobile-break" /> una vida juntos.</p>
      <button ref={button} className="button-primary" onClick={onOpen} disabled={opening}>{closing ? 'Cerrando…' : opening ? 'Abriendo…' : 'Abrir invitación'}<ArrowRight size={17} /></button>
      <span className="opening-date">12 · 12 · 2026</span>
    </div>
    </div>
  </div>;
}
function Hero({ next, close }: { next: () => void; close: () => void }) {
  return <section className="chapter hero" id="inicio" aria-labelledby="hero-title">
    <div className="cover-paper">
    <FloralLayers />
    <img src={wreath} alt="" className="hero-wreath" fetchPriority="high" />
    <div className="hero-content entrance">
      <div className="hero-heading">
      <span className="eyebrow">EL COMIENZO DE NUESTRO SIEMPRE</span>
      <p className="script">¡Nos casamos!</p>
      </div>
      <div className="hero-center">
      <h1 id="hero-title"><span>Valeria</span><em>&</em><span>Gabriel</span></h1>
      <p className="hero-note">Nuestro día más especial,<br />con nuestra gente favorita.</p>
      </div>
      <div className="hero-footer"><p className="hero-date">12 <span>·</span> 12 <span>·</span> 2026</p>
      <span className="hero-place">{data.lugar}</span>
      </div>
    </div>
    <button className="cover-close" onClick={close} aria-label="Cerrar la invitación"><X size={14} /><span>Cerrar</span></button>
    <button className="discover" onClick={next}>Descubre la invitación <ArrowDown size={16} /></button>
    </div>
    <span className="close-hint"><ArrowUp size={12} /><span className="mouse-hint">Otro gesto hacia arriba cierra las solapas</span><span className="touch-hint">Desliza hacia abajo para cerrar las solapas</span></span>
  </section>;
}
function Story() {
  return <section className="chapter story" id="nosotros" aria-labelledby="story-title">
    <div className="story-layout entrance">
      <div className={`portrait ${data.fotoPareja ? 'has-photo' : ''}`}>
        {data.fotoPareja ? <img src={data.fotoPareja} className="couple-photo" alt="Valeria y Gabriel" /> : <>
          <img src={wreath} className="portrait-wreath" alt="" loading="lazy" />
          <div className="portrait-monogram" aria-label="Valeria y Gabriel">V<span>&</span>G</div>
          <span className="portrait-caption">Un sí. Toda una vida.</span>
        </>}
        <img src={dogs} className="family-dogs" alt="Ilustración de sus dos perritos, un husky y un beagle" loading="lazy" />
      </div>
      <div className="story-note"><span className="eyebrow">CON AMOR, TE INVITAMOS</span>
        <h2 id="story-title">Lo más bonito<br />es <i>compartirlo.</i></h2><Ornament />
        <p>Hay momentos que se vuelven inolvidables cuando los vivimos con quienes más queremos.</p>
        <p>Nos encantará que nos acompañes en nuestra ceremonia civil y en esta nueva etapa que comienza.</p>
        <div className="family-note"><Heart size={15} strokeWidth={1.3} /><span>Nuestra familia también celebra.</span></div>
        <span className="signature">Valeria & Gabriel</span>
      </div>
    </div>
  </section>;
}
function Countdown() {
  const [delta, setDelta] = useState(() => Math.max(0, new Date(data.fechaISO).getTime() - Date.now()));
  useEffect(() => { const timer = window.setInterval(() => setDelta(Math.max(0, new Date(data.fechaISO).getTime() - Date.now())), 1000); return () => window.clearInterval(timer); }, []);
  const seconds = Math.floor(delta / 1000);
  const values = [Math.floor(seconds / 86400), Math.floor(seconds % 86400 / 3600), Math.floor(seconds % 3600 / 60), seconds % 60];
  return <div className="countdown"><p>{delta === 0 ? '¡Llegó nuestro gran día!' : 'CADA VEZ MÁS CERCA'}</p><div className="countdown-grid" aria-label="Tiempo hasta la boda">{values.map((value, i) => <div key={i}><strong>{String(value).padStart(2, '0')}</strong><span>{['Días', 'Horas', 'Minutos', 'Segundos'][i]}</span></div>)}</div></div>;
}
function Celebration() {
  return <section className="chapter celebration" id="celebracion" aria-label="Fecha y lugar de la celebración">
    <div className="celebration-inner entrance"><Intro kicker="RESERVA ESTE DÍA" title={<>Tenemos una <i>cita.</i></>} />
      <div className="event-layout"><div className="date-card"><span className="eyebrow">SÁBADO</span><strong className="date-number">12</strong><span className="date-month">Diciembre de 2026</span><span className="date-hour">A partir de las {data.horaInicio} h</span><a className="text-link" href="/boda-valeria-gabriel.ics" download><CalendarDays size={16} /> Guardar la fecha</a></div>
        <div className="venue-card"><MapPin size={29} strokeWidth={1} /><span className="eyebrow">CEREMONIA Y CELEBRACIÓN</span><h3>{data.lugar}</h3><p>El lugar donde comienza<br />nuestro siguiente capítulo.</p><a className="button-primary" href={data.ubicacionUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowRight size={16} /></a></div>
      </div><Countdown />
    </div>
  </section>;
}
function Schedule() {
  return <div className="timeline">{data.cronograma.map(event => <div className="timeline-row" key={event.titulo}>
    <span className="timeline-time">{event.hora}<small> h</small></span><span className="timeline-node" aria-hidden="true" />
    <span className={`event-illustration icon-${event.icono}`} aria-hidden="true" /><div><h3>{event.titulo}</h3><p>{event.detalle}</p></div>
  </div>)}</div>;
}
const colors = [{ name: 'Coral', color: '#df7953' }, { name: 'Rosa', color: '#cd7eaa' }, { name: 'Lavanda', color: '#9b91ce' }, { name: 'Amarillo', color: '#e9cb64' }, { name: 'Verde', color: '#749365' }, { name: 'Frambuesa', color: '#cb6575' }];
function DressCode() {
  const [selected, setSelected] = useState('');
  return <div className="dress-panel"><span className="script">{data.vestimenta}</span><p>Elegancia en colores vibrantes y alegres.<br />Atuendos formales, frescos y llenos de primavera.</p><span className="eyebrow">INSPÍRATE EN ESTOS COLORES</span>
    <div className="colors">{colors.map(({ name, color }) => <button type="button" key={name} style={{ '--swatch': color } as React.CSSProperties} aria-label={name} aria-pressed={selected === name} onClick={() => setSelected(name)}>{selected === name && <Check size={18} />}</button>)}</div>
    <p className="color-name" aria-live="polite">{selected || 'Toca un color para elegir tu inspiración'}</p>
    <div className="dress-avoid"><span className="eyebrow">COLORES QUE EVITAMOS</span><p>{data.evitarColores.join(' y ')}.</p></div>
  </div>;
}
function Details() {
  const [tab, setTab] = useState<'itinerario' | 'vestimenta'>('itinerario');
  const panel = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => { if (prefersReducedMotion()) return; const context = gsap.context(() => { gsap.fromTo(panel.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .38, ease: 'power2.out' }); }); return () => context.revert(); }, [tab]);
  const showDress = () => { setTab('vestimenta'); document.getElementById('tab-vestimenta')?.focus({ preventScroll: true }); };
  return <section className="chapter details" id="detalles" aria-label="Itinerario y vestimenta">
    <div className="details-inner entrance"><Intro kicker="PARA DISFRUTAR CADA MOMENTO" title={<>Un día para <i>recordar.</i></>} />
      <div className="detail-tabs" role="tablist" aria-label="Detalles de la boda">{(['itinerario', 'vestimenta'] as const).map((item, i) => <button key={item} role="tab" id={`tab-${item}`} aria-selected={tab === item} aria-controls={`panel-${item}`} tabIndex={tab === item ? 0 : -1} onClick={() => setTab(item)} onKeyDown={e => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const target = e.key === 'Home' ? 'itinerario' : e.key === 'End' ? 'vestimenta' : i === 0 ? 'vestimenta' : 'itinerario'; setTab(target); document.getElementById(`tab-${target}`)?.focus({ preventScroll: true }); } }}>{item === 'itinerario' ? 'El itinerario' : 'Qué vestir'}</button>)}</div>
      <div ref={panel} className={`detail-content showing-${tab}`} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0}>{tab === 'itinerario' ? <><Schedule /><div className="dress-preview"><div><span className="dress-preview-title"><Flower2 size={16} strokeWidth={1.3} />{data.vestimenta}</span><p>Evitemos: {data.evitarColores.join(' y ').toLowerCase()}.</p></div><button type="button" onClick={showDress}><span className="preview-swatches" aria-hidden="true">{colors.map(color => <i key={color.name} style={{ background: color.color }} />)}</span><span>Ver guía de vestimenta <ArrowRight size={14} /></span></button></div></> : <DressCode />}</div>
    </div>
  </section>;
}
function RSVP({ replay }: { replay: () => void }) {
  const [name, setName] = useState('');
  const [people, setPeople] = useState('1');
  const [answer, setAnswer] = useState('si');
  const [error, setError] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError(true); nameInput.current?.focus(); return; }
    const message = answer === 'si' ? `¡Hola, Valeria y Gabriel! Soy ${name.trim()} y confirmo mi asistencia a su boda del 12 de diciembre de 2026. Asistiremos ${people} ${people === '1' ? 'persona' : 'personas'}. ¡Con mucho cariño!` : `¡Hola, Valeria y Gabriel! Soy ${name.trim()}. Gracias por la invitación. Esta vez no podré acompañarlos, pero les deseo todo lo mejor.`;
    const number = data.whatsappNumero.replace(/\D/g, '');
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  return <section className="chapter rsvp" id="confirmar" aria-label="Confirmar asistencia">
    <img src={wreath} className="rsvp-floral" alt="" loading="lazy" />
    <div className="rsvp-layout entrance"><div className="rsvp-note"><span className="eyebrow">EL MEJOR REGALO ES TENERTE CERCA</span><h2>¿Nos<br /> <i>acompañas?</i></h2><Ornament /><p>Nos encantará compartir este día contigo. Confirma si podrás acompañarnos.</p><span className="signature">Con todo nuestro cariño.</span><span className="rsvp-names">Valeria & Gabriel</span></div>
      <form className="rsvp-form" onSubmit={submit} noValidate><label htmlFor="guest-name">Tu nombre</label><input ref={nameInput} id="guest-name" value={name} maxLength={80} autoComplete="name" placeholder="Nombre y apellido" aria-invalid={error} aria-describedby={error ? 'name-error' : undefined} onChange={e => { setName(e.target.value); setError(false); }} />{error && <span className="form-error" id="name-error" role="alert">Escribe tu nombre para continuar.</span>}
        <fieldset><legend>¿Podrás acompañarnos?</legend><div className="answer-options"><label className={answer === 'si' ? 'choice selected' : 'choice'}><input type="radio" name="attendance" value="si" checked={answer === 'si'} onChange={() => setAnswer('si')} /><span>Sí, con mucho gusto</span></label><label className={answer === 'no' ? 'choice selected' : 'choice'}><input type="radio" name="attendance" value="no" checked={answer === 'no'} onChange={() => setAnswer('no')} /><span>No podré asistir</span></label></div></fieldset>
        {answer === 'si' && <><label htmlFor="guest-people">Personas que asistirán</label><select id="guest-people" value={people} onChange={e => setPeople(e.target.value)}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>)}</select></>}
        <button className="button-primary" type="submit">{data.whatsappNumero ? 'Confirmar por WhatsApp' : 'Preparar mi confirmación'}<ArrowRight size={16} /></button><p className="form-footnote">{data.whatsappNumero ? 'Se abrirá WhatsApp con tu mensaje listo para enviar.' : 'Se abrirá WhatsApp para que elijas a Valeria o Gabriel y envíes tu mensaje.'}</p>
      </form></div><div className="invitation-ending"><button className="replay" onClick={replay}>Cerrar la invitación <X size={14} /></button><p><span className="mouse-hint">O haz otro scroll hacia abajo para cerrar.</span><span className="touch-hint">O desliza una vez más hacia arriba para cerrar.</span></p></div>
  </section>;
}
export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [opening, setOpening] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const openingRef = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const activeRef = useRef(0);
  const gestureLock = useRef(0);
  const transitionRef = useRef(false);
  const isOpenRef = useRef(false);
  const musicEnabledRef = useRef(true);
  const closeRef = useRef<() => void>(() => {});
  const navRef = useRef<(index: number) => void>(() => {});
  const navigate = useCallback((index: number) => {
    const root = mainRef.current;
    const target = root?.querySelectorAll<HTMLElement>('.chapter')[index];
    if (!root || !target || transitionRef.current) return;
    scrollTween.current?.kill();
    const top = target.offsetTop;
    gestureLock.current = performance.now() + 850;
    if (prefersReducedMotion()) { root.scrollTop = top; return; }
    root.classList.add('is-navigating');
    scrollTween.current = gsap.to(root, { scrollTop: top, duration: .75, ease: 'power2.inOut', onComplete: () => root.classList.remove('is-navigating'), onInterrupt: () => root.classList.remove('is-navigating') });
  }, []);
  navRef.current = navigate;
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(entries => { for (const entry of entries) { if (entry.isIntersecting) { const index = chapters.findIndex(chapter => chapter.id === entry.target.id); activeRef.current = index; setActive(index); } } }, { root, rootMargin: '-35% 0px -35% 0px', threshold: 0 });
    root.querySelectorAll('.chapter').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const root = mainRef.current;
    if (!root || showOpening) return;
    let total = 0;
    let last = 0;
    const closeGesture = new CoverCloseGesture();
    const endGesture = new CoverCloseGesture(1);
    let touch: { x: number; y: number; boundary: 'top' | 'end' | null; distance: number } | null = null;
    const atTop = () => root.scrollTop <= 2 && activeRef.current === 0;
    const atEnd = () => root.scrollTop + root.clientHeight >= root.scrollHeight - 2 && activeRef.current === chapters.length - 1;
    const blocked = () => transitionRef.current || performance.now() < gestureLock.current;
    const resetPull = () => { root.style.removeProperty('--pull-offset'); root.classList.remove('ready-to-close', 'ready-to-close-end'); };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const target = event.target as HTMLElement;
      if (target.closest('input, select, textarea, [role="tablist"]')) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? root.clientHeight : 1);
      const now = performance.now();
      const closeAtTop = closeGesture.push(delta, now, atTop(), blocked());
      const closeAtEnd = endGesture.push(delta, now, atEnd(), blocked());
      if (closeAtTop || closeAtEnd) {
        event.preventDefault(); closeRef.current(); return;
      }
      if ((atTop() && delta < 0) || (atEnd() && delta > 0)) { event.preventDefault(); return; }
      if (!window.matchMedia('(pointer: fine)').matches) return;
      const section = root.querySelectorAll<HTMLElement>('.chapter')[activeRef.current];
      if (!section || section.offsetHeight > root.clientHeight + 4) return;
      event.preventDefault();
      if (now < gestureLock.current) { last = now; return; }
      if (now - last > 180 || Math.sign(total) !== Math.sign(event.deltaY)) total = 0;
      last = now;
      total += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? root.clientHeight : 1);
      if (Math.abs(total) > 28) { const index = Math.max(0, Math.min(4, activeRef.current + Math.sign(total))); total = 0; gestureLock.current = now + 900; if (index !== activeRef.current) navRef.current(index); }
    };
    const keydown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, select, textarea, button, a, [role="tab"], [role="tabpanel"]') || event.altKey || event.ctrlKey || event.metaKey) return;
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) return;
      const outward = (atTop() && ['ArrowUp', 'PageUp'].includes(event.key)) || (atEnd() && ['ArrowDown', 'PageDown'].includes(event.key));
      if (outward) { event.preventDefault(); if (!event.repeat && !blocked()) closeRef.current(); return; }
      const section = root.querySelectorAll<HTMLElement>('.chapter')[activeRef.current];
      if (section && section.offsetHeight > root.clientHeight + 4 && !['Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = ['ArrowDown', 'PageDown'].includes(event.key) ? activeRef.current + 1 : activeRef.current - 1;
      navigate(event.key === 'Home' ? 0 : event.key === 'End' ? 4 : Math.max(0, Math.min(4, next)));
    };
    const touchstart = (event: TouchEvent) => {
      scrollTween.current?.kill();
      resetPull();
      if (event.touches.length !== 1 || (event.target as HTMLElement).closest('button, a, input, select, textarea, form') || blocked()) { touch = null; return; }
      touch = { x: event.touches[0].clientX, y: event.touches[0].clientY, boundary: atTop() ? 'top' : atEnd() ? 'end' : null, distance: 0 };
    };
    const touchmove = (event: TouchEvent) => {
      if (event.touches.length !== 1) { touch = null; resetPull(); return; }
      if (!touch?.boundary) return;
      const movement = event.touches[0].clientY - touch.y;
      const distance = movement * (touch.boundary === 'top' ? 1 : -1);
      const horizontal = Math.abs(event.touches[0].clientX - touch.x);
      touch.distance = Math.max(0, distance);
      if (horizontal > 12 && horizontal > Math.abs(distance)) { touch.boundary = null; resetPull(); return; }
      if (distance <= 6) { resetPull(); return; }
      event.preventDefault();
      touch.distance = distance;
      if (touch.boundary === 'top') root.style.setProperty('--pull-offset', `${Math.min(18, distance * .15)}px`);
      root.classList.toggle(touch.boundary === 'top' ? 'ready-to-close' : 'ready-to-close-end', distance >= 96);
    };
    const touchend = () => { const shouldClose = touch?.boundary && touch.distance >= 96 && (touch.boundary === 'top' ? atTop() : atEnd()) && !blocked(); touch = null; resetPull(); if (shouldClose) closeRef.current(); };
    const touchcancel = () => { touch = null; resetPull(); };
    root.addEventListener('wheel', wheel, { passive: false });
    root.addEventListener('touchstart', touchstart, { passive: true });
    root.addEventListener('touchmove', touchmove, { passive: false });
    root.addEventListener('touchend', touchend);
    root.addEventListener('touchcancel', touchcancel);
    root.addEventListener('keydown', keydown);
    return () => { resetPull(); root.removeEventListener('wheel', wheel); root.removeEventListener('touchstart', touchstart); root.removeEventListener('touchmove', touchmove); root.removeEventListener('touchend', touchend); root.removeEventListener('touchcancel', touchcancel); root.removeEventListener('keydown', keydown); };
  }, [showOpening, navigate]);
  useLayoutEffect(() => {
    if (showOpening || !mainRef.current || prefersReducedMotion()) return;
    const root = mainRef.current;
    const context = gsap.context(() => {
      gsap.fromTo(root.querySelectorAll('.chapter')[active].querySelector('.entrance'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .7, ease: 'power2.out' });
    }, root);
    return () => context.revert();
  }, [active, showOpening]);
  useEffect(() => () => { animation.current?.kill(); scrollTween.current?.kill(); }, []);
  const finishClose = () => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
    activeRef.current = 0; setActive(0);
    transitionRef.current = false; isOpenRef.current = false;
    setOpening(false); setClosing(false);
  };
  const toggleMusic = async () => { const player = audioRef.current; if (!player) return; if (!player.paused) { musicEnabledRef.current = false; player.pause(); return; } musicEnabledRef.current = true; try { player.volume = .35; await player.play(); } catch { setPlaying(false); } };
  const open = () => {
    if (transitionRef.current || isOpenRef.current) return;
    transitionRef.current = true;
    setOpening(true);
    setClosing(false);
    if (musicEnabledRef.current && audioRef.current) { audioRef.current.volume = .35; void audioRef.current.play().catch(() => setPlaying(false)); }
    const finish = () => { isOpenRef.current = true; transitionRef.current = false; gestureLock.current = performance.now() + 700; setShowOpening(false); setOpening(false); requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true })); };
    if (prefersReducedMotion()) { finish(); return; }
    if (animation.current) { animation.current.timeScale(1).play(0); return; }
    animation.current = gsap.timeline({ onComplete: finish, onReverseComplete: finishClose })
      .to('.opening-backdrop', { opacity: 0, duration: .75 }, 1.05)
      .to('.paper-invitation', { boxShadow: '0 0 0 0 rgba(80, 60, 35, 0)', duration: .9 }, .85)
      .to('.opening-top, .opening-bottom', { opacity: 0, duration: .25 }, 0)
      .to('.opening-seal', { opacity: 0, scale: .8, duration: .25 }, .08)
      .to('.layer-bouquets .floral-half', { xPercent: i => i === 0 ? -104 : 104, duration: .95, ease: 'power2.inOut' }, .12)
      .to('.layer-wreath .floral-half', { xPercent: i => i === 0 ? -104 : 104, duration: 1.15, ease: 'power3.inOut' }, .42)
      .to('.layer-foliage .floral-half', { xPercent: i => i === 0 ? -104 : 104, duration: 1.1, ease: 'power3.inOut' }, .7)
      .to('.left-door', { xPercent: -101, duration: 1.15, ease: 'power3.inOut' }, .85)
      .to('.right-door', { xPercent: 101, duration: 1.15, ease: 'power3.inOut' }, .85);
  };
  const close = () => {
    if (transitionRef.current || !isOpenRef.current) return;
    transitionRef.current = true;
    isOpenRef.current = false;
    scrollTween.current?.kill();
    mainRef.current?.classList.remove('is-navigating');
    audioRef.current?.pause();
    setClosing(true); setOpening(true); setShowOpening(true);
    if (prefersReducedMotion() || !animation.current) { animation.current?.pause(0, true); finishClose(); return; }
    animation.current.timeScale(1.15).reverse();
  };
  closeRef.current = close;
  return <div className="invitation">
    <audio ref={audioRef} src={data.musicaUrl} preload="none" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <div className="experience" inert={showOpening}>
      <header className="site-header"><button className="brand" aria-label="Volver al inicio" onClick={() => navigate(0)}>V<span>&</span>G</button><span className="header-date">12 DICIEMBRE 2026</span><nav aria-label="Accesos directos"><button onClick={() => navigate(2)}><MapPin size={14} /><span>El lugar</span></button><button className="quick-rsvp" onClick={() => navigate(4)}><Heart size={13} /><span>Confirmar</span></button><button className="music-control" onClick={() => void toggleMusic()} aria-label={playing ? 'Pausar música' : 'Activar música'} aria-pressed={playing}>{playing ? <Music2 size={17} /> : <VolumeX size={17} />}</button></nav></header>
      <main ref={mainRef} className="chapters" tabIndex={-1} aria-label="Invitación de boda de Valeria y Gabriel"><Hero next={() => navigate(1)} close={close} /><Story /><Celebration /><Details /><RSVP replay={close} /></main>
      <nav className="chapter-nav" aria-label="Secciones de la invitación"><span className="chapter-counter">0{active + 1}<span> / 05</span></span><div className="chapter-dots">{chapters.map((chapter, i) => <button key={chapter.id} aria-label={`Ir a ${chapter.label}`} aria-current={active === i ? 'step' : undefined} onClick={() => navigate(i)}><span /></button>)}</div><span className="chapter-label">{chapters[active].label}</span><div className="chapter-arrows"><button onClick={() => navigate(active - 1)} disabled={active === 0} aria-label="Pantalla anterior"><ArrowLeft size={17} /></button><button onClick={() => active === 4 ? close() : navigate(active + 1)} aria-label={active === 4 ? 'Cerrar la invitación' : 'Pantalla siguiente'}>{active === 4 ? <X size={17} /> : <ArrowRight size={17} />}</button></div></nav>
    </div>
    <div ref={openingRef}><Opening onOpen={open} opening={opening} closing={closing} visible={showOpening} /></div>
  </div>;
}
