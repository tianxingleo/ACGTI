import type { CharacterMatch } from '../types/quiz'
import type { AppLocale } from './types'

type LocalizedText = Record<AppLocale, string>

const hiddenCharacterSeriesI18n: LocalizedText = {
  'zh-CN': '有隐藏角色',
  'zh-TW': '有隱藏角色',
  en: 'Hidden Result Exists',
  ja: '隠し結果あり',
}

const hiddenCharacterNoteI18n: LocalizedText = {
  'zh-CN': '你命中了{label}。ACGTI 不会直接公开其角色名，结果页仅保留角色代码、形象和气质解读。',
  'zh-TW': '你命中了{label}。ACGTI 不會直接公開其角色名，結果頁僅保留角色代碼、形象與氣質解讀。',
  en: 'You hit {label}. ACGTI keeps the actual character name masked and only shows the code, image, and personality reading.',
  ja: '{label} に命中しました。ACGTIでは実際のキャラ名は伏せたまま、コードとビジュアル、解説のみを表示します。',
}

const hiddenCharacterTagsI18n: Record<AppLocale, string[]> = {
  'zh-CN': ['隐藏结果', '低概率命中', '特殊气质'],
  'zh-TW': ['隱藏結果', '低機率命中', '特殊氣質'],
  en: ['Hidden Result', 'Low Probability Hit', 'Special Aura'],
  ja: ['隠し結果', '低確率ヒット', '特殊な気配'],
}

const HIDDEN_CHARACTER_IDS = ['phrolova', 'kasugano-sora'] as const

const hiddenCharacterLabelPrefixI18n: LocalizedText = {
  'zh-CN': '隐藏角色',
  'zh-TW': '隱藏角色',
  en: 'Hidden Character ',
  ja: '隠しキャラ',
}

const characterNameI18n: Record<string, LocalizedText> = {
  'hatsune-miku': {
    'zh-CN': '初音未来',
    'zh-TW': '初音未來',
    en: 'Hatsune Miku',
    ja: '初音ミク',
  },
  'ayanami-rei': {
    'zh-CN': '绫波丽',
    'zh-TW': '綾波零',
    en: 'Rei Ayanami',
    ja: '綾波レイ',
  },
  'asuka-langley': {
    'zh-CN': '明日香',
    'zh-TW': '明日香',
    en: 'Asuka Langley',
    ja: '惣流・アスカ・ラングレー',
  },
  'edogawa-conan': {
    'zh-CN': '江户川柯南',
    'zh-TW': '江戶川柯南',
    en: 'Conan Edogawa',
    ja: '江戸川コナン',
  },
  'hakurei-reimu': {
    'zh-CN': '博丽灵梦',
    'zh-TW': '博麗靈夢',
    en: 'Reimu Hakurei',
    ja: '博麗霊夢',
  },
  'gotoh-hitori': {
    'zh-CN': '后藤一里',
    'zh-TW': '後藤一里',
    en: 'Hitori Gotoh',
    ja: '後藤ひとり',
  },
  'fujiwara-chika': {
    'zh-CN': '藤原千花',
    'zh-TW': '藤原千花',
    en: 'Chika Fujiwara',
    ja: '藤原千花',
  },
  'takanashi-rikka': {
    'zh-CN': '小鸟游六花',
    'zh-TW': '小鳥遊六花',
    en: 'Rikka Takanashi',
    ja: '小鳥遊六花',
  },
  'kousaka-kirino': {
    'zh-CN': '高坂桐乃',
    'zh-TW': '高坂桐乃',
    en: 'Kirino Kousaka',
    ja: '高坂桐乃',
  },
  amiya: {
    'zh-CN': '阿米娅',
    'zh-TW': '阿米婭',
    en: 'Amiya',
    ja: 'アーミヤ',
  },
  phoebe: {
    'zh-CN': '菲比',
    'zh-TW': '菲比',
    en: 'Phoebe',
    ja: 'フィービー',
  },
  'kitashirakawa-tamako': {
    'zh-CN': '北白川玉子',
    'zh-TW': '北白川玉子',
    en: 'Tamako Kitashirakawa',
    ja: '北白川たまこ',
  },
  'nakano-nino': {
    'zh-CN': '中野二乃',
    'zh-TW': '中野二乃',
    en: 'Nino Nakano',
    ja: '中野二乃',
  },
  'yor-forger': {
    'zh-CN': '约尔·福杰',
    'zh-TW': '約兒·佛傑',
    en: 'Yor Forger',
    ja: 'ヨル・フォージャー',
  },
  'sakagami-tomoyo': {
    'zh-CN': '坂上智代',
    'zh-TW': '坂上智代',
    en: 'Tomoyo Sakagami',
    ja: '坂上智代',
  },
  'azusagawa-kaede': {
    'zh-CN': '梓川枫',
    'zh-TW': '梓川楓',
    en: 'Kaede Azusagawa',
    ja: '梓川かえで',
  },
  'aisaka-taiga': {
    'zh-CN': '逢坂大河',
    'zh-TW': '逢坂大河',
    en: 'Taiga Aisaka',
    ja: '逢坂大河',
  },
  'shinomiya-kaguya': {
    'zh-CN': '四宫辉夜',
    'zh-TW': '四宮輝夜',
    en: 'Kaguya Shinomiya',
    ja: '四宮かぐや',
  },
  'kato-megumi': {
    'zh-CN': '加藤惠',
    'zh-TW': '加藤惠',
    en: 'Megumi Kato',
    ja: '加藤恵',
  },
  rem: {
    'zh-CN': '蕾姆',
    'zh-TW': '雷姆',
    en: 'Rem',
    ja: 'レム',
  },
  'kita-ikuyo': {
    'zh-CN': '喜多郁代',
    'zh-TW': '喜多郁代',
    en: 'Ikuyo Kita',
    ja: '喜多郁代',
  },
  'yamada-ryo': {
    'zh-CN': '山田凉',
    'zh-TW': '山田涼',
    en: 'Ryo Yamada',
    ja: '山田リョウ',
  },
  'hirasawa-yui': {
    'zh-CN': '平泽唯',
    'zh-TW': '平澤唯',
    en: 'Yui Hirasawa',
    ja: '平沢唯',
  },
  emilia: {
    'zh-CN': '爱蜜莉雅',
    'zh-TW': '愛蜜莉雅',
    en: 'Emilia',
    ja: 'エミリア',
  },
  'yukinoshita-yukino': {
    'zh-CN': '雪之下雪乃',
    'zh-TW': '雪之下雪乃',
    en: 'Yukino Yukinoshita',
    ja: '雪ノ下雪乃',
  },
  'sakurajima-mai': {
    'zh-CN': '樱岛麻衣',
    'zh-TW': '櫻島麻衣',
    en: 'Mai Sakurajima',
    ja: '桜島麻衣',
  },
  'akiyama-mio': {
    'zh-CN': '秋山澪',
    'zh-TW': '秋山澪',
    en: 'Mio Akiyama',
    ja: '秋山澪',
  },
  cirno: {
    'zh-CN': '琪露诺',
    'zh-TW': '琪露諾',
    en: 'Cirno',
    ja: 'チルノ',
  },
  'misaka-mikoto': {
    'zh-CN': '御坂美琴',
    'zh-TW': '御坂美琴',
    en: 'Mikoto Misaka',
    ja: '御坂美琴',
  },
  'kaname-madoka': {
    'zh-CN': '鹿目圆',
    'zh-TW': '鹿目圓',
    en: 'Madoka Kaname',
    ja: '鹿目まどか',
  },
  furina: {
    'zh-CN': '芙宁娜',
    'zh-TW': '芙寧娜',
    en: 'Furina',
    ja: 'フリーナ',
  },
  'takamatsu-tomori': {
    'zh-CN': '高松灯',
    'zh-TW': '高松燈',
    en: 'Tomori Takamatsu',
    ja: '高松燈',
  },
  'chihaya-anon': {
    'zh-CN': '千早爱音',
    'zh-TW': '千早愛音',
    en: 'Anon Chihaya',
    ja: '千早愛音',
  },
  'yo-rana': {
    'zh-CN': '要乐奈',
    'zh-TW': '要樂奈',
    en: 'Rana Kaname',
    ja: '要楽奈',
  },
  'nagasaki-soyo': {
    'zh-CN': '长崎爽世',
    'zh-TW': '長崎爽世',
    en: 'Soyo Nagasaki',
    ja: '長崎そよ',
  },
  'shiina-taki': {
    'zh-CN': '椎名立希',
    'zh-TW': '椎名立希',
    en: 'Taki Shiina',
    ja: '椎名立希',
  },
  'togawa-sakiko': {
    'zh-CN': '丰川祥子',
    'zh-TW': '豐川祥子',
    en: 'Sakiko Togawa',
    ja: '豊川祥子',
  },
  'wakaba-mutsumi': {
    'zh-CN': '若叶睦',
    'zh-TW': '若葉睦',
    en: 'Mutsumi Wakaba',
    ja: '若葉睦',
  },
  mortis: {
    'zh-CN': 'Mortis',
    'zh-TW': 'Mortis',
    en: 'Mortis',
    ja: 'モーティス',
  },
  'misumi-uika': {
    'zh-CN': '三角初华 / Doloris',
    'zh-TW': '三角初華 / Doloris',
    en: 'Uika Misumi / Doloris',
    ja: '三角初華 / Doloris',
  },
  'yahata-umiri': {
    'zh-CN': '八幡海铃 / Timoris',
    'zh-TW': '八幡海鈴 / Timoris',
    en: 'Umiri Yahata / Timoris',
    ja: '八幡海鈴 / Timoris',
  },
  'uika-nyubara': {
    'zh-CN': '祐天寺若麦 / Amoris',
    'zh-TW': '祐天寺若麥 / Amoris',
    en: 'Nyubara Uika / Amoris',
    ja: '祐天寺若麦 / Amoris',
  },
  'jia-ran': {
    'zh-CN': '嘉然',
    'zh-TW': '嘉然',
    en: 'Diana',
    ja: '嘉然',
  },
  'eis-taffy': {
    'zh-CN': '永雏塔菲',
    'zh-TW': '永雛塔菲',
    en: 'Eis Taffy',
    ja: '永雛タフィ',
  },
  'neuro-sama': {
    'zh-CN': 'Neuro-sama',
    'zh-TW': 'Neuro-sama',
    en: 'Neuro-sama',
    ja: 'Neuro-sama',
  },
  'evil-neuro': {
    'zh-CN': 'Evil Neuro',
    'zh-TW': 'Evil Neuro',
    en: 'Evil Neuro',
    ja: 'Evil Neuro',
  },
  'kagamine-rin': {
    'zh-CN': '镜音铃',
    'zh-TW': '鏡音鈴',
    en: 'Kagamine Rin',
    ja: '鏡音リン',
  },
  'luo-tianyi': {
    'zh-CN': '洛天依',
    'zh-TW': '洛天依',
    en: 'Luo Tianyi',
    ja: '洛天依',
  },
  'runami-yachiyo': {
    'zh-CN': '月见八千代',
    'zh-TW': '月見八千代',
    en: 'Yachiyo Tsukimi',
    ja: '月見八千代',
  },
  murasame: {
    'zh-CN': '丛雨',
    'zh-TW': '叢雨',
    en: 'Murasame',
    ja: 'ムラサメ',
  },
  'ayachi-nene': {
    'zh-CN': '绫地宁宁',
    'zh-TW': '綾地寧寧',
    en: 'Nene Ayachi',
    ja: '綾地寧々',
  },
  'tomotake-yoshino': {
    'zh-CN': '朝武芳乃',
    'zh-TW': '朝武芳乃',
    en: 'Yoshino Tomotake',
    ja: '朝武芳乃',
  },
  atri: {
    'zh-CN': '亚托莉',
    'zh-TW': '亞托莉',
    en: 'ATRI',
    ja: 'アトリ',
  },
  'yanami-anna': {
    'zh-CN': '八奈见杏菜',
    'zh-TW': '八奈見杏菜',
    en: 'Anna Yanami',
    ja: '八奈見杏菜',
  },
  'nukumizu-kaju': {
    'zh-CN': '温水佳树',
    'zh-TW': '溫水佳樹',
    en: 'Kaju Nukumizu',
    ja: '温水佳樹',
  },
  elysia: {
    'zh-CN': '爱莉希雅',
    'zh-TW': '愛莉希雅',
    en: 'Elysia',
    ja: 'エリシア',
  },
  'haibara-ai': {
    'zh-CN': '灰原哀',
    'zh-TW': '灰原哀',
    en: 'Ai Haibara',
    ja: '灰原哀',
  },
  'violet-evergarden': {
    'zh-CN': '薇尔莉特',
    'zh-TW': '薇爾莉特',
    en: 'Violet Evergarden',
    ja: 'ヴァイオレット・エヴァーガーデン',
  },
  elaina: {
    'zh-CN': '伊蕾娜',
    'zh-TW': '伊蕾娜',
    en: 'Elaina',
    ja: 'イレイナ',
  },
  'chitanda-eru': {
    'zh-CN': '千反田爱瑠',
    'zh-TW': '千反田愛瑠',
    en: 'Eru Chitanda',
    ja: '千反田える',
  },
  'tomori-nao': {
    'zh-CN': '友利奈绪',
    'zh-TW': '友利奈緒',
    en: 'Nao Tomori',
    ja: '友利奈緒',
  },
  'nakano-azusa': {
    'zh-CN': '中野梓',
    'zh-TW': '中野梓',
    en: 'Azusa Nakano',
    ja: '中野梓',
  },
  'furukawa-nagisa': {
    'zh-CN': '古河渚',
    'zh-TW': '古河渚',
    en: 'Nagisa Furukawa',
    ja: '古河渚',
  },
  'nishimiya-shoko': {
    'zh-CN': '西宫硝子',
    'zh-TW': '西宮硝子',
    en: 'Shoko Nishimiya',
    ja: '西宮硝子',
  },
  'kusanagi-nene': {
    'zh-CN': '草薙宁宁',
    'zh-TW': '草薙寧寧',
    en: 'Nene Kusanagi',
    ja: '草薙寧々',
  },
  'akemi-homura': {
    'zh-CN': '晓美焰',
    'zh-TW': '曉美焰',
    en: 'Homura Akemi',
    ja: '暁美ほむら',
  },
  'yuigahama-yui': {
    'zh-CN': '由比滨结衣',
    'zh-TW': '由比濱結衣',
    en: 'Yui Yuigahama',
    ja: '由比ヶ浜結衣',
  },
  'suzumiya-haruhi': {
    'zh-CN': '凉宫春日',
    'zh-TW': '涼宮春日',
    en: 'Haruhi Suzumiya',
    ja: '涼宮ハルヒ',
  },
  'hoshino-ruby': {
    'zh-CN': '星野露比',
    'zh-TW': '星野露比',
    en: 'Ruby Hoshino',
    ja: 'ルビー',
  },
  'miyazono-kaori': {
    'zh-CN': '宫园薰',
    'zh-TW': '宮園薰',
    en: 'Kaori Miyazono',
    ja: '宮園かをり',
  },
  'awa-subaru': {
    'zh-CN': '安和昴',
    'zh-TW': '安和昴',
    en: 'Subaru Awa',
    ja: '安和すばる',
  },
  frieren: {
    'zh-CN': '芙丽莲',
    'zh-TW': '芙莉蓮',
    en: 'Frieren',
    ja: 'フリーレン',
  },
  'ijichi-nijika': {
    'zh-CN': '伊地知虹夏',
    'zh-TW': '伊地知虹夏',
    en: 'Nijika Ijichi',
    ja: '伊地知虹夏',
  },
  'tachibana-kanade': {
    'zh-CN': '立华奏',
    'zh-TW': '立華奏',
    en: 'Kanade Tachibana',
    ja: '立華かなで',
  },
  kaltsit: {
    'zh-CN': '凯尔希',
    'zh-TW': '凱爾希',
    en: "Kal'tsit",
    ja: 'ケルシー',
  },
  'arima-kana': {
    'zh-CN': '有马加奈',
    'zh-TW': '有馬加奈',
    en: 'Kana Arima',
    ja: '有馬かな',
  },
  'nishikigi-chisato': {
    'zh-CN': '锦木千束',
    'zh-TW': '錦木千束',
    en: 'Chisato Nishikigi',
    ja: '錦木千束',
  },
  'tanikaze-amane': {
    'zh-CN': '谷风天音',
    'zh-TW': '谷風天音',
    en: 'Amane Tanikaze',
    ja: '谷風天音',
  },
  'kasugano-sora': {
    'zh-CN': '春日野穹',
    'zh-TW': '春日野穹',
    en: 'Sora Kasugano',
    ja: '春日野穹',
  },
  myrtle: {
    'zh-CN': '桃金娘',
    'zh-TW': '桃金娘',
    en: 'Myrtle',
    ja: 'テンニンカ',
  },
  'vertin': {
    'zh-CN': '维尔汀',
    'zh-TW': '維爾汀',
    en: 'Vertin',
    ja: 'ヴェルティ',
  },
  'shirai-kuroko': {
    'zh-CN': '白井黑子',
    'zh-TW': '白井黑子',
    en: 'Kuroko Shirai',
    ja: '白井黒子',
  },
  'oyama-mahiro': {
    'zh-CN': '绪山真寻',
    'zh-TW': '緒山真尋',
    en: 'Mahiro Oyama',
    ja: '緒山まひろ',
  },
  'tokai-teio': {
    'zh-CN': '东海帝皇',
    'zh-TW': '東海帝皇',
    en: 'Tokai Teio',
    ja: 'トウカイテイオー',
  },
  eyjafjalla: {
    'zh-CN': '艾雅法拉',
    'zh-TW': '艾雅法拉',
    en: 'Eyjafjalla',
    ja: 'エイヤフィヤトラ',
  },
  shorekeeper: {
    'zh-CN': '守岸人',
    'zh-TW': '守岸人',
    en: 'Shorekeeper',
    ja: 'ショアキーパー',
  },
  doro: {
    'zh-CN': 'doro',
    'zh-TW': 'doro',
    en: 'doro',
    ja: 'Doro',
  },
  firefly: {
    'zh-CN': '流萤',
    'zh-TW': '流螢',
    en: 'Firefly',
    ja: 'ホタル',
  },
  matikanetannhauser: {
    'zh-CN': '待兼诗歌剧',
    'zh-TW': '待兼詩歌劇',
    en: 'Matikanetannhauser',
    ja: 'マチカネタンホイザ',
  },
  cartethyia: {
    'zh-CN': '卡提希娅',
    'zh-TW': '卡提希婭',
    en: 'Cartethyia',
    ja: 'カルテシア',
  },
  'azuma-seren': {
    'zh-CN': '东雪莲',
    'zh-TW': '東雪蓮',
    en: 'Azuma Seren',
    ja: '東雪蓮',
  },
  'izumi-konata': {
    'zh-CN': '泉此方',
    'zh-TW': '泉此方',
    en: 'Konata Izumi',
    ja: '泉こなた',
  },
  reze: {
    'zh-CN': '雷塞',
    'zh-TW': '蕾潔',
    en: 'Reze',
    ja: 'レゼ',
  },
  'kaguya-chojikuu': {
    'zh-CN': '辉夜',
    'zh-TW': '輝夜',
    en: 'Kaguya',
    ja: '輝夜',
  },
  'bilibili-22': {
    'zh-CN': '22娘',
    'zh-TW': '22娘',
    en: '22 Niang',
    ja: '22娘',
  },
  'bilibili-33': {
    'zh-CN': '33娘',
    'zh-TW': '33娘',
    en: '33 Niang',
    ja: '33娘',
  },
  'ayanokoji-kiyotaka': {
    'zh-CN': '绫小路清隆',
    'zh-TW': '綾小路清隆',
    en: 'Kiyotaka Ayanokōji',
    ja: '綾小路清隆',
  },
}

const seriesI18n: Record<string, LocalizedText> = {
  VOCALOID: {
    'zh-CN': 'VOCALOID',
    'zh-TW': 'VOCALOID',
    en: 'VOCALOID',
    ja: 'VOCALOID',
  },
  Vsinger: {
    'zh-CN': 'Vsinger',
    'zh-TW': 'Vsinger',
    en: 'Vsinger',
    ja: 'Vsinger',
  },
  '新世纪福音战士': {
    'zh-CN': '新世纪福音战士',
    'zh-TW': '新世紀福音戰士',
    en: 'Neon Genesis Evangelion',
    ja: '新世紀エヴァンゲリオン',
  },
  '名侦探柯南': {
    'zh-CN': '名侦探柯南',
    'zh-TW': '名偵探柯南',
    en: 'Detective Conan',
    ja: '名探偵コナン',
  },
  '东方Project': {
    'zh-CN': '东方Project',
    'zh-TW': '東方Project',
    en: 'Touhou Project',
    ja: '東方Project',
  },
  '孤独摇滚！': {
    'zh-CN': '孤独摇滚！',
    'zh-TW': '孤獨搖滾！',
    en: 'Bocchi the Rock!',
    ja: 'ぼっち・ざ・ろっく！',
  },
  '辉夜大小姐想让我告白': {
    'zh-CN': '辉夜大小姐想让我告白',
    'zh-TW': '輝夜姬想讓人告白',
    en: 'Kaguya-sama: Love Is War',
    ja: 'かぐや様は告らせたい',
  },
  '路人女主的养成方法': {
    'zh-CN': '路人女主的养成方法',
    'zh-TW': '不起眼女主角培育法',
    en: 'Saekano: How to Raise a Boring Girlfriend',
    ja: '冴えない彼女の育てかた',
  },
  'Re:从零开始的异世界生活': {
    'zh-CN': 'Re:从零开始的异世界生活',
    'zh-TW': 'Re:從零開始的異世界生活',
    en: 'Re:Zero - Starting Life in Another World',
    ja: 'Re:ゼロから始める異世界生活',
  },
  '某科学的超电磁炮': {
    'zh-CN': '某科学的超电磁炮',
    'zh-TW': '科學超電磁砲',
    en: 'A Certain Scientific Railgun',
    ja: 'とある科学の超電磁砲',
  },
  '魔法少女小圆': {
    'zh-CN': '魔法少女小圆',
    'zh-TW': '魔法少女小圓',
    en: 'Puella Magi Madoka Magica',
    ja: '魔法少女まどか☆マギカ',
  },
  '原神': {
    'zh-CN': '原神',
    'zh-TW': '原神',
    en: 'Genshin Impact',
    ja: '原神',
  },
  '中二病也要谈恋爱！': {
    'zh-CN': '中二病也要谈恋爱！',
    'zh-TW': '中二病也想談戀愛！',
    en: 'Love, Chunibyo & Other Delusions!',
    ja: '中二病でも恋がしたい！',
  },
  '我的妹妹哪有这么可爱！': {
    'zh-CN': '我的妹妹哪有这么可爱！',
    'zh-TW': '我的妹妹哪有這麼可愛！',
    en: 'Oreimo',
    ja: '俺の妹がこんなに可愛いわけがない',
  },
  '鸣潮': {
    'zh-CN': '鸣潮',
    'zh-TW': '鳴潮',
    en: 'Wuthering Waves',
    ja: '鳴潮',
  },
  '别当哥哥了！': {
    'zh-CN': '别当哥哥了！',
    'zh-TW': '別當哥哥了！',
    en: 'Onimai: I\'m Now Your Sister!',
    ja: 'お兄ちゃんはおしまい！',
  },
  '赛马娘 Pretty Derby': {
    'zh-CN': '赛马娘 Pretty Derby',
    'zh-TW': '賽馬娘 Pretty Derby',
    en: 'Uma Musume Pretty Derby',
    ja: 'ウマ娘 プリティーダービー',
  },
  '胜利女神：妮姬': {
    'zh-CN': '胜利女神：妮姬',
    'zh-TW': '勝利女神：妮姬',
    en: 'GODDESS OF VICTORY: NIKKE',
    ja: '勝利の女神：NIKKE',
  },
  '崩坏：星穹铁道': {
    'zh-CN': '崩坏：星穹铁道',
    'zh-TW': '崩壞：星穹鐵道',
    en: 'Honkai: Star Rail',
    ja: '崩壊：スターレイル',
  },
  '玉子市场': {
    'zh-CN': '玉子市场',
    'zh-TW': '玉子市場',
    en: 'Tamako Market',
    ja: 'たまこまーけっと',
  },
  "BanG Dream! It's MyGO!!!!!": {
    'zh-CN': "BanG Dream! It's MyGO!!!!!",
    'zh-TW': "BanG Dream! It's MyGO!!!!!",
    en: "BanG Dream! It's MyGO!!!!!",
    ja: "BanG Dream! It's MyGO!!!!!",
  },
  'BanG Dream! Ave Mujica': {
    'zh-CN': 'BanG Dream! Ave Mujica',
    'zh-TW': 'BanG Dream! Ave Mujica',
    en: 'BanG Dream! Ave Mujica',
    ja: 'BanG Dream! Ave Mujica',
  },
  'A-SOUL': {
    'zh-CN': 'A-SOUL',
    'zh-TW': 'A-SOUL',
    en: 'A-SOUL',
    ja: 'A-SOUL',
  },
  '虚拟主播': {
    'zh-CN': '虚拟主播',
    'zh-TW': '虛擬主播',
    en: 'VTuber',
    ja: 'バーチャルYouTuber',
  },
  '超时空辉夜姬！': {
    'zh-CN': '超时空辉夜姬！',
    'zh-TW': '超時空輝耀姬！',
    en: 'Cho-Kaguyahime!',
    ja: '超かぐや姫！',
  },
  '千恋＊万花': {
    'zh-CN': '千恋＊万花',
    'zh-TW': '千戀＊萬花',
    en: 'Senren * Banka',
    ja: '千恋＊万花',
  },
  '魔女的夜宴': {
    'zh-CN': '魔女的夜宴',
    'zh-TW': '魔女的夜宴',
    en: 'Sabbat of the Witch',
    ja: 'サノバウィッチ',
  },
  'ATRI -My Dear Moments-': {
    'zh-CN': 'ATRI -My Dear Moments-',
    'zh-TW': 'ATRI -My Dear Moments-',
    en: 'ATRI -My Dear Moments-',
    ja: 'ATRI -My Dear Moments-',
  },
  '败犬女主太多了！': {
    'zh-CN': '败犬女主太多了！',
    'zh-TW': '敗北女角太多了！',
    en: 'Too Many Losing Heroines!',
    ja: '負けヒロインが多すぎる！',
  },
  '崩坏3': {
    'zh-CN': '崩坏3',
    'zh-TW': '崩壞3rd',
    en: 'Honkai Impact 3rd',
    ja: '崩壊3rd',
  },
  '紫罗兰永恒花园': {
    'zh-CN': '紫罗兰永恒花园',
    'zh-TW': '紫羅蘭永恆花園',
    en: 'Violet Evergarden',
    ja: 'ヴァイオレット・エヴァーガーデン',
  },
  '魔女之旅': {
    'zh-CN': '魔女之旅',
    'zh-TW': '魔女之旅',
    en: 'Wandering Witch',
    ja: '魔女の旅々',
  },
  '冰菓': {
    'zh-CN': '冰菓',
    'zh-TW': '冰菓',
    en: 'Hyouka',
    ja: '氷菓',
  },
  Charlotte: {
    'zh-CN': 'Charlotte',
    'zh-TW': 'Charlotte',
    en: 'Charlotte',
    ja: 'Charlotte',
  },
  '轻音少女': {
    'zh-CN': '轻音少女',
    'zh-TW': '輕音少女',
    en: 'K-ON!',
    ja: 'けいおん!',
  },
  Clannad: {
    'zh-CN': 'Clannad',
    'zh-TW': 'Clannad',
    en: 'CLANNAD',
    ja: 'CLANNAD',
  },
  '声之形': {
    'zh-CN': '声之形',
    'zh-TW': '聲之形',
    en: 'A Silent Voice',
    ja: '聲の形',
  },
  '世界计划': {
    'zh-CN': '世界计划',
    'zh-TW': '世界計畫',
    en: 'Project Sekai',
    ja: 'プロジェクトセカイ',
  },
  '我的青春恋爱物语果然有问题': {
    'zh-CN': '我的青春恋爱物语果然有问题',
    'zh-TW': '果然我的青春戀愛喜劇搞錯了',
    en: 'My Teen Romantic Comedy SNAFU',
    ja: 'やはり俺の青春ラブコメはまちがっている。',
  },
  '欢迎来到实力至上主义的教室': {
    'zh-CN': '欢迎来到实力至上主义的教室',
    'zh-TW': '歡迎來到實力至上主義的教室',
    en: 'Classroom of the Elite',
    ja: 'ようこそ実力至上主義の教室へ',
  },
  '青春猪头少年不会梦到兔女郎学姐': {
    'zh-CN': '青春猪头少年不会梦到兔女郎学姐',
    'zh-TW': '青春豬頭少年不會夢到兔女郎學姊',
    en: 'Rascal Does Not Dream of Bunny Girl Senpai',
    ja: '青春ブタ野郎はバニーガール先輩の夢を見ない',
  },
  '五等分的新娘': {
    'zh-CN': '五等分的新娘',
    'zh-TW': '五等分的新娘',
    en: 'The Quintessential Quintuplets',
    ja: '五等分の花嫁',
  },
  '间谍过家家': {
    'zh-CN': '间谍过家家',
    'zh-TW': '間諜家家酒',
    en: 'SPY x FAMILY',
    ja: 'SPY×FAMILY',
  },
  '龙与虎': {
    'zh-CN': '龙与虎',
    'zh-TW': '龍與虎',
    en: 'Toradora!',
    ja: 'とらドラ！',
  },
  '凉宫春日的忧郁': {
    'zh-CN': '凉宫春日的忧郁',
    'zh-TW': '涼宮春日的憂鬱',
    en: 'The Melancholy of Haruhi Suzumiya',
    ja: '涼宮ハルヒの憂鬱',
  },
  '四月是你的谎言': {
    'zh-CN': '四月是你的谎言',
    'zh-TW': '四月是你的謊言',
    en: 'Your Lie in April',
    ja: '四月は君の嘘',
  },
  '少女乐队的呐喊 (GBC)': {
    'zh-CN': '少女乐队的呐喊 (GBC)',
    'zh-TW': '少女樂隊的吶喊 (GBC)',
    en: 'Girls Band Cry',
    ja: 'ガールズバンドクライ',
  },
  '葬送的芙丽莲': {
    'zh-CN': '葬送的芙丽莲',
    'zh-TW': '葬送的芙莉蓮',
    en: 'Frieren: Beyond Journey\'s End',
    ja: '葬送のフリーレン',
  },
  'Angel Beats!': {
    'zh-CN': 'Angel Beats!',
    'zh-TW': 'Angel Beats!',
    en: 'Angel Beats!',
    ja: 'Angel Beats!',
  },
  '明日方舟': {
    'zh-CN': '明日方舟',
    'zh-TW': '明日方舟',
    en: 'Arknights',
    ja: 'アークナイツ',
  },
  '我推的孩子': {
    'zh-CN': '我推的孩子',
    'zh-TW': '我推的孩子',
    en: 'Oshi no Ko',
    ja: '【推しの子】',
  },
  '莉可丽丝': {
    'zh-CN': '莉可丽丝',
    'zh-TW': '莉可麗絲',
    en: 'Lycoris Recoil',
    ja: 'リコリス・リコイル',
  },
  '天使☆骚动 RE-BOOT!': {
    'zh-CN': '天使☆骚动 RE-BOOT!',
    'zh-TW': '天使☆囂囂 RE-BOOT!',
    en: 'Tenshi Souzou RE-BOOT!',
    ja: '天使☆騒々 RE-BOOT!',
  },
  '缘之空': {
    'zh-CN': '缘之空',
    'zh-TW': '緣之空',
    en: 'Yosuga no Sora',
    ja: 'ヨスガノソラ',
  },
  '重返未来:1999': {
    'zh-CN': '重返未来:1999',
    'zh-TW': '重返未來:1999',
    en: 'Reverse:1999',
    ja: 'リバース:1999',
  },
  'Blanche Fleur': {
    'zh-CN': 'Blanche Fleur',
    'zh-TW': 'Blanche Fleur',
    en: 'Blanche Fleur',
    ja: 'Blanche Fleur',
  },
  '幸运星': {
    'zh-CN': '幸运星',
    'zh-TW': '幸運星',
    en: 'Lucky Star',
    ja: 'らき☆すた',
  },
  '电锯人': {
    'zh-CN': '电锯人',
    'zh-TW': '鏈鋸人',
    en: 'Chainsaw Man',
    ja: 'チェンソーマン',
  },
  bilibili: {
    'zh-CN': 'bilibili',
    'zh-TW': 'bilibili',
    en: 'bilibili',
    ja: 'bilibili',
  },
}

function resolveLocalizedText(
  table: Record<string, LocalizedText>,
  key: string,
  locale: AppLocale,
  fallback: string,
) {
  return table[key]?.[locale] ?? fallback
}

export function isHiddenCharacter(character: Pick<CharacterMatch, 'hidden'> | null | undefined) {
  return Boolean(character?.hidden)
}

export function getHiddenCharacterOrder(character: Pick<CharacterMatch, 'id'> | null | undefined) {
  const index = character ? HIDDEN_CHARACTER_IDS.indexOf(character.id as (typeof HIDDEN_CHARACTER_IDS)[number]) : -1
  return index >= 0 ? index + 1 : Number.MAX_SAFE_INTEGER
}

export function getHiddenCharacterLabel(
  character: Pick<CharacterMatch, 'id'> | null | undefined,
  locale: AppLocale,
) {
  const order = getHiddenCharacterOrder(character)
  if (order === Number.MAX_SAFE_INTEGER) {
    return locale === 'en' ? 'Hidden Character' : hiddenCharacterLabelPrefixI18n[locale]
  }

  if (locale === 'en') {
    return `${hiddenCharacterLabelPrefixI18n[locale]}${order}`
  }

  return `${hiddenCharacterLabelPrefixI18n[locale]}${order}`
}

export function getHiddenCharacterTitle(
  locale: AppLocale,
  character?: Pick<CharacterMatch, 'id'> | null,
) {
  return getHiddenCharacterLabel(character, locale)
}

export function getHiddenCharacterNote(
  locale: AppLocale,
  character?: Pick<CharacterMatch, 'id'> | null,
) {
  const label = getHiddenCharacterLabel(character, locale)
  return hiddenCharacterNoteI18n[locale].replace('{label}', label)
}

export function getHiddenCharacterTags(locale: AppLocale) {
  return hiddenCharacterTagsI18n[locale]
}

export function getLocalizedCharacterName(
  character: Pick<CharacterMatch, 'id' | 'name' | 'hidden'>,
  locale: AppLocale,
  options?: { revealHidden?: boolean },
) {
  if (isHiddenCharacter(character as CharacterMatch) && !options?.revealHidden) {
    return getHiddenCharacterLabel(character, locale)
  }
  return resolveLocalizedText(characterNameI18n, character.id, locale, character.name)
}

export function getLocalizedCharacterSeries(character: Pick<CharacterMatch, 'series' | 'hidden'>, locale: AppLocale) {
  if (isHiddenCharacter(character as CharacterMatch)) {
    return hiddenCharacterSeriesI18n[locale]
  }
  return resolveLocalizedText(seriesI18n, character.series, locale, character.series)
}
