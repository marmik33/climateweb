import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
        <div className="w-full px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y Descripción */}
            <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">EC</span>
                </div>
                <span className="text-xl font-bold">ECharts Climate</span>
                </div>
                <p className="text-gray-400 text-sm">
                Explorador interactivo de datos climáticos utilizando la biblioteca 
                ECharts de Apache.
                </p>
            </div>

            {/* Enlaces Rápidos */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Explorar</h3>
                <ul className="space-y-2">
                <li>
                    <Link to="/charts-2d" className="text-gray-400 hover:text-white transition-colors">
                    Gráficos 2D
                    </Link>
                </li>
                <li>
                    <Link to="/charts-3d" className="text-gray-400 hover:text-white transition-colors">
                    Gráficos 3D
                    </Link>
                </li>
                <li>
                    <Link to="/climate-explorer" className="text-gray-400 hover:text-white transition-colors">
                    Explorador Completo
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    Acerca de
                    </Link>
                </li>
                </ul>
            </div>

            {/* Tecnologías */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Tecnologías</h3>
                <ul className="space-y-2">
                <li>
                    <a 
                    href="https://reactjs.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                    React
                    </a>
                </li>
                <li>
                    <a 
                    href="https://www.typescriptlang.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                    TypeScript
                    </a>
                </li>
                <li>
                    <a 
                    href="https://echarts.apache.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                    ECharts
                    </a>
                </li>
                <li>
                    <a 
                    href="https://tailwindcss.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                    Tailwind CSS
                    </a>
                </li>
                </ul>
            </div>

            {/* Contacto y Recursos */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Recursos</h3>
                <ul className="space-y-2">
                <li>
                    <a 
                    href="https://echarts.apache.org/handbook" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                    Documentación ECharts
                    </a>
                </li>
                <li>
                    <a 
                    href="https://github.com/apache/echarts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                    GitHub ECharts
                    </a>
                </li>
                <li>
                    <a 
                    href="https://echarts.apache.org/examples" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                    Ejemplos de ECharts
                    </a>
                </li>
                </ul>
            </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} ECharts Climate Explorer. Proyecto educativo.
                </div>
                <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">
                    Datos climáticos de demostración
                </span>
                <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                    <span className="text-xs">🌍</span>
                    </button>
                    <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                    <span className="text-xs">📊</span>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;