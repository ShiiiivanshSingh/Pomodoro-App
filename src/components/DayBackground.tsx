import Cloud from './ui/Cloud';

const DayBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <Cloud className="cloud cloud1" startPosition={0} />
    <Cloud className="cloud cloud2" startPosition={50} />
    <Cloud className="cloud cloud3" startPosition={100} />
    <div className="mountain mountain1" />
    <div className="mountain mountain2" />
    <div className="mountain mountain3" />
    <div className="ground" />
  </div>
); 