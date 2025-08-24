import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Key, RefreshCw, LogOut, ArrowLeft } from 'lucide-react';
import { AuthContext } from '@/contexts/authContext';
import { generateCDK, saveCDK, getCDKs, adminLogin } from '@/lib/cdkUtils';

export default function AdminCDK() {
  const [cdks, setCdks] = useState<any[]>([]);
  const [newCDK, setNewCDK] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  
  const navigate = useNavigate();
  const { isAdmin, logout } = useContext(AuthContext);
  
  useEffect(() => {
    // 检查管理员权限
    if (!isAdmin) {
      setShowPasswordPrompt(true);
    } else {
      loadCDKs();
    }
  }, [isAdmin]);
  
  const loadCDKs = () => {
    const allCDKs = getCDKs();
    setCdks(allCDKs);
  };
  
  const handleGenerateCDK = () => {
    setLoading(true);
    
    // 生成新的8位CDK
    const newCode = generateCDK();
    
    // 保存到本地存储
    saveCDK({
      code: newCode,
      used: false,
      createdAt: new Date().toISOString()
    });
    
    setNewCDK(newCode);
    loadCDKs();
    
    // 显示成功提示并自动复制
    setTimeout(() => {
      navigator.clipboard.writeText(newCode).then(() => {
        toast.success('新CDK已生成并复制到剪贴板');
      }).catch(() => {
        toast.success('新CDK已生成');
      });
      setLoading(false);
    }, 800);
  };
  
  const handleAdminAuth = () => {
    if (!password) {
      toast.error('请输入管理员密码');
      return;
    }
    
    const isValid = adminLogin(password);
    if (isValid) {
      setShowPasswordPrompt(false);
      loadCDKs();
    } else {
      toast.error('管理员密码不正确');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (showPasswordPrompt) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">管理员认证</h2>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              管理员密码
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入管理员密码"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleAdminAuth}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
            >
              确认
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-medium py-2 px-4 rounded-lg transition-all"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Key className="w-6 h-6 text-blue-600" />
          CDK管理系统
        </h1>
        
        <div className="flex gap-3">
          <button
            onClick={logout}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-medium py-2 px-4 rounded-lg transition-all text-sm flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            退出登录
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-medium py-2 px-4 rounded-lg transition-all text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">生成新CDK</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button
            onClick={handleGenerateCDK}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
            生成新CDK
          </button>
          
          {newCDK && (
            <div className="w-full sm:w-auto bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex items-center justify-between w-full sm:w-64 mt-2 sm:mt-0">
              <span className="font-mono text-gray-900 dark:text-white">{newCDK}</span>
              <button
                onClick={() => navigator.clipboard.writeText(newCDK)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                复制
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">CDK列表</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            共 {cdks.length} 个CDK ({cdks.filter(c => !c.used).length} 个未使用)
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">CDK码</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">创建时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">使用时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {cdks.length > 0 ? (
                cdks.map((cdk, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900 dark:text-white">
                      {cdk.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        cdk.used 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {cdk.used ? '已使用' : '未使用'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(cdk.createdAt)}
                    </td> 
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {cdk.used && cdk.usedAt ? formatDate(cdk.usedAt) : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    暂无CDK数据，请生成新CDK
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}