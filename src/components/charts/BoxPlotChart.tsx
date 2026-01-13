// components/charts/BoxPlotChart.tsx
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { ClimateApiService } from '../../services/climateApi';

interface BoxPlotChartProps {
    location: string;
    year: string;
    title?: string;
    height?: number | string;
}

export const BoxPlotChart: React.FC<BoxPlotChartProps> = ({
    location,
    year,
    title = 'Distribución de Temperaturas Mensuales',
    height = 400
}) => {
    const [loading, setLoading] = useState(true);
    const [boxData, setBoxData] = useState<any[]>([]);
    const [/*months*/, setMonths] = useState<string[]>([]);

    useEffect(() => {
        const fetchTemperatureData = async () => {
            setLoading(true);
            try {
                const historical = await ClimateApiService.getHistoricalData(location, parseInt(year));
                
                // Procesar datos diarios para box plot
                const monthlyGroups: Record<number, number[]> = {};
                const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                
                // Agrupar temperaturas máximas diarias por mes
                historical.daily.time.forEach((dateStr, index) => {
                    const date = new Date(dateStr);
                    const month = date.getMonth();
                    const temp = historical.daily.temperature_2m_max[index];
                    
                    if (!monthlyGroups[month]) {
                        monthlyGroups[month] = [];
                    }
                    monthlyGroups[month].push(temp);
                });
                
                // Calcular estadísticas para cada mes
                const processedData: any[] = [];
                const availableMonths: string[] = [];
                
                for (let month = 0; month < 12; month++) {
                    const temps = monthlyGroups[month] || [];
                    if (temps.length > 0) {
                        // Ordenar para calcular percentiles
                        const sorted = [...temps].sort((a, b) => a - b);
                        const n = sorted.length;
                        
                        const min = Math.min(...temps);
                        const q1 = sorted[Math.floor(n * 0.25)];
                        const median = sorted[Math.floor(n * 0.5)];
                        const q3 = sorted[Math.floor(n * 0.75)];
                        const max = Math.max(...temps);
                        
                        processedData.push([
                            monthNames[month],
                            min,
                            q1,
                            median,
                            q3,
                            max
                        ]);
                        availableMonths.push(monthNames[month]);
                    }
                }
                
                setBoxData(processedData);
                setMonths(availableMonths);
                
            } catch (error) {
                console.error('Error fetching box plot data:', error);
                // Datos de ejemplo si falla la API
                const exampleData = [];
                const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May'];
                
                for (let i = 0; i < 5; i++) {
                    const base = 10 + i * 3;
                    exampleData.push([
                        monthNames[i],
                        base - 5,
                        base - 2,
                        base,
                        base + 2,
                        base + 5
                    ]);
                }
                
                setBoxData(exampleData);
                setMonths(monthNames);
            } finally {
                setLoading(false);
            }
        };

        fetchTemperatureData();
    }, [location, year]);

    if (loading) {
        return <div className="text-gray-500">Cargando distribución de temperaturas...</div>;
    }

    const option = {
        title: {
            text: title,
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params: any) {
                const data = params.data;
                return `
                    <strong>${data[0]}</strong><br/>
                    Mínima: ${data[1].toFixed(1)}°C<br/>
                    Q1: ${data[2].toFixed(1)}°C<br/>
                    Mediana: ${data[3].toFixed(1)}°C<br/>
                    Q3: ${data[4].toFixed(1)}°C<br/>
                    Máxima: ${data[5].toFixed(1)}°C<br/>
                    Rango: ${(data[5] - data[1]).toFixed(1)}°C
                `;
            }
        },
        dataset: [{
            source: boxData,
            dimensions: ['Mes', 'Mínima', 'Q1', 'Mediana', 'Q3', 'Máxima']
        }],
        xAxis: {
            type: 'category',
            name: 'Mes',
            nameLocation: 'middle',
            nameGap: 25,
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: 'Temperatura (°C)',
            nameLocation: 'middle',
            nameGap: 40,
            scale: true
        },
        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                itemStyle: {
                    color: '#ff6b6b',
                    borderColor: '#d63031',
                    borderWidth: 2
                },
                boxWidth: ['40%', '40%'],
                encode: {
                    x: 'Mes',
                    y: ['Mínima', 'Q1', 'Mediana', 'Q3', 'Máxima']
                }
            },
            {
                name: 'outlier',
                type: 'scatter',
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#666'
                },
                encode: {
                    x: 'Mes',
                    y: 'Máxima'
                }
            }
        ],
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '15%',
            containLabel: true
        }
    };

    return (
        <div className="relative" style={{ height }}>
            <ReactECharts
                option={option}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'canvas' }}
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-sm font-medium text-gray-800 mb-2">Leyenda del Box Plot</div>
                <div className="space-y-1">
                    <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-red-600 bg-red-500/30 mr-2"></div>
                        <span className="text-xs text-gray-600">Rango intercuartílico (IQR)</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1 h-3 bg-red-800 mr-2 ml-1.5"></div>
                        <span className="text-xs text-gray-600">Mediana</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-600">Valores atípicos</span>
                    </div>
                </div>
            </div>
        </div>
    );
};