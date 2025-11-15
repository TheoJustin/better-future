'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, RefreshCw, Plus } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { getIDRBalance } from '@/lib/contract';
import { formatUnits } from '@/lib/utils-web3';
import DepositModal from './DepositModal';

export default function BalanceDisplay() {
  const { client, account } = useContract();
  const [balance, setBalance] = useState<bigint>(BigInt(0));
  const [loading, setLoading] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const loadBalance = async () => {
    if (!client || !account) return;

    setLoading(true);
    try {
      const userBalance = await getIDRBalance(client, account.address);
      setBalance(userBalance);
    } catch (error) {
      console.error('Error loading balance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, [client, account]);

  if (!client || !account) {
    return null;
  }

  return (
    <>
      <Card className="p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <div className="text-black">
              <p className="text-sm text-black">IDR Balance</p>
              <p className="text-lg font-semibold text-black">
                {formatUnits(balance, 18)} IDR
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDepositModal(true)}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadBalance}
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              />
            </Button>
          </div>
        </div>
      </Card>

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onSuccess={loadBalance}
      />
    </>
  );
}