import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/context/DarkModeContext";
import { saveUserProgress } from "@/utils/progressManager";

export default function Profile() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showAbout, setShowAbout] = useState(false);

  const user = JSON.parse(localStorage.getItem("userProfile") || "null");

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const logout = () => {
    // Save current progress using the email
    if (user?.email) {
      saveUserProgress(user.email);
    }
    
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  const actions = [
    { icon: "✏", label: "Edit Profile", onClick: () => navigate("/edit-profile") },
    { icon: "🌙", label: "Dark Mode", onClick: toggleDarkMode },
    { icon: "ℹ", label: "About SignConnect", onClick: () => setShowAbout(true) },
    { icon: "🚪", label: "Sign Out", onClick: logout },
  ];

  return (
    <div className={`min-h-screen transition-colors pb-12 ${
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
      </div>

      <div className="relative z-10">
        
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <button
            onClick={() => navigate("/")}
            className={`text-sm font-semibold transition-colors ${
              isDarkMode ? "text-cyan-400 hover:text-cyan-300" : "text-teal-600 hover:text-teal-700"
            }`}
          >
            ← Back
          </button>
        </div>

        {/* Profile Header Card */}
        <div className="max-w-4xl mx-auto px-6 mt-6">
          <Card className={`border-0 overflow-hidden rounded-3xl backdrop-blur-sm transition-colors ${
            isDarkMode
              ? "bg-gradient-to-br from-white/10 to-white/5"
              : "bg-gradient-to-br from-white/80 to-white/60"
          }`}>
            <CardContent className="p-8 flex flex-col items-center">
              
              {/* Profile Image */}
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4 overflow-hidden transition-colors ${
                isDarkMode ? "bg-cyan-500/20" : "bg-cyan-200/60"
              }`}>
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  "👤"
                )}
              </div>

              {/* Name */}
              <h1 className={`text-3xl font-bold transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                {user?.name || "Guest User"}
              </h1>

              {/* Email */}
              <p className={`mt-2 transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}>
                {user?.email || "No email added"}
              </p>

              {/* Tagline */}
              <p className={`text-sm mt-3 font-medium transition-colors ${
                isDarkMode ? "text-cyan-400" : "text-teal-600"
              }`}>
                ✨ Keep learning every day ✨
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons Vertical */}
        <div className="max-w-4xl mx-auto px-6 mt-8">
          <div className="flex flex-col items-center gap-4">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`w-full max-w-xs px-6 py-4 rounded-full font-semibold text-base whitespace-nowrap transition-all ${
                  isDarkMode
                    ? "bg-gradient-to-r from-white/10 to-white/5 text-white hover:from-white/15 hover:to-white/10"
                    : "bg-gradient-to-r from-white/80 to-white/60 text-slate-900 hover:from-white/90 hover:to-white/80"
                }`}
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <Card className={`border-0 rounded-3xl max-w-md w-full transition-colors ${
            isDarkMode
              ? "bg-gradient-to-br from-white/10 to-white/5"
              : "bg-gradient-to-br from-white/80 to-white/60"
          }`}>
            <CardContent className="p-6">
              
              <h2 className={`text-2xl font-bold mb-4 transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                About SignConnect
              </h2>

              <p className={`text-sm leading-6 transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}>
                SignConnect is an interactive sign language learning app with lessons, practice mode, daily quiz challenges, streak tracking, and progress tools.
              </p>

              <p className={`text-xs mt-4 transition-colors ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}>
                Version 1.0 • React • TypeScript • Tailwind CSS
              </p>

              <button
                onClick={() => setShowAbout(false)}
                className={`w-full mt-5 px-4 py-2 rounded-full font-semibold transition-all ${
                  isDarkMode
                    ? "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                    : "bg-cyan-200/60 text-teal-700 hover:bg-cyan-300/60"
                }`}
              >
                Close
              </button>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}