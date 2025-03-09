import { ProductRowHeader, ProductRows } from './ProductRow'
const ProductTable = () => {
  return <table>
    <thead>
      <ProductRowHeader />
    </thead>
    <tbody>
      <ProductRows />
    </tbody>
  </table>
}
export default ProductTable
