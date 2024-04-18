interface WeatherType {
    name: string,
    wind: Wind,
    weather: Weather[],
    main: TempInformation,
    sys: {
        country: string
    },
    clouds: {
        all: number
    },
}

interface Wind {
    deg: number,
    gust: number,
    speed: number
}

interface Weather {
    id:number,
    description: string,
    icon: string,
    main:string
}

interface TempInformation {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
}

export type { WeatherType };