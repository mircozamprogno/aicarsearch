import { useState } from 'react';
import { supabase } from '../lib/supabase';

// Define Language type locally to avoid import issues
type Language = 'it' | 'en' | 'es' | 'fr' | 'de';

interface SearchResult {
  action: 'search' | 'details';
  vehicles?: any[];
  vehicle?: any;
  ai_response?: string;
  search_params?: any;
  vehicle_ids?: number[];
  success: boolean;
  error?: string;
}

export function useCarSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCars = async (
    message: string, 
    language: Language = 'it',
    conversationContext?: any
  ): Promise<SearchResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('aicarsearch', {
        body: {
          message,
          language,
          conversation_context: conversationContext
        }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Search failed');
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getVehicleDetails = async (vehicleId: number): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('aicarsearch', {
        body: {
          action: 'details',
          vehicle_id: vehicleId
        }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to get vehicle details');
      }

      return data.vehicle;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchCars,
    getVehicleDetails,
    isLoading,
    error
  };
}