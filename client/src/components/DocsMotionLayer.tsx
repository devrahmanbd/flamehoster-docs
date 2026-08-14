/**
 * Decorative atmosphere for Brick Docs.
 * Content and controls remain fully usable with motion disabled; the layer is
 * intentionally pointer-events-free and contains no user-facing information.
 */
export default function DocsMotionLayer() {
  return (
    <div className="kb-aurora" aria-hidden="true">
      <div className="kb-aurora__orb kb-aurora__orb--one" />
      <div className="kb-aurora__orb kb-aurora__orb--two" />
      <div className="kb-aurora__orb kb-aurora__orb--three" />
      <div className="kb-aurora__grain" />
      <div className="kb-aurora__rule" />
    </div>
  );
}
