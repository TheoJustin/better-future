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
  const [balance, setBalance] = useState<bigint>(0n);
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
      <Card className="p-4 bg-white border border-[#afafaf]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#1899d6]" />
            <div>
              <p className="text-sm text-[#4b4b4b]/70">IDR Balance</p>
              <p className="text-lg font-semibold text-[#4b4b4b]">{formatUnits(balance, 18)} IDR</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDepositModal(true)}
              className="text-[#1899d6] hover:text-[#1cb0f6] hover:bg-[#1899d6]/5"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadBalance}
              disabled={loading}
              className="text-[#1899d6] hover:text-[#1cb0f6] hover:bg-[#1899d6]/5"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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