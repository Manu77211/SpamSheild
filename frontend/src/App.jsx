import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Chatbot from './components/Chatbot';
import ToastProvider from './components/ToastProvider';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <ToastProvider />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
