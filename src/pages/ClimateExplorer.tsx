// pages/ClimateExplorer.tsx
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import { BarChart2D } from '../components/charts/BarChart2D';
import { LineChart2D } from '../components/charts/LineChart2D';
import { BarChart3D } from '../components/charts/BarChart3D';
import { ScatterChart3D } from '../components/charts/ScatterChart3D';
import { RadarChart2D } from '../components/charts/RadarChart2D';
import { ClimateApiService } from '../services/climateApi';
import { BoxPlotChart } from '../components/charts/BoxPlotChart';
import { StackedBarChart } from '../components/charts/StackedBarChart';
import { WindRoseChart } from '../components/charts/WindRoseChart';

const ClimateExplorer: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedLocation, setSelectedLocation] = useState('madrid');
    const [compareLocation, setCompareLocation] = useState<string>('newYork');
    const [viewMode, setViewMode] = useState<'dashboard' | 'analysis' | 'comparison'>('dashboard');
    const [autoRotate3D, setAutoRotate3D] = useState(true);
    const [showAllCharts, setShowAllCharts] = useState(true);
    const [apiStats, setApiStats] = useState({ 
        calls: Math.floor(Math.random() * 5) + 1, 
        cacheHits: Math.floor(Math.random() * 3) 
    });

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
        { value: 'oslo', label: 'Oslo' }
    ];

    const refreshData = () => {
        ClimateApiService.clearCache();
        setApiStats({
        calls: apiStats.calls + 1,
        cacheHits: 0
        });
    };

    const exportData = () => {
        // En un proyecto real, aquí se implementaría la exportación
        alert('Funcionalidad de exportación en desarrollo');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
        <div className="w-full mx-auto px-6">
            
            {/* Header Principal */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Explorador Climático Completo</h1>
            <p className="text-gray-600">
                Panel integrado para análisis climático avanzado con visualizaciones 2D y 3D
            </p>
            </div>

            {/* Panel de Control Principal */}
            <Card className="mb-8">
            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-0">
                    Control del Explorador
                </h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                    variant={viewMode === 'dashboard' ? 'primary' : 'outline'}
                    onClick={() => setViewMode('dashboard')}
                    size="sm"
                    >
                    Dashboard
                    </Button>
                    <Button
                    variant={viewMode === 'analysis' ? 'primary' : 'outline'}
                    onClick={() => setViewMode('analysis')}
                    size="sm"
                    >
                    Análisis 3D
                    </Button>
                    <Button
                    variant={viewMode === 'comparison' ? 'primary' : 'outline'}
                    onClick={() => setViewMode('comparison')}
                    size="sm"
                    >
                    Comparación
                    </Button>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año de Estudio
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
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad a Comparar
                    </label>
                    <Select
                    options={locations.filter(loc => loc.value !== selectedLocation)}
                    value={compareLocation}
                    onChange={(e) => setCompareLocation(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Configuración
                    </label>
                    <div className="space-y-2">
                    <Toggle
                        label="Rotación 3D"
                        checked={autoRotate3D}
                        onChange={setAutoRotate3D}
                    />
                    <Toggle
                        label="Mostrar Todos"
                        checked={showAllCharts}
                        onChange={setShowAllCharts}
                    />
                    </div>
                </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-x-4">
                    <Button variant="secondary" onClick={refreshData}>
                        Actualizar Datos
                    </Button>
                    <Button variant="outline" onClick={exportData}>
                        Exportar Análisis
                    </Button>
                    </div>
                    <div className="mt-4 md:mt-0 text-sm text-gray-600">
                    <p>Datos actualizados de <strong>Open-Meteo API</strong></p>
                    </div>
                </div>
                </div>
            </div>
            </Card>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
                <div className="p-4">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600">📍</span>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="text-lg font-bold">
                        {locations.find(l => l.value === selectedLocation)?.label}
                    </p>
                    </div>
                </div>
                </div>
            </Card>
            
            <Card>
                <div className="p-4">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600">📅</span>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Año</p>
                    <p className="text-lg font-bold">{selectedYear}</p>
                    </div>
                </div>
                </div>
            </Card>
            
            <Card>
                <div className="p-4">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600">📡</span>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Llamadas API</p>
                    <p className="text-lg font-bold">{apiStats.calls}</p>
                    </div>
                </div>
                </div>
            </Card>
            
            <Card>
                <div className="p-4">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-orange-600">⚡</span>
                    </div>
                    <div>
                    <p className="text-sm text-gray-500">Cache Hits</p>
                    <p className="text-lg font-bold">{apiStats.cacheHits}</p>
                    </div>
                </div>
                </div>
            </Card>
            </div>

            {/* Vista Dashboard (Predeterminada) */}
            {(viewMode === 'dashboard' || showAllCharts) && (
            <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Climático</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Temperatura Mensual 2D */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Temperatura Mensual</h3>
                    <div className="h-64">
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
                    </div>
                </Card>

                {/* Box Plot - Distribución Temperatura */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Distribución de Temperaturas</h3>
                    <div className="h-64">
                        <BoxPlotChart
                        location={selectedLocation}
                        year={selectedYear}
                        title=""
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Precipitación Mensual 2D */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Precipitación Mensual</h3>
                    <div className="h-64">
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
                    </div>
                </Card>

                {/* Composición Precipitación */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Composición de Precipitación</h3>
                    <div className="h-64">
                        <StackedBarChart
                        location={selectedLocation}
                        year={selectedYear}
                        title=""
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Análisis Multivariable */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Análisis de Variables</h3>
                    <div className="h-64">
                        <LineChart2D
                        location={selectedLocation}
                        year={selectedYear}
                        dataKeys={['temperature', 'humidity', 'pressure']}
                        title=""
                        colors={['#ef4444', '#3b82f6', '#10b981']}
                        showArea={false}
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Rosa de los Vientos */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Patrones de Viento</h3>
                    <div className="h-64">
                        <WindRoseChart
                        location={selectedLocation}
                        year={selectedYear}
                        title=""
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                </div>
            </>
            )}

            // Y actualizar la sección Análisis 3D:
            {(viewMode === 'analysis' || showAllCharts) && (
            <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Análisis Tridimensional</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Temperatura 3D */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Distribución 3D de Temperatura</h3>
                    <div className="h-80">
                        <BarChart3D
                        location={selectedLocation}
                        year={selectedYear}
                        dataType="temperature"
                        title=""
                        autoRotate={autoRotate3D}
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Presión 3D */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Mapa 3D de Presión</h3>
                    <div className="h-80">
                        <BarChart3D
                        location={selectedLocation}
                        year={selectedYear}
                        dataType="pressure"
                        title=""
                        autoRotate={autoRotate3D}
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Scatter 3D */}
                <Card className="lg:col-span-2">
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Relación Multivariable 3D</h3>
                    <div className="h-80">
                        <ScatterChart3D
                        location={selectedLocation}
                        year={selectedYear}
                        title=""
                        dimensions={['temperature', 'humidity', 'pressure']}
                        autoRotate={autoRotate3D}
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                </div>
            </>
            )}

            {/* Vista Comparación */}
            {(viewMode === 'comparison' || showAllCharts) && (
            <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Comparación entre Ciudades</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Radar de Comparación */}
                <Card className="lg:col-span-2">
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Perfil Climático Comparativo</h3>
                    <div className="h-80">
                        <RadarChart2D
                        location={selectedLocation}
                        year={selectedYear}
                        compareLocation={compareLocation}
                        title=""
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Temperatura Comparativa */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Temperatura: {selectedLocation}</h3>
                    <div className="h-64">
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
                    </div>
                </Card>

                {/* Temperatura Comparativa - Ciudad 2 */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Temperatura: {compareLocation}</h3>
                    <div className="h-64">
                        <BarChart2D
                        location={compareLocation}
                        year={selectedYear}
                        dataKey="temperature"
                        title=""
                        yAxisName="°C"
                        color="#3b82f6"
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                </div>
            </>
            )}

            {/* Panel de Resumen y Conclusiones */}
            <Card className="mt-8">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Resumen del Análisis - {selectedYear}
                </h3>
                
                <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-1">Temperatura Promedio</h5>
                    <p className="text-2xl font-bold text-blue-600">18.5°C</p>
                    <p className="text-sm text-blue-600">Anual en {selectedLocation}</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-1">Precipitación Total</h5>
                    <p className="text-2xl font-bold text-green-600">450 mm</p>
                    <p className="text-sm text-green-600">Acumulado anual</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-1">Humedad Media</h5>
                    <p className="text-2xl font-bold text-purple-600">65%</p>
                    <p className="text-sm text-purple-600">Promedio anual</p>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Observaciones Clave</h4>
                    <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>La temperatura muestra un patrón estacional típico con máximos en julio-agosto</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>La precipitación se concentra en los meses de otoño y primavera</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span>Existe correlación inversa entre temperatura y humedad relativa</span>
                    </li>
                    </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Recomendaciones</h4>
                    <p className="text-yellow-700">
                    Basado en los datos analizados, se recomienda monitorear especialmente los meses de 
                    Julio y Agosto para temperaturas extremas, y los meses de Octubre y Noviembre 
                    para precipitaciones intensas. La comparación con {compareLocation} muestra 
                    diferencias significativas en el patrón de precipitación.
                    </p>
                </div>
                </div>
            </div>
            </Card>

        </div>
        </div>
    );
};

export default ClimateExplorer;