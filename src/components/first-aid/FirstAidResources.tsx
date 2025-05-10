
import React from 'react';
import { FIRST_AID_RESOURCES } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FirstAidResources: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Crisis Resources</h2>
      <p className="text-center mb-6">
        If you're in crisis or need immediate support, please reach out to one of these resources.
      </p>
      
      <div className="space-y-4">
        {FIRST_AID_RESOURCES.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {resource.contactInfo && (
                  <p className="font-medium">{resource.contactInfo}</p>
                )}
                {resource.website && (
                  <a 
                    href={resource.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button asChild variant="ghost">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default FirstAidResources;
