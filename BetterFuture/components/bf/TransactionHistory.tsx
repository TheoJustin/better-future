'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Receipt, ExternalLink } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { getReceiptBalance, getReceiptTokenURI } from '@/lib/contract';
import TransactionDetailsModal from './TransactionDetailsModal';

interface Transaction {
  tokenId: number;
  merchant: string;
  amount: string;
  timestamp: number;
  buyer: string;
}

export default function TransactionHistory() {
  const { client, account } = useContract();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const loadTransactions = async () => {
    if (!client || !account) return;

    setLoading(true);
    try {
      const balance = await getReceiptBalance(client, account.address);
      const receiptCount = Number(balance);

      const transactionPromises = [];
      for (let i = 1; i <= receiptCount; i++) {
        transactionPromises.push(
          getReceiptTokenURI(client, BigInt(i)).then((uri) => {
            try {
              const data = JSON.parse(uri);
              return {
                tokenId: i,
                merchant: data.merchant,
                amount: data.amount,
                timestamp: data.timestamp,
                buyer: data.buyer,
              };
            } catch {
              return null;
            }
          })
        );
      }

      const results = await Promise.all(transactionPromises);
      const validTransactions = results.filter(Boolean) as Transaction[];

      validTransactions.sort((a, b) => b.timestamp - a.timestamp);

      setTransactions(validTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [client, account]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!client || !account) {
    return (
      <div
        className="flex items-center justify-center min-h-screen p-4"
        style={{ backgroundColor: '#F5F5F7' }}
      >
        <Card className="w-full max-w-md p-6 text-center">
          <p className="text-muted-foreground">
            Please connect your wallet to view transaction history
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: '#F5F5F7' }}
    >
      <Card className="w-full max-w-2xl" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: '#1A1A3E' }}>
              Transaction History
            </h1>
            <Button
              onClick={loadTransactions}
              disabled={loading}
              size="sm"
              style={{ backgroundColor: '#4DA6FF', color: '#FFFFFF' }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Refresh'
              )}
            </Button>
          </div>

          {loading && transactions.length === 0 ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <Card key={tx.tokenId} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Receipt
                          className="w-4 h-4"
                          style={{ color: '#4DA6FF' }}
                        />
                        <span
                          className="font-semibold"
                          style={{ color: '#1A1A3E' }}
                        >
                          Payment to {formatAddress(tx.merchant)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(tx.timestamp)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Receipt NFT #{tx.tokenId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-semibold text-lg"
                        style={{ color: '#1A1A3E' }}
                      >
                        {tx.amount} IDR
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTransaction(tx);
                          setShowDetailsModal(true);
                        }}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>

      <TransactionDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
}
