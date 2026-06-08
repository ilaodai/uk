import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  MessageCircle,
  ThumbsUp,
  Clock,
  TrendingUp,
  Bookmark,
  PenSquare,
  BookOpen
} from 'lucide-react';
import { useAuthStore } from '../stores';
import { initialPosts } from '../data/initialData';
import type { Post, PostCategory } from '../types';

const categories: { id: PostCategory | 'all'; label: string; icon: typeof Users }[] = [
  { id: 'all', label: '全部', icon: Users },
  { id: 'general', label: '综合讨论', icon: MessageCircle },
  { id: 'grammar', label: '语法问答', icon: Bookmark },
  { id: 'vocabulary', label: '词汇交流', icon: BookOpen },
  { id: 'speaking', label: '口语练习', icon: TrendingUp },
  { id: 'culture', label: '文化分享', icon: Users }
];

export default function CommunityPage() {
  const { isAuthenticated } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const handleLike = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId
        ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return '刚刚';
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const categoryColors: Record<PostCategory, string> = {
    general: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    grammar: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    vocabulary: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    speaking: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    culture: 'bg-ukraine-yellow/20 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* 侧边栏 */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card p-4 mb-6">
            {isAuthenticated ? (
              <Link
                to="/community/new"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-ukraine-blue to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <PenSquare className="w-5 h-5" />
                发布新帖
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-midnight-600 transition-colors"
              >
                登录后发布
              </Link>
            )}
          </div>

          <div className="card p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              分类浏览
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-ukraine-blue/10 text-ukraine-blue dark:bg-ukraine-blue/20'
                      : 'hover:bg-slate-100 dark:hover:bg-midnight-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <cat.icon className="w-5 h-5" />
                  <span className="font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 主内容 */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              社区讨论
            </h1>
            <span className="text-sm text-slate-500">
              {filteredPosts.length} 个帖子
            </span>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={post.userAvatar}
                    alt={post.userNickname}
                    className="w-12 h-12 rounded-full bg-slate-200"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {post.userNickname}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[post.category]}`}>
                        {categories.find(c => c.id === post.category)?.label}
                      </span>
                    </div>

                    <Link to={`/community/${post.id}`} className="block group">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-ukraine-blue transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {post.content}
                      </p>
                    </Link>

                    <div className="flex items-center gap-6 mt-4 text-sm text-slate-500">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        {post.likes}
                      </button>

                      <Link
                        to={`/community/${post.id}`}
                        className="flex items-center gap-1 hover:text-ukraine-blue transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </Link>

                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <MessageCircle className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">该分类下暂无帖子</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
