// components/charts/CircularChart2D.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useClimateChartData } from '../../hooks/useClimateChartData';
import type { ProcessedClimateData } from '../../types/climate.types';

interface CircularChart2DProps {
    location: string;
    year: string;
    dataType: 'precipitation' | 'distribution';
    title: string;
    height?: number | string;
}

export const CircularChart2D: React.FC<CircularChart2DProps> = ({
    location,
    year,
    dataType,
    title,
    height = 300
}) => {
    const { data, loading } = useClimateChartData(location, year, 'monthly');

    if (loading || !data) {
        return <div className="text-gray-500">Cargando datos...</div>;
    }

    const processedData = data as ProcessedClimateData;
    const months = processedData.months;
    
    let chartData: Array<{ name: string; value: number }> = [];

    if (dataType === 'precipitation') {
        const precipitation = processedData.precipitation || [];
        chartData = months.map((month, index) => ({
            name: month,
            value: precipitation[index] || 0
        }));
    } else {
        // Distribución de variables climáticas
        const avgTemp = average(processedData.temperature || []);
        const totalPrecip = sum(processedData.precipitation || []);
        const avgWind = average(processedData.windSpeed || []);
        
        chartData = [
            { name: 'Temperatura', value: avgTemp },
            { name: 'Precipitación', value: totalPrecip / 10 }, // Normalizar
            { name: 'Viento', value: avgWind * 5 } // Normalizar
        ];
    }

    const option = {
        title: {
            text: title,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{
            name: dataType === 'precipitation' ? 'Precipitación' : 'Distribución',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: chartData
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

// Helper functions
const average = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length || 0;

const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);