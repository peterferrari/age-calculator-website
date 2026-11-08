// Birthday countdown page. The birthday lives in the URL hash (#MM-DD-YYYY), which
// browsers never send to the server, so the page can be bookmarked without sharing it.

(function () {
    'use strict';

    const A = window.AgeCalc;
    const $ = id => document.getElementById(id);
    let timer = null;
    let confettiShown = false;

    function birthdayFromHash() {
        const m = location.hash.match(/^#(\d{2})-(\d{2})(?:-(\d{4}))?$/);
        if (!m) return null;
        return A.parseMMDDYYYY(`${m[1]}/${m[2]}/${m[3] || '2000'}`) && { month: +m[1] - 1, day: +m[2], year: m[3] ? +m[3] : null };
    }

    function nextOccurrence(b, now) {
        let year = now.getFullYear();
        let target = A.clampedDate(year, b.month, b.day);
        const endOfDay = new Date(target.getFullYear(), target.getMonth(), target.getDate() + 1);
        if (endOfDay <= now) {
            year++;
            target = A.clampedDate(year, b.month, b.day);
        }
        return target;
    }

    function tick(b) {
        const now = new Date();
        const target = nextOccurrence(b, now);
        const isToday = now >= target;
        const ms = Math.max(0, target - now);
        const s = Math.floor(ms / 1000);
        $('cdDays').textContent = Math.floor(s / 86400).toLocaleString();
        $('cdHours').textContent = String(Math.floor(s / 3600) % 24);
        $('cdMinutes').textContent = String(Math.floor(s / 60) % 60);
        $('cdSeconds').textContent = String(s % 60);

        const turning = b.year ? target.getFullYear() - b.year : null;
        $('countdownTitle').textContent = isToday
            ? `🎉 Happy Birthday!${turning ? ` You're ${turning} today!` : ''}`
            : turning ? `Until you turn ${turning}` : 'Until your birthday';
        $('countdownDate').textContent = A.formatDate(target);

        const last = A.clampedDate(target.getFullYear() - 1, b.month, b.day);
        const pct = isToday ? 100 : ((now - last) / (target - last)) * 100;
        $('countdownBar').style.width = `${pct.toFixed(2)}%`;
        $('countdownProgressText').textContent = isToday ? 'Enjoy your day!' : `${pct.toFixed(1)}% of the way from your last birthday`;
        document.title = isToday ? '🎉 Happy Birthday!' : `${Math.floor(s / 86400)} days to go – Birthday Countdown`;
        if (isToday && !confettiShown && window.AgeCalcFun) { confettiShown = true; window.AgeCalcFun.confetti(); }
    }

    function start() {
        clearInterval(timer);
        const b = birthdayFromHash();
        $('countdownDisplay').hidden = !b;
        $('countdownForm').hidden = !!b;
        if (!b) return;
        tick(b);
        timer = setInterval(() => tick(b), 1000);
    }

    document.addEventListener('DOMContentLoaded', () => {
        A.autoFormatDate($('countdownInput'));
        $('countdownForm').addEventListener('submit', e => {
            e.preventDefault();
            const d = A.parseMMDDYYYY($('countdownInput').value);
            if (!d) {
                $('countdownError').textContent = 'Please enter a valid date as MM/DD/YYYY or MMDDYYYY.';
                $('countdownError').hidden = false;
                return;
            }
            $('countdownError').hidden = true;
            location.hash = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${d.getFullYear()}`;
        });

        if (!location.hash) {
            // Fall back to the birthday remembered by the main page on this device.
            const saved = A.parseMMDDYYYY(A.storage.get('lastBirthDate') || '');
            if (saved) {
                history.replaceState(null, '', `#${String(saved.getMonth() + 1).padStart(2, '0')}-${String(saved.getDate()).padStart(2, '0')}-${saved.getFullYear()}`);
            }
        }
        window.addEventListener('hashchange', start);
        start();
    });
})();
