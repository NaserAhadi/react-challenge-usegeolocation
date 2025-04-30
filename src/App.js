import "./App.css";
import { useState } from "react";
import { useGeolocation } from "./useGeolocation";

function App() {
  const [countClicks, setCountClicks] = useState(0);
  const {
    position: { lat, lng },
    isLoading,
    error,
    getPosition,
  } = useGeolocation();

  function handleClick() {
    setCountClicks((c) => c + 1);
    getPosition();
  }
  return (
    <div className="App">
      <button onClick={handleClick} disabled={isLoading}>
        Get My Location
      </button>
      {isLoading && <p>Loading ...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <>
          <div style={{ margin: 20 }}>
            <span>Your GPS Position: </span>
            <a
              href={`https://www.openstreetmap.org/#map9/${lat}/${lng}`}
              target="_blank"
              rel="noreferrer"
            >
              {lat}, {lng}
            </a>
          </div>
          <p>You requested position {countClicks} times</p>
        </>
      )}
    </div>
  );
}

export default App;
