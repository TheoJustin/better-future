'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Loader2, Upload, CheckCircle2 } from 'lucide-react';

interface ExtractedData {
  address?: string;
  amount?: string | number;
  valid?: boolean;
  error?: string;
}

export default function QRCodeScanner() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

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
      const response = await fetch('/api/scan-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: selectedImage }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to scan QR code');
        return;
      }

      setExtractedData(data);
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const canSendETH =
    extractedData?.valid && extractedData?.address && extractedData?.amount;

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              QR Code Scanner
            </h1>
            <p className="text-muted-foreground">
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
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-border">
                <img
                  src={selectedImage || '/placeholder.svg'}
                  alt="Selected QR code"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square rounded-lg border-2 border-dashed border-border bg-card hover:bg-secondary transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
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
                className="w-full"
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
            className="w-full"
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
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-2">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Results Section */}
          {extractedData && (
            <div className="space-y-3 pt-3 border-t border-border">
              <div className="space-y-2">
                {extractedData.valid ? (
                  <div className="flex gap-2 items-start p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      Valid QR code detected!
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2 items-start p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {extractedData.error || 'Could not extract complete data'}
                    </p>
                  </div>
                )}
              </div>

              {/* JSON Output */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Extracted Data (JSON):
                </label>
                <pre className="p-3 bg-card border border-border rounded-lg text-xs overflow-auto max-h-40 text-foreground">
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

              {/* ETH Transfer Info */}
              {canSendETH && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    Ready to send ETH:
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>
                      <span className="font-medium">Address:</span>{' '}
                      {extractedData.address}
                    </p>
                    <p>
                      <span className="font-medium">Amount:</span>{' '}
                      {extractedData.amount} ETH
                    </p>
                  </div>
                  <Button
                    className="w-full mt-2"
                    onClick={() => {
                      // Here you would trigger the ETH transfer
                      console.log(
                        'Send ETH to:',
                        extractedData.address,
                        extractedData.amount
                      );
                    }}
                  >
                    Send ETH
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </main>
  );
}
