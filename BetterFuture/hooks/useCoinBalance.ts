'use client';

import { useState, useEffect } from 'react';
import { useContract } from '@/hooks/useContract';
import { liskSepolia } from 'panna-sdk';
import { getWalletBalance } from 'thirdweb/wallets';
import { formatUnits } from '@/lib/utils-web3';

export function useCoinBalance() {
  const { client, account } = useContract();
  const [balance, setBalance] = useState<bigint>(0n);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadBalance = async (isRefresh = false) => {
    if (!client || !account) {
      setBalance(0n);
      setLoading(false);
      return;
    }

    // Show loading on initial load or manual refresh
    if (!hasLoaded || isRefresh) {
      setLoading(true);
    }

    setError(null);
    try {
      // Get ETH balance from wallet
      const ethBalance = await getWalletBalance({
        address: account.address,
        client: client,
        chain: liskSepolia,
      });
      setBalance(ethBalance.value);
      setHasLoaded(true);
    } catch (err) {
      console.error('Error loading balance:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, [client, account]);

  // Format balance for display (convert from wei to readable format)
  const formattedBalance = formatUnits(balance, 18);

  // Convert to number for coin display (keep 4 decimal places for accuracy)
  const coinBalance = parseFloat(Number(formattedBalance).toFixed(4));

  const refresh = () => loadBalance(true);

  return {
    balance,
    formattedBalance,
    coinBalance,
    loading,
    error,
    refresh,
  };
}
