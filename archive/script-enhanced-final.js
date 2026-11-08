// Simplified Age Calculator Script
console.log('Simple script loaded');

// Global variable for Try Again functionality
let currentBirthDate = null;

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
    
    // Check if the date is valid
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }
    
    return date;
}

// Calculate age
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
    
    // Calculate totals
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

// Western Zodiac Signs with detailed information
function getWesternZodiac(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const signs = {
        "Capricorn": { symbol: "♑", element: "Earth", quality: "Cardinal", ruler: "Saturn", traits: "Ambitious, Practical, Disciplined" },
        "Aquarius": { symbol: "♒", element: "Air", quality: "Fixed", ruler: "Uranus", traits: "Independent, Innovative, Humanitarian" },
        "Pisces": { symbol: "♓", element: "Water", quality: "Mutable", ruler: "Neptune", traits: "Compassionate, Intuitive, Artistic" },
        "Aries": { symbol: "♈", element: "Fire", quality: "Cardinal", ruler: "Mars", traits: "Energetic, Courageous, Leader" },
        "Taurus": { symbol: "♉", element: "Earth", quality: "Fixed", ruler: "Venus", traits: "Reliable, Patient, Sensual" },
        "Gemini": { symbol: "♊", element: "Air", quality: "Mutable", ruler: "Mercury", traits: "Curious, Adaptable, Communicative" },
        "Cancer": { symbol: "♋", element: "Water", quality: "Cardinal", ruler: "Moon", traits: "Nurturing, Emotional, Protective" },
        "Leo": { symbol: "♌", element: "Fire", quality: "Fixed", ruler: "Sun", traits: "Confident, Generous, Dramatic" },
        "Virgo": { symbol: "♍", element: "Earth", quality: "Mutable", ruler: "Mercury", traits: "Analytical, Helpful, Perfectionist" },
        "Libra": { symbol: "♎", element: "Air", quality: "Cardinal", ruler: "Venus", traits: "Harmonious, Diplomatic, Artistic" },
        "Scorpio": { symbol: "♏", element: "Water", quality: "Fixed", ruler: "Pluto", traits: "Intense, Passionate, Mysterious" },
        "Sagittarius": { symbol: "♐", element: "Fire", quality: "Mutable", ruler: "Jupiter", traits: "Adventurous, Optimistic, Philosophical" }
    };
    
    let signName;
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) signName = "Capricorn";
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) signName = "Aquarius";
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) signName = "Pisces";
    else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) signName = "Aries";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) signName = "Taurus";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) signName = "Gemini";
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) signName = "Cancer";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) signName = "Leo";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) signName = "Virgo";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) signName = "Libra";
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) signName = "Scorpio";
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) signName = "Sagittarius";
    else signName = "Capricorn";
    
    const sign = signs[signName];
    return `${sign.symbol} ${signName}\n${sign.element} • ${sign.quality}\n${sign.traits}`;
}

// Chinese Zodiac with detailed information
function getChineseZodiac(year) {
    const animals = [
        { name: "Rat", traits: "Intelligent, Adaptable, Quick-witted", lucky: "2, 3" },
        { name: "Ox", traits: "Reliable, Strong, Determined", lucky: "1, 9" },
        { name: "Tiger", traits: "Brave, Confident, Competitive", lucky: "1, 3" },
        { name: "Rabbit", traits: "Quiet, Elegant, Kind", lucky: "3, 4" },
        { name: "Dragon", traits: "Energetic, Intelligent, Gifted", lucky: "1, 6" },
        { name: "Snake", traits: "Wise, Enigmatic, Intuitive", lucky: "2, 8" },
        { name: "Horse", traits: "Animated, Active, Energetic", lucky: "2, 7" },
        { name: "Goat", traits: "Calm, Gentle, Sympathetic", lucky: "2, 7" },
        { name: "Monkey", traits: "Sharp, Smart, Curiosity", lucky: "4, 9" },
        { name: "Rooster", traits: "Observant, Hardworking, Courageous", lucky: "5, 7" },
        { name: "Dog", traits: "Lovely, Honest, Responsible", lucky: "3, 4" },
        { name: "Pig", traits: "Compassionate, Generous, Diligent", lucky: "2, 5" }
    ];
    const elements = ["Metal", "Water", "Wood", "Fire", "Earth"];
    
    const animalIndex = (year - 1900) % 12;
    const elementIndex = Math.floor(((year - 1900) % 10) / 2);
    
    const animal = animals[animalIndex];
    const element = elements[elementIndex];
    
    return `${element} ${animal.name}\n${animal.traits}\nLucky Numbers: ${animal.lucky}`;
}

// Vietnamese Zodiac with detailed information
function getVietnameseZodiac(year) {
    const animals = [
        { name: "Rat", traits: "Clever, Resourceful, Versatile", personality: "Charming Leader" },
        { name: "Ox", traits: "Patient, Reliable, Strong", personality: "Steady Worker" },
        { name: "Tiger", traits: "Bold, Adventurous, Competitive", personality: "Natural Fighter" },
        { name: "Cat", traits: "Graceful, Intuitive, Diplomatic", personality: "Peaceful Soul" },
        { name: "Dragon", traits: "Powerful, Lucky, Ambitious", personality: "Born Leader" },
        { name: "Snake", traits: "Wise, Mysterious, Elegant", personality: "Deep Thinker" },
        { name: "Horse", traits: "Free-spirited, Active, Popular", personality: "Independent Spirit" },
        { name: "Goat", traits: "Artistic, Gentle, Compassionate", personality: "Creative Dreamer" },
        { name: "Monkey", traits: "Witty, Innovative, Clever", personality: "Problem Solver" },
        { name: "Rooster", traits: "Confident, Organized, Brave", personality: "Proud Performer" },
        { name: "Dog", traits: "Loyal, Honest, Just", personality: "Faithful Friend" },
        { name: "Pig", traits: "Kind, Generous, Happy", personality: "Good Fortune" }
    ];
    const elements = ["Metal", "Water", "Wood", "Fire", "Earth"];
    
    const animalIndex = (year - 1900) % 12;
    const elementIndex = Math.floor(((year - 1900) % 10) / 2);
    
    const animal = animals[animalIndex];
    const element = elements[elementIndex];
    
    return `${element} ${animal.name}\n${animal.traits}\n${animal.personality}`;
}

// Native American Zodiac with detailed information
function getNativeAmericanZodiac(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const signs = [
        { name: "Red Hawk", dates: [[3, 21], [4, 19]], element: "Fire", traits: "Leadership, Initiative, Pioneer", stone: "Fire Opal" },
        { name: "Beaver", dates: [[4, 20], [5, 20]], element: "Earth", traits: "Builder, Methodical, Determined", stone: "Chrysocolla" },
        { name: "Deer", dates: [[5, 21], [6, 20]], element: "Air", traits: "Gentle, Inspiring, Alert", stone: "Moss Agate" },
        { name: "Woodpecker", dates: [[6, 21], [7, 21]], element: "Water", traits: "Nurturing, Protective, Devoted", stone: "Carnelian" },
        { name: "Salmon", dates: [[7, 22], [8, 21]], element: "Fire", traits: "Focused, Enthusiastic, Generous", stone: "Red Jasper" },
        { name: "Brown Bear", dates: [[8, 22], [9, 21]], element: "Earth", traits: "Practical, Methodical, Industrious", stone: "Amethyst" },
        { name: "Raven", dates: [[9, 22], [10, 22]], element: "Air", traits: "Charming, Diplomatic, Idealistic", stone: "Jasper" },
        { name: "Snake", dates: [[10, 23], [11, 22]], element: "Water", traits: "Mysterious, Ambitious, Secretive", stone: "Copper" },
        { name: "Owl", dates: [[11, 23], [12, 21]], element: "Fire", traits: "Adventurous, Independent, Changeable", stone: "Obsidian" },
        { name: "Goose", dates: [[12, 22], [1, 19]], element: "Earth", traits: "Ambitious, Driven, Persevering", stone: "Quartz" },
        { name: "Otter", dates: [[1, 20], [2, 18]], element: "Air", traits: "Independent, Unconventional, Friendly", stone: "Silver" },
        { name: "Wolf", dates: [[2, 19], [3, 20]], element: "Water", traits: "Emotional, Passionate, Generous", stone: "Turquoise" }
    ];
    
    for (const sign of signs) {
        const [start, end] = sign.dates;
        if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
            return `${sign.name}\n${sign.element} Element\n${sign.traits}\nSacred Stone: ${sign.stone}`;
        }
    }
    const goose = signs[9]; // Goose as fallback
    return `${goose.name}\n${goose.element} Element\n${goose.traits}\nSacred Stone: ${goose.stone}`;
}

// Vedic Zodiac with detailed information
function getVedicZodiac(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const signs = [
        { name: "Mesha (Aries)", dates: [[4, 14], [5, 14]], ruler: "Mars", deity: "Hanuman", gemstone: "Red Coral" },
        { name: "Vrishabha (Taurus)", dates: [[5, 15], [6, 14]], ruler: "Venus", deity: "Lakshmi", gemstone: "Diamond" },
        { name: "Mithuna (Gemini)", dates: [[6, 15], [7, 14]], ruler: "Mercury", deity: "Saraswati", gemstone: "Emerald" },
        { name: "Karka (Cancer)", dates: [[7, 15], [8, 14]], ruler: "Moon", deity: "Parvati", gemstone: "Pearl" },
        { name: "Simha (Leo)", dates: [[8, 15], [9, 15]], ruler: "Sun", deity: "Surya", gemstone: "Ruby" },
        { name: "Kanya (Virgo)", dates: [[9, 16], [10, 15]], ruler: "Mercury", deity: "Vishnu", gemstone: "Emerald" },
        { name: "Tula (Libra)", dates: [[10, 16], [11, 14]], ruler: "Venus", deity: "Indra", gemstone: "Diamond" },
        { name: "Vrishchika (Scorpio)", dates: [[11, 15], [12, 14]], ruler: "Mars", deity: "Ganesha", gemstone: "Red Coral" },
        { name: "Dhanus (Sagittarius)", dates: [[12, 15], [1, 13]], ruler: "Jupiter", deity: "Dakshina Murthy", gemstone: "Yellow Sapphire" },
        { name: "Makara (Capricorn)", dates: [[1, 14], [2, 12]], ruler: "Saturn", deity: "Brahma", gemstone: "Blue Sapphire" },
        { name: "Kumbha (Aquarius)", dates: [[2, 13], [3, 13]], ruler: "Saturn", deity: "Varuna", gemstone: "Blue Sapphire" },
        { name: "Meena (Pisces)", dates: [[3, 14], [4, 13]], ruler: "Jupiter", deity: "Shiva", gemstone: "Yellow Sapphire" }
    ];
    
    for (const sign of signs) {
        const [start, end] = sign.dates;
        if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
            return `${sign.name}\nRuler: ${sign.ruler}\nDeity: ${sign.deity}\nGem: ${sign.gemstone}`;
        }
    }
    const makara = signs[9]; // Makara as fallback
    return `${makara.name}\nRuler: ${makara.ruler}\nDeity: ${makara.deity}\nGem: ${makara.gemstone}`;
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

// Incan Zodiac
function getIncanZodiac(date) {
    const month = date.getMonth() + 1;
    const signs = [
        "Puma (January)", "Condor (February)", "Serpent (March)", "Fox (April)",
        "Llama (May)", "Falcon (June)", "Vicuña (July)", "Jaguar (August)",
        "Coca (September)", "Mountain (October)", "Chuya (November)", "Amaru (December)"
    ];
    
    return signs[month - 1] || "Puma";
}

// Simple database functions with fallback test data
function getFamousPeople(month, day) {
    // Test data for common dates while database loads
    const testData = {
        "6-16": [
            "Stan Laurel (1890) - Comedian",
            "Tupac Shakur (1971) - Rapper", 
            "John Cho (1972) - Actor",
            "Laurie Metcalf (1955) - Actress",
            "Joyce Carol Oates (1938) - Author"
        ],
        "1-15": [
            "Martin Luther King Jr. (1929) - Civil rights leader",
            "Regina King (1970) - Actress/director",
            "Drew Brees (1979) - NFL quarterback"
        ],
        "12-25": [
            "Jesus Christ (0) - Religious figure",
            "Isaac Newton (1643) - Physicist",
            "Humphrey Bogart (1899) - Actor"
        ]
    };
    
    // Try database first, then test data, then fallback
    const key = `${month}-${day}`;
    
    if (typeof FAMOUS_PEOPLE !== 'undefined' && FAMOUS_PEOPLE[key]) {
        const randomIndex = Math.floor(Math.random() * FAMOUS_PEOPLE[key].length);
        return [FAMOUS_PEOPLE[key][randomIndex]];
    }
    
    if (testData[key]) {
        const randomIndex = Math.floor(Math.random() * testData[key].length);
        return [testData[key][randomIndex]];
    }
    
    return [`Famous person data not available for ${month}/${day}`];
}

function getHistoricalEvents(month, day) {
    // Test data for common dates while database loads
    const testData = {
        "6-16": [
            "1963 - Valentina Tereshkova becomes first woman in space",
            "1903 - Ford Motor Company incorporates",
            "1815 - Battle of Waterloo begins",
            "1858 - Lincoln-Douglas debates begin",
            "1977 - Wernher von Braun dies"
        ],
        "1-15": [
            "1929 - Martin Luther King Jr. born",
            "1969 - Nixon inaugurated as 37th President",
            "2001 - Wikipedia launches"
        ],
        "12-25": [
            "0 - Jesus Christ traditionally born",
            "800 - Charlemagne crowned Holy Roman Emperor",
            "1066 - William the Conqueror crowned King of England"
        ]
    };
    
    const key = `${month}-${day}`;
    
    if (typeof HISTORICAL_EVENTS !== 'undefined' && HISTORICAL_EVENTS[key]) {
        const randomIndex = Math.floor(Math.random() * HISTORICAL_EVENTS[key].length);
        return [HISTORICAL_EVENTS[key][randomIndex]];
    }
    
    if (testData[key]) {
        const randomIndex = Math.floor(Math.random() * testData[key].length);
        return [testData[key][randomIndex]];
    }
    
    return [`Historical event data not available for ${month}/${day}`];
}

function getAcademyAwards(year) {
    if (typeof ACADEMY_AWARDS !== 'undefined' && ACADEMY_AWARDS[year]) {
        const awards = ACADEMY_AWARDS[year];
        return {
            bestPicture: awards.bestPicture,
            bestActor: awards.bestActor,
            bestActress: awards.bestActress
        };
    }
    return {
        bestPicture: `Data not available for ${year}`,
        bestActor: `Data not available for ${year}`,
        bestActress: `Data not available for ${year}`
    };
}

// Show error function
function showError(message) {
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        resultsSection.innerHTML = `<div style="color: red; padding: 10px; background: #ffe6e6; border-radius: 5px;">${message}</div>`;
        resultsSection.style.display = 'block';
    }
}

// Display results function
function displayResults(birthDate, calculateDate, age) {
    console.log('Displaying results...');
    currentBirthDate = birthDate;
    
    // Show age calculation
    const ageResult = document.getElementById('ageResult');
    if (ageResult) {
        ageResult.innerHTML = `
            <div><strong>${age.years} years, ${age.months} months, ${age.days} days</strong></div>
            <div>Total: ${age.totalDays.toLocaleString()} days</div>
            <div>Total: ${age.totalHours.toLocaleString()} hours</div>
            <div>Total: ${age.totalMinutes.toLocaleString()} minutes</div>
        `;
    }
    
    // Show zodiac signs
    const westernZodiac = document.getElementById('westernZodiac');
    if (westernZodiac) westernZodiac.textContent = getWesternZodiac(birthDate);
    
    const chineseZodiac = document.getElementById('chineseZodiac');
    if (chineseZodiac) chineseZodiac.textContent = getChineseZodiac(birthDate.getFullYear());
    
    const vietnameseZodiac = document.getElementById('vietnameseZodiac');
    if (vietnameseZodiac) vietnameseZodiac.textContent = getVietnameseZodiac(birthDate.getFullYear());
    
    const nativeAmericanZodiac = document.getElementById('nativeAmericanZodiac');
    if (nativeAmericanZodiac) nativeAmericanZodiac.textContent = getNativeAmericanZodiac(birthDate);
    
    const vedicZodiac = document.getElementById('vedicZodiac');
    if (vedicZodiac) vedicZodiac.textContent = getVedicZodiac(birthDate);
    
    const mayanZodiac = document.getElementById('mayanZodiac');
    if (mayanZodiac) mayanZodiac.textContent = getMayanZodiac(birthDate);
    
    const incanZodiac = document.getElementById('incanZodiac');
    if (incanZodiac) incanZodiac.textContent = getIncanZodiac(birthDate);
    
    // Show famous people
    const famousPeople = getFamousPeople(birthDate.getMonth() + 1, birthDate.getDate());
    const famousPeopleEl = document.getElementById('famousPeople');
    if (famousPeopleEl) {
        famousPeopleEl.innerHTML = '<ul>' + 
            famousPeople.map(person => `<li>${person}</li>`).join('') + '</ul>' +
            '<button onclick="updateFamousPeople()" style="margin-top: 10px; padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>';
    }
    
    // Show historical events
    const events = getHistoricalEvents(birthDate.getMonth() + 1, birthDate.getDate());
    const historicalEventsEl = document.getElementById('historicalEvents');
    if (historicalEventsEl) {
        historicalEventsEl.innerHTML = '<ul>' + 
            events.map(event => `<li>${event}</li>`).join('') + '</ul>' +
            '<button onclick="updateHistoricalEvents()" style="margin-top: 10px; padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>';
    }
    
    // Show Academy Awards
    const awards = getAcademyAwards(birthDate.getFullYear());
    const academyAwardsEl = document.getElementById('academyAwards');
    if (academyAwardsEl) {
        academyAwardsEl.innerHTML = '<ul>' + 
            `<li><strong>Best Picture:</strong> ${awards.bestPicture}</li>` +
            `<li><strong>Best Actor:</strong> ${awards.bestActor}</li>` +
            `<li><strong>Best Actress:</strong> ${awards.bestActress}</li>` +
            '</ul>';
    }
    
    // Show results section
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        resultsSection.style.display = 'block';
    }
}

// Try Again functions
function updateFamousPeople() {
    if (!currentBirthDate) return;
    
    const famousPeople = getFamousPeople(currentBirthDate.getMonth() + 1, currentBirthDate.getDate());
    const famousPeopleEl = document.getElementById('famousPeople');
    if (famousPeopleEl) {
        famousPeopleEl.innerHTML = '<ul>' + 
            famousPeople.map(person => `<li>${person}</li>`).join('') + '</ul>' +
            '<button onclick="updateFamousPeople()" style="margin-top: 10px; padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>';
    }
}

function updateHistoricalEvents() {
    if (!currentBirthDate) return;
    
    const events = getHistoricalEvents(currentBirthDate.getMonth() + 1, currentBirthDate.getDate());
    const historicalEventsEl = document.getElementById('historicalEvents');
    if (historicalEventsEl) {
        historicalEventsEl.innerHTML = '<ul>' + 
            events.map(event => `<li>${event}</li>`).join('') + '</ul>' +
            '<button onclick="updateHistoricalEvents()" style="margin-top: 10px; padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>';
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple script DOM loaded');
    
    const form = document.getElementById('ageForm');
    if (!form) {
        console.error('Form not found!');
        return;
    }
    
    console.log('Form found, adding event listener');
    
    form.addEventListener('submit', function(e) {
        console.log('Form submitted!');
        e.preventDefault();
        
        const birthDateInput = document.getElementById('birthDate').value.trim();
        console.log('Birth date input:', birthDateInput);
        
        if (!birthDateInput) {
            showError('Please enter your birth date');
            return;
        }
        
        // Parse birth date
        const birthDate = parseMMDDYYYY(birthDateInput);
        if (!birthDate) {
            showError('Please enter a valid birth date in MM/DD/YYYY format');
            return;
        }
        
        // Parse calculate date or use today
        const calculateDateInput = document.getElementById('calculateDate');
        let calculateDate = new Date();
        
        if (calculateDateInput && calculateDateInput.value.trim()) {
            calculateDate = parseMMDDYYYY(calculateDateInput.value.trim());
            if (!calculateDate) {
                showError('Please enter a valid calculation date in MM/DD/YYYY format');
                return;
            }
        }
        
        // Check if birth date is in the future
        if (birthDate > calculateDate) {
            showError('Birth date cannot be in the future');
            return;
        }
        
        // Calculate age
        console.log('Calculating age...');
        const age = calculateAge(birthDate, calculateDate);
        console.log('Age calculated:', age);
        
        // Display results
        displayResults(birthDate, calculateDate, age);
    });
    
    console.log('Event listener added successfully');
    
    // Check if database variables are loaded
    console.log('FAMOUS_PEOPLE available:', typeof FAMOUS_PEOPLE !== 'undefined');
    console.log('HISTORICAL_EVENTS available:', typeof HISTORICAL_EVENTS !== 'undefined');
    console.log('ACADEMY_AWARDS available:', typeof ACADEMY_AWARDS !== 'undefined');
    
    if (typeof FAMOUS_PEOPLE !== 'undefined') {
        console.log('Sample FAMOUS_PEOPLE keys:', Object.keys(FAMOUS_PEOPLE).slice(0, 5));
        console.log('6-16 exists in FAMOUS_PEOPLE:', '6-16' in FAMOUS_PEOPLE);
        if ('6-16' in FAMOUS_PEOPLE) {
            console.log('6-16 data:', FAMOUS_PEOPLE['6-16']);
        }
    }
    
    // Setup zodiac click handlers if modal exists
    setupZodiacClickHandlers();
});

// Basic Zodiac Modal Functionality
function setupZodiacClickHandlers() {
    const modal = document.getElementById('zodiacModal');
    if (!modal) {
        console.log('Zodiac modal not found, skipping click handlers');
        return;
    }
    
    // Add click handlers to zodiac cards
    document.querySelectorAll('.zodiac-card.clickable').forEach(card => {
        card.addEventListener('click', function() {
            const system = this.dataset.system;
            const signElement = this.querySelector('.zodiac-sign');
            
            if (signElement && signElement.textContent.trim()) {
                showZodiacModal(system, signElement.textContent.trim());
            }
        });
    });
    
    // Close modal handlers
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeZodiacModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeZodiacModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeZodiacModal();
        }
    });
}

function showZodiacModal(system, signText) {
    const modal = document.getElementById('zodiacModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    // Simple modal content
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h2>🌟 ${signText}</h2>
            <p><strong>${getSystemName(system)}</strong></p>
            <p>You are a <strong>${signText}</strong> in the ${getSystemName(system)} system!</p>
            <p>This zodiac sign has its own unique characteristics and traits that have guided people for centuries.</p>
            <p><em>Click outside this modal or press Escape to close.</em></p>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeZodiacModal() {
    const modal = document.getElementById('zodiacModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function getSystemName(system) {
    const names = {
        western: 'Western Astrology',
        chinese: 'Chinese Zodiac',
        vietnamese: 'Vietnamese Zodiac',
        nativeAmerican: 'Native American Zodiac',
        vedic: 'Vedic Astrology',
        mayan: 'Mayan Astrology',
        incan: 'Incan Astrology'
    };
    return names[system] || system;
}

console.log('Simple script fully loaded');
