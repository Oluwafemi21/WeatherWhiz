import { useState } from 'react';
import hero from '../assets/hero.svg'
import {
    useMutation
  } from '@tanstack/react-query'
  import axios from 'axios'

// interface CityLat{
//     name:string;
//     lat:string,
//     lon:string,
// }

const Forecast = () => {
    const api_key = import.meta.env.VITE_API_KEY;
    const [inputValue, setInputValue] = useState('');
    const { mutate, isPending, isError, data, error } = useMutation({
        mutationFn:(city:string) => {
                return axios
                    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
                    .then((res) => res.data)
            },
    });
    
    const fetchWeatherData = (city: string) => {
        mutate(city)
    }
    return (
        <main>
            <div className='mt-5 rounded-full flex items-center divide-x *:p-2'>
                <input className='flex-1 rounded-l-full border bg-transparent outline-none ring-react-black focus:ring-1 text-react-black' type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                <button onClick={() => {
                    fetchWeatherData(inputValue)
            }} className='outline-none focus:ring-1 ring-react-black bg-react-black text-white border-react-black rounded-r-full border cursor-pointer hover:opacity-80'>Search</button>
            </div>
            {
            isError && <p className='text-red-500 text-center my-5'>'An error has occurred:' { error.message}</p>
        }
        {
            data && <ul className='text-red-400'>
                {data.map(() => {
                    <li key={data.name}>{data.name}</li>
                })}
            </ul>
        }
        {isPending && <p className='text-center my-5'>Fetching weather information...</p>}
        
        {!isPending && !error && 
              <div>
                  <div className='grid place-items-center gap-5 py-6'>
                      <img className='h-72 object-contain' src={hero} alt="Weather image icon" />
                      <h1 className='text-2xl font-semibold italic'>Know before you go...</h1>
                </div>
            </div>
        }
        
        </main>
      
  );
};

export default Forecast;
