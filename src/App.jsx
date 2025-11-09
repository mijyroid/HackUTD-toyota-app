import React, { useState, useMemo, useEffect } from 'react';
// 1. IMPORT MORE ICONS for new features
import {
  Search, X, SlidersHorizontal, ChevronDown, ChevronUp,
  Heart, MapPin, MessageSquare, Award, XCircle
} from 'lucide-react';


// --- (Person 2: Your Zone) ---
// This is your mock "database". I've added all the new fields.
// Add more cars and find real image URLs!
const DB_CARS = [
  {
    id: 1,
    model: 'RAV4',
    trim: 'Hybrid XLE',
    year: 2025,
    price: 36500,
    mileage: 15,
    bodyType: 'SUV',
    fuelType: 'Hybrid',
    mpg: 40,
    drivetrain: 'AWD',
    color: 'Silver',
    seatingCapacity: 5,
    features: ['Sunroof', 'Apple CarPlay', 'AWD'],
    image: 'https://placehold.co/600x400/e0e0e0/black?text=RAV4+Hybrid',
  },
  {
    id: 2,
    model: 'Camry',
    trim: 'SE',
    year: 2025,
    price: 29800,
    mileage: 10,
    bodyType: 'Sedan',
    fuelType: 'Gas',
    mpg: 31,
    drivetrain: 'FWD',
    color: 'Blue',
    seatingCapacity: 5,
    features: ['Apple CarPlay', 'Toyota Safety Sense'],
    image: 'https://placehold.co/600x400/e0e0e0/black?text=Camry+SE',
  },
  {
    id: 3,
    model: 'Grand Highlander',
    trim: 'Limited',
    year: 2024,
    price: 51200,
    mileage: 25,
    bodyType: 'SUV',
    fuelType: 'Gas',
    mpg: 24,
    drivetrain: 'AWD',
    color: 'Black',
    seatingCapacity: 7,
    features: ['Sunroof', 'Leather Seats', 'Apple CarPlay', 'AWD', '3-Row Seating'],
    image: 'https://placehold.co/600x400/e0e0e0/black?text=Grand+Highlander',
  },
  {
    id: 4,
    model: 'Tacoma',
    trim: 'TRD Off-Road',
    year: 2025,
    price: 44500,
    mileage: 5,
    bodyType: 'Truck',
    fuelType: 'Gas',
    mpg: 22,
    drivetrain: 'AWD',
    color: 'Red',
    seatingCapacity: 5,
    features: ['Apple CarPlay', 'AWD', 'Off-Road Suspension'],
    image: 'https://placehold.co/600x400/e0e0e0/black?text=Tacoma+TRD',
  },
  {
    id: 5,
    model: 'Corolla',
    trim: 'Hybrid LE',
    year: 2025,
    price: 24900,
    mileage: 12,
    bodyType: 'Sedan',
    fuelType: 'Hybrid',
    mpg: 50,
    drivetrain: 'FWD',
    color: 'White',
    seatingCapacity: 5,
    features: ['Apple CarPlay', 'Toyota Safety Sense'],
    image: 'https://placehold.co/600x400/e0e0e0/black?text=Corolla+Hybrid',
  },
  {
    id: 6,
    model: 'bZ4X',
    trim: 'XLE',
    year: 2024,
    price: 43070,
    mileage: 50,
    bodyType: 'SUV',
    fuelType: 'Electric',
    mpg: 119, // eMPG
    drivetrain: 'FWD',
    color: 'Silver',
    seatingCapacity: 5,
    features: ['Apple CarPlay', 'Toyota Safety Sense', 'Panoramic Roof'],
    image: 'https://placehold.co/600x400/e0e0e0/black?text=bZ4X+Electric',
  },
  {
    id: 7,
    model: 'Sienna',
    trim: 'XLE',
    year: 2025,
    price: 43100,
    mileage: 8,
    bodyType: 'Minivan',
    fuelType: 'Hybrid',
    mpg: 36,
    drivetrain: 'AWD',
    color: 'Gray',
    seatingCapacity: 8,
    features: ['Apple CarPlay', 'AWD', 'Sunroof', 'Leather Seats', '3-Row Seating'],
    image: 'https://placehold.co/600x400/e0e0e0/black?text=Sienna+Hybrid',
  },
  {
    id: 8,
    model: 'RAV4',
    trim: 'LE',
    year: 2024,
    price: 29825,
    mileage: 100,
    bodyType: 'SUV',
    fuelType: 'Gas',
    mpg: 30,
    drivetrain: 'FWD',
    color: 'White',
    seatingCapacity: 5,
    features: ['Apple CarPlay', 'Toyota Safety Sense'],
    image: 'https://placehold.co/600x400/e0e0e0/black?text=RAV4+LE',
  },
];


// Reusable Filter Section Component
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-semibold"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className={`mt-4 space-y-3 ${isOpen ? 'block' : 'hidden'}`}>{children}</div>
    </div>
  );
};


// Reusable Checkbox
const FilterCheckbox = ({ id, label, isChecked, onChange }) => (
  <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
    <input
      id={id}
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="h-5 w-5 rounded text-red-600 focus:ring-red-500"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);


// Reusable Button
const FilterButton = ({ label, isSelected, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      isSelected
        ? 'bg-red-600 text-white'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    } ${className}`}
  >
    {label}
  </button>
);


// --- NEW: Color Swatch Button ---
const ColorSwatch = ({ color, isSelected, onClick }) => {
  const colorMap = {
    Black: 'bg-black',
    White: 'bg-white',
    Silver: 'bg-gray-400',
    Gray: 'bg-gray-600',
    Red: 'bg-red-600',
    Blue: 'bg-blue-600',
  };
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full border-2 ${isSelected ? 'border-red-600' : 'border-gray-300'} ${colorMap[color] || 'bg-gray-200'}`}
      title={color}
    />
  );
};




// --- Left Sidebar Component ---
// (Person 1: Your Zone)
const Sidebar = ({ filters, paymentInputs, onFilterChange, onPaymentChange, onClearFilters }) => {
  // Handlers for different filter types
 
  // Toggles a value in an array (for checkboxes)
  const handleCheckboxChange = (key, value) => {
    const currentValues = filters[key] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(key, newValues);
  };


  // Sets a single value (for radio buttons)
  const handleRadioChange = (key, value) => {
    const newValue = filters[key] === value ? null : value;
    onFilterChange(key, newValue);
  };
 
  // Handles text/number inputs
  const handleInputChange = (key, value) => {
    onFilterChange(key, value);
  };


  return (
    <aside className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={onClearFilters}
          className="text-sm font-medium text-red-600 hover:text-red-800"
        >
          Clear All
        </button>
      </div>


      {/* --- NEW: Payment Estimator Section --- */}
      <FilterSection title="Estimate Your Payment" defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <label htmlFor="credit-score" className="block text-sm font-medium text-gray-700 mb-1">
              Credit Score: <span className="font-bold">{paymentInputs.creditScore}</span>
            </label>
            <input
              id="credit-score"
              type="range"
              min="600"
              max="850"
              step="10"
              value={paymentInputs.creditScore}
              onChange={(e) => onPaymentChange('creditScore', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>
          <div>
            <label htmlFor="down-payment" className="block text-sm font-medium text-gray-700">Down Payment</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                id="down-payment"
                type="number"
                step="500"
                value={paymentInputs.downPayment}
                onChange={(e) => onPaymentChange('downPayment', e.target.value)}
                className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </FilterSection>


      {/* --- UPDATED: Favorites Filter (Moved to top) --- */}
      <FilterSection title="My Garage" defaultOpen={true}>
        <FilterButton
          label={
            <span className="flex items-center gap-2">
              <Award size={16} /> Show My Favorites
            </span>
          }
          isSelected={filters.showFavorites}
          onClick={() => onFilterChange('showFavorites', !filters.showFavorites)}
        />
      </FilterSection>


      {/* --- Price Filter --- */}
      <FilterSection title="Price Range" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Under $25k', value: 25000 },
            { label: '$25k - $35k', value: 35000 },
            { label: '$35k - $45k', value: 45000 },
            { label: 'Over $45k', value: 45001 },
          ].map((range) => (
            <FilterButton
              key={range.value}
              label={range.label}
              isSelected={filters.price === range.value}
              onClick={() => handleRadioChange('price', range.value)}
            />
          ))}
        </div>
      </FilterSection>
     
      {/* --- NEW: Year & Mileage Filter --- */}
      <FilterSection title="Year & Mileage" defaultOpen={false}>
        <div className="flex gap-2">
            <div>
              <label htmlFor="year-min" className="block text-sm font-medium text-gray-700">Year (Min)</label>
              <input
                id="year-min"
                type="number"
                placeholder="2020"
                value={filters.yearMin || ''}
                onChange={(e) => handleInputChange('yearMin', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="year-max" className="block text-sm font-medium text-gray-700">Year (Max)</label>
              <input
                id="year-max"
                type="number"
                placeholder="2025"
                value={filters.yearMax || ''}
                onChange={(e) => handleInputChange('yearMax', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
        </div>
        <div className="mt-3">
            <label htmlFor="mileage-max" className="block text-sm font-medium text-gray-700">Max Mileage</label>
            <select
                id="mileage-max"
                value={filters.mileageMax || ''}
                onChange={(e) => handleInputChange('mileageMax', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">Any</option>
                <option value="15000">Under 15,000</option>
                <option value="30000">Under 30,000</option>
                <option value="50000">Under 50,000</option>
            </select>
        </div>
      </FilterSection>


      {/* --- Body Type Filter --- */}
      <FilterSection title="Body Type" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {['SUV', 'Sedan', 'Truck', 'Minivan'].map((type) => (
            <FilterButton
              key={type}
              label={type}
              isSelected={filters.bodyType?.includes(type)}
              onClick={() => handleCheckboxChange('bodyType', type)}
            />
          ))}
        </div>
      </FilterSection>


      {/* --- Fuel Type Filter --- */}
      <FilterSection title="Fuel Type" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {['Gas', 'Hybrid', 'Electric'].map((type) => (
            <FilterButton
              key={type}
              label={type}
              isSelected={filters.fuelType?.includes(type)}
              onClick={() => handleCheckboxChange('fuelType', type)}
            />
          ))}
        </div>
      </FilterSection>
     
      {/* --- NEW: MPG Filter --- */}
      <FilterSection title="MPG" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '30+ MPG', value: 30 },
            { label: '40+ MPG', value: 40 },
            { label: '50+ MPG', value: 50 },
          ].map((mpg) => (
            <FilterButton
              key={mpg.value}
              label={mpg.label}
              isSelected={filters.mpgMin === mpg.value}
              onClick={() => handleRadioChange('mpgMin', mpg.value)}
            />
          ))}
        </div>
      </FilterSection>
     
      {/* --- NEW: Seating Capacity Filter --- */}
      <FilterSection title="Seating Capacity" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '5 Seats', value: 5 },
            { label: '7 Seats', value: 7 },
            { label: '8 Seats', value: 8 },
          ].map((seats) => (
            <FilterButton
              key={seats.value}
              label={seats.label}
              isSelected={filters.seatingCapacity === seats.value}
              onClick={() => handleRadioChange('seatingCapacity', seats.value)}
            />
          ))}
        </div>
      </FilterSection>
     
      {/* --- NEW: Color Filter --- */}
      <FilterSection title="Exterior Color" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {['Black', 'White', 'Silver', 'Gray', 'Red', 'Blue'].map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              isSelected={filters.color === color}
              onClick={() => handleRadioChange('color', color)}
            />
          ))}
        </div>
      </FilterSection>


      {/* --- Features Filter --- */}
      <FilterSection title="Features" defaultOpen={false}>
        <div className="space-y-3">
          {['Sunroof', 'Leather Seats', 'AWD', '3-Row Seating', 'Off-Road Suspension'].map((feature) => (
            <FilterCheckbox
              key={feature}
              id={`feature-${feature}`}
              label={feature}
              isChecked={filters.features?.includes(feature)}
              onChange={() => handleCheckboxChange('features', feature)}
            />
          ))}
        </div>
      </FilterSection>
     
    </aside>
  );
};


// --- Car Card Component ---
// (Person 1: Your Zone)
const CarCard = ({ car, estimatedPayment, onDetailsClick, onCompareToggle, onFavoriteToggle, isFavorited, isComparing }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-lg relative">
      {/* --- NEW: Favorite Button --- */}
      <button
        onClick={() => onFavoriteToggle(car.id)}
        className="absolute top-2 right-2 p-2 bg-white/70 rounded-full text-red-600 backdrop-blur-sm transition-transform hover:scale-110 z-10"
        aria-label="Favorite this car"
      >
        {isFavorited ? (
          <Heart size={20} fill="currentColor" />
        ) : (
          <Heart size={20} />
        )}
      </button>
     
      <img
        src={car.image}
        alt={`${car.year} ${car.model} ${car.trim}`}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => onDetailsClick(car)}
      />
      <div className="p-4">
        <h3
          className="text-lg font-bold cursor-pointer hover:text-red-600"
          onClick={() => onDetailsClick(car)}
        >
          {`${car.year} ${car.model}`}
        </h3>
        <p className="text-gray-600">{car.trim}</p>
       
        {/* --- NEW: Payment Display --- */}
        <div className="flex items-end gap-2 my-2">
            <span className="text-xl font-extrabold text-black">${car.price.toLocaleString()}</span>
            {estimatedPayment && (
                <span className="text-red-600 font-bold">
                    ~${estimatedPayment}/mo
                </span>
            )}
        </div>
       
        <div className="text-sm text-gray-500 space-x-3">
          <span>{car.bodyType}</span>
          <span>&bull;</span>
          <span>{car.fuelType === 'Electric' ? `${car.mpg} eMPG` : `${car.mpg} MPG`}</span>
          <span>&bull;</span>
          <span>{car.drivetrain}</span>
        </div>
      </div>
      {/* --- NEW: Compare Button --- */}
      <div className="p-4 border-t bg-gray-50">
          <FilterButton
            label={isComparing ? "Remove from Compare" : "Compare"}
            isSelected={isComparing}
            onClick={() => onCompareToggle(car.id)}
          />
      </div>
    </div>
  );
};


// --- NEW: Details Modal (with Finance Calculator) ---
// (This is now just a details modal, the main calculator is in the sidebar)
const DetailsModal = ({ car, onClose, onFindDealers }) => {
  if (!car) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">{`${car.year} ${car.model} ${car.trim}`}</h2>
          <button onClick={onClose}><XCircle size={28} className="text-gray-500 hover:text-red-600" /></button>
        </div>
       
        <img src={car.image} alt={car.model} className="w-full h-64 object-cover" />
       
        <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-sm text-gray-500">Price</span>
                    <p className="font-bold text-lg">${car.price.toLocaleString()}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">Body Type</span>
                    <p className="font-bold text-lg">{car.bodyType}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">MPG</span>
                    <p className="font-bold text-lg">{car.mpg} {car.fuelType === 'Electric' ? 'eMPG' : 'MPG'}</p>
                </div>
                 <div>
                    <span className="text-sm text-gray-500">Seating</span>
                    <p className="font-bold text-lg">{car.seatingCapacity} Seats</p>
                </div>
            </div>
           
            <h3 className="text-xl font-semibold mt-6 mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-700">
                {car.features.map(f => <li key={f}>{f}</li>)}
            </ul>


          <button
            onClick={onFindDealers}
            className="mt-6 w-full py-3 px-4 rounded-full bg-red-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-700"
          >
            <MapPin size={20} />
            Find Nearby Dealers
          </button>
        </div>
      </div>
    </div>
  );
};


// --- NEW: Compare Bar ---
// ... (code is identical to previous version) ...
const CompareBar = ({ carsToCompare, onClearCompare, onShowCompare }) => {
  if (carsToCompare.length === 0) return null;


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-30 flex justify-between items-center">
      <div className="flex -space-x-4">
        {carsToCompare.map(car => (
          <img
            key={car.id}
            src={car.image}
            alt={car.model}
            className="h-12 w-12 rounded-full border-2 border-white object-cover"
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onShowCompare}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700"
        >
          Compare ({carsToCompare.length})
        </button>
        <button onClick={onClearCompare} className="text-gray-400 hover:text-white">
          <XCircle size={24} />
        </button>
      </div>
    </div>
  );
};


// --- NEW: Compare Modal ---
// (Added new fields to compare)
const CompareModal = ({ cars, onClose }) => {
  if (cars.length === 0) return null;
 
  // Updated properties
  const properties = ['price', 'year', 'mileage', 'mpg', 'fuelType', 'drivetrain', 'seatingCapacity', 'features'];
  const labels = {
    price: 'Price',
    year: 'Year',
    mileage: 'Mileage',
    mpg: 'MPG',
    fuelType: 'Fuel Type',
    drivetrain: 'Drivetrain',
    seatingCapacity: 'Seating',
    features: 'Features'
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">Side-by-Side Comparison</h2>
          <button onClick={onClose}><XCircle size={28} className="text-gray-500 hover:text-red-600" /></button>
        </div>
       
        <div className="flex w-full overflow-x-auto">
          {/* Header Column */}
          <div className="w-1/4 p-4 border-r min-w-[150px]">
            <div className="h-32 mb-4"></div> {/* Spacer for image */}
            {properties.map(prop => (
              <div key={prop} className="h-16 font-bold text-gray-700 flex items-center">{labels[prop]}</div>
            ))}
          </div>


          {/* Car Columns */}
          {cars.map(car => (
            <div key={car.id} className="w-1/3 p-4 border-r min-w-[220px]">
              <img src={car.image} alt={car.model} className="w-full h-32 object-cover rounded-md mb-4" />
              <div className="h-16 flex items-center font-bold text-lg text-red-600">{car.model} {car.trim}</div>
              <div className="h-16 flex items-center">${car.price.toLocaleString()}</div>
              <div className="h-16 flex items-center">{car.year}</div>
              <div className="h-16 flex items-center">{car.mileage.toLocaleString()} miles</div>
              <div className="h-16 flex items-center">{car.mpg} {car.fuelType === 'Electric' ? 'eMPG' : 'MPG'}</div>
              <div className="h-16 flex items-center">{car.drivetrain}</div>
              <div className="h-16 flex items-center">{car.seatingCapacity} Seats</div>
              <div className="h-16 flex items-center text-sm">{car.features.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- NEW: Mock AI Chat Modal ---
// ... (code is identical to previous version) ...
const MockChatModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-40 flex justify-center items-center p-4">
    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-bold">Toyota AI Assistant</h2>
        <button onClick={onClose}><XCircle size={28} className="text-gray-500 hover:text-red-600" /></button>
      </div>
      <div className="p-6 space-y-4 overflow-y-auto">
        <div className="flex justify-start">
          <span className="p-3 bg-gray-200 rounded-lg">Hi! I'm your Toyota AI Assistant. How can I help you find the perfect car today?</span>
        </div>
        <div className="flex justify-end">
          <span className="p-3 bg-red-600 text-white rounded-lg">I'm looking for a fuel-efficient SUV.</span>
        </div>
        <div className="flex justify-start">
          <span className="p-3 bg-gray-200 rounded-lg">Great! Our most popular fuel-efficient SUV is the RAV4 Hybrid. It gets 40 MPG and has available AWD.</span>
        </div>
        <p className="text-center text-gray-500 text-sm py-4">Demo only. A real chatbot would be implemented here.</p>
      </div>
      <div className="p-4 border-t bg-gray-50">
        <input type="text" placeholder="Type your message..." className="w-full p-3 border border-gray-300 rounded-full" disabled />
      </div>
    </div>
  </div>
);


// --- NEW: Mock Dealers Modal ---
// ... (code is identical to previous version) ...
const MockDealersModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-40 flex justify-center items-center p-4">
    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-bold">Nearby Dealers</h2>
        <button onClick={onClose}><XCircle size={28} className="text-gray-500 hover:text-red-600" /></button>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-gray-600">Based on your location (Richardson, TX):</p>
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">Toyota of Richardson</h3>
          <p className="text-sm text-gray-600">1001 S US-75, Richardson, TX 75080</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">Toyota of Plano</h3>
          <p className="text-sm text-gray-600">6888 TX-121, Plano, TX 75024</p>
        </div>
        <p className="text-center text-gray-500 text-sm py-4">Demo only. A real app would use the Google Maps API.</p>
      </div>
    </div>
  </div>
);


// --- NEW: Helper function for payment calculation ---
const calculateMonthlyPayment = (price, downPayment, creditScore) => {
    // 1. Get Interest Rate (Mocked based on credit score)
    let rate = 0.10; // 10.0% (Building: 600-659)
    if (creditScore >= 800) rate = 0.052; // 5.2% (Excellent: 800+)
    else if (creditScore >= 740) rate = 0.061; // 6.1% (Great: 740-799)
    else if (creditScore >= 660) rate = 0.078; // 7.8% (Good: 660-739)
   
    const term = 72; // 72 months (6 years)
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 12;


    if (loanAmount <= 0) return 0;
   
    const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return payment.toFixed(0); // Round to nearest dollar
};




// --- Main App Component ---
export default function App() {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  // --- NEW: State for new features ---
  const [selectedCar, setSelectedCar] = useState(null); // For Details Modal
  const [compareList, setCompareList] = useState([]); // Array of car IDs
  const [favoritesList, setFavoritesList] = useState([]); // Array of car IDs
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showDealersModal, setShowDealersModal] = useState(false);
 
  // --- NEW: State for Payment Estimator ---
  const [paymentInputs, setPaymentInputs] = useState({
    creditScore: 740,
    downPayment: 5000
  });
 
  // --- NEW: State for Sorting ---
  const [sortBy, setSortBy] = useState('recommended');


  // --- NEW: Sync Favorites with localStorage ---
  // ... (code is identical to previous version) ...
  useEffect(() => {
    // Load favorites from localStorage on mount
    const storedFavorites = localStorage.getItem('toyotaFavorites');
    if (storedFavorites) {
      setFavoritesList(JSON.parse(storedFavorites));
    }
  }, []);


  useEffect(() => {
    // Save favorites to localStorage when they change
    localStorage.setItem('toyotaFavorites', JSON.stringify(favoritesList));
  }, [favoritesList]);




  // --- (Person 3: Your Zone) ---
 
  // --- NEW: Step 1: Calculate payments for all cars ---
  // This runs when the database or payment inputs change
  const carsWithPayments = useMemo(() => {
      const { creditScore, downPayment } = paymentInputs;
      return DB_CARS.map(car => ({
          ...car,
          estimatedPayment: calculateMonthlyPayment(car.price, downPayment, creditScore)
      }));
  }, [paymentInputs]);


  // --- NEW: Step 2: Filter the cars that now have payments ---
  // This runs when filters, search, or the car list changes
  const filteredCars = useMemo(() => {
    let cars = carsWithPayments; // Use the new list with payments


    // Search Term Filter
    if (searchTerm) {
      cars = cars.filter((car) =>
        `${car.year} ${car.model} ${car.trim}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }


    // --- NEW: Favorites Filter ---
    if (filters.showFavorites) {
      cars = cars.filter(car => favoritesList.includes(car.id));
    }


    // --- Filter Logic ---
   
    // Price Filter
    if (filters.price) {
      if (filters.price === 25000) {
        cars = cars.filter((car) => car.price < 25000);
      } else if (filters.price === 35000) {
        cars = cars.filter((car) => car.price >= 25000 && car.price < 35000);
      } else if (filters.price === 45000) {
        cars = cars.filter((car) => car.price >= 35000 && car.price < 45000);
      } else if (filters.price === 45001) {
        cars = cars.filter((car) => car.price >= 45000);
      }
    }
   
    // --- NEW FILTERS ---
    if (filters.yearMin) {
        cars = cars.filter(car => car.year >= parseInt(filters.yearMin));
    }
    if (filters.yearMax) {
        cars = cars.filter(car => car.year <= parseInt(filters.yearMax));
    }
    if (filters.mileageMax) {
        cars = cars.filter(car => car.mileage <= parseInt(filters.mileageMax));
    }
    if (filters.mpgMin) {
        cars = cars.filter(car => car.mpg >= parseInt(filters.mpgMin));
    }
    if (filters.seatingCapacity) {
        cars = cars.filter(car => car.seatingCapacity >= parseInt(filters.seatingCapacity));
    }
    if (filters.color) {
        cars = cars.filter(car => car.color === filters.color);
    }
    // --- END NEW FILTERS ---


    // Body Type Filter
    if (filters.bodyType && filters.bodyType.length > 0) {
      cars = cars.filter((car) => filters.bodyType.includes(car.bodyType));
    }


    // Fuel Type Filter
    if (filters.fuelType && filters.fuelType.length > 0) {
      cars = cars.filter((car) => filters.fuelType.includes(car.fuelType));
    }
   
    // Features Filter
    if (filters.features && filters.features.length > 0) {
      cars = cars.filter((car) =>
        filters.features.every((feature) => car.features.includes(feature))
      );
    }
   
    // --- NEW: Sorting Logic ---
    if (sortBy === 'price-low') {
      cars.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      cars.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'mpg-high') {
      cars.sort((a, b) => b.mpg - a.mpg);
    }
    // 'recommended' sorting is just the default order


    return cars;
  }, [filters, searchTerm, favoritesList, carsWithPayments, sortBy]); // Updated dependencies


  // --- State Handlers ---
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
 
  // --- NEW: Payment Input Handler ---
  const handlePaymentChange = (key, value) => {
      setPaymentInputs(prev => ({
          ...prev,
          [key]: value
      }));
  };


  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm('');
    // Don't clear payment inputs, as user might want to keep those
  };
 
  // --- NEW: Handlers for new features ---
  // ... (code is identical to previous version) ...
  const handleFavoriteToggle = (carId) => {
    setFavoritesList((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };
 
  const handleCompareToggle = (carId) => {
    setCompareList((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length < 3) {
        return [...prev, carId];
      }
      // If already 3, alert user (or just don't add)
      alert("You can only compare 3 cars at a time.");
      return prev;
    });
  };
 
  const handleClearCompare = () => {
    setCompareList([]);
  };


  const handleShowDetails = (car) => {
    setSelectedCar(car);
  };


  const handleCloseModals = () => {
    setSelectedCar(null);
    setShowCompareModal(false);
    setShowChatModal(false);
    setShowDealersModal(false);
  };
 


  // --- (Person 1: Your Zone) ---
  // This is the main JSX (HTML) for the app
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* --- Header --- */}
      {/* ... (code is identical to previous version) ... */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Toyota Logo */}
          <svg className="h-6" viewBox="0 0 256 195" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M73.492 194.22H3.772v-51.36h34.68v35.04h35.04v16.32zM128 177.9H78.32v-62.88H43.28V79.98h35.04V17.1h50.04v62.88h35.04v35.04h-35.04v62.88zm-33.6-84.24h83.52V33.42H94.4v60.24zM182.508 194.22v-16.32h35.04v-35.04h34.68v51.36h-69.72z" fill="#EB0A1E"/>
              <path d="M128 72.847c23.083 0 41.792-18.709 41.792-41.792C169.792 8.972 151.083-2.833 128-2.833c-23.083 0-41.792 11.805-41.792 41.792 0 23.083 18.709 41.792 41.792 41.792zm0-67.26c14.072 0 25.472 11.4 25.472 25.472 0 14.072-11.4 25.472-25.472 25.472-14.072 0-25.472-11.4-25.472-25.472 0-14.072 11.4-25.472 25.472-25.472zM128 72.847c-50.625 0-91.5-40.875-91.5-91.5 0 0 0-2.833 0-2.833-20.25 12.083-34.5 34.083-34.5 59.916 0 35.167 28.5 63.667 63.667 63.667 15.667 0 29.917-5.583 41.25-14.833 11.333 9.25 25.583 14.833 41.25 14.833 35.167 0 63.667-28.5 63.667-63.667 0-25.833-14.25-47.833-34.5-59.916.083.916.083 1.916.083 2.833 0 50.625-40.875 91.5-91.5 91.5z" fill="#EB0A1E"/>
          </svg>
          <div className="font-semibold text-xl hidden sm:block">Vehicle Finder</div>
          {/* --- NEW: AI Chat Button --- */}
          <button
            onClick={() => setShowChatModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200"
          >
            <MessageSquare size={16} className="text-red-600" />
            AI Assistant
          </button>
          <div className="md:hidden">
            <button onClick={() => setIsSidebarOpen(true)}>
              <SlidersHorizontal size={24} />
            </button>
          </div>
        </nav>
      </header>


      {/* --- Main Body --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row py-8">
         
          {/* --- Mobile Sidebar (Modal) --- */}
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
          )}
          <div className={`fixed top-0 left-0 w-11/12 h-full bg-white z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:hidden overflow-y-auto`}>
            <div className="p-6">
              <Sidebar
                filters={filters}
                paymentInputs={paymentInputs}
                onFilterChange={handleFilterChange}
                onPaymentChange={handlePaymentChange}
                onClearFilters={handleClearFilters}
              />
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-gray-600">
              <X size={24} />
            </button>
          </div>
         
          {/* --- Desktop Sidebar (Static) --- */}
          <div className="hidden md:block md:w-1/3 lg:w-1/4 p-6 bg-white border-r border-gray-200 self-start sticky top-16">
            <Sidebar
              filters={filters}
              paymentInputs={paymentInputs}
              onFilterChange={handleFilterChange}
              onPaymentChange={handlePaymentChange}
              onClearFilters={handleClearFilters}
            />
          </div>


          {/* --- Main Content (Results) --- */}
          <main className="w-full md:w-2/3 lg:w-3/4 md:pl-8">
            {/* Search Bar */}
            {/* ... (code is identical to previous version) ... */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search model, or keyword (e.g., Camry)"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
            </div>


            {/* Results Header */}
            {/* ... (code is identical to previous version) ... */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-bold">{filteredCars.length}</span> of <span className="font-bold">{DB_CARS.length}</span> results
              </div>
              {/* --- UPDATED: Sorting Dropdown --- */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-gray-300 py-2 px-4 text-sm font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low">Sort by: Price (Low to High)</option>
                <option value="price-high">Sort by: Price (High to Low)</option>
                <option value="mpg-high">Sort by: MPG (High to Low)</option>
              </select>
            </div>
           
            {/* Car Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  estimatedPayment={car.estimatedPayment} // Pass calculated payment
                  onDetailsClick={handleShowDetails}
                  onCompareToggle={handleCompareToggle}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorited={favoritesList.includes(car.id)}
                  isComparing={compareList.includes(car.id)}
                />
              ))}
            </div>
           
            {filteredCars.length === 0 && (
                // ... (code is identical to previous version) ...
                <div className="text-center py-20">
                    <h3 className="text-2xl font-semibold">No Matching Vehicles</h3>
                    <p className="text-gray-600 mt-2">Try adjusting your filters or search term.</p>
                    <button
                        onClick={handleClearFilters}
                        className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
           
          </main>
        </div>
      </div>
     
      {/* --- NEW: Modals & Bars --- */}
     
      {/* --- Compare Bar --- */}
      <CompareBar
        carsToCompare={compareList.map(id => DB_CARS.find(car => car.id === id))}
        onClearCompare={handleClearCompare}
        onShowCompare={() => setShowCompareModal(true)}
      />
     
      {/* --- Details Modal --- */}
      {selectedCar && (
        <DetailsModal
          car={selectedCar}
          onClose={handleCloseModals}
          onFindDealers={() => setShowDealersModal(true)}
        />
      )}
     
      {/* --- Compare Modal --- */}
      {showCompareModal && (
        <CompareModal
          cars={compareList.map(id => DB_CARS.find(car => car.id === id))}
          onClose={handleCloseModals}
        />
      )}
     
      {/* --- Mock Modals --- */}
      {showChatModal && <MockChatModal onClose={handleCloseModals} />}
      {showDealersModal && <MockDealersModal onClose={handleCloseModals} />}
     
    </div>
  );
}

