
import {
  PHQ9_RANGES,
  GAD7_RANGES,
  PSQ_RANGES,
  PHQ9_SEVERITY,
  GAD7_SEVERITY,
  PSQ_SEVERITY,
  RECOMMENDATIONS
} from './types';

type AssessmentType = 'PHQ9' | 'GAD7' | 'PSQ';

export const getSeverityLevel = (
  assessmentType: AssessmentType,
  score: number
): number => {
  let ranges;

  switch (assessmentType) {
    case 'PHQ9':
      ranges = PHQ9_RANGES;
      break;
    case 'GAD7':
      ranges = GAD7_RANGES;
      break;
    case 'PSQ':
      ranges = PSQ_RANGES;
      break;
    default:
      throw new Error(`Unknown assessment type: ${assessmentType}`);
  }

  const range = ranges.find(r => score >= r.min && score <= r.max);
  return range ? range.level : 0;
};

export const getSeverityInfo = (
  assessmentType: AssessmentType,
  severityLevel: number
): { label: string; color: string } => {
  let severityMap;

  switch (assessmentType) {
    case 'PHQ9':
      severityMap = PHQ9_SEVERITY;
      break;
    case 'GAD7':
      severityMap = GAD7_SEVERITY;
      break;
    case 'PSQ':
      severityMap = PSQ_SEVERITY;
      break;
    default:
      throw new Error(`Unknown assessment type: ${assessmentType}`);
  }

  return severityMap[severityLevel as keyof typeof severityMap] || { 
    label: 'Unknown', 
    color: 'bg-gray-100 text-gray-800' 
  };
};

export const getRecommendation = (
  assessmentType: AssessmentType,
  severityLevel: number
): string => {
  const recommendationMap = RECOMMENDATIONS[assessmentType as keyof typeof RECOMMENDATIONS];
  return recommendationMap[severityLevel as keyof typeof recommendationMap] || 
    'Please consult with a healthcare professional for personalized advice.';
};
