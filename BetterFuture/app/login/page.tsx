'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from "react";
import { useActiveAccount } from "panna-sdk";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const isConnected = !!activeAccount;
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return;

    // If user is already logged in, redirect to home
    if (isConnected) {
      hasRedirected.current = true;
      router.replace("/home");
    }
  }, [isConnected, router]);

  function handleClose() {
    router.back();
  }

  // Don't render login page if user is already logged in
  if (isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <AuthLayout onClose={handleClose}>
        <LoginForm />
      </AuthLayout>
    </div>
  );
}

