'use client'

import { useState, useEffect } from "react";
import { useActiveAccount } from "panna-sdk";
import { Bell } from "lucide-react";

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}

export function GreetingSection() {
  const activeAccount = useActiveAccount()
  const userName = activeAccount?.address?.slice(0, 6) || 'User'
  const [greeting, setGreeting] = useState(getTimeBasedGreeting());

  // Update greeting periodically to handle time changes
  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getTimeBasedGreeting());
    };

    // Update immediately
    updateGreeting();

    // Update every minute to catch hour changes
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bg-[#1899d6] h-[79px] left-4 overflow-hidden rounded-[13px] top-[135px] w-[calc(100%-32px)] max-w-[398px]">
      <div className="absolute bg-[#1cb0f6] bottom-[4px] left-0 overflow-hidden right-0 rounded-[13px] top-0 flex items-center px-4">
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-[#ddf4ff] tracking-[-0.32px] uppercase">
            <p className="leading-normal">Hai {userName}</p>
          </div>
          <div className="flex flex-col font-bold justify-center leading-[100%] text-base text-white tracking-[-0.32px]">
            <p className="leading-normal">{greeting}</p>
          </div>
        </div>
        <div className="size-[22px] shrink-0">
          <Bell className="size-[22px] text-white" />
        </div>
      </div>
    </div>
  );
}

