// Fun extras for the Age Calculator: live ticker, milestones, planets, body stats,
// "the world when you were born", share card, confetti, friend comparison and games.
// Listens for the `agecalc:results` event that script.js fires after each calculation.

(function () {
    'use strict';

    const A = window.AgeCalc;
    const { el, plural, formatDate, clampedDate, dayDiff, getDatabase } = A;
    const $ = id => document.getElementById(id);
    const MS_PER_DAY = 86400000;
    const reducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let state = null;      // detail from the last agecalc:results event
    let tickerTimer = null;

    const fmt = (n, digits = 0) => n.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });
    const money = n => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
    const big = n => {
        if (n >= 1e12) return `${fmt(n / 1e12, 1)} trillion`;
        if (n >= 1e9) return `${fmt(n / 1e9, 1)} billion`;
        if (n >= 1e6) return `${fmt(n / 1e6, 1)} million`;
        return fmt(Math.round(n));
    };
    const shortDate = d => d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const pick = list => list[Math.floor(Math.random() * list.length)];
    const shuffle = list => {
        const a = list.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
    };
    // `const` globals from data/birth-year.js aren't properties of window, so look them up by name.
    function data(name) {
        switch (name) {
            case 'TOP_SONGS': return typeof TOP_SONGS !== 'undefined' ? TOP_SONGS : null;
            case 'TOP_FILMS': return typeof TOP_FILMS !== 'undefined' ? TOP_FILMS : null;
            case 'PRICE_ANCHORS': return typeof PRICE_ANCHORS !== 'undefined' ? PRICE_ANCHORS : null;
            case 'MINIMUM_WAGE': return typeof MINIMUM_WAGE !== 'undefined' ? MINIMUM_WAGE : null;
            case 'WORLD_POPULATION': return typeof WORLD_POPULATION !== 'undefined' ? WORLD_POPULATION : null;
            case 'WORLD_BIRTHS': return typeof WORLD_BIRTHS !== 'undefined' ? WORLD_BIRTHS : null;
            default: return null;
        }
    }

    function card(title, children, extraClass) {
        return el('div', { className: `fun-card${extraClass ? ' ' + extraClass : ''}` }, [el('h4', {}, [title]), ...children]);
    }

    function statList(rows) {
        return el('ul', { className: 'stat-list' }, rows.map(([label, value]) =>
            el('li', {}, [el('span', { className: 'stat-label' }, [label]), el('span', { className: 'stat-value' }, [value])])));
    }

    // ---------- Live ticker ----------
    function startTicker(birth, exact) {
        stopTicker();
        const box = $('liveTicker');
        const tick = () => {
            const seconds = Math.floor((Date.now() - birth.getTime()) / 1000);
            box.replaceChildren(
                el('span', { className: 'ticker-label' }, ['⏱️ You have been alive for about']),
                el('span', { className: 'ticker-value' }, [`${fmt(seconds)} seconds`]),
                el('span', { className: 'ticker-note' }, [exact ? 'Counting from your time of birth' : 'Counting from midnight on your birthday. Add your birth time for the exact count.'])
            );
        };
        tick();
        box.hidden = false;
        tickerTimer = setInterval(tick, 1000);
    }

    function stopTicker() {
        if (tickerTimer) clearInterval(tickerTimer);
        tickerTimer = null;
        $('liveTicker').hidden = true;
    }

    // ---------- Milestones ----------
    function addDays(date, n) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n); }

    function milestoneList(birth, moment) {
        const t = (moment || birth).getTime();
        const list = [];
        [1000, 2500, 5000, 7500, 10000, 12345, 15000, 17500, 20000, 22222, 25000, 27500, 30000, 33333, 35000]
            .forEach(n => list.push({ label: `${fmt(n)} days old`, date: addDays(birth, n) }));
        [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
            .forEach(n => list.push({ label: `${fmt(n)} weeks old`, date: addDays(birth, n * 7) }));
        [100, 250, 500, 750, 1000]
            .forEach(n => list.push({ label: `${fmt(n)} months old`, date: clampedDate(birth.getFullYear(), birth.getMonth() + n, birth.getDate()) }));
        [100000, 250000, 500000, 750000]
            .forEach(n => list.push({ label: `${fmt(n)} hours old`, date: new Date(t + n * 3600000), timed: true }));
        [10, 20, 30, 40].forEach(n => list.push({ label: `${n} million minutes old`, date: new Date(t + n * 6e7), timed: true }));
        [1, 1.5, 2, 2.5, 3].forEach(n => list.push({ label: `${n} billion seconds old`, date: new Date(t + n * 1e12), timed: true }));
        return list.sort((a, b) => a.date - b.date);
    }

    function icsDate(d) {
        return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    }

    function downloadIcs(milestone) {
        const start = milestone.date;
        const end = addDays(start, 1);
        const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        const ics = [
            'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Age Calculator//Milestones//EN', 'CALSCALE:GREGORIAN',
            'BEGIN:VEVENT',
            `UID:${icsDate(start)}-${milestone.label.replace(/\W+/g, '-')}@age-calculator`,
            `DTSTAMP:${stamp}`,
            `DTSTART;VALUE=DATE:${icsDate(start)}`,
            `DTEND;VALUE=DATE:${icsDate(end)}`,
            `SUMMARY:🎉 I'm ${milestone.label}!`,
            'DESCRIPTION:A milestone from the Age Calculator.',
            'END:VEVENT', 'END:VCALENDAR', ''
        ].join('\r\n');
        saveBlob(new Blob([ics], { type: 'text/calendar' }), `milestone-${icsDate(start)}.ics`);
    }

    function saveBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = el('a', { href: url, download: filename });
        document.body.append(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function renderMilestones(birth, moment, exact) {
        const now = new Date();
        const all = milestoneList(birth, moment);
        const past = all.filter(m => m.date <= now).slice(-2);
        const upcoming = all.filter(m => m.date > now).slice(0, 6);
        const row = (m, isPast) => {
            const when = m.timed
                ? `${shortDate(m.date)}, ${m.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
                : shortDate(m.date);
            const days = dayDiff(now, m.date);
            const children = [
                el('span', { className: 'milestone-label' }, [`${isPast ? '✅' : '🎯'} ${m.label}`]),
                el('span', { className: 'milestone-date' }, [isPast ? `${when}` : `${when} • in ${plural(days, 'day')}`])
            ];
            if (!isPast) {
                const btn = el('button', { type: 'button', className: 'mini-btn', textContent: '📅 Add to calendar' });
                btn.setAttribute('aria-label', `Add "${m.label}" to your calendar`);
                btn.addEventListener('click', () => downloadIcs(m));
                children.push(btn);
            }
            return el('li', { className: isPast ? 'past' : '' }, children);
        };
        $('milestones').replaceChildren(
            el('ul', { className: 'milestone-list' }, [...past.map(m => row(m, true)), ...upcoming.map(m => row(m, false))]),
            el('p', { className: 'fine-print' }, [exact ? 'Times are based on your time of birth, shown in your current time zone.' : 'Times assume you were born at midnight.'])
        );
    }

    // ---------- Planets ----------
    const PLANETS = [
        ['☿️', 'Mercury', 0.2408467], ['♀️', 'Venus', 0.61519726], ['♂️', 'Mars', 1.8808158],
        ['♃', 'Jupiter', 11.862615], ['♄', 'Saturn', 29.447498], ['⛢', 'Uranus', 84.016846],
        ['♆', 'Neptune', 164.79132]
    ];
    const EARTH_YEAR_DAYS = 365.25636;

    function renderPlanets(birth, to) {
        const days = dayDiff(birth, to);
        $('planetAges').replaceChildren(...PLANETS.map(([symbol, name, period]) => {
            const age = days / (period * EARTH_YEAR_DAYS);
            const nextNumber = Math.floor(age) + 1;
            const next = addDays(birth, Math.round(nextNumber * period * EARTH_YEAR_DAYS));
            const nextText = period > 100 && age < 1
                ? 'First birthday: not in this lifetime!'
                : `Birthday #${nextNumber}: ${shortDate(next)}`;
            return el('div', { className: 'planet' }, [
                el('div', { className: 'planet-name' }, [`${symbol} ${name}`]),
                el('div', { className: 'planet-age' }, [`${fmt(age, age < 10 ? 2 : 1)}`]),
                el('div', { className: 'planet-unit' }, [`${name} years`]),
                el('div', { className: 'planet-next' }, [nextText])
            ]);
        }));
    }

    // ---------- Body and animals ----------
    function renderBody(age) {
        const minutes = age.totalMinutes;
        const years = age.totalDays / 365.25;
        $('bodyStats').replaceChildren(
            card('❤️ Your body in numbers', [
                statList([
                    ['Heartbeats', big(minutes * 70)],
                    ['Breaths', big(minutes * 15)],
                    ['Blinks', big(minutes * (2 / 3) * 15)],
                    ['Time asleep', `${fmt(years / 3, 1)} years`],
                    ['Meals eaten', big(age.totalDays * 3)],
                    ['Hair grown (if never cut)', `${fmt(age.totalMonths * 0.0125, 1)} m`]
                ]),
                el('p', { className: 'fine-print' }, ['Rough averages for an adult: 70 beats and 15 breaths a minute, 8 hours of sleep a night.'])
            ]),
            card('🐾 Your age in animal terms', [
                statList([
                    ['In dog years (the classic ×7 rule)', fmt(years * 7, 0)],
                    ['Dog lifetimes (12 years)', fmt(years / 12, 1)],
                    ['Cat lifetimes (15 years)', fmt(years / 15, 1)],
                    ['Hamster lifetimes (2.5 years)', fmt(years / 2.5, 1)],
                    ['Mayfly lifetimes (1 day)', fmt(age.totalDays)],
                    ['Of a giant tortoise’s life (100+ years)', `${fmt(Math.min(years, 100), 0)}%`]
                ])
            ])
        );
    }

    // ---------- The world when you were born ----------
    function interpolate(anchors, year) {
        if (!anchors || !anchors.length) return null;
        if (year < anchors[0][0]) return null;
        if (year >= anchors[anchors.length - 1][0]) return anchors[anchors.length - 1][1];
        for (let i = 0; i < anchors.length - 1; i++) {
            const [y1, v1] = anchors[i];
            const [y2, v2] = anchors[i + 1];
            if (year >= y1 && year <= y2) return v1 + (v2 - v1) * ((year - y1) / (y2 - y1));
        }
        return null;
    }

    function stepValue(steps, year) {
        let value = null;
        for (const [y, v] of steps) if (year >= y) value = v;
        return value;
    }

    function moonPhase(date) {
        // Reference new moon: 6 Jan 2000 18:14 UTC. Uses local noon of the given day.
        const noon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
        const synodic = 29.530588853;
        const phase = (((noon.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / MS_PER_DAY) / synodic % 1 + 1) % 1;
        const names = [
            ['🌑', 'New Moon'], ['🌒', 'Waxing Crescent'], ['🌓', 'First Quarter'], ['🌔', 'Waxing Gibbous'],
            ['🌕', 'Full Moon'], ['🌖', 'Waning Gibbous'], ['🌗', 'Last Quarter'], ['🌘', 'Waning Crescent']
        ];
        const [emoji, name] = names[Math.floor(phase * 8 + 0.5) % 8];
        return { emoji, name, illumination: Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100) };
    }

    function birthsSince(birth, now) {
        const anchors = data('WORLD_BIRTHS');
        if (!anchors) return null;
        let total = 0;
        const startYear = birth.getFullYear();
        const endYear = now.getFullYear();
        for (let y = startYear; y <= endYear; y++) {
            const perYear = (interpolate(anchors, y) || 0) * 1e6;
            let fraction = 1;
            if (y === startYear) fraction = 1 - dayDiff(new Date(y, 0, 1), birth) / 365.25;
            if (y === endYear) fraction = (y === startYear ? dayDiff(birth, now) : dayDiff(new Date(y, 0, 1), now)) / 365.25;
            total += perYear * Math.max(0, fraction);
        }
        return total;
    }

    function renderWorld(birth, age) {
        const year = birth.getFullYear();
        const now = new Date();
        const songs = data('TOP_SONGS') || {};
        const films = data('TOP_FILMS') || {};
        const prices = data('PRICE_ANCHORS') || {};
        const moon = moonPhase(birth);

        const pop = data('WORLD_POPULATION');
        const popThen = interpolate(pop, year);
        const popNow = interpolate(pop, now.getFullYear());
        const born = birthsSince(birth, now);

        const priceRows = [];
        const priceNow = (key, label, unit) => {
            const then = interpolate(prices[key], year);
            const today = interpolate(prices[key], now.getFullYear());
            if (then != null) priceRows.push([label, `${money(then)}${unit} (now ≈ ${money(today)})`]);
        };
        priceNow('gas', 'Gallon of gas', '');
        priceNow('movieTicket', 'Movie ticket', '');
        priceNow('bread', 'Loaf of bread', '');
        const wage = stepValue(data('MINIMUM_WAGE') || [], year);
        if (wage != null) priceRows.push(['US minimum wage', `${money(wage)}/hour`]);

        const cards = [
            card('🎵 Pop culture', [statList([
                ['Song of the year', songs[year] || 'Not on file for this year'],
                ['Biggest film', films[year] || 'Not on file for this year']
            ]), el('p', { className: 'fine-print' }, ['Song: Billboard year-end number one (US). Film: highest-grossing release worldwide.'])]),
            card(`${moon.emoji} The sky that night`, [statList([
                ['Moon phase', `${moon.name} (${moon.illumination}% lit)`],
                ['Full moons since', fmt(Math.floor(age.totalDays / 29.530588853))],
                ['Trips around the Sun', fmt(age.totalDays / EARTH_YEAR_DAYS, 2)],
                ['Miles traveled around the Sun', big(age.totalDays / EARTH_YEAR_DAYS * 584e6)]
            ])])
        ];
        if (priceRows.length) {
            cards.push(card(`💵 What things cost in ${year}`, [statList(priceRows),
                el('p', { className: 'fine-print' }, ['Approximate US averages. Minimum wage is the federal rate.'])]));
        }
        if (popThen != null) {
            const rows = [['World population then', `${fmt(popThen, 2)} billion`], ['World population now', `${fmt(popNow, 2)} billion`]];
            if (born) rows.push(['People born since you', big(born)]);
            cards.push(card('🌍 The world then and now', [statList(rows), el('p', { className: 'fine-print' }, ['Approximate figures.'])]));
        }
        $('worldThen').replaceChildren(...cards);
        $('worldHeading').textContent = `🕰️ The World When You Were Born (${year})`;
    }

    // ---------- Share card ----------
    function wrapText(ctx, text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let line = '';
        words.forEach(w => {
            const test = line ? `${line} ${w}` : w;
            if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; } else line = test;
        });
        if (line) lines.push(line);
        return lines;
    }

    function drawShareCard() {
        const { birth, age, signs } = state;
        const canvas = $('shareCanvas');
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, '#667eea');
        grad.addColorStop(1, '#764ba2');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Soft circles for decoration
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        [[900, 150, 220], [150, 950, 260], [980, 900, 120]].forEach(([x, y, r]) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); });

        const font = '"Segoe UI", system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        drawCake(ctx, W / 2, 230, age.years);
        ctx.font = `bold 92px ${font}`;
        ctx.fillText(`I'm ${age.years} years old`, W / 2, 340);
        ctx.font = `44px ${font}`;
        ctx.fillText(`${age.months} months and ${age.days} days, to be exact`, W / 2, 410);

        // Stat pills
        const pills = [`${fmt(age.totalDays)} days`, `${big(age.totalMinutes * 70)} heartbeats`, `${fmt(Math.floor(age.totalDays / 29.53))} full moons`];
        ctx.font = `bold 40px ${font}`;
        pills.forEach((text, i) => {
            const y = 520 + i * 90;
            const w = ctx.measureText(text).width + 80;
            ctx.fillStyle = 'rgba(255,255,255,0.18)';
            roundRect(ctx, (W - w) / 2, y - 50, w, 70, 35);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.fillText(text, W / 2, y);
        });

        ctx.font = `40px ${font}`;
        const signLine = `${signs.western.title}  •  ${signs.chinese.title}  •  ${signs.mayan.title}`;
        wrapText(ctx, signLine, W - 140).forEach((line, i) => ctx.fillText(line, W / 2, 840 + i * 52));
        ctx.font = `34px ${font}`;
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillText(`Born on a ${birth.toLocaleDateString('en-US', { weekday: 'long' })}`, W / 2, 950);
        ctx.font = `bold 30px ${font}`;
        ctx.fillText('Made with the Age Calculator', W / 2, 1030);
    }

    // A layered cake with one candle per year (up to 30; older ages get a number topper too).
    function drawCake(ctx, cx, baseY, years) {
        const w = 300, layer = 55;
        ctx.save();
        ctx.fillStyle = '#fbb6ce';
        roundRect(ctx, cx - w / 2, baseY - layer, w, layer, 14); ctx.fill();
        ctx.fillStyle = '#fed7e2';
        roundRect(ctx, cx - w / 2 + 25, baseY - layer * 2, w - 50, layer, 14); ctx.fill();
        // Icing drips
        ctx.fillStyle = '#ffffff';
        roundRect(ctx, cx - w / 2 + 25, baseY - layer * 2, w - 50, 14, 7); ctx.fill();
        for (let x = cx - w / 2 + 40; x < cx + w / 2 - 40; x += 28) {
            ctx.beginPath(); ctx.arc(x, baseY - layer * 2 + 14, 7, 0, Math.PI); ctx.fill();
        }
        ctx.fillStyle = '#f6e05e';
        ctx.fillRect(cx - w / 2 - 15, baseY, w + 30, 10);

        const count = Math.max(1, Math.min(years, 30));
        const top = baseY - layer * 2;
        const rows = count > 15 ? 2 : 1;
        const perRow = Math.ceil(count / rows);
        const colors = ['#63b3ed', '#68d391', '#f6ad55', '#b794f4', '#fc8181'];
        let drawn = 0;
        for (let row = 0; row < rows; row++) {
            const n = Math.min(perRow, count - drawn);
            const span = w - 80;
            for (let i = 0; i < n; i++) {
                const x = cx - span / 2 + (n === 1 ? span / 2 : (span * i) / (n - 1));
                const y = top - row * 22;
                ctx.fillStyle = colors[(drawn + i) % colors.length];
                ctx.fillRect(x - 4, y - 40, 8, 40);
                ctx.fillStyle = '#fefcbf';
                ctx.beginPath(); ctx.ellipse(x, y - 50, 5, 10, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#f6ad55';
                ctx.beginPath(); ctx.ellipse(x, y - 48, 2.5, 6, 0, 0, Math.PI * 2); ctx.fill();
            }
            drawn += n;
        }
        ctx.fillStyle = '#97266d';
        ctx.font = 'bold 34px "Segoe UI", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(years), cx, baseY - 14);
        ctx.restore();
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    function shareText() {
        const { age, signs } = state;
        return `🎂 I'm ${age.years} years, ${age.months} months and ${age.days} days old — that's ${fmt(age.totalDays)} days! ` +
            `I'm a ${signs.western.title.replace(/^\S+\s/, '')} and a ${signs.chinese.title}.`;
    }

    function setShareStatus(text) {
        const s = $('shareStatus');
        s.textContent = text;
        clearTimeout(setShareStatus.t);
        setShareStatus.t = setTimeout(() => { s.textContent = ''; }, 4000);
    }

    function initShare() {
        $('downloadCard').addEventListener('click', () => {
            $('shareCanvas').toBlob(blob => blob && saveBlob(blob, 'my-age-card.png'), 'image/png');
        });
        $('copyText').addEventListener('click', async () => {
            try { await navigator.clipboard.writeText(shareText()); setShareStatus('Copied to your clipboard.'); }
            catch (e) { setShareStatus('Couldn’t copy automatically. Select the text and copy it instead.'); }
        });
        const shareBtn = $('shareCard');
        if (!navigator.share) shareBtn.hidden = true;
        shareBtn.addEventListener('click', () => {
            $('shareCanvas').toBlob(async blob => {
                const file = blob && new File([blob], 'my-age-card.png', { type: 'image/png' });
                const payload = { title: 'My Age', text: shareText() };
                if (file && navigator.canShare && navigator.canShare({ files: [file] })) payload.files = [file];
                try { await navigator.share(payload); } catch (e) { /* cancelled */ }
            }, 'image/png');
        });
    }

    // ---------- Confetti ----------
    function confetti() {
        if (reducedMotion()) return;
        const canvas = el('canvas', { className: 'confetti-canvas' });
        canvas.setAttribute('aria-hidden', 'true');
        document.body.append(canvas);
        const ctx = canvas.getContext('2d');
        const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
        resize();
        const colors = ['#f6ad55', '#fc8181', '#68d391', '#63b3ed', '#b794f4', '#faf089'];
        const pieces = Array.from({ length: 180 }, () => ({
            x: Math.random() * canvas.width, y: -20 - Math.random() * canvas.height * 0.5,
            w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, vy: 2 + Math.random() * 3,
            vx: -1.5 + Math.random() * 3, rot: Math.random() * Math.PI, vr: -0.2 + Math.random() * 0.4,
            color: pick(colors)
        }));
        const start = performance.now();
        const frame = now => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                p.x += p.vx; p.y += p.vy; p.rot += p.vr;
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
                ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
            });
            if (now - start < 4500) requestAnimationFrame(frame); else canvas.remove();
        };
        requestAnimationFrame(frame);
    }

    function renderBirthdayBanner(birth, to, isToday) {
        const banner = $('birthdayBanner');
        const isBirthday = isToday && birth.getMonth() === to.getMonth() && birth.getDate() === to.getDate();
        banner.hidden = !isBirthday;
        if (isBirthday) {
            banner.replaceChildren(el('span', {}, ['🎉 Happy Birthday! 🎉']), el('button', {
                type: 'button', className: 'mini-btn', textContent: '🎊 More confetti', onclick: confetti
            }));
            confetti();
        }
    }

    // ---------- Compare with a friend ----------
    const CHINESE_ORDER = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const ELEMENT_FRIENDS = { Fire: ['Fire', 'Air'], Air: ['Air', 'Fire'], Earth: ['Earth', 'Water'], Water: ['Water', 'Earth'] };

    function compatibility(a, b) {
        const wa = A.getWesternZodiac(a).key, wb = A.getWesternZodiac(b).key;
        const ca = A.getChineseZodiac(a).key, cb = A.getChineseZodiac(b).key;
        const info = getDatabase('ZODIAC_INFO');
        const westInfo = info && info.western;
        let score = 50;
        const notes = [];
        const listed = westInfo && ((westInfo[wa] && (westInfo[wa].compatibility || []).includes(wb)) ||
            (westInfo[wb] && (westInfo[wb].compatibility || []).includes(wa)));
        if (listed) { score += 20; notes.push(`${wa} and ${wb} are a classic match.`); }
        const ea = westInfo && westInfo[wa] && westInfo[wa].element, eb = westInfo && westInfo[wb] && westInfo[wb].element;
        if (ea && eb && ELEMENT_FRIENDS[ea] && ELEMENT_FRIENDS[ea].includes(eb)) {
            score += 10; notes.push(ea === eb ? `You're both ${ea} signs.` : `${ea} and ${eb} signs bring out the best in each other.`);
        }
        const ia = CHINESE_ORDER.indexOf(ca), ib = CHINESE_ORDER.indexOf(cb);
        if (ia >= 0 && ib >= 0) {
            const diff = Math.abs(ia - ib);
            if (diff === 4 || diff === 8) { score += 15; notes.push(`The ${ca} and ${cb} share a lucky trine in the Chinese zodiac.`); }
            else if (diff === 6) { score -= 10; notes.push(`The ${ca} and ${cb} sit opposite each other in the Chinese zodiac — sparks may fly!`); }
            else if (diff === 0) { score += 5; notes.push(`You're both ${ca}s.`); }
        }
        if (wa === wb) { score += 5; notes.push(`Two ${wa}s: you'll understand each other.`); }
        if (!notes.length) notes.push('An unusual pairing — which can be the most interesting kind.');
        return { score: Math.max(5, Math.min(99, score)), notes, wa, wb, ca, cb };
    }

    function handleCompare(e) {
        e.preventDefault();
        const out = $('compareResult');
        const name = $('friendName').value.trim() || 'Your friend';
        const friend = A.parseMMDDYYYY($('friendDate').value);
        if (!state) { out.replaceChildren(el('p', { className: 'error' }, ['Calculate your own age first.'])); return; }
        if (!friend) { out.replaceChildren(el('p', { className: 'error' }, ['Please enter your friend’s birthday as MM/DD/YYYY or MMDDYYYY.'])); return; }
        const today = A.startOfToday();
        if (friend > today) { out.replaceChildren(el('p', { className: 'error' }, ['That birthday is in the future.'])); return; }

        const me = state.birth;
        const [older, younger] = me <= friend ? [me, friend] : [friend, me];
        const gap = A.calculateAge(older, younger, false);
        const friendAge = A.calculateAge(friend, today, false);
        const myAge = A.calculateAge(me, today, false);
        const who = me.getTime() === friend.getTime() ? `You and ${name} were born on the same day!`
            : me < friend ? `You're older than ${name} by ${plural(gap.years, 'year')}, ${plural(gap.months, 'month')} and ${plural(gap.days, 'day')}.`
                : `${name} is older than you by ${plural(gap.years, 'year')}, ${plural(gap.months, 'month')} and ${plural(gap.days, 'day')}.`;
        const combinedDays = myAge.totalDays + friendAge.totalDays;
        const c = compatibility(me, friend);

        const sameBirthday = me.getMonth() === friend.getMonth() && me.getDate() === friend.getDate();
        out.replaceChildren(
            el('p', { className: 'compare-headline' }, [who]),
            statList([
                [`${name}'s age`, `${plural(friendAge.years, 'year')}, ${plural(friendAge.months, 'month')}, ${plural(friendAge.days, 'day')}`],
                ['Your combined age', `${fmt(combinedDays / 365.25, 1)} years (${fmt(combinedDays)} days)`],
                [`${name}'s signs`, `${A.getWesternZodiac(friend).title} • ${A.getChineseZodiac(friend).title}`],
                ...(sameBirthday && me.getTime() !== friend.getTime() ? [['Birthday twins?', 'Yes! Same day, different year 🎂']] : [])
            ]),
            el('div', { className: 'compat' }, [
                el('div', { className: 'compat-label' }, ['Cosmic compatibility']),
                el('div', { className: 'compat-bar' }, [el('div', { className: 'compat-fill', style: `width:${c.score}%` })]),
                el('div', { className: 'compat-score' }, [`${c.score}%`])
            ]),
            el('ul', { className: 'compat-notes' }, c.notes.map(n => el('li', {}, [n]))),
            el('p', { className: 'fine-print' }, ['Just for fun — the stars are not responsible for your friendships.'])
        );
    }

    // ---------- Birthday twins game ----------
    function renderTwinsGame() {
        const box = $('twinsGame');
        const list = (getDatabase('FAMOUS_PEOPLE') || {})[`${state.birth.getMonth() + 1}-${state.birth.getDate()}`] || [];
        const people = list.map(s => {
            const m = s.match(/^(.*?)\s*\((\d{3,4})\)/);
            return m ? { name: m[1], year: Number(m[2]), full: s } : null;
        }).filter(Boolean);
        const unique = [...new Map(people.map(p => [p.year, p])).values()];
        if (unique.length < 3) {
            box.replaceChildren(el('p', {}, ['Not enough famous birthday twins on file for this date to play.']));
            return;
        }
        const options = shuffle(unique).slice(0, 4);
        const myYear = state.birth.getFullYear();
        const answer = options.reduce((a, b) => (Math.abs(a.year - myYear) <= Math.abs(b.year - myYear) ? a : b));
        const feedback = el('p', { className: 'game-feedback', role: 'status' });
        const buttons = options.map(p => {
            const btn = el('button', { type: 'button', className: 'choice-btn', textContent: p.name });
            btn.addEventListener('click', () => {
                buttons.forEach((b, i) => {
                    b.disabled = true;
                    b.textContent = `${options[i].name} (${options[i].year})`;
                    if (options[i] === answer) b.classList.add('correct');
                });
                if (p !== answer) btn.classList.add('wrong');
                feedback.textContent = p === answer
                    ? `🎉 Correct! ${answer.name} was born in ${answer.year}, closest to you.`
                    : `Not quite — it's ${answer.name}, born in ${answer.year}.`;
            });
            return btn;
        });
        const again = el('button', { type: 'button', className: 'mini-btn', textContent: '🔄 New question', onclick: renderTwinsGame });
        box.replaceChildren(
            el('p', { className: 'game-question' }, ['These people share your birthday. Which one was born closest to your birth year?']),
            el('div', { className: 'choices' }, buttons), feedback, again
        );
    }

    // ---------- Guess the year game ----------
    const yearGame = { score: 0, played: 0, streak: 0 };

    function renderYearGame() {
        const box = $('yearGame');
        const events = getDatabase('HISTORICAL_EVENTS');
        if (!events) { box.replaceChildren(el('p', {}, ['Historical events aren’t available right now.'])); return; }
        let question = null;
        for (let tries = 0; tries < 50 && !question; tries++) {
            const key = pick(Object.keys(events));
            const text = pick(events[key]);
            const m = text.match(/^(.*\S)\s*\((\d{4})\)$/);
            if (m && Number(m[2]) >= 1700) {
                const [month, day] = key.split('-').map(Number);
                question = { text: m[1], year: Number(m[2]), date: new Date(2000, month - 1, day) };
            }
        }
        if (!question) { box.replaceChildren(el('p', {}, ['Couldn’t find a question. Try again.'])); return; }

        const years = new Set([question.year]);
        while (years.size < 4) {
            const offset = (Math.floor(Math.random() * 30) + 3) * (Math.random() < 0.5 ? -1 : 1);
            const y = question.year + offset;
            if (y <= new Date().getFullYear() && [...years].every(v => Math.abs(v - y) >= 3)) years.add(y);
        }
        const options = shuffle([...years]);
        const feedback = el('p', { className: 'game-feedback', role: 'status' });
        const scoreLine = el('p', { className: 'game-score' }, [scoreText()]);
        const buttons = options.map(y => {
            const btn = el('button', { type: 'button', className: 'choice-btn', textContent: String(y) });
            btn.addEventListener('click', () => {
                yearGame.played++;
                const right = y === question.year;
                if (right) { yearGame.score++; yearGame.streak++; } else yearGame.streak = 0;
                buttons.forEach((b, i) => { b.disabled = true; if (options[i] === question.year) b.classList.add('correct'); });
                if (!right) btn.classList.add('wrong');
                feedback.textContent = right ? `🎉 Yes! It happened in ${question.year}.` : `Nope — it was ${question.year}.`;
                scoreLine.textContent = scoreText();
            });
            return btn;
        });
        const next = el('button', { type: 'button', className: 'mini-btn', textContent: '➡️ Next question', onclick: renderYearGame });
        box.replaceChildren(
            el('p', { className: 'game-date' }, [question.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })]),
            el('p', { className: 'game-question' }, [question.text]),
            el('div', { className: 'choices' }, buttons), feedback, scoreLine, next
        );
    }

    function scoreText() {
        return yearGame.played
            ? `Score: ${yearGame.score} of ${yearGame.played}${yearGame.streak > 1 ? ` • 🔥 ${yearGame.streak} in a row` : ''}`
            : 'Score: 0 of 0';
    }

    // ---------- Wiring ----------
    document.addEventListener('agecalc:results', e => {
        state = e.detail;
        const { birth, to, isToday, age } = state;
        const moment = state.birthMoment || birth;
        const exact = !!(state.hasTime);
        if (isToday) startTicker(moment, exact); else stopTicker();
        renderBirthdayBanner(birth, to, isToday);
        renderMilestones(birth, moment, exact);
        renderPlanets(birth, to);
        renderBody(age);
        renderWorld(birth, age);
        drawShareCard();
        renderTwinsGame();
        renderYearGame();
        $('compareResult').replaceChildren();
    });

    document.addEventListener('agecalc:cleared', () => { state = null; stopTicker(); });

    document.addEventListener('DOMContentLoaded', () => {
        initShare();
        A.autoFormatDate($('friendDate'));
        const discLink = document.querySelector('.mini-disclaimer a');
        if (discLink) discLink.addEventListener('click', () => { $('fullDisclaimer').open = true; });
        $('compareForm').addEventListener('submit', handleCompare);
    });

    window.AgeCalcFun = { moonPhase, milestoneList, compatibility, interpolate, confetti };
})();
