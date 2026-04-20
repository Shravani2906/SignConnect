import { Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import Home from "./Pages/Home";
import Learn from "./Pages/Learn";
import Alphabets from "./Pages/Alphabets";
import Numbers from "./Pages/Numbers";
import Words from "./Pages/Words";
import Quiz from "./Pages/Quiz";
import Streaks from "./Pages/Streaks";
import Practice from "./Pages/Practice";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Login from "./Pages/Login";
import BottomNav from "./Pages/BottomNav";

export default function App() {
  return (
    <DarkModeProvider>
      <div  className="min-h-screen pb-20 bg-white dark:bg-zinc-950 text-black dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/alphabets" element={<Alphabets />} />
        <Route path="/learn/numbers" element={<Numbers />} />
        <Route path="/learn/words" element={<Words />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
      <BottomNav />
      </div>
    </DarkModeProvider>
  );
}