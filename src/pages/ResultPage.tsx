
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSeverityLevel, getSeverityInfo, getRecommendation } from '@/lib/assessment';
import RecommendationCard from '@/components/recommendation/RecommendationCard';
import { getCurrentUser, createSession } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const state = location.state as {
    assessmentType: 'PHQ9' | 'GAD7' | 'PSQ';
    score: number;
    responses: Record<string, number>;
  };
  
  useEffect(() => {
    // If there's no state data, redirect to home
    if (!state?.assessmentType || state?.score === undefined) {
      toast({
        title: "Error",
        description: "No assessment data found. Please try again.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    const saveSessionData = async () => {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        toast({
          title: "Not signed in",
          description: "Please create an account to save your results.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      const { assessmentType, score, responses } = state;
      const severityLevel = getSeverityLevel(assessmentType, score);
      const recommendation = getRecommendation(assessmentType, severityLevel);
      
      // Save the completed session
      createSession({
        user_id: currentUser.id,
        mood: assessmentType === 'PHQ9' 
          ? 'low_mood' 
          : assessmentType === 'GAD7' 
            ? 'anxious' 
            : 'unusual_thoughts',
        assessment_type: assessmentType,
        assessment_score: score,
        severity_level: severityLevel,
        recommendation,
        timestamp: new Date().toISOString(),
        responses,
      });
    };
    
    saveSessionData();
    
  }, [state, navigate, toast]);
  
  if (!state?.assessmentType || state?.score === undefined) {
    return <div>Loading...</div>;
  }
  
  const { assessmentType, score } = state;
  const severityLevel = getSeverityLevel(assessmentType, score);
  const { label: severityLabel, color: severityColor } = getSeverityInfo(assessmentType, severityLevel);
  const recommendation = getRecommendation(assessmentType, severityLevel);
  
  return (
    <div className="min-h-screen py-8 px-4">
      <RecommendationCard
        assessmentType={assessmentType}
        score={score}
        severityLevel={severityLevel}
        severityLabel={severityLabel}
        severityColor={severityColor}
        recommendation={recommendation}
      />
    </div>
  );
};

export default ResultPage;
