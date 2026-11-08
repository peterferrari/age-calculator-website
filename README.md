# 🎂 Age Calculator - Comprehensive Birthday Explorer

**Live site:** https://peterferrari.github.io/age-calculator-website/

A modern, interactive web application that calculates your precise age and provides fascinating insights about your birth date across multiple cultural traditions.

## Features

### Age Calculation
- **Precise Age Calculation**: Years, months and days, plus totals in months, weeks, days, hours and minutes
- **Next Birthday Countdown** and the weekday you were born on
- **MM/DD/YYYY Format**: User-friendly date input format
- **Flexible Date Range**: Calculate age up to any specific date (defaults to today)

### Zodiac Signs
- **Western Zodiac**: Traditional astrology signs with symbols
- **Chinese Zodiac**: Animal and element, using the lunar year (January/February births before Lunar New Year get the previous year's sign)
- **Vietnamese Zodiac**: Like Chinese, with the Buffalo for the Ox and the Cat for the Rabbit
- **Native American Zodiac**: Traditional Native American animal totems
- **Vedic Zodiac**: Indian astrology system
- **Mayan Zodiac**: Tzolk'in day sign (GMT correlation)
- **Incan Zodiac**: Simplified Incan zodiac system

### Historical Information
- **Famous People**: A random famous person born on your day and month (click "Try Another" for more)
- **Historical Events**: A random event that happened on your birthday
- **Academy Awards**: Best Picture, Actor and Actress winners for films released in your birth year

### Fun Extras
- **Live ticker**: your age in seconds, counting up in real time
- **Milestones**: when you hit 10,000 days, 1 billion seconds, 2,000 weeks and more, each with an "add to calendar" button
- **Birthday confetti** when you calculate on your birthday
- **Share card**: download or share an image of your results, or copy them as text
- **Your age on other planets**, with your next birthday on each
- **You in numbers**: heartbeats, breaths, time asleep, dog years and other animal lifetimes
- **The world when you were born**: song of the year, biggest film, prices, minimum wage, world population, people born since, and the moon phase that night
- **Compare with a friend**: who's older and by how much, combined age and a just-for-fun compatibility score
- **Games**: Birthday Twins (which famous person with your birthday is closest to your age?) and Guess the Year
- **Dark mode**, and your last birthday is remembered on your device (with a "forget" button)

### Personal Extras
- **Birth time and place (optional)**: exact second-by-second ticker and milestones, plus your **moon sign** and **rising sign**. Places are looked up with the free [Open-Meteo geocoding API](https://open-meteo.com/en/docs/geocoding-api); only the city name is sent
- **Birthstone, birth flower and lucky colour** for your birth month
- **Numerology life path number**, including master numbers 11, 22 and 33
- **Your generation** and the "Monday's Child" rhyme for the day you were born
- **Life in weeks**: one square for every week of a 90-year life
- **Birthday countdown page** (`countdown.html`) you can bookmark. The birthday is kept in the part of the address after `#`, which browsers never send to the server
- **On This Day**: a famous birthday and an event from today's date, shown before you enter anything
- **Birthday board**: save family and friends' birthdays on your device, sorted by whose is next
- **Languages**: English, Spanish, French, Chinese and Vietnamese for the page's labels and headings (trivia and zodiac write-ups are in English)
- **Share card** now has a birthday cake with a candle for every year

## Usage

1. Enter your birth date in MM/DD/YYYY format
2. Optionally enter a specific date to calculate your age up to (defaults to today)
3. Click "Calculate Age" to see your results
4. Explore all the fascinating information about your birth date!

## Technical Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Input Validation**: Ensures valid date formats and logical date ranges
- **Smooth Animations**: Beautiful transitions and user experience
- **Auto-formatting**: Date inputs are automatically formatted as you type
- **Error Handling**: Clear error messages for invalid inputs

## Files

- `index.html` - Page structure
- `styles.css` - Styling
- `script.js` - Age math, zodiac logic and rendering
- `fun.js` - Ticker, milestones, planets, share card, friend comparison and games
- `extras.js` - Moon and rising signs, birthstones, numerology, generation, life in weeks, On This Day and the birthday board
- `i18n.js` - Translations
- `countdown.html` and `countdown.js` - The birthday countdown page
- `tests/` - Automated tests (run `npm test`, needs Node.js 18 or later)
- `data/` - Databases for famous people, historical events, Academy Awards, zodiac details (`zodiac-info-extra.js` fills the gaps) and birth-year facts (`birth-year.js`)
- `archive/` - Older versions and test pages, kept for reference (not used by the site)

To run it, open `index.html` in a browser, or serve the folder (`python3 -m http.server`).
After editing any file, run `npm test`. It checks every script and data file for syntax errors (one missing comma stops a whole database from loading) and tests the date, zodiac and astronomy calculations.

The site is published with GitHub Pages from the `main` branch, so pushing to `main` updates the live site.

## Browser Compatibility

Works with all modern browsers including:
- Chrome
- Firefox  
- Safari
- Edge

## Data Sources

Information is compiled from various public sources including Wikipedia and historical databases. The application includes sample data that can be expanded with more comprehensive datasets.

## License

Open source project for educational and personal use.