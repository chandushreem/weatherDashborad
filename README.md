# Weather Observatory

A premium weather dashboard that helps you see the weather differently. Built with React and Vite, featuring real-time weather data from Open-Meteo APIs.

## Features

- **Current Weather**: Display temperature, feels-like temperature, humidity, wind speed/direction, visibility, and UV index
- **City Search**: Search for any city worldwide using Open-Meteo geocoding API
- **Hourly Forecast**: View the next 24 hours of weather predictions
- **7-Day Forecast**: See weekly weather predictions with high/low temperatures
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Responsive Design**: Fully responsive interface optimized for mobile, tablet, and desktop
- **Premium UI**: Deep navy backgrounds, atmospheric gradients, glass effects, and elegant typography

## Technologies Used

- **React 19.2.8** - UI library
- **Vite 8.3.0** - Build tool and dev server
- **Open-Meteo APIs** - Free weather data (no API key required)
  - Geocoding API for city search
  - Forecast API for weather data

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Production Build

Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## Open-Meteo API Information

This project uses Open-Meteo free APIs:

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`
  - Used for searching cities and getting coordinates
  - No API key required

- **Forecast API**: `https://api.open-meteo.com/v1/forecast`
  - Provides current weather, hourly forecast, and daily forecast
  - No API key required
  - Includes temperature, humidity, wind, visibility, UV index, and weather codes

## Deployment to Vercel

### Option 1: Import via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure the following settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy"

### Option 2: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

Follow the prompts to configure your project.

## Known Limitations

- Weather data refresh requires manual city re-selection or page reload
- No saved locations feature
- No severe weather alerts
- Temperature trend visualization is not implemented
- Limited to 7-day forecast
- No historical weather data

## Future Improvements

- Add saved/favorite locations
- Implement severe weather alerts
- Add temperature trend charts
- Support for multiple weather data sources
- Dark/light theme toggle
- Weather maps integration
- Historical weather data view

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please open an issue on the GitHub repository.
