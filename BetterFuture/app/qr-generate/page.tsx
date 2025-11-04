'use client';

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Download, Copy, Check } from 'lucide-react';

export default function QRGenerator() {
  const [inputValue, setInputValue] = useState(
    'ethereum:[PUBLIC_KEY]@4202?value=[PRICE]'
  );
  const [qrCode, setQrCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQR(inputValue);
  }, [inputValue]);

  const generateQR = async (text: string) => {
    if (!text.trim()) {
      setQrCode('');
      return;
    }
    try {
      const url = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCode(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qr-code-${Date.now()}.png`;
    link.click();
  };

  const handleCopy = async () => {
    if (!qrCode) return;

    try {
      const blob = await (await fetch(qrCode)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            QR Generator
          </h1>
          <p className="text-muted-foreground">
            Convert any text or URL into a QR code instantly
          </p>
        </div>

        {/* Input Card */}
        <Card className="p-6 border border-border bg-card">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Enter text or URL
              </label>
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ethereum:[PUBLIC_KEY]@4202?value=[PRICE]"
                className="w-full"
              />
            </div>

            {/* QR Code Preview */}
            {qrCode && (
              <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg border border-border">
                <img
                  src={qrCode || '/placeholder.svg'}
                  alt="QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleDownload}
                disabled={!qrCode}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleCopy}
                disabled={!qrCode}
                variant="outline"
                className="flex-1 bg-transparent"
                size="lg"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Secure • No data stored • Works offline</p>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
