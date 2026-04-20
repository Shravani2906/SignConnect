import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/context/DarkModeContext";

export default function Words() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile") || "null");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ LOAD COMPLETED LEVELS FROM LOCALSTORAGE
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem("completedLevels");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE COMPLETED LEVELS TO LOCALSTORAGE WHENEVER IT CHANGES
  useEffect(() => {
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
  }, [completedLevels]);

  // ✅ LEVEL DATA (words + image name)
  const levels = [
    {
      name: "Level 1",
      words: [
        { text: "Hello", img: "/hello.jpg" },
        { text: "Bye", img: "/bye.jpg" },
        { text: "Good", img: "/good.jpg" },
        { text: "Morning", img: "/morning.jpg" },
        { text: "Night", img: "/night.jpg" },
        { text: "Sorry", img: "/sorry.jpg" },
        { text: "Thank You", img: "/thankyou.jpg" }
      ],
    },
    {
      name: "Level 2",
      words: [
        { text: "Eat", img: "/eat.jpg" },
        { text: "Drink", img: "/drink.jpg" },
        { text: "Open", img: "/open.jpg" },
        { text: "Close", img: "/close.jpg" },
        { text: "Stand", img: "/stand.jpg" },
        { text: "Help", img: "/help.jpg" },
        { text: "Excuse me", img: "/excuseme.jpg" }
      ],
    },
    {
      name: "Level 3",
      words: [
        { text: "Book", img: "/book.jpg" },
        { text: "Door", img: "/door.jpg" },
        { text: "Water", img: "/water.jpg" },
        { text: "Breakfast", img: "/breakfast.jpg" },
        { text: "Beautiful", img: "/Beautiful.jpg" },
        { text: "Please", img: "/please.jpg" },
        { text: "Wake up", img: "/wakeup.jpg" }
      ],
    },
    {
      name: "Level 4",
      words: [
        { text: "Mom", img: "/mommy.jpg" },
        { text: "Dad", img: "/daddy.jpg" },
        { text: "Brother", img: "/brother.jpg" },
        { text: "Sister", img: "/sister.jpg" },
        { text: "Daughter", img: "/daughter.jpg" },
        { text: "Son", img: "/son.jpg" },
        { text: "Family", img: "/family.jpg" },
        { text: "Where", img: "/where.jpg" }
      ],
    },
    {
      name: "Level 5",
      words: [
        { text: "Swimming", img: "/swimming.jpg" },
        { text: "Everyone", img: "/everyone.jpg" },
        { text: "Read", img: "/read.jpg" },
        { text: "Practice", img: "/practice.jpg" },
        { text: "Early", img: "/early.jpg" },
        { text: "Butterfly", img: "/butterfly.jpg" },
        { text: "Yellow", img: "/yellow.jpg" },
        { text: "Bus", img: "/bus.jpg" }
      ],
    },
    {
      name: "Level 6",
      words: [
        { text: "Sunrise", img: "/sunrise.jpg" },
        { text: "Sunset", img: "/sunset.jpg" },
        { text: "Plant", img: "/plant.jpg" },
        { text: "Busy", img: "/busy.jpg" },
        { text: "Now", img: "/now.jpg" },
        { text: "Love", img: "/love.jpg" },
        { text: "Board", img: "/board.jpg" },
        { text: "Clean", img: "/clean.jpg" }
      ],
    },
  ];

  // ✅ WHICH LEVEL USER OPENED
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // ✅ CURRENT WORD INDEX IN SELECTED LEVEL
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // ✅ IMAGE ERROR HANDLING
  const [imageError, setImageError] = useState<boolean>(false);

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setImageError(false);
    }
  };

  const handleNext = () => {
    if (selectedLevel !== null) {
      const totalWords = levels[selectedLevel].words.length;
      if (currentWordIndex < totalWords - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setImageError(false);
      }
    }
  };

  const handleStartLevel = (levelIndex: number) => {
    setSelectedLevel(levelIndex);
    setCurrentWordIndex(0);
    setImageError(false);
  };

  const handleCompleteLevel = () => {
    if (selectedLevel !== null) {
      // Only add to completedLevels if not already completed
      if (!completedLevels.includes(selectedLevel)) {
        setCompletedLevels([...completedLevels, selectedLevel]);
      }
      setSelectedLevel(null);
      setCurrentWordIndex(0);
    }
  };

  return (
    <div className={`min-h-screen p-4 flex flex-col items-center bg-gradient-to-br ${
    isDarkMode
      ? "from-slate-800 via-slate-900 to-slate-950"
      : "from-teal-100 via-cyan-100 to-slate-50"
  }`}>

      <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-teal-700"}`}> Vocabulary Levels</h1>

      {/* 🔹 IF NOT IN A LEVEL - SHOW LEVEL SELECTION */}
      {selectedLevel === null && (
        <div className="grid gap-4 w-full max-w-2xl">

          {levels.map((level, index) => {
            const isCompleted = completedLevels.includes(index);
            const isLocked = index > 0 && !completedLevels.includes(index - 1);

            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all rounded-3xl border ${
                  isCompleted
? isDarkMode
  ? "bg-teal-900/40 border-slate-700"
  : "bg-teal-100"
: isLocked
? isDarkMode
  ? "bg-slate-800 border-slate-700"
  : "bg-gray-100"
: isDarkMode
? "bg-slate-900/90 border-slate-700 hover:shadow-lg"
: "bg-white/90 hover:shadow-xl hover:shadow-teal-200"
                }`}
              >
                <CardContent className="p-6 flex flex-col gap-4">

                  <div className="flex items-center justify-between">
                    <h2 className={`text-xl font-bold ${
isDarkMode ? "text-white" : "text-slate-900"
}`}>
                      {level.name}
                    </h2>
                    <div className="text-3xl">
                      {isCompleted ? "✅" : isLocked ? "🔒" : "▶️"}
                    </div>
                  </div>

                  {isLocked ? (
                    <Button disabled className="w-full">
                      🔒 Locked - Complete {levels[index - 1].name} First
                    </Button>
                  ) : isCompleted ? (
                    <Button 
                      onClick={() => handleStartLevel(index)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                    >
                      ✅ Completed - Practice Again
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleStartLevel(index)}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold"
                    >
                      Start Level
                    </Button>
                  )}

                </CardContent>
              </Card>
            );
          })}

        </div>
      )}

      {/* 🔹 IF IN A LEVEL - SHOW WORD ONE BY ONE */}
      {selectedLevel !== null && (
        <div className="w-full max-w-2xl">

          {/* LEVEL HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${
isDarkMode ? "text-white" : "text-teal-700"
}`}>
              {levels[selectedLevel].name}
            </h2>
            <Button
              variant="outline"
              onClick={() => setSelectedLevel(null)}
              className={`${
isDarkMode
? "bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
: "text-gray-600"
}`}
            >
              ← Back
            </Button>
          </div>

          {/* WORD CARD */}
          <Card className={`rounded-3xl shadow-xl ${
isDarkMode
? "bg-slate-900/95 border border-slate-700"
: "bg-white/90 shadow-teal-200/30"
}`}>
            <CardContent className="p-8 flex flex-col items-center gap-6">

              {/* WORD TEXT */}
              <h1 className={`text-5xl font-bold ${isDarkMode ? "text-white" : "text-teal-600"}`}>
                {levels[selectedLevel].words[currentWordIndex].text}
              </h1>

              {/* WORD IMAGE */}
              <div className={`w-full max-w-xs h-70 ${isDarkMode ? "bg-slate-800" : "bg-gray-100"} rounded-lg overflow-hidden flex items-center justify-center`}>
                {!imageError ? (
                  <img
                    key={currentWordIndex}
                    src={`/words/${levels[selectedLevel].words[currentWordIndex].img}`}
                    alt={levels[selectedLevel].words[currentWordIndex].text}
                    className="w-full h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-slate-400 text-lg">📷 Image not available</p>
                    <p className="text-slate-400 text-sm mt-2">
                      {levels[selectedLevel].words[currentWordIndex].text}
                    </p>
                  </div>
                )}
              </div>

              {/* PROGRESS */}
              <div className="text-center">
                <p className={`${isDarkMode ? "text-slate-300" : "text-gray-600"} font-semibold`}>
                  Word {currentWordIndex + 1} of {levels[selectedLevel].words.length}
                </p>
                <div className={`w-64 h-2 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"} rounded-full mt-2 overflow-hidden`}>
                  <div
                    className="h-full bg-teal-600 transition-all duration-300"
                    style={{
                      width: `${((currentWordIndex + 1) / levels[selectedLevel].words.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

            </CardContent>
          </Card>

          {/* NAVIGATION BUTTONS */}
          <div className="flex gap-4 justify-center mb-6">
            <Button
              onClick={handlePrevious}
              disabled={currentWordIndex === 0}
              className={`px-6 py-2 ${
isDarkMode
? "bg-slate-700 hover:bg-slate-600 text-white"
: ""
}`}
            >
              ← Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                selectedLevel !== null &&
                currentWordIndex === levels[selectedLevel].words.length - 1
              }
              className={`px-6 py-2 ${
isDarkMode
? "bg-slate-700 hover:bg-slate-600 text-white"
: ""
}`}
            >
              Next →
            </Button>
          </div>

          {/* COMPLETE LEVEL BUTTON */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleCompleteLevel}
              className={`w-full ${
isDarkMode
? "bg-emerald-600 hover:bg-emerald-700 text-white"
: "bg-emerald-600 hover:bg-emerald-700 text-white"
}`}
            >
              ✅ Complete {levels[selectedLevel].name}
            </Button>
          </div>

        </div>
      )}

    </div>
  );
}