import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { name: 'Inicio', path: '/' },
        { name: 'Gráficos 2D', path: '/charts-2d' },
        { name: 'Gráficos 3D', path: '/charts-3d' },
        { name: 'Explorador', path: '/climate-explorer' },
        { name: 'Acerca de', path: '/about' },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="w-full px-6 py-4">
            <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">EC</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-800">ECharts Climate</h1>
                    <p className="text-xs text-gray-500">Explorador Visual</p>
                </div>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
                {navigation.map((item) => (
                <Link
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {item.name}
                </Link>
                ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                {isMenuOpen ? (
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                    />
                )}
                </svg>
            </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
            <div className="md:hidden pb-4">
                <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                    <Link
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    >
                    {item.name}
                    </Link>
                ))}
                </div>
            </div>
            )}
        </div>
        </header>
    );
};

export default Header;