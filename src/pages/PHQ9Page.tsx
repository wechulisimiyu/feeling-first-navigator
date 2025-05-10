
import React from 'react';
import PHQ9Form from '@/components/assessment/PHQ9Form';

const PHQ9Page: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Depression Assessment</h1>
        <p className="text-muted-foreground">
          This questionnaire will help assess how you've been feeling over the past two weeks.
        </p>
      </div>
      <PHQ9Form />
    </div>
  );
};

export default PHQ9Page;
