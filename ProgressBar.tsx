import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8 overflow-hidden">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>{current} / {total} 题</span>
        <span>{Math.round(percentage)}% 完成</span>
      </div>
    </div>
  );
}