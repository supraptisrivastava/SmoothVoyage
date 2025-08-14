// src/pages/Home.jsx
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import Crazy3DBackground from "../components/Crazy3DBackground";

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?travel')" }}
    >
      <Crazy3DBackground>
      <header className="flex justify-between items-center px-6 py-4 bg-black/50 text-white">
        <h1 className="text-3xl font-bold tracking-wide">✈️ Trip Planner</h1>
        <ThemeToggle />
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center text-white bg-black/40 backdrop-blur-sm px-4">
        <h2 className="text-5xl font-bold mb-4">Plan Your Next Adventure</h2>
        <p className="text-lg mb-8 max-w-xl">
          Discover, plan, and collaborate on unforgettable trips with ease.
        </p>

        {!isAuthenticated && (
          <div className="flex gap-4">
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Get Started
            </button>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Sign In
            </button>
          </div>
        )}

        {isAuthenticated && (
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Go to Dashboard
          </button>
        )}
      </main>
      <Chatbot />
      </Crazy3DBackground>
    </div>
  );
};

export default Home;
