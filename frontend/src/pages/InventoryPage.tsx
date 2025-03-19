import SearchBar from '../components/searchFilterBar/SearchBar'
import InventoryTable from '../components/inventoryTable/ProductTable'
import PaginationBar from '../components/inventoryTable/PaginationBar'
import MetricsTable from '../components/metrics/MetricsTable'

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
