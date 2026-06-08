import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores';
import {
  Home,
  BookOpen,
  GraduationCap,
  Users,
  Trophy,
  LogOut,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function MainLayout() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/courses', icon: BookOpen, label: '课程' },
    { path: '/dashboard', icon: GraduationCap, label: '学习' },
    { path: '/community', icon: Users, label: '社区' },
    { path: '/achievements', icon: Trophy, label: '成就' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-midnight-800/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ukraine-blue to-ukraine-yellow flex items-center justify-center">
                <span className="text-white font-bold text-lg font-ukrainian">У</span>
              </div>
              <span className="font-display font-bold text-xl text-slate-900 dark:text-white hidden sm:block">
                UkrainianLearn
              </span>
            </Link>

            {/* 桌面导航 */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(path)
                      ? 'bg-ukraine-blue/10 text-ukraine-blue dark:bg-ukraine-blue/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>

            {/* 用户区域 */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.nickname}
                      className="w-8 h-8 rounded-full bg-slate-200"
                    />
                    <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-200">
                      {user.nickname}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="退出登录"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="btn-outline py-2 px-4 text-sm">
                    登录
                  </Link>
                  <Link to="/register" className="btn-primary py-2 px-4 text-sm">
                    注册
                  </Link>
                </div>
              )}

              {/* 移动端菜单按钮 */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-midnight-800 animate-slide-down">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(path)
                      ? 'bg-ukraine-blue/10 text-ukraine-blue'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* 主内容 */}
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-midnight-800 border-t border-slate-200 dark:border-slate-700 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ukraine-blue to-ukraine-yellow flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-ukrainian">У</span>
                </div>
                <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  UkrainianLearn
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-md">
                沉浸式乌克兰语学习平台，通过互动式、游戏化的方式帮助你从零基础到流利表达。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">快速链接</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li><Link to="/courses" className="hover:text-ukraine-blue transition-colors">课程中心</Link></li>
                <li><Link to="/dashboard" className="hover:text-ukraine-blue transition-colors">学习仪表盘</Link></li>
                <li><Link to="/community" className="hover:text-ukraine-blue transition-colors">社区交流</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">联系我们</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>support@ukrainianlearn.com</li>
                <li>© 2024 UkrainianLearn</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
