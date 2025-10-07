import React, { useState } from 'react';
import { Search, Filter, Calculator, Car, Fuel, Calendar, Gauge, DollarSign, MapPin, ChevronDown, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VehicleMarketplaceProps {
  onNavigate: (screen: 'home' | 'marketplace' | 'tracking' | 'documents' | 'checkout') => void;
}

export function VehicleMarketplace({ onNavigate }: VehicleMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showCostCalculator, setShowCostCalculator] = useState(false);

  const [filters, setFilters] = useState({
    make: '',
    model: '',
    fuelType: '',
    bodyType: '',
    transmission: '',
    yearFrom: '',
    yearTo: '',
    mileageMax: '',
    priceMin: '',
    priceMax: '',
    currency: 'USD',
    driveType: '',
    stockType: ''
  });

  const [costCalculation, setCostCalculation] = useState({
    cifValue: '',
    duties: '',
    vat: '',
    portCharges: '',
    processingFee: '500'
  });

  const vehicles = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      mileage: 45000,
      engine: '2.5L',
      fuelType: 'Petrol',
      transmission: 'CVT',
      bodyType: 'Sedan',
      driveType: 'FWD',
      price: 28000,
      location: 'Tokyo',
      auctionGrade: '4.5',
      stockType: 'Auction',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeXxlbnwxfHx8fDE3NTk4NDExODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Navigation', 'Backup Camera', 'Bluetooth', 'Keyless Entry']
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      mileage: 32000,
      engine: '1.5L Turbo',
      fuelType: 'Petrol',
      transmission: 'CVT',
      bodyType: 'Sedan',
      driveType: 'FWD',
      price: 24500,
      location: 'Osaka',
      auctionGrade: '4.0',
      stockType: 'Dealer',
      image: 'https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljfGVufDF8fHx8MTc1OTg0MTE4NXww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Honda Sensing', 'Apple CarPlay', 'LED Headlights', 'Sunroof']
    },
    {
      id: 3,
      make: 'Nissan',
      model: 'Altima',
      year: 2021,
      mileage: 28000,
      engine: '2.5L',
      fuelType: 'Petrol',
      transmission: 'CVT',
      bodyType: 'Sedan',
      driveType: 'FWD',
      price: 26800,
      location: 'Yokohama',
      auctionGrade: '4.5',
      stockType: 'Auction',
      image: 'https://images.unsplash.com/photo-1598889933677-e433366327f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBzZWRhbnxlbnwxfHx8fDE3NTk4NDExODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['ProPILOT Assist', 'Bose Audio', 'Wireless Charging', 'Remote Start']
    },
    {
      id: 4,
      make: 'Mazda',
      model: 'CX-5',
      year: 2020,
      mileage: 38000,
      engine: '2.5L',
      fuelType: 'Petrol',
      transmission: 'Auto',
      bodyType: 'SUV',
      driveType: 'AWD',
      price: 32000,
      location: 'Nagoya',
      auctionGrade: '4.0',
      stockType: 'Dealer',
      image: 'https://images.unsplash.com/photo-1558737429-ba3f40f977e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXpkYSUyMHN1dnxlbnwxfHx8fDE3NTk4NDExODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['i-ACTIVSENSE', 'Bose Sound', 'Leather Seats', 'Power Liftgate']
    }
  ];

  const calculateLandedCost = () => {
    const cif = parseFloat(costCalculation.cifValue) || 0;
    const duties = parseFloat(costCalculation.duties) || 0;
    const vat = parseFloat(costCalculation.vat) || 0;
    const port = parseFloat(costCalculation.portCharges) || 0;
    const processing = parseFloat(costCalculation.processingFee) || 0;
    
    return cif + duties + vat + port + processing;
  };

  const calculateEMI = (landedCost: number, downPayment: number = 0, rate: number = 12, tenure: number = 60) => {
    const principal = landedCost - downPayment;
    const monthlyRate = rate / 100 / 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi;
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = !searchQuery || 
      `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = 
      (!filters.make || vehicle.make === filters.make) &&
      (!filters.fuelType || vehicle.fuelType === filters.fuelType) &&
      (!filters.bodyType || vehicle.bodyType === filters.bodyType) &&
      (!filters.transmission || vehicle.transmission === filters.transmission) &&
      (!filters.yearFrom || vehicle.year >= parseInt(filters.yearFrom)) &&
      (!filters.yearTo || vehicle.year <= parseInt(filters.yearTo)) &&
      (!filters.mileageMax || vehicle.mileage <= parseInt(filters.mileageMax)) &&
      (!filters.priceMin || vehicle.price >= parseInt(filters.priceMin)) &&
      (!filters.priceMax || vehicle.price <= parseInt(filters.priceMax)) &&
      (!filters.driveType || vehicle.driveType === filters.driveType) &&
      (!filters.stockType || vehicle.stockType === filters.stockType);

    return matchesSearch && matchesFilters;
  });

  const openCostCalculator = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setCostCalculation({
      ...costCalculation,
      cifValue: vehicle.price.toString()
    });
    setShowCostCalculator(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Marketplace</h1>
        <p className="text-gray-600">Browse our extensive inventory of Japanese vehicles</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by make, model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Filter Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="make">Make</Label>
                  <Select value={filters.make} onValueChange={(value) => setFilters({...filters, make: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Make</SelectItem>
                      <SelectItem value="Toyota">Toyota</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Nissan">Nissan</SelectItem>
                      <SelectItem value="Mazda">Mazda</SelectItem>
                      <SelectItem value="Subaru">Subaru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select value={filters.fuelType} onValueChange={(value) => setFilters({...filters, fuelType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Fuel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Fuel</SelectItem>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bodyType">Body Type</Label>
                  <Select value={filters.bodyType} onValueChange={(value) => setFilters({...filters, bodyType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Body" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Body</SelectItem>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Wagon">Wagon</SelectItem>
                      <SelectItem value="Coupe">Coupe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select value={filters.transmission} onValueChange={(value) => setFilters({...filters, transmission: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Transmission</SelectItem>
                      <SelectItem value="Auto">Automatic</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="yearFrom">Year From</Label>
                  <Input
                    id="yearFrom"
                    placeholder="2015"
                    value={filters.yearFrom}
                    onChange={(e) => setFilters({...filters, yearFrom: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="yearTo">Year To</Label>
                  <Input
                    id="yearTo"
                    placeholder="2024"
                    value={filters.yearTo}
                    onChange={(e) => setFilters({...filters, yearTo: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="mileageMax">Max Mileage (km)</Label>
                  <Input
                    id="mileageMax"
                    placeholder="100000"
                    value={filters.mileageMax}
                    onChange={(e) => setFilters({...filters, mileageMax: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={filters.currency} onValueChange={(value) => setFilters({...filters, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="LKR">LKR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    make: '', model: '', fuelType: '', bodyType: '', transmission: '',
                    yearFrom: '', yearTo: '', mileageMax: '', priceMin: '', priceMax: '',
                    currency: 'USD', driveType: '', stockType: ''
                  })}
                >
                  Clear Filters
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </p>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <ImageWithFallback
                src={vehicle.image}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge className="absolute top-2 left-2 bg-blue-600">
                {vehicle.stockType}
              </Badge>
              <Badge className="absolute top-2 right-2 bg-green-600">
                Grade {vehicle.auctionGrade}
              </Badge>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {vehicle.location}, Japan
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 mr-1 text-gray-400" />
                    {vehicle.mileage.toLocaleString()} km
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1 text-gray-400" />
                    {vehicle.fuelType}
                  </div>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-1 text-gray-400" />
                    {vehicle.transmission}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {vehicle.bodyType}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-900">
                    ${vehicle.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    ≈ LKR {(vehicle.price * 300).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => openCostCalculator(vehicle)}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Landed Cost
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => onNavigate('checkout')}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost Calculator Modal */}
      <Dialog open={showCostCalculator} onOpenChange={setShowCostCalculator}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Landed Cost Calculator</DialogTitle>
            <DialogDescription>
              Calculate the total cost to import {selectedVehicle?.make} {selectedVehicle?.model} to Sri Lanka
            </DialogDescription>
          </DialogHeader>

          {selectedVehicle && (
            <div className="space-y-6">
              {/* Vehicle Summary */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <ImageWithFallback
                  src={selectedVehicle.image}
                  alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
                  className="w-16 h-12 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedVehicle.engine} • {selectedVehicle.mileage.toLocaleString()} km
                  </p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cifValue">CIF Value (USD)</Label>
                  <Input
                    id="cifValue"
                    type="number"
                    value={costCalculation.cifValue}
                    onChange={(e) => setCostCalculation({...costCalculation, cifValue: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="duties">Duties & Taxes (USD)</Label>
                  <Input
                    id="duties"
                    type="number"
                    value={costCalculation.duties}
                    onChange={(e) => setCostCalculation({...costCalculation, duties: e.target.value})}
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <Label htmlFor="vat">VAT (USD)</Label>
                  <Input
                    id="vat"
                    type="number"
                    value={costCalculation.vat}
                    onChange={(e) => setCostCalculation({...costCalculation, vat: e.target.value})}
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <Label htmlFor="portCharges">Port Charges (USD)</Label>
                  <Input
                    id="portCharges"
                    type="number"
                    value={costCalculation.portCharges}
                    onChange={(e) => setCostCalculation({...costCalculation, portCharges: e.target.value})}
                    placeholder="1500"
                  />
                </div>
              </div>

              {/* Total Calculation */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Landed Cost:</span>
                    <span className="text-2xl font-bold text-blue-900">
                      ${calculateLandedCost().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>In LKR (approx.):</span>
                    <span>LKR {(calculateLandedCost() * 300).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* EMI Calculator */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">EMI Calculator</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label>Down Payment (USD)</Label>
                    <Input type="number" placeholder="5000" />
                  </div>
                  <div>
                    <Label>Interest Rate (%)</Label>
                    <Input type="number" placeholder="12" />
                  </div>
                  <div>
                    <Label>Loan Term</Label>
                    <Select defaultValue="60">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="36">36 Months</SelectItem>
                        <SelectItem value="48">48 Months</SelectItem>
                        <SelectItem value="60">60 Months</SelectItem>
                        <SelectItem value="72">72 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="flex justify-between">
                    <span>Estimated Monthly EMI:</span>
                    <span className="font-bold text-green-700">
                      ${calculateEMI(calculateLandedCost(), 5000).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex-1" onClick={() => onNavigate('checkout')}>
                  Proceed to Checkout
                </Button>
                <Button variant="outline" onClick={() => setShowCostCalculator(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}