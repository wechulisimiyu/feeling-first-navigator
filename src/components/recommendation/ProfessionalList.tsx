
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Professional } from '@/lib/types';
import { Link } from 'react-router-dom';

interface ProfessionalListProps {
  professionals: Professional[];
}

const ProfessionalList: React.FC<ProfessionalListProps> = ({ professionals }) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">Find a Professional</h2>
      
      {professionals.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p>No professionals found.</p>
          </CardContent>
        </Card>
      ) : (
        professionals.map((professional) => (
          <Card key={professional.id}>
            <CardHeader className="pb-2">
              <CardTitle>{professional.name}</CardTitle>
              <CardDescription>{professional.specialty}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div>
                <span className="font-medium">Location:</span> {professional.location}
              </div>
              <div>
                <span className="font-medium">Contact:</span> {professional.contact}
              </div>
            </CardContent>
          </Card>
        ))
      )}
      
      <Button asChild variant="outline" className="w-full">
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default ProfessionalList;
