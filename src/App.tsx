import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import WordsPage from "./pages/WordsPage";
import GrammarPage from "./pages/GrammarPage";
import SpeakingPage from "./pages/SpeakingPage";
import ListeningPage from "./pages/ListeningPage";
import CommunityPage from "./pages/CommunityPage";
import AchievementsPage from "./pages/AchievementsPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/learn/words" element={<WordsPage />} />
          <Route path="/learn/grammar" element={<GrammarPage />} />
          <Route path="/learn/speaking" element={<SpeakingPage />} />
          <Route path="/learn/listening" element={<ListeningPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
