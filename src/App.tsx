import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RouteEffects from './components/RouteEffects';
import About from './pages/About';
import Contact from './pages/Contact';
import Education from './pages/Education';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <RouteEffects />
      <Navbar />
      <main className="pt-20">
        {/* Keyed by path so each page plays its enter animation when navigated to. */}
        <div key={location.pathname} className="page-enter">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
