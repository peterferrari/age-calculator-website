// More extras for the Age Calculator: moon and rising signs, birthstone and flower,
// numerology, generation, day-born rhyme, life in weeks, On This Day, and a birthday board.
// Listens for the `agecalc:results` event from script.js.

(function () {
    'use strict';

    const A = window.AgeCalc;
    const { el, plural, dayDiff, clampedDate, getDatabase, storage } = A;
    const $ = id => document.getElementById(id);
    const rad = d => (d * Math.PI) / 180;
    const norm = d => ((d % 360) + 360) % 360;
    const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const SIGN_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

    function card(title, children) {
        return el('div', { className: 'fun-card' }, [el('h4', {}, [title]), ...children]);
    }

    function statList(rows) {
        return el('ul', { className: 'stat-list' }, rows.map(([label, value]) =>
            el('li', {}, [el('span', { className: 'stat-label' }, [label]), el('span', { className: 'stat-value' }, [value])])));
    }

    // ---------- Astronomy (tropical zodiac, low-precision formulas from Meeus) ----------
    function julianDay(date) { return date.getTime() / 86400000 + 2440587.5; }

    function sunLongitude(date) {
        const T = (julianDay(date) - 2451545) / 36525;
        const L0 = 280.46646 + 36000.76983 * T;
        const M = rad(357.52911 + 35999.05029 * T);
        const C = (1.914602 - 0.004817 * T) * Math.sin(M) + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
        const omega = rad(125.04 - 1934.136 * T);
        return norm(L0 + C - 0.00569 - 0.00478 * Math.sin(omega));
    }

    function moonLongitude(date) {
        const T = (julianDay(date) - 2451545) / 36525;
        const Lp = 218.3164477 + 481267.88123421 * T;
        const D = rad(297.8501921 + 445267.1114034 * T);
        const M = rad(357.5291092 + 35999.0502909 * T);
        const Mp = rad(134.9633964 + 477198.8675055 * T);
        const F = rad(93.2720950 + 483202.0175233 * T);
        const terms = [
            [6.288774, Mp], [1.274027, 2 * D - Mp], [0.658314, 2 * D], [0.213618, 2 * Mp], [-0.185116, M],
            [-0.114332, 2 * F], [0.058793, 2 * D - 2 * Mp], [0.057066, 2 * D - M - Mp], [0.053322, 2 * D + Mp],
            [0.045758, 2 * D - M], [-0.040923, M - Mp], [-0.034720, D], [-0.030383, M + Mp], [0.015327, 2 * D - 2 * F],
            [-0.012528, Mp + 2 * F], [0.010980, Mp - 2 * F], [0.010675, 4 * D - Mp], [0.010034, 3 * Mp],
            [0.008548, 4 * D - 2 * Mp], [-0.007888, 2 * D + M - Mp], [-0.006766, 2 * D + M], [-0.005163, D - Mp],
            [0.004987, D + M], [0.004036, 2 * D - M + Mp]
        ];
        return norm(Lp + terms.reduce((sum, [a, arg]) => sum + a * Math.sin(arg), 0));
    }

    // Ascendant (rising sign) for a moment and place. lat/lon in degrees, east positive.
    function ascendant(date, lat, lon) {
        const jd = julianDay(date);
        const T = (jd - 2451545) / 36525;
        const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T - (T * T * T) / 38710000;
        const ramc = rad(norm(gmst + lon));
        const eps = rad(23.439291 - 0.0130042 * T);
        const asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(rad(lat)) * Math.sin(eps)));
        return norm((asc * 180) / Math.PI);
    }

    function signOf(longitude) {
        const i = Math.floor(norm(longitude) / 30);
        return { name: SIGNS[i], symbol: SIGN_SYMBOLS[i], degree: Math.floor(norm(longitude) % 30) };
    }

    function renderAstrology(detail) {
        const { birth, birthMoment, hasTime, place } = detail;
        // Without a birth time, use noon so the moon is at most ~6.5° off.
        const moment = hasTime ? birthMoment
            : (place ? A.zonedTimeToUtc(birth.getFullYear(), birth.getMonth(), birth.getDate(), 12, 0, place.timeZone)
                : new Date(birth.getFullYear(), birth.getMonth(), birth.getDate(), 12));
        const sun = signOf(sunLongitude(moment));
        const moon = signOf(moonLongitude(moment));
        const rows = [
            ['☀️ Sun sign', `${sun.symbol} ${sun.name} ${sun.degree}°`],
            ['🌙 Moon sign', `${moon.symbol} ${moon.name} ${moon.degree}°${hasTime ? '' : ' (approx.)'}`]
        ];
        const notes = [];
        if (hasTime && place) {
            const asc = signOf(ascendant(birthMoment, place.lat, place.lon));
            rows.push(['⬆️ Rising sign', `${asc.symbol} ${asc.name} ${asc.degree}°`]);
            notes.push(`Calculated for ${place.name} (${place.timeZone}).`);
        } else {
            notes.push(hasTime
                ? 'Add your place of birth to see your rising sign.'
                : 'Add your birth time and place to see your rising sign and an exact moon sign.');
            if (!hasTime && moon.degree <= 6) notes.push(`Your moon may be in ${signOf(moonLongitude(moment) - 7).name} if you were born in the morning.`);
            if (!hasTime && moon.degree >= 24) notes.push(`Your moon may be in ${signOf(moonLongitude(moment) + 7).name} if you were born in the evening.`);
        }
        const descriptions = {
            Aries: 'bold and quick to act', Taurus: 'steady and comfort-loving', Gemini: 'curious and chatty',
            Cancer: 'caring and protective', Leo: 'warm and expressive', Virgo: 'thoughtful and practical',
            Libra: 'gracious and fair', Scorpio: 'deep and intense', Sagittarius: 'free-spirited and optimistic',
            Capricorn: 'grounded and ambitious', Aquarius: 'original and independent', Pisces: 'gentle and imaginative'
        };
        const blurb = `Your moon in ${moon.name} suggests your inner, emotional side is ${descriptions[moon.name]}.`;
        return card('🔭 Sun, Moon and Rising', [statList(rows), el('p', {}, [blurb]), ...notes.map(n => el('p', { className: 'fine-print' }, [n]))]);
    }

    // ---------- Birthstone, flower, colour ----------
    const BIRTH_MONTH = [
        ['Garnet', 'Carnation and snowdrop', 'Deep red', '#9b2c2c'],
        ['Amethyst', 'Violet and primrose', 'Purple', '#6b46c1'],
        ['Aquamarine and bloodstone', 'Daffodil and jonquil', 'Aqua blue', '#4fd1c5'],
        ['Diamond', 'Daisy and sweet pea', 'White', '#e2e8f0'],
        ['Emerald', 'Lily of the valley and hawthorn', 'Green', '#2f855a'],
        ['Pearl, moonstone and alexandrite', 'Rose and honeysuckle', 'Cream', '#fefcbf'],
        ['Ruby', 'Larkspur and water lily', 'Red', '#e53e3e'],
        ['Peridot, spinel and sardonyx', 'Gladiolus and poppy', 'Lime green', '#9ae6b4'],
        ['Sapphire', 'Aster and morning glory', 'Blue', '#2b6cb0'],
        ['Opal and tourmaline', 'Marigold and cosmos', 'Pink', '#ed64a6'],
        ['Topaz and citrine', 'Chrysanthemum', 'Yellow', '#ecc94b'],
        ['Turquoise, tanzanite and zircon', 'Narcissus and holly', 'Sky blue', '#63b3ed']
    ];

    function renderBirthMonth(birth) {
        const [stone, flower, colour, hex] = BIRTH_MONTH[birth.getMonth()];
        const swatch = el('span', { className: 'swatch' });
        swatch.style.background = hex;
        swatch.setAttribute('aria-hidden', 'true');
        const month = birth.toLocaleDateString('en-US', { month: 'long' });
        return card(`💎 Your ${month} Birthday`, [statList([
            ['Birthstone', stone],
            ['Birth flower', flower],
            ['Lucky colour', el('span', {}, [swatch, ` ${colour}`])]
        ])]);
    }

    // ---------- Numerology ----------
    const LIFE_PATH = {
        1: 'The Leader: independent, driven and original.',
        2: 'The Peacemaker: diplomatic, kind and a great partner.',
        3: 'The Communicator: creative, social and expressive.',
        4: 'The Builder: practical, loyal and hardworking.',
        5: 'The Adventurer: curious, free and full of energy.',
        6: 'The Nurturer: caring, responsible and family-minded.',
        7: 'The Seeker: thoughtful, wise and a deep thinker.',
        8: 'The Achiever: ambitious, confident and powerful.',
        9: 'The Humanitarian: generous, compassionate and idealistic.',
        11: 'Master Number 11, The Intuitive: inspiring and highly sensitive.',
        22: 'Master Number 22, The Master Builder: turns big dreams into reality.',
        33: 'Master Number 33, The Master Teacher: devoted to helping others.'
    };

    const digitSum = n => String(n).split('').reduce((a, d) => a + Number(d), 0);

    function reduce(n, keepMaster) {
        while (n > 9 && !(keepMaster && (n === 11 || n === 22 || n === 33))) n = digitSum(n);
        return n;
    }

    // Standard method: reduce month, day and year separately, then add them and reduce again.
    function lifePathNumber(date) {
        const total = reduce(date.getMonth() + 1, true) + reduce(date.getDate(), true) + reduce(date.getFullYear(), true);
        return reduce(total, true);
    }

    function renderNumerology(birth) {
        const n = lifePathNumber(birth);
        const m = birth.getMonth() + 1, d = birth.getDate(), y = birth.getFullYear();
        return card('🔢 Your Life Path Number', [
            el('div', { className: 'big-number' }, [String(n)]),
            el('p', {}, [LIFE_PATH[n]]),
            el('p', { className: 'fine-print' }, [`From ${m} + ${d} + ${y}, each reduced to a single digit and added together.`])
        ]);
    }

    // ---------- Generation ----------
    const GENERATIONS = [
        [1901, 1927, 'The Greatest Generation', 'Grew up through the Great Depression and fought in World War II.'],
        [1928, 1945, 'The Silent Generation', 'Came of age in the 1950s and built the postwar world.'],
        [1946, 1964, 'Baby Boomers', 'Named for the huge jump in births after World War II.'],
        [1965, 1980, 'Generation X', 'The first generation to grow up with home computers and MTV.'],
        [1981, 1996, 'Millennials', 'Came of age around the year 2000 and the rise of the internet.'],
        [1997, 2012, 'Generation Z', 'The first generation to grow up with smartphones.'],
        [2013, 2024, 'Generation Alpha', 'Growing up with tablets, voice assistants and AI.'],
        [2025, 2039, 'Generation Beta', 'The newest generation, born from 2025 onward.']
    ];

    function generationOf(year) {
        return GENERATIONS.find(([from, to]) => year >= from && year <= to) || null;
    }

    // ---------- Day-born rhyme (traditional) ----------
    const RHYME = [
        "Sunday's child is bonny and blithe, and good and gay.",
        "Monday's child is fair of face.",
        "Tuesday's child is full of grace.",
        "Wednesday's child is full of woe.",
        "Thursday's child has far to go.",
        "Friday's child is loving and giving.",
        "Saturday's child works hard for a living."
    ];

    function renderGenerationAndRhyme(birth) {
        const gen = generationOf(birth.getFullYear());
        const children = [];
        if (gen) {
            children.push(el('p', { className: 'highlight' }, [`${gen[2]} (${gen[0]}–${gen[1]})`]), el('p', {}, [gen[3]]));
        }
        children.push(
            el('p', { className: 'highlight' }, [`Born on a ${birth.toLocaleDateString('en-US', { weekday: 'long' })}`]),
            el('p', { className: 'rhyme' }, [`“${RHYME[birth.getDay()]}”`]),
            el('p', { className: 'fine-print' }, ['From the traditional nursery rhyme “Monday’s Child”. Generation years follow common definitions.'])
        );
        return card('👪 Your Generation and Day', children);
    }

    // ---------- Life in weeks ----------
    function renderLifeInWeeks(birth) {
        const canvas = $('lifeWeeks');
        const ctx = canvas.getContext('2d');
        const cols = 52, rows = 90, cell = 10, gap = 2, pad = 30;
        canvas.width = pad + cols * (cell + gap);
        canvas.height = pad + rows * (cell + gap);
        const dark = document.documentElement.dataset.theme === 'dark';
        const lived = Math.floor(dayDiff(birth, A.startOfToday()) / 7);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = dark ? '#a0aec0' : '#718096';
        ctx.font = '10px system-ui, sans-serif';
        ctx.textAlign = 'right';
        for (let r = 0; r < rows; r++) {
            if (r % 10 === 0) ctx.fillText(String(r), pad - 6, pad + r * (cell + gap) + cell - 1);
            for (let c = 0; c < cols; c++) {
                const week = r * cols + c;
                ctx.fillStyle = week < lived ? '#667eea' : week === lived ? '#ed64a6' : (dark ? '#2d3352' : '#e2e8f0');
                ctx.fillRect(pad + c * (cell + gap), pad + r * (cell + gap), cell, cell);
            }
        }
        ctx.textAlign = 'left';
        ctx.fillStyle = dark ? '#a0aec0' : '#718096';
        ctx.fillText('Weeks of the year →', pad, 16);
        const pct = Math.min(100, (lived / (rows * cols)) * 100);
        $('lifeWeeksNote').textContent = `Each square is one week; each row is one year, up to age 90. ` +
            `You've lived ${lived.toLocaleString()} weeks (${pct.toFixed(0)}% of 90 years). The pink square is this week.`;
    }

    // ---------- On This Day ----------
    function renderOnThisDay() {
        const today = A.startOfToday();
        const key = `${today.getMonth() + 1}-${today.getDate()}`;
        const people = (getDatabase('FAMOUS_PEOPLE') || {})[key] || [];
        const events = (getDatabase('HISTORICAL_EVENTS') || {})[key] || [];
        const pick = list => (list.length ? list[Math.floor(Math.random() * list.length)] : null);
        $('onThisDayDate').textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        $('onThisDayBody').replaceChildren(statList([
            ['🎂 Born today', pick(people) || 'No birthdays on file'],
            ['📜 Happened today', pick(events) || 'No events on file']
        ]));
    }

    // ---------- Birthday board ----------
    const BOARD_KEY = 'birthdayBoard';

    function loadBoard() {
        try { return JSON.parse(storage.get(BOARD_KEY) || '[]').filter(p => p && p.name && p.date); } catch (e) { return []; }
    }

    function saveBoard(list) { storage.set(BOARD_KEY, JSON.stringify(list)); }

    function nextBirthdayInfo(dateText) {
        const birth = A.parseMMDDYYYY(dateText);
        const today = A.startOfToday();
        return Object.assign({ birth }, A.nextBirthday(birth, today));
    }

    function renderBoard() {
        const list = loadBoard().map(p => Object.assign({}, p, nextBirthdayInfo(p.date))).sort((a, b) => a.daysAway - b.daysAway);
        const box = $('boardList');
        if (!list.length) {
            box.replaceChildren(el('p', { className: 'fine-print' }, ['Add family and friends to see whose birthday is next. Saved on this device only.']));
            return;
        }
        box.replaceChildren(el('ul', { className: 'board-list' }, list.map(p => {
            const when = p.daysAway === 0 ? '🎉 Today!' : p.daysAway === 1 ? 'Tomorrow' : `in ${plural(p.daysAway, 'day')}`;
            const remove = el('button', { type: 'button', className: 'remove-btn', textContent: '✕' });
            remove.setAttribute('aria-label', `Remove ${p.name}`);
            remove.addEventListener('click', () => {
                saveBoard(loadBoard().filter(x => !(x.name === p.name && x.date === p.date)));
                renderBoard();
            });
            return el('li', { className: p.daysAway === 0 ? 'today' : '' }, [
                el('span', { className: 'board-name' }, [p.name]),
                el('span', { className: 'board-when' }, [`Turns ${p.turning} ${when}`]),
                el('span', { className: 'board-date' }, [p.birth.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })]),
                remove
            ]);
        })));
    }

    function handleBoardAdd(e) {
        e.preventDefault();
        const name = $('boardName').value.trim();
        const dateText = $('boardDate').value.trim();
        const error = $('boardError');
        const birth = A.parseMMDDYYYY(dateText);
        error.hidden = true;
        if (!name) { error.textContent = 'Please enter a name.'; error.hidden = false; return; }
        if (!birth || birth > A.startOfToday()) { error.textContent = 'Please enter a past birthday as MM/DD/YYYY or MMDDYYYY.'; error.hidden = false; return; }
        const list = loadBoard();
        if (list.length >= 100) { error.textContent = 'The board holds up to 100 birthdays.'; error.hidden = false; return; }
        list.push({ name: name.slice(0, 40), date: dateText });
        saveBoard(list);
        $('boardName').value = '';
        $('boardDate').value = '';
        renderBoard();
        $('boardName').focus();
    }

    // ---------- Wiring ----------
    document.addEventListener('agecalc:results', e => {
        const d = e.detail;
        $('moreAboutYou').replaceChildren(
            renderAstrology(d), renderBirthMonth(d.birth), renderNumerology(d.birth), renderGenerationAndRhyme(d.birth)
        );
        renderLifeInWeeks(d.birth);
        const mmdd = `${String(d.birth.getMonth() + 1).padStart(2, '0')}-${String(d.birth.getDate()).padStart(2, '0')}-${d.birth.getFullYear()}`;
        $('countdownLink').href = `countdown.html#${mmdd}`;
    });

    document.addEventListener('agecalc:theme', () => {
        const birth = A.parseMMDDYYYY($('birthDate').value || '');
        if (birth && !$('results').hidden) renderLifeInWeeks(birth);
    });

    document.addEventListener('DOMContentLoaded', () => {
        renderOnThisDay();
        $('onThisDayAgain').addEventListener('click', renderOnThisDay);
        A.autoFormatDate($('boardDate'));
        $('boardForm').addEventListener('submit', handleBoardAdd);
        renderBoard();
    });

    window.AgeCalcExtras = { sunLongitude, moonLongitude, ascendant, signOf, lifePathNumber, generationOf };
})();
