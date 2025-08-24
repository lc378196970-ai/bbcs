import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  isFirst: boolean;
  isLast: boolean;
  isNextDisabled?: boolean;
}

export default function NavigationButtons({
  onPrevious,
  onNext,
  onSubmit,
  isFirst,
  isLast,
  isNextDisabled
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={cn(
          "px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200",
          isFirst
            ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400"
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        )}
      >
        <ArrowLeft size={18} />
        <span>上一题</span>
      </button>
      
      {isLast ? (
        <button
          onClick={onSubmit}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          <span>提交测试</span>
          <CheckCircle2 size={18} />
        </button>
      ) : (
         <button
           onClick={onNext}
           disabled={isNextDisabled}
           className="px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
           className={cn(
             "px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg",
             isNextDisabled
               ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400"
               : "bg-blue-600 hover:bg-blue-700 text-white"
           )}
         >
           <span>下一题</span>
           <ArrowRight size={18} />
         </button>
      )}
    </div>
  );
} 