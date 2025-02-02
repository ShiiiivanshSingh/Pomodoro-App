import { useEffect } from 'react';

export function useKeyboardShortcuts({
  onStart,
  onPause,
  onReset,
  onSkipBreak,
}) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      switch (e.key) {
        case 'Space':
          e.preventDefault();
          onStart();
          break;
        case 'p':
          onPause();
          break;
        case 'r':
          onReset();
          break;
        case 's':
          onSkipBreak();
          break;
        default:
          // Handle unrecognized keys or do nothing
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onStart, onPause, onReset, onSkipBreak]);
} 