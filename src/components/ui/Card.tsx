import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
    }

    const Card: React.FC<CardProps> = ({ 
    children, 
    className = '', 
    onClick,
    hoverable = false 
    }) => {
    return (
        <div 
        className={`
            bg-white rounded-xl shadow-md border border-gray-200
            ${hoverable ? 'hover:shadow-lg transition-shadow duration-300' : ''}
            ${onClick ? 'cursor-pointer' : ''}
            ${className}
        `}
        onClick={onClick}
        >
        {children}
        </div>
    );
};

export default Card;