// pages/Charts3D.tsx
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import { BarChart3D } from '../components/charts/BarChart3D';
import { ScatterChart3D } from '../components/charts/ScatterChart3D';
import { ClimateApiService } from '../services/climateApi';

const Charts3D: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedLocation, setSelectedLocation] = useState('madrid');
    const [autoRotate, setAutoRotate] = useState(true);
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
        { value: 'oslo', label: 'Oslo' }
    ];

    const clearCache = () => {
        ClimateApiService.clearCache();
        setCacheInfo('Caché limpiada. Se cargarán nuevos datos 3D.');
        setTimeout(() => setCacheInfo(''), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
        <div className="w-full mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Visualización Climática 3D</h1>
            <p className="text-gray-600">
                Exploración tridimensional de datos climáticos con gráficos interactivos
            </p>
            {cacheInfo && (
                <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded text-sm">
                {cacheInfo}
                </div>
            )}
            </div>

            {/* Panel de Control 3D */}
            <Card className="mb-8">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuración 3D</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año de Datos
                    </label>
                    <Select
                    options={years}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                    </label>
                    <Select
                    options={locations}
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Controles 3D
                    </label>
                    <div className="space-y-3">
                    <Toggle
                        label="Rotación Automática"
                        checked={autoRotate}
                        onChange={setAutoRotate}
                    />
                    </div>
                </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                    <h4 className="font-medium text-gray-800 mb-2">Instrucciones de Navegación 3D</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Click izquierdo + arrastrar: Rotar vista</li>
                        <li>• Rueda del mouse: Zoom in/out</li>
                    </ul>
                    </div>
                    <Button variant="secondary" onClick={clearCache}>
                    Actualizar Datos 3D
                    </Button>
                </div>
                </div>
            </div>
            </Card>

            {/* Grid de Gráficos 3D */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Gráfico de Barras 3D - Temperatura */}
            <Card>
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Distribución 3D de Temperaturas
                    </h2>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    Barras 3D
                    </span>
                </div>
                <div className="h-96">
                    <BarChart3D
                    location={selectedLocation}
                    year={selectedYear}
                    dataType="temperature"
                    title=""
                    autoRotate={autoRotate}
                    height="100%"
                    />
                </div>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-1">Interpretación</h4>
                    <p className="text-xs text-orange-700">
                    Cada barra representa la temperatura máxima de un día específico (primeros 15 días). 
                    Altura = temperatura, Eje X = meses, Eje Y = días.
                    </p>
                </div>
                </div>
            </Card>

            {/* Gráfico de Barras 3D - Presión */}
            <Card>
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Mapa 3D de Presiones Atmosféricas
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Barras 3D
                    </span>
                </div>
                <div className="h-96">
                    <BarChart3D
                    location={selectedLocation}
                    year={selectedYear}
                    dataType="pressure"
                    title=""
                    autoRotate={autoRotate}
                    height="100%"
                    />
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">Interpretación</h4>
                    <p className="text-xs text-blue-700">
                    Presión atmosférica estimada basada en datos de temperatura. 
                    Barras altas = alta presión, barras bajas = baja presión.
                    </p>
                </div>
                </div>
            </Card>

            {/* Gráfico de Dispersión 3D */}
            <Card className="lg:col-span-2">
                <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                    Relación 3D: Temperatura - Humedad - Presión
                    </h2>
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
                    autoRotate={autoRotate}
                    height="100%"
                    />
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-1">Análisis Multivariable</h4>
                    <p className="text-xs text-purple-700">
                    Cada punto representa un mes con valores reales procesados. 
                    Permite identificar patrones entre las tres variables principales.
                    </p>
                </div>
                </div>
            </Card>

            </div>
        </div>
        </div>
    );
};

export default Charts3D;