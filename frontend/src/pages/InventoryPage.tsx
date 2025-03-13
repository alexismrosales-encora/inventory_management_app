import SearchBar from '../components/SearchBar'
import InventoryTable from '../components/ProductTable'
import PaginationBar from '../components/PaginationBar'
import MetricsTable from '../components/MetricsTable'

import { InventoryProvider } from '../context/InventoryContext'


const Inventory = () => {
  return (
    <InventoryProvider>
      <h1 className="font-semibold text-3xl">INVENTORY</h1>
      <SearchBar />
      <InventoryTable />
      <PaginationBar />
      <MetricsTable />
    </InventoryProvider>
  );
}

export default Inventory
