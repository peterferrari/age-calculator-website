// Age Calculator
// Plain browser script. Data comes from the globals defined in data/*.js:
// FAMOUS_PEOPLE, HISTORICAL_EVENTS, ACADEMY_AWARDS, ZODIAC_INFO.

(function () {
    'use strict';

    const MS_PER_DAY = 86400000;
    const MIN_YEAR = 1900;

    let current = null; // { birthDate, lastPerson, lastEvent }

    // ---------- Safe storage (private windows can throw) ----------
    const storage = {
        get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
        set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } }
    };

    // ---------- Date helpers ----------
    function daysInMonth(year, monthIndex) {
        return new Date(year, monthIndex + 1, 0).getDate();
    }

    // Date for (year, monthIndex, day), clamping the day to the month's length
    // so Jan 31 + 1 month = Feb 28/29 and a Feb 29 birthday maps to Feb 28.
    function clampedDate(year, monthIndex, day) {
        const y = year + Math.floor(monthIndex / 12);
        const m = ((monthIndex % 12) + 12) % 12;
        return new Date(y, m, Math.min(day, daysInMonth(y, m)));
    }

    // Whole calendar days between two dates, immune to daylight-saving shifts.
    function dayDiff(a, b) {
        const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.round((ub - ua) / MS_PER_DAY);
    }

    function startOfToday() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // Accepts MM/DD/YYYY (or M/D/YYYY, with "/", "-" or "." separators) and MMDDYYYY with no separators.
    function parseMMDDYYYY(value) {
        const text = value.trim();
        const match = text.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/) || text.match(/^(\d{2})(\d{2})(\d{4})$/);
        if (!match) return null;
        const month = Number(match[1]);
        const day = Number(match[2]);
        const year = Number(match[3]);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return null; // e.g. 02/30/2001
        }
        return date;
    }

    function formatDate(date) {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    // ---------- Translation hook (i18n.js) ----------
    const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);
    const unit = (n, name) => (window.I18N ? window.I18N.unit(n, name) : plural(n, name));

    // ---------- Birth time and place ----------
    // "HH:MM" from <input type="time">.
    function parseTime(value) {
        const m = (value || '').trim().match(/^(\d{1,2}):(\d{2})/);
        if (!m) return null;
        const h = Number(m[1]), mi = Number(m[2]);
        return h <= 23 && mi <= 59 ? { h, mi } : null;
    }

    const placeCache = {};

    // Finds a place with the free Open-Meteo geocoding service (no key needed).
    async function lookupPlace(name) {
        const key = name.toLowerCase();
        if (placeCache[key]) return placeCache[key];
        const url = 'https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name=' + encodeURIComponent(name);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Place lookup failed');
        const json = await res.json();
        const r = json.results && json.results[0];
        if (!r) return null;
        const place = {
            name: [r.name, r.admin1, r.country].filter(Boolean).join(', '),
            lat: r.latitude, lon: r.longitude, timeZone: r.timezone
        };
        placeCache[key] = place;
        return place;
    }

    // The real moment for a wall-clock time in an IANA time zone (handles historic DST rules).
    function zonedTimeToUtc(y, m, d, h, mi, timeZone) {
        const target = Date.UTC(y, m, d, h, mi);
        let guess = target;
        const fmt = new Intl.DateTimeFormat('en-US', {
            timeZone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'
        });
        for (let i = 0; i < 3; i++) {
            const p = Object.fromEntries(fmt.formatToParts(new Date(guess)).map(x => [x.type, x.value]));
            const shown = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute);
            guess += target - shown;
        }
        return new Date(guess);
    }

    // ---------- Age calculation ----------
    function calculateAge(birth, to, isToday) {
        let totalMonths = (to.getFullYear() - birth.getFullYear()) * 12 + (to.getMonth() - birth.getMonth());
        if (clampedDate(birth.getFullYear(), birth.getMonth() + totalMonths, birth.getDate()) > to) {
            totalMonths--;
        }
        const anchor = clampedDate(birth.getFullYear(), birth.getMonth() + totalMonths, birth.getDate());

        const totalDays = dayDiff(birth, to);
        // When counting to "today", include the time elapsed so far today.
        const extraMs = isToday ? Date.now() - startOfToday().getTime() : 0;
        const totalMinutes = Math.floor((totalDays * MS_PER_DAY + extraMs) / 60000);

        return {
            years: Math.floor(totalMonths / 12),
            months: totalMonths % 12,
            days: dayDiff(anchor, to),
            totalMonths,
            totalWeeks: Math.floor(totalDays / 7),
            totalDays,
            totalHours: Math.floor(totalMinutes / 60),
            totalMinutes
        };
    }

    function nextBirthday(birth, from) {
        let years = from.getFullYear() - birth.getFullYear();
        let next = clampedDate(birth.getFullYear() + years, birth.getMonth(), birth.getDate());
        if (next < from) {
            years++;
            next = clampedDate(birth.getFullYear() + years, birth.getMonth(), birth.getDate());
        }
        return { date: next, turning: years, daysAway: dayDiff(from, next) };
    }

    // ---------- Zodiac systems ----------
    // Each returns { key, title, lines[] }. `key` is used to look up ZODIAC_INFO.

    // Finds the entry whose start date (month/day at the given indexes) most
    // recently precedes the date, wrapping around the new year.
    function findByStartDate(list, date, monthIdx, dayIdx) {
        const md = (date.getMonth() + 1) * 100 + date.getDate();
        const start = e => e[monthIdx] * 100 + e[dayIdx];
        const before = list.filter(e => start(e) <= md);
        const pool = before.length ? before : list;
        return pool.reduce((a, b) => (start(a) > start(b) ? a : b));
    }

    const WESTERN = [
        // [name, symbol, element, quality, traits, start month, start day]
        ['Capricorn', '♑', 'Earth', 'Cardinal', 'Ambitious, Practical, Disciplined', 12, 22],
        ['Aquarius', '♒', 'Air', 'Fixed', 'Independent, Innovative, Humanitarian', 1, 20],
        ['Pisces', '♓', 'Water', 'Mutable', 'Compassionate, Intuitive, Artistic', 2, 19],
        ['Aries', '♈', 'Fire', 'Cardinal', 'Energetic, Courageous, Leader', 3, 21],
        ['Taurus', '♉', 'Earth', 'Fixed', 'Reliable, Patient, Sensual', 4, 20],
        ['Gemini', '♊', 'Air', 'Mutable', 'Curious, Adaptable, Communicative', 5, 21],
        ['Cancer', '♋', 'Water', 'Cardinal', 'Nurturing, Emotional, Protective', 6, 21],
        ['Leo', '♌', 'Fire', 'Fixed', 'Confident, Generous, Dramatic', 7, 23],
        ['Virgo', '♍', 'Earth', 'Mutable', 'Analytical, Helpful, Perfectionist', 8, 23],
        ['Libra', '♎', 'Air', 'Cardinal', 'Harmonious, Diplomatic, Artistic', 9, 23],
        ['Scorpio', '♏', 'Water', 'Fixed', 'Intense, Passionate, Mysterious', 10, 23],
        ['Sagittarius', '♐', 'Fire', 'Mutable', 'Adventurous, Optimistic, Philosophical', 11, 22]
    ];

    function getWesternZodiac(date) {
        const [name, symbol, element, quality, traits] = findByStartDate(WESTERN, date, 5, 6);
        return { key: name, title: `${symbol} ${name}`, lines: [`${element} • ${quality}`, traits] };
    }

    // Lunar year via the browser's Chinese calendar (handles Lunar New Year in Jan/Feb).
    function getLunarYear(date) {
        try {
            const parts = new Intl.DateTimeFormat('en-u-ca-chinese', { year: 'numeric' }).formatToParts(date);
            const related = parts.find(p => p.type === 'relatedYear');
            if (related) return { year: Number(related.value), exact: true };
        } catch (e) { /* fall through */ }
        return { year: date.getFullYear(), exact: false };
    }

    const CHINESE_ANIMALS = [
        ['Rat', 'Intelligent, Adaptable, Quick-witted'],
        ['Ox', 'Reliable, Strong, Determined'],
        ['Tiger', 'Brave, Confident, Competitive'],
        ['Rabbit', 'Quiet, Elegant, Kind'],
        ['Dragon', 'Energetic, Intelligent, Gifted'],
        ['Snake', 'Wise, Enigmatic, Intuitive'],
        ['Horse', 'Animated, Active, Energetic'],
        ['Goat', 'Calm, Gentle, Sympathetic'],
        ['Monkey', 'Sharp, Smart, Curious'],
        ['Rooster', 'Observant, Hardworking, Courageous'],
        ['Dog', 'Loyal, Honest, Responsible'],
        ['Pig', 'Compassionate, Generous, Diligent']
    ];
    const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
    const mod = (n, m) => ((n % m) + m) % m;

    function lunarAnimal(date) {
        const lunar = getLunarYear(date);
        const offset = lunar.year - 4; // 4 CE was a Wood Rat year
        return { lunar, animalIndex: mod(offset, 12), element: ELEMENTS[Math.floor(mod(offset, 10) / 2)] };
    }

    function lunarNote(date, lunar) {
        if (!lunar.exact) return 'Based on calendar year';
        return lunar.year !== date.getFullYear() ? `Lunar year ${lunar.year} (before Lunar New Year)` : `Lunar year ${lunar.year}`;
    }

    function getChineseZodiac(date) {
        const { lunar, animalIndex, element } = lunarAnimal(date);
        const [name, traits] = CHINESE_ANIMALS[animalIndex];
        return { key: name, title: `${element} ${name}`, lines: [traits, lunarNote(date, lunar)] };
    }

    function getVietnameseZodiac(date) {
        const { lunar, animalIndex, element } = lunarAnimal(date);
        // The Vietnamese zodiac uses the Buffalo for the Ox and the Cat for the Rabbit.
        const [name, traits] = CHINESE_ANIMALS[animalIndex];
        const vnName = { Ox: 'Buffalo', Rabbit: 'Cat' }[name] || name;
        const isCat = vnName === 'Cat';
        return {
            key: isCat ? 'Cat' : name,
            infoSystem: isCat ? 'vietnamese' : 'chinese',
            title: `${element} ${vnName}`,
            lines: [isCat ? 'Graceful, Intuitive, Diplomatic' : traits, lunarNote(date, lunar)]
        };
    }

    const NATIVE_AMERICAN = [
        ['Red Hawk', 'Fire', 'Leadership, Initiative, Pioneer', 'Fire Opal', 3, 21],
        ['Beaver', 'Earth', 'Builder, Methodical, Determined', 'Chrysocolla', 4, 20],
        ['Deer', 'Air', 'Gentle, Inspiring, Alert', 'Moss Agate', 5, 21],
        ['Woodpecker', 'Water', 'Nurturing, Protective, Devoted', 'Carnelian', 6, 21],
        ['Salmon', 'Fire', 'Focused, Enthusiastic, Generous', 'Red Jasper', 7, 22],
        ['Brown Bear', 'Earth', 'Practical, Methodical, Industrious', 'Amethyst', 8, 22],
        ['Raven', 'Air', 'Charming, Diplomatic, Idealistic', 'Jasper', 9, 22],
        ['Snake', 'Water', 'Mysterious, Ambitious, Secretive', 'Copper', 10, 23],
        ['Owl', 'Fire', 'Adventurous, Independent, Changeable', 'Obsidian', 11, 23],
        ['Goose', 'Earth', 'Ambitious, Driven, Persevering', 'Quartz', 12, 22],
        ['Otter', 'Air', 'Independent, Unconventional, Friendly', 'Silver', 1, 20],
        ['Wolf', 'Water', 'Emotional, Passionate, Generous', 'Turquoise', 2, 19]
    ];

    function getNativeAmericanZodiac(date) {
        const [name, element, traits, stone] = findByStartDate(NATIVE_AMERICAN, date, 4, 5);
        return { key: name, title: name, lines: [`${element} Element`, traits, `Sacred Stone: ${stone}`] };
    }

    const VEDIC = [
        ['Mesha', 'Aries', 'Mars', 'Red Coral', 4, 14],
        ['Vrishabha', 'Taurus', 'Venus', 'Diamond', 5, 15],
        ['Mithuna', 'Gemini', 'Mercury', 'Emerald', 6, 15],
        ['Karka', 'Cancer', 'Moon', 'Pearl', 7, 15],
        ['Simha', 'Leo', 'Sun', 'Ruby', 8, 15],
        ['Kanya', 'Virgo', 'Mercury', 'Emerald', 9, 16],
        ['Tula', 'Libra', 'Venus', 'Diamond', 10, 16],
        ['Vrishchika', 'Scorpio', 'Mars', 'Red Coral', 11, 15],
        ['Dhanus', 'Sagittarius', 'Jupiter', 'Yellow Sapphire', 12, 15],
        ['Makara', 'Capricorn', 'Saturn', 'Blue Sapphire', 1, 14],
        ['Kumbha', 'Aquarius', 'Saturn', 'Blue Sapphire', 2, 13],
        ['Meena', 'Pisces', 'Jupiter', 'Yellow Sapphire', 3, 14]
    ];

    function getVedicZodiac(date) {
        const [name, western, ruler, gem] = findByStartDate(VEDIC, date, 4, 5);
        return { key: name, title: `${name} (${western})`, lines: [`Ruler: ${ruler}`, `Gem: ${gem}`, 'Sidereal sun sign'] };
    }

    // Mayan Tzolk'in day sign, using the standard GMT correlation (JDN 584283).
    const TZOLKIN = [
        ['Imix', 'Crocodile'], ['Ik', 'Wind'], ['Akbal', 'Night'], ['Kan', 'Seed'],
        ['Chicchan', 'Serpent'], ['Cimi', 'Death'], ['Manik', 'Deer'], ['Lamat', 'Star'],
        ['Muluc', 'Water'], ['Oc', 'Dog'], ['Chuen', 'Monkey'], ['Eb', 'Road'],
        ['Ben', 'Reed'], ['Ix', 'Jaguar'], ['Men', 'Eagle'], ['Cib', 'Vulture'],
        ['Caban', 'Earth'], ['Etznab', 'Flint'], ['Cauac', 'Storm'], ['Ahau', 'Lord']
    ];

    function getMayanZodiac(date) {
        const jdn = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY) + 2440588;
        const days = jdn - 584283; // day 0 of the Long Count = 4 Ahau
        const number = mod(days + 3, 13) + 1;
        const [name, meaning] = TZOLKIN[mod(days + 19, 20)];
        return { key: name, title: `${number} ${name}`, lines: [meaning, "Tzolk'in day sign"] };
    }

    const INCAN = ['Puma', 'Condor', 'Serpent', 'Fox', 'Llama', 'Falcon', 'Vicuña', 'Jaguar', 'Coca', 'Mountain', 'Chuya', 'Amaru'];

    function getIncanZodiac(date) {
        const name = INCAN[date.getMonth()];
        return { key: name, title: name, lines: [`${date.toLocaleDateString('en-US', { month: 'long' })} sign`] };
    }

    const ZODIAC_SYSTEMS = {
        western: { label: 'Western Astrology', fn: getWesternZodiac },
        chinese: { label: 'Chinese Zodiac', fn: getChineseZodiac },
        vietnamese: { label: 'Vietnamese Zodiac', fn: getVietnameseZodiac },
        nativeAmerican: { label: 'Native American Zodiac', fn: getNativeAmericanZodiac },
        vedic: { label: 'Vedic Astrology', fn: getVedicZodiac },
        mayan: { label: 'Mayan Astrology', fn: getMayanZodiac },
        incan: { label: 'Incan Astrology', fn: getIncanZodiac }
    };

    // ---------- Data lookups ----------
    // `const` globals from classic scripts are not properties of window, so check by name.
    function getDatabase(name) {
        switch (name) {
            case 'FAMOUS_PEOPLE': return typeof FAMOUS_PEOPLE !== 'undefined' ? FAMOUS_PEOPLE : null;
            case 'HISTORICAL_EVENTS': return typeof HISTORICAL_EVENTS !== 'undefined' ? HISTORICAL_EVENTS : null;
            case 'ACADEMY_AWARDS': return typeof ACADEMY_AWARDS !== 'undefined' ? ACADEMY_AWARDS : null;
            case 'ZODIAC_INFO': return typeof ZODIAC_INFO !== 'undefined' ? ZODIAC_INFO : null;
            default: return null;
        }
    }

    function entriesForDay(dbName, date) {
        const db = getDatabase(dbName);
        return db ? db[`${date.getMonth() + 1}-${date.getDate()}`] || null : null;
    }

    function pickRandom(list, avoid) {
        if (!list || list.length === 0) return null;
        if (list.length === 1) return list[0];
        let choice;
        do { choice = list[Math.floor(Math.random() * list.length)]; } while (choice === avoid);
        return choice;
    }

    // ---------- DOM helpers ----------
    const $ = id => document.getElementById(id);

    function el(tag, props, children) {
        const node = document.createElement(tag);
        if (props) Object.assign(node, props);
        (children || []).forEach(c => node.append(c));
        return node;
    }

    function plural(n, word) {
        return `${n.toLocaleString()} ${word}${n === 1 ? '' : 's'}`;
    }

    function showError(message) {
        const box = $('formError');
        box.textContent = message;
        box.hidden = false;
        $('results').hidden = true;
    }

    function clearError() {
        $('formError').textContent = '';
        $('formError').hidden = true;
    }

    // ---------- Rendering ----------
    function renderAge(birth, to, isToday, age) {
        const box = $('ageResult');
        box.replaceChildren(
            el('div', { className: 'age-main' }, [
                `${unit(age.years, 'year')}, ${unit(age.months, 'month')}, ${unit(age.days, 'day')}`
            ]),
            el('div', { className: 'age-sub' }, [
                `Born on a ${birth.toLocaleDateString('en-US', { weekday: 'long' })}` +
                (isToday ? '' : ` • Age as of ${formatDate(to)}`)
            ]),
            el('div', { className: 'age-totals' }, [
                plural(age.totalMonths, 'month'), plural(age.totalWeeks, 'week'), plural(age.totalDays, 'day'),
                plural(age.totalHours, 'hour'), plural(age.totalMinutes, 'minute')
            ].map(t => el('span', {}, [t])))
        );

        if (isToday) {
            const nb = nextBirthday(birth, to);
            const text = nb.daysAway === 0
                ? `🎉 Happy birthday! You turn ${nb.turning} today.`
                : `🎈 You turn ${nb.turning} in ${plural(nb.daysAway, 'day')} (${formatDate(nb.date)}).`;
            box.append(el('div', { className: 'age-next' }, [text]));
        }
    }

    function renderZodiac(birth) {
        const signs = {};
        document.querySelectorAll('.zodiac-card').forEach(card => {
            const system = card.dataset.system;
            const result = ZODIAC_SYSTEMS[system].fn(birth);
            card.dataset.key = result.key;
            card.dataset.infoSystem = result.infoSystem || system;
            card.dataset.title = result.title;
            signs[system] = result;
            card.querySelector('.zodiac-sign').replaceChildren(
                el('strong', {}, [result.title]),
                ...result.lines.map(line => el('span', {}, [line]))
            );
        });
        return signs;
    }

    function renderSingle(containerId, buttonId, dbName, avoid, emptyText) {
        const list = entriesForDay(dbName, current.birthDate);
        const choice = pickRandom(list, avoid);
        $(containerId).replaceChildren(el('ul', {}, [el('li', {}, [choice || emptyText])]));
        $(buttonId).hidden = !list || list.length < 2;
        return choice;
    }

    function renderPeople() {
        current.lastPerson = renderSingle('famousPeople', 'tryAgainPeople', 'FAMOUS_PEOPLE',
            current.lastPerson, 'No famous birthdays on file for this date yet.');
    }

    function renderEvents() {
        current.lastEvent = renderSingle('historicalEvents', 'tryAgainEvents', 'HISTORICAL_EVENTS',
            current.lastEvent, 'No historical events on file for this date yet.');
    }

    function renderAwards(year) {
        const awards = getDatabase('ACADEMY_AWARDS') || {};
        // ACADEMY_AWARDS is keyed by ceremony year; films from year N are honored in year N+1.
        const entry = awards[year + 1];
        $('awardsHeading').textContent = `🏆 Oscar Winners for Films of ${year}`;
        const box = $('academyAwards');
        if (!entry) {
            const years = Object.keys(awards).map(Number);
            const range = years.length ? ` We have films from ${Math.min(...years) - 1} to ${Math.max(...years) - 1}.` : '';
            box.replaceChildren(el('p', {}, [`No Academy Awards data for films of ${year} yet.${range}`]));
            return;
        }
        const item = (label, value) => el('li', {}, [el('strong', {}, [`${label}: `]), value]);
        box.replaceChildren(
            el('ul', {}, [
                item('Best Picture', entry.bestPicture),
                item('Best Actor', entry.bestActor),
                item('Best Actress', entry.bestActress)
            ]),
            el('p', { className: 'awards-note' }, [`Presented at the ${entry.ceremony || 'Academy Awards'} in ${year + 1}.`])
        );
    }

    function displayResults(birth, to, isToday, extra) {
        const info = extra || { birthMoment: birth, hasTime: false, place: null };
        current = { birthDate: birth, lastPerson: null, lastEvent: null };
        const age = calculateAge(birth, to, isToday);
        if (isToday && (info.hasTime || info.place)) {
            // With a birth time, minutes and hours count from the actual moment of birth.
            age.totalMinutes = Math.max(0, Math.floor((Date.now() - info.birthMoment.getTime()) / 60000));
            age.totalHours = Math.floor(age.totalMinutes / 60);
        }
        renderAge(birth, to, isToday, age);
        const signs = renderZodiac(birth);
        renderPeople();
        renderEvents();
        renderAwards(birth.getFullYear());

        const results = $('results');
        results.hidden = false;
        // Let fun.js (and anything else) add its sections.
        document.dispatchEvent(new CustomEvent('agecalc:results', {
            detail: { birth, to, isToday, age, signs, birthMoment: info.birthMoment, hasTime: info.hasTime, place: info.place }
        }));
    }

    // ---------- Zodiac modal ----------
    let lastFocused = null;

    function openZodiacModal(card) {
        if (!card.dataset.key) return;
        const db = getDatabase('ZODIAC_INFO');
        const sys = db && db[card.dataset.infoSystem];
        const info = sys ? sys[card.dataset.key] : null;

        const parts = [
            el('p', { className: 'modal-system' }, [ZODIAC_SYSTEMS[card.dataset.system].label]),
            el('h2', { id: 'modalTitle' }, [card.dataset.title])
        ];

        if (info) {
            const meta = [info.dates, info.years && `Years: ${info.years}`, info.element && `Element: ${info.element}`,
                info.planet && `Planet: ${info.planet}`, info.deity && `Deity: ${info.deity}`].filter(Boolean);
            if (meta.length) parts.push(el('p', { className: 'modal-meta' }, [meta.join(' • ')]));
            if (info.description) parts.push(el('p', {}, [info.description]));
            const section = (label, value) => { if (value) parts.push(el('h3', {}, [label]), el('p', {}, [value])); };
            section('Strengths', info.traits && info.traits.positive && info.traits.positive.join(', '));
            section('Challenges', info.traits && info.traits.negative && info.traits.negative.join(', '));
            section('Compatible with', Array.isArray(info.compatibility) && info.compatibility.join(', '));
            section('Career', typeof info.career === 'string' && info.career);
            section('Love', typeof info.love === 'string' && info.love);
            section('Totem', info.totem);
            section('Symbolism', info.symbolism);
            section('Meaning', info.mayaMeaning);
        } else {
            parts.push(el('p', {}, ['A detailed write-up for this sign hasn’t been added yet.']));
        }

        $('modalBody').replaceChildren(...parts);
        const modal = $('zodiacModal');
        lastFocused = document.activeElement;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.querySelector('.close').focus();
    }

    function closeZodiacModal() {
        const modal = $('zodiacModal');
        if (modal.hidden) return;
        modal.hidden = true;
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    }

    // ---------- Input auto-formatting ----------
    // Typing 06161990 becomes 06/16/1990. Input that already has separators is left alone.
    function autoFormatDate(input) {
        input.addEventListener('input', e => {
            const value = input.value;
            if ((e.inputType || '').startsWith('delete')) return;
            if (!/^[\d\/]*$/.test(value)) return;       // other separators: leave alone
            if (/(^|\/)\d\//.test(value)) return;        // single-digit parts like 6/1/1990
            const digits = value.replace(/\D/g, '').slice(0, 8);
            let out = digits;
            if (digits.length > 4) out = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
            else if (digits.length > 2) out = `${digits.slice(0, 2)}/${digits.slice(2)}`;
            if (value.endsWith('/') && (digits.length === 2 || digits.length === 4)) out += '/';
            input.value = out;
        });
    }

    // ---------- Init ----------
    // ---------- Theme ----------
    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        const btn = $('themeToggle');
        if (!btn) return;
        btn.textContent = theme === 'dark' ? t('lightMode') : t('darkMode');
        btn.setAttribute('aria-pressed', String(theme === 'dark'));
        document.dispatchEvent(new CustomEvent('agecalc:theme', { detail: { theme } }));
    }

    function initTheme() {
        const saved = storage.get('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(saved || (prefersDark ? 'dark' : 'light'));
        if (!$('themeToggle')) return;
        $('themeToggle').addEventListener('click', () => {
            const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            storage.set('theme', next);
            applyTheme(next);
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        clearError();

        const birthRaw = $('birthDate').value;
        if (!birthRaw.trim()) return showError('Please enter your date of birth.');
        const birth = parseMMDDYYYY(birthRaw);
        if (!birth) return showError('That birth date isn’t valid. Use MM/DD/YYYY or MMDDYYYY, for example 06/16/1990 or 06161990.');
        if (birth.getFullYear() < MIN_YEAR) return showError(`Please enter a birth year of ${MIN_YEAR} or later.`);

        const toRaw = $('calculateDate').value.trim();
        const isToday = !toRaw;
        const to = isToday ? startOfToday() : parseMMDDYYYY(toRaw);
        if (!to) return showError('The “calculate up to” date isn’t valid. Use MM/DD/YYYY or MMDDYYYY, or leave it blank for today.');
        if (birth > to) {
            return showError(isToday
                ? 'That birth date is in the future. Please check the year.'
                : 'The birth date is after the “calculate up to” date.');
        }

        const timeRaw = $('birthTime').value;
        const time = parseTime(timeRaw);
        if (timeRaw && !time) return showError('That birth time isn’t valid. Use the time picker, or leave it blank.');
        const placeName = $('birthPlace').value.trim();
        let place = null;
        if (placeName) {
            const btn = $('ageForm').querySelector('button[type="submit"]');
            const label = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Looking up place…';
            try {
                place = await lookupPlace(placeName);
            } catch (err) {
                return showError('Couldn’t look up that place. Check your internet connection, or leave the place blank.');
            } finally {
                btn.disabled = false;
                btn.textContent = label;
            }
            if (!place) return showError(`Couldn’t find a place called “${placeName}”. Try adding the country, e.g. “Paris, France”.`);
        }
        const h = time ? time.h : 0, mi = time ? time.mi : 0;
        const birthMoment = place
            ? zonedTimeToUtc(birth.getFullYear(), birth.getMonth(), birth.getDate(), h, mi, place.timeZone)
            : new Date(birth.getFullYear(), birth.getMonth(), birth.getDate(), h, mi);
        if (isToday && birthMoment.getTime() > Date.now()) return showError('That birth time hasn’t happened yet today.');

        storage.set('lastBirthDate', birthRaw.trim());
        storage.set('lastBirthTime', time ? timeRaw : '');
        storage.set('lastBirthPlace', placeName);
        $('forgetMe').hidden = false;
        displayResults(birth, to, isToday, { birthMoment, hasTime: !!time, place });
        if (!(e.detail && e.detail.silent)) $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        if (!$('ageForm')) return; // other pages (e.g. countdown.html) only use the helpers and theme
        $('footerYear').textContent = new Date().getFullYear();

        // Re-render results in the new language.
        document.addEventListener('agecalc:language', () => {
            if (!$('results').hidden) handleSubmit({ preventDefault() {}, detail: { silent: true } });
        });

        autoFormatDate($('birthDate'));
        autoFormatDate($('calculateDate'));
        $('ageForm').addEventListener('submit', handleSubmit);
        $('tryAgainPeople').addEventListener('click', () => current && renderPeople());
        $('tryAgainEvents').addEventListener('click', () => current && renderEvents());

        document.querySelectorAll('.zodiac-card').forEach(card => {
            card.addEventListener('click', () => openZodiacModal(card));
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openZodiacModal(card); }
            });
        });

        const modal = $('zodiacModal');
        modal.querySelector('.close').addEventListener('click', closeZodiacModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeZodiacModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeZodiacModal(); });

        // Remember the last birthday on this device and show it straight away.
        $('forgetMe').addEventListener('click', () => {
            storage.set('lastBirthDate', '');
            storage.set('lastBirthTime', '');
            storage.set('lastBirthPlace', '');
            $('birthDate').value = '';
            $('birthTime').value = '';
            $('birthPlace').value = '';
            $('calculateDate').value = '';
            $('forgetMe').hidden = true;
            $('results').hidden = true;
            document.dispatchEvent(new CustomEvent('agecalc:cleared'));
            $('birthDate').focus();
        });
        const saved = storage.get('lastBirthDate');
        if (saved && parseMMDDYYYY(saved)) {
            $('birthDate').value = saved;
            $('birthTime').value = storage.get('lastBirthTime') || '';
            $('birthPlace').value = storage.get('lastBirthPlace') || '';
            handleSubmit({ preventDefault() {}, detail: { silent: true } });
        }
    });

    // Exposed for testing from the console.
    window.AgeCalc = {
        clampedDate, dayDiff, startOfToday, autoFormatDate, zonedTimeToUtc, parseTime, t, unit, applyTheme, formatDate, plural, el, storage, getDatabase, ZODIAC_SYSTEMS,
        parseMMDDYYYY, calculateAge, nextBirthday, getWesternZodiac, getChineseZodiac,
        getVietnameseZodiac, getNativeAmericanZodiac, getVedicZodiac, getMayanZodiac, getIncanZodiac
    };
})();
