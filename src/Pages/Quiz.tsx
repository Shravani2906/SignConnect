import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/context/DarkModeContext";

export default function Quiz() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile") || "null");
    if (!user) navigate("/login");
  }, [navigate]);

  const sentences = [
    {
      text: "Drink Water",
      images: ["drink.jpg", "water.jpg"],
    },
    {
      text: "Open Door",
      images: ["open.jpg", "door.jpg"],
    },
    {
      text: "Good Morning",
      images: ["good.jpg", "morning.jpg"],
    },
    {
      text: "Excuse Me Please",
      images: ["excuseme.jpg", "please.jpg"],
    },
    {
      text: "Water to plant",
      images: ["water.jpg", "plant.jpg"],
    },
    {
      text: "Love family always",
      images: ["love.jpg", "family.jpg", "always.jpg"],
    },
    {
      text: "Call brother now",
      images: ["call.jpg", "brother.jpg", "now.jpg"],
    },
    {
      text: "Please help dad today",
      images: ["please.jpg", "help.jpg", "dad.jpg", "today.jpg"],
    },
    {
      text: "Feel happy every day",
      images: ["feel.jpg", "happy.jpg", "everyday.jpg"],
    },
    {
      text: "Like the yellow Butterfly",
      images: ["like.jpg", "yellow.jpg", "butterfly.jpg"],
    },
    {
      text: "Read a book",
      images: ["read.jpg", "book.jpg"],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  // DAILY QUIZ INIT
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const lastCompleted = localStorage.getItem("lastQuizDate");

    const todayQuestionIndex = today.getDate() % sentences.length;
    setCurrent(todayQuestionIndex);

    if (lastCompleted === todayStr) {
      setQuizDone(true);
    }
  }, []);

  // TIMER
  useEffect(() => {
    if (quizDone || showAnswer) return;

    if (timeLeft === 0) {
      setShowAnswer(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showAnswer, quizDone]);

  const markQuizComplete = () => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const dates = JSON.parse(
      localStorage.getItem("quizDatesCompleted") || "[]"
    );

    if (dates.includes(todayStr)) return;

    dates.push(todayStr);

    localStorage.setItem(
      "quizDatesCompleted",
      JSON.stringify(dates)
    );

    localStorage.setItem("lastQuizDate", todayStr);

    let currentStreak = Number(
      localStorage.getItem("currentStreak") || 0
    );

    let bestStreak = Number(
      localStorage.getItem("bestStreak") || 0
    );

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const yesterdayStr = yesterday
      .toISOString()
      .split("T")[0];

    if (dates.includes(yesterdayStr)) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }

    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
      localStorage.setItem(
        "bestStreak",
        String(bestStreak)
      );
    }

    localStorage.setItem(
      "currentStreak",
      String(currentStreak)
    );

    setQuizDone(true);
  };

  return (
    <div className={`min-h-screen transition-colors ${
    isDarkMode
      ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
      : "bg-gradient-to-br from-teal-50 via-cyan-100 to-slate-50"
  }`}>

      {/* WAVE BACKGROUND */}
      <div className="fixed inset-x-0 top-0 h-72 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,96L80,117.3C160,139,320,181,480,202.7C640,224,800,224,960,213.3C1120,203,1280,181,1360,170.7L1440,160L1440,0L0,0Z"
            fill="#2dd4bf"
            opacity="0.35"
          />
          <path
            d="M0,160L80,181.3C160,203,320,245,480,261.3C640,277,800,267,960,224C1120,181,1280,107,1360,69.3L1440,32L1440,0L0,0Z"
            fill="#14b8a6"
            opacity="0.30"
          />
          <path
            d="M0,224L80,208C160,192,320,160,480,138.7C640,117,800,107,960,128C1120,149,1280,203,1360,229.3L1440,256L1440,0L0,0Z"
            fill="#0d9488"
            opacity="0.25"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center">

        {/* HEADER */}
        <p className={`text-sm font-semibold uppercase tracking-[0.24em] mb-3 ${
    isDarkMode ? "text-teal-400" : "text-teal-700"
  }`}>
          Daily Challenge
        </p>

        <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 text-center ${
    isDarkMode ? "text-white" : "text-slate-900"
  }`}>
            Quiz
        </h1>

        <p className={`mb-6 text-sm ${
    isDarkMode ? "text-slate-400" : "text-slate-600"
  }`}>
          Complete today’s challenge to continue your streak.
        </p>

        {/* MAIN CARD */}
        <div className={`w-full max-w-3xl rounded-[2rem] p-8 text-center shadow-xl transition-all ${
    isDarkMode
      ? "bg-slate-900 border border-slate-700"
      : "bg-white/90 shadow-teal-200/40"
  }`}>

          {!quizDone && (
            <>
              <p className={`text-sm uppercase tracking-[0.2em] ${
    isDarkMode ? "text-teal-400" : "text-teal-700"
  }`} mb-4>
                Today's Question
              </p>

              <h2 className={`text-4xl font-bold mb-8 ${
    isDarkMode ? "text-white" : "text-slate-900"
  }`}>
                {sentences[current].text}
              </h2>
            </>
          )}

          {/* TIMER */}
          {!showAnswer && !quizDone && (
            <div className="mb-8">
              <p className="text-5xl font-bold text-teal-600">
                {timeLeft}s
              </p>
              <p className={`${isDarkMode ? "text-slate-400" : "text-slate-500"} mt-2`}>
                Recall the sign before time ends
              </p>
            </div>
          )}

          {/* ANSWER */}
          {showAnswer && !quizDone && (
            <>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {sentences[current].images.map((img, i) => (
                  <img
                    key={i}
                    src={`/words/${img}`}
                    className={`w-80 h-80 object-contain rounded-3xl p-4 shadow ${
                      isDarkMode ? "bg-slate-800" : "bg-teal-50"
                    }`}
                  />
                ))}
              </div>

              <p className={`text-xl font-semibold mb-6 ${
                isDarkMode ? "text-slate-300" : "text-slate-800"
              }`}>
                Did you complete the sign?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={markQuizComplete}
                  className="px-8 py-6 text-lg bg-teal-600 hover:bg-teal-700"
                >
                  Yes ✅
                </Button>

                <Button
                  onClick={() => setQuizDone(true)}
                  variant="outline"
                  className={`px-8 py-6 text-lg ${
    isDarkMode
      ? "border-slate-600 text-slate-200 hover:bg-slate-800"
      : ""
  }`}
                >
                  Skip
                </Button>
              </div>
            </>
          )}

          {/* QUIZ COMPLETE */}
          {quizDone && (
            <div className="py-6">
              <p className="text-5xl mb-4">🎉</p>

              <h2 className={`text-3xl font-bold mb-3 ${
    isDarkMode ? "text-teal-400" : "text-teal-500"
  }`}>
                Great Job!
              </h2>

              <p className={`text-slate-700 text-lg mb-2 ${
    isDarkMode ? "text-slate-400" : "text-slate-700"
  }`}>
                You've completed today's quiz
              </p>

              <p className={`text-slate-500 ${
    isDarkMode ? "text-slate-400" : "text-slate-500"
  }`}>
                Come back tomorrow for a new challenge.
              </p>
            </div>
          )}

          {/* BUTTON */}
          {!showAnswer && !quizDone && (
            <Button
              onClick={() => setShowAnswer(true)}
              className="mt-4 px-10 py-6 text-lg bg-teal-600 hover:bg-teal-700"
            >
              Show Answer
            </Button>
          )}

        </div>

        {/* FOOTER */}
        <p className={`mt-10 text-sm text-center ${
    isDarkMode ? "text-slate-500" : "text-slate-500"
  }`}>
          Daily consistency builds fluency ✨
        </p>

      </div>
    </div>
  );
}