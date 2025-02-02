import { useState, useEffect } from 'react';
import { TimerSection } from './TimerSection';
import { TaskManager } from './TaskManager';
import { Statistics } from './Statistics';
import { Settings } from './Settings';

const Features = ({ settings, setSettings, presets, setPresets, handleSessionComplete }) => {
  const [sessions, setSessions] = useState([]);

  return (
    <div className="features-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <TimerSection 
          settings={settings}
          presets={presets}
          onSessionComplete={handleSessionComplete}
        />

        <TaskManager />

        <Statistics />

        <Settings 
          settings={settings}
          setSettings={setSettings}
          presets={presets}
          setPresets={setPresets}
        />
      </div>
    </div>
  );
};

export default Features; 