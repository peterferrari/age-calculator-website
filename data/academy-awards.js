// Academy Awards Database - Organized by Year
// Format: year: { bestPicture, bestActor, bestActress, ceremony details }

const ACADEMY_AWARDS = {
    // Recent Years (2020s)
    2024: { 
        bestPicture: "Oppenheimer", 
        bestActor: "Cillian Murphy - Oppenheimer", 
        bestActress: "Emma Stone - Poor Things",
        ceremony: "96th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2023: { 
        bestPicture: "Everything Everywhere All at Once", 
        bestActor: "Brendan Fraser - The Whale", 
        bestActress: "Michelle Yeoh - Everything Everywhere All at Once",
        ceremony: "95th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2022: { 
        bestPicture: "CODA", 
        bestActor: "Will Smith - King Richard", 
        bestActress: "Jessica Chastain - The Eyes of Tammy Faye",
        ceremony: "94th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2021: { 
        bestPicture: "Nomadland", 
        bestActor: "Anthony Hopkins - The Father", 
        bestActress: "Frances McDormand - Nomadland",
        ceremony: "93rd Academy Awards",
        location: "Multiple venues due to COVID-19"
    },
    2020: { 
        bestPicture: "Parasite", 
        bestActor: "Joaquin Phoenix - Joker", 
        bestActress: "Renée Zellweger - Judy",
        ceremony: "92nd Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },

    // 2010s
    2019: { 
        bestPicture: "Green Book", 
        bestActor: "Rami Malek - Bohemian Rhapsody", 
        bestActress: "Olivia Colman - The Favourite",
        ceremony: "91st Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2018: { 
        bestPicture: "The Shape of Water", 
        bestActor: "Gary Oldman - Darkest Hour", 
        bestActress: "Frances McDormand - Three Billboards Outside Ebbing, Missouri",
        ceremony: "90th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2017: { 
        bestPicture: "Moonlight", 
        bestActor: "Casey Affleck - Manchester by the Sea", 
        bestActress: "Emma Stone - La La Land",
        ceremony: "89th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2016: { 
        bestPicture: "Spotlight", 
        bestActor: "Leonardo DiCaprio - The Revenant", 
        bestActress: "Brie Larson - Room",
        ceremony: "88th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2015: { 
        bestPicture: "Birdman", 
        bestActor: "Eddie Redmayne - The Theory of Everything", 
        bestActress: "Julianne Moore - Still Alice",
        ceremony: "87th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2014: { 
        bestPicture: "12 Years a Slave", 
        bestActor: "Matthew McConaughey - Dallas Buyers Club", 
        bestActress: "Cate Blanchett - Blue Jasmine",
        ceremony: "86th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2013: { 
        bestPicture: "Argo", 
        bestActor: "Daniel Day-Lewis - Lincoln", 
        bestActress: "Jennifer Lawrence - Silver Linings Playbook",
        ceremony: "85th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2012: { 
        bestPicture: "The Artist", 
        bestActor: "Jean Dujardin - The Artist", 
        bestActress: "Meryl Streep - The Iron Lady",
        ceremony: "84th Academy Awards",
        location: "Dolby Theatre, Hollywood"
    },
    2011: { 
        bestPicture: "The King's Speech", 
        bestActor: "Colin Firth - The King's Speech", 
        bestActress: "Natalie Portman - Black Swan",
        ceremony: "83rd Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2010: { 
        bestPicture: "The Hurt Locker", 
        bestActor: "Jeff Bridges - Crazy Heart", 
        bestActress: "Sandra Bullock - The Blind Side",
        ceremony: "82nd Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },

    // 2000s
    2009: { 
        bestPicture: "Slumdog Millionaire", 
        bestActor: "Sean Penn - Milk", 
        bestActress: "Kate Winslet - The Reader",
        ceremony: "81st Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2008: { 
        bestPicture: "No Country for Old Men", 
        bestActor: "Daniel Day-Lewis - There Will Be Blood", 
        bestActress: "Marion Cotillard - La Vie en Rose",
        ceremony: "80th Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2007: { 
        bestPicture: "The Departed", 
        bestActor: "Forest Whitaker - The Last King of Scotland", 
        bestActress: "Helen Mirren - The Queen",
        ceremony: "79th Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2006: { 
        bestPicture: "Crash", 
        bestActor: "Philip Seymour Hoffman - Capote", 
        bestActress: "Reese Witherspoon - Walk the Line",
        ceremony: "78th Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2005: { 
        bestPicture: "Million Dollar Baby", 
        bestActor: "Jamie Foxx - Ray", 
        bestActress: "Hilary Swank - Million Dollar Baby",
        ceremony: "77th Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2004: { 
        bestPicture: "The Lord of the Rings: The Return of the King", 
        bestActor: "Sean Penn - Mystic River", 
        bestActress: "Charlize Theron - Monster",
        ceremony: "76th Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2003: { 
        bestPicture: "Chicago", 
        bestActor: "Adrien Brody - The Pianist", 
        bestActress: "Nicole Kidman - The Hours",
        ceremony: "75th Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2002: { 
        bestPicture: "A Beautiful Mind", 
        bestActor: "Denzel Washington - Training Day", 
        bestActress: "Halle Berry - Monster's Ball",
        ceremony: "74th Academy Awards",
        location: "Kodak Theatre, Hollywood"
    },
    2001: { 
        bestPicture: "Gladiator", 
        bestActor: "Russell Crowe - Gladiator", 
        bestActress: "Julia Roberts - Erin Brockovich",
        ceremony: "73rd Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },
    2000: { 
        bestPicture: "American Beauty", 
        bestActor: "Kevin Spacey - American Beauty", 
        bestActress: "Hilary Swank - Boys Don't Cry",
        ceremony: "72nd Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },

    // 1990s
    1999: { 
        bestPicture: "Shakespeare in Love", 
        bestActor: "Roberto Benigni - Life Is Beautiful", 
        bestActress: "Gwyneth Paltrow - Shakespeare in Love",
        ceremony: "71st Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1998: { 
        bestPicture: "Titanic", 
        bestActor: "Jack Nicholson - As Good as It Gets", 
        bestActress: "Helen Hunt - As Good as It Gets",
        ceremony: "70th Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },
    1997: { 
        bestPicture: "The English Patient", 
        bestActor: "Geoffrey Rush - Shine", 
        bestActress: "Frances McDormand - Fargo",
        ceremony: "69th Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },
    1996: { 
        bestPicture: "Braveheart", 
        bestActor: "Nicolas Cage - Leaving Las Vegas", 
        bestActress: "Susan Sarandon - Dead Man Walking",
        ceremony: "68th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1995: { 
        bestPicture: "Forrest Gump", 
        bestActor: "Tom Hanks - Forrest Gump", 
        bestActress: "Jessica Lange - Blue Sky",
        ceremony: "67th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1994: { 
        bestPicture: "Schindler's List", 
        bestActor: "Tom Hanks - Philadelphia", 
        bestActress: "Holly Hunter - The Piano",
        ceremony: "66th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1993: { 
        bestPicture: "Unforgiven", 
        bestActor: "Al Pacino - Scent of a Woman", 
        bestActress: "Emma Thompson - Howards End",
        ceremony: "65th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1992: { 
        bestPicture: "The Silence of the Lambs", 
        bestActor: "Anthony Hopkins - The Silence of the Lambs", 
        bestActress: "Jodie Foster - The Silence of the Lambs",
        ceremony: "64th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1991: { 
        bestPicture: "Dances with Wolves", 
        bestActor: "Jeremy Irons - Reversal of Fortune", 
        bestActress: "Kathy Bates - Misery",
        ceremony: "63rd Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },
    1990: { 
        bestPicture: "Driving Miss Daisy", 
        bestActor: "Daniel Day-Lewis - My Left Foot", 
        bestActress: "Jessica Tandy - Driving Miss Daisy",
        ceremony: "62nd Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },

    // 1980s
    1989: { 
        bestPicture: "Rain Man", 
        bestActor: "Dustin Hoffman - Rain Man", 
        bestActress: "Jodie Foster - The Accused",
        ceremony: "61st Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },
    1988: { 
        bestPicture: "The Last Emperor", 
        bestActor: "Michael Douglas - Wall Street", 
        bestActress: "Cher - Moonstruck",
        ceremony: "60th Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },
    1987: { 
        bestPicture: "Platoon", 
        bestActor: "Paul Newman - The Color of Money", 
        bestActress: "Marlee Matlin - Children of a Lesser God",
        ceremony: "59th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1986: { 
        bestPicture: "Out of Africa", 
        bestActor: "William Hurt - Kiss of the Spider Woman", 
        bestActress: "Geraldine Page - The Trip to Bountiful",
        ceremony: "58th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1985: { 
        bestPicture: "Amadeus", 
        bestActor: "F. Murray Abraham - Amadeus", 
        bestActress: "Sally Field - Places in the Heart",
        ceremony: "57th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1984: { 
        bestPicture: "Terms of Endearment", 
        bestActor: "Robert Duvall - Tender Mercies", 
        bestActress: "Shirley MacLaine - Terms of Endearment",
        ceremony: "56th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1983: { 
        bestPicture: "Gandhi", 
        bestActor: "Ben Kingsley - Gandhi", 
        bestActress: "Meryl Streep - Sophie's Choice",
        ceremony: "55th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1982: { 
        bestPicture: "Chariots of Fire", 
        bestActor: "Henry Fonda - On Golden Pond", 
        bestActress: "Katharine Hepburn - On Golden Pond",
        ceremony: "54th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1981: { 
        bestPicture: "Ordinary People", 
        bestActor: "Robert De Niro - Raging Bull", 
        bestActress: "Sissy Spacek - Coal Miner's Daughter",
        ceremony: "53rd Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1980: { 
        bestPicture: "Kramer vs. Kramer", 
        bestActor: "Dustin Hoffman - Kramer vs. Kramer", 
        bestActress: "Sally Field - Norma Rae",
        ceremony: "52nd Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },

    // 1970s
    1979: { 
        bestPicture: "The Deer Hunter", 
        bestActor: "Jon Voight - Coming Home", 
        bestActress: "Jane Fonda - Coming Home",
        ceremony: "51st Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1978: { 
        bestPicture: "Annie Hall", 
        bestActor: "Richard Dreyfuss - The Goodbye Girl", 
        bestActress: "Diane Keaton - Annie Hall",
        ceremony: "50th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1977: { 
        bestPicture: "Rocky", 
        bestActor: "Peter Finch - Network", 
        bestActress: "Faye Dunaway - Network",
        ceremony: "49th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1976: { 
        bestPicture: "One Flew Over the Cuckoo's Nest", 
        bestActor: "Jack Nicholson - One Flew Over the Cuckoo's Nest", 
        bestActress: "Louise Fletcher - One Flew Over the Cuckoo's Nest",
        ceremony: "48th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1975: { 
        bestPicture: "The Godfather Part II", 
        bestActor: "Art Carney - Harry and Tonto", 
        bestActress: "Ellen Burstyn - Alice Doesn't Live Here Anymore",
        ceremony: "47th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1974: { 
        bestPicture: "The Godfather", 
        bestActor: "Jack Lemmon - Save the Tiger", 
        bestActress: "Glenda Jackson - A Touch of Class",
        ceremony: "46th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1973: { 
        bestPicture: "The Sting", 
        bestActor: "Jack Lemmon - Save the Tiger", 
        bestActress: "Glenda Jackson - A Touch of Class",
        ceremony: "46th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1972: { 
        bestPicture: "The French Connection", 
        bestActor: "Gene Hackman - The French Connection", 
        bestActress: "Jane Fonda - Klute",
        ceremony: "44th Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1971: { 
        bestPicture: "Patton", 
        bestActor: "George C. Scott - Patton", 
        bestActress: "Glenda Jackson - Women in Love",
        ceremony: "43rd Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1970: { 
        bestPicture: "Midnight Cowboy", 
        bestActor: "John Wayne - True Grit", 
        bestActress: "Maggie Smith - The Prime of Miss Jean Brodie",
        ceremony: "42nd Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },

    // 1960s
    1969: { 
        bestPicture: "Oliver!", 
        bestActor: "Cliff Robertson - Charly", 
        bestActress: "Katharine Hepburn - The Lion in Winter",
        ceremony: "41st Academy Awards",
        location: "Dorothy Chandler Pavilion, Los Angeles"
    },
    1968: { 
        bestPicture: "In the Heat of the Night", 
        bestActor: "Rod Steiger - In the Heat of the Night", 
        bestActress: "Katharine Hepburn - Guess Who's Coming to Dinner",
        ceremony: "40th Academy Awards",
        location: "Santa Monica Civic Auditorium"
    },
    1967: { 
        bestPicture: "A Man for All Seasons", 
        bestActor: "Paul Scofield - A Man for All Seasons", 
        bestActress: "Elizabeth Taylor - Who's Afraid of Virginia Woolf?",
        ceremony: "39th Academy Awards",
        location: "Santa Monica Civic Auditorium"
    },
    1966: { 
        bestPicture: "The Sound of Music", 
        bestActor: "Lee Marvin - Cat Ballou", 
        bestActress: "Julie Christie - Darling",
        ceremony: "38th Academy Awards",
        location: "Santa Monica Civic Auditorium"
    },
    1965: { 
        bestPicture: "My Fair Lady", 
        bestActor: "Rex Harrison - My Fair Lady", 
        bestActress: "Julie Andrews - Mary Poppins",
        ceremony: "37th Academy Awards",
        location: "Santa Monica Civic Auditorium"
    },
    1964: { 
        bestPicture: "Tom Jones", 
        bestActor: "Sidney Poitier - Lilies of the Field", 
        bestActress: "Patricia Neal - Hud",
        ceremony: "36th Academy Awards",
        location: "Santa Monica Civic Auditorium"
    },
    1963: { 
        bestPicture: "Lawrence of Arabia", 
        bestActor: "Gregory Peck - To Kill a Mockingbird", 
        bestActress: "Anne Bancroft - The Miracle Worker",
        ceremony: "35th Academy Awards",
        location: "Santa Monica Civic Auditorium"
    },
    1962: { 
        bestPicture: "West Side Story", 
        bestActor: "Maximilian Schell - Judgment at Nuremberg", 
        bestActress: "Sophia Loren - Two Women",
        ceremony: "34th Academy Awards",
        location: "Santa Monica Civic Auditorium"
    },
    1961: { 
        bestPicture: "The Apartment", 
        bestActor: "Burt Lancaster - Elmer Gantry", 
        bestActress: "Elizabeth Taylor - Butterfield 8",
        ceremony: "33rd Academy Awards",
        location: "Santa Monica Civic Auditorium"
    },
    1960: { 
        bestPicture: "Ben-Hur", 
        bestActor: "Charlton Heston - Ben-Hur", 
        bestActress: "Simone Signoret - Room at the Top",
        ceremony: "32nd Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },

    // 1950s
    1959: { 
        bestPicture: "Gigi", 
        bestActor: "David Niven - Separate Tables", 
        bestActress: "Susan Hayward - I Want to Live!",
        ceremony: "31st Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1958: { 
        bestPicture: "The Bridge on the River Kwai", 
        bestActor: "Alec Guinness - The Bridge on the River Kwai", 
        bestActress: "Joanne Woodward - The Three Faces of Eve",
        ceremony: "30th Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1957: { 
        bestPicture: "Around the World in 80 Days", 
        bestActor: "Yul Brynner - The King and I", 
        bestActress: "Ingrid Bergman - Anastasia",
        ceremony: "29th Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1956: { 
        bestPicture: "Marty", 
        bestActor: "Ernest Borgnine - Marty", 
        bestActress: "Anna Magnani - The Rose Tattoo",
        ceremony: "28th Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1955: { 
        bestPicture: "On the Waterfront", 
        bestActor: "Marlon Brando - On the Waterfront", 
        bestActress: "Grace Kelly - The Country Girl",
        ceremony: "27th Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1954: { 
        bestPicture: "From Here to Eternity", 
        bestActor: "William Holden - Stalag 17", 
        bestActress: "Audrey Hepburn - Roman Holiday",
        ceremony: "26th Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1953: { 
        bestPicture: "The Greatest Show on Earth", 
        bestActor: "Gary Cooper - High Noon", 
        bestActress: "Shirley Booth - Come Back, Little Sheba",
        ceremony: "25th Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1952: { 
        bestPicture: "An American in Paris", 
        bestActor: "Humphrey Bogart - The African Queen", 
        bestActress: "Vivien Leigh - A Streetcar Named Desire",
        ceremony: "24th Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1951: { 
        bestPicture: "All About Eve", 
        bestActor: "José Ferrer - Cyrano de Bergerac", 
        bestActress: "Judy Holliday - Born Yesterday",
        ceremony: "23rd Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },
    1950: { 
        bestPicture: "All the King's Men", 
        bestActor: "Broderick Crawford - All the King's Men", 
        bestActress: "Olivia de Havilland - The Heiress",
        ceremony: "22nd Academy Awards",
        location: "RKO Pantages Theatre, Hollywood"
    },

    // 1940s
    1949: { 
        bestPicture: "Hamlet", 
        bestActor: "Laurence Olivier - Hamlet", 
        bestActress: "Jane Wyman - Johnny Belinda",
        ceremony: "21st Academy Awards",
        location: "Academy Award Theatre, Hollywood"
    },
    1948: { 
        bestPicture: "Gentleman's Agreement", 
        bestActor: "Ronald Colman - A Double Life", 
        bestActress: "Loretta Young - The Farmer's Daughter",
        ceremony: "20th Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },
    1947: { 
        bestPicture: "The Best Years of Our Lives", 
        bestActor: "Fredric March - The Best Years of Our Lives", 
        bestActress: "Olivia de Havilland - To Each His Own",
        ceremony: "19th Academy Awards",
        location: "Shrine Auditorium, Los Angeles"
    },
    1946: { 
        bestPicture: "The Lost Weekend", 
        bestActor: "Ray Milland - The Lost Weekend", 
        bestActress: "Joan Crawford - Mildred Pierce",
        ceremony: "18th Academy Awards",
        location: "Grauman's Chinese Theatre, Hollywood"
    },
    1945: { 
        bestPicture: "Going My Way", 
        bestActor: "Bing Crosby - Going My Way", 
        bestActress: "Ingrid Bergman - Gaslight",
        ceremony: "17th Academy Awards",
        location: "Grauman's Chinese Theatre, Hollywood"
    },
    1944: { 
        bestPicture: "Casablanca", 
        bestActor: "Paul Lukas - Watch on the Rhine", 
        bestActress: "Jennifer Jones - The Song of Bernadette",
        ceremony: "16th Academy Awards",
        location: "Grauman's Chinese Theatre, Hollywood"
    },
    1943: { 
        bestPicture: "Mrs. Miniver", 
        bestActor: "James Cagney - Yankee Doodle Dandy", 
        bestActress: "Greer Garson - Mrs. Miniver",
        ceremony: "15th Academy Awards",
        location: "Ambassador Hotel, Los Angeles"
    },
    1942: { 
        bestPicture: "How Green Was My Valley", 
        bestActor: "Gary Cooper - Sergeant York", 
        bestActress: "Joan Fontaine - Suspicion",
        ceremony: "14th Academy Awards",
        location: "Biltmore Hotel, Los Angeles"
    },
    1941: { 
        bestPicture: "Rebecca", 
        bestActor: "James Stewart - The Philadelphia Story", 
        bestActress: "Ginger Rogers - Kitty Foyle",
        ceremony: "13th Academy Awards",
        location: "Biltmore Hotel, Los Angeles"
    },
    1940: { 
        bestPicture: "Gone with the Wind", 
        bestActor: "Robert Donat - Goodbye, Mr. Chips", 
        bestActress: "Vivien Leigh - Gone with the Wind",
        ceremony: "12th Academy Awards",
        location: "Ambassador Hotel, Los Angeles"
    },

    // 1930s
    1939: { 
        bestPicture: "You Can't Take It with You", 
        bestActor: "Spencer Tracy - Boys Town", 
        bestActress: "Bette Davis - Jezebel",
        ceremony: "11th Academy Awards",
        location: "Biltmore Hotel, Los Angeles"
    },
    1938: { 
        bestPicture: "The Life of Emile Zola", 
        bestActor: "Spencer Tracy - Captains Courageous", 
        bestActress: "Luise Rainer - The Good Earth",
        ceremony: "10th Academy Awards",
        location: "Biltmore Hotel, Los Angeles"
    },
    1937: { 
        bestPicture: "The Great Ziegfeld", 
        bestActor: "Paul Muni - The Story of Louis Pasteur", 
        bestActress: "Luise Rainer - The Great Ziegfeld",
        ceremony: "9th Academy Awards",
        location: "Biltmore Hotel, Los Angeles"
    },
    1936: { 
        bestPicture: "Mutiny on the Bounty", 
        bestActor: "Victor McLaglen - The Informer", 
        bestActress: "Bette Davis - Dangerous",
        ceremony: "8th Academy Awards",
        location: "Biltmore Hotel, Los Angeles"
    },
    1935: { 
        bestPicture: "It Happened One Night", 
        bestActor: "Clark Gable - It Happened One Night", 
        bestActress: "Claudette Colbert - It Happened One Night",
        ceremony: "7th Academy Awards",
        location: "Biltmore Hotel, Los Angeles"
    },
    1934: { 
        bestPicture: "Cavalcade", 
        bestActor: "Charles Laughton - The Private Life of Henry VIII", 
        bestActress: "Katharine Hepburn - Morning Glory",
        ceremony: "6th Academy Awards",
        location: "Fiesta Room of the Ambassador Hotel, Los Angeles"
    },
    1933: { 
        bestPicture: "Grand Hotel", 
        bestActor: "Fredric March - Dr. Jekyll and Mr. Hyde", 
        bestActress: "Helen Hayes - The Sin of Madelon Claudet",
        ceremony: "5th Academy Awards",
        location: "Fiesta Room of the Ambassador Hotel, Los Angeles"
    },
    1932: { 
        bestPicture: "Cimarron", 
        bestActor: "Lionel Barrymore - A Free Soul", 
        bestActress: "Marie Dressler - Min and Bill",
        ceremony: "4th Academy Awards",
        location: "Sala de Oro of the Biltmore Hotel, Los Angeles"
    },
    1931: { 
        bestPicture: "All Quiet on the Western Front", 
        bestActor: "George Arliss - Disraeli", 
        bestActress: "Norma Shearer - The Divorcee",
        ceremony: "3rd Academy Awards",
        location: "Fiesta Room of the Ambassador Hotel, Los Angeles"
    },
    1930: { 
        bestPicture: "The Broadway Melody", 
        bestActor: "Warner Baxter - In Old Arizona", 
        bestActress: "Mary Pickford - Coquette",
        ceremony: "2nd Academy Awards",
        location: "Ambassador Hotel, Los Angeles"
    }
};

