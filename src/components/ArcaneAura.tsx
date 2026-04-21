export default function ArcaneAura() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden" aria-hidden="true">
      <div className="arcane-orb arcane-orb-left" />
      <div className="arcane-orb arcane-orb-right" />
      <div className="arcane-ring hidden md:block" />
    </div>
  );
}
