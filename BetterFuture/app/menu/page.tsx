'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListChecks, RefreshCw } from 'lucide-react';
import { useActiveAccount } from 'panna-sdk';
import { useCoinBalance } from '@/hooks/useCoinBalance';

const MenuPage = () => {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const { coinBalance, loading, refresh } = useCoinBalance();

  const displayName = activeAccount?.address
    ? `${activeAccount.address.slice(0, 4)}...${activeAccount.address.slice(-4)}`
    : 'Guest';

  const handleQRISClick = () => {
    router.push('/?tab=qr-scanner');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      {/* Main Content Container */}
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        {/* Greeting Card */}
        <Card className="bg-[#1899d6] text-white p-4 shadow-lg border border-[#1cb0f6]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">HAI {displayName.toUpperCase()}</h2>
              <p className="text-sm text-[#ddf4ff]">Tekan tombol disamping sebelum membeli</p>
            </div>

            <div className="w-1 h-8 bg-white mx-4"></div>

            <Button
              variant="secondary"
              size="icon"
              className="bg-white text-[#1899d6] hover:bg-[#ddf4ff] rounded-lg"
            >
              <ListChecks className="w-6 h-6" />
            </Button>
          </div>
        </Card>

        <Card className="w-full p-6 bg-white border border-[#afafaf]">
        {/* Koin Balance Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <h3 className="text-2xl font-bold text-[#4b4b4b]">
              Jumlah Koin {displayName}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={refresh}
              disabled={loading}
              className="h-8 w-8 text-[#1899d6] hover:text-[#1cb0f6] hover:bg-[#1899d6]/5"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* Coin Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer circle */}
              <div className="w-48 h-48 rounded-full bg-[#1899d6] flex items-center justify-center shadow-xl">
                {/* Middle circle */}
                <div className="w-40 h-40 rounded-full bg-[#1cb0f6] flex items-center justify-center">
                  {/* Inner circle with heart */}
                  <div className="w-32 h-32 rounded-full bg-[#ddf4ff] flex items-center justify-center">
                    {/* Heart Icon */}
              <Image
                src="/assets/heart-coin.png"
                alt="Heart Coin"
                width={60}
                height={60}
                className="object-contain"
              />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Koin Amount */}
          <div className="mb-8">
            {loading ? (
              <div className="flex justify-center">
                <div className="h-20 w-64 bg-[#afafaf]/20 rounded-lg animate-pulse"></div>
              </div>
            ) : (
              <p className="text-6xl font-bold text-[#4b4b4b]">
                {`${coinBalance} Koin`}
              </p>
            )}
          </div>
        </div>

        {/* QRIS Button */}
        <div className="flex justify-center">
          <div
            onClick={handleQRISClick}
            className="relative bg-[#1899d6] hover:bg-[#1cb0f6] p-2 rounded-2xl shadow-lg cursor-pointer transition-colors"
          >
            {/* White container for QRIS logo */}
            <div className="bg-white p-2 rounded-lg">
              <Image
                src="/assets/qr-code.png"
                alt="QRIS"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </div>
        </div>
        </Card>
      </div>
    </div>
  );
};

export default MenuPage;