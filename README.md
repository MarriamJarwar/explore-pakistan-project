Explore Pakistan - AI Travel Portal 🏔️

Explore Pakistan ek modern, responsive aur feature-rich web application hai jo Next.js 14 (App Router) aur Tailwind CSS par banayi gayi hai. Yeh portal users ko Pakistan ke haseen tareen maqamaat dhoondhne aur unki details janne mein madad karta hai. Saath hi, isme ek smart AI Travel Assistant (Safar-Guide AI) laga hai jo Google Gemini API ke zariye real-time travel queries ke jawab deta hai.

🌟 Key Features

Responsive Layout: Mobile, tablet, aur desktop par 100% responsive design (No horizontal scrolling).

Dynamic Categories: Northern Areas, Cultural, Beaches, aur Adventure spots ke liye interactive filter controls.

Search Functionality: Real-time search filter destinations dhoondhne ke liye.

Dynamic 5-Day Itineraries: Har spot ke liye detailed modal jisme route guide, itinerary aur safe travel tips shamil hain.

Gemini Powered Chatbot: Safar-Guide AI Assistant jo dastyab packages aur guides par Roman Urdu/Hindi mein baat karta hai.

Dynamic API Key Settings: Chatbot panel ke andar hi direct API Key input karne ki rangeen aur secure settings screen.

🛠️ Tech Stack

Frontend: Next.js 14 (React), Tailwind CSS, Lucide Icons.

AI Integration: Google Gemini API (gemini-2.5-flash model).

Language: TypeScript.

🔑 Gemini API Key Configuration

Safar-Guide AI Chatbot ko live chalane ke liye do (2) aasan tareeqay hain:

Tareeqa A (Direct Input - Behad Aasan):

Project ko local run karein: npm run dev

Browser mein open karein: http://localhost:3000

Bottom-right corner par green color ka Chat Bubble button click karke chatbot kholin.

Chatbot window ke sab se upar black-green bar mein apni Gemini API Key (AIzaSy... se shuru hone wali) paste karke save kar dein.

Key local storage mein save ho jayegi aur chatbot live kaam karna shuru kar dega!

Tareeqa B (Code Configuration):

VS Code mein app/page.tsx file kholin.

Line #11 par const apiKey = ""; ke andar apni key paste kar dein:

const apiKey = "AIzaSyA_Aapki_Sahi_Key_Yahan";


File ko save (Ctrl + S) karein aur chalayein!

🚀 How To Run Locally

Project dependencies install karein:

npm install


Development server chalayein:

npm run dev


Browser mein open karein: http://localhost:3000

Built as an Artificial Intelligence Class Project under Ma'am Mahnoor. 🎓