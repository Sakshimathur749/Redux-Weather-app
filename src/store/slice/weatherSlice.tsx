import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherState, FetchWeatherResponse } from '../type'
import { RootState } from "../store";

const initialState: WeatherState = {
  temperature: 0,
  condition: 'Clear',
  sunrise: 0,
  sunset: 0,
  humidity: 0,
  description: 'None',
  location:'None',
  loading: false,
  error: null,
};
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather', async (city: string) => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=ULGUTHKCHMPPXT3D3KZBXFRKL&contentType=json`);
      return response.data;
    } catch (error) {
      return ('An error occurred');
    }
  });
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather(state) {
      state.temperature = 0;
      state.condition = 'Clear';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.temperature = action.payload.currentConditions.temp;
        state.condition = action.payload.currentConditions.conditions;
        state.sunrise = action.payload.currentConditions.sunrise;
        state.sunset = action.payload.currentConditions.sunset;
        state.humidity= action.payload.currentConditions.humidity;
        state.description = action.payload.description;
        state.location= action.payload.resolvedAddress;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload as string;
      });
  },
});
export const { clearWeather } = weatherSlice.actions;
export const weatherState = (state: RootState) => state.weather
export default weatherSlice.reducer;