function Restaurant(options) {

  let self = this;

  this.options = options;

  // All of the Restaurant Data
  if (!options.data) {
    throw new Error('Data not provided');
  }
  const restaurantData = options.data;

  // Required fields for selection
  const searchField = document.getElementById(options.searchField || 'search-box');
  const searchBtn = document.getElementById(options.searchBtn || 'search');
  const clearBtn = document.getElementById(options.clearBtn || 'clear-btn');

  // Field required to render Result Items
  const resultsContainer = document.getElementById(options.containerEl || 'results');

  /**
   * Initialize the Application
   * by initializing events listeners 
   * and show all restaurants.
   */
  this.init = function() {
    initializeEvents(); // Initialize All Events (Handlers)
    showRestaurants(this.restaurants); // Show All Restaurants
  };


  /**
   * Initialize all Event Listeners
   * 'Search Button Click, Search after pressing Enter
   * and for Clear button which resets results and Search'
   */
  let initializeEvents = function() {
    // Get value of Search field on keyup event (when user types) (eg. EC1Y 8JL)
    searchField.addEventListener('keyup', e => {
      if (e.key === "Enter")
        searchRestaurants(searchField.mdcFoundation.getNativeInput_().value);
    });

    // Clear Search & Reset
    clearBtn.addEventListener('click', e => {
      searchField.mdcFoundation.getNativeInput_().value = '';
      searchRestaurants('');
    });

    // Get value of Search field on click event
    searchBtn.addEventListener(
      'click', () => searchRestaurants(searchField.mdcFoundation.getNativeInput_().value)
    );
  };

  /**
   * Search Restaurants (Fuzzy Match String)
   * Match Restaurant Postcode
   * @param searchTerm
   */  
  let searchRestaurants = function(searchTerm) {
    const openRestaurants = self.restaurants.filter(restaurant => 
      new RegExp(searchTerm.toLowerCase(), 'i')
        .test(`${restaurant.postcode.split(' ').join('')}`)
    );
    // Show based on search term
    showRestaurants(openRestaurants);
  };


  /**
   * Render Restuarants to the Page
   * @param {*} restaurants 
   */
  let showRestaurants = function(restaurants) {
    if (restaurants.length) {
      resultsContainer.innerHTML = `
        <div class="total-restaurants">
          <strong>${restaurants.length}</strong>
          Restaurant(s)
        </div>`;
      const restaurantsMap = restaurants.map(restaurant => generateTemplate(restaurant));
      resultsContainer.innerHTML += restaurantsMap.join('');
    } else {
      resultsContainer.innerHTML = `
        <div id="no-match">No Matching Restaurants with Postcode 
          <strong><em>'${searchField.mdcFoundation.getNativeInput_().value}'</em></strong>
        </div>
      `;
    }
  };


  /**
   * Search Item Template
   * @param restaurant Open Restaurant Object
   * @returns Item Tempate
   */
  let generateTemplate = (restaurant) => `
    <div class="item">
      <div class="restaurant-img">
        <img src="${restaurant.logoUrl}" alt="${restaurant.name}"/>
      </div>
      <div class="item-details">
        <div class="name">${restaurant.name}</div>
        <div class="address">${restaurant.address} <strong>${restaurant.postcode}</strong></div>
        <div class="restaurant-info">
          <div class="detail">
            <div class="info"><strong>Ratings</strong> <span class="value">${ratingGenerator(restaurant.rating)}</span></div>
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
   * Generate Material Icon template for
   * generating star based on it's rating
   * @param rating Restaurant Rating
   */
  let ratingGenerator = function(rating) {
    if (!rating) return '-';
    let ratingTemplate = '';
    for (let i = 0; i < parseInt(rating); i++) {
      ratingTemplate += '<mwc-icon class="star">star</mwc-icon>';
    }
    if (parseInt(rating) !== rating) ratingTemplate += '<mwc-icon class="star">star_half</mwc-icon>';
    return ratingTemplate;
  };


  /**
   * Getter Method to get all open restaurants
   */
  Object.defineProperty(this, 'restaurants', {
    get: function() {
      let openRestaurants = restaurantData.OpenRestaurants.map(restaurant => {
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
      }).sort((a, b) => b.rating - a.rating);
      
      return openRestaurants;
    }
  });
}

export { Restaurant };