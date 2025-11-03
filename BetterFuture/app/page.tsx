'use client';

import { useState } from 'react';
import { usePlants } from '@/hooks/usePlants';
import { usePlantStageScheduler } from '@/hooks/usePlantStageScheduler';
import BetterFutureHeader from '@/components/bf/BetterFutureHeader';
import QRCodeScanner from '@/components/bf/QR-CodeScanner';

export default function Home() {
  const [selectedPlantId, setSelectedPlantId] = useState<bigint | null>(null);
  const [showPlantSeedModal, setShowPlantSeedModal] = useState(false);
  const { plants } = usePlants();

  // Start background scheduler for automatic stage updates
  const { isRunning } = usePlantStageScheduler();
  const selectedPlant = plants.find((p) => p.id === selectedPlantId) || null;

  return (
    <div className="min-h-screen bg-background">
      <BetterFutureHeader schedulerRunning={isRunning} />

      <QRCodeScanner />
      
    </div>
  );
}
