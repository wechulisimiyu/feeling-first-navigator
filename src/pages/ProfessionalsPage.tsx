
import React, { useEffect, useState } from 'react';
import ProfessionalList from '@/components/recommendation/ProfessionalList';
import { getProfessionals } from '@/lib/storage';
import { Professional } from '@/lib/types';

const ProfessionalsPage: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const data = getProfessionals();
        setProfessionals(data);
      } catch (error) {
        console.error("Error loading professionals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfessionals();
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8 px-4">
      <ProfessionalList professionals={professionals} />
    </div>
  );
};

export default ProfessionalsPage;
