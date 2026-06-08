import type { Course, Word, Badge, Post } from '../types';

export const initialCourses: Course[] = [
  {
    id: 'a1-basics',
    title: 'A1 - 基础乌克兰语',
    titleUk: 'A1 - Базовий український',
    description: '从零开始学习乌克兰语发音和日常用语',
    level: 'A1',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
    totalLessons: 8,
    estimatedMinutes: 120,
    lessons: [
      {
        id: 'a1-1',
        courseId: 'a1-basics',
        title: '乌克兰语字母表',
        titleUk: 'Українська абетка',
        order: 1,
        content: '学习乌克兰语字母表，共33个字母。',
        contentUk: 'Вивчаємо українську абетку, 33 літери.',
        estimatedMinutes: 15,
        exercises: [
          {
            id: 'a1-1-e1',
            lessonId: 'a1-1',
            type: 'multiple_choice',
            question: '乌克兰语字母表有多少个字母？',
            questionUk: 'Скільки літер в українській абетці?',
            options: ['26', '33', '30', '36'],
            optionsUk: ['26', '33', '30', '36'],
            correctAnswer: '33',
            explanation: '乌克兰语字母表有33个字母。',
            explanationUk: 'В українській абетці 33 літери.'
          },
          {
            id: 'a1-1-e2',
            lessonId: 'a1-1',
            type: 'multiple_choice',
            question: '"А" 在乌克兰语中怎么发音？',
            questionUk: 'Як вимовляється "А" в українській?',
            options: ['a', 'o', 'e', 'i'],
            optionsUk: ['a', 'o', 'e', 'i'],
            correctAnswer: 'a',
            explanation: '乌克兰语的 "А" 发 [a] 音，类似于汉语的 "啊"。',
            explanationUk: 'Українське "А" вимовляється як [a].'
          }
        ]
      },
      {
        id: 'a1-2',
        courseId: 'a1-basics',
        title: '问候与介绍',
        titleUk: 'Вітання та знайомство',
        order: 2,
        content: '学习如何用乌克兰语打招呼和自我介绍。',
        contentUk: 'Вчимося вітатися та представлятися українською.',
        estimatedMinutes: 15,
        exercises: [
          {
            id: 'a1-2-e1',
            lessonId: 'a1-2',
            type: 'multiple_choice',
            question: '"你好" 用乌克兰语怎么说？',
            questionUk: 'Як сказати "привіт" українською?',
            options: ['Привіт', 'До побачення', 'Дякую', 'Будь ласка'],
            optionsUk: ['Привіт', 'До побачення', 'Дякую', 'Будь ласка'],
            correctAnswer: 'Привіт',
            explanation: '"Привіт" 是乌克兰语中非正式的 "你好"。',
            explanationUk: '"Привіт" - неформальне вітання українською.'
          },
          {
            id: 'a1-2-e2',
            lessonId: 'a1-2',
            type: 'fill_blank',
            question: 'Мене звати ___ (我叫...)',
            questionUk: 'Мене звати ___',
            correctAnswer: 'Андрій',
            explanation: 'Мене звати + 名字，表示 "我的名字是..."',
            explanationUk: 'Мене звати + ім\'я означає "моє ім\'я..."'
          }
        ]
      },
      {
        id: 'a1-3',
        courseId: 'a1-basics',
        title: '数字1-10',
        titleUk: 'Числа 1-10',
        order: 3,
        content: '学习乌克兰语数字1到10。',
        contentUk: 'Вчимо числа від 1 до 10.',
        estimatedMinutes: 12,
        exercises: [
          {
            id: 'a1-3-e1',
            lessonId: 'a1-3',
            type: 'multiple_choice',
            question: '"один" 是什么意思？',
            questionUk: 'Що означає "один"?',
            options: ['1', '2', '3', '4'],
            optionsUk: ['1', '2', '3', '4'],
            correctAnswer: '1',
            explanation: 'один = 一 (1)',
            explanationUk: 'один = 1'
          }
        ]
      },
      {
        id: 'a1-4',
        courseId: 'a1-basics',
        title: '家庭成员',
        titleUk: 'Члени сім\'ї',
        order: 4,
        content: '学习乌克兰语家庭成员的称呼。',
        contentUk: 'Вчимо назви членів сім\'ї.',
        estimatedMinutes: 15,
        exercises: []
      },
      {
        id: 'a1-5',
        courseId: 'a1-basics',
        title: '颜色',
        titleUk: 'Кольори',
        order: 5,
        content: '学习乌克兰语基本颜色词汇。',
        contentUk: 'Вчимо основні кольори.',
        estimatedMinutes: 12,
        exercises: []
      },
      {
        id: 'a1-6',
        courseId: 'a1-basics',
        title: '食物与饮料',
        titleUk: 'Їжа та напої',
        order: 6,
        content: '学习乌克兰语食物和饮料的表达。',
        contentUk: 'Вчимо слова про їжу та напої.',
        estimatedMinutes: 15,
        exercises: []
      },
      {
        id: 'a1-7',
        courseId: 'a1-basics',
        title: '时间与日期',
        titleUk: 'Час та дата',
        order: 7,
        content: '学习如何用乌克兰语表达时间和日期。',
        contentUk: 'Вчимося говорити про час та дату.',
        estimatedMinutes: 18,
        exercises: []
      },
      {
        id: 'a1-8',
        courseId: 'a1-basics',
        title: 'A1 综合复习',
        titleUk: 'A1 Підсумковий повтор',
        order: 8,
        content: '回顾A1级别学过的所有内容。',
        contentUk: 'Повторюємо все, що вивчили на рівні A1.',
        estimatedMinutes: 20,
        exercises: []
      }
    ]
  },
  {
    id: 'a2-everyday',
    title: 'A2 - 日常乌克兰语',
    titleUk: 'A2 - Побутовий український',
    description: '学习日常生活场景中的乌克兰语表达',
    level: 'A2',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    totalLessons: 10,
    estimatedMinutes: 180,
    lessons: []
  },
  {
    id: 'b1-intermediate',
    title: 'B1 - 中级乌克兰语',
    titleUk: 'B1 - Середній український',
    description: '提升乌克兰语交流能力',
    level: 'B1',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    totalLessons: 12,
    estimatedMinutes: 240,
    lessons: []
  },
  {
    id: 'b2-advanced',
    title: 'B2 - 高级乌克兰语',
    titleUk: 'B2 - Просунутий український',
    description: '掌握复杂的乌克兰语表达',
    level: 'B2',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    totalLessons: 15,
    estimatedMinutes: 300,
    lessons: []
  },
  {
    id: 'c1-proficient',
    title: 'C1 - 精通级乌克兰语',
    titleUk: 'C1 - Вдосконалений український',
    description: '达到接近母语水平的乌克兰语能力',
    level: 'C1',
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&h=300&fit=crop',
    totalLessons: 18,
    estimatedMinutes: 360,
    lessons: []
  },
  {
    id: 'c2-mastery',
    title: 'C2 - 大师级乌克兰语',
    titleUk: 'C2 - Майстерний український',
    description: '精通乌克兰语，包括方言和俚语',
    level: 'C2',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop',
    totalLessons: 20,
    estimatedMinutes: 400,
    lessons: []
  }
];

export const initialWords: Word[] = [
  {
    id: 'w1',
    ukraine: 'Привіт',
    pronunciation: 'pry-vit',
    chinese: '你好',
    partOfSpeech: '感叹词',
    example: 'Привіт, як справи?',
    exampleUk: 'Привіт, як справи?',
    exampleChinese: '你好，最近怎么样？',
    level: 'A1',
    category: 'greetings'
  },
  {
    id: 'w2',
    ukraine: 'Дякую',
    pronunciation: 'dya-ku',
    chinese: '谢谢',
    partOfSpeech: '感叹词',
    example: 'Дякую за допомогу.',
    exampleUk: 'Дякую за допомогу.',
    exampleChinese: '谢谢你的帮助。',
    level: 'A1',
    category: 'greetings'
  },
  {
    id: 'w3',
    ukraine: 'Будь ласка',
    pronunciation: 'bud las-ka',
    chinese: '请/不客气',
    partOfSpeech: '感叹词',
    example: 'Будь ласка, сідайте.',
    exampleUk: 'Будь ласка, сідайте.',
    exampleChinese: '请坐。',
    level: 'A1',
    category: 'greetings'
  },
  {
    id: 'w4',
    ukraine: 'Так',
    pronunciation: 'tak',
    chinese: '是',
    partOfSpeech: '副词',
    example: 'Так, я розумію.',
    exampleUk: 'Так, я розумію.',
    exampleChinese: '是的，我明白了。',
    level: 'A1',
    category: 'basics'
  },
  {
    id: 'w5',
    ukraine: 'Ні',
    pronunciation: 'ni',
    chinese: '不/不是',
    partOfSpeech: '副词',
    example: 'Ні, дякую.',
    exampleUk: 'Ні, дякую.',
    exampleChinese: '不，谢谢。',
    level: 'A1',
    category: 'basics'
  },
  {
    id: 'w6',
    ukraine: 'Мене звати',
    pronunciation: 'me-ne zva-ty',
    chinese: '我的名字是...',
    partOfSpeech: '短语',
    example: 'Мене звати Олена.',
    exampleUk: 'Мене звати Олена.',
    exampleChinese: '我的名字是Olena。',
    level: 'A1',
    category: 'introduction'
  },
  {
    id: 'w7',
    ukraine: 'Як справи?',
    pronunciation: 'yak spra-vy?',
    chinese: '最近怎么样？',
    partOfSpeech: '短语',
    example: 'Привіт! Як справи?',
    exampleUk: 'Привіт! Як справи?',
    exampleChinese: '你好！最近怎么样？',
    level: 'A1',
    category: 'greetings'
  },
  {
    id: 'w8',
    ukraine: 'До побачення',
    pronunciation: 'do po-ba-chen-nya',
    chinese: '再见',
    partOfSpeech: '感叹词',
    example: 'До побачення! До зустрічі!',
    exampleUk: 'До побачення! До зустрічі!',
    exampleChinese: '再见！希望再见到你！',
    level: 'A1',
    category: 'greetings'
  },
  {
    id: 'w9',
    ukraine: 'Вода',
    pronunciation: 'vo-da',
    chinese: '水',
    partOfSpeech: '名词',
    example: 'Я хочу води.',
    exampleUk: 'Я хочу води.',
    exampleChinese: '我想要水。',
    level: 'A1',
    category: 'food'
  },
  {
    id: 'w10',
    ukraine: 'Хліб',
    pronunciation: 'khlib',
    chinese: '面包',
    partOfSpeech: '名词',
    example: 'Свіжий хліб дуже смачний.',
    exampleUk: 'Свіжий хліб дуже смачний.',
    exampleChinese: '新鲜的面包很好吃。',
    level: 'A1',
    category: 'food'
  },
  {
    id: 'w11',
    ukraine: 'Молоко',
    pronunciation: 'mo-lo-ko',
    chinese: '牛奶',
    partOfSpeech: '名词',
    example: 'Молоко свіже?',
    exampleUk: 'Молоко свіже?',
    exampleChinese: '牛奶新鲜吗？',
    level: 'A1',
    category: 'food'
  },
  {
    id: 'w12',
    ukraine: 'Яблуко',
    pronunciation: 'yab-lo-ko',
    chinese: '苹果',
    partOfSpeech: '名词',
    example: 'Яблуко солодке.',
    exampleUk: 'Яблуко солодке.',
    exampleChinese: '苹果很甜。',
    level: 'A1',
    category: 'food'
  },
  {
    id: 'w13',
    ukraine: 'Книга',
    pronunciation: 'kny-ha',
    chinese: '书',
    partOfSpeech: '名词',
    example: 'Ця книга цікава.',
    exampleUk: 'Ця книга цікава.',
    exampleChinese: '这本书很有趣。',
    level: 'A1',
    category: 'objects'
  },
  {
    id: 'w14',
    ukraine: 'Будинок',
    pronunciation: 'bu-dy-nok',
    chinese: '房子',
    partOfSpeech: '名词',
    example: 'Мій будинок великий.',
    exampleUk: 'Мій будинок великий.',
    exampleChinese: '我的房子很大。',
    level: 'A1',
    category: 'places'
  },
  {
    id: 'w15',
    ukraine: 'Автомобіль',
    pronunciation: 'av-to-mo-bil',
    chinese: '汽车',
    partOfSpeech: '名词',
    example: 'Новий автомобіль.',
    exampleUk: 'Новий автомобіль.',
    exampleChinese: '新车。',
    level: 'A1',
    category: 'objects'
  },
  {
    id: 'w16',
    ukraine: 'Сьогодні',
    pronunciation: 'syo-hod-ni',
    chinese: '今天',
    partOfSpeech: '副词',
    example: 'Сьогодні гарна погода.',
    exampleUk: 'Сьогодні гарна погода.',
    exampleChinese: '今天天气很好。',
    level: 'A1',
    category: 'time'
  },
  {
    id: 'w17',
    ukraine: 'Завтра',
    pronunciation: 'zav-tra',
    chinese: '明天',
    partOfSpeech: '副词',
    example: 'Завтра буде дощ.',
    exampleUk: 'Завтра буде дощ.',
    exampleChinese: '明天会下雨。',
    level: 'A1',
    category: 'time'
  },
  {
    id: 'w18',
    ukraine: 'Вчора',
    pronunciation: 'vcho-ra',
    chinese: '昨天',
    partOfSpeech: '副词',
    example: 'Вчора я був у театрі.',
    exampleUk: 'Вчора я був у театрі.',
    exampleChinese: '昨天我去了剧院。',
    level: 'A1',
    category: 'time'
  },
  {
    id: 'w19',
    ukraine: 'Мама',
    pronunciation: 'ma-ma',
    chinese: '妈妈',
    partOfSpeech: '名词',
    example: 'Моя мама лікар.',
    exampleUk: 'Моя мама лікар.',
    exampleChinese: '我妈妈是医生。',
    level: 'A1',
    category: 'family'
  },
  {
    id: 'w20',
    ukraine: 'Тато',
    pronunciation: 'ta-to',
    chinese: '爸爸',
    partOfSpeech: '名词',
    example: 'Мій тато працює інженером.',
    exampleUk: 'Мій тато працює інженером.',
    exampleChinese: '我爸爸是工程师。',
    level: 'A1',
    category: 'family'
  },
  {
    id: 'w21',
    ukraine: 'Синій',
    pronunciation: 'sy-niy',
    chinese: '蓝色的',
    partOfSpeech: '形容词',
    example: 'Сині очі.',
    exampleUk: 'Сині очі.',
    exampleChinese: '蓝色的眼睛。',
    level: 'A1',
    category: 'colors'
  },
  {
    id: 'w22',
    ukraine: 'Червоний',
    pronunciation: 'cher-vo-niy',
    chinese: '红色的',
    partOfSpeech: '形容词',
    example: 'Червона троянда.',
    exampleUk: 'Червона троянда.',
    exampleChinese: '红色的玫瑰。',
    level: 'A1',
    category: 'colors'
  },
  {
    id: 'w23',
    ukraine: 'Один',
    pronunciation: 'o-dyn',
    chinese: '一',
    partOfSpeech: '数词',
    example: 'Один день.',
    exampleUk: 'Один день.',
    exampleChinese: '一天。',
    level: 'A1',
    category: 'numbers'
  },
  {
    id: 'w24',
    ukraine: 'Два',
    pronunciation: 'dva',
    chinese: '二',
    partOfSpeech: '数词',
    example: 'Два тижні.',
    exampleUk: 'Два тижні.',
    exampleChinese: '两周。',
    level: 'A1',
    category: 'numbers'
  },
  {
    id: 'w25',
    ukraine: 'Три',
    pronunciation: 'try',
    chinese: '三',
    partOfSpeech: '数词',
    example: 'Три рази.',
    exampleUk: 'Три рази.',
    exampleChinese: '三次。',
    level: 'A1',
    category: 'numbers'
  }
];

export const badges: Badge[] = [
  {
    id: 'first_lesson',
    name: '初学者',
    nameUk: 'Початківець',
    description: '完成第一课',
    descriptionUk: 'Завершіть перший урок',
    icon: '🎯',
    condition: 'complete_lesson',
    requirement: 1
  },
  {
    id: 'week_streak',
    name: '一周坚持',
    nameUk: 'Тижнева серія',
    description: '连续7天学习',
    descriptionUk: '7 днів поспіль',
    icon: '🔥',
    condition: 'streak_days',
    requirement: 7
  },
  {
    id: 'month_streak',
    name: '月度之星',
    nameUk: 'Місячний чемпіон',
    description: '连续30天学习',
    descriptionUk: '30 днів поспіль',
    icon: '⭐',
    condition: 'streak_days',
    requirement: 30
  },
  {
    id: 'hundred_words',
    name: '词汇百个',
    nameUk: 'Сто слів',
    description: '掌握100个单词',
    descriptionUk: 'Вивчіть 100 слів',
    icon: '📚',
    condition: 'words_learned',
    requirement: 100
  },
  {
    id: 'thousand_words',
    name: '词汇千个',
    nameUk: 'Тисяча слів',
    description: '掌握1000个单词',
    descriptionUk: 'Вивчіть 1000 слів',
    icon: '🏆',
    condition: 'words_learned',
    requirement: 1000
  },
  {
    id: 'perfect_score',
    name: '满分达成',
    nameUk: 'Ідеальний результат',
    description: '任何测试满分',
    descriptionUk: 'Ідеальний бал у будь-якому тесті',
    icon: '💯',
    condition: 'perfect_test',
    requirement: 1
  },
  {
    id: 'speaking_master',
    name: '口语达人',
    nameUk: 'Майстер мовлення',
    description: '完成50次跟读',
    descriptionUk: '50 сесій практики мовлення',
    icon: '🎤',
    condition: 'speaking_sessions',
    requirement: 50
  },
  {
    id: 'night_owl',
    name: '夜猫子学习',
    nameUk: 'Нічна сова',
    description: '晚上11点后学习',
    descriptionUk: 'Навчання після 23:00',
    icon: '🦉',
    condition: 'study_late',
    requirement: 1
  },
  {
    id: 'early_bird',
    name: '早起鸟儿',
    nameUk: 'Ранній птах',
    description: '早上7点前学习',
    descriptionUk: 'Навчання до 7:00',
    icon: '🐦',
    condition: 'study_early',
    requirement: 1
  }
];

export const initialPosts: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userNickname: 'Olena_Kyiv',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olena',
    title: '学习乌克兰语3个月的心得分享',
    content: '从零基础到现在能进行简单对话，我总结了一些学习方法，希望对大家有帮助...',
    category: 'general',
    likes: 128,
    comments: 45,
    createdAt: '2024-01-15T10:30:00Z',
    isLiked: false
  },
  {
    id: 'p2',
    userId: 'u2',
    userNickname: 'UkrainianFan',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andriy',
    title: '乌克兰语动词变位技巧',
    content: '动词变位是乌克兰语学习的难点之一，这篇文章详细介绍第一组动词的变位规则...',
    category: 'grammar',
    likes: 89,
    comments: 32,
    createdAt: '2024-01-14T15:20:00Z',
    isLiked: true
  },
  {
    id: 'p3',
    userId: 'u3',
    userNickname: 'LanguageLearner',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    title: '推荐一些乌克兰语学习资源',
    content: '我收集了一些免费的乌克兰语学习资源，包括网站、YouTube频道和播客...',
    category: 'vocabulary',
    likes: 156,
    comments: 67,
    createdAt: '2024-01-13T09:15:00Z',
    isLiked: false
  }
];
