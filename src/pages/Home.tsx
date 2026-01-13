import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="w-full px-6 py-12">
            <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Explorador Climático con ECharts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Una aplicación interactiva para visualizar datos climáticos en 2D y 3D 
                utilizando la potente librería ECharts de Apache
            </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Gráficos 2D</h3>
                <p className="text-gray-600 mb-4">
                    Visualiza temperaturas, precipitaciones y datos de viento con gráficos 
                    interactivos en 2 dimensiones.
                </p>
                <Link to="/charts-2d">
                    <Button variant="primary" fullWidth>
                    Explorar 2D
                    </Button>
                </Link>
                </div>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Gráficos 3D</h3>
                <p className="text-gray-600 mb-4">
                    Explora superficies de temperatura global y mapas de presión en 
                    impresionantes visualizaciones 3D.
                </p>
                <Link to="/charts-3d">
                    <Button variant="primary" fullWidth>
                    Explorar 3D
                    </Button>
                </Link>
                </div>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Explorador Climático</h3>
                <p className="text-gray-600 mb-4">
                    Panel completo con todos los gráficos organizados para análisis 
                    climático integrado.
                </p>
                <Link to="/climate-explorer">
                    <Button variant="primary" fullWidth>
                    Ir al Explorador
                    </Button>
                </Link>
                </div>
            </Card>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Características Principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">✓</span>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">Gráficos Interactivos</h4>
                    <p className="text-gray-600">Zoom, tooltips y selección en tiempo real</p>
                </div>
                </div>
                <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">✓</span>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">Visualización 2D & 3D</h4>
                    <p className="text-gray-600">Multiples tipos de gráficos combinados</p>
                </div>
                </div>
                <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">✓</span>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">Datos Climáticos</h4>
                    <p className="text-gray-600">Temperatura, precipitación, viento y presión</p>
                </div>
                </div>
                <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">✓</span>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">Responsive Design</h4>
                    <p className="text-gray-600">Adaptado a todos los dispositivos</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Home;