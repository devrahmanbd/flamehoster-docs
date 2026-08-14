import { useEffect, useState } from "react";

/**
 * Cinematic Framer-inspired motion layer for Brick Docs.
 * Features a subtle persistent grid, atmospheric orbs, and a luminous
 * mouse-proximity spotlight without obstructing interactive elements.
 */
export default function DocsMotionLayer() {
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="kb-aurora" aria-hidden="true">
      <div className="kb-framer-grid" />
      <div
        className="kb-luminous-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: mousePos.x < 0 ? 0 : 0.85,
        }}
      />
      <div className="kb-aurora__orb kb-aurora__orb--one" />
      <div className="kb-aurora__orb kb-aurora__orb--two" />
      <div className="kb-aurora__orb kb-aurora__orb--three" />
      <div className="kb-aurora__grain" />
      <div className="kb-aurora__rule" />
    </div>
  );
}
