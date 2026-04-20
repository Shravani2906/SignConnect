import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDarkMode } from "@/context/DarkModeContext";

export default function Practice() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const [selectedMode, setSelectedMode] = useState<
    "words" | "sentences" | null
  >(null);

  // LOGIN CHECK
  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("userProfile") || "null"
    );

    if (!user) navigate("/login");
  }, [navigate]);

  // WORDS DATA
  const words = [
    "breakfast.jpg",
    "today.jpg",
    "swimming.jpg",
    "water.jpg",
    "yellow.jpg",
    "butterfly.jpg",
    "sunrise.jpg",
    "sunset.jpg",
    "smile.jpg",
    "family.jpg",
    "read.jpg",
    "practice.jpg",
    "study.jpg",
    "love.jpg",
    "board.jpg",
    "clean.jpg",
    "feel.jpg",
    "happy.jpg",
    "make.jpg",
    "plant.jpg",
    "today.jpg",
    "sit.jpg",
    "stand.jpg",
    "good.jpg",
    "busy.jpg",
    "door.jpg",
    "help.jpg",
    "cold.jpg",
    "excuseme.jpg",
    "sorry.jpg",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [wordTimeLeft, setWordTimeLeft] = useState(15);
  const [showWordAnswer, setShowWordAnswer] =
    useState(false);

  // SENTENCES DATA
  const sentences = [
    {
      text: "Practice Swimming Everyday",
      images: [
        "/words/practice.jpg",
        "/words/swimming.jpg",
        "/words/everyday.jpg",
      ],
    },
    {
      text: "Like Butterflies in the Sunrise",
      images: [
        "/words/like.jpg",
        "/words/butterfly.jpg",
        "/words/sunrise.jpg",
      ],
    },
    {
      text: "Everyday I Love My Family",
      images: [
        "/words/everyday.jpg",
        "/words/I1.jpg",
        "/words/love.jpg",
        "/words/family.jpg",
      ],
    },
    {
      text: "Clean the Board",
      images: [
        "/words/clean.jpg",
        "/words/board.jpg",
      ],
    },
    {
      text: "Wakeup before Sunrise",
      images: [
        "/words/wakeup.jpg",
        "/words/early.jpg",
        "/words/before.jpg",
        "/words/sunrise.jpg",
      ],
    },
    {
      text: "Everyday I Love My Family",
      images: [
        "/words/everyday.jpg",
        "/words/I1.jpg",
        "/words/love.jpg",
        "/words/family.jpg",
      ],
    },
    {
      text: "Sunset is Beautiful",
      images: [
        "/words/sunset.jpg",
        "/words/Beautiful.jpg",
      ],
    },
    {
      text: "Everyone is busy today.",
      images: [
        "/words/everyone.jpg",
        "/words/busy.jpg",
        "/words/today.jpg",
      ],
    },
    {
      text: "Call sister now",
      images: [
        "/words/call.jpg",
        "/words/sister.jpg",
        "/words/now.jpg",
      ],
    },
    {
      text: "Water to plant",
      images: [
        "/words/water.jpg",
        "/words/plant.jpg",
      ],
    },
    {
      text: "Please help mom",
      images: [
        "/words/please.jpg",
        "/words/help.jpg",
        "/words/mommy.jpg",
      ],
    },
    {
      text: "Love to read books",
      images: [
        "/words/love.jpg",
        "/words/read.jpg",
        "/words/books.jpg",
      ],
    },
    {
      text: "Love family always",
      images: [
        "/words/love.jpg",
        "/words/family.jpg",
        "/words/always.jpg",
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showAnswer, setShowAnswer] = useState(false);

  // WORD TIMER
  useEffect(() => {
    if (selectedMode !== "words") return;

    if (wordTimeLeft === 0) {
      setShowWordAnswer(true);
      return;
    }

    if (!showWordAnswer) {
      const timer = setTimeout(() => {
        setWordTimeLeft(wordTimeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [wordTimeLeft, showWordAnswer, selectedMode]);

  // SENTENCE TIMER
  useEffect(() => {
    if (selectedMode !== "sentences") return;

    if (timeLeft === 0) {
      setShowAnswer(true);
      return;
    }

    if (!showAnswer) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, showAnswer, selectedMode]);

  // WORD NEXT
  const nextWord = () => {
    setWordIndex(
      Math.floor(Math.random() * words.length)
    );
    setWordTimeLeft(15);
    setShowWordAnswer(false);
  };

  const previousWord = () => {
    setWordIndex(
      (wordIndex - 1 + words.length) % words.length
    );
    setWordTimeLeft(15);
    setShowWordAnswer(false);
  };

  // SENTENCE NEXT
  const nextSentence = () => {
    setCurrent((current + 1) % sentences.length);
    setTimeLeft(20);
    setShowAnswer(false);
  };

  const previousSentence = () => {
    setCurrent(
      (current - 1 + sentences.length) %
        sentences.length
    );
    setTimeLeft(20);
    setShowAnswer(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
    isDarkMode
      ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
      : "bg-gradient-to-br from-teal-50 via-cyan-100 to-slate-50"
  }`}>

      {/* WAVES */}
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16">

        {/* SHOW HEADER ONLY MAIN PAGE */}
        {!selectedMode && (
          <div className="text-center mb-10">
            <p className={`text-sm font-semibold ${isDarkMode ? "text-teal-300" : "text-teal-700"} uppercase tracking-[0.24em] mb-3`}>
              Improve Daily
            </p>

            <h1 className={`text-4xl sm:text-5xl font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"} mb-4`}>
               Practice Mode
            </h1>

            <p className={`text-${isDarkMode ? "slate-300" : "slate-600"} max-w-xl mx-auto`}>
              Build confidence through words and sentence practice.
            </p>
          </div>
        )}

        {/* MODE SELECT */}
        {!selectedMode && (
          <div className="grid gap-6 md:grid-cols-2">

            <Card
              onClick={() => setSelectedMode("words")}
              className={`cursor-pointer rounded-[2rem] shadow-lg border transition-all duration-300 ${
    isDarkMode
      ? "bg-slate-900/95 border-slate-700"
      : "bg-white/90 border-transparent"
  }`}
            >
              <CardContent className="p-8 text-center">
                <p className="text-5xl mb-5">📝</p>

                <h2 className={`text-2xl font-bold mb-3 ${
        isDarkMode ? "text-white" : "text-slate-900"
      }`}>
                 Quick Words
                </h2>

                <p className={`mb-6 text-sm ${
        isDarkMode ? "text-slate-400" : "text-slate-600"
      }`}>
                  Practice single words with timer.
                </p>

                <Button className="bg-teal-600 hover:bg-teal-700">
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card
              onClick={() =>
                setSelectedMode("sentences")
              }
              className={`cursor-pointer rounded-[2rem] shadow-lg border transition-all duration-300 ${
    isDarkMode
      ? "bg-slate-900/95 border-slate-700"
      : "bg-white/90 border-transparent"
  }`}
            >
              <CardContent className="p-8 text-center">
                <p className="text-5xl mb-5">💬</p>

                <h2 className={`text-2xl font-bold mb-3 ${
        isDarkMode ? "text-white" : "text-slate-900"
      }`}>
                  Sentence Practice
                </h2>

                <p className={`mb-6 text-sm ${
        isDarkMode ? "text-slate-400" : "text-slate-600"
      }`}>
                  Practice sentences with timer.
                </p>

                <Button className="bg-teal-600 hover:bg-teal-700">
                  Start Learning
                </Button>
              </CardContent>
            </Card>

          </div>
        )}

        {/* BACK BUTTON */}
        {selectedMode && (
          <div className="mb-6">
            <Button
             variant="outline"
  className={
    isDarkMode
      ? "border-slate-600 text-white hover:bg-slate-800"
      : ""
  }
              onClick={() => setSelectedMode(null)}
            >
              ← Back
            </Button>
          </div>
        )}

        {/* WORD MODE */}
        {selectedMode === "words" && (
          <div> 
            <div className="text-center mb-6">
      <h1 className={`text-3xl sm:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"} mb-4`}>
        Quick Words
      </h1>

      <p className={`mb-6 text-sm ${
        isDarkMode ? "text-slate-400" : "text-slate-600"
      }`}>
        Practice random sign words with timer
      </p>
    </div>
          <Card  className={`w-full max-w-6xl rounded-[2rem] border-0 shadow-xl transition-all duration-500 ${
    isDarkMode
      ? "bg-slate-900/95 border border-slate-700"
      : "bg-white/90"
  } ${
    showAnswer ? "min-h-[500px]" : "min-h-[340px]"
  }`} >
            <CardContent className="p-8 text-center">

              <h2 className={`text-3xl font-bold mb-6 ${
  isDarkMode ? "text-white" : "text-slate-900"
}`}>
                {words[wordIndex]
                  .replace(".jpg", "")
                  .toUpperCase()}
              </h2>

              {!showWordAnswer ? (
                <>
                  <p className="text-5xl font-bold text-teal-600 mb-6">
                    {wordTimeLeft}s
                  </p>

                  <Button
                    onClick={() =>
                      setShowWordAnswer(true)
                    }
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Show Answer
                  </Button>
                </>
              ) : (
                <>
                  <img
                    src={`/words/${words[wordIndex]}`}
                    className="w-96 h-96 object-contain mx-auto mb-6"
                  />

                  <div className="flex gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={previousWord}
                    >
                      ← Previous
                    </Button>

                    <Button
                      onClick={nextWord}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Next →
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          </div>
        )}

        {/* SENTENCE MODE */}
        {selectedMode === "sentences" && (
          <div>
            <div className="text-center mb-6">
      <h1 className={`text-3xl sm:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"} mb-4`}>
        Sentence Practice
      </h1>

      <p className={`mb-6 text-sm ${
        isDarkMode ? "text-slate-400" : "text-slate-600"
      }`}>
        Practice random sign sentences with timer
      </p>
    </div>
          <Card className={`w-full max-w-6xl rounded-[2rem] border-0 shadow-xl transition-all duration-500 ${
    isDarkMode
      ? "bg-slate-900/95 border border-slate-700"
      : "bg-white/90"
  } ${
    showAnswer ? "min-h-[500px]" : "min-h-[340px]"
  }`}>
            <CardContent className="p-8 text-center">

              <h2 className={`text-3xl font-bold mb-8 ${
  isDarkMode ? "text-white" : "text-slate-900"
}`}>
                {sentences[current].text}
              </h2>

              {!showAnswer ? (
                <>
                  <p className="text-5xl font-bold text-teal-600 mb-6">
                    {timeLeft}s
                  </p>

                  <Button
                    onClick={() =>
                      setShowAnswer(true)
                    }
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Show Answer
                  </Button>
                </>
              ) : (
                <>
                  
                  <div className="flex flex-wrap justify-center gap-5 mb-8">
  {sentences[current].images.map((img, i) => (
    <div
      key={i}
      className={`w-80 h-50 rounded-3xl ${isDarkMode ? "bg-slate-800" : "bg-teal-50"} p-2 shadow-md flex items-center justify-center shrink-0`}
    >
      <img
        src={img}
        className="w-full h-full object-contain"
      />
    </div>
  ))}
</div>

                  <div className="flex gap-4 justify-center">
                    <Button
                      variant="outline"
                      className={
    isDarkMode
      ? "border-slate-600 text-slate-200 hover:bg-slate-800"
      : ""
  }
                      onClick={previousSentence}
                    >
                      ← Previous
                    </Button>

                    <Button
                      onClick={nextSentence}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Next →
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          </div>
        )}

      </div>
    </div>
  );
}