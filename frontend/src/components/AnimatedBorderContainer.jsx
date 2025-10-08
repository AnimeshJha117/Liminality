function AnimatedBorderContainer({ children }) {
  return (
    <div className="relative w-full max-w-md rounded-2xl border border-transparent 
      [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,
      conic-gradient(from_var(--border-angle),
      theme(colors.slate.600/.48)_80%,
      theme(colors.cyan.500)_86%,
      theme(colors.cyan.300)_90%,
      theme(colors.cyan.500)_94%,
      theme(colors.slate.600/.48))_border-box]
      animate-border overflow-hidden flex items-center justify-center p-[2px]">
      {children}
    </div>
  );
}
export default AnimatedBorderContainer;