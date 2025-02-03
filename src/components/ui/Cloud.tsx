import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface CloudProps {
  className?: string; // Optional className prop
  startPosition: number; // Required startPosition prop
}

const Cloud: React.FC<CloudProps> = ({ className, startPosition }) => {
  const cloudRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const positionRef = useRef<number>(startPosition);
  const speedRef = useRef<number>(Math.random() * 0.3 + 0.2); // Random speed between 0.2 and 0.5

  useEffect(() => {
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (cloudRef.current) {
        positionRef.current -= speedRef.current * deltaTime * 0.1;
        
        // Reset position when cloud moves off screen
        if (positionRef.current < -200) {
          positionRef.current = window.innerWidth + 100;
        }

        cloudRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cloudRef}
      className={`cloud ${className}`}
      style={{ 
        position: 'absolute',
        willChange: 'transform',
        transform: `translateX(${startPosition}px)`
      }}
    />
  );
};

export default Cloud; 