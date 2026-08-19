import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
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
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          
          <Route path="/daily-menu" element={<DailyMenu />} />
          <Route path="/ServicesPage" element={<Service/>} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/bakery" element={<Bakery />} />
          <Route path="/ContactPage" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App