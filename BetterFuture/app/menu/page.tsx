'use client';

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListChecks, RefreshCw } from "lucide-react";
import { useActiveAccount } from "panna-sdk";
import { useCoinBalance } from "@/hooks/useCoinBalance";

const MenuPage = () => {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const isConnected = !!activeAccount;
  const hasRedirected = useRef(false);
  const { coinBalance, loading, refresh } = useCoinBalance();

  // Redirect to login if not connected
  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return;

    if (!isConnected) {
      hasRedirected.current = true;
      // Use window.location.replace to force redirect and prevent back navigation
      window.location.replace("/login");
    }
  }, [isConnected]);

  // Don't render if not connected
  if (!isConnected) {
    return null;
  }

  const displayName = activeAccount?.address
    ? `${activeAccount.address.slice(0, 4)}...${activeAccount.address.slice(
        -4
      )}`
    : "Guest";

  const handleQRISClick = () => {
    router.push("/?tab=qr-scanner");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Main Content Container */}
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        {/* Greeting Card */}
        <Card className="bg-cyan-500 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                HI {displayName.toUpperCase()}
              </h2>
            </div>

            <div className="w-1 h-8 bg-white mx-4"></div>

            <Button
              variant="secondary"
              size="icon"
              className="bg-white text-cyan-500 hover:bg-gray-100 rounded-lg"
            >
              <ListChecks className="w-6 h-6" />
            </Button>
          </div>
        </Card>

        <Card className="w-full p-6">
          {/* Koin Balance Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-8">
              <h3 className="text-2xl font-bold text-foreground">
                Jumlah Koin
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={refresh}
                disabled={loading}
                className="h-8 w-8"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>

            {/* Coin Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer circle */}
                <div className="w-48 h-48 rounded-full bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-xl">
                  {/* Middle circle */}
                  <div className="w-40 h-40 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                    {/* Inner circle with heart */}
                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center">
                      {/* Heart Icon */}
                      <Image
                        src="https://i.ibb.co.com/zWpxFgMk/heart-coin.png"
                        alt="Heart Coin"
                        width={60}
                        height={60}
                        className="object-contain"
                        loading="lazy"
                        priority={false}
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
                  <div className="h-20 w-64 bg-muted rounded-lg animate-pulse"></div>
                </div>
              ) : (
                <p className="text-6xl font-bold text-foreground">
                  {`${coinBalance} Koin`}
                </p>
              )}
            </div>
          </div>

          {/* QRIS Button */}
          <div className="flex justify-center">
            <div
              onClick={handleQRISClick}
              className="relative bg-cyan-500 hover:bg-cyan-600 p-2 rounded-2xl shadow-lg cursor-pointer transition-colors"
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