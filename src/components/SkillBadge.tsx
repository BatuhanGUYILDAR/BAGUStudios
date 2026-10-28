type SkillBadgeProps = {
  label: string;
};

function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-neon-blue/50 hover:bg-neon-blue/10 hover:text-white hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] motion-reduce:transform-none">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-neon-blue/70 transition duration-300 group-hover:bg-neon-green group-hover:shadow-[0_0_8px_rgba(52,211,153,0.9)]"
      />
      {label}
    </span>
  );
}

export default SkillBadge;
