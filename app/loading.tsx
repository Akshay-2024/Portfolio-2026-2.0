import React from 'react';
import { CoreSpinLoader } from '@/components/ui/core-spin-loader';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0B0E] text-white">
      <CoreSpinLoader />
    </div>
  );
}
