import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Brain,
  Mic,
  Headphones,
  Trophy,
  Flame,
  Clock,
  Target,
  TrendingUp,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useAuthStore, useProgressStore } from '../stores';
import { initialCourses, badges } from '../data/initialData';

const learningModules = [
  {
    icon: Brain,
    title: '单词记忆',
    titleUk: 'Слова',
    description: '使用间隔重复算法高效记忆单词',
    link: '/learn/words',
    color: 'from-ukraine-yellow to-amber-500'
  },
  {
    icon: BookOpen,
    title: '语法练习',
    titleUk: 'Граматика',
    description: '系统学习乌克兰语语法规则',
    link: '/learn/grammar',
    color: 'from-ukraine-blue to-blue-500'
  },
  {
    icon: Mic,
    title: '口语跟读',
    titleUk: 'Мовлення',
    description: 'AI评分，提升发音准确性',
    link: '/learn/speaking',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Headphones,
    title: '听力训练',
    titleUk: 'Слухання',
    description: '沉浸式听力练习材料',
    link: '/learn/listening',
    color: 'from-purple-500 to-violet-500'
  }
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { achievements, courseProgress, getOverallProgress } = useProgressStore();

  const overallProgress = getOverallProgress();
  const recentCourses = initialCourses.slice(0, 3);
  const userBadges = badges.filter(b => achievements.some(a => a.badgeId === b.id));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 欢迎区域 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">
          欢迎回来，{user?.nickname || '学习者'}！ 👋
        </h1>
        <p className="text-slate-500 mt-1">
          继续你的乌克兰语学习之旅
        </p>
      </motion.div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-ukraine-blue/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-ukraine-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{overallProgress}%</p>
              <p className="text-sm text-slate-500">总体进度</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-ukraine-yellow/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-ukraine-yellow" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{user?.streakDays || 0}</p>
              <p className="text-sm text-slate-500">连续天数 🔥</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{user?.totalMinutes || 0}</p>
              <p className="text-sm text-slate-500">学习分钟</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{userBadges.length}</p>
              <p className="text-sm text-slate-500">已获成就</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 学习模块 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          学习模块
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningModules.map((module) => (
            <Link
              key={module.title}
              to={module.link}
              className="card p-5 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                {module.title}
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                {module.description}
              </p>
              <div className="flex items-center gap-1 text-ukraine-blue text-sm font-medium">
                开始学习
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 继续学习 & 成就 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 课程进度 */}
        <motion.div
          className="lg:col-span-2 card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              课程学习
            </h2>
            <Link to="/courses" className="text-ukraine-blue text-sm font-medium hover:underline">
              查看全部
            </Link>
          </div>

          <div className="space-y-4">
            {recentCourses.map((course) => {
              const progress = courseProgress.find(p => p.courseId === course.id);
              return (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-midnight-700/50 hover:bg-slate-100 dark:hover:bg-midnight-700 transition-colors"
                >
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${
                        course.level === 'A1' ? 'bg-green-500' :
                        course.level === 'A2' ? 'bg-emerald-500' :
                        course.level === 'B1' ? 'bg-blue-500' :
                        course.level === 'B2' ? 'bg-indigo-500' :
                        course.level === 'C1' ? 'bg-purple-500' : 'bg-pink-500'
                      }`}>
                        {course.level}
                      </span>
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                        {course.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 truncate">
                      {course.totalLessons} 课时 · {course.estimatedMinutes} 分钟
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-ukraine-blue">
                      {progress?.progressPercent || 0}%
                    </p>
                    <div className="w-20 h-2 bg-slate-200 dark:bg-slate-600 rounded-full mt-1">
                      <div
                        className="h-full bg-ukraine-blue rounded-full transition-all"
                        style={{ width: `${progress?.progressPercent || 0}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* 成就展示 */}
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              成就徽章
            </h2>
            <Link to="/achievements" className="text-ukraine-blue text-sm font-medium hover:underline">
              查看全部
            </Link>
          </div>

          {userBadges.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {userBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="text-center p-3 rounded-xl bg-slate-50 dark:bg-midnight-700/50"
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{badge.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500">完成学习任务解锁成就</p>
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/achievements"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-ukraine-blue to-ukraine-yellow text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <Zap className="w-5 h-5" />
              挑战成就
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 每日目标 */}
      <motion.div
        className="mt-6 card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-ukraine-blue" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              每日目标
            </h2>
          </div>
          <span className="text-sm text-slate-500">
            {user?.dailyGoal || 30} 分钟
          </span>
        </div>

        <div className="relative h-4 bg-slate-100 dark:bg-midnight-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-ukraine-blue to-ukraine-yellow rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((user?.totalMinutes || 0) / (user?.dailyGoal || 30) * 100, 100)}%` }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>

        <p className="text-sm text-slate-500 mt-2">
          今日已学习 {user?.totalMinutes || 0} 分钟，还差 {Math.max((user?.dailyGoal || 30) - (user?.totalMinutes || 0), 0)} 分钟达到目标
        </p>
      </motion.div>
    </div>
  );
}
