export interface WeatherState {
    temperature: number;
    condition: string;
    sunrise:number;
    sunset:number;
    humidity:number;
    description:string;
    location:string;
    loading: boolean;
    error: string | null;
  }
  
  export interface FetchWeatherResponse {
    currentConditions: {
      temp: number;
      conditions: string;
    };
  }