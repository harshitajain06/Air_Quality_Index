import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState(""); // Input City Name
  const [citySearch, setCitySearch] = useState([]); // Search and Fetch City Data
  const [aqi, setAqi] = useState(null);

  const fetchCity = async () => {
    const fet = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=c7ae85ff3d6d653f15ea2726932832c3`
    );
    const res = await fet.json();
    setCitySearch(res);
  };

  const fetchAqi = async (lat, lon) => {
    const fet1 = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=c7ae85ff3d6d653f15ea2726932832c3`
    );
    const res1 = await fet1.json();
    setAqi(res1);
  };

  useEffect(() => {
    if (citySearch.length > 0) {
      fetchAqi(citySearch[0].lat, citySearch[0].lon);
    }
  }, [citySearch]);

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("fetched");
          fetchCity();
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeholder="Add City..."
        />
        <input type="submit" value="Search" />
      </form>
      <div>
        {aqi && (
          <div>
            <h1>AQI: {aqi.list[0].main.aqi}</h1>
            <h1>CO: {aqi.list[0].components.co}</h1>
            <h2>{citySearch[0].lat}</h2>
            <h2>{citySearch[0].name}</h2>
            <h4>{citySearch[0].state}</h4>
            <h4>{citySearch[0].country}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
