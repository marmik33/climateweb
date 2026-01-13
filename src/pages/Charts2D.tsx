// pages/Charts2D.tsx
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { BarChart2D } from '../components/charts/BarChart2D';
import { LineChart2D } from '../components/charts/LineChart2D';
import { CircularChart2D } from '../components/charts/CircularChart2D';
import { RadarChart2D } from '../components/charts/RadarChart2D';
import { ClimateApiService } from '../services/climateApi';
import { WindRoseChart } from '../components/charts/WindRoseChart';
import { BoxPlotChart } from '../components/charts/BoxPlotChart';
import { StackedBarChart } from '../components/charts/StackedBarChart';

const Charts2D: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedLocation, setSelectedLocation] = useState('madrid');
    const [compareLocation, setCompareLocation] = useState<string | undefined>(undefined);
    const [showComparison, setShowComparison] = useState(false);
    const [cacheInfo, setCacheInfo] = useState<string>('');

    const years = [
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
    ];

    const locations = [
        { value: 'madrid', label: 'Madrid' },
        { value: 'newYork', label: 'New York' },
        { value: 'london', label: 'London' },
        { value: 'tokyo', label: 'Tokyo' },
        { value: 'sydney', label: 'Sydney' },
        { value: 'capeTown', label: 'Cape Town' },
        { value: 'oslo', label: 'Oslo' },
    ];

    const clearCache = () => {
        ClimateApiService.clearCache();
        setCacheInfo('Caché limpiada. Se cargarán nuevos datos de la API.');
        setTimeout(() => setCacheInfo(''), 3000);
    };

    const toggleComparison = () => {
        if (showComparison) {
        setCompareLocation(undefined);
        }
        setShowComparison(!showComparison);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
        <div className="w-full mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gráficos Climáticos 2D</h1>
            <p className="text-gray-600">
                Visualización interactiva de datos climáticos históricos de Open-Meteo API
            </p>
            {cacheInfo && (
                <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded text-sm">
                {cacheInfo}
                </div>
            )}
            </div>

            {/* Panel de Control */}
            <Card className="mb-8">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">
                    Configuración de Visualización
                </h2>
                <div className="flex space-x-3">
                    <Button 
                    variant="secondary" 
                    onClick={toggleComparison}
                    className={showComparison ? 'bg-purple-100 text-purple-800' : ''}
                    >
                    {showComparison ? 'Ocultar Comparación' : 'Comparar Ciudades'}
                    </Button>
                    <Button variant="secondary" onClick={clearCache} size="sm">
                    Limpiar Caché
                    </Button>
                </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Año
                    </label>
                    <Select
                    options={years}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad Principal
                    </label>
                    <Select
                    options={locations}
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    />
                </div>
                
                {showComparison && (
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad a Comparar
                    </label>
                    <Select
                        options={locations.filter(loc => loc.value !== selectedLocation)}
                        value={compareLocation || ''}
                        onChange={(e) => setCompareLocation(e.target.value)}
                        placeholder="Selecciona una ciudad"
                    />
                    </div>
                )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                    <p><strong>Datos fuente:</strong> <a href="https://open-meteo.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Open-Meteo Historical API</a></p>
                    <p className="mt-1"><strong>Actualización:</strong> Los datos se cachean durante 5 minutos para optimizar llamadas a la API.</p>
                </div>
                </div>
            </div>
            </Card>

            {/* Grid de Gráficos 2D */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Temperatura Mensual - Gráfico de Barras */}
            <Card>
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Temperatura Mensual
                    </h2>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Barras 2D
                    </span>
                </div>
                <div className="h-72">
                    <BarChart2D
                    location={selectedLocation}
                    year={selectedYear}
                    dataKey="temperature"
                    title=""
                    yAxisName="°C"
                    color="#ef4444"
                    height="100%"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Temperatura promedio mensual en {selectedLocation} durante {selectedYear}
                </p>
                </div>
            </Card>

            {/* Precipitación Mensual - Gráfico de Barras */}
            <Card>
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Precipitación Mensual
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Barras 2D
                    </span>
                </div>
                <div className="h-72">
                    <BarChart2D
                    location={selectedLocation}
                    year={selectedYear}
                    dataKey="precipitation"
                    title=""
                    yAxisName="mm"
                    color="#3b82f6"
                    height="100%"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Precipitación acumulada mensual en {selectedLocation} durante {selectedYear}
                </p>
                </div>
            </Card>

            {/* Distribución de Temperaturas - Box Plot */}
            <Card>
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Distribución de Temperaturas
                    </h2>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    Box Plot
                    </span>
                </div>
                <div className="h-72">
                    <BoxPlotChart
                    location={selectedLocation}
                    year={selectedYear}
                    title=""
                    height="100%"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Distribución estadística de temperaturas diarias por mes
                </p>
                </div>
            </Card>

            {/* Gráfico de Líneas - Temperatura y Humedad */}
            <Card>
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Temperatura vs Humedad
                    </h2>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Líneas 2D
                    </span>
                </div>
                <div className="h-72">
                    <LineChart2D
                    location={selectedLocation}
                    year={selectedYear}
                    dataKeys={['temperature', 'humidity']}
                    title=""
                    colors={['#ef4444', '#3b82f6']}
                    showArea={true}
                    height="100%"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Correlación entre temperatura y humedad relativa mensual
                </p>
                </div>
            </Card>

            {/* Gráfico Circular - Distribución de Precipitación */}
            <Card>
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Distribución de Precipitación
                    </h2>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    Circular 2D
                    </span>
                </div>
                <div className="h-72">
                    <CircularChart2D
                    location={selectedLocation}
                    year={selectedYear}
                    dataType="precipitation"
                    title=""
                    height="100%"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Porcentaje de precipitación por mes respecto al total anual
                </p>
                </div>
            </Card>

            {/* Rosa de los Vientos */}
            <Card>
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Patrones de Viento
                    </h2>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                    Polar 2D
                    </span>
                </div>
                <div className="h-72">
                    <WindRoseChart
                    location={selectedLocation}
                    year={selectedYear}
                    title=""
                    height="100%"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Frecuencia de viento por dirección (basado en pronóstico actual)
                </p>
                </div>
            </Card>

            {/* Gráfico de Barras Apiladas - Composición Precipitación */}
            <Card className="lg:col-span-2">
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Composición de Precipitación
                    </h2>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    Barras Apiladas
                    </span>
                </div>
                <div className="h-80">
                    <StackedBarChart
                    location={selectedLocation}
                    year={selectedYear}
                    title=""
                    height="100%"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Estimación de tipos de precipitación basada en temperatura mensual
                </p>
                </div>
            </Card>

            {/* Gráfico de Radar - Comparación (si está activada) */}
            {showComparison && compareLocation && (
                <Card className="lg:col-span-2">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        Comparación Climática Anual
                    </h2>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Radar 2D
                    </span>
                    </div>
                    <div className="h-80">
                    <RadarChart2D
                        location={selectedLocation}
                        year={selectedYear}
                        compareLocation={compareLocation}
                        title=""
                        height="100%"
                    />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                    Comparación de variables climáticas entre {selectedLocation} y {compareLocation} en {selectedYear}
                    </p>
                </div>
                </Card>
            )}

            </div>
            {/* Información Adicional */}
            <Card className="mt-8">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tipos de Gráficos 2D Disponibles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Gráfico de Barras</h4>
                    <p className="text-sm text-red-700">
                    Ideal para comparar valores entre diferentes meses o categorías.
                    </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Gráfico de Líneas</h4>
                    <p className="text-sm text-blue-700">
                    Perfecto para mostrar tendencias y evolución temporal.
                    </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Gráfico Circular</h4>
                    <p className="text-sm text-purple-700">
                    Excelente para mostrar distribución porcentual o proporciones.
                    </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Gráfico de Radar</h4>
                    <p className="text-sm text-yellow-700">
                    Ideal para comparar múltiples variables entre diferentes conjuntos.
                    </p>
                </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Fuente de Datos</h4>
                <p className="text-sm text-gray-600">
                    Todos los gráficos utilizan datos reales de la API de Open-Meteo. 
                    Los datos históricos se procesan para calcular promedios mensuales 
                    de temperatura máxima, precipitación acumulada y velocidad máxima del viento.
                </p>
                </div>
            </div>
            </Card>

        </div>
        </div>
    );
};

export default Charts2D;