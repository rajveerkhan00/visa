// app/page.tsx
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import SmartServices from './components/SmartServices'
import Footer from './components/Footer'
import Login from './components/LoginSection'


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Login />
      <SmartServices />
      <Footer />
    </main>
  )
}