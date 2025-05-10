
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PSQ, PSQ_QUESTIONS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const PSQForm: React.FC = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<number, PSQ>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleResponse = (value: PSQ) => {
    setResponses({
      ...responses,
      [currentQuestion]: value,
    });

    if (currentQuestion < PSQ_QUESTIONS.length - 1) {
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
        assessmentType: 'PSQ',
        score,
        responses
      } 
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Unusual Experiences Assessment (PSQ)</CardTitle>
        <CardDescription>
          How often have you had the following experiences?
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
              Question {currentQuestion + 1} of {PSQ_QUESTIONS.length}
            </h3>
            <p className="mb-4">{PSQ_QUESTIONS[currentQuestion]}</p>
            
            <RadioGroup
              value={responses[currentQuestion]?.toString() || ""}
              onValueChange={(value) => handleResponse(Number(value) as PSQ)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="never" />
                <Label htmlFor="never">Never</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="sometimes" />
                <Label htmlFor="sometimes">Sometimes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="often" />
                <Label htmlFor="often">Often</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="always" />
                <Label htmlFor="always">Always</Label>
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
              {currentQuestion + 1} / {PSQ_QUESTIONS.length}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PSQForm;
