import './App.css';
import './index.css';

import React, { useState, useEffect } from 'react';
import { Bell, Pause, Play, RotateCcw, Settings, Sun, Moon } from 'lucide-react';
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
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Check if it's daytime (between 6 AM and 6 PM)
  useEffect(() => {
    const checkDayTime = () => {
      const hour = new Date().getHours();
      setIsDaytime(hour >= 6 && hour < 18); //for test only night-> setIsDaytime(hour >= 18 && hour < 6);
    };
    
    checkDayTime(); // Initial check
    const interval = setInterval(checkDayTime, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            playAlertSound();
            showAlert();
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
  }, [isRunning, timeLeft, isBreak, sessionDuration, breakDuration]);

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

  const playAlertSound = () => {
    const audio = new Audio('data:audio/wav;base64,//uQRAAAA');
    audio.play().catch(e => console.log('Audio play failed:', e));
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
  };

  // Modify the theme logic to properly handle dark mode
  const theme = isDarkMode ? 'night-bg' : (isDaytime ? 'day-bg' : 'night-bg');
  
  // Determine which background to show based on both isDarkMode and isDaytime
  const shouldShowNightBackground = isDarkMode || !isDaytime;

  // Dynamic background elements
  const DayBackground = () => (
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
  );

  const NightBackground = () => (
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
  );

  return (
    <>
      {showLandingPage ? (
        <LandingPage 
          onStart={() => setShowLandingPage(false)} 
          isDaytime={!shouldShowNightBackground}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className={`flex justify-center items-center min-h-screen relative ${theme}`}>
          {shouldShowNightBackground ? <NightBackground /> : <DayBackground />}
          
          <Card className={`w-96 ${shouldShowNightBackground ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-lg`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className={shouldShowNightBackground ? 'text-gray-300' : 'text-gray-900'}>
                  Pomodoro Timer
                </CardTitle>
                <div className="flex gap-2">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100"
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
                          Timer Settings
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
                          <label>Notifications</label>
                          <Switch checked={notifications} onCheckedChange={setNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                          <label>Sound</label>
                          <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
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