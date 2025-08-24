import { Link } from 'react-router-dom';
import { Info, AlertCircle, Clock } from 'lucide-react';

export default function Introduction() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">SCL-90 症状自评量表</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">心理症状综合评估工具</p>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
            <Info size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">什么是 SCL-90？</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              SCL-90（Symptom Checklist 90）是一种广泛使用的心理健康自评量表，包含90个项目，
              旨在评估个体在最近一周内的心理症状体验。该量表涵盖了9个主要的心理症状维度，
              包括躯体化、强迫症状、人际关系敏感、抑郁、焦虑、敌对、恐怖、偏执和精神病性。
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={20} className="text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">测试须知</h3>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span>测试包含90个问题，预计需要15-20分钟完成</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span>请根据您最近一周的实际感受进行回答</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span>每个问题有5个选项，从"没有"到"严重"</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={20} className="text-amber-600 dark:text-amber-400" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">重要提示</h3>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
              <span>本测试结果仅供参考，不能替代专业心理诊断</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
              <span>如测试结果显示明显心理困扰，请咨询专业心理医生</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
              <span>请在心态平和的环境下完成测试，以获得准确结果</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">测试维度</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "躯体化", "强迫症状", "人际关系敏感", 
            "抑郁", "焦虑", "敌对", 
            "恐怖", "偏执", "精神病性"
          ].map((dimension) => (
            <div key={dimension} className="bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              {dimension}
            </div>
          ))}
        </div>
      </div>
      
       <div className="text-center">
         <Link
           to="/verify"
           className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg"
         >
           开始测试
         </Link>
         <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
           点击上方按钮开始SCL-90心理症状自评量表测试
         </p>
         <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
           测试需要8位CDK码，请联系管理员获取
         </p>
       </div>
    </div>
  );
}