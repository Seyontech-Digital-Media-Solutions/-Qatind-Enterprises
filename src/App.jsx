import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Service from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import useLenis from './hooks/useLenis'
import Menu from './pages/Menu'
import DailyMenu from './pages/DailyMenu'
import Gallery from './pages/Gallery'
import Bakery from './pages/Bakery'

import './styles/main.scss'

function App() {
  useLenis()

  return (
    <Router
      basename={import.meta.env.BASE_URL}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/About" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/daily-menu" element={<DailyMenu />} />
          <Route path="/ServicesPage" element={<Service />} />
          <Route path="/services" element={<Service />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/bakery" element={<Bakery />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App