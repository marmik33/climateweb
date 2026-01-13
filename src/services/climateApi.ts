// services/climateApi.ts
import type { ClimateData, ClimateData3D, ForecastResponse, HistoricalData, ProcessedClimateData } from '../types/climate.types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const HISTORY_URL = 'https://archive-api.open-meteo.com/v1/archive';

// Cache para evitar llamadas repetidas
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Coordenadas de ciudades españolas
const LOCATIONS: Record<string, { latitude: number; longitude: number; name: string }> = {
    newYork: { latitude: 40.7128, longitude: -74.0060, name: 'New York' },    // América del Norte
    london: { latitude: 51.5074, longitude: -0.1278, name: 'London' },        // Europa
    tokyo: { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo' },         // Asia
    sydney: { latitude: -33.8688, longitude: 151.2093, name: 'Sydney' },      // Oceanía
    capeTown: { latitude: -33.9249, longitude: 18.4241, name: 'Cape Town' },  // África
    madrid: { latitude: 40.4168, longitude: -3.7038, name: 'Madrid' },        // España
    oslo: { latitude: 59.9139, longitude: 10.7522, name: 'Oslo' }             // Noruega
};

export class ClimateApiService {
    private static async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
        const now = Date.now();
        const cached = cache.get(cacheKey);
        
        if (cached && now - cached.timestamp < CACHE_DURATION) {
        console.log('Usando datos en caché para:', cacheKey);
        return cached.data;
        }

        try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        cache.set(cacheKey, { data, timestamp: now });
        
        return data;
        } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
        }
    }

    static async getForecast(location: string = 'madrid'): Promise<ForecastResponse> {
        const loc = LOCATIONS[location] || LOCATIONS.madrid;
        const url = `${BASE_URL}?latitude=${loc.latitude}&longitude=${loc.longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,pressure_msl,wind_speed_10m,wind_direction_10m&timezone=Europe%2FMadrid&forecast_days=7`;
        const cacheKey = `forecast_${location}`;
        
        return this.fetchWithCache<ForecastResponse>(url, cacheKey);
    }

    static async getHistoricalData(
        location: string = 'madrid',
        year: number = 2023
    ): Promise<HistoricalData> {
        const loc = LOCATIONS[location] || LOCATIONS.madrid;
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;
        
        const url = `${HISTORY_URL}?latitude=${loc.latitude}&longitude=${loc.longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Europe%2FMadrid`;
        const cacheKey = `historical_${location}_${year}`;
        
        return this.fetchWithCache<HistoricalData>(url, cacheKey);
    }

    static async getProcessedMonthlyData(location: string = 'madrid', year: number = 2023): Promise<ProcessedClimateData> {
        const historical = await this.getHistoricalData(location, year);
        
        // Procesar datos diarios a mensuales REALES
        const monthlyData = this.processDailyToMonthly(historical.daily);
        const forecast = await this.getForecast(location);
        
        // Combinar datos históricos y de pronóstico
        return {
            ...monthlyData,
            currentForecast: this.processCurrentForecast(forecast.hourly),
            location: LOCATIONS[location] || LOCATIONS.madrid
        };
    }

    private static processDailyToMonthly(daily: HistoricalData['daily']): ClimateData {
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const monthlyData: ClimateData = {
            months,
            temperature: [],
            precipitation: [],
            windSpeed: [],
            humidity: [],
            pressure: []
        };

        // Agrupar datos por mes
        const monthlyGroups: Record<number, {
            temps: number[];
            precip: number[];
            wind: number[];
        }> = {};

        daily.time.forEach((dateStr, index) => {
            const date = new Date(dateStr);
            const month = date.getMonth(); // 0-11
            
            if (!monthlyGroups[month]) {
                monthlyGroups[month] = { temps: [], precip: [], wind: [] };
            }
            
            // Usar temperatura máxima como referencia
            monthlyGroups[month].temps.push(daily.temperature_2m_max[index]);
            monthlyGroups[month].precip.push(daily.precipitation_sum[index]);
            monthlyGroups[month].wind.push(daily.wind_speed_10m_max[index]);
        });

        // Calcular promedios mensuales
        for (let month = 0; month < 12; month++) {
            const group = monthlyGroups[month];
            if (group && group.temps.length > 0) {
                monthlyData.temperature.push(this.average(group.temps));
                monthlyData.precipitation.push(this.sum(group.precip));
                monthlyData.windSpeed.push(this.average(group.wind));
                
                // Para humedad y presión, usamos valores estimados basados en tendencias
                // (En un proyecto real, buscaríamos estos datos específicamente)
                monthlyData.humidity.push(60 + Math.sin(month * 0.5) * 10);
                monthlyData.pressure.push(1013 + Math.sin(month * 0.3) * 5);
            } else {
                // Datos por defecto si no hay datos para ese mes
                monthlyData.temperature.push(15);
                monthlyData.precipitation.push(30);
                monthlyData.windSpeed.push(10);
                monthlyData.humidity.push(65);
                monthlyData.pressure.push(1013);
            }
        }

        return monthlyData;
    }

    private static processCurrentForecast(hourly: ForecastResponse['hourly']): any {
        // Procesar pronóstico actual para gráficos específicos
        const now = new Date();
        const currentHour = now.getHours();
        
        // Tomar próximas 24 horas de pronóstico
        const next24Hours = {
            hours: Array.from({ length: 24 }, (_, i) => `${(currentHour + i) % 24}:00`),
            temperatures: hourly.temperature_2m.slice(0, 24),
            pressures: hourly.pressure_msl.slice(0, 24),
            humidities: hourly.relative_humidity_2m.slice(0, 24),
            winds: hourly.wind_speed_10m.slice(0, 24)
        };
        
        return next24Hours;
    }

    private static average(arr: number[]): number {
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    private static sum(arr: number[]): number {
        return arr.reduce((a, b) => a + b, 0);
    }

    private static prepareTemperature3DData(daily: HistoricalData['daily']): any[] {
        // Crear matriz 3D de temperatura (mes x día x temperatura)
        const data: any[] = [];
        const monthlyTemps: Record<number, number[]> = {};
        
        daily.time.forEach((dateStr, index) => {
            const date = new Date(dateStr);
            const month = date.getMonth();
            const day = date.getDate();
            const temp = daily.temperature_2m_max[index];
            
            if (!monthlyTemps[month]) {
                monthlyTemps[month] = [];
            }
            
            data.push({
                value: [month, day, temp],
                date: dateStr,
                temp: temp
            });
        });
        
        return data;
    }

    private static preparePressure3DData(/*daily: HistoricalData['daily']*/): any[] {
        // Para presión 3D, necesitaríamos datos de presión diarios
        // Como la API histórica no los tiene, simulamos basados en temperatura
        const data = [];
        
        for (let month = 0; month < 12; month++) {
            for (let day = 1; day <= 15; day += 2) { // Cada 2 días para reducir datos
                // Presión base con variación estacional
                const basePressure = 1013;
                const seasonalVar = Math.sin(month * 0.5) * 8;
                const dailyVar = Math.sin(day * 0.2) * 3;
                const randomVar = (Math.random() - 0.5) * 2;
                
                const pressure = basePressure + seasonalVar + dailyVar + randomVar;
                
                data.push({
                    value: [month, day, pressure],
                    month: month,
                    day: day,
                    pressure: pressure
                });
            }
        }
        
        return data;
    }

    static async get3DData(location: string, year: number = 2023): Promise<ClimateData3D> {
        try {
            const historical = await this.getHistoricalData(location, year);
            
            // Procesar datos para gráficos 3D
            return {
                temperature3D: this.prepareTemperature3DData(historical.daily),
                pressure3D: this.preparePressure3DData(/*historical.daily*/)
            };
        } catch (error) {
            console.error('Error en get3DData:', error);
            // Retornar datos por defecto si hay error
            return this.getDefault3DData();
        }
    }

    private static getDefault3DData(): ClimateData3D {
        // Datos por defecto para 3D si la API falla
        const temperature3D: any[] = [];
        const pressure3D: any[] = [];
        
        for (let month = 0; month < 12; month++) {
            for (let day = 1; day <= 15; day += 2) {
                const temp = 15 + Math.sin(month * 0.5) * 10 + Math.sin(day * 0.2) * 5;
                const pressure = 1013 + Math.sin(month * 0.3) * 8 + Math.cos(day * 0.1) * 3;
                
                temperature3D.push({
                    value: [month, day, temp],
                    date: `2023-${month + 1}-${day}`,
                    temp: temp
                });
                
                pressure3D.push({
                    value: [month, day, pressure],
                    month: month,
                    day: day,
                    pressure: pressure
                });
            }
        }
        
        return { temperature3D, pressure3D };
    }

    // Limpiar caché manualmente si es necesario
    static clearCache(): void {
        cache.clear();
    }
}