import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profle";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Feedbackform" element={<FeedbackForm />} />
    </Routes>
  );
}

export default App;
