import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import ResultFactor from '@/components/ResultFactor';
import { scl90Factors } from '@/data/scl90Factors';

export default function Results() {
  const location = useLocation();
  const { factorScores, totalScore, totalAverage, positiveItems, totalQuestionsAnswered } = location.state || { 
    factorScores: {}, 
    totalScore: 0, 
    totalAverage: 0, 
    positiveItems: 0,
    totalQuestionsAnswered: 0
  };
  
  // 如果没有分数数据，重定向到测试页面
  if (!factorScores || Object.keys(factorScores).length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">测试结果不可用</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">未找到测试结果，请先完成测试</p>
        <Link
          to="/test"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
        >
          返回测试页面
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">SCL-90 测试结果</h1>
         <p className="text-gray-600 dark:text-gray-400">心理症状评估报告</p>
      </div>
      
      {/* 总体评分概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">总评分</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalScore}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">所有项目得分总和</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">总平均分</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalAverage.toFixed(2)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">所有项目的平均得分</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">阳性项目数</h3>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{positiveItems}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">得分≥2的项目数量 (共{totalQuestionsAnswered}题)</p>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-5 mb-8">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-2">本报告基于您对SCL-90量表的回答生成，反映了您最近一周的心理症状状况</p>
            <p>每个因子得分范围为1-5分，分数越高表明该维度的症状越明显。2.5分通常被视为临床意义上的临界值。</p>
            <p className="mt-2">阳性项目数是指得分≥2的项目数量，反映了您存在的心理症状范围和广度。一般来说，阳性项目数超过43项提示可能存在较明显的心理问题。</p>
            <p className="mt-2">SCL-90常模参考值：总分&lt;160分，阳性项目数&lt;43项，各因子分&lt;2分。当总分&gt;160分或阳性项目数&gt;43项或任一因子分&gt;2分时，建议寻求专业心理评估。</p>
            <p className="mt-2">总平均分是所有项目的平均得分，反映整体心理症状的严重程度：1-1.5分为基本正常，1.5-2.5分为轻度症状，2.5-3.5分为中度症状，&gt;3.5分为重度症状。</p>
          </div>
        </div>
      </div>
      
      {/* 总体评估 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">总体评估</h2>
        
        <div className="prose dark:prose-invert max-w-none">
          {(() => {
            // 根据总平均分判断整体心理健康状况
            if (totalAverage < 1.5) {
              return (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">心理健康状况良好</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    您的SCL-90测试结果显示总体心理状况良好。各因子得分均在正常范围内，阳性项目数较少，表明您目前没有明显的心理症状困扰。
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    建议保持当前的生活方式和应对策略，继续关注自身心理健康，定期进行自我评估。
                  </p>
                </div>
              );
            } else if (totalAverage < 2.5) {
              return (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2">存在轻度心理症状</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    您的测试结果显示存在一些轻度的心理症状，可能与近期压力或生活事件有关。部分因子得分略高，但尚未达到临床显著水平。
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    建议关注自我调节，适当休息和放松，尝试压力管理技巧。如果症状持续或加重，可考虑寻求专业心理咨询。
                  </p>
                </div>
              );
            } else {
              return (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">存在明显心理症状</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    您的测试结果显示存在明显的心理症状，多个因子得分超过临床临界值，阳性项目数较多。这些症状可能已经对您的日常生活造成一定影响。
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    建议尽快寻求专业心理医生或精神科医生的帮助，进行全面评估和适当干预。及时治疗可以有效改善症状和提高生活质量。
                  </p>
                </div>
              );
            }
          })()}
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">主要症状特点</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              {(() => {
                // 获取得分最高的三个因子
                const sortedFactors = Object.entries(factorScores)
                  .map(([id, score]) => ({
                    id,
                    score,
                    name: scl90Factors.find(f => f.id === id)?.name || id
                  }))
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 3);
                  
                if (sortedFactors.length === 0) return <li>无可用数据</li>;
                
                return sortedFactors.map(factor => (
                  <li key={factor.id}>
                    <strong>{factor.name}</strong>: 得分{factor.score.toFixed(1)}，{
                      factor.score >= 2.5 ? "明显高于常模，需要重点关注" : 
                      factor.score >= 2.0 ? "略高于常模，值得关注" : "在正常范围内"
                    }
                  </li>
                ));
              })()}
            </ul>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">各因子详细分析</h2>
        
        <div className="space-y-6">
          {scl90Factors.map(factor => (
            <ResultFactor
              key={factor.id} 
              factor={factor}
              score={factorScores[factor.id] || 0}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-10 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">专业建议</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          本测试结果仅供参考，不能作为临床诊断的依据。如果您的测试结果显示明显的心理困扰，
          或您感到自己的心理状态影响了日常生活、工作或人际关系，建议咨询专业心理医生或精神科医生。
        </p>
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={16} />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}