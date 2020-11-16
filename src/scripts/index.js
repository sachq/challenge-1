// Custom Styles for the app
import '../styles/main.scss';

// Material Design Components
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon';

// Restaurant Plugin
import { Restaurant } from './restaurant';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

// Instiantiate the Restaurant Class
const restaurant = new Restaurant({});
restaurant.init();