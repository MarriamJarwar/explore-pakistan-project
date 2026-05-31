'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, MapPin, Search, Navigation, Filter, Phone, 
  Mail, User, Send, CheckCircle, MessageSquare, X, 
  Sparkles, Clock, Calendar, ShieldAlert, ArrowRight, Map
} from 'lucide-react';

// ================= GEMINI API SETUP =================
const apiKey = ""; 

// System prompt to guide Gemini's behavior
const SYSTEM_PROMPT = `
I am Safar-Guide AI, your friendly and knowledgeable Pakistani Travel Assistant! 🏔️✨ 
My mission is to provide users with the best travel advice, itineraries, hotel recommendations, routes, and local tips for exploring Pakistan. 🏔️🚗✨
Always communicate in a friendly mix of Roman Urdu/Hindi (Urdu in English script) and a bit of English.
Keep your responses short, structured (in bullet points), and highly readable.
Use plenty of beautiful emojis (🏔️, 🚗, 🏨, 🥘, 🌟) so that the user finds it enjoyable to read. 😊✨
`;

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'destinations' | 'about' | 'contact'>('home');
  const [destinationFilter, setDestinationFilter] = useState<'all' | 'north' | 'south' | 'cultural' | 'adventure'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected Destination for Modal (Task 005)
  const [selectedDest, setSelectedDest] = useState<any | null>(null);

  // Chatbot State (Task 007)
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Assalam-o-Alaikum! 🏔️ I am your Safar-Guide AI. Where would you like to travel in Pakistan? Feel free to ask me anything! 🌟' }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Destinations Detailed Data (Itinerary & Routes included for Task 005)
  const destinations = [
    {
      id: 'hunza',
      title: 'Hunza Valley',
      category: 'north',
      rating: '4.9',
      location: 'Gilgit-Baltistan',
      desc: 'Hunza Valley, nestled in the shadow of the Rakaposhi mountain, is a heavenly paradise known for its beautiful lakes, orchards, and ancient culture. 🏔️✨🍎',
      bestTime: 'March - October',
      imageBg: 'bg-emerald-900',
      itinerary: [
        'Day 1: Travel from Islamabad via Chilas or Naran and stay there for the night. 🚗🏨',
        'Day 2: Arrival in Hunza Valley, followed by a visit to Karimabad Bazaar and Altit Fort. 🏔️✨',
        'Day 3:Boating at Attabad Lake and adventure at the Hussaini Suspension Bridge. 🚣‍♂️🌉',
        'Day 4: Trip to Khunjerab Pass (China Border) and return to Karimabad for the night. 🇨🇳❄️',
        'Day 5:Return journey while stopping at the Rakaposhi viewpoint. 🏔️🚗'
      ],
      routes: 'Islamabad -> Karakoram Highway -> Chilas -> Gilgit -> Hunza.',
      tips: 'Even in summer, it gets a bit chilly, so keep a light jacket with you.Confirm the boating rates at Attabad Lake in advance. 🚣‍♂️💰'
    },
    {
      id: 'skardu',
      title: 'Skardu Valley',
      category: 'north',
      rating: '4.8',


      location: 'Gilgit-Baltistan',
      
      desc: 'The route to the world highest mountains The Cold Desert, Shangrila Lake and ancient forts here are well worth seeing.',



      bestTime: 'June - September',
      imageBg: 'bg-teal-900',
      itinerary: [
        'Day 1: Flight to Gilgit or Skardu (or travel by road), and check-in at Shangrila Resort..',
        'Day 2: Visit to Upper Kachura Lake and enjoying local trout fish..',
        'Day 3: ATV ride in the Sarfaranga Cold Desert and a tour of Shigar Fort.',
        'Day 4: Visit to Deosai National Park (the second-highest plateau in the world).',
        'Day 5: Shopping for dry fruits at Skardu bazaar and returning home.'
      ],
      routes: 'Direct flight from Islamabad or the Juglot-Skardu road via the Karakoram Highway.',
      tips: 'A 4x4 Prado/Jeep is necessary to explore Deosai. The road is completely closed during the winter.'
    },
    {
      id: 'swat',
      title: 'Swat Valley',
      category: 'adventure',
      rating: '4.7',
      location: 'Khyber Pakhtunkhwa',
      desc: 'Switzerland of the East! Swat Valley is very famous for its green meadows, flowing rivers, and the Malam Jabba ski resort.',
      bestTime: 'All year round (snow in winter, pleasant weather in summer).',
      imageBg: 'bg-cyan-950',
      itinerary: [
        'Day 1: Arrival in Mingora via Swat Motorway and a visit to the White Palace in Marghazar.',
        'Day 2: Chairlift ride and zipline adventure at the Malam Jabba Ski Resort.',
        'Day 3: Journey to Kalam Valley, with views of Ushu Forest and the flowing Swat River.',
        'Day 4: Jeep safari trip to Mahodand Lake and enjoying camping there.',
        'Day 5: Shopping for Swat famous emeralds  and shawls, followed by the return trip..'
      ],
      routes: 'M1 Motorway -> Swat Expressway -> Mingora -> Kalam.',
      tips: 'Get tickets for the adventure rides in Malam Jabba from the counter. The road to Mahodand Lake only opens during the summer..'
    },
    {
      id: 'lahore',
      title: 'Badshahi Mosque & Walled City',
      category: 'cultural',
      rating: '4.9',
      location: 'Punjab',
      desc: 'The most beautiful historical landmark of the Mughal era. Lahore Fort (Shahi Qila) and the old streets are a reflection of our unparalleled culture.',
      bestTime: 'October - March (Cool weather)',
      imageBg: 'bg-amber-950',
      itinerary: [
        'Day 1: Visit to the Badshahi Mosque, Lahore Fort (Shahi Qila), and the Palace of Mirrors (Sheesh Mahal).',
        'Day 2: A colorful tour of the Walled City (Androon Lahore) and Delhi Gate.',
        'Day 3: Visit to Shalimar Gardens and the magnificent flag-lowering ceremony at the Wagah Border.',
        'Day 4: Enjoying Dahi Bhallay and Nihari at the Lahore Museum and Anarkali Food Street..'
      ],
      routes: 'Direct exit to Lahore from the M2 Motorway or the Orange Line Metro..',
      tips: 'It is better to travel by local rickshaw or on foot to explore the old city (Androon Shehar). Do try the local traditional food at Food Street!'
    },
    {
      id: 'gwadar',
      title: 'Gwadar Port & Hammerhead',
      category: 'south',
      rating: '4.6',
      location: 'Balochistan',
      desc: 'Beautiful blue ocean and unique rocky cliffs! One is left amazed after seeing Gwadar Beach and the Sphinx Rock.',
      bestTime: 'November - February',
      imageBg: 'bg-blue-950',
      itinerary: [
        'Day 1: Excursion to Kund Malir Beach and Princess of Hope via the Makran Coastal Highway.',
        'Day 2: Arrival at Gwadar Port and enjoying an incomparable sunset view at Koh-e-Batil.',
        'Day 3: A drive along Marine Drive and a fresh seafood party from the local fish market.',
        'Day 4: A stopover at Ormara Beach on the way back, followed by a return to Karachi..'
      ],
      routes: 'Karachi -> Makran Coastal Highway -> Gwadar.',
      tips: 'Fuel stations are scarce on the highway, so keep your tank full beforehand. Mobile signals are only reliable within the main city.'
    },
    {
      id: 'mohenjo',
      title: 'Mohenjo-daro',
      category: 'cultural',
      rating: '4.5',
      location: 'Sindh',
      desc: 'The center of the 5000-year-old Indus Valley Civilization. One of the oldest and most well-planned cities in the world.',
      bestTime: 'November - March',
      imageBg: 'bg-yellow-950',
      itinerary: [
        'Day 1: Arrival in Larkana and check-in at the Mohenjo-daro archaeological site.',
        'Day 2: Exploration of the Great Bath, SD Area, and observation of artifacts discovered in the local museum.',
        'Day 3: Interesting information from guides about the King Priest and the Dancing Girl.',
        'Day 4: Experiencing local Sindhi culture and food, followed by the return trip.'
      ],
      routes: 'Travel via National Highway from Karachi to Larkana or take a flight. Tips: Do not travel in hot weather. Keep a water bottle with you and be sure to carry sunglasses or a hat to protect yourself from the sun.'
    }
  ];

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  // Exponential backoff API call helper for Gemini API (Task 007 Requirement)
  const callGeminiAPI = async (userQuery: string, history: typeof messages) => {
    // Explicit return block standard syntax to avoid parsing error in standard TSX compilers
    const formattedHistory = history.map((msg) => {
      return {
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      };
    });

    // Add current query
    formattedHistory.push({
      role: 'user',
      parts: [{ text: userQuery }]
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
      contents: formattedHistory,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      }
    };

    let delay = 1000;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          return responseText;
        }
        throw new Error("Invalid response format");
      } catch (error) {
        if (attempt === 5) {
          throw error; // All retries failed
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Double the wait time
      }
    }
  };

  // Handle chatbot submit (Task 007)
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isBotTyping) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsBotTyping(true);

    try {
      const reply = await callGeminiAPI(userMessage, messages);
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry! There is a slight connection issue. You can ask your question again or check your internet connection. 🔌⚠️' 
      }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Filter Logic
  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = destinationFilter === 'all' || dest.category === destinationFilter;
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setFormSubmitted(true);
      setTimeout(() => {
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setFormSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
      
      {/* Quick Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-slate-100 py-2 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 flex gap-4 overflow-x-auto justify-center md:justify-start">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${activeTab === 'home' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Home Screen
          </button>
          <button 
            onClick={() => setActiveTab('destinations')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${activeTab === 'destinations' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Destinations Grid ({destinations.length})
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${activeTab === 'about' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            About Us (Group Details)
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${activeTab === 'contact' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Contact & Support
          </button>
        </div>
      </div>

      {/* ================= HOME PAGE ================= */}
      {activeTab === 'home' && (
        <div>
          {/* Hero Section */}
          <header className="relative bg-emerald-950 text-white py-24 px-6 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-800/40 via-emerald-950 to-emerald-950 opacity-90 z-0"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-6">
                <Compass className="w-3.5 h-3.5 animate-spin" /> Pakistan Ki Khoobsurat Sair
              </span>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                Explore <span className="text-emerald-400">Pakistan</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
               Breathtaking valleys, high mountains, beautiful lakes, and our hospitality! Let's plan your next trip together. 🏔️✨✈️
              </p>

              {/* Search bar redirection */}
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-slate-600 flex-1">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Hunza, Skardu, Lahore dhoondein..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setActiveTab('destinations')}
                    className="bg-transparent border-none outline-none text-sm w-full focus:ring-0 text-slate-800"
                  />
                </div>
                <button 
                  onClick={() => setActiveTab('destinations')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all shadow-md active:scale-95"
                >
                  Explore Grid
                </button>
              </div>
            </div>
          </header>

          {/* Featured Places Section */}
          <main className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Mashhoor Maqamaat 🏔️
              </h2>
              <p className="text-slate-500 mt-2">
             Travelers' most favorite and beautiful spots (Click "Read More" to view complete guide)
              </p>
            </div>

            {/* Top 3 spots cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {destinations.slice(0, 3).map((dest) => (
                <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className={`h-48 ${dest.imageBg} flex items-center justify-center text-white relative`}>
                      <span className="font-black text-xl tracking-wide">{dest.title}</span>
                      <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-xs px-2.5 py-1 rounded-full font-semibold">
                        ⭐ {dest.rating}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mb-2">
                        <MapPin className="w-3.5 h-3.5" /> {dest.location}
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {dest.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Time: {dest.bestTime}</span>
                      <button 
                        onClick={() => setSelectedDest(dest)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 transition-all"
                      >
                        Mazeed Parhein <Navigation className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Promo Banner */}
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-850 text-white rounded-3xl p-8 md:p-12 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold mb-2">Are you facing any difficulty in planning your trip? 🚗🏔️</h3>
                <p className="text-slate-300 text-sm">Ask our Safar-Guide AI Chatbot live below and get your tour designed instantly! 🌟✈️</p>
              </div>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-emerald-900 hover:bg-slate-100 font-extrabold text-sm px-6 py-3 rounded-full transition-all shrink-0 shadow-lg active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" /> Start Chat With AI
              </button>
            </div>
          </main>
        </div>
      )}

      {/* ================= DESTINATIONS PAGE ================= */}
      {activeTab === 'destinations' && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-8 mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Sair-o-Tafreeh ke Maqamaat</h1>
              <p className="text-slate-500 text-sm mt-1">Apne agle khoobsurat safar ke liye filter select karein</p>
            </div>
            
            {/* Real-time search bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 w-full md:w-80 shadow-sm">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Name ya location likhein..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 text-slate-800"
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" /> Filter By:
            </span>
            <button 
              onClick={() => setDestinationFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${destinationFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              Sab Maqamaat
            </button>
            <button 
              onClick={() => setDestinationFilter('north')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${destinationFilter === 'north' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              Shumali Areas
            </button>
            <button 
              onClick={() => setDestinationFilter('cultural')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${destinationFilter === 'cultural' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              Tareekhi/Saqafati
            </button>
            <button 
              onClick={() => setDestinationFilter('south')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${destinationFilter === 'south' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              Beaches & South
            </button>
            <button 
              onClick={() => setDestinationFilter('adventure')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${destinationFilter === 'adventure' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              Adventure Spots
            </button>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredDestinations.map((dest) => (
                <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className={`h-48 ${dest.imageBg} flex items-center justify-center text-white relative`}>
                      <span className="font-black text-xl tracking-wide text-center px-4">{dest.title}</span>
                      <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-xs px-2.5 py-1 rounded-full font-semibold">
                        ⭐ {dest.rating}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mb-2">
                        <MapPin className="w-3.5 h-3.5" /> {dest.location}
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {dest.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Mausam: {dest.bestTime}</span>
                      <button 
                        onClick={() => setSelectedDest(dest)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                      >
                        Mazeed Parhein <Navigation className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-400 text-sm">The location you searched for is not available. Please try entering another name! 🗺️🔍</p>
              <button 
                onClick={() => { setSearchQuery(''); setDestinationFilter('all'); }} 
                className="mt-4 text-xs font-bold text-emerald-600 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= ABOUT US PAGE ================= */}
      {activeTab === 'about' && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">About Us 🌟 (Group Info)</h1>
            <p className="text-slate-500 mt-2">AI Class Project under Ma'am Mahnoor 🎓</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-emerald-100 text-emerald-700 p-4 rounded-xl shrink-0">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Member 1</h3>
                <p className="text-xs text-emerald-600 font-semibold mb-2">Marriam Jarwar</p>
                <p className="text-xs text-slate-500 mb-4">BSc Computer Science student 🎓Working on Next.js, Tailwind, and Python AI applications 💻🚀</p>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded-full uppercase">Roll No: CSC-21F-059</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-emerald-100 text-emerald-700 p-4 rounded-xl shrink-0">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Member 2</h3>
                <p className="text-xs text-emerald-600 font-semibold mb-2">Munaza</p>
                <p className="text-xs text-slate-500 mb-4">Working on FastAPI implementation, Gemini integration, and Qdrant Cloud dynamic search database design 🚀⚙️</p>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded-full uppercase">Roll No: BSE-23S-02</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Project Overview</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              This project is built using Next.js 14 and Tailwind CSS. 💻✨
              We have integrated a live AI Travel Chatbot that uses the Gemini API to guide users in real-time. 🤖🗺️
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full">Next.js 14</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full">Tailwind CSS</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full">TypeScript</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full">Gemini Pro API</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACT PAGE ================= */}
      {activeTab === 'contact' && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hamare Sath Rabta Karein</h1>
            <p className="text-slate-500 mt-2">Hum har waqt aapke sawalon ka jawab dene ke liye hazir hain</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Call ya WhatsApp</h4>
                  <p className="text-slate-800 text-sm font-semibold mt-1">+92 300 1234567</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email Karein</h4>
                  <p className="text-slate-800 text-sm font-semibold mt-1">support@explorepakistan.pk</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Apna Message Bheinjein ✉️</h3>
              
              {formSubmitted ? (
                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl flex items-center gap-3 border border-emerald-100 animate-fadeIn">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Shukriya! Message chala gaya.</h4>
                    <p className="text-xs text-emerald-600 mt-0.5">Hamari team jald hi aap se email par rabta karegi.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Aapka Naam</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Naam likhein..." 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Email likhein..." 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Apna Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Message likhein..." 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    Send Message <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= DYNAMIC DETAIL MODAL (Task 005) ================= */}
      {selectedDest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-scaleIn">
            
            {/* Header Banner */}
            <div className={`p-8 ${selectedDest.imageBg} text-white relative`}>
              <button 
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                  ⭐ {selectedDest.rating} Rating
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                  {selectedDest.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black">{selectedDest.title}</h2>
              <p className="text-slate-200 text-xs mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {selectedDest.location}
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 flex flex-col gap-6">
              
              {/* About description */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600" /> Mukhtasir Bayan (Overview)
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">{selectedDest.desc}</p>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" /> 5-Day Safarnama (Itinerary)
                </h3>
                <ul className="flex flex-col gap-2">
                  {selectedDest.itinerary.map((day: string, idx: number) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[10px] shrink-0 mt-0.5">DAY {idx+1}</span>
                      <span>{day}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Routes & Maps */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Map className="w-4 h-4 text-emerald-600" /> Sifarish Karda Rasta (Route Map)
                </h3>
                <p className="text-xs text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{selectedDest.routes}</span>
                </p>
              </div>

              {/* Pro Tips */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-emerald-600" /> Safe Travel Tips
                </h3>
                <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-100">
                  ⚠️ {selectedDest.tips}
                </p>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 rounded-b-3xl">
              <button 
                onClick={() => setSelectedDest(null)}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
              >
                Close Window
              </button>
              <button 
                onClick={() => {
                  setSelectedDest(null);
                  setIsChatOpen(true);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Ask Chatbot About This
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= AI TRAVEL CHATBOT OVERLAY (Task 007) ================= */}
      
      {/* Chatbot Toggle Bubble Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-transform active:scale-90 hover:scale-105 flex items-center justify-center border border-emerald-500"
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat window panel */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[480px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between animate-scaleIn">
          
          {/* Top Panel Bar */}
          <div className="bg-emerald-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                <Compass className="w-4 h-4 animate-spin" />
              </div>
              <div>
                <h3 className="text-xs font-bold flex items-center gap-1.5">
                  Safar-Guide AI <Sparkles className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                </h3>
                <p className="text-[10px] text-emerald-300">Google Gemini Powered Assistant</p>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-sm whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 border border-slate-200 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleChatSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask anything (e.g. Hunza kab jana chahiye?)..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 text-slate-800"
            />
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}