// Interface translations. Elements with data-i18n="key" get their text replaced;
// data-i18n-placeholder="key" sets the placeholder. Trivia and zodiac write-ups stay in English.

(function () {
    'use strict';

    const LANGUAGES = { en: 'English', es: 'Español', fr: 'Français', zh: '中文', vi: 'Tiếng Việt' };

    const STRINGS = {
        en: {
            subtitle: 'Discover your exact age and fascinating details about your birth date',
            darkMode: '🌙 Dark mode', lightMode: '☀️ Light mode', language: 'Language',
            calcTitle: 'Calculate Your Age',
            miniDisclaimer: 'For entertainment only. Zodiac and trivia content may contain errors.',
            fullDisclaimerLink: 'Full disclaimer',
            birthLabel: 'Date of Birth (MM/DD/YYYY):', birthHint: 'Slashes are optional: 06/16/1990 or 06161990',
            toLabel: 'Calculate Age Up To (MM/DD/YYYY):', toHint: "Leave blank to use today's date",
            timeLabel: 'Time of Birth (optional):', placeLabel: 'Place of Birth (optional):',
            placeHint: 'For your rising sign. The city name is looked up with Open-Meteo.',
            calculate: 'Calculate Age', forget: 'Forget my birthday on this device',
            onThisDay: '📆 On This Day', another: '🎲 Another',
            yourAge: 'Your Age', shareTitle: '📸 Share Your Results',
            shareIntro: 'Save a picture of your results to post or send to friends.',
            download: '⬇️ Download image', share: '📤 Share', copy: '📋 Copy as text',
            countdownLink: '⏳ Open your birthday countdown page',
            milestones: '🎯 Your Milestones', zodiacTitle: '🌟 Your Zodiac Signs', zodiacHint: 'Tap any sign to learn more about it.',
            western: 'Western Zodiac', chinese: 'Chinese Zodiac', vietnamese: 'Vietnamese Zodiac', nativeAmerican: 'Native American',
            vedic: 'Vedic', mayan: 'Mayan', incan: 'Incan', tapDetails: 'Tap for details',
            moreAboutYou: '✨ More About You', lifeInWeeks: '🗓️ Your Life in Weeks',
            planets: '🪐 Your Age on Other Planets', youInNumbers: '🧬 You in Numbers',
            famousTitle: '👥 Famous Person Born on Your Day', tryPerson: '🎲 Try Another Famous Person',
            eventsTitle: '📅 Historical Event on Your Day', tryEvent: '🎲 Try Another Historical Event',
            compareTitle: '👯 Compare With a Friend', friendName: "Friend's name (optional)",
            friendBirthday: "Friend's birthday (MM/DD/YYYY)", compare: 'Compare',
            games: '🎮 Games', twinsTitle: '🎂 Birthday Twins', yearTitle: '📜 Guess the Year',
            boardTitle: '🎈 Birthday Board', boardName: 'Name', boardBirthday: 'Birthday (MM/DD/YYYY)', boardAdd: 'Add',
            footer: 'Age Calculator - For Entertainment Purposes Only',
            year: ['year', 'years'], month: ['month', 'months'], day: ['day', 'days']
        },
        es: {
            subtitle: 'Descubre tu edad exacta y datos fascinantes sobre tu fecha de nacimiento',
            darkMode: '🌙 Modo oscuro', lightMode: '☀️ Modo claro', language: 'Idioma',
            calcTitle: 'Calcula tu edad',
            miniDisclaimer: 'Solo para entretenimiento. El contenido del zodiaco y las curiosidades puede contener errores.',
            fullDisclaimerLink: 'Aviso completo',
            birthLabel: 'Fecha de nacimiento (MM/DD/AAAA):', birthHint: 'Las barras son opcionales: 06/16/1990 o 06161990',
            toLabel: 'Calcular la edad hasta (MM/DD/AAAA):', toHint: 'Déjalo en blanco para usar la fecha de hoy',
            timeLabel: 'Hora de nacimiento (opcional):', placeLabel: 'Lugar de nacimiento (opcional):',
            placeHint: 'Para tu signo ascendente. La ciudad se busca con Open-Meteo.',
            calculate: 'Calcular edad', forget: 'Olvidar mi cumpleaños en este dispositivo',
            onThisDay: '📆 Un día como hoy', another: '🎲 Otro',
            yourAge: 'Tu edad', shareTitle: '📸 Comparte tus resultados',
            shareIntro: 'Guarda una imagen de tus resultados para publicarla o enviarla a tus amigos.',
            download: '⬇️ Descargar imagen', share: '📤 Compartir', copy: '📋 Copiar como texto',
            countdownLink: '⏳ Abrir la cuenta regresiva de tu cumpleaños',
            milestones: '🎯 Tus hitos', zodiacTitle: '🌟 Tus signos del zodiaco', zodiacHint: 'Toca cualquier signo para saber más.',
            western: 'Zodiaco occidental', chinese: 'Zodiaco chino', vietnamese: 'Zodiaco vietnamita', nativeAmerican: 'Nativo americano',
            vedic: 'Védico', mayan: 'Maya', incan: 'Inca', tapDetails: 'Toca para ver detalles',
            moreAboutYou: '✨ Más sobre ti', lifeInWeeks: '🗓️ Tu vida en semanas',
            planets: '🪐 Tu edad en otros planetas', youInNumbers: '🧬 Tú en números',
            famousTitle: '👥 Persona famosa nacida en tu día', tryPerson: '🎲 Otra persona famosa',
            eventsTitle: '📅 Evento histórico en tu día', tryEvent: '🎲 Otro evento histórico',
            compareTitle: '👯 Compárate con un amigo', friendName: 'Nombre del amigo (opcional)',
            friendBirthday: 'Cumpleaños del amigo (MM/DD/AAAA)', compare: 'Comparar',
            games: '🎮 Juegos', twinsTitle: '🎂 Gemelos de cumpleaños', yearTitle: '📜 Adivina el año',
            boardTitle: '🎈 Tablero de cumpleaños', boardName: 'Nombre', boardBirthday: 'Cumpleaños (MM/DD/AAAA)', boardAdd: 'Añadir',
            footer: 'Calculadora de edad - Solo para entretenimiento',
            year: ['año', 'años'], month: ['mes', 'meses'], day: ['día', 'días']
        },
        fr: {
            subtitle: 'Découvrez votre âge exact et des détails fascinants sur votre date de naissance',
            darkMode: '🌙 Mode sombre', lightMode: '☀️ Mode clair', language: 'Langue',
            calcTitle: 'Calculez votre âge',
            miniDisclaimer: 'Pour le divertissement uniquement. Le contenu sur le zodiaque et les anecdotes peut contenir des erreurs.',
            fullDisclaimerLink: 'Avertissement complet',
            birthLabel: 'Date de naissance (MM/JJ/AAAA) :', birthHint: 'Les barres obliques sont facultatives : 06/16/1990 ou 06161990',
            toLabel: 'Calculer l’âge jusqu’au (MM/JJ/AAAA) :', toHint: 'Laissez vide pour utiliser la date du jour',
            timeLabel: 'Heure de naissance (facultatif) :', placeLabel: 'Lieu de naissance (facultatif) :',
            placeHint: 'Pour votre ascendant. La ville est recherchée avec Open-Meteo.',
            calculate: 'Calculer l’âge', forget: 'Oublier mon anniversaire sur cet appareil',
            onThisDay: '📆 Ce jour-là', another: '🎲 Un autre',
            yourAge: 'Votre âge', shareTitle: '📸 Partagez vos résultats',
            shareIntro: 'Enregistrez une image de vos résultats pour la publier ou l’envoyer à vos amis.',
            download: '⬇️ Télécharger l’image', share: '📤 Partager', copy: '📋 Copier le texte',
            countdownLink: '⏳ Ouvrir le compte à rebours de votre anniversaire',
            milestones: '🎯 Vos étapes', zodiacTitle: '🌟 Vos signes du zodiaque', zodiacHint: 'Touchez un signe pour en savoir plus.',
            western: 'Zodiaque occidental', chinese: 'Zodiaque chinois', vietnamese: 'Zodiaque vietnamien', nativeAmerican: 'Amérindien',
            vedic: 'Védique', mayan: 'Maya', incan: 'Inca', tapDetails: 'Touchez pour les détails',
            moreAboutYou: '✨ Plus sur vous', lifeInWeeks: '🗓️ Votre vie en semaines',
            planets: '🪐 Votre âge sur d’autres planètes', youInNumbers: '🧬 Vous en chiffres',
            famousTitle: '👥 Personne célèbre née le même jour', tryPerson: '🎲 Une autre personne célèbre',
            eventsTitle: '📅 Événement historique de votre jour', tryEvent: '🎲 Un autre événement',
            compareTitle: '👯 Comparez-vous à un ami', friendName: 'Prénom de l’ami (facultatif)',
            friendBirthday: 'Anniversaire de l’ami (MM/JJ/AAAA)', compare: 'Comparer',
            games: '🎮 Jeux', twinsTitle: '🎂 Jumeaux d’anniversaire', yearTitle: '📜 Devinez l’année',
            boardTitle: '🎈 Tableau des anniversaires', boardName: 'Nom', boardBirthday: 'Anniversaire (MM/JJ/AAAA)', boardAdd: 'Ajouter',
            footer: 'Calculateur d’âge - Pour le divertissement uniquement',
            year: ['an', 'ans'], month: ['mois', 'mois'], day: ['jour', 'jours']
        },
        zh: {
            subtitle: '了解你的确切年龄，以及关于你生日的有趣信息',
            darkMode: '🌙 深色模式', lightMode: '☀️ 浅色模式', language: '语言',
            calcTitle: '计算你的年龄',
            miniDisclaimer: '仅供娱乐。星座和趣闻内容可能有误。',
            fullDisclaimerLink: '完整免责声明',
            birthLabel: '出生日期（月/日/年）：', birthHint: '斜杠可省略：06/16/1990 或 06161990',
            toLabel: '计算到（月/日/年）：', toHint: '留空则使用今天的日期',
            timeLabel: '出生时间（可选）：', placeLabel: '出生地点（可选）：',
            placeHint: '用于计算上升星座。城市名称通过 Open-Meteo 查询。',
            calculate: '计算年龄', forget: '在此设备上忘记我的生日',
            onThisDay: '📆 历史上的今天', another: '🎲 换一个',
            yourAge: '你的年龄', shareTitle: '📸 分享你的结果',
            shareIntro: '保存结果图片，发布或发送给朋友。',
            download: '⬇️ 下载图片', share: '📤 分享', copy: '📋 复制文字',
            countdownLink: '⏳ 打开你的生日倒计时页面',
            milestones: '🎯 你的里程碑', zodiacTitle: '🌟 你的星座与生肖', zodiacHint: '点击任意星座了解更多。',
            western: '西方星座', chinese: '中国生肖', vietnamese: '越南生肖', nativeAmerican: '美洲原住民',
            vedic: '吠陀', mayan: '玛雅', incan: '印加', tapDetails: '点击查看详情',
            moreAboutYou: '✨ 更多关于你', lifeInWeeks: '🗓️ 以周计算的人生',
            planets: '🪐 你在其他行星上的年龄', youInNumbers: '🧬 数字中的你',
            famousTitle: '👥 与你同一天出生的名人', tryPerson: '🎲 换一位名人',
            eventsTitle: '📅 你生日当天的历史事件', tryEvent: '🎲 换一个历史事件',
            compareTitle: '👯 和朋友比一比', friendName: '朋友的名字（可选）',
            friendBirthday: '朋友的生日（月/日/年）', compare: '比较',
            games: '🎮 游戏', twinsTitle: '🎂 生日双胞胎', yearTitle: '📜 猜年份',
            boardTitle: '🎈 生日板', boardName: '名字', boardBirthday: '生日（月/日/年）', boardAdd: '添加',
            footer: '年龄计算器 - 仅供娱乐',
            year: ['年', '年'], month: ['个月', '个月'], day: ['天', '天'], noSpace: true
        },
        vi: {
            subtitle: 'Khám phá tuổi chính xác của bạn và những điều thú vị về ngày sinh',
            darkMode: '🌙 Chế độ tối', lightMode: '☀️ Chế độ sáng', language: 'Ngôn ngữ',
            calcTitle: 'Tính tuổi của bạn',
            miniDisclaimer: 'Chỉ để giải trí. Nội dung về cung hoàng đạo và thông tin thú vị có thể có sai sót.',
            fullDisclaimerLink: 'Tuyên bố miễn trừ đầy đủ',
            birthLabel: 'Ngày sinh (MM/DD/YYYY):', birthHint: 'Dấu gạch chéo là tùy chọn: 06/16/1990 hoặc 06161990',
            toLabel: 'Tính tuổi đến ngày (MM/DD/YYYY):', toHint: 'Để trống để dùng ngày hôm nay',
            timeLabel: 'Giờ sinh (tùy chọn):', placeLabel: 'Nơi sinh (tùy chọn):',
            placeHint: 'Để tính cung mọc. Tên thành phố được tra cứu qua Open-Meteo.',
            calculate: 'Tính tuổi', forget: 'Quên ngày sinh của tôi trên thiết bị này',
            onThisDay: '📆 Ngày này năm xưa', another: '🎲 Cái khác',
            yourAge: 'Tuổi của bạn', shareTitle: '📸 Chia sẻ kết quả',
            shareIntro: 'Lưu ảnh kết quả để đăng hoặc gửi cho bạn bè.',
            download: '⬇️ Tải ảnh', share: '📤 Chia sẻ', copy: '📋 Sao chép văn bản',
            countdownLink: '⏳ Mở trang đếm ngược sinh nhật',
            milestones: '🎯 Các cột mốc của bạn', zodiacTitle: '🌟 Cung hoàng đạo của bạn', zodiacHint: 'Chạm vào cung bất kỳ để tìm hiểu thêm.',
            western: 'Hoàng đạo phương Tây', chinese: 'Con giáp Trung Quốc', vietnamese: 'Con giáp Việt Nam', nativeAmerican: 'Thổ dân châu Mỹ',
            vedic: 'Vệ Đà', mayan: 'Maya', incan: 'Inca', tapDetails: 'Chạm để xem chi tiết',
            moreAboutYou: '✨ Thêm về bạn', lifeInWeeks: '🗓️ Cuộc đời bạn tính theo tuần',
            planets: '🪐 Tuổi của bạn trên các hành tinh khác', youInNumbers: '🧬 Bạn qua những con số',
            famousTitle: '👥 Người nổi tiếng sinh cùng ngày', tryPerson: '🎲 Người nổi tiếng khác',
            eventsTitle: '📅 Sự kiện lịch sử vào ngày của bạn', tryEvent: '🎲 Sự kiện khác',
            compareTitle: '👯 So sánh với bạn bè', friendName: 'Tên bạn bè (tùy chọn)',
            friendBirthday: 'Ngày sinh của bạn bè (MM/DD/YYYY)', compare: 'So sánh',
            games: '🎮 Trò chơi', twinsTitle: '🎂 Sinh nhật trùng nhau', yearTitle: '📜 Đoán năm',
            boardTitle: '🎈 Bảng sinh nhật', boardName: 'Tên', boardBirthday: 'Ngày sinh (MM/DD/YYYY)', boardAdd: 'Thêm',
            footer: 'Máy tính tuổi - Chỉ để giải trí',
            year: ['năm', 'năm'], month: ['tháng', 'tháng'], day: ['ngày', 'ngày']
        }
    };

    function getStored() { try { return localStorage.getItem('language'); } catch (e) { return null; } }
    function setStored(v) { try { localStorage.setItem('language', v); } catch (e) { /* ignore */ } }

    function detect() {
        const saved = getStored();
        if (saved && STRINGS[saved]) return saved;
        const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
        return STRINGS[nav] ? nav : 'en';
    }

    let lang = 'en';

    function t(key, vars) {
        let s = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
        if (vars && typeof s === 'string') Object.keys(vars).forEach(k => { s = s.replace(`{${k}}`, vars[k]); });
        return s;
    }

    function unit(n, name) {
        const forms = (STRINGS[lang] && STRINGS[lang][name]) || STRINGS.en[name];
        const word = n === 1 ? forms[0] : forms[1];
        return `${n.toLocaleString()}${STRINGS[lang].noSpace ? '' : ' '}${word}`;
    }

    function apply() {
        document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
        document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(node => { node.placeholder = t(node.dataset.i18nPlaceholder); });
        if (window.AgeCalc && document.getElementById('themeToggle')) {
            window.AgeCalc.applyTheme(document.documentElement.dataset.theme || 'light');
        }
    }

    function setLanguage(next) {
        if (!STRINGS[next]) return;
        lang = next;
        setStored(next);
        apply();
        document.dispatchEvent(new CustomEvent('agecalc:language', { detail: { lang } }));
    }

    document.addEventListener('DOMContentLoaded', () => {
        lang = detect();
        const select = document.getElementById('languageSelect');
        if (select) {
            Object.entries(LANGUAGES).forEach(([code, name]) => {
                const o = document.createElement('option');
                o.value = code;
                o.textContent = name;
                select.append(o);
            });
            select.value = lang;
            select.addEventListener('change', () => setLanguage(select.value));
        }
        apply();
    });

    window.I18N = { t, unit, setLanguage, get language() { return lang; }, LANGUAGES, STRINGS };
})();
