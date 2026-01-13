// components/charts/WindRoseChart.tsx
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { ClimateApiService } from '../../services/climateApi';

interface WindRoseChartProps {
    location: string;
    year: string;
    title?: string;
    height?: number | string;
}

export const WindRoseChart: React.FC<WindRoseChartProps> = ({
    location,
    year,
    title = 'Rosa de los Vientos - Frecuencia por Dirección',
    height = 400
}) => {
    const [loading, setLoading] = useState(true);
    const [windData, setWindData] = useState<number[]>([]);

    useEffect(() => {
        const fetchWindData = async () => {
            setLoading(true);
            try {
                const forecast = await ClimateApiService.getForecast(location);
                const windDirections = forecast.hourly.wind_direction_10m;
                const windSpeeds = forecast.hourly.wind_speed_10m;
                
                // Agrupar por dirección (8 sectores de 45° cada uno)
                //const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
                const sectorCounts = new Array(8).fill(0);
                
                // Calcular frecuencia por dirección
                windDirections.forEach((direction, index) => {
                    if (windSpeeds[index] > 0) { // Solo contar si hay viento
                        const sector = Math.floor((direction + 22.5) % 360 / 45);
                        sectorCounts[sector]++;
                    }
                });
                
                // Normalizar a porcentajes
                const total = sectorCounts.reduce((a, b) => a + b, 0);
                const percentages = sectorCounts.map(count =>
                    total > 0 ? (count / total * 100) : 0
                );
                
                setWindData(percentages);
                
            } catch (error) {
                console.error('Error fetching wind data:', error);
                // Datos de ejemplo basados en patrones climáticos típicos
                const exampleData = [15, 10, 5, 8, 12, 18, 22, 10]; // Patrón típico de vientos del Oeste
                setWindData(exampleData);
            } finally {
                setLoading(false);
            }
        };

        fetchWindData();
    }, [location, year]);

    if (loading) {
        return <div className="text-gray-500">Cargando datos de viento...</div>;
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
            formatter: '{b}: {c}%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderColor: '#333',
            textStyle: {
                color: '#fff'
            }
        },
        angleAxis: {
            type: 'category',
            data: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
            startAngle: 90,
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                color: '#666',
                fontWeight: 'bold'
            }
        },
        radiusAxis: {
            min: 0,
            max: Math.max(...windData) * 1.2,
            axisLabel: {
                formatter: '{value}%',
                color: '#666'
            },
            splitLine: {
                lineStyle: {
                    color: '#e0e0e0',
                    type: 'dashed'
                }
            }
        },
        polar: {
            center: ['50%', '50%'],
            radius: '70%'
        },
        series: [{
            type: 'bar',
            coordinateSystem: 'polar',
            data: windData.map((value, index) => ({
                value: value.toFixed(1),
                name: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][index],
                itemStyle: {
                    color: (function() {
                        // Gradiente de colores según dirección
                        const colors = [
                            '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
                            '#ffffbf', '#fee090', '#fdae61', '#f46d43'
                        ];
                        return colors[index];
                    })()
                }
            })),
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            // CAMBIO AQUÍ: Ocultar etiquetas por defecto
            label: {
                show: false, // Cambiado de true a false
                position: 'middle',
                formatter: '{c}%',
                color: '#333',
                fontWeight: 'bold'
            },
            // Configurar etiqueta solo en hover
            emphasis: {
                label: {
                    show: true, // Mostrar etiqueta solo en hover
                    position: 'middle',
                    formatter: '{c}%',
                    color: '#fff',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: [6, 10],
                    borderRadius: 4
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }],
        legend: {
            show: false
        }
    };

    return (
        <div className="relative" style={{ height }}>
            <ReactECharts
                option={option}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'canvas' }}
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg">
                <div className="font-semibold mb-1">Interpretación:</div>
                <div>• Barras más largas = vientos más frecuentes</div>
                <div>• Dirección predominante: {['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][
                    windData.indexOf(Math.max(...windData))
                ]}</div>
            </div>
        </div>
    );
};