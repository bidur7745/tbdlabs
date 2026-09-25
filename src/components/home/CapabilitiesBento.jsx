import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CAPABILITIES } from '../../content/capabilities.js';
import '../../styles/capabilities-carousel.css';

const INTERVAL_MS = 5500;
const CARD_W = 168;
const CARD_H = 248;
const CARD_GAP = 16;
const STACK_PAD = 28;
const STACK_BOTTOM = 18;

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

function cardLayout(indexInOrder, geom, count) {
  if (indexInOrder === 0) {
    return {
      top: 0,
      left: 0,
      width: geom.w,
      height: geom.h,
      borderRadius: 0,
      zIndex: 2,
    };
  }

  const stackIndex = indexInOrder - 1;
  const visibleCount = Math.min(3, count);
  const stackCount = Math.max(visibleCount - 1, 0);
  const stackWidth = stackCount * CARD_W + Math.max(0, stackCount - 1) * CARD_GAP;
  const left = Math.max(
    geom.w * 0.52,
    geom.w - STACK_PAD - stackWidth + stackIndex * (CARD_W + CARD_GAP)
  );

  return {
    top: geom.h - CARD_H - STACK_BOTTOM,
    left,
    width: CARD_W,
    height: CARD_H,
    borderRadius: 10,
    zIndex: 20 + stackIndex,
  };
}

export function CapabilitiesBento({ navigate }) {
  const n = CAPABILITIES.length;
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const stageRef = useRef(null);
  const [geom, setGeom] = useState({ w: 1168, h: 600 });
  const [order, setOrder] = useState(() => CAPABILITIES.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const activeIndex = order[0] ?? 0;
  const active = CAPABILITIES[activeIndex];
  const visibleOrder = order.slice(0, 3);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;

    const measure = () => setGeom({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const goNext = useCallback(() => {
    setOrder((current) => [...current.slice(1), current[0]]);
    setProgressKey((key) => key + 1);
  }, []);

  const goPrev = useCallback(() => {
    setOrder((current) => {
      const last = current[current.length - 1];
      return [last, ...current.slice(0, -1)];
    });
    setProgressKey((key) => key + 1);
  }, []);

  const goTo = useCallback((target) => {
    setOrder((current) => {
      const at = current.indexOf(target);
      if (at <= 0) return current;
      return [...current.slice(at), ...current.slice(0, at)];
    });
    setProgressKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (isMobile || reduceMotion || paused) return undefined;

    const id = window.setTimeout(() => {
      setOrder((current) => [...current.slice(1), current[0]]);
      setProgressKey((key) => key + 1);
    }, INTERVAL_MS);

    return () => window.clearTimeout(id);
  }, [activeIndex, isMobile, reduceMotion, paused, progressKey]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    }
  };

  const handleCta = (event, href) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(href);
  };

  return (
    <section className="cap-section section" aria-labelledby="capabilities-heading">
      <div className="container">
        <div className="cap-intro">
          <span className="cap-eyebrow">
            <Sparkles size={12} aria-hidden="true" /> Engineering Disciplines
          </span>
          <h2 id="capabilities-heading">Built for modern digital scale</h2>
          <p>
            We combine systems programming discipline with modern UI engineering to deliver resilient, production-ready platforms.
          </p>
        </div>

        {isMobile ? (
          <div className="cap-mobile" aria-label="Capabilities">
            {CAPABILITIES.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="cap-mobile-card"
                style={{ backgroundImage: `url(${item.image})` }}
                onClick={(event) => handleCta(event, item.href)}
              >
                <div className="cap-mobile-shade" aria-hidden="true" />
                <div className="cap-mobile-body">
                  <div className="cap-overlay-kicker">{item.eyebrow}</div>
                  <h3>
                    {item.title}
                    <br />
                    {item.title2}
                  </h3>
                  <p>{item.description}</p>
                  <span className="cap-mobile-cta">
                    View services <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div
            ref={stageRef}
            className="cap-stage"
            role="region"
            aria-roledescription="carousel"
            aria-label="Engineering capabilities"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
            }}
          >
            <div className="cap-progress" aria-hidden="true">
              <span
                key={progressKey}
                className={`cap-progress-bar${!reduceMotion ? ' is-running' : ''}${paused ? ' is-paused' : ''}`}
              />
            </div>

            {visibleOrder.map((itemIndex) => {
              const item = CAPABILITIES[itemIndex];
              const indexInOrder = visibleOrder.indexOf(itemIndex);
              const layout = cardLayout(indexInOrder, geom, visibleOrder.length);
              const isActive = indexInOrder === 0;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`cap-card${isActive ? ' is-active' : ' is-stack'}`}
                  style={{
                    top: layout.top,
                    left: layout.left,
                    width: layout.width,
                    height: layout.height,
                    borderRadius: layout.borderRadius,
                    zIndex: layout.zIndex,
                    backgroundImage: `url(${item.image})`,
                  }}
                  tabIndex={isActive ? -1 : 0}
                  aria-label={isActive ? undefined : `Show ${item.title} ${item.title2}`}
                  aria-hidden={isActive ? true : undefined}
                  disabled={isActive}
                  onClick={() => {
                    if (!isActive) goTo(itemIndex);
                  }}
                >
                  <span className="cap-card-shade" />
                  <span className="cap-card-mini">
                    <span className="cap-card-mini-bar" />
                    <span className="cap-card-mini-kicker">{item.eyebrow}</span>
                    <span className="cap-card-mini-title">
                      {item.title} {item.title2}
                    </span>
                  </span>
                </button>
              );
            })}

            <div className="cap-overlay">
              <div key={active.id} className="cap-overlay-inner">
                <div className="cap-overlay-kicker">{active.eyebrow}</div>
                <div className="cap-overlay-rule" aria-hidden="true" />
                <h3>
                  {active.title}
                  <br />
                  {active.title2}
                </h3>
                <p className="cap-overlay-desc">{active.description}</p>
                <button
                  type="button"
                  className="cap-overlay-cta"
                  onClick={(event) => handleCta(event, active.href)}
                >
                  View services <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="cap-controls">
              <button type="button" className="cap-nav-btn" aria-label="Previous capability" onClick={goPrev}>
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button type="button" className="cap-nav-btn" aria-label="Next capability" onClick={goNext}>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
              <div className="cap-pager" aria-hidden="true">
                <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="cap-pager-track">
                  <span
                    className="cap-pager-fill"
                    style={{ width: `${((activeIndex + 1) / n) * 100}%` }}
                  />
                </span>
                <span>{String(n).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
