import { useEffect, useState } from "react"
import { MetricsType } from "../types/inventory"
import inventoryService from "../services/inventory.service"
import { useTableTrigger } from "../context/TableTriggerContext"

export const useMetricsData = () => {

  // Context hooks
  const { shouldUpdateTable } = useTableTrigger()

  // Local hooks
  const [metrics, setMetrics] = useState<MetricsType | null>({
    averagePriceInStock: 0,
    totalValueInStock: 0,
    categoryMetrics: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch metrics from the service when the table update trigger changes
  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await inventoryService.getMetrics();
        setMetrics(response);
      } catch (err) {
        console.error("Failed to fetch metrics:", err);
        setError("Could not load metrics data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [shouldUpdateTable]);

  return {
    metrics,
    error,
    isLoading
  }
}
