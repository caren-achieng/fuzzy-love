// Each row is one fixed fictional profile. Indices refer to the labelled choices below.
const options = {
  "Relationship goal":["Long-term partner","Long-term, open to short-term","Short-term, open to long-term","Short-term fun","New friends","Still figuring it out"],
  "Family plans":["Want children","Have children and want more","Unsure","Don't want children","Have children and don't want more"],
  "Communication":["Texting","Phone calls","Video chats","In person","Infrequent texting"],
  "Love style":["Thoughtful gestures","Presents","Touch","Compliments","Time together"],
  "Pets":["Dog","Cat","Reptile","Amphibian","Bird","Fish","No pets, but love them","Other","Turtle","Hamster","Rabbit","Pet-free","Several pets","Want a pet","Allergic to pets"],
  "Drinking":["Never","Newly teetotal","Sober curious","Special occasions","Socially at weekends","Most nights"],
  "Smoking":["Non-smoker","Social smoker","Only when drinking","Smoker","Trying to quit"],
  "Workout":["Never","Sometimes","Often","Every day"],
  "Social media":["Off the grid","Passive scroller","Socially active","Influencer"],
  "Education":["High school","Trade school","At university","Bachelor’s","Graduate programme","Master’s","PhD"],
  "Zodiac":["Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"]
};
const fields=Object.keys(options);
const rows=[
["Maya","Woman",27,14,"I plan weekends around a hike and a bakery.",[0,0,0,4,0,3,0,2,1,5,2],"Hiking,Coffee","English,French",3],
["Luca","Man",31,32,"Making fresh pasta is my favourite Sunday ritual.",[1,1,1,0,1,4,1,1,2,1,6],"Cooking,Photography","Italian,French",4],
["Noor","Nonbinary",25,9,"Always up for a museum and a very slow coffee.",[4,2,3,4,6,0,0,1,0,2,0],"Art,Coffee","Arabic,English",2],
["Eli","Man",29,52,"Ask me about the album I keep playing on repeat.",[0,2,2,3,11,1,0,2,1,3,8],"Music,Hiking","German,English",5],
["Inès","Woman",34,25,"My dog comes with me on almost every lake walk.",[0,4,1,4,0,3,4,1,2,5,3],"Hiking,Art","French,Spanish",2],
["Sam","Nonbinary",24,18,"Usually dancing or planning the next gig.",[2,3,0,2,13,4,2,3,3,3,5],"Dancing,Music","English,Swahili",4],
["Theo","Man",38,61,"",[3,4,3,2,4,5,3,0,0,0,9],"Gaming,Cooking","French,German",1],
["Amina","Woman",30,45,"I keep a sketchbook in every bag.",[1,0,2,0,10,2,0,2,2,4,7],"Art,Photography","Swahili,English",3],
["Jo","Nonbinary",28,6,"Board games and coffee are my ideal first date.",[5,3,4,1,1,0,1,0,1,6,4],"Gaming,Coffee","French,English",2],
["Leon","Man",42,77,"I teach salsa on Thursday nights.",[2,1,3,3,5,4,0,3,2,1,10],"Dancing,Cooking","Spanish,Italian",5],
["Zara", "Woman", 43, 85, "", [2, 1, 4, 4, 5, 0, 2, 0, 2, 1, 11], "Gaming,Hiking,Music", "Spanish,Arabic,English", 6],
["Nia", "Man", 20, 108, "A gallery visit followed by lunch is my kind of day.", [2, 2, 0, 4, 9, 0, 2, 0, 0, 4, 7], "Art,Photography,Music", "Spanish", 8],
["Amara", "Nonbinary", 45, 26, "My favourite evenings include music and a dance floor.", [3, 4, 2, 3, 12, 3, 4, 2, 1, 5, 9], "Dancing,Photography", "Arabic", 4],
["Wanjiku", "Woman", 22, 95, "Always checking the listings for a live show.", [0, 3, 0, 1, 4, 3, 3, 0, 3, 6, 7], "Music,Gaming,Photography,Dancing", "Spanish,English,Arabic", 5],
["Zuri", "Man", 25, 56, "I leave room in my week for drawing and new exhibitions.", [1, 2, 1, 2, 14, 4, 3, 3, 0, 0, 0], "Art,Photography,Music,Gaming", "Swahili", 6],
["Leila", "Nonbinary", 27, 89, "A gallery visit followed by lunch is my kind of day.", [4, 2, 4, 0, 10, 3, 3, 3, 1, 1, 5], "Art,Music,Photography", "French,German", 5],
["Sofia", "Woman", 53, 115, "My ideal Sunday starts on a quiet trail.", [5, 3, 0, 3, 4, 0, 2, 2, 3, 4, 10], "Hiking,Photography", "English,Arabic,French", 7],
["Elena", "Man", 45, 17, "Always checking the listings for a live show.", [3, 4, 0, 4, 5, 2, 2, 1, 2, 5, 3], "Music,Coffee,Photography", "Swahili", 1],
["Clara", "Nonbinary", 35, 49, "Learning new dance steps and laughing at my mistakes.", [3, 0, 1, 1, 7, 0, 0, 1, 0, 2, 10], "Dancing,Gaming,Hiking", "Swahili,Italian,French", 2],
["Alice", "Woman", 32, 46, "I take my coffee with a good conversation.", [0, 2, 1, 0, 8, 0, 2, 3, 3, 2, 10], "Coffee,Hiking", "English,Italian,Spanish", 8],
["Emma", "Man", 43, 52, "Learning new dance steps and laughing at my mistakes.", [0, 1, 1, 2, 11, 3, 0, 0, 3, 2, 1], "Dancing,Art", "English", 2],
["Olivia", "Nonbinary", 55, 29, "I love cooking for friends on a weekend.", [4, 2, 2, 0, 13, 3, 3, 1, 3, 3, 7], "Cooking,Hiking,Coffee", "French", 7],
["Nora", "Woman", 32, 90, "Looking for a new view and good company.", [0, 1, 2, 1, 3, 0, 0, 1, 1, 6, 11], "Photography,Cooking,Dancing", "Arabic", 1],
["Freya", "Man", 27, 86, "I leave room in my week for drawing and new exhibitions.", [1, 0, 0, 0, 6, 5, 3, 2, 1, 3, 6], "Art,Hiking", "Swahili", 1],
["Iris", "Nonbinary", 72, 30, "Tell me which song I should listen to next.", [1, 3, 1, 3, 1, 4, 0, 0, 1, 6, 9], "Music,Dancing,Hiking,Gaming", "Swahili", 8],
["Ada", "Woman", 35, 48, "I enjoy a friendly game and an unhurried evening.", [2, 4, 3, 0, 13, 4, 4, 1, 0, 1, 0], "Gaming,Dancing", "German,Spanish", 7],
["Celine", "Man", 36, 42, "My ideal Sunday starts on a quiet trail.", [3, 3, 1, 0, 14, 2, 4, 1, 1, 4, 4], "Hiking,Cooking,Gaming,Music", "Arabic", 2],
["Elise", "Nonbinary", 69, 74, "Usually stopping to photograph something everyone else walked past.", [4, 1, 1, 3, 10, 4, 1, 0, 0, 5, 6], "Photography,Art", "German", 5],
["Margot", "Woman", 44, 96, "Always checking the listings for a live show.", [3, 3, 4, 4, 13, 4, 1, 0, 2, 3, 10], "Music,Photography", "German", 7],
["Camille", "Man", 53, 34, "", [1, 3, 3, 2, 9, 0, 3, 1, 1, 0, 0], "Coffee,Gaming,Photography,Dancing", "Arabic,English,German", 8],
["Lina", "Nonbinary", 68, 98, "My ideal Sunday starts on a quiet trail.", [0, 1, 2, 0, 11, 4, 0, 2, 0, 6, 7], "Hiking,Cooking,Music,Photography", "Swahili,English", 6],
["Nadia", "Woman", 31, 77, "I enjoy a friendly game and an unhurried evening.", [5, 0, 2, 1, 14, 1, 4, 3, 2, 2, 8], "Gaming,Photography,Cooking,Music", "Italian,Arabic", 2],
["Sara", "Man", 48, 67, "Usually stopping to photograph something everyone else walked past.", [2, 0, 1, 2, 3, 3, 2, 2, 1, 3, 10], "Photography,Hiking,Dancing", "Spanish", 7],
["Fatima", "Nonbinary", 62, 61, "Happy to spend an afternoon finding a new café.", [3, 0, 1, 2, 10, 1, 0, 2, 3, 5, 1], "Coffee,Photography,Cooking", "Swahili", 9],
["Yasmin", "Woman", 56, 119, "I enjoy a friendly game and an unhurried evening.", [4, 3, 0, 4, 5, 4, 0, 2, 3, 4, 2], "Gaming,Cooking,Hiking", "English", 9],
["Hannah", "Man", 63, 22, "My favourite evenings include music and a dance floor.", [3, 4, 2, 4, 0, 2, 2, 0, 3, 0, 8], "Dancing,Coffee,Music,Cooking", "German,Spanish,Italian", 7],
["Esther", "Nonbinary", 63, 92, "Always checking the listings for a live show.", [5, 0, 3, 0, 8, 0, 2, 1, 0, 2, 0], "Music,Art,Hiking", "Spanish,English,Swahili", 1],
["Naomi", "Woman", 47, 107, "I always pack extra snacks for a walk.", [0, 0, 3, 0, 6, 3, 4, 3, 1, 4, 8], "Hiking,Coffee", "Spanish,Swahili", 9],
["Grace", "Man", 41, 41, "I enjoy a friendly game and an unhurried evening.", [5, 1, 1, 1, 5, 0, 3, 3, 1, 4, 0], "Gaming,Coffee", "French,Swahili", 1],
["Ruth", "Nonbinary", 73, 52, "Currently perfecting my favourite family recipe.", [2, 1, 4, 0, 2, 1, 3, 3, 3, 4, 1], "Cooking,Gaming,Art,Coffee", "Spanish,English,Arabic", 8],
["Daniel", "Woman", 71, 51, "Currently perfecting my favourite family recipe.", [5, 4, 0, 3, 1, 0, 1, 1, 3, 3, 11], "Cooking,Art,Coffee,Dancing", "Arabic,German", 2],
["Gabriel", "Man", 73, 39, "My favourite evenings include music and a dance floor.", [0, 2, 2, 4, 2, 5, 4, 3, 0, 4, 7], "Dancing,Coffee,Hiking,Art", "Italian,Arabic,French", 3],
["Noah", "Nonbinary", 39, 105, "My ideal Sunday starts on a quiet trail.", [2, 3, 4, 2, 1, 1, 1, 0, 3, 0, 5], "Hiking,Gaming,Music,Coffee", "Arabic,French", 5],
["Adam", "Woman", 20, 93, "Always checking the listings for a live show.", [5, 2, 1, 3, 12, 5, 4, 3, 0, 3, 10], "Music,Hiking", "French,Swahili", 2],
["Ben", "Man", 55, 110, "My ideal Sunday starts on a quiet trail.", [2, 1, 3, 1, 5, 3, 1, 2, 1, 6, 2], "Hiking,Gaming,Photography", "Swahili", 6],
["David", "Nonbinary", 75, 81, "I love cooking for friends on a weekend.", [5, 1, 4, 4, 10, 4, 2, 0, 1, 2, 9], "Cooking,Gaming,Photography", "Swahili,French,Italian", 1],
["Isaac", "Woman", 52, 112, "Always checking the listings for a live show.", [0, 2, 1, 4, 6, 4, 0, 0, 3, 1, 0], "Music,Photography,Cooking", "French,Spanish", 1],
["Joshua", "Man", 37, 97, "Currently perfecting my favourite family recipe.", [2, 3, 0, 3, 4, 2, 1, 0, 0, 0, 2], "Cooking,Art,Coffee", "French,German", 6],
["Nathan", "Nonbinary", 46, 59, "", [4, 4, 3, 2, 3, 5, 1, 0, 0, 3, 11], "Photography,Art,Gaming", "Arabic,German,Swahili", 2],
["Oliver", "Woman", 36, 38, "Bring your favourite board game and I'll bring snacks.", [2, 1, 2, 2, 7, 0, 4, 1, 0, 0, 2], "Gaming,Music,Art,Dancing", "Italian,French,English", 9],
["Oscar", "Man", 71, 74, "A gallery visit followed by lunch is my kind of day.", [2, 1, 1, 3, 5, 4, 1, 3, 0, 0, 4], "Art,Dancing,Hiking,Coffee", "French,Swahili,Spanish", 1],
["Hugo", "Nonbinary", 47, 83, "My ideal Sunday starts on a quiet trail.", [5, 0, 3, 0, 2, 2, 3, 1, 3, 0, 5], "Hiking,Music,Cooking", "French,Arabic", 3],
["Louis", "Woman", 62, 40, "My ideal Sunday starts on a quiet trail.", [1, 2, 0, 2, 0, 3, 0, 3, 3, 5, 2], "Hiking,Photography,Coffee,Dancing", "Arabic,Swahili,French", 8],
["Julien", "Man", 54, 17, "Currently perfecting my favourite family recipe.", [0, 2, 0, 4, 12, 5, 4, 3, 2, 6, 5], "Cooking,Gaming,Hiking,Coffee", "French,Italian", 2],
["Antoine", "Nonbinary", 19, 15, "Looking for a new view and good company.", [1, 2, 1, 2, 14, 4, 3, 1, 2, 0, 8], "Photography,Coffee,Hiking", "Spanish", 9],
["Marc", "Woman", 61, 14, "Usually stopping to photograph something everyone else walked past.", [3, 2, 2, 3, 11, 0, 1, 1, 1, 4, 4], "Photography,Music", "Swahili", 5],
["Felix", "Man", 38, 118, "A gallery visit followed by lunch is my kind of day.", [2, 3, 0, 4, 11, 4, 3, 0, 2, 6, 1], "Art,Gaming,Dancing", "Swahili,German", 2],
["Finn", "Nonbinary", 26, 47, "Always checking the listings for a live show.", [5, 2, 2, 0, 12, 5, 1, 0, 2, 0, 3], "Music,Coffee,Dancing,Cooking", "Spanish,Italian,French", 4],
["Matteo", "Woman", 52, 67, "Looking for a new view and good company.", [4, 2, 2, 4, 4, 0, 4, 0, 2, 1, 2], "Photography,Music", "Swahili,French,Spanish", 2],
["Rafael", "Man", 34, 110, "Learning new dance steps and laughing at my mistakes.", [2, 3, 4, 2, 9, 0, 3, 1, 2, 2, 6], "Dancing,Art", "Arabic", 4],
["Diego", "Nonbinary", 31, 15, "My ideal Sunday starts on a quiet trail.", [1, 4, 4, 4, 0, 5, 2, 3, 1, 1, 3], "Hiking,Music", "Arabic,Italian,Spanish", 6],
["Pablo", "Woman", 29, 4, "My ideal Sunday starts on a quiet trail.", [2, 4, 0, 3, 8, 1, 2, 3, 3, 3, 11], "Hiking,Coffee", "French", 6],
["Karim", "Man", 40, 60, "Happy to spend an afternoon finding a new café.", [3, 1, 3, 0, 3, 3, 3, 1, 0, 3, 3], "Coffee,Hiking,Art,Music", "Italian", 2],
["Omar", "Nonbinary", 25, 55, "I leave room in my week for drawing and new exhibitions.", [0, 4, 3, 2, 1, 5, 1, 1, 2, 6, 4], "Art,Hiking,Music,Photography", "English", 7],
["Yusuf", "Woman", 60, 82, "Learning new dance steps and laughing at my mistakes.", [4, 2, 3, 1, 14, 3, 0, 0, 2, 5, 7], "Dancing,Art", "Arabic,French,Italian", 9],
["Ibrahim", "Man", 50, 11, "Learning new dance steps and laughing at my mistakes.", [3, 2, 4, 1, 0, 5, 2, 2, 1, 1, 11], "Dancing,Music,Gaming", "Italian,Spanish,Arabic", 4],
["Malik", "Nonbinary", 40, 120, "Always checking the listings for a live show.", [0, 2, 4, 1, 8, 5, 0, 3, 0, 2, 7], "Music,Dancing,Cooking,Coffee", "German,Swahili,Italian", 7],
["Kwame", "Woman", 75, 46, "", [1, 2, 3, 0, 13, 1, 4, 3, 1, 0, 10], "Photography,Art,Hiking,Coffee", "Spanish,Swahili,German", 9],
["Kofi", "Man", 70, 4, "Looking for a new view and good company.", [1, 3, 3, 1, 1, 5, 3, 2, 2, 2, 6], "Photography,Hiking,Dancing,Coffee", "French,English", 1],
["Alex", "Nonbinary", 47, 94, "Learning new dance steps and laughing at my mistakes.", [0, 4, 2, 4, 3, 2, 1, 0, 0, 0, 11], "Dancing,Gaming", "Spanish,German", 8],
["Riley", "Woman", 45, 120, "I take my coffee with a good conversation.", [3, 3, 4, 2, 9, 5, 1, 3, 2, 1, 0], "Coffee,Cooking,Photography", "English", 3],
["Taylor", "Man", 29, 110, "I always pack extra snacks for a walk.", [1, 0, 4, 1, 9, 5, 3, 1, 3, 2, 1], "Hiking,Music", "French", 5],
["Morgan", "Nonbinary", 43, 12, "I enjoy a friendly game and an unhurried evening.", [4, 2, 1, 3, 8, 5, 2, 3, 2, 1, 5], "Gaming,Dancing", "French,Arabic", 2],
["Avery", "Woman", 19, 75, "Looking for a new view and good company.", [5, 3, 4, 1, 9, 2, 0, 0, 0, 1, 3], "Photography,Gaming", "Italian", 6],
["Jordan", "Man", 60, 12, "Usually stopping to photograph something everyone else walked past.", [5, 0, 2, 0, 7, 2, 0, 1, 1, 2, 9], "Photography,Dancing,Music,Hiking", "German,Arabic", 4],
["Casey", "Nonbinary", 71, 98, "I leave room in my week for drawing and new exhibitions.", [3, 0, 0, 3, 13, 0, 2, 1, 1, 5, 4], "Art,Dancing,Gaming", "Arabic,French,Italian", 5],
["Quinn", "Woman", 27, 31, "Happy to spend an afternoon finding a new café.", [5, 1, 3, 0, 10, 3, 0, 2, 2, 3, 9], "Coffee,Cooking,Photography,Hiking", "Arabic,German,French", 1],
["Robin", "Man", 72, 60, "My ideal Sunday starts on a quiet trail.", [3, 0, 0, 1, 6, 2, 1, 3, 2, 5, 1], "Hiking,Coffee", "Arabic,Italian", 5],
["Sky", "Nonbinary", 32, 33, "Bring your favourite board game and I'll bring snacks.", [4, 3, 0, 4, 2, 2, 4, 0, 1, 4, 6], "Gaming,Art,Cooking,Music", "German,English", 4],
["Drew", "Woman", 70, 33, "I enjoy a friendly game and an unhurried evening.", [0, 3, 2, 1, 7, 1, 2, 0, 1, 6, 6], "Gaming,Art,Dancing,Coffee", "French,German,English", 4],
["Charlie", "Man", 18, 91, "I take my coffee with a good conversation.", [5, 0, 3, 0, 11, 2, 2, 0, 2, 5, 0], "Coffee,Cooking", "Swahili,German,French", 5],
["Jamie", "Nonbinary", 27, 77, "I love cooking for friends on a weekend.", [4, 1, 4, 0, 11, 3, 4, 3, 0, 0, 5], "Cooking,Music,Coffee", "Swahili,German,Spanish", 8],
["Rowan", "Woman", 30, 27, "I leave room in my week for drawing and new exhibitions.", [4, 4, 4, 3, 9, 1, 0, 3, 0, 1, 2], "Art,Music", "German,English,Swahili", 9],
["Sage", "Man", 18, 50, "Happy to spend an afternoon finding a new café.", [2, 0, 4, 2, 2, 1, 1, 2, 3, 6, 4], "Coffee,Dancing,Hiking", "English,Italian", 6],
["Emerson", "Nonbinary", 75, 110, "I love cooking for friends on a weekend.", [4, 4, 2, 1, 1, 4, 0, 2, 1, 2, 2], "Cooking,Hiking", "Italian,English", 4],
["Arden", "Woman", 55, 95, "Tell me which song I should listen to next.", [3, 4, 1, 1, 0, 4, 4, 2, 3, 5, 6], "Music,Hiking,Photography", "German,Arabic", 1],
["River", "Man", 74, 16, "", [5, 4, 4, 3, 1, 4, 4, 0, 3, 3, 5], "Hiking,Photography", "English,Spanish", 1],
["Eden", "Nonbinary", 48, 84, "Tell me which song I should listen to next.", [1, 1, 3, 0, 6, 1, 2, 2, 0, 1, 8], "Music,Art,Coffee", "German", 9],
["Ash", "Woman", 70, 18, "Learning new dance steps and laughing at my mistakes.", [2, 4, 1, 2, 7, 1, 1, 0, 3, 5, 3], "Dancing,Gaming", "French,Spanish", 8],
["Cameron", "Man", 64, 49, "Always checking the listings for a live show.", [0, 0, 3, 3, 8, 0, 1, 2, 0, 2, 9], "Music,Cooking", "English,German", 9],
["Remy", "Nonbinary", 51, 5, "Usually stopping to photograph something everyone else walked past.", [1, 0, 1, 0, 3, 4, 2, 2, 0, 4, 10], "Photography,Music", "Spanish", 3],
["Sasha", "Woman", 67, 86, "Happy to spend an afternoon finding a new café.", [1, 0, 1, 4, 6, 1, 4, 2, 1, 3, 9], "Coffee,Hiking", "Spanish,German", 5],
["Ari", "Man", 60, 98, "I love cooking for friends on a weekend.", [4, 4, 2, 2, 12, 2, 4, 1, 3, 6, 9], "Cooking,Coffee,Photography", "Arabic,English,Swahili", 1],
["Ellis", "Nonbinary", 70, 111, "Always checking the listings for a live show.", [1, 1, 4, 1, 7, 3, 1, 2, 1, 6, 6], "Music,Art,Hiking,Dancing", "Swahili,German,Arabic", 5],
["Phoenix", "Woman", 71, 20, "I take my coffee with a good conversation.", [2, 1, 4, 3, 4, 2, 3, 1, 1, 3, 7], "Coffee,Gaming,Photography,Art", "German,Arabic,French", 7],
["Reese", "Man", 61, 63, "Always checking the listings for a live show.", [5, 0, 0, 3, 5, 1, 3, 3, 2, 5, 5], "Music,Hiking,Cooking,Photography", "German,Italian,English", 2],
["Blair", "Nonbinary", 35, 115, "My favourite evenings include music and a dance floor.", [0, 0, 2, 2, 2, 1, 4, 1, 3, 4, 8], "Dancing,Photography,Hiking", "English,Italian,German", 4],
["Lane", "Woman", 23, 88, "Always checking the listings for a live show.", [0, 3, 3, 4, 14, 0, 0, 1, 1, 4, 8], "Music,Cooking,Coffee,Dancing", "Arabic", 2],
["Jules", "Man", 72, 52, "Learning new dance steps and laughing at my mistakes.", [0, 3, 2, 4, 8, 3, 4, 2, 2, 3, 1], "Dancing,Music,Coffee", "Swahili", 9],
["Lara", "Nonbinary", 52, 90, "My favourite evenings include music and a dance floor.", [4, 4, 2, 1, 12, 5, 0, 3, 3, 5, 1], "Dancing,Gaming,Cooking", "French,Swahili", 2],
["Eva", "Woman", 27, 59, "Happy to spend an afternoon finding a new café.", [1, 0, 0, 4, 6, 1, 1, 1, 2, 6, 3], "Coffee,Cooking,Photography", "French,Italian", 9],
["Mila", "Man", 39, 87, "Looking for a new view and good company.", [1, 4, 3, 4, 4, 5, 2, 3, 3, 2, 2], "Photography,Art", "Swahili,German", 2],
["Anika", "Nonbinary", 69, 81, "Currently perfecting my favourite family recipe.", [5, 2, 0, 2, 13, 1, 0, 2, 2, 1, 4], "Cooking,Dancing,Music,Art", "French", 8],
["Talia", "Woman", 64, 72, "Looking for a new view and good company.", [4, 3, 3, 1, 2, 2, 3, 2, 2, 6, 11], "Photography,Gaming,Cooking,Hiking", "English,German", 5],
["Esme", "Man", 62, 89, "My favourite evenings include music and a dance floor.", [4, 4, 1, 2, 0, 3, 3, 1, 0, 1, 3], "Dancing,Gaming,Hiking,Photography", "Arabic,French", 3],
["Luisa", "Nonbinary", 53, 33, "", [1, 1, 4, 3, 7, 2, 3, 2, 2, 5, 0], "Photography,Coffee", "German", 2],
["Simone", "Woman", 72, 53, "I love cooking for friends on a weekend.", [3, 1, 0, 2, 3, 2, 0, 0, 0, 0, 4], "Cooking,Hiking,Coffee,Dancing", "Italian,Swahili,English", 2],
["Selma", "Man", 28, 12, "Tell me which song I should listen to next.", [3, 1, 2, 3, 0, 1, 4, 2, 2, 1, 8], "Music,Dancing", "Arabic", 9],
["Dalia", "Nonbinary", 21, 33, "I enjoy a friendly game and an unhurried evening.", [3, 3, 3, 1, 4, 2, 2, 2, 0, 0, 3], "Gaming,Art", "German", 7],
["Sienna", "Woman", 65, 75, "My favourite evenings include music and a dance floor.", [2, 4, 0, 3, 10, 3, 1, 3, 3, 4, 1], "Dancing,Photography,Hiking,Art", "English", 1]
];
const people=rows.map(([name,gender,age,km,bio,indices,interests,languages,photos])=>({
 name,gender,age,km,bio,photos,Interests:interests.split(','),Languages:languages.split(','),
 ...Object.fromEntries(fields.map((f,i)=>[f,options[f][indices[i]]]))
}));
// Explicit prototype assumptions. Unlisted categorical pairs offer no partial credit.
const neighbours={
 "Relationship goal":[[0,1,.8],[1,2,.6],[2,3,.8],[0,2,.35],[1,3,.35]],
 "Family plans":[[0,1,.75],[3,4,.75]],
 "Communication":[[1,2,.65]],"Drinking":[[0,1,1],[3,4,.6],[4,5,.35]],
 "Smoking":[[1,2,.75]],"Pets":[[6,13,.7]]
};
function degree(field,desired,person){
 const actual=person[field];
 if(field==="Age" || field==="Distance" || field==="Photos"){
   let gap, tolerance;
   if(field==="Age"){gap=Math.max(desired[0]-person.age,person.age-desired[1],0); tolerance=5}
   if(field==="Distance"){gap=Math.max(0,person.km-desired); tolerance=20}
   if(field==="Photos"){gap=Math.max(0,desired-person.photos); tolerance=3}
   return [Math.max(0,1-gap/tolerance),Number(gap===0)];
 }
 if(field==="Bio") return [Number(!!person.bio),Number(!!person.bio)];
 if(Array.isArray(actual)){
   const count=desired.filter(v=>actual.includes(v)).length;
   return [count/desired.length,Number(count===desired.length)];
 }
 if(actual===desired)return [1,1];
 const a=options[field].indexOf(actual), b=options[field].indexOf(desired);
 if(field==="Workout")return [1-Math.abs(a-b)/3,0];
 for(const [x,y,val] of neighbours[field]||[]){
   if((a===x&&b===y)||(a===y&&b===x))return [val,0];
 }
 return [0,0];
}
// Zero-order Sugeno rules. Triangular low/medium/high memberships sum to one.
// Joint rule strength is the product of memberships for top-priority fit and overall fit.
function membership(x){return [Math.max(0,1-2*x),1-Math.abs(2*x-1),Math.max(0,2*x-1)]}

// Rank-sum weights: first of n preferences receives n points, last receives 1.
// Shared by both methods. Deal-breakers require exact satisfaction in both lists.
function rank(prefs, gender, priorities = Object.keys(prefs), dealbreakers = []) {
  const keys = Object.keys(prefs);
  if (!keys.length) return [];
  const ordered = [...new Set(priorities.filter(key => keys.includes(key)))];
  keys.forEach(key => { if (!ordered.includes(key)) ordered.push(key); });
  const outputs = [[0, 15, 35], [20, 50, 70], [40, 80, 100]];
  return people.filter(p => gender === "Everyone" || p.gender === gender).map(p => {
    const details = ordered.map((field, index) => ({
      field, weight: ordered.length - index, fit: degree(field, prefs[field], p)
    }));
    const weightSum = details.reduce((sum, d) => sum + d.weight, 0);
    const average = method => details.reduce((sum, d) => sum + d.weight * d.fit[method], 0) / weightSum;
    // The weakest fit among the top three prevents compensation by minor criteria.
    const priorityFit = Math.min(...details.slice(0, 3).map(d => d.fit[0]));
    const priorityMemberships = membership(priorityFit);
    const overallMemberships = membership(average(0));
    const fuzzy = outputs.reduce((sum, row, i) => sum + row.reduce(
      (subtotal, output, j) => subtotal + priorityMemberships[i] * overallMemberships[j] * output, 0), 0);
    const failed = details.filter(d => dealbreakers.includes(d.field) && d.fit[1] !== 1).map(d => d.field);
    return {p, fuzzy, strict: 100 * average(1), details, failed};
  });
}
