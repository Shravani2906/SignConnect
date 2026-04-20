import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from "@/context/DarkModeContext";

export default function Numbers() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [isLearning, setIsLearning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userProfile') || 'null');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const numbers = [
    { number: '1', description: 'Index finger pointing up, other fingers curled' },
    { number: '2', description: 'Index and middle finger extended upward' },
    { number: '3', description: 'Index, middle, and ring finger extended' },
    { number: '4', description: 'Four fingers extended, thumb closed' },
    { number: '5', description: 'All five fingers extended, palm open' },
    { number: '6', description: 'Thumb and fingers in specific position' },
    { number: '7', description: 'Index, middle, ring, and pinky extended' },
    { number: '8', description: 'Eight hand shape with specific hand position' },
    { number: '9', description: 'Nine hand shape with circular motion' },
    { number: '10', description: 'Thumbs together, fingers extended' },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : numbers.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < numbers.length - 1 ? prev + 1 : 0));
  };

  const current = numbers[currentIndex];

  if(!isLearning){
    return (
      <div className={`min-h-screen transition-colors ${
    isDarkMode
      ? "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white"
      : "bg-gradient-to-br from-cyan-100 via-teal-100 to-slate-50 text-slate-900"
  }`}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-teal-500 via-cyan-400 to-transparent opacity-80" />
          <div className="absolute -top-10 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-200 opacity-40 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">
          <div className={`mb-10 rounded-[2rem] border p-8 shadow-2xl backdrop-blur-xl text-center ${
  isDarkMode
    ? "bg-slate-900/90 border-slate-700"
    : "border-white/70 bg-white/80"
}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
              Sign Language Numbers
            </p>
            <h1 className={`text-4xl sm:text-5xl font-black  ${
  isDarkMode
    ? "text-white"
    : "text-slate-900"
} mt-4`}>
              Learn Numbers the Smart Way
            </h1>
            <p className={`mx-auto max-w-2xl ${isDarkMode ? "text-slate-400" : "text-slate-600"} text-base sm:text-lg mt-4`}>
              Practice number signs step by step, with clear visuals and a calming study flow.
            </p>
            <button
              onClick={() => {
                setIsLearning(true);
                setCurrentIndex(0);
              }}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-teal-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-teal-300/40 transition hover:-translate-y-0.5 hover:bg-teal-700"
            >
              Start Learning
            </button>
          </div>

        </div>
      </div>
    );
      
  }
  return (
    <div className={`min-h-screen transition-colors ${
    isDarkMode
      ? "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white"
      : "bg-gradient-to-br from-cyan-100 via-teal-100 to-slate-50 text-slate-900"
  }`}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-teal-500 via-cyan-400 to-transparent opacity-80" />
        <div className="absolute -top-10 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-200 opacity-40 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <div className={`mb-10 rounded-[2rem] border p-8 shadow-2xl backdrop-blur-xl text-center ${
  isDarkMode
    ? "bg-slate-900/90 border-slate-700"
    : "border-white/70 bg-white/80"
}`}>
          <div className="flex flex-col items-center text-center gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
              Sign Language Numbers
            </p>
            <h1 className={`text-4xl sm:text-5xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Learn Numbers the Smart Way
            </h1>
            
          
          </div>
        </div>

        
          <div className="grid gap-6 sm:grid-cols-3">
            
          </div>
        
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-8">
              <div className={`rounded-[2rem] border border-white/70 
                ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white/90 border-white/70"} p-8 shadow-lg shadow-slate-200/10`}>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-teal-700">Current Number</p>
                    <h2 className={`text-5xl font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {current.number}
                    </h2>
                  </div>
                </div>
                <p className={`text-lg leading-8 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {current.description}
                </p>
              </div>

              <div className={`rounded-[2rem] border border-white/70 
                ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white/90 border-white/70"} p-8 shadow-lg shadow-slate-200/10`}>
                <div className="flex justify-center">
                  <div className="w-full max-w-sm rounded-3xl bg-cyan-50 p-6 text-center shadow-inner shadow-cyan-100/80 mx-auto">
                    <p className="text-sm uppercase tracking-[0.24em] text-teal-700 mb-3">Progress</p>
                    <p className="text-4xl font-bold text-slate-900">
                      {currentIndex + 1}/10
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-[2rem] border border-white/70 ${isDarkMode ? "bg-slate-950/95" : "bg-slate-950/95"} p-6 text-white shadow-xl shadow-slate-900/40`}>
              <div className="rounded-[1.5rem] bg-gradient-to-br from-cyan-500 to-teal-600 p-4 shadow-inner shadow-cyan-600/40">
                <img
                  src={`/${current.number}.jpg`}
                  alt={`Sign for ${current.number}`}
                  className="w-full h-96 rounded-[1.5rem] object-contain bg-white"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/numbers.jpg';
                  }}
                />
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={handlePrevious}
                  className={`flex-1 rounded-full ${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-teal-100 text-teal-800 hover:bg-teal-200"} px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/20`}
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNext}
                  className={`flex-1 rounded-full ${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-teal-100 text-teal-800 hover:bg-teal-200"} px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/20`}
                >
                  Next →
                </button>
              </div>
              {/* <div className="mt-6 rounded-3xl bg-white/10 p-4 text-center text-sm text-slate-200">
                {currentIndex + 1} of {numbers.length} numbers
              </div> */}
            </div>
          </div>
        

        <div className={`mt-10 rounded-[2rem] border border-white/70 
          ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white/90 border-white/70"} p-8 text-center shadow-lg shadow-teal-200/10`}>
          <p className="text-sm uppercase tracking-[0.3em] text-teal-700 mb-3">Keep going</p>
          {/* <h3 className="text-2xl font-bold text-slate-900 mb-2">Numbers become natural with practice</h3>
          <p className="text-slate-600">
            Practice daily and you’ll learn number signs quickly and confidently.
          </p> */}
          <button
            onClick={() => setIsLearning(false)}
            className={`mt-6 inline-flex rounded-full 
                ${isDarkMode ? "bg-teal-600 hover:bg-teal-700" : "bg-slate-900 hover:bg-slate-800"} 
                px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800`}
          >
            Back to Overview
          </button>
        </div>
      </div>
    </div>
  );
}
