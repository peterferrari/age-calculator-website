# 🎂 Age Calculator - Comprehensive Birthday Explorer

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
- `data/` - Databases for famous people, historical events, Academy Awards and zodiac details
- `archive/` - Older versions and test pages, kept for reference (not used by the site)

To run it, open `index.html` in a browser, or serve the folder (`python3 -m http.server`).
After editing a data file, run `node --check data/<file>.js` to catch syntax errors: one missing comma stops the whole database from loading.

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