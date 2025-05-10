
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface RecommendationCardProps {
  assessmentType: 'PHQ9' | 'GAD7' | 'PSQ';
  score: number;
  severityLevel: number;
  severityLabel: string;
  severityColor: string;
  recommendation: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  assessmentType,
  score,
  severityLevel,
  severityLabel,
  severityColor,
  recommendation
}) => {
  const getAssessmentName = () => {
    switch (assessmentType) {
      case 'PHQ9': return 'Depression (PHQ-9)';
      case 'GAD7': return 'Anxiety (GAD-7)';
      case 'PSQ': return 'Unusual Experiences (PSQ)';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{getAssessmentName()} Results</CardTitle>
        <CardDescription>Your assessment results and recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Your Score:</span>
          <span className="font-bold">{score}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">Severity:</span>
          <span className={`${severityColor} px-2 py-1 rounded text-sm font-medium`}>
            {severityLabel}
          </span>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Recommendation:</h3>
          <p className="text-gray-700">{recommendation}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to="/professionals">Find a Professional</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
