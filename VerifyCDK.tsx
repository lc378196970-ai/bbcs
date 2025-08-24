import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Lock, ArrowLeft, User } from 'lucide-react';
import { AuthContext } from '@/contexts/authContext';
import { validateCDK, markCDKAsUsed } from '@/lib/cdkUtils';

export default function VerifyCDK() {
  const [cdk, setCdk] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  const navigate = useNavigate();
  const { setCdkVerified, setIsAdmin } = useContext(AuthContext);
  
  const handleCDKVerify = () => {
    if (!cdk) {
      toast.error('请输入CDK码');
      return;
    }
    
    if (cdk.length !== 8) {
      toast.error('CDK码必须是8位数字');
      return;
    }
    
    if (!/^\d{8}$/.test(cdk)) {
      toast.error('CDK码必须是8位数字');
      return;
    }
    
    setLoading(true);
    
    // 模拟验证延迟
    setTimeout(() => {
      const isValid = validateCDK(cdk);
      
      if (isValid) {
        markCDKAsUsed(cdk);
        setCdkVerified(true);
        toast.success('CDK验证成功，即将进入测试');
        navigate('/test');
      } else {
        toast.error('无效的CDK码或该CDK已被使用');
      }
      
      setLoading(false);
    }, 800);
  };
  
  const handleAdminLogin = () => {
    if (!adminPassword) {
      toast.error('请输入管理员密码');
      return;
    }
    
    // 这里应该是真实的管理员密码验证
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      toast.success('管理员登录成功');
      navigate('/admin/cdk');
    } else {
      toast.error('管理员密码不正确');
    }
  };
  
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
          <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">CDK验证</h1>
        <p className="text-gray-600 dark:text-gray-400">请输入8位CDK码以开始测试</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        {!showAdminLogin ? (
          <>
            <div className="mb-6">
              <label htmlFor="cdk" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                8位CDK码
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cdk"
                  value={cdk}
                  onChange={(e) => {
                    // 只允许输入数字，且限制8位
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
                    setCdk(value);
                  }}
                  placeholder="请输入8位数字CDK"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {cdk.length}/8
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                CDK码由管理员生成，每位用户限用一次
              </p>
            </div>
            
            <button
              onClick={handleCDKVerify}
              disabled={loading || cdk.length !== 8}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Lock className="w-5 h-5" />
              )}
              验证并进入测试
            </button>
            
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center gap-1"
              >
                 <User className="w-3 h-3" />
                管理员入口
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                管理员密码
              </label>
              <input
                type="password"
                id="adminPassword"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="请输入管理员密码"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={handleAdminLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
            >管理员登录</button>
            
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAdminLogin(false)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                返回CDK验证
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}