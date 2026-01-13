// src/components/charts/PressureMap3D.tsx
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from '../../types/echarts.types';

interface PressureMap3DProps {
    month: string;
    location: string;
    autoRotate?: boolean;
    showGrid?: boolean;
}

const PressureMap3D: React.FC<PressureMap3DProps> = ({ 
    month, 
    location,
    autoRotate = false,
    showGrid = true 
    }) => {
    const [option, setOption] = useState<EChartsOption>({});
    const [loading, setLoading] = useState(true);

    // Función para generar datos de presión atmosférica simulados
    const generatePressureData = () => {
        const data: [number, number, number][] = [];
        
        // Simular un mapa de presión con variaciones
        for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            const x = i;
            const y = j;
            
            // Crear un patrón de presión más simple
            const distanceFromCenter = Math.sqrt(Math.pow(i - 6, 2) + Math.pow(j - 6, 2));
            const pressure = 1013 + 
            Math.sin(i * 0.5) * 8 + 
            Math.cos(j * 0.5) * 8 -
            distanceFromCenter * 1.5;
            
            data.push([x, y, Math.max(980, Math.min(1040, pressure))]);
        }
        }
        
        return data;
    };

    useEffect(() => {
        setLoading(true);
        
        // Generar datos de presión
        const pressureData = generatePressureData();
        
        const chartOption: EChartsOption = {
        title: {
            text: `Mapa de Presiones 3D - ${month.charAt(0).toUpperCase() + month.slice(1)}`,
            left: 'center',
            textStyle: {
            color: '#333',
            fontSize: 16,
            fontWeight: 'bold'
            }
        },
        tooltip: {
            formatter: function(params: any) {
            if (params.data) {
                return `Presión: ${params.data[2].toFixed(1)} hPa<br/>
                        Coordenada: (${params.data[0]}, ${params.data[1]})`;
            }
            return '';
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            textStyle: {
            color: '#fff'
            }
        },
        visualMap: {
            show: true,
            dimension: 2,
            min: 980,
            max: 1040,
            calculable: true,
            inRange: {
            color: [
                '#1a237e', '#283593', '#303f9f', '#3949ab', '#3f51b5',
                '#5c6bc0', '#7986cb', '#9fa8da', '#c5cae9', '#e8eaf6'
            ]
            },
            textStyle: {
            color: '#666'
            },
            orient: 'vertical',
            right: 10,
            top: 'center',
            text: ['Alta', 'Baja']
        },
        xAxis3D: {
            type: 'value',
            name: 'Longitud',
            nameTextStyle: {
            fontSize: 12,
            color: '#666'
            }
        },
        yAxis3D: {
            type: 'value',
            name: 'Latitud',
            nameTextStyle: {
            fontSize: 12,
            color: '#666'
            }
        },
        zAxis3D: {
            type: 'value',
            name: 'Presión (hPa)',
            nameTextStyle: {
            fontSize: 12,
            color: '#666'
            }
        },
        grid3D: {
            boxWidth: 120,
            boxDepth: 120,
            boxHeight: 60,
            viewControl: {
            projection: 'orthographic',
            autoRotate: autoRotate,
            autoRotateSpeed: 8,
            distance: 200
            },
            light: {
            main: {
                intensity: 1.8,
                shadow: false
            },
            ambient: {
                intensity: 0.5
            }
            }
        },
        series: [{
            type: 'surface',
            wireframe: {
            show: showGrid,
            lineStyle: {
                color: '#888',
                width: 0.8
            }
            },
            itemStyle: {
            opacity: 0.9
            },
            data: pressureData,
            parametric: false
        }] as any // Cast a any para evitar problemas de tipos
        };

        setOption(chartOption);
        setLoading(false);
    }, [month, location, autoRotate, showGrid]);

    if (loading) {
        return (
        <div className="h-full flex items-center justify-center">
            <div className="text-gray-500">Generando mapa de presiones 3D...</div>
        </div>
        );
    }

    return (
        <div className="relative h-full">
        <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
            notMerge={true}
            lazyUpdate={true}
            theme="light"
        />
        
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg">
            <div className="font-semibold">Interpretación:</div>
            <div className="mt-1">• Picos: Alta presión (&gt;1013 hPa)</div>
            <div>• Valles: Baja presión (&lt;1013 hPa)</div>
        </div>
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="text-sm font-medium text-gray-800 mb-2">Sistemas de Presión</div>
            <div className="space-y-2">
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-700 mr-2"></div>
                <span className="text-xs text-gray-600">Alta Presión</span>
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
                <span className="text-xs text-gray-600">Baja Presión</span>
            </div>
            </div>
        </div>
        </div>
    );
};

export default PressureMap3D;