import ProductForm from './ProductForm'

import { InventoryContext } from "../context/InventoryContext"
import { useContext, useState } from 'react'
const ShowProductForm = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }

  const { item, shouldOpenForm, setShouldOpenForm } = context.toggleForCreateAndEditProduct

  const [openNewProductForm, setOpenNewProductForm] = useState(false)

  return <>
    {
      shouldOpenForm && <ProductForm productToEdit={item} onClose={() => setShouldOpenForm(false)} />
    }
    <button type="button" onClick={() => setOpenNewProductForm(true)}>Create a new product</button>
    {
      openNewProductForm && <ProductForm onClose={() => setOpenNewProductForm(false)} />
    }
  </>
}

export default ShowProductForm
