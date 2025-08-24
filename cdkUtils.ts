export interface CDK {
  code: string;
  used: boolean;
  createdAt: string;
  usedAt?: string;
}

// 生成8位随机CDK
export const generateCDK = (): string => {
  const chars = '0123456789'; // 仅使用数字确保是8位数字
  let cdk = '';
  for (let i = 0; i < 8; i++) {
    cdk += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return cdk;
};

// 保存CDK到localStorage
export const saveCDK = (cdk: CDK): void => {
  const existingCDKs = getCDKs();
  const updatedCDKs = [...existingCDKs, cdk];
  localStorage.setItem('cdks', JSON.stringify(updatedCDKs));
  
  // 为演示目的，保存一个默认管理员密码
  localStorage.setItem('adminPassword', 'admin123');
};

// 从localStorage获取所有CDK
export const getCDKs = (): CDK[] => {
  const cdks = localStorage.getItem('cdks');
  return cdks ? JSON.parse(cdks) : []; 
};

// 验证CDK是否有效且未使用过
export const validateCDK = (code: string): boolean => {
	if (code.length !==8 || !/^\d{8}$/.test(code)) {
		return false; // 不是8位数字
	}
	
  const cdks = getCDKs();
  const cdk = cdks.find(c => c.code === code);
  
	if (!cdk) {
		return false; // CDK不存在
	}
	
  return !cdk.used; // CDK存在且未使用
};

// 将CDK标记为已使用
export const markCDKAsUsed = (code: string): boolean => {
  const cdks = getCDKs();
  const index = cdks.findIndex(c => c.code === code);
  
  if (index === -1 || cdks[index].used) {
    return false;
  }
  
  cdks[index].used = true;
  cdks[index].usedAt = new Date().toISOString();
  localStorage.setItem('cdks', JSON.stringify(cdks));
  return true;
};

// 管理员登录验证
export const adminLogin = (password: string): boolean => {
  const storedPassword = localStorage.getItem('adminPassword');
  return storedPassword === password;
}

// 初始化默认CDK（仅用于演示）
export const initializeDefaultCDKs = (): void => {
  const cdks = getCDKs();
  if (cdks.length === 0) {
    // 创建3个默认CDK用于测试
    const defaultCDKs: CDK[] = [
      { code: '12345678', used: false, createdAt: new Date().toISOString() },
      { code: '87654321', used: false, createdAt: new Date().toISOString() },
      { code: '11223344', used: false, createdAt: new Date().toISOString() }
    ];
    
    localStorage.setItem('cdks', JSON.stringify(defaultCDKs));
    localStorage.setItem('adminPassword', 'admin123');
  }
}