
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface RecommendationCardProps {
  assessmentType: 'PHQ9' | 'GAD7' | 'PSQ';
  score: number;
  severityLevel: number;
  severityLabel: string;
  severityColor: string;
  recommendation: string;
  emailSent?: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  assessmentType,
  score,
  severityLevel,
  severityLabel,
  severityColor,
  recommendation,
  emailSent = false
}) => {
  const getAssessmentName = () => {
    switch (assessmentType) {
      case 'PHQ9': return 'Depression (PHQ-9)';
      case 'GAD7': return 'Anxiety (GAD-7)';
      case 'PSQ': return 'Unusual Experiences (PSQ)';
    }
  };

  // Determine if score is considered severe
  const isSevere = (
    (assessmentType === 'PHQ9' && severityLevel >= 3) || // Moderately severe or Severe
    (assessmentType === 'GAD7' && severityLevel >= 2) || // Moderate or Severe anxiety
    (assessmentType === 'PSQ' && severityLevel >= 1)     // Medium or High risk
  );

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
        
        {isSevere && (
          <div className={`p-3 rounded-md ${emailSent ? 'bg-blue-50' : 'bg-amber-50'} mt-2`}>
            <div className="flex items-start gap-2">
              <AlertCircle className={`h-5 w-5 mt-0.5 ${emailSent ? 'text-blue-500' : 'text-amber-500'}`} />
              <div>
                <h4 className="font-medium text-sm">
                  {emailSent 
                    ? 'Professional Notification Sent' 
                    : 'Immediate Professional Assistance Recommended'}
                </h4>
                <p className="text-xs mt-1">
                  {emailSent 
                    ? 'Based on your score, a mental health professional has been notified and may reach out to you.' 
                    : 'Based on your score, we strongly recommend immediate consultation with a mental health professional.'}
                </p>
              </div>
            </div>
          </div>
        )}
        
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
