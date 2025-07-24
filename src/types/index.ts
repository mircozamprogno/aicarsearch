export type Language = 'it' | 'en' | 'es' | 'fr' | 'de';

export interface Vehicle {
  id: number;
  brand?: string;
  model?: string;
  version?: string;
  fuel_type?: string;
  public_price?: number;
  mileage?: number;
  initial_registration?: string;
  searchScore?: number;
}

export interface SearchResult {
  action: 'search' | 'details';
  vehicles?: Vehicle[];
  vehicle?: Vehicle;
  ai_response?: string;
  success: boolean;
  error?: string;
}