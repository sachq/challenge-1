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

    // Select all required Elements
    this.searchBtn = document.getElementById(options.searchBtn || 'search');
    this.clearBtn = document.getElementById(options.clearBtn || 'clear-btn');
    this.searchField = document.getElementById(options.searchField || 'search-box');
    this.resultsContainer = document.getElementById(options.containerEl || 'results');
  }

  init() {
    this.initializeEvents();
    this.showRestaurants(this.openRestaurants);
  }

  /**
   * Initialize all Event Listeners
   */
  initializeEvents() {
    // Get value of Search field on click event
    this.searchBtn.addEventListener(
      'click', () => this.searchRestaurants(this.searchField.mdcFoundation.getNativeInput_().value)
    );

    // Get value of Search field on keyup event (when user types) (eg. EC1Y 8JL)
    this.searchField.addEventListener('keyup', e => {
      if (e.key === "Enter")
        this.searchRestaurants(this.searchField.mdcFoundation.getNativeInput_().value);
    });

    // Clear Search & Reset
    this.clearBtn.addEventListener('click', e => {
      this.searchField.mdcFoundation.getNativeInput_().value = '';
      this.searchRestaurants('');
    });
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
   * Search Restaurants
   * Match Restaurant Postcode
   * @param searchTerm
   */  
  searchRestaurants(searchTerm) {
    const openRestaurants = this.openRestaurants.filter(restaurant => 
      new RegExp(searchTerm.toLowerCase(), 'i')
        .test(`${restaurant.postcode}`)
    );
    this.showRestaurants(openRestaurants);
  }

  /**
   * Search Item Template
   * @param restaurant Open Restaurant Object
   * @returns Item Tempate
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
          <div class="status">
            <div class="icon ${(restaurant.isDelivery) ? 'yes' : 'no'}"></div> ${restaurant.isDelivery ? 'Delivery' : 'No Delivery'}
          </div>
        </div>
      </div>
    </div>
  `;

  /**
   * Generate Material Icon Component 
   * for Generating Star
   * @param rating Restaurant Rating
   */
  ratingGenerator(rating) {

  }
}