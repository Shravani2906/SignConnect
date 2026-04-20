import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/context/DarkModeContext"; // adjust path if needed

export default function Learn() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile") || "null");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
          : "bg-gradient-to-br from-teal-50 via-cyan-100 to-slate-50 text-slate-900"
      }`}
    >
      {/* Wave Background */}
      <div className="fixed inset-x-0 top-0 h-64 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,96L80,117.3C160,139,320,181,480,202.7C640,224,800,224,960,213.3C1120,203,1280,181,1360,170.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            fill="#2dd4bf"
            opacity="0.35"
          />
          <path
            d="M0,160L80,181.3C160,203,320,245,480,261.3C640,277,800,267,960,224C1120,181,1280,107,1360,69.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            fill="#14b8a6"
            opacity="0.3"
          />
          <path
            d="M0,224L80,208C160,192,320,160,480,138.7C640,117,800,107,960,128C1120,149,1280,203,1360,229.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            fill="#0d9488"
            opacity="0.25"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.24em] mb-3 ${
              isDarkMode ? "text-teal-300" : "text-teal-700"
            }`}
          >
            Choose your learning path
          </p>

          <h1
            className={`text-4xl sm:text-5xl font-extrabold mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Learn Sign Language
          </h1>

          <p
            className={`mx-auto max-w-2xl text-base sm:text-lg ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Pick a path and build your sign language skills step by step.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              emoji: "🔤",
              title: "Alphabets",
              desc: "Learn letters and fingerspelling for everyday communication.",
              path: "/learn/alphabets",
            },
            {
              emoji: "🔢",
              title: "Numbers",
              desc: "Practice number signs for counting, dates, and daily use.",
              path: "/learn/numbers",
            },
            {
              emoji: "🗂",
              title: "Vocabulary",
              desc: "Level up your vocabulary with progressive sign language lessons.",
              path: "/learn/words",
            },
          ].map((item, i) => (
            <Card
              key={i}
              onClick={() => navigate(item.path)}
              className={`group cursor-pointer overflow-hidden rounded-[2rem] border-0 transition hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-slate-800/90 shadow-lg shadow-black/30 hover:shadow-teal-500/20"
                  : "bg-white/90 shadow-lg shadow-teal-200/40 hover:shadow-teal-300/30"
              }`}
            >
              <CardContent className="p-8 relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-100 text-2xl mb-6 text-teal-700">
                  {item.emoji}
                </div>

                <h2
                  className={`text-2xl font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {item.title}
                </h2>

                <p
                  className={`text-sm mb-6 ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {item.desc}
                </p>

                <Button
                  className="px-5 py-3 text-base"
                  onClick={() => navigate(item.path)}
                >
                  Start
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-12 rounded-[2rem] px-8 py-10 text-center shadow-lg ${
            isDarkMode
              ? "border border-slate-700 bg-slate-800/90 shadow-black/30"
              : "border border-teal-200/80 bg-white/80 shadow-teal-200/20"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Learn step by step every day ✨
          </h2>

          <p
            className={`max-w-2xl mx-auto ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Build confidence with daily practice and stay motivated as you
            progress through signs, numbers, and words.
          </p>
        </div>
      </div>
    </div>
  );
}