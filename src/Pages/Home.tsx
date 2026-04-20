import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useDarkMode } from "@/context/DarkModeContext";

export default function Home() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");

  const streak = Number(localStorage.getItem("currentStreak") || 0);
  const user = JSON.parse(localStorage.getItem("userProfile") || "null");
  const name = user?.name || "Guest";

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const cards = [
    { title: "📘 Learn", desc: "Alphabets, numbers & words", path: "/learn" },
    { title: "🤟 Practice", desc: "Unlimited training mode", path: "/practice" },
    { title: "🧠 Quiz", desc: "Daily challenge quiz", path: "/quiz" },
  ];

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode 
        ? "bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900" 
        : "bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50"
    }`}>
      
      {/* Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? "bg-cyan-500" : "bg-cyan-300"
        }`} />
        <div className={`absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl opacity-15 ${
          isDarkMode ? "bg-teal-500" : "bg-emerald-300"
        }`} />
        <div className={`absolute top-1/3 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 ${
          isDarkMode ? "bg-blue-500" : "bg-blue-200"
        }`} />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        
        {/* Top Navbar */}
        <div className={`sticky top-0 z-50 backdrop-blur-md transition-colors ${
          isDarkMode 
            ? "bg-slate-900/80 border-b border-teal-500/20" 
            : "bg-white/80 border-b border-teal-200/40"
        }`}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
            
            {/* Logo */}
            <h1 className={`text-2xl font-bold transition-colors ${
              isDarkMode ? "text-cyan-400" : "text-teal-600"
            }`}>
               SignConnect
            </h1>

            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className= {`hidden sm:flex flex-1 max-w-sm px-4 py-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-slate-800 border border-teal-500/30 text-white placeholder-slate-400 focus:border-cyan-400"
                  : "bg-white/60 border border-teal-200 text-slate-900 placeholder-slate-400 focus:border-cyan-400"
              } outline-none focus:ring-2 focus:ring-cyan-400/50`}
            />

            {/* Profile & Streak Buttons */}
            <div className="flex items-center flex gap-2">
              <button
                onClick={() => navigate("/profile")}
                className={`px-3 py-2 text-sm rounded-full font-semibold transition-all ${
                  isDarkMode
                    ? "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                    : "bg-cyan-200/60 text-teal-700 hover:bg-cyan-300/60"
                }`}
              >
                👤 Profile
              </button>

              {/* Streak Badge */}
              <button
                onClick={() => navigate("/streaks")}
                className={`px-3 py-2 text-sm rounded-full font-semibold transition-all flex items-center gap-2 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 hover:from-orange-500/30 hover:to-amber-500/30"
                    : "bg-gradient-to-r from-orange-200/60 to-amber-200/60 text-orange-700 hover:from-orange-300/60 hover:to-amber-300/60"
                }`}
              >
                <span>🔥</span>
                <span>{streak}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section with Wave */}
        <div className={`relative overflow-hidden transition-colors ${
          isDarkMode ? "bg-gradient-to-b from-teal-900/40 to-transparent" : "bg-gradient-to-b from-cyan-200/40 to-transparent"
        } pt-12 pb-20`}>
          
          {/* Wave SVG */}
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z" 
              fill={isDarkMode ? "#06b6d4" : "#14b8a6"} />
          </svg>

          <div className="max-w-6xl mx-auto px-6 pb-12 relative z-10">
            
            {/* Welcome Text */}
            <p className={`text-sm font-semibold transition-colors ${
              isDarkMode ? "text-cyan-400" : "text-teal-600"
            }`}>
              👋 Welcome back
            </p>

            <h1 className={`text-5xl font-black mt-2 transition-colors ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}>
              {name}
            </h1>

            <p className={`text-lg mt-4 transition-colors ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}>
              Learn sign language daily with SignConnect
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Section Title */}
          {searchQuery && (
            <p className={`text-sm font-semibold mb-6 transition-colors ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}>
              Found {filteredCards.length} result{filteredCards.length !== 1 ? 's' : ''}
            </p>
          )}

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {filteredCards.map((card, i) => (
              <Card
                key={i}
                onClick={() => navigate(card.path)}
                className={`cursor-pointer rounded-3xl border-0 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10"
                    : "bg-gradient-to-br from-white/80 to-white/60 hover:from-white/90 hover:to-white/80"
                }`}
              >
                {/* Decorative Top Circle */}
                <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-30 ${
                  isDarkMode ? "bg-cyan-400" : "bg-cyan-300"
                }`} />

                <CardContent className="p-6 relative z-10">
                  <h2 className={`text-2xl font-bold mb-3 transition-colors ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}>
                    {card.title}
                  </h2>

                  <p className={`transition-colors ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}>
                    {card.desc}
                  </p>

                  {/* Arrow Indicator */}
                  <div className={`mt-4 inline-block transition-transform group-hover:translate-x-1 ${
                    isDarkMode ? "text-cyan-400" : "text-teal-600"
                  }`}>
                    →
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCards.length === 0 && (
            <div className={`text-center py-12 transition-colors ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}>
              <p className="text-lg">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer Quote */}
        <div className={`text-center py-8 transition-colors ${
          isDarkMode ? "text-slate-400" : "text-slate-600"
        }`}>
          <p className="text-sm font-medium">✨ Small daily practice creates fluency ✨</p>
        </div>
      </div>
    </div>
  );
}