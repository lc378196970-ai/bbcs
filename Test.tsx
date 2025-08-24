import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import NavigationButtons from '@/components/NavigationButtons';
import { scl90Questions } from '@/data/scl90Questions';

export default function Test() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  // 从localStorage加载已保存的答案（如果有）
  useEffect(() => {
    const savedAnswers = localStorage.getItem('scl90Answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);
  
  // 保存答案到localStorage
  useEffect(() => {
    localStorage.setItem('scl90Answers', JSON.stringify(answers));
  }, [answers]);
  
  const currentQuestion = scl90Questions[currentQuestionIndex];
  
  // 检查当前问题是否已回答
  const isCurrentQuestionAnswered = !!answers[currentQuestion.id];
  
  const handleAnswer = (score: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: score
    }));
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleNext = () => {
    // 检查当前问题是否已回答
    if (!isCurrentQuestionAnswered) {
      toast.error('请先回答当前问题才能进入下一题', {
        position: 'top-center',
      });
      return;
    }
    
    if (currentQuestionIndex < scl90Questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const calculateScores = () => {
    // 创建因子得分映射
    const factorScores: Record<string, { sum: number; count: number }> = {};
    let totalScore = 0; 
    let positiveItems = 0;
    let totalQuestionsAnswered = 0;
    
    // 初始化所有因子 (确保9个因子都被正确初始化)
    const uniqueFactorIds = Array.from(new Set(scl90Questions.map(q => q.factorId)));
    uniqueFactorIds.forEach(factorId => {
      factorScores[factorId] = { sum: 0, count: 0 };
    });
    
    // 计算每个因子的总分和题目数量，以及总评分和阳性项目数
    scl90Questions.forEach(q => {
      const score = answers[q.id] || 0; // 未回答题目按0分处理，但实际测试中不允许跳过题目
      factorScores[q.factorId].sum += score;
      factorScores[q.factorId].count += 1;
      // 确保所有90道题都被计入总分 (SCL-90要求回答所有题目)
      totalScore += score; 
      totalQuestionsAnswered++;
      
      // 阳性项目定义为得分≥2的题目 (SCL-90标准)
       if (score >= 2) {
        positiveItems++;
      }
    });
    
    // 计算各因子平均分 (SCL-90标准计分方法)
    const results: Record<string, number> = {};
    Object.entries(factorScores).forEach(([factorId, data]) => {
      // 确保除数不为0，每个因子至少包含1道题
      results[factorId] = data.count > 0 ? data.sum / data.count : 0;
    });
    
    // 验证总分计算是否正确 (应等于所有题目得分之和)
    const calculatedTotal = Object.values(factorScores).reduce((sum, item) => sum + item.sum, 0);
    if (calculatedTotal !== totalScore) {
      console.warn(`总分计算不一致: ${totalScore} vs ${calculatedTotal}`);
      totalScore = calculatedTotal; // 确保总分准确性
    }
    
    return {
      factorScores: results,
      totalScore,
      totalQuestionsAnswered,
      positiveItems,
      // 计算总平均分 (总分/90题，SCL-90标准)
      totalAverage: totalQuestionsAnswered > 0 ? totalScore / totalQuestionsAnswered : 0
    };      
  };
  
  const handleSubmit = () => {
    // 检查是否所有问题都已回答
    const unansweredQuestions = scl90Questions.filter(q => !answers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      toast.error(`还有 ${unansweredQuestions.length} 道题未回答，请完成所有问题后再提交`, {
        position: 'top-center',
      });
      // 跳转到第一题未回答的题目
      setCurrentQuestionIndex(scl90Questions.indexOf(unansweredQuestions[0]));
      return;
    }
    
    // 计算得分
    const results = calculateScores();
    
    // 导航到结果页并传递分数
    navigate('/results', { 
      state: { 
        factorScores: results.factorScores,
        totalScore: results.totalScore,
        totalAverage: results.totalAverage,
        positiveItems: results.positiveItems,
        totalQuestionsAnswered: results.totalQuestionsAnswered
      } 
    });
    
    // 清除localStorage中的答案
    localStorage.removeItem('scl90Answers');
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">SCL-90 心理症状自评量表</h1>
        <p className="text-gray-600 dark:text-gray-400">请根据您最近一周的实际感受进行评分</p>
      </div>
      
      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={scl90Questions.length} 
      />
      
       <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
      
       <NavigationButtons
         onPrevious={handlePrevious}
         onNext={handleNext}
         onSubmit={handleSubmit}
         isFirst={currentQuestionIndex === 0}
         isLast={currentQuestionIndex === scl90Questions.length - 1}
         isNextDisabled={!isCurrentQuestionAnswered}
       />
    </div>
  );
}