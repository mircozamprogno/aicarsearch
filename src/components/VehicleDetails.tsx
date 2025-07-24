import { Calendar, Car, Cog, DoorOpen, Fuel, Gauge, MapPin, Scale, Users, X, Zap } from 'lucide-react';


// Define Language type directly here to avoid import issues
type Language = 'it' | 'en' | 'es' | 'fr' | 'de';

interface VehicleDetailsProps {
  vehicle: any;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function VehicleDetails({ vehicle, isOpen, onClose, language }: VehicleDetailsProps) {
  if (!isOpen || !vehicle) return null;

  const getTitle = (lang: Language) => {
    const titles = {
      it: 'Dettagli Veicolo',
      en: 'Vehicle Details',
      es: 'Detalles del Vehículo',
      fr: 'Détails du Véhicule',
      de: 'Fahrzeugdetails'
    };
    return titles[lang];
  };

  const getLabels = (lang: Language) => {
    const labels = {
      it: {
        general: 'Informazioni Generali',
        technical: 'Specifiche Tecniche',
        consumption: 'Consumi ed Emissioni',
        equipment: 'Equipaggiamenti',
        price: 'Prezzo',
        location: 'Ubicazione',
        year: 'Anno',
        mileage: 'Chilometraggio',
        fuel: 'Alimentazione',
        body: 'Carrozzeria',
        transmission: 'Cambio',
        power: 'Potenza',
        engine: 'Motore',
        doors: 'Porte',
        seats: 'Posti',
        urban: 'Urbano',
        extraUrban: 'Extraurbano',
        combined: 'Combinato',
        emissions: 'Emissioni CO2'
      },
      en: {
        general: 'General Information',
        technical: 'Technical Specifications',
        consumption: 'Consumption & Emissions',
        equipment: 'Equipment',
        price: 'Price',
        location: 'Location',
        year: 'Year',
        mileage: 'Mileage',
        fuel: 'Fuel Type',
        body: 'Body Type',
        transmission: 'Transmission',
        power: 'Power',
        engine: 'Engine',
        doors: 'Doors',
        seats: 'Seats',
        urban: 'Urban',
        extraUrban: 'Extra Urban',
        combined: 'Combined',
        emissions: 'CO2 Emissions'
      },
      es: {
        general: 'Información General',
        technical: 'Especificaciones Técnicas',
        consumption: 'Consumo y Emisiones',
        equipment: 'Equipamiento',
        price: 'Precio',
        location: 'Ubicación',
        year: 'Año',
        mileage: 'Kilometraje',
        fuel: 'Combustible',
        body: 'Carrocería',
        transmission: 'Transmisión',
        power: 'Potencia',
        engine: 'Motor',
        doors: 'Puertas',
        seats: 'Asientos',
        urban: 'Urbano',
        extraUrban: 'Extraurbano',
        combined: 'Combinado',
        emissions: 'Emisiones CO2'
      },
      fr: {
        general: 'Informations Générales',
        technical: 'Spécifications Techniques',
        consumption: 'Consommation et Émissions',
        equipment: 'Équipements',
        price: 'Prix',
        location: 'Localisation',
        year: 'Année',
        mileage: 'Kilométrage',
        fuel: 'Carburant',
        body: 'Carrosserie',
        transmission: 'Transmission',
        power: 'Puissance',
        engine: 'Moteur',
        doors: 'Portes',
        seats: 'Places',
        urban: 'Urbain',
        extraUrban: 'Extra-urbain',
        combined: 'Combiné',
        emissions: 'Émissions CO2'
      },
      de: {
        general: 'Allgemeine Informationen',
        technical: 'Technische Daten',
        consumption: 'Verbrauch & Emissionen',
        equipment: 'Ausstattung',
        price: 'Preis',
        location: 'Standort',
        year: 'Jahr',
        mileage: 'Laufleistung',
        fuel: 'Kraftstoff',
        body: 'Karosserie',
        transmission: 'Getriebe',
        power: 'Leistung',
        engine: 'Motor',
        doors: 'Türen',
        seats: 'Sitze',
        urban: 'Stadt',
        extraUrban: 'Außerorts',
        combined: 'Kombiniert',
        emissions: 'CO2-Emissionen'
      }
    };
    return labels[lang];
  };

  const labels = getLabels(language);
  const year = vehicle.initial_registration ? new Date(vehicle.initial_registration).getFullYear() : 'N/A';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-90vh overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{getTitle(language)}</h2>
            <p className="text-lg text-gray-600 mt-1">
              {vehicle.brand} {vehicle.model} {vehicle.version}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-80vh">
          <div className="p-6 space-y-8">
            {/* Price Section */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{labels.price}</h3>
                  <p className="text-3xl font-bold text-green-600">
                    €{vehicle.public_price?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {vehicle.ubicazione_descrizione && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{vehicle.ubicazione_descrizione}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* General Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Car className="w-5 h-5 text-blue-600" />
                <span>{labels.general}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{labels.year}</span>
                  </div>
                  <p className="text-lg font-semibold">{year}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gauge className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{labels.mileage}</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {vehicle.mileage?.toLocaleString() || 'N/A'} km
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Fuel className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{labels.fuel}</span>
                  </div>
                  <p className="text-lg font-semibold capitalize">
                    {vehicle.fuel_type || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Cog className="w-5 h-5 text-blue-600" />
                <span>{labels.technical}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Car className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{labels.body}</span>
                  </div>
                  <p className="font-semibold capitalize">{vehicle.body || 'N/A'}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cog className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{labels.transmission}</span>
                  </div>
                  <p className="font-semibold capitalize">{vehicle.gear_type || 'N/A'}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DoorOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{labels.doors}</span>
                  </div>
                  <p className="font-semibold">{vehicle.doors || 'N/A'}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{labels.seats}</span>
                  </div>
                  <p className="font-semibold">{vehicle.seats || 'N/A'}</p>
                </div>

                {vehicle.kilowatt && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{labels.power}</span>
                    </div>
                    <p className="font-semibold">{vehicle.kilowatt} kW</p>
                  </div>
                )}

                {vehicle.capacity && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Cog className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{labels.engine}</span>
                    </div>
                    <p className="font-semibold">{vehicle.capacity} cc</p>
                  </div>
                )}

                {vehicle.kerb_weight && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Scale className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Peso</span>
                    </div>
                    <p className="font-semibold">{vehicle.kerb_weight} kg</p>
                  </div>
                )}
              </div>
            </div>

            {/* Consumption & Emissions */}
            {(vehicle.consumption_urban || vehicle.consumption_extra_urban || vehicle.consumption_combined || vehicle.co2_liquid) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Fuel className="w-5 h-5 text-green-600" />
                  <span>{labels.consumption}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {vehicle.consumption_urban && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">{labels.urban}</p>
                      <p className="text-lg font-semibold text-green-600">
                        {vehicle.consumption_urban} L/100km
                      </p>
                    </div>
                  )}

                  {vehicle.consumption_extra_urban && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">{labels.extraUrban}</p>
                      <p className="text-lg font-semibold text-green-600">
                        {vehicle.consumption_extra_urban} L/100km
                      </p>
                    </div>
                  )}

                  {vehicle.consumption_combined && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">{labels.combined}</p>
                      <p className="text-lg font-semibold text-green-600">
                        {vehicle.consumption_combined} L/100km
                      </p>
                    </div>
                  )}

                  {vehicle.co2_liquid && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">{labels.emissions}</p>
                      <p className="text-lg font-semibold text-green-600">
                        {vehicle.co2_liquid} g/km
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Equipment */}
            {vehicle.equipments && Array.isArray(vehicle.equipments) && vehicle.equipments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Cog className="w-5 h-5 text-purple-600" />
                  <span>{labels.equipment}</span>
                </h3>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {vehicle.equipments.map((equipment: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{equipment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {vehicle.notes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Note</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700">{vehicle.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}