import './App.css';
import './index.css';

import React, { useState, useEffect, memo } from 'react';
import { Bell, Pause, Play, RotateCcw, Settings, Sun, Moon, Clock, Info, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Slider } from './components/ui/slider';
import { Alert, AlertDescription } from './components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import LandingPage from './components/LandingPage';
import { Switch } from './components/ui/switch';

// Memoize the background components to prevent re-renders
const MemoizedDayBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="sun-animation">
      <div className="sun" />
    </div>
    <div className="cloud cloud1" />
    <div className="cloud cloud2" />
    <div className="cloud cloud3" />
    <div className="mountain mountain1" />
    <div className="mountain mountain2" />
    <div className="mountain mountain3" />
    <div className="ground" />
  </div>
));

const MemoizedNightBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="stars" />
    <div className="shooting-star" />
    <div className="moon">
      <div className="moon-craters" />
    </div>
    <div className="cloud cloud1" />
    <div className="cloud cloud2" />
    <div className="cloud cloud3" />
    <div className="mountain mountain1 night-mountain" />
    <div className="mountain mountain2 night-mountain" />
    <div className="mountain mountain3 night-mountain" />
    <div className="ground night" />
  </div>
));

const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  //const [showSettings, setShowSettings] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isDaytime, setIsDaytime] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showAbout, setShowAbout] = useState(false);

  // Move timer logic into a separate useEffect
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            showAlert();
            if (!isBreak) {
              setCompletedSessions(prev => prev + 1);
            }
            if (isBreak) {
              setIsBreak(false);
              return sessionDuration;
            } else {
              setIsBreak(true);
              return breakDuration;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak, sessionDuration, breakDuration]);

  // Add time check and update effect
  useEffect(() => {
    const checkTimeAndUpdate = () => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      // Set dark mode if time is between 6 PM (18) and 6 AM
      setIsDarkMode(hour >= 18 || hour < 6);
    };
    
    checkTimeAndUpdate(); // Initial check
    const interval = setInterval(checkTimeAndUpdate, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(sessionDuration);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  const showAlert = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const updateSessionDuration = (newValue) => {
    const duration = newValue[0] * 60;
    setSessionDuration(duration);
    if (!isBreak && !isRunning) setTimeLeft(duration);
  };

  const updateBreakDuration = (newValue) => {
    const duration = newValue[0] * 60;
    setBreakDuration(duration);
    if (isBreak && !isRunning) setTimeLeft(duration);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setIsDaytime(!isDaytime);
  };

  // Modify the theme logic to use only isDarkMode
  const theme = isDarkMode ? 'night-bg' : 'day-bg';
  
  // Use only isDarkMode to determine background
  const shouldShowNightBackground = isDarkMode;

  // Format time for display
  const formatTimeDisplay = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  // Add function to get custom message based on hour
  const getTimeMessage = (hour) => {
    if (hour >= 5 && hour < 12) {
      return "Good morning! Perfect time for deep focus.";
    } else if (hour >= 12 && hour < 15) {
      return "Good afternoon! Keep up the momentum.";
    } else if (hour >= 15 && hour < 17) {
      return "Mid-afternoon! Push through with focus.";
    } else if (hour >= 17 && hour < 20) {
      return "Early evening! Make the most of remaining daylight.";
    } else if (hour >= 20 && hour < 23) {
      return "Evening time! Wind down with focused work.";
    } else if (hour >= 23 || hour < 1) {
      return "Late night! Consider resting soon.";
    } else if (hour >= 1 && hour < 5) {
      return "It's very late! Make sure to rest well.";
    }
    return "Stay focused!";
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleTimer();
      } else if (e.code === 'KeyR') {
        resetTimer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTimer, resetTimer]);

  return (
    <>
      {showLandingPage ? (
        <LandingPage 
          onStart={() => setShowLandingPage(false)} 
          isDaytime={!shouldShowNightBackground}
          isDarkMode={isDarkMode}
        />
      ) : showAbout ? (
        <div className={`min-h-screen relative ${theme}`}>
          {shouldShowNightBackground ? <MemoizedNightBackground /> : <MemoizedDayBackground />}
          <div className="container mx-auto px-4 py-8 relative z-10">
            <button
              onClick={() => setShowAbout(false)}
              className={`mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-lg ${
                shouldShowNightBackground 
                  ? 'bg-gray-900/90 text-gray-200 hover:bg-gray-800/90' 
                  : 'bg-white/90 text-gray-800 hover:bg-gray-50/90'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Focus
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* About Card */}
              <div className={`p-6 rounded-lg backdrop-blur-lg ${
                shouldShowNightBackground ? 'bg-gray-900/90 text-gray-200' : 'bg-white/90 text-gray-800'
              }`}>
                <h2 className="text-xl font-bold mb-4">✨ About FocusBuddy</h2>
                <p className="text-sm">Your friendly companion for productive focus sessions! Stay motivated with beautiful day/night themes and encouraging messages. 🌟</p>
              </div>

              {/* Features Card */}
              <div className={`p-6 rounded-lg backdrop-blur-lg ${
                shouldShowNightBackground ? 'bg-gray-900/90 text-gray-200' : 'bg-white/90 text-gray-800'
              }`}>
                <h2 className="text-xl font-bold mb-4"> Key Features</h2>
                <ul className="text-sm space-y-2">
                  <li>🌙 Smart Day/Night Theme</li>
                  <li>⚡ Quick Keyboard Controls</li>
                  <li>📊 Session Tracking</li>
                  <li>💫 Beautiful Animations</li>
                  <li>📱 Mobile Friendly</li>
                </ul>
              </div>

              {/* Controls Card */}
              <div className={`p-6 rounded-lg backdrop-blur-lg ${
                shouldShowNightBackground ? 'bg-gray-900/90 text-gray-200' : 'bg-white/90 text-gray-800'
              }`}>
                <h2 className="text-xl font-bold mb-4">⌨️ Quick Controls</h2>
                <div className="text-sm space-y-2 text-center">
                  <p><code className={`px-2 py-1 rounded ${shouldShowNightBackground ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>Space</code> → Start/Pause</p>
                  <p><code className={`px-2 py-1 rounded ${shouldShowNightBackground ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>R</code> → Reset Timer</p>
                </div>
              </div>

              {/* Developer Card */}
              <div className={`p-6 rounded-lg backdrop-blur-lg ${
                shouldShowNightBackground ? 'bg-gray-900/90 text-gray-200' : 'bg-white/90 text-gray-800'
              }`}>
                <h2 className="text-xl font-bold mb-4">👋 Connect With Me</h2>
                <div className="text-sm space-y-2">
                  <a href="https://github.com/ShiiiivanshSingh" target="_blank" rel="noopener noreferrer" 
                    className="block hover:underline">🐱 GitHub</a>
                  <a href="https://www.linkedin.com/in/shivansh-pratap-singh-23b3b92b1" target="_blank" rel="noopener noreferrer"
                    className="block hover:underline">💼 LinkedIn</a>
                  <a href="https://x.com/de_mirage_fan" target="_blank" rel="noopener noreferrer"
                    className="block hover:underline">🐦 Twitter</a>
                </div>
              </div>

              {/* Repository Card */}
              <div className={`p-6 rounded-lg backdrop-blur-lg ${
                shouldShowNightBackground ? 'bg-gray-900/90 text-gray-200' : 'bg-white/90 text-gray-800'
              }`}>
                <h2 className="text-xl font-bold mb-4">📦 Open Source</h2>
                <p className="text-sm mb-4">This project is open source! Feel free to contribute or star the repository.</p>
                <a 
                  href="https://github.com/ShiiiivanshSingh/FocusBuddy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm ${
                    shouldShowNightBackground 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  🔗 View on GitHub
                </a>
              </div>

              {/* Thank You Card */}
              <div className={`p-6 rounded-lg backdrop-blur-lg ${
                shouldShowNightBackground ? 'bg-gray-900/90 text-gray-200' : 'bg-white/90 text-gray-800'
              }`}>
                <h2 className="text-xl font-bold mb-4">💝 Thank You Note</h2>
                <p className="text-sm">
                  Thank you for using FocusBuddy! This project was created with love and care to help you stay focused and productive. 
                  Your support means the world to me. Hope this little buddy helps you achieve your goals! 
                  <span className="block mt-2">- Shivansh</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex justify-center items-center min-h-screen relative ${theme}`}>
          {shouldShowNightBackground ? <MemoizedNightBackground /> : <MemoizedDayBackground />}
          
          {/* Updated Time Display with custom message */}
          <div className={`absolute top-4 left-2 right-14 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 md:px-4 rounded-lg md:rounded-full ${
            isDarkMode ? 'bg-gray-800/80 text-gray-200' : 'bg-white/80 text-gray-800'
          } backdrop-blur-sm text-xs md:text-base`}>
            <Clock className="h-4 w-4 hidden md:block" />
            <div className="font-medium text-center w-full">
              {formatTimeDisplay(currentTime)} - {getTimeMessage(currentTime.getHours())}
            </div>
          </div>

          {/* About Button */}
          <button
            onClick={() => setShowAbout(true)}
            className={`absolute top-4 right-2 p-2 rounded-full backdrop-blur-lg z-20 ${
              shouldShowNightBackground 
                ? 'bg-gray-900/90 text-gray-200 hover:bg-gray-800/90' 
                : 'bg-white/90 text-gray-800 hover:bg-gray-50/90'
            }`}
            aria-label="About FocusBuddy"
          >
            <Info className="h-5 w-5" />
          </button>

          <Card className={`w-[90%] max-w-sm md:w-96 mx-4 ${shouldShowNightBackground ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-lg`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className={shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'}>
                  FocusBuddy
                </CardTitle>
                <div className="flex gap-2">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100"
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? 
                      <Sun className="h-5 w-5 text-yellow-500" /> : 
                      <Moon className="h-5 w-5 text-blue-300" />
                    }
                  </button>
                  <Dialog>
                    <DialogTrigger>
                      <Settings className={`h-5 w-5 ${shouldShowNightBackground ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`} />
                    </DialogTrigger>
                    <DialogContent className={shouldShowNightBackground ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                      <DialogHeader>
                        <DialogTitle className={shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'}>
                          FocusBuddy Settings
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div>
                          <label className={`text-sm font-medium ${shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'}`}>
                            Work Duration (minutes): {sessionDuration / 60}
                          </label>
                          <Slider
                            defaultValue={[sessionDuration / 60]}
                            max={60}
                            min={1}
                            step={1}
                            onValueChange={updateSessionDuration}
                          />
                        </div>
                        <div>
                          <label className={`text-sm font-medium ${shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'}`}>
                            Break Duration (minutes): {breakDuration / 60}
                          </label>
                          <Slider
                            defaultValue={[breakDuration / 60]}
                            max={15}
                            min={1}
                            step={1}
                            onValueChange={updateBreakDuration}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className={`${shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'}`}>
                            Notifications
                          </label>
                          <Switch checked={notifications} onCheckedChange={setNotifications} />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div>
                  <h2 className={`text-xl ${shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'} mb-2`}>
                    {isBreak ? "Break Time!" : "Work Time!"}
                  </h2>
                  <div className={`text-6xl font-mono ${shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={toggleTimer}
                    title="Space to Start/Pause"
                    className={`inline-flex items-center px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      shouldShowNightBackground 
                        ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400'
                        : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
                    } text-white`}
                  >
                    {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    <span className="ml-2">{isRunning ? "Pause" : "Start"}</span>
                  </button>
                  <button
                    onClick={resetTimer}
                    className={`inline-flex items-center px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      shouldShowNightBackground 
                        ? 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-400'
                        : 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500'
                    } text-white`}
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span className="ml-2">Reset</span>
                  </button>
                </div>
                <div className="text-center mt-4">
                  <span className={`text-sm ${shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'}`}>
                    Sessions completed today: {completedSessions}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {showNotification && (
            <Alert className="fixed bottom-4 right-4 w-72">
              <Bell className="h-4 w-4" />
              <AlertDescription>
                {isBreak ? "Break time is over!" : "Work session is over!"}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </>
  );
};

export default App;