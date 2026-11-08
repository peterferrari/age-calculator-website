// Age Calculator JavaScript with Backend Database Integration

// Global variables for Try Again functionality and zodiac data
let currentBirthDate = null;
let currentZodiacSign = null;
let currentZodiacSystem = null;

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

// 🗄️ DATABASE INTEGRATION FUNCTIONS

// Famous People Database Integration
function getFamousPeopleFromDatabase(month, day) {
    const key = `${month}-${day}`;
    
    // Check if we have data for this specific date
    if (FAMOUS_PEOPLE && FAMOUS_PEOPLE[key]) {
        const allPeople = FAMOUS_PEOPLE[key];
        // Return a random selection from the available famous people
        const randomIndex = Math.floor(Math.random() * allPeople.length);
        return [allPeople[randomIndex]];
    }
    
    // Fallback data if database doesn't have the specific date
    return [
        "No famous people data available for " + month + "/" + day + ". Try refreshing for different results on other dates!"
    ];
}

// Historical Events Database Integration  
function getHistoricalEventsFromDatabase(month, day) {
    const key = `${month}-${day}`;
    
    // Check if we have data for this specific date
    if (HISTORICAL_EVENTS && HISTORICAL_EVENTS[key]) {
        const allEvents = HISTORICAL_EVENTS[key];
        // Return a random selection from the available historical events
        const randomIndex = Math.floor(Math.random() * allEvents.length);
        return [allEvents[randomIndex]];
    }
    
    // Fallback data if database doesn't have the specific date
    return [
        "No historical events data available for " + month + "/" + day + ". Try refreshing for different results on other dates!"
    ];
}

// Academy Awards Database Integration
function getAcademyAwardsFromDatabase(year) {
    // Check if we have data for this specific year
    if (ACADEMY_AWARDS && ACADEMY_AWARDS[year]) {
        const awards = ACADEMY_AWARDS[year];
        return {
            bestPicture: awards.bestPicture,
            bestActor: awards.bestActor,
            bestActress: awards.bestActress,
            ceremony: awards.ceremony || "Academy Awards",
            location: awards.location || "Hollywood"
        };
    }
    
    // Fallback data if database doesn't have the specific year
    return {
        bestPicture: `Academy Awards data not available for ${year}`,
        bestActor: `Academy Awards data not available for ${year}`,
        bestActress: `Academy Awards data not available for ${year}`,
        ceremony: "Information not available",
        location: "Information not available"
    };
}

// Main data retrieval functions
function getFamousPeople(month, day) {
    return getFamousPeopleFromDatabase(month, day);
}

function getHistoricalEvents(month, day) {
    return getHistoricalEventsFromDatabase(month, day);
}

function getAcademyAwards(year) {
    return getAcademyAwardsFromDatabase(year);
}

// Error display function
function showError(message) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `<div class="error">${message}</div>`;
    resultsSection.style.display = 'block';
}

// Results display function
function displayResults(birthDate, calculateDate, age) {
    // Store current birth date for Try Again functionality
    currentBirthDate = birthDate;
    
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
    
    // Show famous people from database
    const famousPeople = getFamousPeople(birthDate.getMonth() + 1, birthDate.getDate());
    document.getElementById('famousPeople').innerHTML = '<ul>' + 
        famousPeople.map(person => `<li>${person}</li>`).join('') + '</ul>' +
        '<button class="try-again-btn" onclick="updateFamousPeople()">Try Again</button>';
    
    // Show historical events from database
    const events = getHistoricalEvents(birthDate.getMonth() + 1, birthDate.getDate());
    document.getElementById('historicalEvents').innerHTML = '<ul>' + 
        events.map(event => `<li>${event}</li>`).join('') + '</ul>' +
        '<button class="try-again-btn" onclick="updateHistoricalEvents()">Try Again</button>';
    
    // Show Academy Awards from database
    const awards = getAcademyAwards(birthDate.getFullYear());
    document.getElementById('academyAwards').innerHTML = '<ul>' + 
        `<li><strong>Best Picture:</strong> ${awards.bestPicture}</li>` +
        `<li><strong>Best Actor:</strong> ${awards.bestActor}</li>` +
        `<li><strong>Best Actress:</strong> ${awards.bestActress}</li>` + 
        (awards.ceremony !== "Information not available" ? `<li><strong>Ceremony:</strong> ${awards.ceremony}</li>` : '') +
        '</ul>';
    
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

// Wait for DOM to load before initializing
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    
    // Check if form exists
    const form = document.getElementById('ageForm');
    if (!form) {
        console.error('Form with id "ageForm" not found!');
        return;
    }
    console.log('Form found, adding event listener');
    
    // Main form handler
    form.addEventListener('submit', function(e) {
        console.log('Form submitted!');
        e.preventDefault();
        
        const birthDateInput = document.getElementById('birthDate').value.trim();
        console.log('Birth date input:', birthDateInput);
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
    
    // Apply formatting to date inputs
    try {
        const birthDateEl = document.getElementById('birthDate');
        const calculateDateEl = document.getElementById('calculateDate');
        
        if (birthDateEl) formatDateInput(birthDateEl);
        if (calculateDateEl) {
            formatDateInput(calculateDateEl);
            calculateDateEl.placeholder = 
                new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        }
        
        console.log('Date input formatting applied');
    } catch (error) {
        console.error('Error setting up date inputs:', error);
    }
    
    // Setup zodiac click handlers
    try {
        setupZodiacClickHandlers();
        console.log('Zodiac click handlers setup completed');
    } catch (error) {
        console.error('Error setting up zodiac handlers:', error);
    }
    
    // Check database status
    try {
        checkDatabaseStatus();
    } catch (error) {
        console.error('Error checking database status:', error);
    }
});

// 🌟 ZODIAC MODAL FUNCTIONALITY

// Function to extract sign name from zodiac text
function extractSignName(zodiacText) {
    // Remove symbols and extra text to get just the sign name
    return zodiacText.replace(/[♈♉♊♋♌♍♎♏♐♑♒♓]/g, '').trim().split(' ')[0];
}

// Function to extract sign name for different zodiac systems
function extractSignNameBySystem(system, zodiacText) {
    switch(system) {
        case 'vedic':
            // For Vedic, extract the Sanskrit name (first part before parentheses)
            const vedicMatch = zodiacText.match(/([A-Za-z]+)\s*\(/); 
            return vedicMatch ? vedicMatch[1] : zodiacText.split(' ')[0];
        
        case 'mayan':
            // For Mayan, extract the name before any parentheses or descriptive text
            return zodiacText.split(' ')[0].replace(/[^A-Za-z]/g, '');
        
        case 'incan':
            // For Incan, extract the animal/concept name before parentheses
            const incanMatch = zodiacText.match(/([A-Za-z]+)\s*\(/);
            return incanMatch ? incanMatch[1] : zodiacText.split(' ')[0];
        
        case 'chinese':
        case 'vietnamese':
            // For Chinese/Vietnamese, extract animal name (last word)
            const parts = zodiacText.split(' ');
            return parts[parts.length - 1];
        
        case 'nativeAmerican':
            // For Native American, use the full text as the sign name
            return zodiacText;
        
        default:
            // For Western and others, remove symbols and get first word
            return zodiacText.replace(/[♈♉♊♋♌♍♎♏♐♑♒♓]/g, '').trim().split(' ')[0];
    }
}

// Function to show zodiac modal
function showZodiacModal(system, signText) {
    const modal = document.getElementById('zodiacModal');
    const modalBody = document.getElementById('modalBody');
    
    // Extract the sign name using the appropriate method for each system
    let signName = extractSignNameBySystem(system, signText);
    
    // Get zodiac information from database
    let zodiacInfo = null;
    if (typeof ZODIAC_INFO !== 'undefined') {
        zodiacInfo = getZodiacInfo(system, signName);
    }
    
    if (zodiacInfo) {
        modalBody.innerHTML = generateZodiacModalContent(system, signName, signText, zodiacInfo);
    } else {
        modalBody.innerHTML = generateFallbackModalContent(system, signName, signText);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to generate detailed modal content
function generateZodiacModalContent(system, signName, signText, info) {
    const systemNames = {
        western: 'Western Astrology',
        chinese: 'Chinese Zodiac',
        vietnamese: 'Vietnamese Zodiac',
        nativeAmerican: 'Native American Zodiac',
        vedic: 'Vedic Astrology (Jyotisha)',
        mayan: 'Mayan Day Signs',
        incan: 'Incan Zodiac'
    };
    
    let content = `
        <div class="modal-header">
            <h2>
                <span class="zodiac-symbol">${info.symbol || '🌟'}</span>
                ${signText} - ${systemNames[system] || system}
            </h2>
        </div>
        
        <div class="zodiac-details">
            <div class="zodiac-description">
                ${info.description}
            </div>
    `;
    
    // Add basic information grid
    content += '<div class="zodiac-info-grid">';
    
    if (info.dates) {
        content += `
            <div class="zodiac-info-card">
                <h4>📅 Dates</h4>
                <p>${info.dates}</p>
            </div>
        `;
    }
    
    if (info.element) {
        content += `
            <div class="zodiac-info-card">
                <h4>🔥 Element</h4>
                <p>${info.element}</p>
            </div>
        `;
    }
    
    if (info.quality) {
        content += `
            <div class="zodiac-info-card">
                <h4>⚡ Quality</h4>
                <p>${info.quality}</p>
            </div>
        `;
    }
    
    if (info.rulingPlanet) {
        content += `
            <div class="zodiac-info-card">
                <h4>🪐 Ruling Planet</h4>
                <p>${info.rulingPlanet}</p>
            </div>
        `;
    }
    
    content += '</div>';
    content += '</div>'; // Close zodiac-details
    
    return content;
}

// Function to generate fallback content when no detailed info is available
function generateFallbackModalContent(system, signName, signText) {
    const systemNames = {
        western: 'Western Astrology',
        chinese: 'Chinese Zodiac', 
        vietnamese: 'Vietnamese Zodiac',
        nativeAmerican: 'Native American Zodiac',
        vedic: 'Vedic Astrology',
        mayan: 'Mayan Astrology',
        incan: 'Incan Astrology'
    };
    
    return `
        <div class="modal-header">
            <h2>🌟 ${signText} - ${systemNames[system] || system}</h2>
        </div>
        
        <div class="zodiac-details">
            <div class="zodiac-description">
                <p>You are a <strong>${signText}</strong> in the ${systemNames[system] || system} system!</p>
                <p>This is a fascinating zodiac sign with its own unique characteristics and traits.</p>
                <p>Each zodiac system offers different insights into personality, compatibility, and life patterns.</p>
            </div>
            
            <div class="zodiac-info-card">
                <h4>📚 About This System</h4>
                <p>${getSystemDescription(system)}</p>
            </div>
            
            <div class="zodiac-info-card">
                <h4>✨ Your Sign</h4>
                <p>As a ${signText}, you belong to a tradition that has guided people for centuries. Each sign carries its own wisdom and insights.</p>
            </div>
        </div>
    `;
}

// Function to get system descriptions
function getSystemDescription(system) {
    const descriptions = {
        western: 'Western astrology is based on the tropical zodiac and focuses on the position of the sun at the time of birth. It emphasizes personality traits and psychological patterns.',
        chinese: 'Chinese astrology is based on a 12-year cycle, with each year represented by an animal. It emphasizes character traits, fortune, and compatibility.',
        vietnamese: 'Vietnamese astrology is similar to Chinese astrology but replaces the Rabbit with the Cat. It focuses on personality and life destiny.',
        nativeAmerican: 'Native American astrology is based on the connection between birth timing and animal spirits or totems. It emphasizes the relationship with nature and spiritual guidance.',
        vedic: 'Vedic astrology (Jyotisha) is the ancient Indian system of astrology based on sidereal calculations. It emphasizes karma, dharma, and spiritual evolution through multiple lifetimes. Each sign has a ruling planet, deity, mantra, and gemstone for spiritual protection.',
        mayan: 'Mayan astrology is based on the sacred 260-day Tzolkin calendar with 20 day signs. Each day sign represents spiritual archetypes and cosmic energies. The Mayans believed each day sign carried specific powers and connections to natural forces.',
        incan: 'Incan astrology is based on the sacred traditions of the Andean people and their connection to the three worlds (upper, middle, lower). Each month is associated with sacred animals, locations, ceremonies, and the Chakana (Andean cross) cosmology.'
    };
    
    return descriptions[system] || 'This is an ancient astrological system with its own unique approach to understanding personality and destiny.';
}

// Function to close the modal
function closeZodiacModal() {
    const modal = document.getElementById('zodiacModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Function to set up zodiac click handlers
function setupZodiacClickHandlers() {
    // Check if modal elements exist before setting up handlers
    const modal = document.getElementById('zodiacModal');
    const closeButton = document.querySelector('.close');
    
    if (!modal) {
        console.warn('Zodiac modal not found, skipping zodiac click handlers setup');
        return;
    }
    
    // Add click handlers to clickable zodiac cards
    document.querySelectorAll('.zodiac-card.clickable').forEach(card => {
        card.addEventListener('click', function() {
            const system = this.dataset.system;
            const signElement = this.querySelector('.zodiac-sign');
            
            if (signElement && signElement.textContent.trim()) {
                showZodiacModal(system, signElement.textContent.trim());
            }
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
    // Close modal when clicking the X
    if (closeButton) {
        closeButton.addEventListener('click', closeZodiacModal);
    }
    
    // Close modal when clicking outside of it
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeZodiacModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeZodiacModal();
        }
    });
}

// Database status indicator (for development/debugging)
function checkDatabaseStatus() {
    const famousPeopleAvailable = typeof FAMOUS_PEOPLE !== 'undefined';
    const eventsAvailable = typeof HISTORICAL_EVENTS !== 'undefined';
    const awardsAvailable = typeof ACADEMY_AWARDS !== 'undefined';
    const zodiacInfoAvailable = typeof ZODIAC_INFO !== 'undefined';
    
    console.log('Database Status:');
    console.log('Famous People:', famousPeopleAvailable ? '✅ Loaded' : '❌ Not loaded');
    console.log('Historical Events:', eventsAvailable ? '✅ Loaded' : '❌ Not loaded');
    console.log('Academy Awards:', awardsAvailable ? '✅ Loaded' : '❌ Not loaded');
    console.log('Zodiac Info:', zodiacInfoAvailable ? '✅ Loaded' : '❌ Not loaded');
    
    if (!famousPeopleAvailable || !eventsAvailable || !awardsAvailable || !zodiacInfoAvailable) {
        console.warn('Some database files may not be loaded. Make sure all data files are included before this script.');
    }
}

// 🔄 TRY AGAIN FUNCTIONALITY

// Function to update famous people with a new random selection
function updateFamousPeople() {
    if (!currentBirthDate) {
        console.error('No birth date stored for Try Again functionality');
        return;
    }
    
    // Get a new random selection of famous people for the same birth date
    const famousPeople = getFamousPeople(currentBirthDate.getMonth() + 1, currentBirthDate.getDate());
    document.getElementById('famousPeople').innerHTML = '<ul>' + 
        famousPeople.map(person => `<li>${person}</li>`).join('') + '</ul>' +
        '<button class="try-again-btn" onclick="updateFamousPeople()">Try Again</button>';
}

// Function to update historical events with a new random selection
function updateHistoricalEvents() {
    if (!currentBirthDate) {
        console.error('No birth date stored for Try Again functionality');
        return;
    }
    
    // Get a new random selection of historical events for the same birth date
    const events = getHistoricalEvents(currentBirthDate.getMonth() + 1, currentBirthDate.getDate());
    document.getElementById('historicalEvents').innerHTML = '<ul>' + 
        events.map(event => `<li>${event}</li>`).join('') + '</ul>' +
        '<button class="try-again-btn" onclick="updateHistoricalEvents()">Try Again</button>';
}