import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Volume2, RefreshCw, CheckCircle, XCircle, Play } from 'lucide-react';

interface SpeakingExercise {
  id: string;
  ukraine: string;
  chinese: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const exercises: SpeakingExercise[] = [
  { id: 's1', ukraine: 'Привіт', chinese: '你好', difficulty: 'easy' },
  { id: 's2', ukraine: 'Дякую', chinese: '谢谢', difficulty: 'easy' },
  { id: 's3', ukraine: 'Будь ласка', chinese: '请/不客气', difficulty: 'easy' },
  { id: 's4', ukraine: 'Мене звати...', chinese: '我的名字是...', difficulty: 'medium' },
  { id: 's5', ukraine: 'Я з України', chinese: '我来自乌克兰', difficulty: 'medium' },
  { id: 's6', ukraine: 'Доброго дня', chinese: '日安', difficulty: 'easy' },
  { id: 's7', ukraine: 'До побачення', chinese: '再见', difficulty: 'easy' },
  { id: 's8', ukraine: 'Як справи?', chinese: '最近怎么样?', difficulty: 'medium' },
  { id: 's9', ukraine: 'Розумію', chinese: '我明白', difficulty: 'medium' },
  { id: 's10', ukraine: 'Допоможіть, будь ласка', chinese: '请帮帮我', difficulty: 'hard' }
];

const difficultyColors = {
  easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  medium: 'bg-ukraine-yellow/20 text-amber-700',
  hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
};

export default function SpeakingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [sessions, setSessions] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const currentExercise = exercises[currentIndex];

  const speakText = (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uk-UA';
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  const playOriginal = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(currentExercise.ukraine);
    utterance.lang = 'uk-UA';
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const recognition = new (SpeechRecognition as new () => unknown)();
      (recognition as { lang: string }).lang = 'uk-UA';
      (recognition as { continuous: boolean }).continuous = false;
      (recognition as { interimResults: boolean }).interimResults = true;

      (recognition as { onresult: (event: unknown) => void }).onresult = (event: unknown) => {
        const e = event as { results: unknown[] };
        const result = e.results[e.results.length - 1] as { 0: { transcript: string } };
        setTranscript(result[0].transcript);
      };

      (recognition as { onend: () => void }).onend = () => {
        setIsRecording(false);
        calculateScore();
      };

      (recognition as { onerror: () => void }).onerror = () => {
        setIsRecording(false);
      };

      setTranscript('');
      setScore(null);
      setIsRecording(true);
      (recognition as { start: () => void }).start();
    } catch (error) {
      console.error('Speech recognition error:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const calculateScore = () => {
    const target = currentExercise.ukraine.toLowerCase().replace(/[.,!?]/g, '').trim();
    const result = transcript.toLowerCase().replace(/[.,!?]/g, '').trim();

    if (!result) {
      setScore(0);
      return;
    }

    let matches = 0;
    const targetWords = target.split(' ');
    const resultWords = result.split(' ');

    targetWords.forEach((word, index) => {
      if (resultWords[index] && resultWords[index].includes(word)) {
        matches++;
      }
    });

    const similarity = (matches / targetWords.length) * 100;
    setScore(Math.round(similarity));
    setSessions(s => s + 1);
  };

  const nextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setTranscript('');
    setScore(null);
  };

  const retry = () => {
    setTranscript('');
    setScore(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 头部 */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
          口语跟读
        </h1>
        <p className="text-slate-500">
          练习乌克兰语发音，提高口语流利度
        </p>
      </div>

      {/* 进度 */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>进度 {currentIndex + 1} / {exercises.length}</span>
          <span>练习次数: {sessions}</span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-midnight-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-ukraine-blue to-ukraine-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 主卡片 */}
      <motion.div
        className="card p-8 mb-8"
        key={currentExercise.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="text-center mb-8">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColors[currentExercise.difficulty]}`}>
            {currentExercise.difficulty === 'easy' ? '简单' : currentExercise.difficulty === 'medium' ? '中等' : '困难'}
          </span>

          <h2 className="text-4xl font-ukrainian font-bold text-slate-900 dark:text-white mt-6 mb-2">
            {currentExercise.ukraine}
          </h2>

          <p className="text-xl text-slate-500">
            {currentExercise.chinese}
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={playOriginal}
              disabled={isPlaying}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-ukraine-blue text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              <Volume2 className="w-5 h-5" />
              听发音
            </button>
            <button
              onClick={() => speakText(currentExercise.ukraine)}
              disabled={isSpeaking}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-midnight-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600 disabled:opacity-50 transition-colors"
            >
              <Play className="w-5 h-5" />
              跟读示范
            </button>
          </div>
        </div>

        {/* 录音区域 */}
        <div className="border-t border-b border-slate-200 dark:border-slate-700 py-8 my-6">
          <div className="text-center">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-ukraine-blue hover:bg-blue-600'
              }`}
            >
              {isRecording ? (
                <Square className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              {isRecording ? '点击停止录音...' : '点击开始录音'}
            </p>
          </div>

          {/* 录音结果 */}
          {transcript && (
            <motion.div
              className="mt-6 p-4 bg-slate-50 dark:bg-midnight-700/50 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm text-slate-500 mb-2">你的发音:</p>
              <p className="text-lg font-ukrainian text-slate-900 dark:text-white">
                {transcript}
              </p>
            </motion.div>
          )}

          {/* 评分 */}
          {score !== null && (
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
              <div className={`text-5xl font-bold mb-2 ${
                score >= 80
                  ? 'text-emerald-500'
                  : score >= 50
                  ? 'text-ukraine-yellow'
                  : 'text-red-500'
              }`}>
                {score}%
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                {score >= 80 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>很棒！发音很准确！</span>
                  </>
                ) : score >= 50 ? (
                  <>
                    <span className="text-ukraine-yellow">还不错，继续加油！</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span>需要多加练习</span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-between">
          <button
            onClick={retry}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-midnight-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            重试
          </button>
          <button
            onClick={nextExercise}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-ukraine-blue text-white hover:bg-blue-600 transition-colors"
          >
            {currentIndex < exercises.length - 1 ? '下一题' : '重新开始'}
          </button>
        </div>
      </motion.div>

      {/* 提示 */}
      <div className="text-center text-sm text-slate-400">
        <p>提示: 说话时尽量靠近麦克风，发音清晰可获得更高分数</p>
      </div>

      {!isSupported && (
        <div className="mt-8 card p-8 text-center">
          <Mic className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            浏览器不支持语音识别
          </h2>
          <p className="text-slate-500">
            请使用 Chrome、Edge 或 Safari 浏览器来使用口语跟读功能。
          </p>
        </div>
      )}
    </div>
  );
}
