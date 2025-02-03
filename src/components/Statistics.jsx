import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { LineChart, HeatMap } from './charts';
import { useStats } from '../hooks/useStats';
import { formatTime } from '../utils/timeUtils';
import { Stat } from './ui/stat';

const Statistics = ({ completedSessions, totalFocusTime }) => (
  <div className="grid grid-cols-2 gap-4 mt-6">
    <div className="text-center p-4 bg-opacity-20 rounded">
      <div className="text-2xl font-bold">{completedSessions}</div>
      <div className="text-sm">Sessions</div>
    </div>
    <div className="text-center p-4 bg-opacity-20 rounded">
      <div className="text-2xl font-bold">{Math.floor(totalFocusTime / 60)}h</div>
      <div className="text-sm">Focus Time</div>
    </div>
  </div>
);

export default Statistics; 