import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Factor } from '@/data/scl90Factors';

interface ResultFactorProps {
  factor: Factor;
  score: number;
}

// 生成图表数据
const generateChartData = (score: number) => [
  { name: '您的得分', value: score },
  { name: '参考均值', value: 1.5 },
  { name: '临界值', value: 2.5 },
];

export default function ResultFactor({ factor, score }: ResultFactorProps) {
  // 确定分数等级
  let level = 'low';
 if (score >= 3.5) {
    level = 'veryHigh';
  } else if (score >= 2.5) {
    level = 'high';
  } else if (score >= 2.0) {
    level = 'moderate';
  }
  
  // 根据等级确定颜色和解释
  let color = 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
  let levelDescription = '正常范围';
  let levelColor = 'text-green-600 dark:text-green-400';
  
  if (level === 'moderate') {
    color = 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
    levelDescription = '轻度症状';
    levelColor = 'text-yellow-600 dark:text-yellow-400';
  } else if (level === 'high') { 
    color = 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800';
    levelDescription = '中度症状';
    levelColor = 'text-orange-600 dark:text-orange-400';
  } else if (level === 'veryHigh') {
    color = 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
    levelDescription = '明显症状';
    levelColor = 'text-red-600 dark:text-red-400';
  }
  
  return (
    <div className={cn("rounded-xl p-6 mb-6 border transition-all duration-300 hover:shadow-md", color)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{factor.name}</h3>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${levelColor}`}>
            {levelDescription}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          得分: {score.toFixed(1)}
        </div>
      </div>
      
      <div className="mb-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={generateChartData(score)}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis 
              domain={[0, 5]} 
              axisLine={false} 
              tickLine={false}
              ticks={[1, 2, 3, 4, 5]} 
            />
            <Tooltip 
              formatter={(value) => [`${value.toFixed(1)}`, '分数']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar 
              dataKey="value" 
              fill={
                level === 'veryHigh' ? '#dc2626' : 
                level === 'high' ? '#f97316' : 
                level === 'moderate' ? '#f59e0b' : '#22c55e'
              } 
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">因子说明:</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{factor.description}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">结果解释:</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {level === 'low' && factor.interpretation.low}
            {level === 'moderate' && factor.interpretation.moderate}
            {level === 'high' && factor.interpretation.high}
            {level === 'veryHigh' && `您在${factor.name}维度得分显著升高，表明存在明显的${factor.name}症状。${factor.interpretation.high}建议尽快寻求专业心理干预。`}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">应对建议:</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {level === 'low' && "保持当前健康的生活方式和应对策略，继续关注心理健康。"}
            {level === 'moderate' && "注意调整生活节奏，适当休息和放松，尝试压力管理技巧，如冥想、运动或与亲友交流。"}
            {level === 'high' && "建议进行专业心理咨询，学习有效的应对策略，必要时寻求精神科医生评估。"}
            {level === 'veryHigh' && "强烈建议尽快寻求专业心理治疗和精神科评估，可能需要结合药物治疗和心理干预。"}
          </p>
        </div>
      </div>
    </div>
  );
}