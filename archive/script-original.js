// Age Calculator JavaScript

// Date format validation and parsing
function parseMMDDYYYY(dateString) {
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = dateString.match(regex);
    
    if (!match) return null;
    
    const month = parseInt(match[1], 10);
    const day = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    
    // Validate ranges
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    if (year < 1900 || year > 2100) return null;
    
    const date = new Date(year, month - 1, day);
    
    // Check if the date is valid (handles invalid dates like 02/30/2023)
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }
    
    return date;
}

// Calculate precise age
function calculateAge(birthDate, toDate = new Date()) {
    const birth = new Date(birthDate);
    const to = new Date(toDate);
    
    let years = to.getFullYear() - birth.getFullYear();
    let months = to.getMonth() - birth.getMonth();
    let days = to.getDate() - birth.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastDayOfPrevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
        days += lastDayOfPrevMonth;
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Calculate total time difference in milliseconds
    const timeDiff = to.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    
    return {
        years,
        months,
        days,
        totalDays,
        totalHours,
        totalMinutes
    };
}

// Western Zodiac Signs
function getWesternZodiac(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const signs = [
        { name: "Capricorn", symbol: "♑", dates: [[12, 22], [1, 19]] },
        { name: "Aquarius", symbol: "♒", dates: [[1, 20], [2, 18]] },
        { name: "Pisces", symbol: "♓", dates: [[2, 19], [3, 20]] },
        { name: "Aries", symbol: "♈", dates: [[3, 21], [4, 19]] },
        { name: "Taurus", symbol: "♉", dates: [[4, 20], [5, 20]] },
        { name: "Gemini", symbol: "♊", dates: [[5, 21], [6, 20]] },
        { name: "Cancer", symbol: "♋", dates: [[6, 21], [7, 22]] },
        { name: "Leo", symbol: "♌", dates: [[7, 23], [8, 22]] },
        { name: "Virgo", symbol: "♍", dates: [[8, 23], [9, 22]] },
        { name: "Libra", symbol: "♎", dates: [[9, 23], [10, 22]] },
        { name: "Scorpio", symbol: "♏", dates: [[10, 23], [11, 21]] },
        { name: "Sagittarius", symbol: "♐", dates: [[11, 22], [12, 21]] }
    ];
    
    for (const sign of signs) {
        const [start, end] = sign.dates;
        if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
            return `${sign.symbol} ${sign.name}`;
        }
    }
    return "♑ Capricorn"; // Default fallback
}

// Chinese Zodiac
function getChineseZodiac(year) {
    const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    const elements = ["Metal", "Water", "Wood", "Fire", "Earth"];
    
    const animalIndex = (year - 1900) % 12;
    const elementIndex = Math.floor(((year - 1900) % 10) / 2);
    
    return `${elements[elementIndex]} ${animals[animalIndex]}`;
}

// Vietnamese Zodiac (similar to Chinese but with Cat instead of Rabbit)
function getVietnameseZodiac(year) {
    const animals = ["Rat", "Ox", "Tiger", "Cat", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    const elements = ["Metal", "Water", "Wood", "Fire", "Earth"];
    
    const animalIndex = (year - 1900) % 12;
    const elementIndex = Math.floor(((year - 1900) % 10) / 2);
    
    return `${elements[elementIndex]} ${animals[animalIndex]}`;
}

// Native American Zodiac
function getNativeAmericanZodiac(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const signs = [
        { name: "Red Hawk", dates: [[3, 21], [4, 19]] },
        { name: "Beaver", dates: [[4, 20], [5, 20]] },
        { name: "Deer", dates: [[5, 21], [6, 20]] },
        { name: "Woodpecker", dates: [[6, 21], [7, 21]] },
        { name: "Salmon", dates: [[7, 22], [8, 21]] },
        { name: "Brown Bear", dates: [[8, 22], [9, 21]] },
        { name: "Raven", dates: [[9, 22], [10, 22]] },
        { name: "Snake", dates: [[10, 23], [11, 22]] },
        { name: "Owl", dates: [[11, 23], [12, 21]] },
        { name: "Goose", dates: [[12, 22], [1, 19]] },
        { name: "Otter", dates: [[1, 20], [2, 18]] },
        { name: "Wolf", dates: [[2, 19], [3, 20]] }
    ];
    
    for (const sign of signs) {
        const [start, end] = sign.dates;
        if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
            return sign.name;
        }
    }
    return "Goose"; // Default fallback
}

// Vedic Zodiac (Simplified version)
function getVedicZodiac(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const signs = [
        { name: "Mesha (Aries)", dates: [[4, 14], [5, 14]] },
        { name: "Vrishabha (Taurus)", dates: [[5, 15], [6, 14]] },
        { name: "Mithuna (Gemini)", dates: [[6, 15], [7, 14]] },
        { name: "Karka (Cancer)", dates: [[7, 15], [8, 14]] },
        { name: "Simha (Leo)", dates: [[8, 15], [9, 15]] },
        { name: "Kanya (Virgo)", dates: [[9, 16], [10, 15]] },
        { name: "Tula (Libra)", dates: [[10, 16], [11, 14]] },
        { name: "Vrishchika (Scorpio)", dates: [[11, 15], [12, 14]] },
        { name: "Dhanus (Sagittarius)", dates: [[12, 15], [1, 13]] },
        { name: "Makara (Capricorn)", dates: [[1, 14], [2, 12]] },
        { name: "Kumbha (Aquarius)", dates: [[2, 13], [3, 13]] },
        { name: "Meena (Pisces)", dates: [[3, 14], [4, 13]] }
    ];
    
    for (const sign of signs) {
        const [start, end] = sign.dates;
        if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
            return sign.name;
        }
    }
    return "Makara (Capricorn)"; // Default fallback
}

// Mayan Zodiac
function getMayanZodiac(date) {
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const signs = [
        "Ch'en (Black Storm)", "Yax (Green Storm)", "Sac (White Storm)", "Keh (Red Storm)",
        "Mak (Enclosed)", "K'ank'in (Yellow Sun)", "Muwan (Owl)", "Pax (Planting Time)",
        "K'ayab (Turtle)", "Kumk'u (Granary)", "Wayeb (Nameless Days)", "Pop (Mat)",
        "Wo (Frog)", "Sip (Red Storm)", "Sotz' (Bat)", "Sek (Skull)", "Xul (Dog)",
        "Yaxk'in (New Sun)", "Mol (Water)", "Ch'en (Black Storm)"
    ];
    
    const signIndex = Math.floor(dayOfYear / 20) % signs.length;
    return signs[signIndex];
}

// Incan Zodiac (Simplified)
function getIncanZodiac(date) {
    const month = date.getMonth() + 1;
    const signs = [
        "Puma (January)", "Condor (February)", "Serpent (March)", "Fox (April)",
        "Llama (May)", "Falcon (June)", "Vicuña (July)", "Jaguar (August)",
        "Coca (September)", "Mountain (October)", "Chuya (November)", "Amaru (December)"
    ];
    
    return signs[month - 1] || "Puma";
}

// Famous People Data - uses database from famous-people.js
function getFamousPeople(month, day) {
    const key = `${month}-${day}`;
    
    // Check if the database is loaded and has the data
    if (typeof FAMOUS_PEOPLE !== 'undefined' && FAMOUS_PEOPLE[key]) {
        return FAMOUS_PEOPLE[key];
    }
    
    // Fallback if database not loaded or no data for this date
    return [
        "Data loading...", "Please refresh the page", "if this persists.", 
        "Famous people data", "for this date", "is currently",
        "unavailable", "in the database.", "Try another date.", "Thank you for your patience."
    ];
}

// Historical Events Data - uses database from historical-events.js
function getHistoricalEvents(month, day) {
    const key = `${month}-${day}`;
    
    // Check if the database is loaded and has the data
    if (typeof HISTORICAL_EVENTS !== 'undefined' && HISTORICAL_EVENTS[key]) {
        return HISTORICAL_EVENTS[key];
    }
    
    // Fallback if database not loaded or no data for this date
    return [
        "Data loading...", "Please refresh the page", "if this persists.", 
        "Historical events data", "for this date", "is currently",
        "unavailable", "in the database.", "Try another date.", "Thank you for your patience."
    ];
}

// Academy Awards Data - uses database from academy-awards.js
function getAcademyAwards(year) {
    // Check if the database is loaded and has the data
    if (typeof ACADEMY_AWARDS !== 'undefined' && ACADEMY_AWARDS[year]) {
        return ACADEMY_AWARDS[year];
    }
    
    // Fallback if database not loaded or no data for this year
    return {
        bestPicture: "Information not available for this year",
        bestActor: "Information not available for this year", 
        bestActress: "Information not available for this year",
        ceremony: "Academy Awards data not found",
        location: "Database loading..."
    };
}

// Main form handler
document.getElementById('ageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const birthDateInput = document.getElementById('birthDate').value.trim();
    const calculateDateInput = document.getElementById('calculateDate').value.trim();
    
    // Validate birth date
    const birthDate = parseMMDDYYYY(birthDateInput);
    if (!birthDate) {
        showError('Please enter a valid birth date in MM/DD/YYYY format.');
        return;
    }
    
    // Parse calculate date or use current date
    let calculateDate = new Date();
    if (calculateDateInput) {
        calculateDate = parseMMDDYYYY(calculateDateInput);
        if (!calculateDate) {
            showError('Please enter a valid calculation date in MM/DD/YYYY format.');
            return;
        }
    }
    
    // Check if birth date is not in the future
    if (birthDate > calculateDate) {
        showError('Birth date cannot be in the future relative to the calculation date.');
        return;
    }
    
    // Calculate age
    const age = calculateAge(birthDate, calculateDate);
    
    // Display results
    displayResults(birthDate, calculateDate, age);
});

function showError(message) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `<div class="error">${message}</div>`;
    resultsSection.style.display = 'block';
}

function displayResults(birthDate, calculateDate, age) {
    // Show age calculation
    document.getElementById('ageResult').innerHTML = `
        <div><strong>${age.years} years, ${age.months} months, ${age.days} days</strong></div>
        <div>Total: ${age.totalDays.toLocaleString()} days</div>
        <div>Total: ${age.totalHours.toLocaleString()} hours</div>
        <div>Total: ${age.totalMinutes.toLocaleString()} minutes</div>
    `;
    
    // Show zodiac signs
    document.getElementById('westernZodiac').textContent = getWesternZodiac(birthDate);
    document.getElementById('chineseZodiac').textContent = getChineseZodiac(birthDate.getFullYear());
    document.getElementById('vietnameseZodiac').textContent = getVietnameseZodiac(birthDate.getFullYear());
    document.getElementById('nativeAmericanZodiac').textContent = getNativeAmericanZodiac(birthDate);
    document.getElementById('vedicZodiac').textContent = getVedicZodiac(birthDate);
    document.getElementById('mayanZodiac').textContent = getMayanZodiac(birthDate);
    document.getElementById('incanZodiac').textContent = getIncanZodiac(birthDate);
    
    // Show famous people
    const famousPeople = getFamousPeople(birthDate.getMonth() + 1, birthDate.getDate());
    document.getElementById('famousPeople').innerHTML = '<ul>' + 
        famousPeople.map(person => `<li>${person}</li>`).join('') + '</ul>';
    
    // Show historical events
    const events = getHistoricalEvents(birthDate.getMonth() + 1, birthDate.getDate());
    document.getElementById('historicalEvents').innerHTML = '<ul>' + 
        events.map(event => `<li>${event}</li>`).join('') + '</ul>';
    
    // Show Academy Awards
    const awards = getAcademyAwards(birthDate.getFullYear());
    document.getElementById('academyAwards').innerHTML = '<ul>' + 
        `<li><strong>Best Picture:</strong> ${awards.bestPicture}</li>` +
        `<li><strong>Best Actor:</strong> ${awards.bestActor}</li>` +
        `<li><strong>Best Actress:</strong> ${awards.bestActress}</li>` + '</ul>';
    
    // Show results section
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Add input formatting for date fields
function formatDateInput(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2 && value.length < 4) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        } else if (value.length >= 4) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4, 8);
        }
        e.target.value = value;
    });
}

// Apply formatting to date inputs
formatDateInput(document.getElementById('birthDate'));
formatDateInput(document.getElementById('calculateDate'));

// Set current date as placeholder for calculate date
document.getElementById('calculateDate').placeholder = 
    new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });