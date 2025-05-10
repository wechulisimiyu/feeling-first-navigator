
import React from 'react';
import FirstAidResources from '@/components/first-aid/FirstAidResources';

const FirstAidPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Crisis Resources</h1>
        <p className="text-muted-foreground">
          If you need immediate support, please use one of these resources.
        </p>
      </div>
      <FirstAidResources />
    </div>
  );
};

export default FirstAidPage;
