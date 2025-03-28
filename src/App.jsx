import { useState } from "react";
import axios from "axios";
import "./App.css"; // Import updated CSS

export default function App() {
  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchCat = async () => {
    try {
      const response = await axios.get("https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=1", {
        headers: { "x-api-key": "live_BFyY4HHGeqBeahMdXu0VmiKmK24PA2G00Nm5kxuluCYpEpAD2H0CzBrAoJ7OIEfL" }, // Replace with your API key
      });

      const data = response.data[0];
      console.log(data)
      // Check if the breed is banned
      if (data.breeds.length > 0 && banList.includes(data.breeds[0].name)) {
        fetchCat(); // If banned, fetch another cat
      } else {
        setCat(data);
        setHistory((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToBanList = (breed) => {
    if (!banList.includes(breed)) {
      setBanList([...banList, breed]);
    }
  };

  const removeFromBanList = (breed) => {
    setBanList(banList.filter((b) => b !== breed));
  };

  return (
    <div className="app-layout">
      {/* History Panel (Left) */}
      {/* History Panel (Left) */}
{/* History Panel (Left) */}
<div className="history-panel">
  <h2>View History</h2>
  <div className="history-list">
    {history.map((item, index) => (
      <div key={index} className="history-item">
        <img src={item.url} alt="Seen Cat" className="history-img" />
        <p className="history-origin">
          A {item.breeds[0]?.name || "Unknown"} cat from {item.breeds[0]?.origin || "Unknown"}
        </p>
      </div>
    ))}
  </div>
</div>



      {/* Discover Panel (Center) */}
      <div className="discover-panel">
        <h1 className="title">Trippin' on Cats</h1>
        <p className="subtitle">Discover cats from your wildest dreams!</p>
        <p className="subtitle">😺😸😹😻😼😽🙀😿😾</p>
        <button onClick={fetchCat} className="btn-discover">
          🔀 Discover
        </button>

        {cat && (
  <div className="cat-display">
    <h2 className="cat-name">{cat.breeds[0]?.name || "Unknown"}</h2>

    <div className="cat-detail">


        <button onClick={() => addToBanList(cat.breeds[0]?.origin)} className="cat-info">
        {cat.breeds[0]?.origin || "Unknown"}
        </button>

        <button onClick={() => addToBanList(cat.breeds[0]?.life_span)} className="cat-info">
        {cat.breeds[0]?.life_span || "Unknown"} years
        </button>

        <button onClick={() => addToBanList(cat.breeds[0]?.weight?.metric)} className="cat-info">
        {cat.breeds[0]?.weight?.metric || "Unknown"} kg
        </button>
    </div>
    <img src={cat.url} alt="Random Cat" className="cat-img" />
  </div>
)}

      </div>

      {/* Ban List Panel (Right) */}
      <div className="banlist-panel">
        <h2>Banned Breeds</h2>
        {banList.length === 0 ? (
          <p className="empty-banlist">No breeds banned yet</p>
        ) : (
          <ul className="banlist">
            {banList.map((breed, index) => (
              <li key={index} className="ban-item" onClick={() => removeFromBanList(breed)}>
                ❌ {breed} (Unban)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
