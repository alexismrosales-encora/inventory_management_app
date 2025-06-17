import React from 'react'
import { FilterProvider } from './FilterContext'
import { PaginationProvider } from './PaginationContext'
import { TableTriggerProvider } from './TableTriggerContext'
import { ProductModalProvider } from './ProductModalContext'
import { InventoryDataProvider } from './InventoryDataContext'
import { ConfirmationProvider } from './ConfirmationContext'
import { SortingProvider } from './SortingContext'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableTriggerProvider>
      <FilterProvider>
        <PaginationProvider>
          <ProductModalProvider>
            <InventoryDataProvider>
              <ConfirmationProvider>
                <SortingProvider>
                  {children}
                </SortingProvider>
              </ConfirmationProvider>
            </InventoryDataProvider>
          </ProductModalProvider>
        </PaginationProvider>
      </FilterProvider>
    </TableTriggerProvider>
  )
}
