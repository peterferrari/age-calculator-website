// Age Calculator JavaScript with API Integration

// API Configuration
const API_CONFIG = {
    // Wikipedia API for famous people and events
    wikipedia: {
        baseUrl: 'https://en.wikipedia.org/api/rest_v1',
        cors_proxy: 'https://api.allorigins.win/raw?url=' // CORS proxy to bypass same-origin policy
    },
    // Alternative APIs you can integrate
    celebrities: {
        // Example: Famous Birthdays API or similar
        baseUrl: 'https://api.api-ninjas.com/v1/celebrity',
        headers: {
            'X-Api-Key': 'YOUR_API_KEY_HERE' // Replace with your API key
        }
    }
};

// Date format validation and parsing (unchanged)
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

// Calculate precise age (unchanged)
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

// API Helper Functions
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return await response.json();
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        } catch (error) {
            console.warn(`Attempt ${i + 1} failed:`, error.message);
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
    }
}

// 🌟 API Integration Point 1: Famous People from Wikipedia
async function getFamousPeopleFromAPI(month, day) {
    try {
        // Show loading state
        showLoadingForSection('famousPeople', 'Loading famous people...');
        
        // Format date for Wikipedia API
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[month - 1];
        
        // Wikipedia API call for births on this date
        const searchQuery = `${monthName}_${day}_births`;
        const apiUrl = `${API_CONFIG.wikipedia.cors_proxy}${encodeURIComponent(
            `${API_CONFIG.wikipedia.baseUrl}/page/summary/${searchQuery}`
        )}`;
        
        const data = await fetchWithRetry(apiUrl);
        
        if (data.extract) {
            // Parse the extract to find famous people (this is a simplified approach)
            // In production, you'd want more sophisticated parsing
            const people = parseBirthsFromWikipedia(data.extract);
            return people.slice(0, 10); // Return top 10
        }
        
        // Fallback to local data if API fails
        return getFamousPeopleLocal(month, day);
        
    } catch (error) {
        console.error('API call failed for famous people:', error);
        // Fallback to local data
        return getFamousPeopleLocal(month, day);
    }
}

// Helper function to parse Wikipedia births data
function parseBirthsFromWikipedia(extract) {
    // This is a simplified parser - you'd want more sophisticated parsing in production
    const people = [];
    const sentences = extract.split('.');
    
    sentences.forEach(sentence => {
        // Look for patterns like "Name (year)" indicating birth years
        const match = sentence.match(/([A-Z][a-z]+ [A-Z][a-z]+).*?\((\d{4})\)/g);
        if (match) {
            match.forEach(person => people.push(person.trim()));
        }
    });
    
    return people;
}

// 🌟 API Integration Point 2: Historical Events from Wikipedia
async function getHistoricalEventsFromAPI(month, day) {
    try {
        showLoadingForSection('historicalEvents', 'Loading historical events...');
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[month - 1];
        
        // Wikipedia API call for events on this date
        const searchQuery = `${monthName}_${day}`;
        const apiUrl = `${API_CONFIG.wikipedia.cors_proxy}${encodeURIComponent(
            `${API_CONFIG.wikipedia.baseUrl}/page/summary/${searchQuery}`
        )}`;
        
        const data = await fetchWithRetry(apiUrl);
        
        if (data.extract) {
            const events = parseEventsFromWikipedia(data.extract);
            return events.slice(0, 10); // Return top 10
        }
        
        return getHistoricalEventsLocal(month, day);
        
    } catch (error) {
        console.error('API call failed for historical events:', error);
        return getHistoricalEventsLocal(month, day);
    }
}

// Helper function to parse Wikipedia events data
function parseEventsFromWikipedia(extract) {
    const events = [];
    const sentences = extract.split('.');
    
    sentences.forEach(sentence => {
        // Look for years in parentheses or standalone, indicating historical events
        const match = sentence.match(/.*(\d{4}).*[^.]/);
        if (match && sentence.length > 20) { // Filter out very short matches
            events.push(sentence.trim());
        }
    });
    
    return events;
}

// 🌟 API Integration Point 3: Academy Awards from External API
async function getAcademyAwardsFromAPI(year) {
    try {
        showLoadingForSection('academyAwards', 'Loading Academy Awards data...');
        
        // Example using OMDB API or similar movie database API
        // Replace with your preferred movie API
        const apiUrl = `https://www.omdbapi.com/?s=Oscar&y=${year}&type=movie&apikey=YOUR_OMDB_API_KEY`;
        
        // Note: You'll need to sign up for an API key from OMDB or similar service
        // const data = await fetchWithRetry(apiUrl);
        
        // For now, fallback to local data
        // In production, you'd process the API response here
        return getAcademyAwardsLocal(year);
        
    } catch (error) {
        console.error('API call failed for Academy Awards:', error);
        return getAcademyAwardsLocal(year);
    }
}

// Show loading state for specific sections
function showLoadingForSection(sectionId, message) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.innerHTML = `<div class="loading">${message}</div>`;
    }
}

// Local fallback functions (keeping your existing data)
function getFamousPeopleLocal(month, day) {
    const famousPeopleData = {
        "1-1": ["Betsy Ross (1752)", "J.D. Salinger (1919)", "Xavier Cugat (1900)", "Elin Nordegren (1980)", "Morris Chestnut (1969)", "Grandmaster Flash (1958)", "Paz Vega (1976)", "Verne Troyer (1969)", "Frank Langella (1938)", "Country Joe McDonald (1942)"],
        "1-15": ["Martin Luther King Jr. (1929)", "Regina King (1970)", "Alpha Blondy (1953)", "Margaret O'Brien (1937)", "Mario Van Peebles (1957)", "Andrea Martin (1947)", "Captain Beefheart (1941)", "Chad Lowe (1968)", "Lisa Lisa (1967)", "Drew Brees (1979)"],
        "7-4": ["Calvin Coolidge (1872)", "Neil Simon (1927)", "George Steinbrenner (1930)", "Rube Goldberg (1883)", "Gina Lollobrigida (1927)", "Bill Withers (1938)", "Mike \"The Situation\" Sorrentino (1982)", "Post Malone (1995)", "Sid Krofft (1929)", "Geraldo Rivera (1943)"]
        // ... add more data as needed
    };
    
    const key = `${month}-${day}`;
    return famousPeopleData[key] || [
        "Sample Celebrity 1", "Sample Celebrity 2", "Sample Celebrity 3", 
        "Sample Celebrity 4", "Sample Celebrity 5", "Sample Celebrity 6",
        "Sample Celebrity 7", "Sample Celebrity 8", "Sample Celebrity 9", "Sample Celebrity 10"
    ];
}

function getHistoricalEventsLocal(month, day) {
    const eventsData = {
        "1-1": [
            "Roman Empire begins using Anno Domini calendar system (45 BC)",
            "Haiti declares independence from France (1804)",
            "Ellis Island opens as immigration station (1892)"
        ],
        "7-4": [
            "United States Declaration of Independence signed (1776)",
            "Lewis and Clark expedition begins (1804)",
            "Statue of Liberty presented to United States by France (1884)"
        ]
        // ... add more data as needed
    };
    
    const key = `${month}-${day}`;
    return eventsData[key] || [
        "Sample historical event 1", "Sample historical event 2", "Sample historical event 3"
    ];
}

function getAcademyAwardsLocal(year) {
    const awardsData = {
        2023: { bestPicture: "Everything Everywhere All at Once", bestActor: "Brendan Fraser", bestActress: "Michelle Yeoh" },
        2022: { bestPicture: "CODA", bestActor: "Will Smith", bestActress: "Jessica Chastain" },
        2021: { bestPicture: "Nomadland", bestActor: "Anthony Hopkins", bestActress: "Frances McDormand" }
        // ... add more years as needed
    };
    
    return awardsData[year] || {
        bestPicture: "Information not available",
        bestActor: "Information not available", 
        bestActress: "Information not available"
    };
}

// 🌟 Updated Main Functions that use APIs
async function getFamousPeople(month, day) {
    return await getFamousPeopleFromAPI(month, day);
}

async function getHistoricalEvents(month, day) {
    return await getHistoricalEventsFromAPI(month, day);
}

async function getAcademyAwards(year) {
    return await getAcademyAwardsFromAPI(year);
}

// All zodiac functions remain unchanged (Western, Chinese, Vietnamese, etc.)
// [Include all your existing zodiac functions here - they don't need API calls]

// 🌟 Updated displayResults function to handle async API calls
async function displayResults(birthDate, calculateDate, age) {
    // Show age calculation (unchanged)
    document.getElementById('ageResult').innerHTML = `
        <div><strong>${age.years} years, ${age.months} months, ${age.days} days</strong></div>
        <div>Total: ${age.totalDays.toLocaleString()} days</div>
        <div>Total: ${age.totalHours.toLocaleString()} hours</div>
        <div>Total: ${age.totalMinutes.toLocaleString()} minutes</div>
    `;
    
    // Show zodiac signs (unchanged - no API needed)
    document.getElementById('westernZodiac').textContent = getWesternZodiac(birthDate);
    document.getElementById('chineseZodiac').textContent = getChineseZodiac(birthDate.getFullYear());
    // ... other zodiac signs
    
    // 🌟 Show famous people with API
    try {
        const famousPeople = await getFamousPeople(birthDate.getMonth() + 1, birthDate.getDate());
        document.getElementById('famousPeople').innerHTML = '<ul>' + 
            famousPeople.map(person => `<li>${person}</li>`).join('') + '</ul>';
    } catch (error) {
        document.getElementById('famousPeople').innerHTML = '<div class="error">Unable to load famous people data</div>';
    }
    
    // 🌟 Show historical events with API
    try {
        const events = await getHistoricalEvents(birthDate.getMonth() + 1, birthDate.getDate());
        document.getElementById('historicalEvents').innerHTML = '<ul>' + 
            events.map(event => `<li>${event}</li>`).join('') + '</ul>';
    } catch (error) {
        document.getElementById('historicalEvents').innerHTML = '<div class="error">Unable to load historical events data</div>';
    }
    
    // 🌟 Show Academy Awards with API
    try {
        const awards = await getAcademyAwards(birthDate.getFullYear());
        document.getElementById('academyAwards').innerHTML = '<ul>' + 
            `<li><strong>Best Picture:</strong> ${awards.bestPicture}</li>` +
            `<li><strong>Best Actor:</strong> ${awards.bestActor}</li>` +
            `<li><strong>Best Actress:</strong> ${awards.bestActress}</li>` + '</ul>';
    } catch (error) {
        document.getElementById('academyAwards').innerHTML = '<div class="error">Unable to load Academy Awards data</div>';
    }
    
    // Show results section
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Main form handler (updated to handle async)
document.getElementById('ageForm').addEventListener('submit', async function(e) {
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
    
    // Display results (now with API calls)
    await displayResults(birthDate, calculateDate, age);
});

// Keep all your existing helper functions (showError, formatDateInput, etc.)
function showError(message) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `<div class="error">${message}</div>`;
    resultsSection.style.display = 'block';
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