import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureDetails from "./components/TemperatureDetails";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "jalgaon" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        // console.log(data);
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) {
      return "from-cyan-700 to-blue-700";
    }
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) {
      return "from-cyan-700 to-blue-700 shadow-blue-300";
    }
    return "from-yellow-700 to-orange-700 shadow-yellow-300";
  };

  return (
    <div
      className={`mx-auto md:w-fit max-w-screen-xl my-32 py-5 px-32 bg-gradient-to-br h-fit shadow-lg ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureDetails weather={weather} />
        </>
      )}
      <ToastContainer
        autoClose={5000}
        position="top-right"
        theme="colored"
        newestOnTop={true}
      />
    </div>
  );
}

export default App;
