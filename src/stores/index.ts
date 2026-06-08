import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Preferences, CourseProgress, WordProgress, Achievement, GrammarProgress } from '../types';
import { badges } from '../data/initialData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, nickname: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

interface ProgressState {
  courseProgress: CourseProgress[];
  wordProgress: WordProgress[];
  grammarProgress: GrammarProgress[];
  achievements: Achievement[];
  addCourseProgress: (courseId: string, completedLessons: number, totalLessons: number) => void;
  addWordProgress: (wordId: string, status: WordProgress['status']) => void;
  addGrammarProgress: (grammarId: string, score: number) => void;
  unlockAchievement: (badgeId: string) => void;
  checkAchievements: () => Achievement[];
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  getOverallProgress: () => number;
  updateStreak: () => void;
}

interface PreferencesState {
  preferences: Preferences;
  setTheme: (theme: Preferences['theme']) => void;
  setLanguage: (language: Preferences['language']) => void;
  setDailyGoal: (goal: number) => void;
  setNotifications: (enabled: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('ukraine_learn_users') || '[]') as Array<{email: string; nickname: string; password: string; id: string}>;
        const foundUser = storedUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const existingUserData = JSON.parse(localStorage.getItem(`ukraine_learn_user_${foundUser.id}`) || 'null');
          set({ user: existingUserData?.user || {
            id: foundUser.id,
            email: foundUser.email,
            nickname: foundUser.nickname,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${foundUser.nickname}`,
            level: 'A1',
            totalMinutes: 0,
            streakDays: 0,
            createdAt: new Date().toISOString(),
            dailyGoal: 30
          }, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: (email, nickname, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('ukraine_learn_users') || '[]') as Array<{email: string; nickname: string; password: string; id: string}>;
        if (storedUsers.find(u => u.email === email)) {
          return false;
        }
        const newUser: User = {
          id: `u_${Date.now()}`,
          email,
          nickname,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
          level: 'A1',
          totalMinutes: 0,
          streakDays: 0,
          createdAt: new Date().toISOString(),
          dailyGoal: 30
        };
        storedUsers.push({ email, nickname, password, id: newUser.id });
        localStorage.setItem('ukraine_learn_users', JSON.stringify(storedUsers));
        localStorage.setItem(`ukraine_learn_user_${newUser.id}`, JSON.stringify({ user: newUser }));
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: (updates) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...updates };
          localStorage.setItem(`ukraine_learn_user_${user.id}`, JSON.stringify({ user: updatedUser }));
          set({ user: updatedUser });
        }
      }
    }),
    { name: 'ukraine_learn_auth' }
  )
);

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      courseProgress: [],
      wordProgress: [],
      grammarProgress: [],
      achievements: [],
      addCourseProgress: (courseId, completedLessons, totalLessons) => {
        const { courseProgress } = get();
        const existingIndex = courseProgress.findIndex(p => p.courseId === courseId);
        const newProgress: CourseProgress = {
          id: `cp_${Date.now()}`,
          courseId,
          completedLessons,
          totalLessons,
          progressPercent: (completedLessons / totalLessons) * 100,
          lastStudyAt: new Date().toISOString()
        };
        if (existingIndex >= 0) {
          const updated = [...courseProgress];
          updated[existingIndex] = newProgress;
          set({ courseProgress: updated });
        } else {
          set({ courseProgress: [...courseProgress, newProgress] });
        }
      },
      addWordProgress: (wordId, status) => {
        const { wordProgress } = get();
        const existing = wordProgress.find(p => p.wordId === wordId);
        if (existing) {
          set({
            wordProgress: wordProgress.map(p =>
              p.wordId === wordId
                ? { ...p, status, reviewCount: p.reviewCount + 1, lastReviewAt: new Date().toISOString() }
                : p
            )
          });
        } else {
          set({
            wordProgress: [...wordProgress, {
              id: `wp_${Date.now()}`,
              wordId,
              status,
              reviewCount: 1,
              nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              lastReviewAt: new Date().toISOString()
            }]
          });
        }
      },
      addGrammarProgress: (grammarId, score) => {
        const { grammarProgress } = get();
        const existing = grammarProgress.find(p => p.grammarId === grammarId);
        if (existing) {
          set({
            grammarProgress: grammarProgress.map(p =>
              p.grammarId === grammarId
                ? { ...p, attempts: p.attempts + 1, bestScore: Math.max(p.bestScore, score), completed: score >= 80 }
                : p
            )
          });
        } else {
          set({
            grammarProgress: [...grammarProgress, {
              id: `gp_${Date.now()}`,
              grammarId,
              completed: score >= 80,
              attempts: 1,
              bestScore: score
            }]
          });
        }
      },
      unlockAchievement: (badgeId) => {
        const { achievements } = get();
        if (!achievements.find(a => a.badgeId === badgeId)) {
          set({
            achievements: [...achievements, { id: `ach_${Date.now()}`, badgeId, earnedAt: new Date().toISOString() }]
          });
        }
      },
      checkAchievements: () => {
        const { wordProgress, achievements, unlockAchievement } = get();
        const masteredWords = wordProgress.filter(w => w.status === 'mastered').length;
        const newAchievements: Achievement[] = [];

        badges.forEach(badge => {
          if (achievements.find(a => a.badgeId === badge.id)) return;

          let unlocked = false;
          switch (badge.condition) {
            case 'words_learned':
              if (masteredWords >= badge.requirement) unlocked = true;
              break;
          }

          if (unlocked) {
            unlockAchievement(badge.id);
            newAchievements.push({ id: `ach_${Date.now()}`, badgeId: badge.id, earnedAt: new Date().toISOString() });
          }
        });

        return newAchievements;
      },
      getCourseProgress: (courseId) => {
        return get().courseProgress.find(p => p.courseId === courseId);
      },
      getOverallProgress: () => {
        const { courseProgress, wordProgress } = get();
        if (courseProgress.length === 0 && wordProgress.length === 0) return 0;

        const courseWeight = 0.5;
        const wordWeight = 0.5;

        const avgCourseProgress = courseProgress.length > 0
          ? courseProgress.reduce((acc, p) => acc + p.progressPercent, 0) / courseProgress.length
          : 0;

        const masteredWords = wordProgress.filter(w => w.status === 'mastered').length;
        const wordProgressPercent = Math.min((masteredWords / 100) * 100, 100);

        return Math.round(avgCourseProgress * courseWeight + wordProgressPercent * wordWeight);
      },
      updateStreak: () => {
        const { user } = useAuthStore.getState();
        if (user) {
          const lastStudyDate = localStorage.getItem(`ukraine_learn_streak_${user.id}`);
          const today = new Date().toDateString();

          if (lastStudyDate === today) return;

          const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
          const newStreak = lastStudyDate === yesterday ? user.streakDays + 1 : 1;

          useAuthStore.getState().updateProfile({ streakDays: newStreak });
          localStorage.setItem(`ukraine_learn_streak_${user.id}`, today);
        }
      }
    }),
    { name: 'ukraine_learn_progress' }
  )
);

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: {
        theme: 'light',
        language: 'zh',
        dailyGoal: 30,
        notifications: true
      },
      setTheme: (theme) => set((state) => ({
        preferences: { ...state.preferences, theme }
      })),
      setLanguage: (language) => set((state) => ({
        preferences: { ...state.preferences, language }
      })),
      setDailyGoal: (goal) => set((state) => ({
        preferences: { ...state.preferences, dailyGoal: goal }
      })),
      setNotifications: (enabled) => set((state) => ({
        preferences: { ...state.preferences, notifications: enabled }
      }))
    }),
    { name: 'ukraine_learn_preferences' }
  )
);
