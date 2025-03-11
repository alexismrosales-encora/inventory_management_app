import SearchBar from '../components/SearchBar'
import InventoryTable from '../components/ProductTable'
import TablePageResizer from '../components/TablePageResizer'
import PaginationBar from '../components/PaginationBar'
import ShowProductForm from '../components/ShowProductForm'
import MetricsTable from '../components/MetricsTable'

import { InventoryProvider } from '../context/InventoryContext'


const Inventory = () => {
  return (
    <InventoryProvider>
      <SearchBar />
      <InventoryTable />
      <TablePageResizer />
      <PaginationBar />
      <ShowProductForm />
      <MetricsTable />
    </InventoryProvider>
  );
}

export default Inventory
