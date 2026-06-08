import { motion } from 'framer-motion';
import { Trophy, Lock, Check, Flame, Zap } from 'lucide-react';
import { useProgressStore, useAuthStore } from '../stores';
import { badges } from '../data/initialData';

export default function AchievementsPage() {
  const { achievements, wordProgress } = useProgressStore();
  const { user } = useAuthStore();

  const unlockedBadges = badges.filter(b => achievements.some(a => a.badgeId === b.id));
  const lockedBadges = badges.filter(b => !achievements.some(a => a.badgeId === b.id));

  const masteredWords = wordProgress.filter(w => w.status === 'mastered').length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 头部 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
          成就中心
        </h1>
        <p className="text-slate-500">
          完成任务解锁徽章，激励你的学习之旅
        </p>
      </motion.div>

      {/* 统计概览 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          className="card p-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-12 h-12 rounded-xl bg-ukraine-yellow/20 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-ukraine-yellow" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {unlockedBadges.length}
          </p>
          <p className="text-sm text-slate-500">已解锁</p>
        </motion.div>

        <motion.div
          className="card p-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {lockedBadges.length}
          </p>
          <p className="text-sm text-slate-500">待解锁</p>
        </motion.div>

        <motion.div
          className="card p-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
            <Flame className="w-6 h-6 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {user?.streakDays || 0}
          </p>
          <p className="text-sm text-slate-500">连续天数</p>
        </motion.div>

        <motion.div
          className="card p-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {masteredWords}
          </p>
          <p className="text-sm text-slate-500">已掌握单词</p>
        </motion.div>
      </div>

      {/* 已解锁徽章 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Check className="w-6 h-6 text-emerald-500" />
          已解锁 ({unlockedBadges.length})
        </h2>

        {unlockedBadges.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unlockedBadges.map((badge, index) => {
              const achievement = achievements.find(a => a.badgeId === badge.id);

              return (
                <motion.div
                  key={badge.id}
                  className="card p-5 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-bl-full" />

                  <div className="text-5xl mb-3">{badge.icon}</div>

                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {badge.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-2">{badge.description}</p>

                  <div className="flex items-center gap-1 text-xs text-emerald-500">
                    <Check className="w-3 h-3" />
                    {achievement && new Date(achievement.earnedAt).toLocaleDateString('zh-CN')}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <Trophy className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">还没有解锁任何徽章，开始学习吧！</p>
          </div>
        )}
      </motion.div>

      {/* 待解锁徽章 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6 text-slate-400" />
          待解锁 ({lockedBadges.length})
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lockedBadges.map((badge, index) => {
            return (
              <motion.div
                key={badge.id}
                className="card p-5 relative opacity-60"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-5xl mb-3 grayscale">{badge.icon}</div>

                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {badge.name}
                </h3>
                <p className="text-sm text-slate-500 mb-2">{badge.description}</p>

                <div className="text-xs text-slate-400">
                  条件: {badge.requirement}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
