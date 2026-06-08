import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Volume2,
  RotateCcw,
  Check,
  X,
  Heart,
  SkipForward
} from 'lucide-react';
import { useProgressStore } from '../stores';
import { initialWords } from '../data/initialData';

export default function WordsPage() {
  const { addWordProgress } = useProgressStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mode, setMode] = useState<'learn' | 'test'>('learn');
  const [testAnswer, setTestAnswer] = useState('');
  const [testResult, setTestResult] = useState<'correct' | 'wrong' | null>(null);

  const currentWord = initialWords[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTestAnswer('');
    setTestResult(null);
    if (currentIndex < initialWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setTestAnswer('');
    setTestResult(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleKnow = () => {
    if (!learnedWords.includes(currentWord.id)) {
      setLearnedWords([...learnedWords, currentWord.id]);
      addWordProgress(currentWord.id, 'learning');
    }
    handleNext();
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleFavorite = () => {
    if (favorites.includes(currentWord.id)) {
      setFavorites(favorites.filter(id => id !== currentWord.id));
    } else {
      setFavorites([...favorites, currentWord.id]);
    }
  };

  const handleTestSubmit = () => {
    const isCorrect = testAnswer.toLowerCase().trim() === currentWord.ukraine.toLowerCase();
    setTestResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      if (!learnedWords.includes(currentWord.id)) {
        setLearnedWords([...learnedWords, currentWord.id]);
        addWordProgress(currentWord.id, 'mastered');
      }
    }
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.ukraine);
    utterance.lang = 'uk-UA';
    speechSynthesis.speak(utterance);
  };

  const progress = (currentIndex / initialWords.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            单词记忆
          </h1>
          <p className="text-slate-500">
            学习乌克兰语词汇 ({currentIndex + 1} / {initialWords.length})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(mode === 'learn' ? 'test' : 'learn')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'learn'
                ? 'bg-ukraine-blue text-white'
                : 'bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {mode === 'learn' ? '学习模式' : '测试模式'}
          </button>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-8">
        <div className="h-2 bg-slate-200 dark:bg-midnight-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-ukraine-blue to-ukraine-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 单词卡片 */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="relative"
          >
            <div
              className="relative h-80 cursor-pointer perspective-1000"
              onClick={() => mode === 'learn' && setIsFlipped(!isFlipped)}
            >
              <div className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* 正面 */}
                <div className={`absolute inset-0 backface-hidden card p-8 flex flex-col items-center justify-center ${mode === 'test' ? 'pointer-events-none' : ''}`}>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                    currentWord.level === 'A1' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    currentWord.level === 'A2' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {currentWord.level}
                  </span>

                  <h2 className="text-5xl font-ukrainian font-bold text-slate-900 dark:text-white mb-4">
                    {currentWord.ukraine}
                  </h2>

                  <button
                    onClick={(e) => { e.stopPropagation(); speakWord(); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                    发音
                  </button>

                  <p className="text-sm text-slate-400 mt-6">
                    {mode === 'learn' ? '点击卡片查看释义' : ''}
                  </p>
                </div>

                {/* 背面 */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 card p-8 flex flex-col items-center justify-center bg-gradient-to-br from-ukraine-blue to-blue-600 text-white">
                  <p className="text-4xl font-bold mb-4">{currentWord.chinese}</p>
                  <p className="text-lg opacity-80 mb-2">{currentWord.partOfSpeech}</p>
                  <p className="text-sm opacity-60 font-ukrainian">[{currentWord.pronunciation}]</p>

                  <div className="mt-6 p-4 bg-white/10 rounded-xl w-full">
                    <p className="text-sm opacity-80 mb-1">例句:</p>
                    <p className="font-ukrainian">{currentWord.example}</p>
                    <p className="text-sm opacity-70 mt-1">{currentWord.exampleChinese}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 测试模式输入 */}
      {mode === 'test' && !testResult && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-center text-slate-600 dark:text-slate-300 mb-4">
            输入正确的乌克兰语单词:
          </p>
          <p className="text-center text-2xl font-bold text-ukraine-blue mb-4">
            {currentWord.chinese}
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="text"
              value={testAnswer}
              onChange={(e) => setTestAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTestSubmit()}
              className="input-field flex-1"
              placeholder="输入乌克兰语..."
            />
            <button onClick={handleTestSubmit} className="btn-primary">
              确认
            </button>
          </div>
        </motion.div>
      )}

      {/* 测试结果 */}
      {testResult && (
        <motion.div
          className={`mb-8 p-6 rounded-xl text-center ${
            testResult === 'correct'
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className={`text-4xl mb-3 ${testResult === 'correct' ? 'text-emerald-500' : 'text-red-500'}`}>
            {testResult === 'correct' ? <Check className="w-12 h-12 mx-auto" /> : <X className="w-12 h-12 mx-auto" />}
          </div>
          <p className={`text-xl font-bold mb-2 ${testResult === 'correct' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {testResult === 'correct' ? '正确！' : '错误'}
          </p>
          {testResult === 'wrong' && (
            <p className="text-slate-600 dark:text-slate-400">
              正确答案: <span className="font-ukrainian font-bold text-lg">{currentWord.ukraine}</span>
            </p>
          )}
          <button onClick={handleNext} className="btn-primary mt-4">
            下一题
          </button>
        </motion.div>
      )}

      {/* 操作按钮 */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-4 rounded-xl bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleSkip}
          className="p-4 rounded-xl bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600 transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </button>

        <button
          onClick={handleFavorite}
          className={`p-4 rounded-xl transition-colors ${
            favorites.includes(currentWord.id)
              ? 'bg-red-100 dark:bg-red-900/20 text-red-500'
              : 'bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600'
          }`}
        >
          <Heart className={`w-6 h-6 ${favorites.includes(currentWord.id) ? 'fill-current' : ''}`} />
        </button>

        {mode === 'learn' && (
          <>
            <button
              onClick={() => { setIsFlipped(true); }}
              className="p-4 rounded-xl bg-ukraine-yellow text-slate-900 hover:bg-yellow-400 transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button
              onClick={handleKnow}
              className="px-8 py-4 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <Check className="w-6 h-6" />
              认识
            </button>
          </>
        )}

        <button
          onClick={handleNext}
          className="p-4 rounded-xl bg-ukraine-blue text-white hover:bg-blue-600 transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* 统计 */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="card p-4">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{initialWords.length}</p>
          <p className="text-sm text-slate-500">总单词</p>
        </div>
        <div className="card p-4">
          <p className="text-3xl font-bold text-emerald-500">{learnedWords.length}</p>
          <p className="text-sm text-slate-500">已学习</p>
        </div>
        <div className="card p-4">
          <p className="text-3xl font-bold text-red-500">{favorites.length}</p>
          <p className="text-sm text-slate-500">收藏</p>
        </div>
      </div>
    </div>
  );
}
