# ECharts Climate Explorer

ECharts Climate Explorer is an educational web application built with React, TypeScript, and Apache ECharts.  
The goal of this project is to demonstrate the capabilities of the ECharts library for creating interactive 2D and 3D data visualizations focused on climate data.

The application allows users to explore different climate variables such as temperature, precipitation, wind, and atmospheric pressure across multiple regions around the world.

---

## Features

- 2D Data Visualizations
  - Line charts
  - Bar charts
  - Heatmaps
  - Comparative climate charts

- 3D Data Visualizations
  - Temperature surface charts
  - 3D representations of global climate data
  - Interactive rotation and zoom

- Modern User Interface
  - Responsive design using Tailwind CSS
  - Modular and reusable React components
  - Clean and structured layout

- Multiple Sections
  - Home dashboard
  - 2D Charts
  - 3D Charts
  - Climate Explorer
  - Advanced Analysis
  - About page

---

## Tech Stack

- React
- TypeScript
- Vite
- Apache ECharts
- Tailwind CSS
- React Router

---

## Project Structure

```txt
src/
├── components/
│   ├── layout/        # Header, Footer
│   └── ui/            # Reusable UI components
├── pages/             # Application pages
├── App.tsx
├── main.tsx
└── index.css
```
## Installation and Setup

- Clone the repository:
    - git clone https://github.com/your-username/echarts-climate-explorer.git
- Navigate to the project directory:
    - cd echarts-climate-explorer
- Install dependencies:
    - npm install
- Start the development server:
    - npm run dev
- The application will be available at:
    - http://localhost:5173

## Data Disclaimer

Climate data displayed in this application is retrieved from the Open-Meteo API, a free and open weather data service.

Open-Meteo provides global weather forecasts and historical climate data without requiring API keys.
More information about the data source can be found at:

https://open-meteo.com/