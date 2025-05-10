
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSeverityLevel, getSeverityInfo, getRecommendation } from '@/lib/assessment';
import RecommendationCard from '@/components/recommendation/RecommendationCard';
import { getCurrentUser, createSession, sendEmailToProfessional, getProfessionals } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Mood } from '@/lib/types';

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  
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
      
      // Map string mood values to Mood enum values
      let mood: Mood;
      if (assessmentType === 'PHQ9') {
        mood = Mood.LOW_MOOD;
      } else if (assessmentType === 'GAD7') {
        mood = Mood.ANXIOUS;
      } else {
        mood = Mood.UNUSUAL_THOUGHTS;
      }
      
      // Save the completed session
      createSession({
        user_id: currentUser.id,
        mood: mood,
        assessment_type: assessmentType,
        assessment_score: score,
        severity_level: severityLevel,
        recommendation,
        timestamp: new Date().toISOString(),
        responses,
      });
      
      // Check if score indicates a severe level
      const isSevere = (
        (assessmentType === 'PHQ9' && severityLevel >= 3) || // Moderately severe or Severe
        (assessmentType === 'GAD7' && severityLevel >= 2) || // Moderate or Severe anxiety
        (assessmentType === 'PSQ' && severityLevel >= 1)     // Medium or High risk
      );
      
      // If severe, send simulated email notification
      if (isSevere && !emailSent) {
        const professionals = getProfessionals();
        let matchedProfessional;
        
        // Match professional based on assessment type
        if (assessmentType === 'PHQ9') {
          // Find a clinical psychologist or psychiatrist
          matchedProfessional = professionals.find(p => 
            p.specialty.includes("Psychologist") || p.specialty.includes("Psychiatrist")
          );
        } else if (assessmentType === 'GAD7') {
          // Find an anxiety specialist if available, otherwise any counselor
          matchedProfessional = professionals.find(p => 
            p.specialty.includes("Counselor") || p.specialty.includes("Therapist")
          );
        } else {
          // For PSQ, prefer psychiatrist
          matchedProfessional = professionals.find(p => 
            p.specialty.includes("Psychiatrist") || p.specialty.includes("Neuropsychologist")
          );
        }
        
        // Default to first professional if no match found
        const professionalId = matchedProfessional?.id || professionals[0].id;
        
        const result = sendEmailToProfessional(
          professionalId,
          currentUser.username,
          assessmentType,
          score,
          severityLevel
        );
        
        if (result.success) {
          setEmailSent(true);
          toast({
            title: "Professional Notified",
            description: result.message,
            variant: "default",
          });
        } else {
          toast({
            title: "Notification Failed",
            description: result.message,
            variant: "destructive",
          });
        }
      }
    };
    
    saveSessionData();
    
  }, [state, navigate, toast, emailSent]);
  
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
        emailSent={emailSent}
      />
    </div>
  );
};

export default ResultPage;
