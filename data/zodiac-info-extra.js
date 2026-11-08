// Zodiac write-ups that were missing from zodiac-info.js.
// Loaded after zodiac-info.js; merges into ZODIAC_INFO. For entertainment only.

(function () {
    if (typeof ZODIAC_INFO === 'undefined') return;

    Object.assign(ZODIAC_INFO.chinese, {
        "Horse": {
            years: "1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026",
            element: "Fire",
            description: "The Horse stands for freedom, energy and warmth. People born in Horse years are lively, sociable and happiest when they are on the move, chasing new experiences and bringing others along for the ride.",
            traits: {
                positive: ["Energetic", "Independent", "Warm-hearted", "Witty", "Adventurous", "Hardworking"],
                negative: ["Impatient", "Restless", "Stubborn", "Easily bored"]
            },
            compatibility: ["Tiger", "Dog", "Goat"],
            lucky: { numbers: [2, 3, 7], colors: ["Yellow", "Green"], flowers: ["Calla lily", "Jasmine"] }
        },
        "Goat": {
            years: "1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027",
            element: "Earth",
            description: "The Goat (also called the Sheep or Ram) represents gentleness, creativity and peace. Goat people are kind, artistic and thoughtful, and they thrive in calm, beautiful surroundings with people they trust.",
            traits: {
                positive: ["Gentle", "Creative", "Compassionate", "Calm", "Thoughtful"],
                negative: ["Indecisive", "Shy", "Pessimistic", "Overly sensitive"]
            },
            compatibility: ["Rabbit", "Pig", "Horse"],
            lucky: { numbers: [2, 7], colors: ["Brown", "Red", "Purple"], flowers: ["Carnation", "Primrose"] }
        },
        "Monkey": {
            years: "1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028",
            element: "Metal",
            description: "The Monkey is the zodiac's clever trickster. Monkey people are curious, inventive and full of fun, with a talent for solving problems and a sense of humour that lights up a room.",
            traits: {
                positive: ["Clever", "Curious", "Inventive", "Playful", "Sociable", "Versatile"],
                negative: ["Mischievous", "Restless", "Vain", "Impatient"]
            },
            compatibility: ["Rat", "Dragon", "Snake"],
            lucky: { numbers: [4, 9], colors: ["White", "Blue", "Gold"], flowers: ["Chrysanthemum", "Crape myrtle"] }
        },
        "Rooster": {
            years: "1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029",
            element: "Metal",
            description: "The Rooster represents confidence, punctuality and honesty. Rooster people are observant, hardworking and proud of a job well done, and they rarely hold back from saying what they think.",
            traits: {
                positive: ["Observant", "Hardworking", "Confident", "Honest", "Organized", "Brave"],
                negative: ["Blunt", "Boastful", "Critical", "Perfectionist"]
            },
            compatibility: ["Ox", "Snake", "Dragon"],
            lucky: { numbers: [5, 7, 8], colors: ["Gold", "Brown", "Yellow"], flowers: ["Gladiola", "Cockscomb"] }
        },
        "Dog": {
            years: "1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030",
            element: "Earth",
            description: "The Dog stands for loyalty, honesty and a strong sense of fairness. Dog people are the friends everyone wants: dependable, protective and always ready to stand up for what is right.",
            traits: {
                positive: ["Loyal", "Honest", "Responsible", "Kind", "Protective", "Fair"],
                negative: ["Anxious", "Stubborn", "Judgemental", "Pessimistic"]
            },
            compatibility: ["Tiger", "Horse", "Rabbit"],
            lucky: { numbers: [3, 4, 9], colors: ["Red", "Green", "Purple"], flowers: ["Rose", "Cymbidium orchid"] }
        },
        "Pig": {
            years: "1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031",
            element: "Water",
            description: "The Pig, last of the twelve animals, represents generosity, comfort and good fortune. Pig people are warm, easy-going and big-hearted, and they know how to enjoy the good things in life.",
            traits: {
                positive: ["Generous", "Compassionate", "Easy-going", "Sincere", "Diligent"],
                negative: ["Naive", "Gullible", "Indulgent", "Lazy at times"]
            },
            compatibility: ["Rabbit", "Goat", "Tiger"],
            lucky: { numbers: [2, 5, 8], colors: ["Yellow", "Gray", "Brown", "Gold"], flowers: ["Hydrangea", "Daisy"] }
        }
    });

    Object.assign(ZODIAC_INFO.vedic, {
        "Tula": {
            symbol: "♎", element: "Air", dates: "October 16 - November 14", planet: "Venus (Shukra)", deity: "Lakshmi",
            description: "Tula (Libra) represents balance, justice and harmony. Tula natives are charming, fair-minded and artistic, and they work hard to keep peace in their relationships.",
            traits: { positive: ["Diplomatic", "Fair", "Charming", "Artistic", "Sociable"], negative: ["Indecisive", "People-pleasing", "Self-indulgent"] },
            compatibility: ["Mithuna (Gemini)", "Kumbha (Aquarius)", "Simha (Leo)"],
            career: "Excel in law, design, the arts, diplomacy, counselling and any role that needs a sense of fairness and style.",
            health: "Should look after the kidneys and lower back, and keep a balanced routine.",
            mantra: "Om Shukraya Namaha", gemstone: "Diamond (Heera)", color: "White, Light Blue", direction: "West", bodyPart: "Kidneys, Lower Back"
        },
        "Vrishchika": {
            symbol: "♏", element: "Water", dates: "November 15 - December 14", planet: "Mars (Mangal)", deity: "Kartikeya",
            description: "Vrishchika (Scorpio) represents depth, transformation and determination. These natives are intense, loyal and perceptive, with a strong will and great inner strength.",
            traits: { positive: ["Determined", "Loyal", "Perceptive", "Passionate", "Resourceful"], negative: ["Secretive", "Jealous", "Vengeful", "Intense"] },
            compatibility: ["Karka (Cancer)", "Meena (Pisces)", "Kanya (Virgo)"],
            career: "Excel in research, medicine, investigation, psychology, finance and any work that rewards digging deep.",
            health: "Should take care of the reproductive and excretory systems and find healthy outlets for stress.",
            mantra: "Om Angarakaya Namaha", gemstone: "Red Coral (Moonga)", color: "Red, Maroon", direction: "North", bodyPart: "Reproductive Organs"
        },
        "Dhanus": {
            symbol: "♐", element: "Fire", dates: "December 15 - January 13", planet: "Jupiter (Guru)", deity: "Vishnu",
            description: "Dhanus (Sagittarius) represents wisdom, faith and adventure. Dhanus natives are optimistic, honest and philosophical, always aiming their arrow at a higher goal.",
            traits: { positive: ["Optimistic", "Honest", "Wise", "Generous", "Adventurous"], negative: ["Tactless", "Restless", "Overconfident"] },
            compatibility: ["Mesha (Aries)", "Simha (Leo)", "Kumbha (Aquarius)"],
            career: "Excel in teaching, law, travel, publishing, philosophy and spiritual work.",
            health: "Should look after the hips, thighs and liver, and avoid overindulgence.",
            mantra: "Om Gurave Namaha", gemstone: "Yellow Sapphire (Pukhraj)", color: "Yellow, Orange", direction: "East", bodyPart: "Hips, Thighs"
        },
        "Makara": {
            symbol: "♑", element: "Earth", dates: "January 14 - February 12", planet: "Saturn (Shani)", deity: "Shani",
            description: "Makara (Capricorn) represents discipline, patience and ambition. Makara natives are practical and dependable, and they climb steadily towards long-term goals.",
            traits: { positive: ["Disciplined", "Patient", "Responsible", "Practical", "Ambitious"], negative: ["Rigid", "Pessimistic", "Workaholic"] },
            compatibility: ["Vrishabha (Taurus)", "Kanya (Virgo)", "Meena (Pisces)"],
            career: "Excel in management, government, engineering, finance and any field built on structure and persistence.",
            health: "Should care for the knees, joints and bones, and make time to rest.",
            mantra: "Om Shanaischaraya Namaha", gemstone: "Blue Sapphire (Neelam)", color: "Black, Dark Blue", direction: "South", bodyPart: "Knees, Bones"
        },
        "Kumbha": {
            symbol: "♒", element: "Air", dates: "February 13 - March 13", planet: "Saturn (Shani)", deity: "Varuna",
            description: "Kumbha (Aquarius) represents humanity, originality and service. Kumbha natives are independent thinkers with big ideas about making the world better.",
            traits: { positive: ["Humanitarian", "Original", "Independent", "Intellectual", "Friendly"], negative: ["Detached", "Unpredictable", "Stubborn"] },
            compatibility: ["Mithuna (Gemini)", "Tula (Libra)", "Dhanus (Sagittarius)"],
            career: "Excel in science, technology, social causes, invention and community work.",
            health: "Should look after circulation, the calves and ankles.",
            mantra: "Om Shanaischaraya Namaha", gemstone: "Blue Sapphire (Neelam)", color: "Electric Blue, Gray", direction: "West", bodyPart: "Calves, Ankles, Circulation"
        },
        "Meena": {
            symbol: "♓", element: "Water", dates: "March 14 - April 13", planet: "Jupiter (Guru)", deity: "Vishnu",
            description: "Meena (Pisces) represents compassion, imagination and spirituality. Meena natives are gentle, intuitive dreamers with a deep feeling for others.",
            traits: { positive: ["Compassionate", "Imaginative", "Intuitive", "Gentle", "Spiritual"], negative: ["Escapist", "Over-trusting", "Indecisive"] },
            compatibility: ["Karka (Cancer)", "Vrishchika (Scorpio)", "Makara (Capricorn)"],
            career: "Excel in the arts, music, healing, charity work and spiritual or caring professions.",
            health: "Should take care of the feet and the immune system, and get plenty of rest.",
            mantra: "Om Gurave Namaha", gemstone: "Yellow Sapphire (Pukhraj)", color: "Sea Green, Yellow", direction: "North", bodyPart: "Feet"
        }
    });

    // Directions and colours follow the four-direction cycle: East/Red, North/White, West/Blue, South/Yellow.
    const mayan = (number, symbol, element, direction, color, meaningText, description, positive, negative, compatibility, career, deity, animal) => ({
        symbol, element, dates: `${meaningText} - Day ${number} of 20-day cycle`, direction, color, description,
        traits: { positive, negative }, compatibility, career, mayaMeaning: meaningText, deity, animal
    });

    Object.assign(ZODIAC_INFO.mayan, {
        "Manik": mayan(7, "🦌", "Earth", "West", "Blue", "Deer",
            "Manik represents the deer, the hand and healing. People born on this day are helpful, generous and skilled with their hands, often drawn to caring for others.",
            ["Helpful", "Generous", "Skilled", "Healing", "Graceful"], ["Self-sacrificing", "Restless"],
            ["Lamat (Star)", "Eb (Road)", "Caban (Earth)"], "Excel in healing, crafts, teaching and community service.", "God of the Hunt", "Deer"),
        "Lamat": mayan(8, "⭐", "Fire", "South", "Yellow", "Star",
            "Lamat represents the star Venus, harmony and abundance. People born on this day are cheerful, charming and bring beauty and plenty wherever they go.",
            ["Cheerful", "Charming", "Abundant", "Harmonious", "Artistic"], ["Excessive", "Scattered"],
            ["Manik (Deer)", "Kan (Seed)", "Ben (Reed)"], "Excel in the arts, entertainment, hospitality and finance.", "Venus (Morning Star)", "Rabbit"),
        "Muluc": mayan(9, "💧", "Water", "East", "Red", "Water",
            "Muluc represents water, the moon and emotion. People born on this day are feeling, intuitive and purifying, with a strong sense of flow in life.",
            ["Emotional", "Intuitive", "Nurturing", "Cleansing", "Expressive"], ["Moody", "Over-sensitive"],
            ["Imix (Crocodile)", "Cimi (Death)", "Ix (Jaguar)"], "Excel in counselling, healing, the arts and work near water.", "Rain God", "Jade fish"),
        "Oc": mayan(10, "🐕", "Earth", "North", "White", "Dog",
            "Oc represents the dog, loyalty and love. People born on this day are faithful companions who guide others and fiercely protect those they love.",
            ["Loyal", "Loving", "Protective", "Sociable", "Guiding"], ["Jealous", "Dependent"],
            ["Cimi (Death)", "Chuen (Monkey)", "Men (Eagle)"], "Excel in caring roles, teamwork, protection and guidance.", "Guide of the Underworld", "Dog"),
        "Chuen": mayan(11, "🐒", "Air", "West", "Blue", "Monkey",
            "Chuen represents the monkey, play and creativity. People born on this day are witty, artistic and inventive, weaving fun into everything they do.",
            ["Playful", "Creative", "Witty", "Curious", "Artistic"], ["Restless", "Unreliable"],
            ["Oc (Dog)", "Eb (Road)", "Ahau (Lord)"], "Excel in the arts, entertainment, crafts and invention.", "Monkey Scribes", "Monkey"),
        "Eb": mayan(12, "🛤️", "Earth", "South", "Yellow", "Road",
            "Eb represents the road, the human journey and service. People born on this day are hardworking, community-minded and walk a long, meaningful path.",
            ["Hardworking", "Social", "Kind", "Practical", "Wise"], ["Burdened", "Worried"],
            ["Manik (Deer)", "Chuen (Monkey)", "Kan (Seed)"], "Excel in community work, travel, agriculture and leadership.", "God of the Road", "Human"),
        "Ben": mayan(13, "🎋", "Fire", "East", "Red", "Reed",
            "Ben represents the reed, home and growth. People born on this day are strong leaders who stand tall, protect their family and help others grow.",
            ["Protective", "Leading", "Resilient", "Optimistic", "Responsible"], ["Controlling", "Proud"],
            ["Imix (Crocodile)", "Lamat (Star)", "Men (Eagle)"], "Excel in leadership, teaching, homemaking and spiritual guidance.", "Corn God", "Armadillo"),
        "Ix": mayan(14, "🐆", "Earth", "North", "White", "Jaguar",
            "Ix represents the jaguar, magic and the earth's spirit. People born on this day are mysterious, intuitive and quietly powerful, with a deep connection to nature.",
            ["Intuitive", "Powerful", "Mysterious", "Independent", "Wise"], ["Secretive", "Aloof"],
            ["Chicchan (Serpent)", "Muluc (Water)", "Cib (Vulture)"], "Excel in healing, nature, mysticism and leadership.", "Jaguar God", "Jaguar"),
        "Men": mayan(15, "🦅", "Air", "West", "Blue", "Eagle",
            "Men represents the eagle, vision and ambition. People born on this day see the big picture, aim high and inspire others with their ideas.",
            ["Visionary", "Ambitious", "Independent", "Inspiring", "Bold"], ["Impatient", "Detached"],
            ["Ik (Wind)", "Oc (Dog)", "Ben (Reed)"], "Excel in planning, technology, aviation and creative leadership.", "Moon Goddess", "Eagle"),
        "Cib": mayan(16, "🦉", "Earth", "South", "Yellow", "Vulture",
            "Cib represents the vulture, wisdom and the ancestors. People born on this day are thoughtful, patient and full of old-soul wisdom.",
            ["Wise", "Patient", "Thoughtful", "Forgiving", "Spiritual"], ["Guilt-prone", "Withdrawn"],
            ["Ix (Jaguar)", "Caban (Earth)", "Ahau (Lord)"], "Excel in teaching, history, counselling and spiritual work.", "Ancestral Spirits", "Owl"),
        "Caban": mayan(17, "🌍", "Earth", "East", "Red", "Earth",
            "Caban represents the earth, movement and thought. People born on this day are intelligent, grounded and in tune with the rhythms of nature.",
            ["Intelligent", "Grounded", "Logical", "Harmonious", "Determined"], ["Inflexible", "Overthinking"],
            ["Manik (Deer)", "Cib (Vulture)", "Etznab (Flint)"], "Excel in science, agriculture, ecology and analysis.", "Earth Goddess", "Bee"),
        "Etznab": mayan(18, "🔪", "Air", "North", "White", "Flint",
            "Etznab represents flint, the mirror and truth. People born on this day are honest, sharp-minded and brave enough to cut through to the heart of things.",
            ["Honest", "Brave", "Decisive", "Clear-thinking", "Healing"], ["Harsh", "Impulsive"],
            ["Ik (Wind)", "Caban (Earth)", "Cauac (Storm)"], "Excel in medicine, surgery, law and any field that needs clear judgement.", "God of Sacrifice", "Woodpecker"),
        "Cauac": mayan(19, "⛈️", "Water", "West", "Blue", "Storm",
            "Cauac represents the storm, renewal and healing. People born on this day bring change and fresh energy, and they help others through life's storms.",
            ["Renewing", "Healing", "Energetic", "Caring", "Family-minded"], ["Volatile", "Overprotective"],
            ["Imix (Crocodile)", "Chicchan (Serpent)", "Etznab (Flint)"], "Excel in healing, family businesses, counselling and the arts.", "Storm God", "Turtle"),
        "Ahau": mayan(20, "☀️", "Fire", "South", "Yellow", "Lord",
            "Ahau represents the sun, the lord and enlightenment. People born on this day are warm, noble and radiant, and they often take on the role of leader or teacher.",
            ["Radiant", "Noble", "Generous", "Wise", "Creative"], ["Proud", "Idealistic"],
            ["Ik (Wind)", "Chuen (Monkey)", "Cib (Vulture)"], "Excel in leadership, the arts, teaching and spiritual guidance.", "Sun God", "Eagle")
    });
})();
