const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { loadSite, root } = require('./load');

const site = loadSite();
const A = site.AgeCalc;
const X = site.AgeCalcExtras;
const F = site.AgeCalcFun;
const d = s => A.parseMMDDYYYY(s);
const ymd = (b, t) => { const a = A.calculateAge(d(b), d(t), false); return [a.years, a.months, a.days]; };

test('every script and data file is valid JavaScript', () => {
    const files = ['script.js', 'fun.js', 'extras.js', 'i18n.js', 'countdown.js',
        ...fs.readdirSync(path.join(root, 'data')).map(f => `data/${f}`)];
    for (const f of files) execFileSync(process.execPath, ['--check', path.join(root, f)]);
});

test('date parsing accepts MM/DD/YYYY and MMDDYYYY', () => {
    for (const s of ['06/16/1990', '6/16/1990', '06-16-1990', '06.16.1990', '06161990', ' 06161990 ']) {
        assert.equal(d(s).toDateString(), 'Sat Jun 16 1990', s);
    }
    for (const s of ['02/30/2001', '02302001', '13/01/1990', '6161990', '061619900', 'abc', '']) {
        assert.equal(d(s), null, s);
    }
});

test('age in years, months and days', () => {
    assert.deepEqual(ymd('06/16/1990', '06/16/2026'), [36, 0, 0]);
    assert.deepEqual(ymd('06/16/1990', '06/15/2026'), [35, 11, 30]);
    assert.deepEqual(ymd('01/31/2001', '03/01/2001'), [0, 1, 1]);
    assert.deepEqual(ymd('02/29/2000', '02/28/2001'), [1, 0, 0]);
    assert.deepEqual(ymd('02/29/2000', '03/01/2001'), [1, 0, 1]);
    assert.deepEqual(ymd('12/31/1999', '01/01/2000'), [0, 0, 1]);
});

test('total days ignore daylight-saving changes', () => {
    assert.equal(A.calculateAge(d('03/01/2024'), d('04/01/2024'), false).totalDays, 31);
    assert.equal(A.calculateAge(d('10/01/2024'), d('12/01/2024'), false).totalDays, 61);
});

test('next birthday, including Feb 29', () => {
    const nb = A.nextBirthday(d('02/29/2000'), d('11/07/2026'));
    assert.equal(nb.date.toDateString(), 'Sun Feb 28 2027');
    assert.equal(nb.turning, 27);
    assert.equal(A.nextBirthday(d('11/07/1990'), d('11/07/2026')).daysAway, 0);
});

test('western zodiac boundaries', () => {
    const sign = s => A.getWesternZodiac(d(s)).key;
    assert.equal(sign('12/21/2000'), 'Sagittarius');
    assert.equal(sign('12/22/2000'), 'Capricorn');
    assert.equal(sign('01/19/2000'), 'Capricorn');
    assert.equal(sign('01/20/2000'), 'Aquarius');
    assert.equal(sign('06/16/1990'), 'Gemini');
});

test('Chinese zodiac uses the lunar new year', () => {
    assert.equal(A.getChineseZodiac(d('01/20/1990')).title, 'Earth Snake');
    assert.equal(A.getChineseZodiac(d('01/30/1990')).title, 'Metal Horse');
    assert.equal(A.getChineseZodiac(d('02/09/2024')).title, 'Water Rabbit');
    assert.equal(A.getChineseZodiac(d('02/10/2024')).title, 'Wood Dragon');
    assert.equal(A.getVietnameseZodiac(d('02/09/2024')).title, 'Water Cat');
});

test('Mayan day sign matches 21 Dec 2012 = 4 Ahau', () => {
    assert.equal(A.getMayanZodiac(d('12/21/2012')).title, '4 Ahau');
});

test('time zone conversion', () => {
    assert.equal(A.zonedTimeToUtc(1990, 5, 16, 14, 30, 'America/New_York').toISOString(), '1990-06-16T18:30:00.000Z');
    assert.equal(A.zonedTimeToUtc(1990, 0, 16, 14, 30, 'Asia/Tokyo').toISOString(), '1990-01-16T05:30:00.000Z');
});

test('sun and moon positions', () => {
    const equinox = new Date(Date.UTC(2024, 2, 20, 3, 6));
    assert.ok(Math.abs(X.sunLongitude(equinox)) < 0.05 || Math.abs(X.sunLongitude(equinox) - 360) < 0.05);
    const newMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
    assert.ok(Math.abs(X.moonLongitude(newMoon) - X.sunLongitude(newMoon)) < 0.5);
});

test('rising sign equals the sun at sunrise (within refraction)', () => {
    const cases = [
        [new Date(Date.UTC(2024, 5, 21, 3, 43)), 51.5074, -0.1278],
        [new Date(Date.UTC(2024, 11, 21, 12, 16)), 40.7128, -74.006],
        [new Date(Date.UTC(2024, 2, 19, 20, 4)), -33.8688, 151.2093]
    ];
    for (const [date, lat, lon] of cases) {
        let diff = Math.abs(X.ascendant(date, lat, lon) - X.sunLongitude(date));
        if (diff > 180) diff = 360 - diff;
        assert.ok(diff < 2.5, `diff ${diff}`);
    }
});

test('life path numbers keep master numbers', () => {
    assert.equal(X.lifePathNumber(d('06/16/1990')), 5);
    assert.equal(X.lifePathNumber(d('11/29/1990')), 5);
    assert.equal(X.lifePathNumber(d('01/01/2000')), 4);
    assert.equal(X.lifePathNumber(d('11/11/2009')), 33);
});

test('generations', () => {
    assert.equal(X.generationOf(1990)[2], 'Millennials');
    assert.equal(X.generationOf(1964)[2], 'Baby Boomers');
    assert.equal(X.generationOf(2005)[2], 'Generation Z');
});

test('moon phase on known dates', () => {
    assert.equal(F.moonPhase(new Date(2024, 3, 23)).name, 'Full Moon');
    assert.equal(F.moonPhase(new Date(2024, 3, 8)).name, 'New Moon');
});

test('every translation has every key', () => {
    const { STRINGS } = site.I18N;
    const keys = Object.keys(STRINGS.en);
    for (const [lang, dict] of Object.entries(STRINGS)) {
        for (const k of keys) assert.ok(k in dict, `${lang} is missing ${k}`);
    }
});

test('every zodiac sign has a write-up', () => {
    const info = vmGet('ZODIAC_INFO');
    const expect = {
        western: 12, chinese: 12, nativeAmerican: 12, vedic: 12, mayan: 20, incan: 12
    };
    for (const [system, n] of Object.entries(expect)) assert.equal(Object.keys(info[system]).length, n, system);
});

function vmGet(name) {
    const vm = require('vm');
    return vm.runInContext(name, site);
}
