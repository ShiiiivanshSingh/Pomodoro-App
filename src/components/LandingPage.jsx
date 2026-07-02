import React from 'react';
import { Play } from 'lucide-react';
import { Card } from './ui/card';

const LandingPage = ({ onStart, isDaytime, isDarkMode }) => {
  const DayBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="sun-animation">
        <div className="sun" />
      </div>
      <div className="cloud cloud1" />
      <div className="cloud cloud2" />
      <div className="mountain mountain1" />
      <div className="mountain mountain2" />
      <div className="ground" />
    </div>
  );

  const NightBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="stars" />
      <div className="moon" />
      <div className="cloud cloud1" />
      <div className="mountain mountain1" />
      <div className="mountain mountain2" />
      <div className="ground night" />
    </div>
  );

  const theme = isDarkMode ? 'night-bg' : (isDaytime ? 'day-bg' : 'night-bg');

  return (
    <div className={`min-h-screen flex items-center justify-center relative ${theme}`}>
      {isDarkMode || !isDaytime ? <NightBackground /> : <DayBackground />}
      
      <Card className={`w-96 ${isDaytime && !isDarkMode ? 'bg-white/90' : 'bg-gray-900/90'} backdrop-blur-lg text-center p-8`}>
        <h1 className={`text-4xl font-bold mb-6 ${isDaytime && !isDarkMode ? 'text-gray-900' : 'text-white'}`}>
          Pomodoro Timer
        </h1>
        <p className={`mb-8 ${isDaytime && !isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
          Break your work into focused sessions. Stay productive, take breaks.
        </p>
        <button
          onClick={onStart}
          className={`inline-flex items-center px-6 py-3 rounded-lg transition-colors ${
            isDaytime && !isDarkMode
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <Play className="h-5 w-5 mr-2" />
          Get Started
        </button>
      </Card>
    </div>
  );
};

export default LandingPage;
