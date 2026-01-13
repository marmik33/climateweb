// hooks/useClimateChartData.ts
import { useState, useEffect, useCallback } from 'react';
import { ClimateApiService } from '../services/climateApi';
import type { ProcessedClimateData, ClimateData3D } from '../types/climate.types';

export const useClimateChartData = (
    location: string,
    year: string,
    dataType: 'monthly' | 'forecast' | '3d' = 'monthly'
) => {
    const [data, setData] = useState<ProcessedClimateData | ClimateData3D | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            if (dataType === 'monthly') {
                const monthlyData = await ClimateApiService.getProcessedMonthlyData(
                    location,
                    parseInt(year)
                );
                setData(monthlyData);
            } else if (dataType === '3d') {
                const threeDData = await ClimateApiService.get3DData(
                    location,
                    parseInt(year)
                );
                setData(threeDData);
            } else {
                const forecastData = await ClimateApiService.getForecast(location);
                // Procesar forecast según sea necesario
                setData(forecastData as any);
            }
        } catch (err) {
            setError('Error al cargar los datos climáticos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [location, year, dataType]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => fetchData();

    return { data, loading, error, refetch };
};