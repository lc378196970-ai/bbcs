import { useState } from 'react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: {
    id: number;
    text: string;
  };
  onAnswer: (score: number) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  
  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
    
    // 添加轻微延迟以确保UI更新后再触发回调
    setTimeout(() => {
      onAnswer(score);
    }, 200);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          问题 {question.id}
        </h3>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
          必答
        </span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed">
        {question.text}
      </p>
      
      <div className="grid grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => handleScoreSelect(score)}
            className={cn(
              "py-3 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500",
              selectedScore === score 
                ? "bg-blue-500 text-white ring-2 ring-blue-500 shadow-md" 
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
            aria-label={`选择评分: ${score}`}
          >
            <span className="font-medium">{score}</span>
            <span className="block text-xs mt-1 opacity-75">
              {score === 1 && "没有"}
              {score === 2 && "很轻"}
              {score === 3 && "中等"}
              {score === 4 && "偏重"}
              {score === 5 && "严重"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}