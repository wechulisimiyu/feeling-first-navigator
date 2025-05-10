
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mood } from '@/lib/types';
import { getCurrentUser, createSession } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

const MoodSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  const handleMoodSelection = (mood: Mood) => {
    if (!currentUser) {
      toast({
        title: "Not signed in",
        description: "Please create an account to continue.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    // Create a new session with just the mood for now
    createSession({
      user_id: currentUser.id,
      mood,
      timestamp: new Date().toISOString(),
    });

    // Navigate based on the selected mood
    switch (mood) {
      case Mood.OKAY:
        navigate('/self-care');
        break;
      case Mood.NOT_OKAY:
        navigate('/first-aid');
        break;
      case Mood.LOW_MOOD:
        navigate('/phq9');
        break;
      case Mood.ANXIOUS:
        navigate('/gad7');
        break;
      case Mood.UNUSUAL_THOUGHTS:
        navigate('/psq');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">How are you feeling today?</CardTitle>
          <CardDescription>
            Select the option that best describes how you're feeling right now.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full py-6 text-base justify-start"
            onClick={() => handleMoodSelection(Mood.OKAY)}
          >
            I'm okay - just looking for self-care tips
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-base justify-start"
            onClick={() => handleMoodSelection(Mood.NOT_OKAY)}
          >
            I'm not okay - I need help now
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-base justify-start"
            onClick={() => handleMoodSelection(Mood.LOW_MOOD)}
          >
            I've been feeling low or down lately
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-base justify-start"
            onClick={() => handleMoodSelection(Mood.ANXIOUS)}
          >
            I've been feeling worried or anxious
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-base justify-start"
            onClick={() => handleMoodSelection(Mood.UNUSUAL_THOUGHTS)}
          >
            I've been having unusual thoughts or experiences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodSelectionPage;
