const RESTAURANT_DATA = require('../_data/restaurant-data.json');

export class Restaurant {
  constructor(options) {
    this.openRestaurants = RESTAURANT_DATA.OpenRestaurants.map(restaurant => {
      return {
        name: restaurant.Name,
        address: `${restaurant.Address.FirstLine}, ${restaurant.Address.City}`,
        postcode: restaurant.Address.Postcode,
        geo: {
          lat: restaurant.Address.Latitude,
          lng: restaurant.Address.Longitude
        },
        logoUrl: restaurant.LogoUrl,
        cuisines: restaurant.Cuisines.map(c => c.Name).join(', '),
        rating: restaurant.RatingDetails.StarRating,
        isDelivery: restaurant.IsDelivery
      };
    });
    this.searchBtn = document.getElementById(options.searchBtn);
    this.searchField = document.getElementById(options.searchField);
    this.resultsContainer = document.getElementById(options.containerEl);
  }

  init() {
    this.initializeEvents();
    this.showRestaurants(this.openRestaurants);
  }

  /**
   * Render Restuarants to the Page
   * @param {*} restaurants 
   */
  showRestaurants(restaurants) {
    const restaurantsMap = restaurants.map(restaurant => this.generateTemplate(restaurant));
    this.resultsContainer.innerHTML = restaurantsMap.join('');
  }

  /**
   * Initialize all Event Listeners
   */
  initializeEvents() {
    // this.searchField.mdcFoundation
    this.searchBtn.addEventListener('click', () => {
      console.log(this.searchField.mdcFoundation.getNativeInput_().value);
    });
  }

  /**
   * Search Restaurants based on 
   * the Outcode (Postcode)
   */  
  searchRestaurants() {

  }

  /**
   * Search Item Template
   * @param restaurant Open Restaurant Object
   */
  generateTemplate = (restaurant) => `
      <div class="item">
        <div class="restaurant-img">
          <img src="${restaurant.logoUrl}" alt="${restaurant.name}"/>
        </div>
        <div class="item-details">
          <div class="name">${restaurant.name}</div>
          <div class="address">${restaurant.address} <strong>${restaurant.postcode}</strong></div>
          <div class="restaurant-info">
            <div class="detail">
              <div class="info"><strong>Ratings</strong> <span class="value">${restaurant.rating}</span></div>
              <div class="info"><strong>Cuisines</strong> <span class="value">${restaurant.cuisines}</span></div>
            </div>
            <div class="status"><div class="icon yes"></div> Delivery</div>
          </div>
        </div>
      </div>
    `;
}