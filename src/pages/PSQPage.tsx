
import React from 'react';
import PSQForm from '@/components/assessment/PSQForm';

const PSQPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Unusual Experiences Assessment</h1>
        <p className="text-muted-foreground">
          This questionnaire will help assess unusual experiences or thoughts you might be having.
        </p>
      </div>
      <PSQForm />
    </div>
  );
};

export default PSQPage;
