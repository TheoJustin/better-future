'use client'

import { useState, useRef } from 'react'
import { QRScannerFrame, QRISLogo } from './QRScannerFrame'
import { Loader2, Upload, CheckCircle2, AlertCircle } from 'lucide-react'
import jsQR from 'jsqr'

interface ExtractedData {
  address?: string
  amount?: string | number
  valid?: boolean
  error?: string
}

interface QRScannerAreaProps {
  onScanSuccess?: (data: ExtractedData) => void
  onPaymentInitiate?: (data: ExtractedData) => void
}

export function QRScannerArea({ onScanSuccess, onPaymentInitiate }: QRScannerAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      setSelectedImage(base64String)
      setError(null)
      setExtractedData(null)
    }
    reader.readAsDataURL(file)
  }

  const handleScanQR = async () => {
    if (!selectedImage) return

    setLoading(true)
    setError(null)

    try {
      // Create canvas and load image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      // Load image from base64
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = selectedImage
      })

      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)

      if (!imageData) {
        setError('Failed to process image')
        setLoading(false)
        return
      }

      // Scan QR code using jsQR
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (!code) {
        setError('No QR code found in image')
        setLoading(false)
        return
      }

      // Parse QR data via API route
      const response = await fetch('/api/scan-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrText: code.data }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to parse QR code')
        setLoading(false)
        return
      }

      setExtractedData(data)
      onScanSuccess?.(data)
    } catch (err) {
      setError('Error processing image. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const canSendETH =
    extractedData?.valid && extractedData?.address && extractedData?.amount

  return (
    <div className="absolute bg-[#4b4b4b] box-border flex flex-col gap-3 h-[730px] items-center justify-center left-1/2 p-2.5 top-[calc(50%+12px)] translate-x-[-50%] translate-y-[-50%] w-full">
      <div className="flex flex-col font-black justify-center leading-normal relative shrink-0 text-[36px] text-white tracking-[-0.72px] whitespace-nowrap mb-2">
        <p className="mb-0">Arahkan ke Kode Qris</p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Scanner Frame with Upload Area */}
      <div
        className="relative shrink-0 size-[328px] cursor-pointer"
        onClick={() => !selectedImage && fileInputRef.current?.click()}
      >
        {selectedImage ? (
          <div className="relative size-full">
            <img
              src={selectedImage}
              alt="Selected QR code"
              className="absolute inset-0 size-full object-cover rounded-lg"
            />
            <QRScannerFrame />
            {/* Overlay untuk scan button */}
            {!extractedData && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleScanQR()
                  }}
                  disabled={loading}
                  className="bg-[#1899d6] hover:bg-[#1cb0f6] text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    'Scan QR Code'
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <QRScannerFrame />
            {/* Upload overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
              <div className="flex flex-col items-center gap-2 text-white">
                <Upload className="w-12 h-12" />
                <span className="text-sm font-medium">Tap to upload QR code</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Results Display */}
      {extractedData && (
        <div className="w-full max-w-[328px] px-4">
          {extractedData.valid ? (
            <div className="flex gap-2 items-start p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-300 mb-1">
                  Valid QR code detected!
                </p>
                {canSendETH && (
                  <div className="text-xs text-white/80 space-y-1">
                    <p>
                      <span className="font-medium">Merchant:</span>{' '}
                      {extractedData.address?.slice(0, 10)}...
                    </p>
                    <p>
                      <span className="font-medium">Amount:</span>{' '}
                      {extractedData.amount} IDR
                    </p>
                    <button
                      onClick={() => extractedData && onPaymentInitiate?.(extractedData)}
                      className="w-full mt-2 bg-[#1899d6] hover:bg-[#1cb0f6] text-white px-4 py-2 rounded-lg font-bold text-sm"
                    >
                      Pay with IDR
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-start p-3 bg-amber-500/20 border border-amber-500/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-300">
                {extractedData.error || 'Could not extract complete data'}
              </p>
            </div>
          )}
          {/* Change image button */}
          <button
            onClick={() => {
              setSelectedImage(null)
              setExtractedData(null)
              if (fileInputRef.current) fileInputRef.current.value = ''
            }}
            className="w-full mt-2 text-white/80 hover:text-white text-sm underline"
          >
            Change Image
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="w-full max-w-[328px] px-4">
          <div className="flex gap-2 items-start p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      )}

      <div className="mt-2">
        <QRISLogo />
      </div>
    </div>
  )
}

