import React, { useState, useEffect } from 'react';

const quotes = [
  "The only way to do great work is to love what you do.",
  "Focus on being productive instead of busy.",
  // ... more quotes
];

const Quote = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 300000); // Change quote every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm italic text-center mt-4 opacity-75">
      "{quote}"
    </div>
  );
};

export default Quote; 