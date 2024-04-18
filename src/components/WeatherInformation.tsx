import { useState } from "react";
import { WeatherType } from '../../types'

const WeatherInformation = (props: { weatherData: WeatherType }) => {
    const [currentTempType, setCurrentTempType] = useState("celcius");
    const celciusTemp = () => {
        return Math.round(props.weatherData.main.temp - 273.15).toFixed(2)
    }

    const fahrenheitTemp = () => {
        return Math.round((props.weatherData.main.temp - 273.15) * 9/5 + 32 ).toFixed(2)
    }

    const toggleTempType = () => {
        if (currentTempType === 'celcius')
            setCurrentTempType("fahrenheit")
        else 
            setCurrentTempType("celcius")
    }
    return (
        <>
            <div className='mt-5 min-h-[350px] flex items-center flex-col justify-center bg-react-black text-white border border-red-50 rounded-xl drop-shadow-lg'>
                <div>
                    <p className="text-xl text-center mb-5">{props.weatherData.name},{props.weatherData.sys.country}</p>
                </div>

                <div className="space-y-5 text-center">
                   <p className="capitalize">Weather Description - {props.weatherData.weather[0].description}</p>
                    

                    <p className="capitalize">Cloud data - {
                        props.weatherData.clouds.all
                    }%</p>

                    
                        <div className="flex items-center justify-center gap-2">
                            
                            <p className="flex items-center gap-2">Wind Speed - <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 10a1 1 0 0 1-1-1a1 1 0 0 1 1-1h8a2 2 0 0 0 2-2a2 2 0 0 0-2-2c-.55 0-1.05.22-1.41.59a.973.973 0 0 1-1.42 0c-.39-.39-.39-1.03 0-1.42C9.9 2.45 10.9 2 12 2a4 4 0 0 1 4 4a4 4 0 0 1-4 4zm15 2a1 1 0 0 0 1-1a1 1 0 0 0-1-1c-.28 0-.53.11-.71.29a.996.996 0 0 1-1.41 0c-.38-.39-.38-1.02 0-1.41C17.42 8.34 18.17 8 19 8a3 3 0 0 1 3 3a3 3 0 0 1-3 3H5a1 1 0 0 1-1-1a1 1 0 0 1 1-1zm-1 6H4a1 1 0 0 1-1-1a1 1 0 0 1 1-1h14a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-.83 0-1.58-.34-2.12-.88c-.38-.39-.38-1.02 0-1.41a.996.996 0 0 1 1.41 0c.18.18.43.29.71.29a1 1 0 0 0 1-1a1 1 0 0 0-1-1" /></svg>
                                {
                                    props.weatherData.wind.speed
                                }m/s</p>
                                
                        </div>
                        
                    

                    <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-16 text-right flex">
                                    <p className="w-full">
                                    {currentTempType === 'celcius' && (
                                        <span className="w-10 shrink-0">{celciusTemp()}</span>
                                    )}
                                </p>
                                    <span>&deg;C</span>
                            </div>
                      
                        <button onClick={toggleTempType} className="flex items-center gap-2 bg-white text-black rounded-full p-3 mx-auto">
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M19.299 13.098a.7.7 0 0 1 .498 1.191l-5.427 5.503a.7.7 0 1 1-.996-.984l4.252-4.31H.703a.7.7 0 0 1 0-1.4zM6.619.202a.7.7 0 0 1 .007.99l-4.252 4.31h16.923a.7.7 0 0 1 0 1.4H.7a.7.7 0 0 1-.498-1.191L5.63.208a.7.7 0 0 1 .99-.006"/></svg>
               
                        </button>
                        <div className="w-16 text-left flex">
                                <p className="w-full">
                                {currentTempType !== 'celcius' && (
                                    <span>{fahrenheitTemp()}</span>
                                )}
                                </p>
                            <span>&deg;F</span>
                        </div>
                    </div>

                    </div>
                </div>
            
            </div>
        </>
    );
};

export default WeatherInformation;
