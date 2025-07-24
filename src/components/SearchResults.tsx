import { Calendar, Car, Eye, Fuel, MapPin } from 'lucide-react';


// Define Language type directly here to avoid import issues
type Language = 'it' | 'en' | 'es' | 'fr' | 'de';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  version?: string;
  fuel_type?: string;
  public_price?: number;
  mileage?: number;
  initial_registration?: string;
  ubicazione_descrizione?: string;
  searchScore?: number;
  body?: string;
  gear_type?: string;
  doors?: number;
  seats?: number;
  consumption_combined?: number;
}

interface SearchResultsProps {
  vehicles: Vehicle[];
  onVehicleClick: (vehicleId: number) => void;
  language: Language;
}

export function SearchResults({ vehicles, onVehicleClick, language }: SearchResultsProps) {
  const getViewDetailsText = (lang: Language) => {
    const texts = {
      it: 'Vedi dettagli',
      en: 'View details',
      es: 'Ver detalles', 
      fr: 'Voir détails',
      de: 'Details ansehen'
    };
    return texts[lang];
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return `€${price.toLocaleString()}`;
  };

  const formatMileage = (mileage?: number) => {
    if (!mileage) return 'N/A';
    return `${mileage.toLocaleString()} km`;
  };

  const formatYear = (date?: string) => {
    if (!date) return 'N/A';
    return new Date(date).getFullYear().toString();
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="text-sm font-medium text-gray-600 mb-3">
        {language === 'it' && `Trovati ${vehicles.length} veicoli:`}
        {language === 'en' && `Found ${vehicles.length} vehicles:`}
        {language === 'es' && `Encontrados ${vehicles.length} vehículos:`}
        {language === 'fr' && `Trouvé ${vehicles.length} véhicules:`}
        {language === 'de' && `${vehicles.length} Fahrzeuge gefunden:`}
      </div>

      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:bg-white group cursor-pointer"
            onClick={() => onVehicleClick(vehicle.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                  {vehicle.searchScore && (
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Score: {vehicle.searchScore}
                    </span>
                  )}
                </div>

                {/* Vehicle Title */}
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {vehicle.brand} {vehicle.model} {vehicle.version}
                </h3>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-green-600">
                      {formatPrice(vehicle.public_price)}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatYear(vehicle.initial_registration)}</span>
                  </div>

                  {/* Fuel Type */}
                  <div className="flex items-center space-x-1">
                    <Fuel className="w-4 h-4" />
                    <span className="capitalize">{vehicle.fuel_type || 'N/A'}</span>
                  </div>

                  {/* Mileage */}
                  <div className="flex items-center space-x-1">
                    <Car className="w-4 h-4" />
                    <span>{formatMileage(vehicle.mileage)}</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                  {vehicle.body && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {vehicle.body}
                    </span>
                  )}
                  {vehicle.gear_type && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {vehicle.gear_type}
                    </span>
                  )}
                  {vehicle.doors && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {vehicle.doors} porte
                    </span>
                  )}
                  {vehicle.consumption_combined && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {vehicle.consumption_combined}L/100km
                    </span>
                  )}
                </div>

                {/* Location */}
                {vehicle.ubicazione_descrizione && (
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{vehicle.ubicazione_descrizione}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="ml-4 flex-shrink-0">
                <button className="flex items-center space-x-1 px-3 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">{getViewDetailsText(language)}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}