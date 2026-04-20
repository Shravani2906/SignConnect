import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useDarkMode } from "@/context/DarkModeContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saved = JSON.parse(localStorage.getItem("userProfile") || "{}");

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile") || "null");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const [name, setName] = useState(saved.name || "");
  const [email, setEmail] = useState(saved.email || "");
  const [phone, setPhone] = useState(saved.phone || "");
  const [dob, setDob] = useState(saved.dob || "");
  const [profileImage, setProfileImage] = useState(saved.profileImage || null);
  const [imagePreview, setImagePreview] = useState(saved.profileImage || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const save = () => {
  const updatedUser = {
    name,
    email,
    phone,
    dob,
    profileImage
  };

  localStorage.setItem("userProfile", JSON.stringify(updatedUser));

  localStorage.setItem(
    `userData_${email}`,
    JSON.stringify(updatedUser)
  );

  navigate("/profile");
};

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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

        <Card className={`w-full max-w-md border-0 rounded-3xl backdrop-blur-sm transition-colors ${
          isDarkMode
            ? "bg-gradient-to-br from-white/10 to-white/5"
            : "bg-gradient-to-br from-white/80 to-white/60"
        }`}>
          <CardContent className="p-8">

            {/* Back Button */}
            <button
              onClick={() => navigate("/profile")}
              className={`text-sm font-semibold transition-colors mb-6 ${
                isDarkMode ? "text-cyan-400 hover:text-cyan-300" : "text-teal-600 hover:text-teal-700"
              }`}
            >
              ← Back
            </button>

            <h1 className={`text-2xl font-bold text-center mb-6 transition-colors ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}>
              Edit Profile
            </h1>

            {/* Profile Image Section */}
            <div className={`flex flex-col items-center gap-4 border rounded-2xl p-4 mb-6 transition-colors ${
              isDarkMode
                ? "border-white/10 bg-white/5"
                : "border-white/40 bg-white/40"
            }`}>
              <p className={`font-semibold transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                Profile Picture
              </p>
              
              {imagePreview ? (
                <div className="flex flex-col items-center gap-3">
                  <img 
                    src={imagePreview} 
                    alt="Profile Preview"
                    className={`w-32 h-32 rounded-full object-cover border-4 transition-colors ${
                      isDarkMode ? "border-cyan-400" : "border-teal-400"
                    }`}
                  />
                  <button 
                    onClick={removeImage}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      isDarkMode
                        ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                        : "bg-red-200/60 text-red-700 hover:bg-red-300/60"
                    }`}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl transition-colors ${
                  isDarkMode ? "bg-cyan-500/20" : "bg-cyan-200/60"
                }`}>
                  👤
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button 
                onClick={handleBrowseClick}
                className={`w-full px-4 py-2 rounded-full font-semibold transition-all ${
                  isDarkMode
                    ? "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                    : "bg-cyan-200/60 text-teal-700 hover:bg-cyan-300/60"
                }`}
              >
                📱 Browse Image
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <input 
                className={`w-full p-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
                    : "bg-white/60 border-white/40 text-slate-900 placeholder-slate-500 focus:border-teal-400"
                } outline-none focus:ring-2 focus:ring-cyan-400/50`}
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name" 
              />
              <input 
                className={`w-full p-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
                    : "bg-white/60 border-white/40 text-slate-900 placeholder-slate-500 focus:border-teal-400"
                } outline-none focus:ring-2 focus:ring-cyan-400/50`}
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
              />
              <input 
                className={`w-full p-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
                    : "bg-white/60 border-white/40 text-slate-900 placeholder-slate-500 focus:border-teal-400"
                } outline-none focus:ring-2 focus:ring-cyan-400/50`}
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Phone" 
              />
              <input 
                type="date" 
                className={`w-full p-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
                    : "bg-white/60 border-white/40 text-slate-900 placeholder-slate-500 focus:border-teal-400"
                } outline-none focus:ring-2 focus:ring-cyan-400/50`}
                value={dob} 
                onChange={(e) => setDob(e.target.value)} 
              />
            </div>

            {/* Save Button */}
            <button 
              onClick={save}
              className={`w-full mt-6 px-4 py-3 rounded-full font-semibold transition-all ${
                isDarkMode
                  ? "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                  : "bg-cyan-200/60 text-teal-700 hover:bg-cyan-300/60"
              }`}
            >
              Save Changes
            </button>

          </CardContent>
        </Card>

      </div>

    </div>
  );
}