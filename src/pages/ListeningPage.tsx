import { useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, Pause, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface ListeningMaterial {
  id: string;
  title: string;
  titleUk: string;
  description: string;
  level: string;
  duration: string;
  transcript: string;
  translation: string;
  questions: {
    question: string;
    questionUk: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const materials: ListeningMaterial[] = [
  {
    id: 'l1',
    title: '日常问候',
    titleUk: 'Повсякденні привітання',
    description: '学习乌克兰人日常问候的方式',
    level: 'A1',
    duration: '1:30',
    transcript: 'Привіт! Як справи? - Доброго дня! Дякую, добре. А ви? - Теж добре, дякую.',
    translation: '你好！最近怎么样？- 日安！谢谢，挺好的。您呢？- 也很好，谢谢。',
    questions: [
      {
        question: '他们用什么方式问候？',
        questionUk: 'Як вони віталися?',
        options: ['拥抱', '握手', '说"你好"', '亲吻'],
        correctAnswer: 2
      },
      {
        question: '对话中提到了几次"谢谢"？',
        questionUk: 'Скільки разів було сказано "дякую"?',
        options: ['1次', '2次', '3次', '0次'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l2',
    title: '自我介绍',
    titleUk: 'Знайомство',
    description: '学习如何介绍自己',
    level: 'A1',
    duration: '2:00',
    transcript: 'Мене звати Олена. Мені двадцять п\'ять років. Я з Києва. Я лікар.',
    translation: '我叫Olena。我25岁。我来自基辅。我是一名医生。',
    questions: [
      {
        question: '说话者的名字是什么？',
        questionUk: 'Як звати спікера?',
        options: ['Андрій', 'Олена', 'Іван', 'Марія'],
        correctAnswer: 1
      },
      {
        question: '说话者是什么职业？',
        questionUk: 'Хто спікер за професією?',
        options: ['老师', '律师', '医生', '工程师'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l3',
    title: '在咖啡馆',
    titleUk: 'У кафе',
    description: '在咖啡馆点餐的对话',
    level: 'A2',
    duration: '2:30',
    transcript: 'Доброго дня! Що ви бажаєте? - Каву, будь ласка. - Яку каву? - Еспресо, дякую.',
    translation: '日安！您想要什么？- 咖啡，谢谢。- 什么样的咖啡？- 浓缩咖啡，谢谢。',
    questions: [
      {
        question: '说话者要了什么？',
        questionUk: 'Що замовив спікер?',
        options: ['茶', '水', '咖啡', '果汁'],
        correctAnswer: 2
      },
      {
        question: '他们在哪里？',
        questionUk: 'Де вони знаходяться?',
        options: ['餐厅', '咖啡馆', '商店', '学校'],
        correctAnswer: 1
      }
    ]
  }
];

export default function ListeningPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentMaterial = materials[currentIndex];

  const playAudio = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentMaterial.transcript);
    utterance.lang = 'uk-UA';
    utterance.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const submitAnswers = () => {
    let correct = 0;
    currentMaterial.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    setScore(Math.round((correct / currentMaterial.questions.length) * 100));
    setShowResult(true);
  };

  const nextMaterial = () => {
    if (currentIndex < materials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setAnswers([]);
    setShowResult(false);
    setScore(0);
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const resetMaterial = () => {
    setAnswers([]);
    setShowResult(false);
    setScore(0);
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 头部 */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
          听力训练
        </h1>
        <p className="text-slate-500">
          提高乌克兰语听力理解能力
        </p>
      </div>

      {/* 进度 */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>材料 {currentIndex + 1} / {materials.length}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            currentMaterial.level === 'A1' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
          }`}>
            {currentMaterial.level}
          </span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-midnight-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / materials.length) * 100}%` }}
          />
        </div>
      </div>

      <motion.div
        className="card p-6 md:p-8 mb-8"
        key={currentMaterial.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 材料信息 */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {currentMaterial.title}
            </h2>
            <p className="text-sm text-slate-500 font-ukrainian mt-1">
              {currentMaterial.titleUk}
            </p>
            <p className="text-sm text-slate-400 mt-2">
              {currentMaterial.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Headphones className="w-4 h-4" />
            {currentMaterial.duration}
          </div>
        </div>

        {/* 播放区域 */}
        <div className="bg-slate-50 dark:bg-midnight-700/50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={playAudio}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-ukraine-blue hover:bg-blue-600'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            <span className="text-slate-600 dark:text-slate-400">
              {isPlaying ? '播放中...' : '点击播放听力内容'}
            </span>
          </div>
        </div>

        {/* 原文和翻译 */}
        <div className="mb-8 space-y-4">
          <div className="p-4 bg-ukraine-blue/5 dark:bg-ukraine-blue/10 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">原文:</p>
            <p className="font-ukrainian text-slate-900 dark:text-white">
              {currentMaterial.transcript}
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-midnight-700/50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">翻译:</p>
            <p className="text-slate-700 dark:text-slate-300">
              {currentMaterial.translation}
            </p>
          </div>
        </div>

        {/* 题目 */}
        <div className="space-y-6">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            听力理解测试
          </h3>

          {currentMaterial.questions.map((q, qi) => (
            <div key={qi} className="p-4 bg-slate-50 dark:bg-midnight-700/50 rounded-xl">
              <p className="font-medium text-slate-900 dark:text-white mb-3">
                {qi + 1}. {q.question}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((option, oi) => {
                  const isSelected = answers[qi] === oi;
                  const isCorrect = showResult && oi === q.correctAnswer;
                  const isWrong = showResult && isSelected && oi !== q.correctAnswer;

                  return (
                    <button
                      key={oi}
                      onClick={() => !showResult && handleAnswer(qi, oi)}
                      disabled={showResult}
                      className={`p-3 rounded-lg text-left text-sm transition-all ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-2 border-emerald-500'
                          : isWrong
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-2 border-red-500'
                          : isSelected
                          ? 'bg-ukraine-blue/10 text-ukraine-blue border-2 border-ukraine-blue'
                          : 'bg-white dark:bg-midnight-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-ukraine-blue'
                      }`}
                    >
                      {option}
                      {isCorrect && <CheckCircle className="w-4 h-4 inline ml-2" />}
                      {isWrong && <XCircle className="w-4 h-4 inline ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 结果 */}
        {showResult && (
          <motion.div
            className={`mt-6 p-6 rounded-xl text-center ${
              score >= 80
                ? 'bg-emerald-50 dark:bg-emerald-900/20'
                : score >= 50
                ? 'bg-ukraine-yellow/10'
                : 'bg-red-50 dark:bg-red-900/20'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={`text-4xl font-bold mb-2 ${
              score >= 80
                ? 'text-emerald-500'
                : score >= 50
                ? 'text-ukraine-yellow'
                : 'text-red-500'
            }`}>
              {score}%
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {score >= 80 ? '太棒了！完全理解！' : score >= 50 ? '不错，再接再厉！' : '需要多听几遍'}
            </p>
          </motion.div>
        )}

        {/* 操作按钮 */}
        <div className="flex justify-between mt-8">
          <button
            onClick={resetMaterial}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-midnight-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            重置
          </button>

          {!showResult ? (
            <button
              onClick={submitAnswers}
              disabled={answers.some(a => a === null)}
              className="btn-primary disabled:opacity-50"
            >
              提交答案
            </button>
          ) : (
            <button
              onClick={nextMaterial}
              className="btn-primary"
            >
              {currentIndex < materials.length - 1 ? '下一题' : '重新开始'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
