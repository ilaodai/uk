import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ChevronRight, Lightbulb, Volume2 } from 'lucide-react';

const grammarLessons = [
  {
    id: 'g1',
    title: '乌克兰语字母与发音',
    titleUk: 'Українська абетка та вимова',
    description: '学习乌克兰语33个字母的发音规则',
    level: 'A1',
    content: `乌克兰语字母表包含33个字母，每个字母都有固定的发音。

**元音:** а, е, є, и, і, о, у, ю, я
**辅音:** б, в, г, ґ, д, ж, з, к, л, м, н, п, р, с, т, ф, х, ц, ч, ш, щ
**特殊字母:** ь (软符号)

**重要规则:**
1. 乌克兰语是拼音文字，发音与拼写基本一致
2. 字母 "г" 发 [h] 音（如 "голова" = [holova]）
3. 字母组合 "дз" 发 [dz] 音，"дждж" 发 [j] 音`,
    examples: [
      { uk: 'А - як "а" в слові "апельсин"', zh: 'A - 像"啊"' },
      { uk: 'Б - як "б"', zh: 'Б - 像"波"' },
      { uk: 'В - як "в"', zh: 'В - 像"夫"' }
    ]
  },
  {
    id: 'g2',
    title: '基本问候语',
    titleUk: 'Основні привітання',
    description: '学习日常问候和告别用语',
    level: 'A1',
    content: `**常用问候语:**

1. **Привіт** - 你好（非正式）
2. **Доброго дня** - 美好的一天（白天）
3. **Добрий ранок** - 早上好
4. **Добрий вечір** - 晚上好
5. **До побачення** - 再见
6. **На все добре** - 一切顺利（告别）

**回应方式:**
- Привіт! / Добрий день!
- До побачення! / Бувайте!
- Все найкращого! (祝一切顺利)`,
    examples: [
      { uk: 'Привіт, як справи?', zh: '你好，最近怎么样？' },
      { uk: 'Доброго дня! Як ви?', zh: '日安！您好吗？' },
      { uk: 'До побачення! До зустрічі!', zh: '再见！期待再会！' }
    ]
  },
  {
    id: 'g3',
    title: '自我介绍',
    titleUk: 'Знайомство',
    description: '学习如何用乌克兰语介绍自己',
    level: 'A1',
    content: `**基本表达:**

1. **Мене звати...** - 我的名字是...
2. **Мені ... років** - 我...岁
3. **Я з...** - 我来自...
4. **Я працюю як...** - 我是...（职业）
5. **Моя сім'я...** - 我的家人...

**示例对话:**
- Привіт! Мене звати Олена. Мені 25 років. Я з Києва.
你好！我叫Olena。我25岁。我来自基辅。`,
    examples: [
      { uk: 'Мене звати Андрій.', zh: '我的名字是Andriy。' },
      { uk: 'Мені тридцять років.', zh: '我三十岁。' },
      { uk: 'Я з України.', zh: '我来自乌克兰。' }
    ]
  },
  {
    id: 'g4',
    title: '乌克兰语名词的性',
    titleUk: 'Рід іменників',
    description: '学习乌克兰语名词的阳性、阴性和中性',
    level: 'A1',
    content: `乌克兰语名词分为三种性：

**阳性（чоловічий рід）:**
- 通常以辅音结尾: дім (房子), стіл (桌子), кіт (猫)
- 部分以 -р 结尾: директор, інженер

**阴性（жіночий рід）:**
- 通常以 -а, -я 结尾: кімната (房间), книга (书), мія (我的)
- 以 -ь 结尾: ніч (夜晚), любов (爱)

**中性（середній рід）:**
- 以 -о, -е, -я 结尾: вікно (窗户), море (海), ім'я (名字)

**记忆技巧:**
大多数指男性的名词是阳性（如 "чоловік" 男人）
大多数指女性的名词是阴性（如 "жінка" 女人）`,
    examples: [
      { uk: 'Дім (м) - 房子', zh: '阳性名词' },
      { uk: 'Кімната (ж) - 房间', zh: '阴性名词' },
      { uk: 'Вікно (с) - 窗户', zh: '中性名词' }
    ]
  },
  {
    id: 'g5',
    title: '动词 "бути" (是/在)',
    titleUk: 'Дієслово "бути"',
    description: '学习乌克兰语中最重要的动词之一',
    level: 'A1',
    content: `**动词 "бути" (to be) 的变位:**

| 人称 | 现在时 | 过去时 |
|------|--------|--------|
| Я | є | був/була |
| Ти | є | був/була |
| Він/Вона/Воно | є | був/була/було |
| Ми | є | були |
| Ви | є | були |
| Вони | є | були |

**用法:**
1. 表示存在: Я вдома. (我在家)
2. 表示职业: Він лікар. (他是医生)
3. 表示状态: Вона щаслива. (她很幸福)

**注意:** 在现在时中，"є" 通常可以省略！`,
    examples: [
      { uk: 'Я студент. = Я є студент.', zh: '我是学生。' },
      { uk: 'Вона вдома.', zh: '她在家。' },
      { uk: 'Ми були в Києві.', zh: '我们在基辅。' }
    ]
  }
];

export default function GrammarPage() {
  const [selectedLesson, setSelectedLesson] = useState(grammarLessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showExamples, setShowExamples] = useState(false);

  const handleComplete = () => {
    if (!completedLessons.includes(selectedLesson.id)) {
      setCompletedLessons([...completedLessons, selectedLesson.id]);
    }
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uk-UA';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
          语法练习
        </h1>
        <p className="text-slate-500">
          系统学习乌克兰语语法规则
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* 左侧课程列表 */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card p-4">
            <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-ukraine-blue" />
              语法课程
            </h2>
            <div className="space-y-2">
              {grammarLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => { setSelectedLesson(lesson); setShowExamples(false); }}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedLesson.id === lesson.id
                      ? 'bg-ukraine-blue text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-midnight-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{lesson.title}</span>
                    {completedLessons.includes(lesson.id) && (
                      <CheckCircle className={`w-4 h-4 ${selectedLesson.id === lesson.id ? 'text-white' : 'text-emerald-500'}`} />
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${selectedLesson.id === lesson.id ? 'text-white/70' : 'text-slate-400'}`}>
                    {lesson.level} · {lesson.titleUk}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 右侧内容区 */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card p-6 md:p-8">
            {/* 标题 */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${
                  selectedLesson.level === 'A1' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {selectedLesson.level}
                </span>
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-3">
                  {selectedLesson.title}
                </h2>
                <p className="text-slate-500 font-ukrainian mt-1">
                  {selectedLesson.titleUk}
                </p>
              </div>
              <button
                onClick={() => speakText(selectedLesson.content)}
                className="p-3 rounded-xl bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* 内容 */}
            <div className="prose dark:prose-invert max-w-none mb-8">
              {selectedLesson.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {paragraph.replace(/\*\*/g, '')}
                    </strong>
                  ) : paragraph.startsWith('|') ? (
                    <span className="font-ukrainian">{paragraph}</span>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>

            {/* 例句 */}
            <div className="mb-8">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="flex items-center gap-2 text-ukraine-blue font-semibold mb-4"
              >
                <Lightbulb className="w-5 h-5" />
                例句展示
                <ChevronRight className={`w-4 h-4 transition-transform ${showExamples ? 'rotate-90' : ''}`} />
              </button>

              {showExamples && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  {selectedLesson.examples.map((example, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 dark:bg-midnight-700/50 rounded-xl"
                    >
                      <p className="font-ukrainian text-slate-900 dark:text-white mb-1">
                        {example.uk}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">{example.zh}</p>
                        <button
                          onClick={() => speakText(example.uk)}
                          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-midnight-600 text-slate-400"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* 完成按钮 */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
              {completedLessons.includes(selectedLesson.id) ? (
                <div className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">已完成</span>
                </div>
              ) : (
                <div />
              )}

              <button
                onClick={handleComplete}
                className="btn-primary flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                完成本课
              </button>
            </div>
          </div>

          {/* 导航 */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                const currentIndex = grammarLessons.findIndex(l => l.id === selectedLesson.id);
                if (currentIndex > 0) {
                  setSelectedLesson(grammarLessons[currentIndex - 1]);
                }
              }}
              disabled={grammarLessons.findIndex(l => l.id === selectedLesson.id) === 0}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-midnight-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-midnight-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              上一课
            </button>
            <button
              onClick={() => {
                const currentIndex = grammarLessons.findIndex(l => l.id === selectedLesson.id);
                if (currentIndex < grammarLessons.length - 1) {
                  setSelectedLesson(grammarLessons[currentIndex + 1]);
                }
              }}
              disabled={grammarLessons.findIndex(l => l.id === selectedLesson.id) === grammarLessons.length - 1}
              className="px-4 py-2 rounded-lg bg-ukraine-blue text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              下一课
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
