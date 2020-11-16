# Restaurant Tracker
A Javascript application to track restaurant based on location specifically Outcode (postal code).

## Setup
Install all the necessary dependencies
```
$ npm install
```

## Running the Web App
The app runs on webpack dev server
```
$ npm start
```

## Note
* Used starter pack **[Webpack App Starter](https://github.com/wbkd/webpack-starter)** <br/>
* Used Material components to make the page look more snazzy. Components used are:
  * Text field
  * Button
* Geolocation is not fully integrated into the app; right now, it will ask for user consent and display the coordinates in the console. There are two good approaches to implement it:
  * By calculating the distance between the user and restaurant using the geo-coordinates: https://www.geodatasource.com/developers/javascript
  * or By using Google Maps API (geocoding) to get `postal_code` of the location and filtering through our Restaurant Data.
