import './App.css'
import { AppProviders } from './context/AppProviders'
import InventoryPage from './pages/InventoryPage'

function App() {
  return (
    <AppProviders>
      <div className="font-inter md:text-lg text-xl p-6 md:px-[12rem] container mx-auto md:mx-auto">
        <InventoryPage />
      </div>
    </AppProviders>
  )
}

export default App
