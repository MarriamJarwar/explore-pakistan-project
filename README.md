Here is the English translation of your project documentation, formatted professionally for your repository or project submission.

Explore Pakistan - AI Travel Portal 🏔️
Explore Pakistan is a modern, responsive, and feature-rich web application built using Next.js 14 (App Router) and Tailwind CSS. This portal helps users discover Pakistan's most beautiful destinations and explore their details. Additionally, it features a smart AI Travel Assistant (Safar-Guide AI) powered by the Google Gemini API to provide real-time answers to travel queries.

🌟 Key Features
Responsive Layout: 100% responsive design across mobile, tablet, and desktop views (Zero horizontal scrolling).

Dynamic Categories: Interactive filter controls for Northern Areas, Cultural sites, Beaches, and Adventure spots.

Search Functionality: Real-time search filters to find destinations instantly.

Dynamic 5-Day Itineraries: Detailed modals for each spot, including route guides, itineraries, and safe travel tips.

Gemini-Powered Chatbot: Safar-Guide AI Assistant that interacts in Roman Urdu/Hindi regarding available packages and guides.

Dynamic API Key Settings: A colorful and secure settings screen directly inside the chatbot panel for easy API Key input.

🛠️ Tech Stack
Frontend: Next.js 14 (React), Tailwind CSS, Lucide Icons

AI Integration: Google Gemini API (gemini-2.5-flash model)

Language: TypeScript

🔑 Gemini API Key Configuration
There are two (2) easy ways to activate the Safar-Guide AI Chatbot:

Method A (Direct Input - Easiest)
Run the project locally: npm run dev

Open your browser and navigate to: http://localhost:3000

Click the green Chat Bubble button in the bottom-right corner to open the chatbot.

Paste your Gemini API Key (starting with AIzaSy...) into the top black-green settings bar of the chatbot window and click save.

The key will be saved securely to your local storage, and the chatbot will immediately go live!

Method B (Code Configuration)
Open the app/page.tsx file in VS Code.

Paste your key on Line #11 inside the const apiKey = ""; variable:

TypeScript
const apiKey = "AIzaSyA_Your_Actual_Key_Here";
3. Save the file (`Ctrl + S`) and run the application.

---

## 🚀 How To Run Locally

1. Install project dependencies:
   ```bash
   npm install
Start the development server:

npm run dev


3. Open your browser and go to: `http://localhost:3000`

---

> 🎓 **Project Note:** Built as an Artificial Intelligence Class Project under the guidance of **Ma'am Mahnoor**.