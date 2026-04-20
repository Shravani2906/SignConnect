import { useNavigate, useLocation } from "react-router-dom";


export default function BottomNav() {
  const navigate = useNavigate();

  const location = useLocation();

  const tabs = [
    { icon: "🏠", label: "Home", path: "/" },
    { icon: "📘", label: "Learn", path: "/learn" },
    { icon: "🤟", label: "Practice", path: "/practice" }
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-lg">
      <div className="grid grid-cols-3 max-w-md mx-auto">

        {tabs.map((tab, i) => {
          const active = location.pathname === tab.path;

          return (
            <button
              key={i}
              onClick={() => navigate(tab.path)}
              className={`py-3 flex flex-col items-center text-xs transition ${
  active
    ? "text-teal-600 dark:text-cyan-400 font-bold"
    : "text-gray-500 dark:text-slate-400"
}`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}

      </div>
    </div>
  );
}