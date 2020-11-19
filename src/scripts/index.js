// Custom Styles for the app
import '../styles/main.scss';

// Favicon
import '../images/favicon.ico';

// Material Design Components
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon';

// Restaurant Data
import RestaurantData from '../_data/restaurant-data.json';

// Restaurant Plugin
import { Restaurant } from './restaurant';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

// Instiantiate the Restaurant Class 
// call the static `init` method
new Restaurant({ data: RestaurantData, }).init();