import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 18;

/**
 * Ambient motion layer for Brick Docs.
 * The grid, pointer spotlight, and cursor trail are decorative only and stop
 * when reduced motion is requested so document reading remains the priority.
 */
export default function DocsMotionLayer() {
  const glowRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const targetRef = useRef({ x: -999, y: -999 });
  const currentRef = useRef({ x: -999, y: -999 });
  const frameRef = useRef<number | null>(null);
  const lastParticleAtRef = useRef(0);
  const particleIndexRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        if (glowRef.current) glowRef.current.style.opacity = "0";
        particleRefs.current.forEach((particle) => particle?.classList.remove("is-emitting"));
      }
    };

    const emitParticle = (x: number, y: number) => {
      const particle = particleRefs.current[particleIndexRef.current % PARTICLE_COUNT];
      particleIndexRef.current += 1;
      if (!particle) return;
      particle.style.setProperty("--trail-x", `${x}px`);
      particle.style.setProperty("--trail-y", `${y}px`);
      particle.style.setProperty("--trail-size", `${3 + ((particleIndexRef.current % 4) * 1.35)}px`);
      particle.style.setProperty("--trail-drift-x", `${((particleIndexRef.current % 5) - 2) * 7}px`);
      particle.style.setProperty("--trail-drift-y", `${-12 - ((particleIndexRef.current % 4) * 5)}px`);
      particle.classList.remove("is-emitting");
      void particle.offsetWidth;
      particle.classList.add("is-emitting");
    };

    const tick = (time: number) => {
      const target = targetRef.current;
      const current = currentRef.current;
      const active = target.x >= 0 && target.y >= 0;

      if (active) {
        current.x += (target.x - current.x) * 0.22;
        current.y += (target.y - current.y) * 0.22;
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
        }
        if (time - lastParticleAtRef.current > 28) {
          emitParticle(current.x, current.y);
          lastParticleAtRef.current = time;
        }
      }

      if (active || Math.abs(current.x - target.x) > 0.5 || Math.abs(current.y - target.y) > 0.5) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotionRef.current || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
      targetRef.current = { x: event.clientX, y: event.clientY };
      if (glowRef.current) glowRef.current.style.opacity = "0.88";
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
    };

    const handlePointerLeave = () => {
      targetRef.current = { x: -999, y: -999 };
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    motionQuery.addEventListener?.("change", handleMotionPreference);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      motionQuery.removeEventListener?.("change", handleMotionPreference);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, []);

  return (
    <div className="kb-aurora" aria-hidden="true">
      <div className="kb-framer-grid" />
      <div ref={glowRef} className="kb-luminous-glow" />
      <div className="kb-cursor-trail">
        {Array.from({ length: PARTICLE_COUNT }, (_, index) => (
          <span
            key={index}
            ref={(node) => {
              particleRefs.current[index] = node;
            }}
            className="kb-cursor-particle"
          />
        ))}
      </div>
      <div className="kb-aurora__orb kb-aurora__orb--one" />
      <div className="kb-aurora__orb kb-aurora__orb--two" />
      <div className="kb-aurora__orb kb-aurora__orb--three" />
      <div className="kb-aurora__grain" />
      <div className="kb-aurora__rule" />
    </div>
  );
}
