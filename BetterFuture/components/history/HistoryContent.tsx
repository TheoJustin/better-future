'use client'

import { useState, useEffect } from 'react'
import { useContract } from '@/hooks/useContract'
import { getReceiptBalance, getReceiptTokenURI } from '@/lib/contract'
import { TransactionCard } from './TransactionCard'

interface Transaction {
  tokenId: number
  merchant: string
  amount: string
  timestamp: number
  buyer: string
}

export function HistoryContent() {
  const { client, account } = useContract()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)

  const loadTransactions = async () => {
    if (!client || !account) return

    setLoading(true)
    try {
      const balance = await getReceiptBalance(client, account.address)
      const receiptCount = Number(balance)

      const transactionPromises = []
      for (let i = 1; i <= receiptCount; i++) {
        transactionPromises.push(
          getReceiptTokenURI(client, BigInt(i))
            .then((uri) => {
              try {
                const data = JSON.parse(uri)
                return {
                  tokenId: i,
                  merchant: data.merchant,
                  amount: data.amount,
                  timestamp: data.timestamp,
                  buyer: data.buyer,
                }
              } catch {
                return null
              }
            })
            .catch(() => null),
        )
      }

      const results = await Promise.all(transactionPromises)
      const validTransactions = results.filter(Boolean) as Transaction[]

      // Sort by timestamp (newest first)
      validTransactions.sort((a, b) => b.timestamp - a.timestamp)

      setTransactions(validTransactions)
    } catch (error) {
      console.error('Error loading transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTransactions()
  }, [client, account])

  const formatAddress = (address: string) => {
    if (!address) return 'xxxxx'
    // Format lebih ringkas: 0x1234...5678
    if (address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
    return address
  }

  const formatDate = (timestamp: number) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    // Format: DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const formatAmount = (amount: string) => {
    // Format amount with thousand separators (e.g., 200000 -> 200.000)
    const num = parseFloat(amount)
    if (isNaN(num)) return amount
    return num.toLocaleString('id-ID', { maximumFractionDigits: 0 })
  }

  if (!client || !account) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Silakan hubungkan wallet untuk melihat riwayat transaksi</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-9 items-center w-full">
      {/* Title */}
      <div className="flex flex-col font-black justify-center leading-[100%] relative shrink-0 text-[32px] text-black tracking-[-0.64px] whitespace-nowrap">
        <p className="leading-normal">Riwayat Transaksi Kamu</p>
      </div>

      {/* Transactions List */}
      <div className="flex flex-col gap-3 items-center justify-center relative shrink-0 w-full max-w-[398px]">
        {loading && transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Memuat transaksi...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Tidak ada transaksi ditemukan</p>
          </div>
        ) : (
          transactions.map((tx) => (
            <TransactionCard
              key={tx.tokenId}
              amount={formatAmount(tx.amount)}
              from={formatAddress(tx.buyer)}
              to={formatAddress(tx.merchant)}
              date={formatDate(tx.timestamp)}
              nftId={tx.tokenId}
            />
          ))
        )}
      </div>
    </div>
  )
}

