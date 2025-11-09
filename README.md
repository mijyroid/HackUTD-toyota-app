# Car Finder - Toyota Vehicle Finder

A modern, interactive web application for browsing and finding Toyota vehicles. This application provides a comprehensive vehicle search experience with advanced filtering, comparison tools, and payment estimation features.

## Features

### 🔍 Search & Filter
- **Advanced Search**: Search vehicles by model, trim, or keywords
- **Comprehensive Filters**:
  - Price range
  - Year and mileage
  - Body type (SUV, Sedan, Truck, Minivan)
  - Fuel type (Gas, Hybrid, Electric)
  - MPG requirements
  - Seating capacity
  - Exterior color
  - Features (Sunroof, Leather Seats, AWD, etc.)

### 💰 Payment Estimator
- Calculate estimated monthly payments based on:
  - Vehicle price
  - Down payment
  - Credit score (affects interest rate)
- Real-time payment calculations displayed on vehicle cards

### ⭐ Favorites & Comparison
- **My Garage**: Save favorite vehicles for quick access
- **Compare Vehicles**: Side-by-side comparison of up to 3 vehicles
- Persistent favorites saved to localStorage

### 🎯 Additional Features
- **AI Assistant**: Interactive chatbot for vehicle recommendations (demo)
- **Find Dealers**: Locate nearby Toyota dealerships (demo)
- **Sorting Options**: Sort by price, MPG, or recommended
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technologies

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **ESLint** - Code linting

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
car-finder/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
└── vite.config.js      # Vite configuration
```

## Features in Detail

### Filter System
The application includes a comprehensive filter sidebar that allows users to narrow down vehicle searches by multiple criteria. Filters can be combined for precise results.

### Payment Calculator
The payment estimator uses credit score-based interest rates to calculate realistic monthly payment estimates, helping users understand the financial commitment of each vehicle.

### Comparison Tool
Users can select up to 3 vehicles to compare side-by-side, viewing key specifications like price, year, mileage, MPG, drivetrain, seating capacity, and features in a single view.
