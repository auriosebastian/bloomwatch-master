// Local: src/components/analysis/tabs/OverviewTab/EnvironmentalScore.tsx
import React from 'react';
import { Zap } from 'lucide-react';

interface EnvironmentalScoreProps {
  score: { value: number; level: string };
}

const EnvironmentalScore = ({ score }: EnvironmentalScoreProps) => {
  const levelColors = {
    excellent: 'text-emerald-600 bg-emerald-50',
    good: 'text-green-600 bg-green-50',
    moderate: 'text-amber-600 bg-amber-50',
    poor: 'text-orange-600 bg-orange-50',
    critical: 'text-red-600 bg-red-50'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Score Ambiental</h3>
        <Zap className="w-5 h-5 text-amber-500" />
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-slate-800 mb-2">{score.value}/100</div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${levelColors[score.level as keyof typeof levelColors]}`}>
          {score.level.charAt(0).toUpperCase() + score.level.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalScore;