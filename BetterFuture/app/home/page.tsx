'use client'

import { useActiveAccount } from 'panna-sdk'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from "react";

import { HomeLayout } from '@/components/home/HomeLayout'

export default function HomePage() {
  const router = useRouter()
  const activeAccount = useActiveAccount()
  const isConnected = !!activeAccount
  const hasRedirected = useRef(false);

  // Redirect to login if not connected
  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return;

    if (!isConnected) {
      hasRedirected.current = true;
      // Use window.location.replace to force redirect and prevent back navigation
      window.location.replace("/login");
    }
  }, [isConnected, router])

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <HomeLayout />
    </div>
  );
}

