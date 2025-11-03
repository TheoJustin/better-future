'use client';

import { useState } from 'react';
import GardenHeader from '@/components/garden/garden-header';
import GardenGrid from '@/components/garden/garden-grid';
import StatsSidebar from '@/components/garden/stats-sidebar';
import PlantDetailsModal from '@/components/garden/plant-details-modal';
import PlantSeedModal from '@/components/garden/plant-seed-modal';
import { usePlants } from '@/hooks/usePlants';
import { usePlantStageScheduler } from '@/hooks/usePlantStageScheduler';

export default function Home() {
  const [selectedPlantId, setSelectedPlantId] = useState<bigint | null>(null);
  const [showPlantSeedModal, setShowPlantSeedModal] = useState(false);
  const { plants } = usePlants();

  // Start background scheduler for automatic stage updates
  const { isRunning } = usePlantStageScheduler();

  const selectedPlant = plants.find((p) => p.id === selectedPlantId) || null;

  return (
    <div className="min-h-screen bg-background">
      <GardenHeader schedulerRunning={isRunning} />
      
    </div>
  );
}
