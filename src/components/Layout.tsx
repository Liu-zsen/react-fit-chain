import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeOutlined, 
  CheckCircleOutlined, 
  UserOutlined, 
  TrophyOutlined, 
  BookOutlined 
} from '@ant-design/icons'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '首页', icon: <HomeOutlined /> },
    { path: '/check-in', label: '打卡', icon: <CheckCircleOutlined /> },
    { path: '/leaderboard', label: '排行榜', icon: <TrophyOutlined /> },
    { path: '/knowledge', label: '知识分享', icon: <BookOutlined /> },
    { path: '/profile', label: '个人', icon: <UserOutlined /> }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">FitChain</Link>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`py-2 px-3 rounded-md ${
                  location.pathname === item.path 
                    ? 'bg-blue-700' 
                    : 'hover:bg-blue-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button className="btn-secondary md:hidden">
            菜单
          </button>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">FitChain</h3>
              <p className="text-gray-400">健身打卡激励平台</p>
            </div>
            <div className="text-gray-400">
              &copy; 2025 FitChain. 保留所有权利。
            </div>
          </div>
        </div>
      </footer>

      {/* 移动端导航栏 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-gray-500'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
} 