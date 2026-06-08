// 用户相关类型
export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  level: Level;
  totalMinutes: number;
  streakDays: number;
  createdAt: string;
  dailyGoal: number;
}

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// 课程相关类型
export interface Course {
  id: string;
  title: string;
  titleUk: string;
  description: string;
  level: Level;
  coverImage: string;
  totalLessons: number;
  estimatedMinutes: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  titleUk: string;
  order: number;
  content: string;
  contentUk: string;
  estimatedMinutes: number;
  exercises: Exercise[];
}

// 练习相关类型
export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  question: string;
  questionUk: string;
  options?: string[];
  optionsUk?: string[];
  correctAnswer: string;
  explanation: string;
  explanationUk: string;
}

export type ExerciseType = 'multiple_choice' | 'fill_blank' | 'listening' | 'speaking';

// 单词相关类型
export interface Word {
  id: string;
  ukraine: string;
  pronunciation: string;
  chinese: string;
  partOfSpeech: string;
  example: string;
  exampleUk: string;
  exampleChinese: string;
  level: Level;
  category: string;
}

export interface WordProgress {
  id: string;
  wordId: string;
  status: WordStatus;
  reviewCount: number;
  nextReviewAt: string;
  lastReviewAt: string;
}

export type WordStatus = 'new' | 'learning' | 'mastered';

// 进度相关类型
export interface CourseProgress {
  id: string;
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
  lastStudyAt: string;
}

export interface GrammarProgress {
  id: string;
  grammarId: string;
  completed: boolean;
  attempts: number;
  bestScore: number;
}

// 成就相关类型
export interface Achievement {
  id: string;
  badgeId: string;
  earnedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  nameUk: string;
  description: string;
  descriptionUk: string;
  icon: string;
  condition: string;
  requirement: number;
}

// 社区相关类型
export interface Post {
  id: string;
  userId: string;
  userNickname: string;
  userAvatar: string;
  title: string;
  content: string;
  category: PostCategory;
  likes: number;
  comments: number;
  createdAt: string;
  isLiked: boolean;
}

export type PostCategory = 'general' | 'grammar' | 'vocabulary' | 'speaking' | 'culture';

// 学习统计
export interface StudyStats {
  totalMinutes: number;
  totalWords: number;
  totalExercises: number;
  totalCourses: number;
  streakDays: number;
  weeklyMinutes: number[];
  dailyActivity: { date: string; minutes: number }[];
}

// 偏好设置
export interface Preferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'zh' | 'en' | 'uk';
  dailyGoal: number;
  notifications: boolean;
}
