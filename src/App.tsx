import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { SignupForm } from "./components/auth/SignupForm";
import { LoginForm } from "./components/auth/LoginForm";
import { SpeakerList } from "./pages/SpeakerList";
import { SpeakerAuthPage } from "./pages/SpeakerAuth";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={<SignupForm initialUserType="user" />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/speakers" element={<SpeakerList />} />
            <Route
              path="/signup-as-speaker"
              element={<SignupForm initialUserType="speaker" />}
            />
            {/* New route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
