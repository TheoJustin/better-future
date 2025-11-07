'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface PaymentSuccessProps {
  onBackToHome: () => void;
  userName?: string;
  merchantName?: string;
  amount?: string;
}

export default function PaymentSuccess({
  onBackToHome,
  userName = 'User',
  merchantName = 'Merchant',
  amount = '10'
}: PaymentSuccessProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Pembayaran Berhasil</h1>
        </div>

        {/* Main Content Card */}
        <Card className="w-full p-8 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800">
          <div className="flex flex-col items-center space-y-6">
            {/* Success Icon with Animation */}
            <div className="relative">
              <div className="absolute inset-0 animate-ping opacity-20">
                <div className="w-48 h-48 rounded-full bg-green-400"></div>
              </div>
              <div className="relative w-48 h-48 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl">
                {/* Trophy/Star mascot placeholder */}
                <div className="relative">
                  <CheckCircle2 className="w-32 h-32 text-white" strokeWidth={2.5} />
                  {/* Sparkle effects */}
                  <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-300 animate-pulse" />
                  <Sparkles className="absolute -bottom-2 -left-4 w-6 h-6 text-yellow-300 animate-pulse delay-150" />
                </div>
              </div>
            </div>

            {/* Success Text */}
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-green-600 dark:text-green-400">SUCCESS!</h2>
              <div className="h-1 w-24 mx-auto bg-linear-to-r from-green-400 to-emerald-400 rounded-full"></div>
            </div>

            {/* Payment Details */}
            <div className="text-center space-y-2 bg-white/50 dark:bg-black/20 p-4 rounded-lg w-full">
              <p className="text-base text-foreground leading-relaxed">
                <span className="font-semibold text-green-600 dark:text-green-400">{userName}</span>
                {' '}Berhasil Bayar{' '}
                <span className="font-bold text-lg text-green-600 dark:text-green-400">{amount} Koin</span>
                {' '}ke{' '}
                <span className="font-semibold text-green-600 dark:text-green-400">{merchantName}</span>
              </p>
            </div>

            {/* Decorative coins */}
            <div className="flex gap-2 justify-center">
              <Image
                src="/assets/heart-coin.png"
                alt="Coin"
                width={40}
                height={40}
                className="object-contain animate-bounce"
              />
              <Image
                src="/assets/heart-coin.png"
                alt="Coin"
                width={40}
                height={40}
                className="object-contain animate-bounce delay-75"
              />
              <Image
                src="/assets/heart-coin.png"
                alt="Coin"
                width={40}
                height={40}
                className="object-contain animate-bounce delay-150"
              />
            </div>
          </div>
        </Card>

        {/* Back to Home Button */}
        <Button
          onClick={onBackToHome}
          size="lg"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-6"
        >
          BALIK KE HOME
        </Button>
      </div>
    </div>
  );
}
