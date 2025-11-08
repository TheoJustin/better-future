interface AppTitleProps {
  className?: string;
}

export function AppTitle({ className }: AppTitleProps) {
  const title = "Better Future";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      {/* Main Title - Simple Text */}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1899d6]">
        {title}
      </h1>
    </div>
  );
}
