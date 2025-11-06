'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useContract } from '@/hooks/useContract';
import { getIDRBalance, depositIDR, approveIDR, payMerchant } from '@/lib/contract';
import { formatUnits, parseUnits } from '@/lib/utils-web3';
import { PAYMENT_PROCESSOR_CONTRACT_ADDRESS } from '@/types/contracts';

export default function TestFlow() {
  const { client, account } = useContract();
  const [balance, setBalance] = useState<bigint>(0n);
  const [loading, setLoading] = useState(false);

  const checkBalance = async () => {
    if (!client || !account) return;
    const bal = await getIDRBalance(client, account.address);
    setBalance(bal);
  };

  const testDeposit = async () => {
    if (!client || !account) return;
    setLoading(true);
    try {
      await depositIDR(client, account, '0.001'); // 0.001 ETH = 1 IDR
      await checkBalance();
    } catch (err) {
      console.error('Deposit failed:', err);
    }
    setLoading(false);
  };

  const testPayment = async () => {
    if (!client || !account) return;
    setLoading(true);
    try {
      const amount = parseUnits('10', 18); // 10 IDR
      await approveIDR(client, account, PAYMENT_PROCESSOR_CONTRACT_ADDRESS!, amount);
      await payMerchant(client, account, '0x742d35Cc6634C0532925a3b8D4C9db96C4b5Da5e', amount, 'test receipt');
      await checkBalance();
    } catch (err) {
      console.error('Payment failed:', err);
    }
    setLoading(false);
  };

  if (!client || !account) return null;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold">Test Flow</h3>
      <p>Balance: {formatUnits(balance, 18)} IDR</p>
      <div className="flex gap-2">
        <Button onClick={checkBalance} size="sm">Check Balance</Button>
        <Button onClick={testDeposit} disabled={loading} size="sm">Test Deposit</Button>
        <Button onClick={testPayment} disabled={loading} size="sm">Test Payment</Button>
      </div>
    </Card>
  );
}