
import React from 'react';
import GAD7Form from '@/components/assessment/GAD7Form';

const GAD7Page: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Anxiety Assessment</h1>
        <p className="text-muted-foreground">
          This questionnaire will help assess your anxiety levels over the past two weeks.
        </p>
      </div>
      <GAD7Form />
    </div>
  );
};

export default GAD7Page;
