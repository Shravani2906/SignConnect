import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useDarkMode } from "@/context/DarkModeContext";

export default function Streaks() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile") || "null");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  const [viewDate, setViewDate] = useState(new Date());
  const today = viewDate;
  const todayStr = today.toISOString().split('T')[0];
  

  const completedDates: string[] = JSON.parse(
    localStorage.getItem("quizDatesCompleted") || "[]"
  );

  let currentStreak = Number(localStorage.getItem("currentStreak") || 0);
  const bestStreak = Number(localStorage.getItem("bestStreak") || 0);

  const goPrevMonth = () => {
  setViewDate(
    new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
  );
};

const goNextMonth = () => {
  setViewDate(
    new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
  );
};

  // Reset streak if missed yesterday
  const lastDate = completedDates[completedDates.length - 1];

  if (lastDate) {
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate !== todayStr && lastDate !== yesterdayStr) {
      currentStreak = 0;
      localStorage.setItem("currentStreak", "0");
    }
  }

  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthName = today.toLocaleString("default", { month: "long" });

  const boxes = [];

  for (let i = 0; i < firstDay; i++) {
    boxes.push(<div key={"empty" + i}></div>);
  }

  for (let day = 1; day <= totalDays; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isCompleted = completedDates.includes(dateString);
    const isToday = day === today.getDate();

    boxes.push(
      <div
        key={day}
        className={`h-12 rounded-xl flex items-center justify-center font-semibold
        ${
          isCompleted
            ? "bg-green-500 text-white"
            : isToday
            ? "bg-orange-200 text-black"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {day}
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 transition-colors ${
    isDarkMode
      ? "bg-gradient-to-br from-slate-700 via-slate-900 to-slate-800"
      : "bg-gradient-to-br from-teal-50 via-cyan-100 to-slate-50"
  }`}>

      <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">
        🔥 Daily Streaks
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Current</p>
            <p className="text-2xl font-bold">{currentStreak}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Best</p>
            <p className="text-2xl font-bold">{bestStreak}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-bold">
              {completedDates.filter((d) =>
                d.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)
              ).length}
            </p>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between mb-6">
  <button
    onClick={goPrevMonth}
    className={`px-4 py-2 rounded-xl transition-colors ${
    isDarkMode
      ? "bg-teal-700 text-white hover:bg-teal-600"
      : "bg-teal-100 text-teal-800 hover:bg-teal-200"
  }`}
  >
    ← Prev
  </button>


  <button
    onClick={goNextMonth}
    className={`px-4 py-2 rounded-xl transition-colors ${
    isDarkMode
      ? "bg-teal-700 text-white hover:bg-teal-600"
      : "bg-teal-100 text-teal-800 hover:bg-teal-200"
  }`}
  >
    Next →
  </button>
</div>

      {/* Calendar */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-xl font-bold mb-4 text-center">
            {monthName} {year}
          </h2>

          <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold mb-2">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {boxes}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}