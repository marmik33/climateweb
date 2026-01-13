// components/charts/RadarChart2D.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useClimateChartData } from '../../hooks/useClimateChartData';
import type { ProcessedClimateData } from '../../types/climate.types';

interface RadarChart2DProps {
    location: string;
    year: string;
    compareLocation?: string; // Opcional: comparar dos ubicaciones
    title: string;
    height?: number | string;
}

export const RadarChart2D: React.FC<RadarChart2DProps> = ({
    location,
    year,
    compareLocation,
    title,
    height = 400
}) => {
    const { data: mainData, loading: mainLoading } = useClimateChartData(location, year, 'monthly');
    const { data: compareData, loading: compareLoading } = 
        compareLocation ? useClimateChartData(compareLocation, year, 'monthly') : { data: null, loading: false };

    if (mainLoading || (compareLocation && compareLoading)) {
        return <div className="text-gray-500">Cargando datos...</div>;
    }

    // VERIFICACIÓN CRÍTICA DE DATOS
    if (!mainData || !('temperature' in mainData)) {
        return <div className="text-gray-500">No hay datos disponibles para {location}</div>;
    }

    const mainProcessed = mainData as ProcessedClimateData;
    const compareProcessed = compareData as ProcessedClimateData;

    // Calcular promedios anuales para el radar
    const calculateAverages = (data: ProcessedClimateData) => ({
        temperature: average(data.temperature || []),
        precipitation: average(data.precipitation || []),
        windSpeed: average(data.windSpeed || []),
        humidity: average(data.humidity || []),
        pressure: average(data.pressure || [])
    });

    const mainAverages = calculateAverages(mainProcessed);
    const compareAverages = compareProcessed && 'temperature' in compareProcessed 
        ? calculateAverages(compareProcessed)
        : null;

    const indicator = [
        { name: 'Temperatura', max: 35 },
        { name: 'Precipitación', max: 100 },
        { name: 'Viento', max: 20 },
        { name: 'Humedad', max: 100 },
        { name: 'Presión', max: 1040 }
    ];

    const seriesData = [
        {
            value: [
                mainAverages.temperature,
                mainAverages.precipitation,
                mainAverages.windSpeed,
                mainAverages.humidity,
                mainAverages.pressure
            ],
            name: location.charAt(0).toUpperCase() + location.slice(1)
        }
    ];

    if (compareAverages) {
        seriesData.push({
            value: [
                compareAverages.temperature,
                compareAverages.precipitation,
                compareAverages.windSpeed,
                compareAverages.humidity,
                compareAverages.pressure
            ],
            name: compareLocation!.charAt(0).toUpperCase() + compareLocation!.slice(1)
        });
    }

    const option = {
        title: {
            text: title,
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: seriesData.map(s => s.name),
            bottom: 10
        },
        radar: {
            indicator: indicator,
            shape: 'circle',
            splitNumber: 5,
            axisName: {
                color: '#666'
            }
        },
        series: [{
            type: 'radar',
            data: seriesData,
            itemStyle: {
                opacity: 0.5
            },
            lineStyle: {
                width: 2
            },
            areaStyle: {
                opacity: 0.1
            }
        }]
    };

    return (
        <ReactECharts
            option={option}
            style={{ height, width: '100%' }}
            opts={{ renderer: 'canvas' }}
        />
    );
};

const average = (arr: number[]): number => 
    arr.reduce((a, b) => a + b, 0) / arr.length || 0;
