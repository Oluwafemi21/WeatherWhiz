import { useState } from "react";
import hero from "../assets/hero.svg";
// import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const Forecast = () => {
    const api_key = import.meta.env.VITE_API_KEY;
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState("");


    const fetchWeatherData = (long:string,lat:string) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
            .then((res) => console.log(res.data))
            .catch(error => console.log(error))
    };

    const fetchCityLongitude = (city: string) => {
        setLoading(true);
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
                .then((res) => fetchWeatherData(res.data[0].lon,res.data[0].lat))
                .catch((error) => setError(error))
                .finally(() =>  setLoading(false))
    };

   

    return (
        <main>
            <div className="mt-5 rounded-full flex items-center divide-x *:p-2">
                <input
                    className="flex-1 rounded-l-full border bg-transparent outline-none ring-react-black focus:ring-1 text-react-black"
                    type="text"
                    placeholder="Search for a city, e.g London"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <button
                    onClick={() => {
                        fetchCityLongitude(inputValue);
                    }}
                    className="outline-none focus:ring-1 ring-react-black bg-react-black text-white border-react-black rounded-r-full border cursor-pointer hover:opacity-80"
                >
                    Search
                </button>
            </div>
            {/* if there is an error */}
            {error && (
                <p className="text-red-500 text-center my-5">
                    'An error has occurred:' {error}
                </p>
            )}

            {/* if there is a weather data and loading has ended */}
            
            
            {/* when it is loading */}
            {loading  ? (
                <p className="text-center my-5">
                    Fetching weather information...
                </p>
            ):
            (weatherData ? (
                // <WeatherInformation weather={weatherData} />
                <p>Hey I have something cool to show you</p>
            ) : (
                <p>No data found</p>
            )
                
            )}

            {!loading && !error && (
                <div>
                    <div className="grid place-items-center gap-5 py-6">
                        <img
                            className="h-72 object-contain"
                            src={hero}
                            alt="Weather image icon"
                        />
                        <h1 className="text-2xl font-semibold italic">
                            Know before you go...
                        </h1>
                    </div>
                </div>
            ) }
        </main>
    );
};

export default Forecast;
