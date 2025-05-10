
import React, { useState } from 'react';
import { SELF_CARE_TIPS, SelfCareTip } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SelfCareTips: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Get all unique tags
  const allTags = Array.from(new Set(SELF_CARE_TIPS.flatMap(tip => tip.tags)));
  
  // Filter tips based on selected tags
  const filteredTips = SELF_CARE_TIPS.filter(tip => 
    selectedTags.length === 0 || 
    tip.tags.some(tag => selectedTags.includes(tag))
  );
  
  const currentTip: SelfCareTip | undefined = filteredTips[currentTipIndex];
  
  const handleNextTip = () => {
    setCurrentTipIndex((prevIndex) => 
      prevIndex < filteredTips.length - 1 ? prevIndex + 1 : 0
    );
  };
  
  const handlePrevTip = () => {
    setCurrentTipIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : filteredTips.length - 1
    );
  };
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentTipIndex(0); // Reset to first tip when filter changes
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Filter by tags:</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {filteredTips.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{currentTip?.title}</CardTitle>
            <CardDescription>
              Self-care tip {currentTipIndex + 1} of {filteredTips.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{currentTip?.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {currentTip?.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevTip}>
              Previous
            </Button>
            <Button variant="outline" onClick={handleNextTip}>
              Next
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p>No tips match the selected filters.</p>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-4 text-center">
        <Button asChild variant="ghost">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default SelfCareTips;
