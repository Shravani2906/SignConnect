import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { restoreUserProgress } from "@/utils/progressManager";
import { useDarkMode } from "@/context/DarkModeContext";

export default function Login() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const saveUser = () => {
  if (!name.trim() || !email.trim()) {
    alert("Please enter both name and email");
    return;
  }

  // Check if user data already exists
  const savedUser = localStorage.getItem(`userData_${email}`);
  const oldData = savedUser ? JSON.parse(savedUser) : {};

  const user = {
    name,
    email,
    phone: oldData.phone || "",
    dob: oldData.dob || "",
    profileImage: oldData.profileImage || ""
  };

  localStorage.setItem("userProfile", JSON.stringify(user));

  // Save permanent user data
  localStorage.setItem(`userData_${email}`, JSON.stringify(user));

  restoreUserProgress(email);

  navigate("/");
};

  

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
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

        <Card className={`w-full max-w-md border-0 rounded-3xl backdrop-blur-sm transition-colors ${
          isDarkMode
            ? "bg-gradient-to-br from-white/10 to-white/5"
            : "bg-gradient-to-br from-white/80 to-white/60"
        }`}>
          <CardContent className="p-8">

            {/* Logo */}
            {/* <h1 className={`text-4xl font-black text-center mb-2 transition-colors ${
              isDarkMode ? "text-cyan-400" : "text-teal-600"
            }`}>
              🤟
            </h1> */}

            <h2 className={`text-2xl font-bold text-center mb-2 transition-colors ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}>
              SignConnect
            </h2>

            <p className={`text-center text-sm mb-6 transition-colors ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}>
              Learn sign language daily
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
              <input
                placeholder="Full Name"
                className={`w-full p-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
                    : "bg-white/60 border-white/40 text-slate-900 placeholder-slate-500 focus:border-teal-400"
                } outline-none focus:ring-2 focus:ring-cyan-400/50`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="Email Address"
                type="email"
                className={`w-full p-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
                    : "bg-white/60 border-white/40 text-slate-900 placeholder-slate-500 focus:border-teal-400"
                } outline-none focus:ring-2 focus:ring-cyan-400/50`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Continue Button */}
            <button 
              onClick={saveUser}
              className={`w-full mt-6 px-4 py-3 rounded-full font-semibold transition-all ${
                isDarkMode
                  ? "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                  : "bg-cyan-200/60 text-teal-700 hover:bg-cyan-300/60"
              }`}
            >
              Continue
            </button>

            

            <p className="text-sm text-center text-gray-500 mt-2">
  Use any name and email to explore the demo app.
</p>

            {/* Footer */}
            <p className={`text-center text-xs mt-6 transition-colors ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}>
              By continuing, you agree to our Terms of Service
            </p>

          </CardContent>
        </Card>

      </div>

    </div>
  );
}