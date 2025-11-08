'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'panna-sdk';
import { Button } from '@/components/ui/button';
import PaymentLoading from '@/components/bf/PaymentLoading';
import PaymentSuccess from '@/components/bf/PaymentSuccess';

type Screen = 'selector' | 'loading' | 'success';

export default function PreviewPaymentPage() {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const isConnected = !!activeAccount;
  const hasRedirected = useRef(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('selector');

  // Redirect to login if not connected
  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return;

    if (!isConnected) {
      hasRedirected.current = true;
      // Use window.location.replace to force redirect and prevent back navigation
      window.location.replace('/login');
    }
  }, [isConnected]);

  // Don't render if not connected
  if (!isConnected) {
    return null;
  }

  if (currentScreen === 'loading') {
    return (
      <PaymentLoading
        onPay={() => setCurrentScreen('success')}
        amount="10000"
        merchantName="Merchant ABC"
      />
    );
  }

  if (currentScreen === 'success') {
    return (
      <PaymentSuccess
        onBackToHome={() => setCurrentScreen('selector')}
        userName="0x1234...5678"
        merchantName="Merchant ABC"
        amount="10000"
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md mx-auto px-8 py-12 space-y-6 bg-white dark:bg-gray-950 rounded-2xl shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Payment Flow Preview</h1>
          <p className="text-muted-foreground">Click to view each screen</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => setCurrentScreen('loading')}
            size="lg"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-lg py-6"
          >
            View Payment Loading Screen
          </Button>

          <Button
            onClick={() => setCurrentScreen('success')}
            size="lg"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-6"
          >
            View Payment Success Screen
          </Button>

          <Button
            onClick={() => router.push('/menu')}
            size="lg"
            variant="outline"
            className="w-full font-semibold text-lg py-6"
          >
            View Menu Page
          </Button>

          <Button
            onClick={() => router.push('/?tab=qr-scanner')}
            size="lg"
            variant="outline"
            className="w-full font-semibold text-lg py-6"
          >
            View QR Scanner
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
