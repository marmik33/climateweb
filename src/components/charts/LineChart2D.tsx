// components/charts/LineChart2D.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useClimateChartData } from '../../hooks/useClimateChartData';
import type { ProcessedClimateData } from '../../types/climate.types';

interface LineChart2DProps {
    location: string;
    year: string;
    dataKeys: Array<keyof ProcessedClimateData>;
    title: string;
    colors: string[];
    showArea?: boolean;
    height?: number | string;
}

export const LineChart2D: React.FC<LineChart2DProps> = ({
    location,
    year,
    dataKeys,
    title,
    colors,
    showArea = false,
    height = 300
}) => {
    const { data, loading } = useClimateChartData(location, year, 'monthly');

    if (loading || !data) {
        return <div className="text-gray-500">Cargando datos...</div>;
    }

    const processedData = data as ProcessedClimateData;
    const months = processedData.months;

    const series = dataKeys.map((key, index) => {
        const chartData = processedData[key] || [];
        return {
            name: getLabelForKey(key),
            type: 'line',
            data: chartData,
            smooth: true,
            lineStyle: {
                width: 2,
                color: colors[index]
            },
            itemStyle: {
                color: colors[index]
            },
            areaStyle: showArea ? {
                color: colors[index] + '20' // Añade transparencia
            } : undefined
        };
    });

    const option = {
        title: {
            text: title,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: dataKeys.map(key => getLabelForKey(key)),
            bottom: 10
        },
        xAxis: {
            type: 'category',
            data: months
        },
        yAxis: {
            type: 'value'
        },
        series
    };

    return (
        <ReactECharts
            option={option}
            style={{ height, width: '100%' }}
            opts={{ renderer: 'canvas' }}
        />
    );
};

// Helper function
const getLabelForKey = (key: string): string => {
    const labels: Record<string, string> = {
        temperature: 'Temperatura',
        precipitation: 'Precipitación',
        windSpeed: 'Velocidad del Viento',
        humidity: 'Humedad',
        pressure: 'Presión'
    };
    return labels[key] || key;
};
