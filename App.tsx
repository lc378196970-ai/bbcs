import { Routes, Route, Navigate } from "react-router-dom";
import Introduction from "@/pages/Introduction";
import Test from "@/pages/Test"; 
import Results from "@/pages/Results";
import VerifyCDK from "@/pages/VerifyCDK";
import AdminCDK from "@/pages/AdminCDK";
import { useState, useEffect } from "react";
import { AuthContext } from '@/contexts/authContext';
import { initializeDefaultCDKs } from '@/lib/cdkUtils';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cdkVerified, setCdkVerified] = useState(false);

  // 初始化默认CDK数据
  useEffect(() => {
    initializeDefaultCDKs();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCdkVerified(false);
  };

  // 保护路由组件 - 需要CDK验证才能访问
  const RequireCDK = ({ children }: { children: React.ReactNode }) => {
    return cdkVerified ? <>{children}</> : <Navigate to="/verify" replace />;
  };

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        isAdmin,
        cdkVerified,
        setIsAuthenticated, 
        setIsAdmin,
        setCdkVerified,
        logout 
      }}
    >
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/verify" element={<VerifyCDK />} />
        <Route path="/admin/cdk" element={<AdminCDK />} />
        <Route 
          path="/test" 
          element={
            <RequireCDK>
              <Test />
            </RequireCDK>
          } 
        />
        <Route 
          path="/results" 
          element={
            <RequireCDK>
              <Results />
            </RequireCDK>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
}
