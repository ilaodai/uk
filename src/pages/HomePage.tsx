import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Mic,
  Brain,
  Headphones,
  ArrowRight,
  Star,
  Users,
  Globe,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../stores';

const stats = [
  { icon: Users, value: '10,000+', label: '学习者' },
  { icon: Globe, value: '50+', label: '国家参与' },
  { icon: BookOpen, value: '200+', label: '课时内容' },
  { icon: Star, value: '4.9', label: '用户评分' }
];

const features = [
  {
    icon: BookOpen,
    title: '分级课程体系',
    titleUk: 'Система рівнів',
    description: '从A1到C2，循序渐进的课程设计，让你系统掌握乌克兰语。',
    color: 'from-ukraine-blue to-blue-500'
  },
  {
    icon: Brain,
    title: '智能单词记忆',
    titleUk: 'Розумне запам\'ятовування',
    description: '间隔重复算法，科学记忆曲线，让单词学习更高效。',
    color: 'from-ukraine-yellow to-amber-500'
  },
  {
    icon: Mic,
    title: '口语跟读练习',
    titleUk: 'Практика вимови',
    description: 'AI评分，即时反馈，帮你练就标准发音。',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Headphones,
    title: '听力训练',
    titleUk: 'Тренування слуху',
    description: '真实语境听力材料，从日常对话到新闻资讯。',
    color: 'from-purple-500 to-violet-500'
  }
];

const courses = [
  { level: 'A1', title: '基础乌克兰语', lessons: 8, color: 'bg-green-500' },
  { level: 'A2', title: '日常乌克兰语', lessons: 10, color: 'bg-emerald-500' },
  { level: 'B1', title: '中级乌克兰语', lessons: 12, color: 'bg-blue-500' },
  { level: 'B2', title: '高级乌克兰语', lessons: 15, color: 'bg-indigo-500' },
  { level: 'C1', title: '精通级乌克兰语', lessons: 18, color: 'bg-purple-500' },
  { level: 'C2', title: '大师级乌克兰语', lessons: 20, color: 'bg-pink-500' }
];

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="relative overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ukraine-blue/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-ukraine-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-ukraine-blue/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="badge badge-blue mb-4">
                  <Zap className="w-4 h-4 mr-1" />
                  乌克兰语学习新体验
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="gradient-text">乌克兰语</span>
                <br />
                <span className="text-slate-900 dark:text-white">学习之旅</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                通过沉浸式互动学习体验，从零基础到流利表达。科学的学习方法，让语言学习变得简单有趣。
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-primary inline-flex items-center justify-center gap-2">
                    继续学习
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2">
                      免费开始学习
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/courses" className="btn-outline inline-flex items-center justify-center gap-2">
                      浏览课程
                    </Link>
                  </>
                )}
              </motion.div>

              {/* 乌克兰语字母装饰 */}
              <motion.div
                className="mt-12 flex justify-center lg:justify-start gap-2 text-4xl font-ukrainian text-ukraine-blue/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <span className="hover:text-ukraine-blue/40 transition-colors">А</span>
                <span className="hover:text-ukraine-blue/40 transition-colors">б</span>
                <span className="hover:text-ukraine-blue/40 transition-colors">в</span>
                <span className="hover:text-ukraine-yellow/40 transition-colors">г</span>
                <span className="hover:text-ukraine-blue/40 transition-colors">д</span>
                <span className="hover:text-ukraine-yellow/40 transition-colors">є</span>
                <span className="text-ukraine-blue/60">...</span>
              </motion.div>
            </div>

            {/* 右侧装饰图 */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* 主卡片 */}
                <div className="absolute inset-0 bg-gradient-to-br from-ukraine-blue to-blue-600 rounded-3xl shadow-2xl shadow-ukraine-blue/30 flex items-center justify-center animate-float">
                  <div className="text-center text-white p-8">
                    <div className="text-8xl font-ukrainian font-bold mb-4">П</div>
                    <div className="text-2xl font-display">Привіт</div>
                    <div className="text-sm opacity-80 mt-2">你好</div>
                  </div>
                </div>

                {/* 悬浮卡片1 */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white dark:bg-midnight-800 rounded-2xl shadow-xl p-4 animate-float-delayed"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-ukraine-yellow/20 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-ukraine-yellow" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">今日已学</div>
                      <div className="text-sm text-slate-500">45 分钟</div>
                    </div>
                  </div>
                </motion.div>

                {/* 悬浮卡片2 */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-midnight-800 rounded-2xl shadow-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">连续7天</div>
                      <div className="text-sm text-slate-500">学习 streak 🔥</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-12 bg-white dark:bg-midnight-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-ukraine-blue/10 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-ukraine-blue" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特色 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              为什么选择我们？
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              我们提供全方位的学习体验，让乌克兰语学习变得简单、有趣、高效。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card p-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 课程级别 */}
      <section className="py-20 bg-white dark:bg-midnight-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              分级课程体系
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              根据欧洲语言共同参考框架 (CEFR)，从零基础到精通，共六个级别。
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/courses?level=${course.level}`}
                  className="block card p-6 group hover:border-ukraine-blue dark:hover:border-ukraine-blue"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${course.color} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
                      {course.level}
                    </span>
                    <span className="text-slate-400 group-hover:text-ukraine-blue transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500">{course.lessons} 课时</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/courses" className="btn-outline inline-flex items-center gap-2">
              查看全部课程
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative bg-gradient-to-br from-ukraine-blue to-blue-700 rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* 装饰 */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-10 text-8xl font-ukrainian">А</div>
              <div className="absolute bottom-4 right-10 text-8xl font-ukrainian">Я</div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                准备好开始你的乌克兰语之旅了吗？
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                加入 thousands of learners，从今天开始学习世界上最美丽的语言之一。
              </p>
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-secondary inline-flex items-center gap-2">
                  立即学习
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link to="/register" className="btn-secondary inline-flex items-center gap-2">
                  立即免费注册
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
