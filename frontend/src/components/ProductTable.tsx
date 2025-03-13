import { ProductRowHeader, ProductRows } from './ProductRow'
const ProductTable = () => {
  return <div className="relative overflow-x-auto">
    <div className="text-lg md:w-7/12 sm:w-full">
      <table className="table-auto border-collapse w-full text-gray-900">
        <thead className="border-b-2 border-primary-500">
          <ProductRowHeader />
        </thead>
        <tbody>
          <ProductRows />
        </tbody>
      </table>
    </div>
  </div>
}
export default ProductTable
