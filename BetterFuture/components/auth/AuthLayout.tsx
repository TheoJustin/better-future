import { ReactNode } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AppTitle } from "./AppTitle";

interface AuthLayoutProps {
  children: ReactNode;
  heroImage?: string;
  onClose?: () => void;
  className?: string;
}

const imgImg03141 = "https://i.ibb.co.com/MycHgJgm/logo-better-future.png";

export function AuthLayout({
  children,
  heroImage = imgImg03141,
  onClose,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[430px] min-h-screen h-screen max-h-[932px] mx-auto",
        " overflow-hidden rounded-b-[55px] shadow-2xl",
        className
      )}
    >
      {/* Hero Image - Centered with Slow Movement */}
      <div className="absolute h-[294px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-0 animate-slow-float">
        <img
          alt="BetterFuture"
          className="absolute inset-0 max-w-none object-cover object-center pointer-events-none size-full"
          src={heroImage}
        />
      </div>

      {/* App Title - Top Center */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full px-4 z-20">
        <AppTitle />
      </div>

      {/* Bottom Navigation / Form Area */}
      <div className="absolute bottom-0 box-border flex flex-col gap-3 items-center justify-center left-1/2 pb-[70px] pt-2 px-4 -translate-x-1/2 w-full z-10 animate-slide-in-up">
        {children}
      </div>
    </div>
  );
}
