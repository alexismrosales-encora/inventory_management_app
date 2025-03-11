import SearchBar from '../components/SearchBar'
import InventoryTable from '../components/ProductTable'
import TablePageResizer from '../components/TablePageResizer'
import PaginationBar from '../components/PaginationBar'
import ProductForm from '../components/ProductForm'

import { InventoryProvider } from '../context/InventoryContext'
import MetricsTable from '../components/MetricsTable'


const Inventory = () => {
  return (
    <InventoryProvider>
      <SearchBar />
      <InventoryTable />
      <TablePageResizer />
      <PaginationBar />
      <MetricsTable />
    </InventoryProvider>
  );
}

export default Inventory
