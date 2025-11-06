'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { 
  getIDRBalance, 
  approveIDR, 
  payMerchant, 
  getPlatformFee,
  calculatePlatformFee,
  calculateMerchantAmount 
} from '@/lib/contract';
import { PAYMENT_PROCESSOR_CONTRACT_ADDRESS } from '@/types/contracts';
import { formatUnits, parseUnits } from '@/lib/utils-web3';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantAddress?: string;
  amount?: string;
}

export default function PaymentModal({ isOpen, onClose, merchantAddress = '', amount = '' }: PaymentModalProps) {
  const { client, account } = useContract();
  const [merchant, setMerchant] = useState(merchantAddress);
  const [paymentAmount, setPaymentAmount] = useState(amount);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'confirm' | 'processing' | 'success' | 'error'>('input');
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<bigint>(0n);
  const [platformFeeBps, setPlatformFeeBps] = useState<bigint>(0n);
  const [txHash, setTxHash] = useState<string>('');

  const loadData = async () => {
    if (!client || !account) return;
    
    try {
      const [userBalance, feeBps] = await Promise.all([
        getIDRBalance(client, account.address),
        getPlatformFee(client)
      ]);
      
      setBalance(userBalance);
      setPlatformFeeBps(feeBps);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleConfirm = async () => {
    if (!client || !account || !merchant || !paymentAmount) return;

    setLoading(true);
    setStep('processing');
    setError(null);

    try {
      const amountWei = parseUnits(paymentAmount, 18);
      
      // Check balance
      if (balance < amountWei) {
        throw new Error('Insufficient IDR balance');
      }

      // Step 1: Approve payment processor to spend IDR
      await approveIDR(client, account, PAYMENT_PROCESSOR_CONTRACT_ADDRESS!, amountWei);

      // Step 2: Make payment
      const receiptURI = JSON.stringify({
        merchant,
        amount: paymentAmount,
        timestamp: Date.now(),
        buyer: account.address
      });

      const result = await payMerchant(client, account, merchant, amountWei, receiptURI);
      setTxHash(result.transactionHash);
      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('input');
    setError(null);
    setTxHash('');
    onClose();
  };

  const amountWei = paymentAmount ? parseUnits(paymentAmount, 18) : 0n;
  const platformFee = calculatePlatformFee(amountWei, platformFeeBps);
  const merchantAmount = calculateMerchantAmount(amountWei, platformFeeBps);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>IDR Payment</DialogTitle>
        </DialogHeader>

        {step === 'input' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merchant">Merchant Address</Label>
              <Input
                id="merchant"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="0x..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (IDR)</Label>
              <Input
                id="amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            {client && account && (
              <div className="text-sm text-muted-foreground">
                Balance: {formatUnits(balance, 18)} IDR
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  loadData();
                  setStep('confirm');
                }} 
                disabled={!merchant || !paymentAmount || !client || !account}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-4">
            <Card className="p-4 space-y-2">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>{paymentAmount} IDR</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee:</span>
                <span>{formatUnits(platformFee, 18)} IDR</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Merchant Receives:</span>
                <span>{formatUnits(merchantAmount, 18)} IDR</span>
              </div>
            </Card>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('input')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleConfirm} disabled={loading} className="flex-1">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay Now'}
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto" />
            <p>Processing payment...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
            <p>Payment successful!</p>
            {txHash && (
              <p className="text-xs text-muted-foreground break-all">
                Transaction: {txHash}
              </p>
            )}
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-red-500">{error}</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('input')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleConfirm} className="flex-1">
                Retry
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}