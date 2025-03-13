import ProductForm from './ProductForm'

import { InventoryContext } from "../context/InventoryContext"
import { useContext, useState } from 'react'
import { NewProductIcon } from './Icons'
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
    <button type="button" className="bg-accent-500 p-2 rounded-xl" onClick={() => setOpenNewProductForm(true)}>
      <NewProductIcon />
    </button>
    {
      openNewProductForm && <ProductForm onClose={() => setOpenNewProductForm(false)} />
    }
  </>
}

export default ShowProductForm
