// types/climate.types.ts
export interface ProcessedClimateData extends ClimateData {
    currentForecast: {
        hours: string[];
        temperatures: number[];
        pressures: number[];
        humidities: number[];
        winds: number[];
    };
    location: {
        latitude: number;
        longitude: number;
        name: string;
    };
}

export interface ClimateData3D {
    temperature3D: Array<{
        value: [number, number, number]; // [mes, día, temperatura]
        date: string;
        temp: number;
    }>;
    pressure3D: Array<{
        value: [number, number, number]; // [mes, día, presión]
        month: number;
        day: number;
        pressure: number;
    }>;
}

export interface ForecastResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
        time: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        precipitation: string;
        pressure_msl: string;
        wind_speed_10m: string;
        wind_direction_10m: string;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        relative_humidity_2m: number[];
        precipitation: number[];
        pressure_msl: number[];
        wind_speed_10m: number[];
        wind_direction_10m: number[];
    };
}

export interface HistoricalData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        precipitation_sum: string;
        wind_speed_10m_max: string;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_sum: number[];
        wind_speed_10m_max: number[];
    };
}

export interface ClimateData {
    months: string[];
    temperature: number[];
    precipitation: number[];
    windSpeed: number[];
    humidity: number[];
    pressure: number[];
}

export interface ChartConfig {
    title: string;
    data: ClimateData;
    location: string;
    year: string;
}