import type { EChartsOption } from '../../types/echarts.types';

export const getTemperatureOptions = (months: string[], temperatures: number[]): EChartsOption => {
    return {
        title: {
        text: 'Temperatura Mensual',
        left: 'center',
        textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        },
        tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}°C',
        backgroundColor: 'rgba(0,0,0,0.7)',
        textStyle: {
            color: '#fff',
        },
        },
        grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '15%',
        containLabel: true,
        },
        xAxis: {
        type: 'category',
        data: months,
        axisLabel: {
            color: '#666',
        },
        axisLine: {
            lineStyle: {
            color: '#ccc',
            },
        },
        },
        yAxis: {
        type: 'value',
        name: 'Temperatura (°C)',
        nameTextStyle: {
            color: '#666',
            padding: [0, 0, 0, 40],
        },
        axisLabel: {
            formatter: '{value}°C',
            color: '#666',
        },
        splitLine: {
            lineStyle: {
            color: '#f0f0f0',
            type: 'dashed',
            },
        },
        },
        series: [
        {
            name: 'Temperatura',
            type: 'line',
            data: temperatures,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
            width: 3,
            color: '#ff6b6b',
            },
            itemStyle: {
            color: '#ff6b6b',
            borderColor: '#fff',
            borderWidth: 2,
            },
            areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                { offset: 0, color: 'rgba(255, 107, 107, 0.3)' },
                { offset: 1, color: 'rgba(255, 107, 107, 0.05)' },
                ],
            },
            },
        },
        ],
    };
};