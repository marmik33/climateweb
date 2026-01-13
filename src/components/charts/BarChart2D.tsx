// components/charts/BarChart2D.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useClimateChartData } from '../../hooks/useClimateChartData';
import type { ProcessedClimateData } from '../../types/climate.types';

interface BarChart2DProps {
    location: string;
    year: string;
    dataKey: keyof ProcessedClimateData; // 'temperature' | 'precipitation' | 'windSpeed'
    title: string;
    yAxisName: string;
    color: string;
    height?: number | string;
}

export const BarChart2D: React.FC<BarChart2DProps> = ({
    location,
    year,
    dataKey,
    title,
    yAxisName,
    color,
    height = 300
}) => {
    const { data, loading } = useClimateChartData(location, year, 'monthly');

    if (loading || !data) {
        return <div className="text-gray-500">Cargando datos...</div>;
    }

    const chartData = (data as ProcessedClimateData)[dataKey] || [];
    const months = (data as ProcessedClimateData).months || [];

    const option = {
        title: {
            text: title,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}'
        },
        xAxis: {
            type: 'category',
            data: months,
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: yAxisName
        },
        series: [{
            data: chartData,
            type: 'bar',
            itemStyle: {
                color: color
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: color
                }
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