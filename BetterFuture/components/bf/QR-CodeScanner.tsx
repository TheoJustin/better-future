'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Loader2, Upload, CheckCircle2 } from 'lucide-react';
import { useActiveAccount } from 'panna-sdk';
import PaymentModal from './PaymentModal';
import BalanceDisplay from './BalanceDisplay';
import PaymentLoading from './PaymentLoading';
import PaymentSuccess from './PaymentSuccess';
import jsQR from 'jsqr';

interface ExtractedData {
  address?: string;
  amount?: string | number;
  valid?: boolean;
  error?: string;
}

export default function QRCodeScanner() {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentLoading, setShowPaymentLoading] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setSelectedImage(base64String);
      setError(null);
      setExtractedData(null);
    };
    reader.readAsDataURL(file);
  };

  const handleScanQR = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      // Create canvas and load image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = selectedImage;
      });
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      
      if (!imageData) {
        setError('Failed to process image');
        return;
      }
      
      // Scan QR code
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (!code) {
        setError('No QR code found in image');
        return;
      }
      
      // Parse QR data via API
      const response = await fetch('/api/scan-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrText: code.data }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to parse QR code');
        return;
      }
      
      setExtractedData(data);
    } catch (err) {
      console.error('QR scan error:', err);
      setError('Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canSendETH =
    extractedData?.valid && extractedData?.address && extractedData?.amount;

  const displayName = activeAccount?.address
    ? `${activeAccount.address.slice(0, 4)}...${activeAccount.address.slice(-4)}`
    : 'User';

  const handleInitiatePayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async () => {
    setPaymentProcessing(true);
    // Here you would call the actual payment function
    // For now, we'll simulate a payment process
    setTimeout(() => {
      setShowPaymentLoading(false);
      setShowPaymentSuccess(true);
      setPaymentProcessing(false);
    }, 2000);
  };

  const handleBackToHome = () => {
    setShowPaymentSuccess(false);
    router.push('/menu');
  };

  // Show payment loading screen
  if (showPaymentLoading) {
    return (
      <PaymentLoading
        onPay={handlePaymentConfirm}
        amount={extractedData?.amount?.toString()}
        merchantName={extractedData?.address ? `${extractedData.address.slice(0, 6)}...` : undefined}
      />
    );
  }

  // Show payment success screen
  if (showPaymentSuccess) {
    return (
      <PaymentSuccess
        onBackToHome={handleBackToHome}
        userName={displayName}
        merchantName={extractedData?.address ? `${extractedData.address.slice(0, 6)}...` : 'Merchant'}
        amount={extractedData?.amount?.toString()}
      />
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        <BalanceDisplay />
        <Card className="w-full bg-white border border-[#afafaf]">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#4b4b4b] mb-2">
              QR Code Scanner
            </h1>
            <p className="text-[#4b4b4b]/70">
              Upload an image to scan for QR codes and extract address & amount
            </p>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-[#afafaf]">
                <img
                  src={selectedImage || '/placeholder.svg'}
                  alt="Selected QR code"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square rounded-lg border-2 border-dashed border-[#afafaf] bg-white hover:bg-[#1899d6]/5 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-8 h-8 text-[#4b4b4b]/70" />
                <span className="text-sm font-medium text-[#4b4b4b]/70">
                  Click to upload image
                </span>
              </button>
            )}

            {selectedImage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedImage(null);
                  setExtractedData(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="w-full border-[#afafaf] text-[#4b4b4b] hover:bg-[#1899d6]/5"
              >
                Change Image
              </Button>
            )}
          </div>

          {/* Scan Button */}
          <Button
            onClick={handleScanQR}
            disabled={!selectedImage || loading}
            size="lg"
            className="w-full bg-[#1899d6] hover:bg-[#1cb0f6] text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              'Scan QR Code'
            )}
          </Button>

          {/* Error State */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Results Section */}
          {extractedData && (
            <div className="space-y-3 pt-3 border-t border-[#afafaf]">
              <div className="space-y-2">
                {extractedData.valid ? (
                  <div className="flex gap-2 items-start p-2 bg-green-500/10 rounded-lg border border-green-500/50">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-green-700">
                      Valid QR code detected!
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2 items-start p-2 bg-amber-500/10 rounded-lg border border-amber-500/50">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700">
                      {extractedData.error || 'Could not extract complete data'}
                    </p>
                  </div>
                )}
              </div>

              {/* JSON Output */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#4b4b4b]">
                  Extracted Data (JSON):
                </label>
                <pre className="p-3 bg-white border border-[#afafaf] rounded-lg text-xs overflow-auto max-h-40 text-[#4b4b4b]">
                  {JSON.stringify(
                    {
                      address: extractedData.address || null,
                      amount: extractedData.amount || null,
                      valid: extractedData.valid,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>

              {/* IDR Payment Info */}
              {canSendETH && (
                <div className="p-3 bg-[#1899d6]/10 border border-[#1899d6]/20 rounded-lg space-y-2">
                  <p className="text-sm font-semibold text-[#4b4b4b]">
                    Ready to send IDR:
                  </p>
                  <div className="space-y-1 text-xs text-[#4b4b4b]/70">
                    <p>
                      <span className="font-medium">Merchant:</span>{' '}
                      {extractedData.address}
                    </p>
                    <p>
                      <span className="font-medium">Amount:</span>{' '}
                      {extractedData.amount} IDR
                    </p>
                  </div>
                  <Button
                    className="w-full mt-2 bg-[#1899d6] hover:bg-[#1cb0f6] text-white"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    Pay with IDR
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        </Card>
        
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          merchantAddress={extractedData?.address}
          amount={extractedData?.amount?.toString()}
        />
      </div>
    </main>
  );
}
