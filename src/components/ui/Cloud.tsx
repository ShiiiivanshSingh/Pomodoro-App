import * as React from "react";
import { cn } from "../../lib/utils";

interface CloudProps {
  className?: string; // Optional className prop
  startPosition: number; // Required startPosition prop
}

const Cloud: React.FC<CloudProps> = ({ className, startPosition }) => {
  const [position, setPosition] = React.useState(startPosition);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev >= 100 ? -10 : prev + 0.1)); // Move cloud to the right
    }, 100); // Update position every 100ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const cloudStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position}vw`, // Use the updated position
    top: `${Math.random() * 50}vh`, // Random height
  };

  return <div className={`cloud ${className}`} style={cloudStyle} />;
};

export default Cloud; 