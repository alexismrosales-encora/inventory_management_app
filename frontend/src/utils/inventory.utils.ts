export enum StockStatus {
  IN_STOCK,
  LOW_STOCK,
  OUT_OF_STOCK,
}

export const StockStatusMap: Record<StockStatus, string> = {
  [StockStatus.IN_STOCK]: "In Stock",
  [StockStatus.OUT_OF_STOCK]: "Out of Stock",
  [StockStatus.LOW_STOCK]: "Low stock",
}

export const StockStatusList = (): Array<{ key: StockStatus; label: string }> => {
  return Object.entries(StockStatusMap).map(([key, label]) => ({
    key: key as unknown as StockStatus,
    label,
  }));
}

export const pageSizes: number[] = [5, 10, 20];
