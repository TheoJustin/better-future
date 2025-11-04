'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { usePlants } from '@/hooks/usePlants';
import { usePlantStageScheduler } from '@/hooks/usePlantStageScheduler';
import BetterFutureHeader from '@/components/bf/BetterFutureHeader';
import QRCodeScanner from '@/components/bf/QR-CodeScanner';
import { Card } from '@/components/ui/card';
import QRGenerator from './qr-generate/page';

const tabs = [
  { id: 'qr-scanner', label: 'QR Scanner' },
  { id: 'qr-generate', label: 'QR Generator' },
  { id: 'menu', label: 'Menu' },
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'qr-scanner';
  
  const { plants } = usePlants();
  const { isRunning } = usePlantStageScheduler();

  const handleTabChange = (tabId: string) => {
    router.push(`/?tab=${tabId}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'qr-scanner':
        return <QRCodeScanner />;
      case 'qr-generate':
        return <QRGenerator />;
      case 'menu':
        return (
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-2xl font-bold mb-4">Menu</h2>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold">Transaction History</h3>
                  <p className="text-sm text-muted-foreground">View your payment history</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure your preferences</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold">About</h3>
                  <p className="text-sm text-muted-foreground">Learn more about BetterFuture</p>
                </div>
              </div>
            </Card>
          </div>
        );
      default:
        return <QRCodeScanner />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BetterFutureHeader 
        schedulerRunning={isRunning}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {renderTabContent()}
    </div>
  );
}
