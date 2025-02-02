export type TimerState = {
  isRunning: boolean;
  timeLeft: number;
  mode: 'focus' | 'break';
  currentPreset: string;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type Preset = {
  id: string;
  name: string;
  focusTime: number;
  breakTime: number;
};

export type TimerSettings = {
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  alarmSound: string;
  alarmVolume: number;
}; 