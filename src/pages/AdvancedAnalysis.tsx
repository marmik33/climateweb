import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import { LineChart2D } from '../components/charts/LineChart2D';
import { BoxPlotChart } from '../components/charts/BoxPlotChart';
import { WindRoseChart } from '../components/charts/WindRoseChart';
import { StackedBarChart } from '../components/charts/StackedBarChart';
import { CircularChart2D } from '../components/charts/CircularChart2D';
import { BarChart3D } from '../components/charts/BarChart3D';
import { ScatterChart3D } from '../components/charts/ScatterChart3D';
import { ClimateApiService } from '../services/climateApi';

const AdvancedAnalysis: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedLocation, setSelectedLocation] = useState('madrid');
    const [analysisType, setAnalysisType] = useState<'seasonal' | 'extreme' | 'correlation'>('seasonal');
    const [showTrendLines, setShowTrendLines] = useState(true);
    const [normalizeData, setNormalizeData] = useState(false);

    const years = [
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
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

    const clearCache = () => {
        ClimateApiService.clearCache();
        alert('Cache limpiado. Se cargarán datos frescos de la API.');
    };

    const exportAnalysis = () => {
        const analysisData = {
        location: selectedLocation,
        year: selectedYear,
        type: analysisType,
        timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(analysisData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `analisis-climatico-${selectedLocation}-${selectedYear}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8">
        <div className="w-full mx-auto px-6">
            
            {/* Header con Navegación */}
            <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                <h1 className="text-3xl font-bold text-gray-800">Análisis Climático Avanzado</h1>
                <p className="text-gray-600 mt-2">
                    Herramientas especializadas para análisis profundo de datos climáticos
                </p>
                </div>
                <Link to="/climate-explorer">
                <Button variant="outline" size="sm">
                    ← Volver al Explorador
                </Button>
                </Link>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>📍</span>
                <span>Datos en tiempo real de Open-Meteo API</span>
                <span className="mx-2">•</span>
                <span>📊 8 tipos de gráficos especializados</span>
                <span className="mx-2">•</span>
                <span>⚡ Análisis estadístico avanzado</span>
            </div>
            </div>

            {/* Panel de Control Avanzado */}
            <Card className="mb-8">
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación de Estudio
                    </label>
                    <Select
                    options={locations}
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año de Análisis
                    </label>
                    <Select
                    options={years}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Análisis
                    </label>
                    <Select
                    options={[
                        { value: 'seasonal', label: 'Estacional' },
                        { value: 'extreme', label: 'Eventos Extremos' },
                        { value: 'correlation', label: 'Correlaciones' }
                    ]}
                    value={analysisType}
                    onChange={(e) => setAnalysisType(e.target.value as any)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Configuración Avanzada
                    </label>
                    <div className="space-y-2">
                    <Toggle
                        label="Líneas de Tendencia"
                        checked={showTrendLines}
                        onChange={setShowTrendLines}
                    />
                    <Toggle
                        label="Normalizar Datos"
                        checked={normalizeData}
                        onChange={setNormalizeData}
                    />
                    </div>
                </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-x-3">
                    <Button variant="primary" onClick={exportAnalysis}>
                        Exportar Análisis
                    </Button>
                    <Button variant="secondary" onClick={clearCache}>
                        Actualizar Datos
                    </Button>
                    </div>
                    <div className="mt-4 md:mt-0">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">Modo:</span> {{
                        'seasonal': 'Análisis Estacional',
                        'extreme': 'Eventos Extremos',
                        'correlation': 'Correlaciones'
                        }[analysisType]}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </Card>

            {/* Estadísticas Resumen */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
                <div className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-gray-600">Tipos de Gráficos</div>
                </div>
            </Card>
            <Card>
                <div className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Meses Analizados</div>
                </div>
            </Card>
            <Card>
                <div className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">5+</div>
                <div className="text-sm text-gray-600">Variables Climáticas</div>
                </div>
            </Card>
            <Card>
                <div className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">Datos Reales API</div>
                </div>
            </Card>
            </div>

            {/* Gráficos de Análisis Estacional */}
            {analysisType === 'seasonal' && (
            <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Análisis Estacional</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Comparación Estacional 3D */}
                <Card className="lg:col-span-2">
                    <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">
                        Variación Estacional 3D
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        3D Multivariable
                        </span>
                    </div>
                    <div className="h-96">
                        <ScatterChart3D
                        location={selectedLocation}
                        year={selectedYear}
                        title=""
                        dimensions={['temperature', 'humidity', 'pressure']}
                        autoRotate={true}
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Distribución por Estación */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Temperatura por Estación</h3>
                    <div className="h-80">
                        <BoxPlotChart
                        location={selectedLocation}
                        year={selectedYear}
                        title=""
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Patrones de Viento Estacionales */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Vientos Estacionales</h3>
                    <div className="h-80">
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

            {/* Gráficos para Eventos Extremos */}
            {analysisType === 'extreme' && (
            <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Análisis de Eventos Extremos</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Temperaturas Extremas 3D */}
                <Card className="lg:col-span-2">
                    <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">
                        Distribución de Temperaturas Extremas
                        </h3>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        3D de Barras
                        </span>
                    </div>
                    <div className="h-96">
                        <BarChart3D
                        location={selectedLocation}
                        year={selectedYear}
                        dataType="temperature"
                        title=""
                        autoRotate={true}
                        height="100%"
                        />
                    </div>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-700">
                        <span className="font-medium">Identificación de extremos:</span> Las barras más altas 
                        representan días con temperaturas máximas extremas.
                        </p>
                    </div>
                    </div>
                </Card>

                {/* Box Plot para Extremos */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Distribución de Extremos</h3>
                    <div className="h-80">
                        <BoxPlotChart
                        location={selectedLocation}
                        year={selectedYear}
                        title=""
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Precipitación Extrema */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Eventos de Precipitación</h3>
                    <div className="h-80">
                        <StackedBarChart
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

            {/* Gráficos para Correlaciones */}
            {analysisType === 'correlation' && (
            <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Análisis de Correlaciones</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* Correlación Principal 3D */}
                <Card className="lg:col-span-2">
                    <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">
                        Correlación 3D entre Variables
                        </h3>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        Dispersión 3D
                        </span>
                    </div>
                    <div className="h-96">
                        <ScatterChart3D
                        location={selectedLocation}
                        year={selectedYear}
                        title=""
                        dimensions={['temperature', 'humidity', 'pressure']}
                        autoRotate={true}
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                {/* Líneas de Correlación */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Correlación Temperatura-Humedad</h3>
                    <div className="h-80">
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
                    </div>
                </Card>

                {/* Distribución Circular */}
                <Card>
                    <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Distribución de Variables</h3>
                    <div className="h-80">
                        <CircularChart2D
                        location={selectedLocation}
                        year={selectedYear}
                        dataType="distribution"
                        title=""
                        height="100%"
                        />
                    </div>
                    </div>
                </Card>

                </div>
            </>
            )}

            {/* Panel de Conclusiones */}
            <Card className="mt-8">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Conclusiones del Análisis - {selectedLocation} {selectedYear}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium text-gray-800 mb-2">Hallazgos Principales</h4>
                    <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Patrón estacional claro con temperaturas máximas en verano</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span>Correlación inversa entre temperatura y humedad relativa</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        <span>Vientos predominantes del Oeste durante la mayor parte del año</span>
                    </li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-medium text-gray-800 mb-2">Recomendaciones</h4>
                    <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                        <span className="font-medium">Monitoreo:</span> Especial atención a eventos de precipitación intensa en otoño
                        </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700">
                        <span className="font-medium">Adaptación:</span> Preparación para olas de calor en julio-agosto
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Fecha del análisis:</span> {new Date().toLocaleDateString('es-ES')}
                    </p>
                    </div>
                    <Button variant="primary" onClick={exportAnalysis} className="mt-4 md:mt-0">
                    Descargar Informe Completo
                    </Button>
                </div>
                </div>
            </div>
            </Card>

            {/* Navegación Inferior */}
            <div className="mt-8 flex justify-center">
            <div className="flex space-x-4">
                <Link to="/charts-2d">
                <Button variant="outline">
                    ← Gráficos 2D
                </Button>
                </Link>
                <Link to="/charts-3d">
                <Button variant="outline">
                    Gráficos 3D →
                </Button>
                </Link>
            </div>
            </div>

        </div>
        </div>
    );
};

export default AdvancedAnalysis;