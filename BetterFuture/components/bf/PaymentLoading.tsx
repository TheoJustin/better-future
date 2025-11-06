'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PaymentLoadingProps {
  onPay: () => void;
  amount?: string;
  merchantName?: string;
}

export default function PaymentLoading({ onPay, amount, merchantName }: PaymentLoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-b from-cyan-50 to-white dark:from-cyan-950 dark:to-background">
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Pembayaran QRIS</h1>
        </div>

        {/* Main Content Card */}
        <Card className="w-full p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Mascot with Coins Animation */}
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-xl">
                {/* Placeholder for mascot - you can replace with actual mascot image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-cyan-500 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-cyan-400 flex items-center justify-center">
                      <Image
                        src="/assets/heart-coin.png"
                        alt="Coin"
                        width={60}
                        height={60}
                        className="object-contain animate-pulse"
                      />
                    </div>
                  </div>
                  {/* Floating coins animation */}
                  <div className="absolute -top-2 -right-2">
                    <Image
                      src="/assets/heart-coin.png"
                      alt="Coin"
                      width={30}
                      height={30}
                      className="object-contain animate-bounce"
                    />
                  </div>
                  <div className="absolute -bottom-2 -left-2">
                    <Image
                      src="/assets/heart-coin.png"
                      alt="Coin"
                      width={30}
                      height={30}
                      className="object-contain animate-bounce delay-150"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
              <p className="text-2xl font-semibold text-foreground">Memuat...</p>
            </div>

            {/* Payment Details */}
            {amount && merchantName && (
              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">Pembayaran</p>
                <p className="text-xl font-bold text-foreground">{amount} Koin</p>
                <p className="text-sm text-muted-foreground">ke {merchantName}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Pay Button */}
        <Button
          onClick={onPay}
          size="lg"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-lg py-6"
        >
          BAYAR
        </Button>
      </div>
    </div>
  );
}
