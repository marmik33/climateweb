import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Charts2D from './pages/Charts2D';
import Charts3D from './pages/Charts3D';
import ClimateExplorer from './pages/ClimateExplorer';
import AdvancedAnalysis from './pages/AdvancedAnalysis';
import About from './pages/About';
import './App.css';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow w-full px-6 lg:px-12 xl:px-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charts-2d" element={<Charts2D />} />
            <Route path="/charts-3d" element={<Charts3D />} />
            <Route path="/climate-explorer" element={<ClimateExplorer />} />
            <Route path="/advanced-analysis" element={<AdvancedAnalysis />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;