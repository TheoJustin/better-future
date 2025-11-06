'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { parseUnits } from '@/lib/utils-web3';
import { depositIDR } from '@/lib/contract';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DepositModal({ isOpen, onClose, onSuccess }: DepositModalProps) {
  const { client, account } = useContract();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeposit = async () => {
    if (!client || !account || !amount) return;

    setLoading(true);
    setError(null);

    try {
      // Convert IDR amount to ETH (assuming 1 ETH = 1000 IDR)
      const ethAmount = (parseFloat(amount) / 1000).toString();
      
      await depositIDR(client, account, ethAmount);
      
      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    setSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit IDR</DialogTitle>
        </DialogHeader>

        {!success ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Exchange Rate:</strong> 1 ETH = 1000 IDR
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (IDR)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
              />
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>ETH Required:</strong> {amount ? (parseFloat(amount) / 1000).toFixed(4) : '0'} ETH</p>
              <p><strong>IDR Received:</strong> {amount || '0'} IDR</p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-2">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleDeposit} 
                disabled={!amount || loading || !client}
                className="flex-1"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Deposit ETH'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
            <p>Deposit request submitted!</p>
            <p className="text-sm text-muted-foreground">
              Successfully deposited {amount ? (parseFloat(amount) / 1000).toFixed(4) : '0'} ETH for {amount} IDR!
            </p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}