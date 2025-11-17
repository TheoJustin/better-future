'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, ExternalLink } from 'lucide-react';

interface Transaction {
  tokenId: number;
  merchant: string;
  amount: string;
  timestamp: number;
  buyer: string;
  category?: string;
}

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openBlockExplorer = (address: string) => {
    window.open(`https://sepolia-blockscout.lisk.com/address/${address}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" style={{ zIndex: 9999, backgroundColor: '#FFFFFF' }}>
        <DialogHeader>
          <DialogTitle style={{ color: '#1A1A3E' }}>Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4 space-y-3" style={{ backgroundColor: '#F5F5F7' }}>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Receipt NFT ID</span>
              <span className="font-mono" style={{ color: '#1A1A3E' }}>#{transaction.tokenId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-semibold text-lg" style={{ color: '#1A1A3E' }}>{transaction.amount} IDR</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Category</span>
              <span className="px-2 py-1 text-sm rounded-full" style={{ backgroundColor: '#E3F2FD', color: '#1976D2' }}>
                {transaction.category || 'General'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Date</span>
              <span style={{ color: '#1A1A3E' }}>{new Date(transaction.timestamp).toLocaleString()}</span>
            </div>
          </Card>

          <Card className="p-4 space-y-3" style={{ backgroundColor: '#F5F5F7' }}>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Merchant Address</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm" style={{ color: '#1A1A3E' }}>{formatAddress(transaction.merchant)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transaction.merchant)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openBlockExplorer(transaction.merchant)}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Buyer Address</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm" style={{ color: '#1A1A3E' }}>{formatAddress(transaction.buyer)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transaction.buyer)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openBlockExplorer(transaction.buyer)}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>

          <Button onClick={onClose} className="w-full" style={{ backgroundColor: '#4DA6FF', color: '#FFFFFF' }}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}