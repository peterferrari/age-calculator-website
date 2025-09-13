// Zodiac Signs Information Database
// Comprehensive data for all zodiac systems with descriptions, traits, and information

const ZODIAC_INFO = {
    // Western Zodiac Signs
    western: {
        "Aries": {
            symbol: "♈",
            element: "Fire",
            dates: "March 21 - April 19",
            planet: "Mars",
            description: "Aries is the first sign of the zodiac, symbolizing new beginnings and leadership. Known for their pioneering spirit, Aries individuals are natural-born leaders who aren't afraid to forge ahead into uncharted territory.",
            traits: {
                positive: ["Courageous", "Determined", "Confident", "Enthusiastic", "Optimistic", "Honest", "Passionate"],
                negative: ["Impatient", "Moody", "Short-tempered", "Impulsive", "Aggressive"]
            },
            compatibility: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
            career: "Natural leaders who excel in competitive environments. Great entrepreneurs, athletes, military leaders, and emergency responders.",
            love: "Passionate and direct in love. They pursue what they want with determination and appreciate partners who can keep up with their energy.",
            health: "Generally robust health but prone to headaches and injuries due to their active lifestyle. Should focus on stress management."
        },
        "Taurus": {
            symbol: "♉",
            element: "Earth",
            dates: "April 20 - May 20",
            planet: "Venus",
            description: "Taurus is an earth sign represented by the bull, symbolizing strength, determination, and sensuality. Taureans are known for their practical approach to life and their appreciation for beauty and comfort.",
            traits: {
                positive: ["Reliable", "Patient", "Practical", "Devoted", "Responsible", "Stable"],
                negative: ["Stubborn", "Possessive", "Uncompromising", "Jealous", "Materialistic"]
            },
            compatibility: ["Virgo", "Capricorn", "Cancer", "Pisces"],
            career: "Excel in careers requiring patience and attention to detail. Great bankers, artists, chefs, farmers, and real estate professionals.",
            love: "Loyal and devoted partners who value stability in relationships. They express love through physical affection and material gestures.",
            health: "Generally strong constitution but prone to throat and neck issues. Should watch their diet as they love good food."
        },
        "Gemini": {
            symbol: "♊",
            element: "Air",
            dates: "May 21 - June 20",
            planet: "Mercury",
            description: "Gemini is represented by the twins, symbolizing duality and versatility. Known for their quick wit, adaptability, and excellent communication skills, Geminis are the social butterflies of the zodiac.",
            traits: {
                positive: ["Adaptable", "Outgoing", "Intelligent", "Curious", "Witty", "Charming"],
                negative: ["Inconsistent", "Superficial", "Indecisive", "Anxious", "Unreliable"]
            },
            compatibility: ["Libra", "Aquarius", "Aries", "Leo"],
            career: "Natural communicators who thrive in dynamic environments. Excel as journalists, teachers, salespeople, and social media managers.",
            love: "Need mental stimulation in relationships. They're charming and flirtatious but can struggle with commitment until they find the right person.",
            health: "Prone to nervous system issues and respiratory problems. Should focus on relaxation techniques and regular exercise."
        },
        "Cancer": {
            symbol: "♋",
            element: "Water",
            dates: "June 21 - July 22",
            planet: "Moon",
            description: "Cancer is symbolized by the crab, representing protection, intuition, and emotional depth. Cancers are known for their nurturing nature and strong connection to home and family.",
            traits: {
                positive: ["Tenacious", "Highly imaginative", "Loyal", "Emotional", "Sympathetic", "Persuasive"],
                negative: ["Moody", "Pessimistic", "Suspicious", "Manipulative", "Insecure"]
            },
            compatibility: ["Scorpio", "Pisces", "Taurus", "Virgo"],
            career: "Natural caregivers who excel in nurturing professions. Great nurses, teachers, social workers, and hospitality managers.",
            love: "Deeply emotional and nurturing in relationships. They seek security and long-term commitment, often making devoted partners and parents.",
            health: "Prone to digestive issues and emotional eating. Should focus on emotional well-being and maintaining a balanced diet."
        },
        "Leo": {
            symbol: "♌",
            element: "Fire",
            dates: "July 23 - August 22",
            planet: "Sun",
            description: "Leo is represented by the lion, symbolizing courage, leadership, and dramatic flair. Leos are natural performers who love to be in the spotlight and inspire others with their charisma.",
            traits: {
                positive: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful", "Humorous"],
                negative: ["Arrogant", "Stubborn", "Self-centered", "Lazy", "Inflexible"]
            },
            compatibility: ["Aries", "Sagittarius", "Gemini", "Libra"],
            career: "Natural entertainers and leaders. Excel in creative fields, management, politics, and any career that puts them in the spotlight.",
            love: "Romantic and generous lovers who enjoy grand gestures. They need appreciation and admiration from their partners to feel fulfilled.",
            health: "Generally strong but prone to heart and back problems. Should maintain regular exercise and manage stress levels."
        },
        "Virgo": {
            symbol: "♍",
            element: "Earth",
            dates: "August 23 - September 22",
            planet: "Mercury",
            description: "Virgo is represented by the maiden, symbolizing purity, service, and attention to detail. Virgos are known for their analytical minds and desire to help others through practical means.",
            traits: {
                positive: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical", "Reliable"],
                negative: ["Shyness", "Worry", "Overly critical", "Perfectionist", "Conservative"]
            },
            compatibility: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
            career: "Excel in detail-oriented professions. Great analysts, healthcare workers, editors, accountants, and researchers.",
            love: "Practical and devoted in relationships. They show love through acts of service and appreciate partners who value their caring nature.",
            health: "Prone to digestive issues and anxiety. Should focus on stress management and maintaining a healthy routine."
        },
        "Libra": {
            symbol: "♎",
            element: "Air",
            dates: "September 23 - October 22",
            planet: "Venus",
            description: "Libra is represented by the scales, symbolizing balance, harmony, and justice. Libras are natural diplomats who seek fairness and beauty in all aspects of life.",
            traits: {
                positive: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social", "Idealistic"],
                negative: ["Indecisive", "Avoids confrontations", "Self-pity", "Unreliable", "Vain"]
            },
            compatibility: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
            career: "Natural mediators and aesthetes. Excel in law, diplomacy, art, fashion, and human resources.",
            love: "Romantic idealists who value partnership above all. They seek harmony and balance in relationships and are generous with affection.",
            health: "Prone to kidney and lower back problems. Should maintain balance in all aspects of life and avoid overindulgence."
        },
        "Scorpio": {
            symbol: "♏",
            element: "Water",
            dates: "October 23 - November 21",
            planet: "Pluto/Mars",
            description: "Scorpio is represented by the scorpion, symbolizing transformation, intensity, and hidden depths. Scorpios are known for their passionate nature and ability to see beyond the surface.",
            traits: {
                positive: ["Resourceful", "Brave", "Passionate", "Stubborn", "A true friend", "Determined"],
                negative: ["Distrusting", "Jealous", "Secretive", "Violent", "Vindictive"]
            },
            compatibility: ["Cancer", "Pisces", "Virgo", "Capricorn"],
            career: "Excel in investigative and transformative fields. Great detectives, psychologists, surgeons, and researchers.",
            love: "Intensely passionate and loyal in love. They seek deep, meaningful connections and can be both protective and possessive of their partners.",
            health: "Prone to reproductive and urinary system issues. Should focus on emotional healing and maintaining healthy relationships."
        },
        "Sagittarius": {
            symbol: "♐",
            element: "Fire",
            dates: "November 22 - December 21",
            planet: "Jupiter",
            description: "Sagittarius is represented by the archer, symbolizing adventure, philosophy, and the pursuit of truth. Sagittarians are known for their love of freedom and exploration.",
            traits: {
                positive: ["Generous", "Idealistic", "Great sense of humor", "Philosophical", "Adventurous"],
                negative: ["Promises more than can deliver", "Impatient", "Tactless", "Restless"]
            },
            compatibility: ["Aries", "Leo", "Libra", "Aquarius"],
            career: "Natural teachers and explorers. Excel in education, travel, publishing, and international business.",
            love: "Need freedom and adventure in relationships. They're optimistic and fun-loving partners but may struggle with commitment if they feel restricted.",
            health: "Generally robust but prone to hip and thigh problems. Should maintain an active lifestyle and watch for overindulgence."
        },
        "Capricorn": {
            symbol: "♑",
            element: "Earth",
            dates: "December 22 - January 19",
            planet: "Saturn",
            description: "Capricorn is represented by the sea goat, symbolizing ambition, discipline, and the ability to navigate both earthly and emotional realms. Capricorns are known for their determination and practical approach to achieving goals.",
            traits: {
                positive: ["Responsible", "Disciplined", "Self-control", "Good managers", "Ambitious"],
                negative: ["Know-it-all", "Unforgiving", "Condescending", "Pessimistic", "Stubborn"]
            },
            compatibility: ["Taurus", "Virgo", "Scorpio", "Pisces"],
            career: "Natural leaders and managers. Excel in business, finance, government, and any field requiring long-term planning.",
            love: "Traditional and committed in relationships. They may seem reserved but are deeply loyal and will work hard to build a stable future with their partner.",
            health: "Prone to bone, joint, and skin problems. Should maintain regular exercise and manage work-related stress."
        },
        "Aquarius": {
            symbol: "♒",
            element: "Air",
            dates: "January 20 - February 18",
            planet: "Uranus",
            description: "Aquarius is represented by the water bearer, symbolizing innovation, humanitarian ideals, and the sharing of knowledge. Aquarians are known for their progressive thinking and desire to make the world a better place.",
            traits: {
                positive: ["Progressive", "Original", "Independent", "Humanitarian", "Intellectual"],
                negative: ["Runs from emotional expression", "Temperamental", "Uncompromising", "Aloof"]
            },
            compatibility: ["Gemini", "Libra", "Aries", "Sagittarius"],
            career: "Natural innovators and reformers. Excel in technology, science, social work, and humanitarian causes.",
            love: "Value friendship and intellectual connection in relationships. They need partners who respect their independence and share their ideals.",
            health: "Prone to circulatory and ankle problems. Should maintain social connections and engage in group activities for mental health."
        },
        "Pisces": {
            symbol: "♓",
            element: "Water",
            dates: "February 19 - March 20",
            planet: "Neptune",
            description: "Pisces is represented by two fish, symbolizing intuition, compassion, and the connection between the conscious and unconscious mind. Pisceans are known for their empathy and artistic nature.",
            traits: {
                positive: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise", "Musical"],
                negative: ["Fearful", "Overly trusting", "Sad", "Desire to escape reality", "Victim mentality"]
            },
            compatibility: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
            career: "Natural artists and healers. Excel in creative fields, healthcare, spirituality, and helping professions.",
            love: "Romantic and intuitive in love. They're generous with their emotions and seek deep, spiritual connections with their partners.",
            health: "Prone to feet problems and immune system issues. Should focus on spiritual practices and avoid escapist behaviors."
        }
    },

    // Chinese Zodiac Information
    chinese: {
        "Rat": {
            years: "1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020",
            element: "Water",
            description: "The Rat is the first animal in the Chinese zodiac cycle, symbolizing intelligence, adaptability, and charm. People born in Rat years are known for their quick wit and ability to find opportunities.",
            traits: {
                positive: ["Intelligent", "Adaptable", "Quick-witted", "Charming", "Honest", "Generous"],
                negative: ["Timid", "Unstable", "Stubborn", "Picky", "Lack of persistence"]
            },
            compatibility: ["Dragon", "Monkey", "Ox"],
            lucky: {
                numbers: [2, 3],
                colors: ["Blue", "Gold", "Green"],
                flowers: ["Lily", "African Violet"]
            }
        },
        "Ox": {
            years: "1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021",
            element: "Earth",
            description: "The Ox represents diligence, strength, and determination. People born in Ox years are known for their reliability, patience, and methodical approach to life.",
            traits: {
                positive: ["Diligent", "Dependable", "Strong", "Determined", "Honest", "Patient"],
                negative: ["Stubborn", "Narrow-minded", "Poor communication", "Inflexible"]
            },
            compatibility: ["Snake", "Rooster", "Rat"],
            lucky: {
                numbers: [1, 4],
                colors: ["White", "Yellow", "Green"],
                flowers: ["Tulip", "Evergreen"]
            }
        },
        "Tiger": {
            years: "1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022",
            element: "Wood",
            description: "The Tiger symbolizes bravery, competitiveness, and unpredictability. People born in Tiger years are known for their courage, ambition, and natural leadership abilities.",
            traits: {
                positive: ["Brave", "Competitive", "Unpredictable", "Confident", "Charming"],
                negative: ["Impulsive", "Irritable", "Overindulgent", "Impatient", "Vain"]
            },
            compatibility: ["Horse", "Dog", "Pig"],
            lucky: {
                numbers: [1, 3, 4],
                colors: ["Blue", "Gray", "White"],
                flowers: ["Anthurium", "Chrysanthemum"]
            }
        },
        "Rabbit": {
            years: "1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023",
            element: "Wood",
            description: "The Rabbit represents elegance, kindness, and responsibility. People born in Rabbit years are known for their gentle nature, artistic talents, and diplomatic skills.",
            traits: {
                positive: ["Quiet", "Elegant", "Kind", "Responsible", "Trustworthy"],
                negative: ["Superficial", "Stubborn", "Melancholy", "Overly discreet"]
            },
            compatibility: ["Sheep", "Pig", "Dog"],
            lucky: {
                numbers: [3, 4, 9],
                colors: ["Red", "Pink", "Purple", "Blue"],
                flowers: ["Snapdragon", "Plantain Lily"]
            }
        },
        "Dragon": {
            years: "1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024",
            element: "Earth",
            description: "The Dragon is the most auspicious sign in Chinese astrology, symbolizing strength, luck, and goodness. Dragons are natural leaders with charismatic personalities.",
            traits: {
                positive: ["Confident", "Intelligent", "Enthusiastic", "Charismatic", "Lucky"],
                negative: ["Aggressive", "Impatient", "Arrogant", "Demanding", "Intolerant"]
            },
            compatibility: ["Rooster", "Rat", "Monkey"],
            lucky: {
                numbers: [1, 6, 7],
                colors: ["Gold", "Silver", "Gray"],
                flowers: ["Dragon Flower", "Bleeding-heart Glory"]
            }
        },
        "Snake": {
            years: "1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025",
            element: "Fire",
            description: "The Snake represents wisdom, intuition, and mystery. People born in Snake years are known for their philosophical nature, grace, and ability to see the bigger picture.",
            traits: {
                positive: ["Enigmatic", "Intelligent", "Wise", "Graceful", "Intuitive"],
                negative: ["Jealous", "Suspicious", "Sly", "Fickle", "Naughty"]
            },
            compatibility: ["Ox", "Rooster", "Monkey"],
            lucky: {
                numbers: [2, 8, 9],
                colors: ["Black", "Red", "Yellow"],
                flowers: ["Orchid", "Cactus"]
            }
        }
        // Additional Chinese zodiac animals would continue here...
    },

    // Vietnamese Zodiac (similar to Chinese but with Cat instead of Rabbit)
    vietnamese: {
        "Cat": {
            years: "1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023",
            element: "Wood",
            description: "In Vietnamese zodiac, the Cat replaces the Rabbit. Cats symbolize peace, tranquility, and intuition. People born in Cat years are known for their sensitivity, artistic nature, and diplomatic abilities.",
            traits: {
                positive: ["Peaceful", "Intuitive", "Artistic", "Diplomatic", "Sensitive"],
                negative: ["Moody", "Detached", "Superficial", "Self-indulgent"]
            },
            compatibility: ["Goat", "Pig", "Dog"],
            lucky: {
                numbers: [3, 4, 9],
                colors: ["Green", "Blue", "Black"],
                flowers: ["Jasmine", "Morning Glory"]
            }
        }
    },

    // Native American Zodiac
    nativeAmerican: {
        "Red Hawk": {
            dates: "March 21 - April 19",
            element: "Fire",
            description: "Red Hawks are natural leaders with strong personalities. They are passionate, determined, and often pioneers in their fields. Like their animal totem, they have keen vision and the ability to see opportunities others miss.",
            traits: {
                positive: ["Leadership", "Passion", "Determination", "Vision", "Courage"],
                negative: ["Impatience", "Aggression", "Stubbornness"]
            },
            totem: "Hawk - represents vision, perspective, and leadership",
            season: "Spring - time of new beginnings"
        },
        "Beaver": {
            dates: "April 20 - May 20",
            element: "Earth",
            description: "Beavers are master builders and planners. They are methodical, persistent, and have a strong work ethic. Like their totem animal, they create lasting structures and are essential to their communities.",
            traits: {
                positive: ["Hardworking", "Methodical", "Practical", "Loyal", "Persistent"],
                negative: ["Stubborn", "Possessive", "Demanding"]
            },
            totem: "Beaver - represents building, persistence, and community",
            season: "Late Spring - time of growth and building"
        },
        "Deer": {
            dates: "May 21 - June 20",
            element: "Air",
            description: "Deer are gentle, intelligent, and inspiring conversationalists. They have a natural ability to motivate others and bring out the best in people. Their quick wit and charm make them natural communicators.",
            traits: {
                positive: ["Gentle", "Intelligent", "Inspiring", "Witty", "Charming"],
                negative: ["Inconsistent", "Restless", "Moody"]
            },
            totem: "Deer - represents gentleness, grace, and sensitivity",
            season: "Early Summer - time of communication and growth"
        }
        "Woodpecker": {
            dates: "June 21 - July 21",
            element: "Water",
            description: "Woodpeckers are nurturing, protective, and deeply connected to home and family. They are natural caregivers who create safe spaces for others and have strong intuitive abilities.",
            traits: {
                positive: ["Nurturing", "Protective", "Intuitive", "Caring", "Devoted"],
                negative: ["Moody", "Overprotective", "Clingy"]
            },
            totem: "Woodpecker - represents devotion, nurturing, and protection",
            season: "Summer - time of nurturing and protection"
        },
        "Salmon": {
            dates: "July 22 - August 21",
            element: "Fire",
            description: "Salmon people are confident, energetic, and natural leaders. They have a strong sense of purpose and the determination to overcome any obstacle to reach their goals.",
            traits: {
                positive: ["Confident", "Determined", "Energetic", "Leadership", "Focused"],
                negative: ["Stubborn", "Egotistical", "Demanding"]
            },
            totem: "Salmon - represents determination, purpose, and life cycles",
            season: "Late Summer - time of abundance and strength"
        },
        "Brown Bear": {
            dates: "August 22 - September 21",
            element: "Earth",
            description: "Brown Bears are practical, reliable, and hardworking. They are natural providers who believe in preparation and taking care of practical matters. They have great inner strength.",
            traits: {
                positive: ["Practical", "Reliable", "Hardworking", "Methodical", "Strong"],
                negative: ["Stubborn", "Overly cautious", "Materialistic"]
            },
            totem: "Brown Bear - represents strength, introspection, and healing",
            season: "Harvest time - season of gathering and preparation"
        },
        "Raven": {
            dates: "September 22 - October 22",
            element: "Air",
            description: "Ravens are intelligent, diplomatic, and seek balance in all things. They are natural mediators with a strong sense of justice and the ability to see multiple perspectives.",
            traits: {
                positive: ["Intelligent", "Diplomatic", "Fair", "Charming", "Idealistic"],
                negative: ["Indecisive", "Vain", "Superficial"]
            },
            totem: "Raven - represents intelligence, magic, and transformation",
            season: "Autumn - time of balance and harvest"
        },
        "Snake": {
            dates: "October 23 - November 22",
            element: "Water",
            description: "Snake people are intense, mysterious, and transformative. They have deep emotional insight and the ability to regenerate and reinvent themselves throughout life.",
            traits: {
                positive: ["Intense", "Mysterious", "Transformative", "Passionate", "Intuitive"],
                negative: ["Secretive", "Vengeful", "Jealous"]
            },
            totem: "Snake - represents transformation, healing, and rebirth",
            season: "Late Autumn - time of transformation and mystery"
        },
        "Owl": {
            dates: "November 23 - December 21",
            element: "Fire",
            description: "Owls are wise, adventurous, and seek truth and knowledge. They are natural teachers and philosophers who love to explore new ideas and share their wisdom with others.",
            traits: {
                positive: ["Wise", "Adventurous", "Truthful", "Philosophical", "Independent"],
                negative: ["Restless", "Impatient", "Blunt"]
            },
            totem: "Owl - represents wisdom, intuition, and the ability to see what others cannot",
            season: "Early Winter - time of wisdom and inner knowledge"
        },
        "Goose": {
            dates: "December 22 - January 19",
            element: "Earth",
            description: "Geese are ambitious, practical, and goal-oriented. They are natural leaders who work steadily toward their objectives and have great perseverance and determination.",
            traits: {
                positive: ["Ambitious", "Practical", "Determined", "Responsible", "Disciplined"],
                negative: ["Rigid", "Pessimistic", "Controlling"]
            },
            totem: "Goose - represents ambition, teamwork, and safe travel",
            season: "Winter - time of endurance and planning"
        },
        "Otter": {
            dates: "January 20 - February 18",
            element: "Air",
            description: "Otters are creative, independent, and unconventional. They are natural innovators who think outside the box and have a strong desire to help others and make the world a better place.",
            traits: {
                positive: ["Creative", "Independent", "Innovative", "Humanitarian", "Original"],
                negative: ["Rebellious", "Unpredictable", "Detached"]
            },
            totem: "Otter - represents playfulness, creativity, and curiosity",
            season: "Late Winter - time of imagination and innovation"
        },
        "Wolf": {
            dates: "February 19 - March 20",
            element: "Water",
            description: "Wolves are intuitive, compassionate, and deeply spiritual. They are natural healers and artists who have strong psychic abilities and a deep connection to the spiritual realm.",
            traits: {
                positive: ["Intuitive", "Compassionate", "Artistic", "Spiritual", "Empathetic"],
                negative: ["Overly emotional", "Escapist", "Victim mentality"]
            },
            totem: "Wolf - represents loyalty, spirit, and the importance of social connections",
            season: "End of Winter - time of spiritual connection and renewal"
        }
    },

    // Vedic/Hindu Zodiac (Rashis)
    vedic: {
        "Mesha": {
            symbol: "♈",
            element: "Fire",
            dates: "April 14 - May 14",
            planet: "Mars (Mangal)",
            deity: "Hanuman",
            description: "Mesha (Aries) represents leadership, courage, and initiative. People born under this sign are natural pioneers who are not afraid to take risks and start new ventures. They possess strong willpower and determination.",
            traits: {
                positive: ["Courageous", "Leadership", "Initiative", "Energetic", "Independent", "Honest"],
                negative: ["Impulsive", "Aggressive", "Impatient", "Selfish", "Quick-tempered"]
            },
            compatibility: ["Simha (Leo)", "Dhanu (Sagittarius)", "Mithuna (Gemini)"],
            career: "Natural leaders and entrepreneurs. Excel in military, sports, engineering, and any field requiring courage and initiative.",
            health: "Strong constitution but prone to head injuries and fevers. Should practice anger management and avoid excessive heat.",
            mantra: "Om Gam Ganapataye Namaha",
            gemstone: "Red Coral (Moonga)",
            color: "Red",
            direction: "East",
            bodyPart: "Head"
        },
        "Vrishabha": {
            symbol: "♉",
            element: "Earth",
            dates: "May 15 - June 14",
            planet: "Venus (Shukra)",
            deity: "Lakshmi",
            description: "Vrishabha (Taurus) represents stability, beauty, and material comfort. These individuals are practical, reliable, and have a strong appreciation for art, music, and the finer things in life.",
            traits: {
                positive: ["Stable", "Practical", "Artistic", "Reliable", "Patient", "Luxurious"],
                negative: ["Stubborn", "Materialistic", "Possessive", "Lazy", "Inflexible"]
            },
            compatibility: ["Kanya (Virgo)", "Makara (Capricorn)", "Karka (Cancer)"],
            career: "Excel in arts, finance, agriculture, food industry, and luxury goods. Natural talent for music and creative fields.",
            health: "Generally robust but prone to throat and neck issues. Should maintain regular exercise and watch diet.",
            mantra: "Om Shrim Lakshmiye Namaha",
            gemstone: "Diamond or White Sapphire",
            color: "White, Pink",
            direction: "South",
            bodyPart: "Face, Neck, Throat"
        },
        "Mithuna": {
            symbol: "♊",
            element: "Air",
            dates: "June 15 - July 14",
            planet: "Mercury (Budha)",
            deity: "Saraswati",
            description: "Mithuna (Gemini) represents communication, intellect, and versatility. These individuals are quick learners, excellent communicators, and have a curious nature that drives them to explore various subjects.",
            traits: {
                positive: ["Intelligent", "Communicative", "Adaptable", "Witty", "Curious", "Versatile"],
                negative: ["Inconsistent", "Superficial", "Nervous", "Indecisive", "Restless"]
            },
            compatibility: ["Tula (Libra)", "Kumbha (Aquarius)", "Mesha (Aries)"],
            career: "Natural communicators. Excel in writing, teaching, journalism, sales, and any field involving communication or travel.",
            health: "Prone to nervous system disorders and respiratory issues. Should practice meditation and breathing exercises.",
            mantra: "Om Aim Saraswatyai Namaha",
            gemstone: "Emerald (Panna)",
            color: "Green",
            direction: "North",
            bodyPart: "Arms, Lungs, Nervous System"
        },
        "Karka": {
            symbol: "♋",
            element: "Water",
            dates: "July 15 - August 14",
            planet: "Moon (Chandra)",
            deity: "Durga",
            description: "Karka (Cancer) represents emotions, intuition, and nurturing. These individuals are deeply caring, family-oriented, and possess strong psychic abilities and emotional intelligence.",
            traits: {
                positive: ["Nurturing", "Intuitive", "Emotional", "Caring", "Protective", "Imaginative"],
                negative: ["Moody", "Clingy", "Oversensitive", "Pessimistic", "Indirect"]
            },
            compatibility: ["Vrishchika (Scorpio)", "Meena (Pisces)", "Vrishabha (Taurus)"],
            career: "Excel in caregiving professions, hospitality, real estate, psychology, and artistic fields involving emotion.",
            health: "Prone to digestive issues and emotional disorders. Should maintain emotional balance and proper diet.",
            mantra: "Om Chandraya Namaha",
            gemstone: "Pearl (Moti) or Moonstone",
            color: "White, Silver",
            direction: "Northwest",
            bodyPart: "Chest, Stomach, Breasts"
        },
        "Simha": {
            symbol: "♌",
            element: "Fire",
            dates: "August 15 - September 15",
            planet: "Sun (Surya)",
            deity: "Vishnu",
            description: "Simha (Leo) represents authority, creativity, and self-expression. These individuals are natural leaders with strong personalities, creative talents, and a desire to be recognized and appreciated.",
            traits: {
                positive: ["Confident", "Creative", "Generous", "Loyal", "Dramatic", "Leadership"],
                negative: ["Arrogant", "Dominating", "Stubborn", "Attention-seeking", "Inflexible"]
            },
            compatibility: ["Mesha (Aries)", "Dhanu (Sagittarius)", "Mithuna (Gemini)"],
            career: "Natural performers and leaders. Excel in entertainment, politics, management, and any field that allows creative expression.",
            health: "Generally strong but prone to heart and back problems. Should manage ego and practice humility.",
            mantra: "Om Suryaya Namaha",
            gemstone: "Ruby (Manik)",
            color: "Orange, Gold",
            direction: "East",
            bodyPart: "Heart, Back, Spine"
        },
        "Kanya": {
            symbol: "♍",
            element: "Earth",
            dates: "September 16 - October 15",
            planet: "Mercury (Budha)",
            deity: "Ganesha",
            description: "Kanya (Virgo) represents service, perfection, and analysis. These individuals are detail-oriented, helpful, and have a strong desire to improve themselves and serve others.",
            traits: {
                positive: ["Analytical", "Helpful", "Practical", "Organized", "Humble", "Hardworking"],
                negative: ["Critical", "Perfectionist", "Worried", "Shy", "Overcautious"]
            },
            compatibility: ["Vrishabha (Taurus)", "Makara (Capricorn)", "Karka (Cancer)"],
            career: "Excel in service industries, healthcare, research, accounting, and any field requiring attention to detail.",
            health: "Prone to digestive and nervous disorders. Should avoid excessive worry and maintain regular routines.",
            mantra: "Om Gam Ganapataye Namaha",
            gemstone: "Emerald (Panna)",
            color: "Green, Navy Blue",
            direction: "South",
            bodyPart: "Digestive System, Intestines"
        }
        // Additional Vedic signs would continue here...
    },

    // Mayan Zodiac (Day Signs)
    mayan: {
        "Imix": {
            symbol: "🐊",
            element: "Water",
            dates: "Crocodile - Day 1 of 20-day cycle",
            direction: "East",
            color: "Red",
            description: "Imix represents the World Tree, the source of life, and primal creative energy. People born on this day are nurturing, protective, and have strong connection to Mother Earth and family.",
            traits: {
                positive: ["Nurturing", "Protective", "Creative", "Grounded", "Maternal/Paternal", "Stable"],
                negative: ["Overprotective", "Possessive", "Rigid", "Overly emotional"]
            },
            compatibility: ["Cauac (Storm)", "Muluc (Moon)", "Ben (Reed)"],
            career: "Excel in agriculture, childcare, environmental work, and any profession involving nurturing or protection.",
            mayaMeaning: "World Tree, Source of Life",
            deity: "Earth Goddess",
            animal: "Crocodile",
            bodyPart: "Stomach, Digestive System"
        },
        "Ik": {
            symbol: "💨",
            element: "Air",
            dates: "Wind - Day 2 of 20-day cycle",
            direction: "North",
            color: "White",
            description: "Ik represents wind, breath, and spirit. People born on this day are communicative, spiritual, and have the ability to channel divine inspiration and bring new ideas to the world.",
            traits: {
                positive: ["Spiritual", "Communicative", "Inspirational", "Intuitive", "Artistic", "Free-spirited"],
                negative: ["Unstable", "Scattered", "Unreliable", "Impractical"]
            },
            compatibility: ["Men (Eagle)", "Ahau (Sun)", "Etznab (Mirror)"],
            career: "Excel in spiritual work, communication, arts, music, and any field involving inspiration or divine connection.",
            mayaMeaning: "Divine Breath, Spirit Wind",
            deity: "Wind God",
            animal: "Hummingbird",
            bodyPart: "Lungs, Respiratory System"
        },
        "Akbal": {
            symbol: "🌃",
            element: "Earth",
            dates: "Night - Day 3 of 20-day cycle",
            direction: "West",
            color: "Blue",
            description: "Akbal represents the night, the temple, and the inner sanctuary. People born on this day are introspective, protective of sacred knowledge, and have deep connection to the mysteries of life.",
            traits: {
                positive: ["Introspective", "Mysterious", "Protective", "Spiritual", "Conservative", "Deep"],
                negative: ["Secretive", "Withdrawn", "Pessimistic", "Overly serious"]
            },
            compatibility: ["Kan (Seed)", "Chicchan (Serpent)", "Cimi (Death)"],
            career: "Excel in research, archaeology, spiritual work, psychology, and fields requiring deep investigation.",
            mayaMeaning: "Temple, Inner Sanctuary",
            deity: "Jaguar God",
            animal: "Jaguar",
            bodyPart: "Reproductive System"
        },
        "Kan": {
            symbol: "🌽",
            element: "Fire",
            dates: "Seed - Day 4 of 20-day cycle",
            direction: "South",
            color: "Yellow",
            description: "Kan represents the seed, potential, and sexual energy. People born on this day are passionate, fertile with ideas, and have the power to germinate new projects and relationships.",
            traits: {
                positive: ["Passionate", "Fertile", "Creative", "Energetic", "Ambitious", "Magnetic"],
                negative: ["Lustful", "Impulsive", "Excessive", "Burnout-prone"]
            },
            compatibility: ["Akbal (Night)", "Lamat (Star)", "Eb (Human)"],
            career: "Excel in creative fields, entrepreneurship, agriculture, and any work involving growth and development.",
            mayaMeaning: "Seed of Life, Sexual Energy",
            deity: "Corn God",
            animal: "Lizard",
            bodyPart: "Sexual Organs, Lower Back"
        },
        "Chicchan": {
            symbol: "🐍",
            element: "Fire",
            dates: "Serpent - Day 5 of 20-day cycle",
            direction: "East",
            color: "Red",
            description: "Chicchan represents the serpent, kundalini energy, and spiritual transformation. People born on this day are powerful, mystical, and have the ability to shed old skins and transform.",
            traits: {
                positive: ["Powerful", "Mystical", "Transformative", "Healing", "Charismatic", "Wise"],
                negative: ["Vengeful", "Secretive", "Manipulative", "Intense"]
            },
            compatibility: ["Akbal (Night)", "Ix (Jaguar)", "Cauac (Storm)"],
            career: "Excel in healing arts, psychology, research, and any field involving transformation or mystery.",
            mayaMeaning: "Kundalini, Life Force",
            deity: "Kukulkan (Feathered Serpent)",
            animal: "Serpent",
            bodyPart: "Spine, Nervous System"
        },
        "Cimi": {
            symbol: "💀",
            element: "Water",
            dates: "Death - Day 6 of 20-day cycle",
            direction: "North",
            color: "White",
            description: "Cimi represents death, rebirth, and the ancestors. People born on this day are transformative, have connection to the spirit world, and understand the cycles of life and death.",
            traits: {
                positive: ["Transformative", "Spiritual", "Healing", "Psychic", "Compassionate", "Wise"],
                negative: ["Morbid", "Depressive", "Fatalistic", "Withdrawn"]
            },
            compatibility: ["Akbal (Night)", "Muluc (Moon)", "Oc (Dog)"],
            career: "Excel in healing, counseling, spiritual work, and any profession dealing with life transitions.",
            mayaMeaning: "Transformation, Ancestral Wisdom",
            deity: "Death God",
            animal: "Owl",
            bodyPart: "Bones, Skeletal System"
        }
        // Additional Mayan day signs would continue here...
    },

    // Incan Zodiac (based on Andean traditions)
    incan: {
        "Puma": {
            month: "January",
            element: "Earth",
            season: "Summer Solstice (Southern Hemisphere)",
            description: "Puma represents courage, leadership, and the power of the mountains. People born in this month are natural leaders with great strength and the ability to overcome any obstacle.",
            traits: {
                positive: ["Courageous", "Strong", "Leadership", "Protective", "Noble", "Determined"],
                negative: ["Aggressive", "Dominating", "Impatient", "Pride"]
            },
            compatibility: ["Condor", "Jaguar", "Mountain"],
            symbolism: "Sacred animal of the Andes, represents earthly power and courage",
            location: "Sacred Valley, Cusco region",
            ceremony: "Inti Raymi (Sun Festival)",
            offering: "Coca leaves, chicha corn beer",
            chakana: "Lower world (Kay Pacha) - earthly realm"
        },
        "Condor": {
            month: "February",
            element: "Air",
            season: "Late Summer",
            description: "Condor represents wisdom, spiritual vision, and connection to the upper world. People born in this month have great perspective, wisdom, and ability to see the bigger picture.",
            traits: {
                positive: ["Wise", "Visionary", "Spiritual", "Free", "Perspective", "Noble"],
                negative: ["Aloof", "Detached", "Impractical", "Arrogant"]
            },
            compatibility: ["Puma", "Serpent", "Falcon"],
            symbolism: "Sacred bird connecting earth and sky, messenger of the gods",
            location: "High Andes, mountain peaks",
            ceremony: "Flight ceremonies, wind rituals",
            offering: "Feathers, incense, prayers to sky",
            chakana: "Upper world (Hanan Pacha) - spiritual realm"
        },
        "Serpent": {
            month: "March",
            element: "Water",
            season: "Autumn Equinox",
            description: "Serpent represents transformation, healing, and connection to the underworld. People born in this month are healers, transformers, and have deep connection to the mysteries of life.",
            traits: {
                positive: ["Healing", "Transformative", "Intuitive", "Mysterious", "Wise", "Regenerative"],
                negative: ["Secretive", "Vengeful", "Manipulative", "Intense"]
            },
            compatibility: ["Condor", "Jaguar", "Vicuña"],
            symbolism: "Sacred symbol of transformation and underworld knowledge",
            location: "Sacred lakes, underground springs",
            ceremony: "Water ceremonies, healing rituals",
            offering: "Water, shells, healing herbs",
            chakana: "Lower world (Uray Pacha) - underworld realm"
        },
        "Fox": {
            month: "April",
            element: "Earth",
            season: "Autumn",
            description: "Fox represents cunning, adaptability, and survival wisdom. People born in this month are clever, resourceful, and able to navigate through difficult situations with intelligence.",
            traits: {
                positive: ["Clever", "Adaptable", "Resourceful", "Cunning", "Survivor", "Quick"],
                negative: ["Deceptive", "Selfish", "Untrustworthy", "Opportunistic"]
            },
            compatibility: ["Llama", "Mountain", "Chuya"],
            symbolism: "Trickster spirit, represents adaptability and survival",
            location: "Highland plateaus, rocky terrain",
            ceremony: "Harvest ceremonies, cunning rituals",
            offering: "Small game, clever solutions",
            chakana: "Middle world (Kay Pacha) - physical survival"
        },
        "Llama": {
            month: "May",
            element: "Earth",
            season: "Late Autumn",
            description: "Llama represents service, endurance, and community support. People born in this month are reliable, hardworking, and devoted to serving their community and family.",
            traits: {
                positive: ["Reliable", "Hardworking", "Service-oriented", "Enduring", "Community-minded", "Gentle"],
                negative: ["Stubborn", "Burden-bearing", "Self-sacrificing", "Passive"]
            },
            compatibility: ["Vicuña", "Fox", "Mountain"],
            symbolism: "Sacred pack animal, represents service and endurance",
            location: "High altitude grasslands",
            ceremony: "Blessing of animals, community service",
            offering: "Llama wool, food for community",
            chakana: "Service to community and reciprocity (Ayni)"
        },
        "Falcon": {
            month: "June",
            element: "Air",
            season: "Winter Solstice",
            description: "Falcon represents precision, focus, and swift action. People born in this month have sharp minds, excellent focus, and the ability to act quickly and decisively.",
            traits: {
                positive: ["Precise", "Focused", "Swift", "Sharp", "Decisive", "Hunting instinct"],
                negative: ["Aggressive", "Impatient", "Ruthless", "Narrow focus"]
            },
            compatibility: ["Condor", "Jaguar", "Vicuña"],
            symbolism: "Hunter bird, represents precision and focused intent",
            location: "Mountain cliffs, hunting grounds",
            ceremony: "Winter solstice, precision rituals",
            offering: "Sharp objects, focused intentions",
            chakana: "Focused action in middle world"
        },
        "Vicuña": {
            month: "July",
            element: "Air",
            season: "Winter",
            description: "Vicuña represents grace, beauty, and refined sensitivity. People born in this month are elegant, sensitive, and have appreciation for beauty and refinement.",
            traits: {
                positive: ["Graceful", "Beautiful", "Sensitive", "Refined", "Elegant", "Artistic"],
                negative: ["Overly sensitive", "Vain", "Fragile", "Elitist"]
            },
            compatibility: ["Llama", "Falcon", "Serpent"],
            symbolism: "Sacred animal with finest wool, represents refinement",
            location: "High mountain meadows",
            ceremony: "Beauty ceremonies, artistic rituals",
            offering: "Fine textiles, beautiful objects",
            chakana: "Aesthetic appreciation and refinement"
        },
        "Jaguar": {
            month: "August",
            element: "Fire",
            season: "Late Winter",
            description: "Jaguar represents power, mystery, and shamanic ability. People born in this month are powerful, mysterious, and have strong connection to spiritual realms and healing.",
            traits: {
                positive: ["Powerful", "Mysterious", "Shamanic", "Healing", "Protective", "Magical"],
                negative: ["Dangerous", "Unpredictable", "Solitary", "Intimidating"]
            },
            compatibility: ["Puma", "Serpent", "Condor"],
            symbolism: "Sacred jungle cat, represents shamanic power",
            location: "Sacred jungle areas, hidden temples",
            ceremony: "Shamanic journeys, power animal rituals",
            offering: "Ayahuasca, power objects",
            chakana: "Bridge between worlds, shamanic power"
        },
        "Coca": {
            month: "September",
            element: "Earth",
            season: "Spring Equinox",
            description: "Coca represents sacred medicine, endurance, and spiritual nourishment. People born in this month are healers, teachers, and providers of spiritual and physical nourishment.",
            traits: {
                positive: ["Healing", "Nourishing", "Enduring", "Sacred", "Teaching", "Sustaining"],
                negative: ["Addictive", "Overwhelming", "Intense", "Demanding"]
            },
            compatibility: ["Mountain", "Serpent", "Chuya"],
            symbolism: "Sacred plant, represents spiritual nourishment",
            location: "Sacred coca fields, ceremonial spaces",
            ceremony: "Coca leaf readings, blessing ceremonies",
            offering: "Coca leaves, prayers for sustenance",
            chakana: "Sacred reciprocity with plant spirits"
        },
        "Mountain": {
            month: "October",
            element: "Earth",
            season: "Spring",
            description: "Mountain represents stability, ancient wisdom, and connection to the Apus (mountain spirits). People born in this month are stable, wise, and deeply connected to the earth.",
            traits: {
                positive: ["Stable", "Wise", "Grounded", "Ancient", "Protective", "Enduring"],
                negative: ["Rigid", "Slow to change", "Stubborn", "Overwhelming"]
            },
            compatibility: ["Puma", "Fox", "Coca"],
            symbolism: "Sacred mountains (Apus), ancestors and protectors",
            location: "Sacred mountain peaks, ancient sites",
            ceremony: "Apu ceremonies, mountain blessings",
            offering: "Despachos (offerings), prayers to Apus",
            chakana: "Connection to ancestral wisdom and protection"
        },
        "Chuya": {
            month: "November",
            element: "Water",
            season: "Late Spring",
            description: "Chuya represents clarity, purification, and transparency. People born in this month are clear-minded, honest, and have the ability to purify and clarify situations.",
            traits: {
                positive: ["Clear", "Pure", "Honest", "Transparent", "Cleansing", "Truth-seeking"],
                negative: ["Harsh", "Unforgiving", "Cold", "Perfectionist"]
            },
            compatibility: ["Amaru", "Coca", "Fox"],
            symbolism: "Crystal clear water, represents purity and truth",
            location: "Sacred springs, crystal clear lakes",
            ceremony: "Purification ceremonies, truth rituals",
            offering: "Clear water, crystals, honest intentions",
            chakana: "Purification and clarity in all worlds"
        },
        "Amaru": {
            month: "December",
            element: "Water",
            season: "Summer Solstice",
            description: "Amaru represents the cosmic serpent, infinity, and connection to all worlds. People born in this month are deeply spiritual, connected to cosmic energies, and bridge different realms.",
            traits: {
                positive: ["Cosmic", "Spiritual", "Infinite", "Bridging", "Mystical", "Universal"],
                negative: ["Overwhelming", "Confusing", "Impractical", "Lost in cosmos"]
            },
            compatibility: ["Condor", "Jaguar", "Chuya"],
            symbolism: "Rainbow serpent, cosmic bridge between all worlds",
            location: "Sacred waterfalls, rainbow sites",
            ceremony: "Cosmic ceremonies, world bridging rituals",
            offering: "Rainbow objects, cosmic intentions",
            chakana: "Connection between all three worlds (Chakana)"
        }
    }
};

// Helper function to get zodiac information
function getZodiacInfo(system, sign) {
    if (ZODIAC_INFO[system] && ZODIAC_INFO[system][sign]) {
        return ZODIAC_INFO[system][sign];
    }
    return null;
}
