import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, BookOpen, ChevronRight, Star } from 'lucide-react';
import { initialCourses } from '../data/initialData';
import type { Level } from '../types';

const levels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const levelColors: Record<Level, string> = {
  'A1': 'bg-green-500',
  'A2': 'bg-emerald-500',
  'B1': 'bg-blue-500',
  'B2': 'bg-indigo-500',
  'C1': 'bg-purple-500',
  'C2': 'bg-pink-500'
};

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedLevel = searchParams.get('level') as Level | null;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = initialCourses.filter(course => {
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    const matchesSearch = !searchQuery ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleUk.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 标题区域 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
          课程中心
        </h1>
        <p className="text-slate-500">
          从零基础到精通，找到适合你的课程
        </p>
      </motion.div>

      {/* 搜索和筛选 */}
      <motion.div
        className="mb-8 flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索课程..."
            className="input-field pl-12"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              !selectedLevel
                ? 'bg-ukraine-blue text-white'
                : 'bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600'
            }`}
          >
            全部
          </button>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSearchParams({ level })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedLevel === level
                  ? 'bg-ukraine-blue text-white'
                  : 'bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 课程列表 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={`/courses/${course.id}`} className="card group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`${levelColors[course.level]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-ukraine-blue transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 mb-3 font-ukrainian">
                  {course.titleUk}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.totalLessons} 课时
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.estimatedMinutes} 分钟
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-ukraine-yellow">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">4.9</span>
                    </div>
                    <div className="flex items-center gap-1 text-ukraine-blue text-sm font-medium">
                      开始学习
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <Filter className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">没有找到匹配的课程</p>
          <button
            onClick={() => { setSearchParams({}); setSearchQuery(''); }}
            className="mt-4 text-ukraine-blue hover:underline"
          >
            清除筛选
          </button>
        </div>
      )}
    </div>
  );
}
