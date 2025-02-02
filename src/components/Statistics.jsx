import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { LineChart, HeatMap } from './charts';
import { useStats } from '../hooks/useStats';
import { formatTime } from '../utils/timeUtils';
import { Stat } from './ui/stat';

const Statistics = () => {
  const stats = useStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Focus Time" value={formatTime(stats.focusTime)} />
          <Stat label="Break Time" value={formatTime(stats.breakTime)} />
          <Stat label="Completed Sessions" value={stats.completedSessions} />
          <Stat label="Completed Tasks" value={stats.completedTasks} />
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>All Time Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add all time statistics here */}
      </CardContent>
    </Card>
  );
};

export default Statistics; 