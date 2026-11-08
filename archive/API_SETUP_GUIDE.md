# API Setup Guide for Age Calculator

Your age calculator now has API integration capabilities! Here's how to set up and customize the API connections.

## 🌟 Current API Integration Points

### 1. **Famous People** (Lines 102-135 in script-with-api.js)
- **Current**: Wikipedia API with CORS proxy
- **Location**: `getFamousPeopleFromAPI()` function
- **Status**: Ready to use (no API key required)

### 2. **Historical Events** (Lines 155-182 in script-with-api.js)
- **Current**: Wikipedia API with CORS proxy  
- **Location**: `getHistoricalEventsFromAPI()` function
- **Status**: Ready to use (no API key required)

### 3. **Academy Awards** (Lines 201-220 in script-with-api.js)
- **Current**: Placeholder for OMDB API
- **Location**: `getAcademyAwardsFromAPI()` function
- **Status**: Needs API key setup

## 🚀 Quick Start (No Setup Required)

The Wikipedia integration is already working! Your app will:
1. Try to fetch real Wikipedia data
2. Fall back to local data if the API fails
3. Show loading indicators while fetching

## 🔧 API Configuration (script-with-api.js lines 4-18)

```javascript
const API_CONFIG = {
    wikipedia: {
        baseUrl: 'https://en.wikipedia.org/api/rest_v1',
        cors_proxy: 'https://api.allorigins.win/raw?url='
    },
    celebrities: {
        baseUrl: 'https://api.api-ninjas.com/v1/celebrity',
        headers: {
            'X-Api-Key': 'YOUR_API_KEY_HERE' // Replace this
        }
    }
};
```

## 📚 API Options & Setup Instructions

### Option 1: Wikipedia API (Current - No Setup Needed) ✅
- **Cost**: Free
- **Setup**: None required
- **Data**: Basic famous people and events
- **Reliability**: Good, but limited parsing

### Option 2: OMDB API (For Movies/Academy Awards)
1. Sign up at: https://www.omdbapi.com/
2. Get your free API key
3. Replace `YOUR_OMDB_API_KEY` in line 207 of script-with-api.js
4. Uncomment line 210: `const data = await fetchWithRetry(apiUrl);`

### Option 3: API Ninjas (For Enhanced Celebrity Data)
1. Sign up at: https://api.api-ninjas.com/
2. Get your API key
3. Replace `YOUR_API_KEY_HERE` in line 15 of script-with-api.js
4. Modify the celebrity fetching function to use this API

### Option 4: Other APIs You Can Add

#### **For Famous People:**
- **Famous Birthdays API**: https://famous-birthdays.p.rapidapi.com/
- **Celebrity API**: Various options on RapidAPI
- **Custom Database**: Build your own comprehensive database

#### **For Historical Events:**
- **On This Day API**: https://history.muffinlabs.com/
- **Today in History API**: Various options available
- **Custom Historical Database**: Curated historical events

#### **For Academy Awards:**
- **The Movie Database (TMDB)**: https://www.themoviedb.org/documentation/api
- **IMDb API**: Through RapidAPI or other providers

## 🛠️ How to Add New APIs

### Step 1: Add API Configuration
In `script-with-api.js`, add to the `API_CONFIG` object:
```javascript
const API_CONFIG = {
    // existing configs...
    yourNewAPI: {
        baseUrl: 'https://your-api-endpoint.com',
        headers: {
            'Authorization': 'Bearer YOUR_TOKEN',
            'X-API-Key': 'YOUR_KEY'
        }
    }
};
```

### Step 2: Create API Function
Add a new function:
```javascript
async function getDataFromNewAPI(parameters) {
    try {
        const apiUrl = `${API_CONFIG.yourNewAPI.baseUrl}/endpoint`;
        const data = await fetchWithRetry(apiUrl, {
            headers: API_CONFIG.yourNewAPI.headers
        });
        return processApiData(data);
    } catch (error) {
        console.error('New API failed:', error);
        return fallbackData();
    }
}
```

### Step 3: Update Display Function
Modify the `displayResults()` function to use your new API.

## 🔄 Switching Back to Local Data

If you prefer to use only local data (no API calls), simply change your HTML:

```html
<!-- Change this line in index.html -->
<script src="script.js"></script>
<!-- Instead of -->
<script src="script-with-api.js"></script>
```

## 🧪 Testing Your APIs

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Use the age calculator
4. Watch for API calls and any error messages
5. Check the Network tab to see API requests

## 📊 API Rate Limits & Best Practices

### Current Setup:
- **Wikipedia**: No rate limits for basic usage
- **CORS Proxy**: Fair usage policy
- **Error Handling**: Automatic fallback to local data

### Best Practices:
1. **Implement Caching**: Store API responses temporarily
2. **Rate Limiting**: Add delays between requests if needed
3. **Error Handling**: Always have fallback data
4. **User Feedback**: Show loading states and error messages

## 🎯 Recommended Next Steps

1. **Start with current setup** - It works immediately with Wikipedia
2. **Add OMDB API key** for enhanced Academy Awards data
3. **Consider paid APIs** for more comprehensive celebrity data
4. **Add caching mechanism** to improve performance
5. **Expand historical events** with dedicated history APIs

## 🚨 Common Issues & Solutions

### CORS Errors:
- **Problem**: "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
- **Solution**: Use the CORS proxy (already implemented) or set up your own server

### API Key Not Working:
- **Problem**: 401 Unauthorized or 403 Forbidden
- **Solution**: Verify your API key is correct and has proper permissions

### Slow Loading:
- **Problem**: APIs take too long to respond
- **Solution**: Implement caching and reduce timeout values

## 📝 File Locations Summary

- **Main Script**: `script-with-api.js` (API-enabled version)
- **Original Script**: `script.js` (local data only)
- **HTML**: `index.html` (currently using API version)
- **Configuration**: Lines 4-18 in `script-with-api.js`

Your age calculator now has the foundation for real-time Wikipedia data and can be easily extended with additional APIs as needed!