import { useState } from "react";
import { WeatherType } from '../../types'
import hero from "../assets/hero.svg";
// import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import WeatherInformation from "./WeatherInformation";
import Loader from "./Loader";


const Forecast = () => {
    const api_key = import.meta.env.VITE_API_KEY;
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    // const [recentSearch,setRecentSearches] = useState<string[]>([])
    const [showRecent,setShowRecent] = useState(false)
    const [error, setError] = useState<null | string>(null);
    const [weatherData, setWeatherData] = useState<WeatherType | null>(null);

    const fetchWeatherData = (long: string, lat: string) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
        .then((res) => {
            setWeatherData(res.data);
            setLoading(false);
        })
            .catch(error => setError(error.message))
    };

    const fetchCityLongitude = (city: string) => {
        if(!inputValue) setInputValue(city)
        setError(null)
        setLoading(true);
        saveDataToLocalStorage(city)
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
            .then((res) => {
                if (!res.data.length) {
                    setError('You have searched a non-existent location')
                    setLoading(false)
                    return
                } 
                fetchWeatherData(res.data[0].lon,res.data[0].lat)
                
            })
                .catch((error) => {
                    setError(error.message)
                    setLoading(false);
                })
    };

    const resetSearch = () => {
        setError(null)
        setWeatherData(null)
        setInputValue("")
    }

    const saveDataToLocalStorage = (item: string) => {
        const existingData = localStorage.getItem('cities') ? getItemsFromLocalStorage() : [];
        const itemExists = existingData.includes(item);

        if (!itemExists) {
            if (existingData.length === 5) {
                existingData.pop();
                // Add the new item only if it doesn't already exist
                const updatedData = [...existingData,item];
                localStorage.setItem('cities', JSON.stringify(updatedData)); 
            } else {
                const updatedData = [...existingData,item];
                localStorage.setItem('cities', JSON.stringify(updatedData)); 
            }
             
        } else {
            return
        }
    }

    const removeItemFromLocalStorage = (itemToRemove: string) => {
        setShowRecent(false)
        const existingData = localStorage.getItem('cities');

            if (!existingData) {
            // No data to remove, exit gracefully
            return;
            }

            const parsedData = JSON.parse(existingData); // Assuming data is an array

            // Filter out the item to remove
            const filteredData = parsedData.filter((item:string) => item !== itemToRemove);

            // Update localStorage
            localStorage.setItem('cities', JSON.stringify(filteredData));
    }
    
    const getItemsFromLocalStorage = () => {
        const recentSearches = localStorage.getItem('cities');
        return (recentSearches ? JSON.parse(recentSearches) : []);
    }

    const showRecentSearches = () => {
        if (getItemsFromLocalStorage().length) setShowRecent(true)
        else setShowRecent(false)
    }


    return (
        <main>
            <div className="mt-5 rounded-full flex items-center divide-x">
                <div className="relative w-full">
                    <input
                        className="w-full p-2 flex-1 rounded-l-full border bg-transparent outline-none focus:outline-1 focus:outline-black focus:outline-offset-[-1px] text-react-black peer"
                        type="search"
                        placeholder="Search for a city, e.g London"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onFocus={() => showRecentSearches()}
                    />
                    {showRecent && getItemsFromLocalStorage().length > 1 && (
                        <div className="absolute h-fit w-full top-14 z-20 bg-white text-black rounded shadow p-3" onMouseLeave={()=> setShowRecent(false)}>
                        {getItemsFromLocalStorage().length  && (
                        <ul>
                            {getItemsFromLocalStorage().reverse().slice(0,5).map((city:string) => {
                                return <li key={city} className="flex items-center w-full justify-between p-1 hover:bg-gray-50 cursor-pointer">
                                    <button className="flex items-center gap-2 flex-1" onClick={()=> fetchCityLongitude(city)}>
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M20.59 22L15 16.41V7h2v8.58l5 5.01z"/><path fill="currentColor" d="M16 2A13.94 13.94 0 0 0 6 6.23V2H4v8h8V8H7.08A12 12 0 1 1 4 16H2A14 14 0 1 0 16 2"/></svg>
                                            <p className="capitalize"> {city}</p>
                                        </button>
                                    <button className="hover:underline text-red-500 text-sm" onClick={()=> removeItemFromLocalStorage(city)}>Remove</button>
                                </li>
                            })}
                        </ul>
                    )}
                    <p className="text-xs mt-2">Recent searches</p>
                </div>
                    )}
                </div>
                <button
                    onClick={() => {
                        fetchCityLongitude(inputValue);
                    }}
                    className="p-2 disabled:cursor-not-allowed outline-none focus:outline-1 focus:outline-black focus:outline-offset-[-1px] bg-react-black text-white border-react-black rounded-r-full border cursor-pointer hover:opacity-80"
                    disabled={loading || !inputValue.length}
                >
                    Search
                </button>
            </div>

            {error && (
                <div className="flex flex-col items-center justify-center gap-2 mt-5 bg-white shadow border-2 border-red-500 w-fit mx-auto p-3 rounded-xl">
                    <div className="text-red-500 flex items-center justify-between w-full">
                        <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm italic">An error has occurred </p>
                        </div>
                      
                        <button className="text-red-500" onClick={resetSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-red-500">{error}</p>
                </div>
            )}
            
            {loading && (
                <Loader />
            )
            }

            

            {!loading && !weatherData && !error ?  (
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
            ): (weatherData && !error && !loading && (
                <WeatherInformation weatherData={weatherData} />
           ))}


            
            

            
        </main>
    );
};

export default Forecast;
