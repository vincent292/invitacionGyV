import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { PHOTOS } from './photos';
import { INVITACION } from './config';

export function PhotoAlbum({ active, paused, onPauseChange }: { active: boolean; paused: boolean; onPauseChange: (paused: boolean) => void }) {
  const [frame, setFrame] = useState({ index: 0, previous: 0, direction: 1, revision: 0 });
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const deck = useRef<HTMLDivElement>(null);
  const incoming = useRef<HTMLElement>(null);
  const outgoing = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const stopped = paused || manuallyPaused;
  useEffect(() => { if (!paused) setManuallyPaused(false); }, [paused]);
  useEffect(() => { if (!active) setHovered(false); }, [active]);

  // Decode first, so the fast cadence never advances into an unloaded photo.
  useEffect(() => {
    if (!active || ready) return;
    let cancelled = false;
    void Promise.allSettled(PHOTOS.map(photo => {
      const image = new Image();
      image.src = photo.url;
      return image.decode();
    })).then(results => {
      if (cancelled) return;
      const loaded = results.every(result => result.status === 'fulfilled');
      setReady(loaded); setLoadFailed(!loaded);
    });
    return () => { cancelled = true; };
  }, [active, ready]);

  const changePhoto = (direction: number, manual: boolean) => {
    if (manual) setManuallyPaused(true);
    setFrame(current => ({ index: (current.index + direction + PHOTOS.length) % PHOTOS.length, previous: current.index, direction, revision: current.revision + 1 }));
  };

  useEffect(() => {
    if (!active || !ready || stopped || hovered) return;
    const timer = window.setInterval(() => {
      setFrame(current => ({ index: (current.index + 1) % PHOTOS.length, previous: current.index, direction: 1, revision: current.revision + 1 }));
    }, INVITACION.fotosIntervaloMs);
    return () => window.clearInterval(timer);
  }, [active, ready, stopped, hovered]);

  useLayoutEffect(() => {
    if (!active || !frame.revision || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline.fromTo(outgoing.current, { autoAlpha: 1, x: 0, rotation: 0 }, { autoAlpha: 0, x: -22 * frame.direction, rotation: -4 * frame.direction, duration: .25, ease: 'power2.out' }, 0);
      timeline.fromTo(incoming.current, { autoAlpha: 0, x: 18 * frame.direction, rotation: 3 * frame.direction }, { autoAlpha: 1, x: 0, rotation: 0, duration: .28, ease: 'power2.out' }, .03);
    }, deck);
    return () => context.revert();
  }, [frame.revision, frame.direction, active]);

  const photo = PHOTOS[frame.index];
  const previous = PHOTOS[frame.previous];
  return <section className="chapter memories" id="recuerdos" aria-labelledby="memories-title">
    <div className="memories-layout entrance">
      <div className="memories-note"><span className="eyebrow">LOS MOMENTOS QUE NOS TRAJERON AQUÍ</span><h2 id="memories-title">Un sí.<br /><i>Toda una vida.</i></h2><p>Entre todos nuestros recuerdos,<br />el más bonito está por venir.</p><span className="signature">Valeria & Gabriel</span></div>
      <div className="album" role="group" aria-roledescription="carrusel" aria-label="Álbum de sus 13 fotografías" onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={event => { if (event.pointerType === 'mouse') setHovered(false); }} onFocusCapture={event => { if (!(event.target as HTMLElement).closest('.album-play')) setManuallyPaused(true); }}>
        <div className="album-deck" ref={deck} tabIndex={0} aria-label="Fotografía del álbum. Usa las flechas izquierda y derecha para cambiarla." onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
          event.preventDefault(); event.stopPropagation(); changePhoto(event.key === 'ArrowLeft' ? -1 : 1, true);
        }} onTouchStart={event => { if (event.touches.length !== 1) { touch.current = null; return; } touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={event => {
          const start = touch.current; touch.current = null;
          if (!start || !event.changedTouches.length) return;
          const x = event.changedTouches[0].clientX - start.x;
          const y = event.changedTouches[0].clientY - start.y;
          if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y) * 1.3) changePhoto(x < 0 ? 1 : -1, true);
        }}>
          {frame.revision > 0 && <figure className="album-card album-outgoing" ref={outgoing} aria-hidden="true"><img src={previous.url} alt="" draggable={false} /><figcaption>{previous.caption}</figcaption></figure>}
          <figure className="album-card album-current" ref={incoming}><img src={photo.url} alt={photo.alt} draggable={false} decoding="async" /><figcaption>{photo.caption}</figcaption></figure>
        </div>
        <div className="album-controls">
          <button type="button" onClick={() => changePhoto(-1, true)} aria-label="Fotografía anterior"><ArrowLeft size={18} /></button>
          <span className="album-counter" aria-live={stopped ? 'polite' : 'off'}>{String(frame.index + 1).padStart(2, '0')} <span>/ {PHOTOS.length}</span></span>
          <button type="button" onClick={() => changePhoto(1, true)} aria-label="Fotografía siguiente"><ArrowRight size={18} /></button>
          <button type="button" className="album-play" onClick={() => { setManuallyPaused(!stopped); onPauseChange(!stopped); }} disabled={!ready} aria-label={stopped ? 'Reanudar fotografías' : 'Pausar fotografías'} aria-pressed={!stopped}>{stopped ? <Play size={16} /> : <Pause size={16} />}</button>
        </div>
        <p className="album-instruction">{loadFailed ? 'Las fotos aún no se han cargado. Puedes recorrerlas con las flechas.' : !ready ? 'Preparando nuestros recuerdos…' : stopped ? 'Disfruta cada recuerdo a tu ritmo.' : 'Toca pausa para quedarte en un recuerdo.'}</p>
        <p className="album-ending-hint"><span className="mouse-hint">Otro scroll hacia abajo cierra la invitación.</span><span className="touch-hint">Desliza una vez más hacia arriba para cerrar.</span></p>
      </div>
    </div>
  </section>;
}
