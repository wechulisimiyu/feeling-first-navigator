
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GAD7, GAD7_QUESTIONS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const GAD7Form: React.FC = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<number, GAD7>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleResponse = (value: GAD7) => {
    setResponses({
      ...responses,
      [currentQuestion]: value,
    });

    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = (): number => {
    return Object.values(responses).reduce((sum, value) => sum + value, 0);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    navigate('/result', { 
      state: { 
        assessmentType: 'GAD7',
        score,
        responses
      } 
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Anxiety Assessment (GAD-7)</CardTitle>
        <CardDescription>
          Over the past 2 weeks, how often have you been bothered by the following problems?
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isComplete ? (
          <div className="text-center">
            <p className="mb-4">Thank you for completing the assessment.</p>
            <Button onClick={handleSubmit}>View Results</Button>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-2">
              Question {currentQuestion + 1} of {GAD7_QUESTIONS.length}
            </h3>
            <p className="mb-4">{GAD7_QUESTIONS[currentQuestion]}</p>
            
            <RadioGroup
              value={responses[currentQuestion]?.toString() || ""}
              onValueChange={(value) => handleResponse(Number(value) as GAD7)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="not-at-all" />
                <Label htmlFor="not-at-all">Not at all</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="several-days" />
                <Label htmlFor="several-days">Several days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="more-than-half" />
                <Label htmlFor="more-than-half">More than half the days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="nearly-every-day" />
                <Label htmlFor="nearly-every-day">Nearly every day</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isComplete && (
          <>
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {GAD7_QUESTIONS.length}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default GAD7Form;
