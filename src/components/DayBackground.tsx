import Cloud from './ui/Cloud';

const DayBackground = () => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="sun-animation">
        <div className="sun" />
      </div>
      <Cloud className="cloud1" startPosition={windowWidth} />
      <Cloud className="cloud2" startPosition={windowWidth + 400} />
      <Cloud className="cloud3" startPosition={windowWidth + 800} />
      <div className="mountain mountain1" />
      <div className="mountain mountain2" />
      <div className="mountain mountain3" />
      <div className="ground" />
    </div>
  );
};

export default DayBackground; 