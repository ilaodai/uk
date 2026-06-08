import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Settings,
  Bell,
  Moon,
  Sun,
  Target,
  Save,
  Camera
} from 'lucide-react';
import { useAuthStore, usePreferencesStore, useProgressStore } from '../stores';

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const { preferences, setTheme, setNotifications } = usePreferencesStore();
  const { getOverallProgress, wordProgress } = useProgressStore();

  const [nickname, setNickname] = useState(user?.nickname || '');
  const [dailyGoal, setDailyGoalLocal] = useState(user?.dailyGoal || 30);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    updateProfile({ nickname, dailyGoal: dailyGoal });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const masteredWords = wordProgress.filter(w => w.status === 'mastered').length;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-slate-500">请先登录</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 头部 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
          个人中心
        </h1>
        <p className="text-slate-500">
          管理你的账户设置和学习偏好
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左侧用户信息 */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={user.avatar}
                alt={user.nickname}
                className="w-24 h-24 rounded-full bg-slate-200 mx-auto"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-ukraine-blue text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {user.nickname}
            </h2>
            <p className="text-sm text-slate-500 mb-4">{user.email}</p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ukraine-blue/10 text-ukraine-blue rounded-full text-sm font-medium">
              {user.level} 级别
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {getOverallProgress()}%
                </p>
                <p className="text-xs text-slate-500">总体进度</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user.streakDays}
                </p>
                <p className="text-xs text-slate-500">连续天数</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user.totalMinutes}
                </p>
                <p className="text-xs text-slate-500">学习分钟</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {masteredWords}
                </p>
                <p className="text-xs text-slate-500">掌握单词</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 右侧设置 */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* 基本设置 */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-ukraine-blue" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                基本设置
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  昵称
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="input-field opacity-60 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  当前级别
                </label>
                <select
                  value={user.level}
                  disabled
                  className="input-field opacity-60 cursor-not-allowed"
                >
                  <option>A1</option>
                  <option>A2</option>
                  <option>B1</option>
                  <option>B2</option>
                  <option>C1</option>
                  <option>C2</option>
                </select>
              </div>
            </div>
          </div>

          {/* 学习设置 */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-ukraine-blue" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                学习设置
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  每日学习目标 (分钟)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="120"
                    step="10"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoalLocal(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-16 text-center font-semibold text-ukraine-blue">
                    {dailyGoal} 分钟
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 界面设置 */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-ukraine-blue" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                界面设置
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {preferences.theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-slate-400" />
                  )}
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">深色模式</p>
                    <p className="text-sm text-slate-500">切换深色/浅色主题</p>
                  </div>
                </div>
                <button
                  onClick={() => setTheme(preferences.theme === 'dark' ? 'light' : 'dark')}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    preferences.theme === 'dark' ? 'bg-ukraine-blue' : 'bg-slate-300'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    preferences.theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">学习提醒</p>
                    <p className="text-sm text-slate-500">接收每日学习提醒</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!preferences.notifications)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    preferences.notifications ? 'bg-ukraine-blue' : 'bg-slate-300'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    preferences.notifications ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* 保存按钮 */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              {saving ? (
                '保存中...'
              ) : saved ? (
                <>
                  <Save className="w-5 h-5" />
                  已保存！
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  保存更改
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
