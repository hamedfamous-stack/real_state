import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { FavoritesProvider } from '@/context/FavoritesContext'
import Home from '@/pages/Home'
import Properties from '@/pages/Properties'
import PropertyDetail from '@/pages/PropertyDetail'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Team from '@/pages/Team'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:slug" element={<PropertyDetail />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  )
}
