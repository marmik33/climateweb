import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
        <div className="w-full mx-auto px-6">
            <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Sobre este Proyecto
                </h1>
                <p className="text-xl text-gray-600">
                Un explorador climático interactivo construido con React, TypeScript y ECharts
                </p>
            </div>

            {/* Descripción del Proyecto */}
            <Card className="mb-8">
                <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Objetivo del Proyecto
                </h2>
                <p className="text-gray-700 mb-4">
                    Este proyecto tiene como objetivo demostrar las capacidades de la librería 
                    ECharts de Apache para la visualización de datos climáticos en entornos web 
                    modernos. Combina gráficos 2D y 3D interactivos para proporcionar una 
                    comprensión profunda de los patrones climáticos.
                </p>
                <p className="text-gray-700">
                    El explorador está diseñado para ser una herramienta educativa y demostrativa 
                    que muestra cómo las bibliotecas de visualización moderna pueden transformar 
                    datos complejos en información comprensible y accionable.
                </p>
                </div>
            </Card>

            {/* Tecnologías */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Tecnologías Principales</h3>
                    <ul className="space-y-3">
                    {[
                        { name: 'React', description: 'Biblioteca de UI para construir interfaces interactivas' },
                        { name: 'TypeScript', description: 'Superset tipado de JavaScript para mayor robustez' },
                        { name: 'ECharts', description: 'Potente biblioteca de visualización de Apache' },
                        { name: 'Tailwind CSS', description: 'Framework CSS utility-first para diseño rápido' },
                    ].map((tech, index) => (
                        <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold">{tech.name.charAt(0)}</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800">{tech.name}</h4>
                            <p className="text-sm text-gray-600">{tech.description}</p>
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>
                </Card>

                <Card>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Características de ECharts</h3>
                    <ul className="space-y-3">
                    {[
                        'Más de 20 tipos de gráficos 2D/3D',
                        'Renderizado Canvas y SVG',
                        'Interactividad completa',
                        'Temas personalizables',
                        'Documentación extensa',
                        'Comunidad activa',
                    ].map((feature, index) => (
                        <li key={index} className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-green-600">✓</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                </Card>
            </div>

            {/* Tipos de Gráficos */}
            <Card className="mb-8">
                <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Gráficos Implementados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Gráficos 2D</h3>
                    {[
                        { name: 'Líneas', use: 'Tendencias de temperatura' },
                        { name: 'Barras', use: 'Precipitación mensual' },
                        { name: 'Radar', use: 'Patrones de viento' },
                        { name: 'Heatmap', use: 'Distribución de temperaturas' },
                    ].map((chart, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-800">{chart.name}</div>
                        <div className="text-sm text-gray-600">{chart.use}</div>
                        </div>
                    ))}
                    </div>
                    <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Gráficos 3D</h3>
                    {[
                        { name: 'Superficie 3D', use: 'Mapa de temperatura global' },
                        { name: 'Mapa 3D', use: 'Presión atmosférica' },
                        { name: 'Scatter 3D', use: 'Datos multivariados' },
                        { name: 'Barras 3D', use: 'Comparaciones espaciales' },
                    ].map((chart, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-800">{chart.name}</div>
                        <div className="text-sm text-gray-600">{chart.use}</div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </Card>

            {/* Recursos y Enlaces */}
            <Card>
                <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Recursos y Enlaces
                </h2>
                <div className="space-y-4">
                    <a 
                    href="https://echarts.apache.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-blue-600">📚</span>
                    </div>
                    <div>
                        <div className="font-medium text-blue-700">Documentación Oficial de ECharts</div>
                        <div className="text-sm text-blue-600">https://echarts.apache.org</div>
                    </div>
                    </a>
                    
                    <a 
                    href="https://github.com/apache/echarts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-gray-700">💻</span>
                    </div>
                    <div>
                        <div className="font-medium text-gray-800">Repositorio en GitHub</div>
                        <div className="text-sm text-gray-600">https://github.com/apache/echarts</div>
                    </div>
                    </a>

                    <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                        <h4 className="font-medium text-gray-800 mb-2">¿Interesado en el código fuente de este proyecto?</h4>
                        </div>
                        <Button 
                            variant="primary" 
                            className="mt-4 sm:mt-0"
                            onClick={() => window.open('https://github.com/marmik33/climateweb')}
                        >
                            Ver Código en GitHub
                        </Button>
                    </div>
                    </div>
                </div>
                </div>
            </Card>
            </div>
        </div>
        </div>
    );
};

export default About;