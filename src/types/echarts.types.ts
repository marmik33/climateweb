// src/types/echarts.types.ts
import type { EChartsOption, SeriesOption } from 'echarts';

export type { EChartsOption, SeriesOption };

// Tipo específico para series 3D
export type Series3DOption = any; // Usamos any para flexibilidad con opciones 3D

export interface EChartsReactProps {
    option: EChartsOption;
    style?: React.CSSProperties;
    className?: string;
    theme?: string;
    onChartReady?: (instance: any) => void;
    onEvents?: Record<string, Function>;
    opts?: {
        devicePixelRatio?: number;
        renderer?: 'canvas' | 'svg';
        width?: number | string;
        height?: number | string;
        locale?: string;
    };
}