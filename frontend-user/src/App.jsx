import './App.css'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

function App() {
  return (
    <>
      <main>
        <Nav />
        <Outlet />
      </main>
    </>
  )
}

export default App
