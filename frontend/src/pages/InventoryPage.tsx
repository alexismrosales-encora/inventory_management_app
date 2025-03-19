/**
 * Inventory Page Component
 *
 * This component represents the main Inventory page. It renders the following sections:
 * - A header title ("INVENTORY")
 * - A SearchBar for filtering and searching products.
 * - An InventoryTable that displays the list of products.
 * - A PaginationBar for navigating through pages of products.
 * - A MetricsTable showing overall inventory metrics.
 *
 * The page is wrapped with InventoryProvider, which supplies the necessary context
 * for state management across the components.
 *
 * @component
 * @example
 * return (
 *   <Inventory />
 * )
 */
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
