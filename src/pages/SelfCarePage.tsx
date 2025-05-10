
import React from 'react';
import SelfCareTips from '@/components/self-care/SelfCareTips';

const SelfCarePage: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Self-Care Tips</h1>
        <p className="text-muted-foreground">
          Browse through these tips to support your mental wellbeing.
        </p>
      </div>
      <SelfCareTips />
    </div>
  );
};

export default SelfCarePage;
