# City-scape

> - Maintained by: `Heegu Park`


## Functionality Overview
1. With a city name query, if brings weather data, earthquake data, and city-related images.
    - Weather data from Open Weather API(https://openweathermap.org/api)
    - Earthquake data from USGS API(https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
    - Images from Pixabay API(https://pixabay.com/api/docs/)
    - Autocomplete of city name via Google Maps API(https://developers.google.com/maps/documentation/javascript/tutorial)
2. Different query condition for searching weather data and earthquake data
    - Weather data: Celsius, Fahrenheit, Kelvin
    - Earthquake data: Radius(100km, 200km, 300km, 400km, 500km, 600km), Period(100 days,  200 days, 300 days, 400 days, 500 days, 600 days) 
3. Used jQuery to call API to retrieve the data for the application
4. Used Bootstrap for grid layout and basic UI
5. This dynamically creates the data board using DOM upon the data receiving from APIs
6. It has carousel function to view more data of earthquake data and image data
7. Support most of mobile devices(iPad - Landsacpe/Portrait, iPhone X - Landsacpe/Portrait, iPhone 6s/7s/8s - Landsacpe/Portrait, iPhone 6/7/8 - Landsacpe/Portrait, and so on)

## Planned Features
1. Requesting data from more than two APIs(Weather data, Earthquake data) and display those data to the document
2. Dynamically creating the data board
3. Mobile responsibility - iPhone 6/7/8 - Landscape/Portrait, iPad - Landscape/Portrait

## Lessons Learned
1. Various ways of calling public APIs using Ajax and dynamically display received data using JS DOM functions
2. Experienced to deal with various kinds of data received from several APIs
3. Experienced to effectively use jQuery and Bootstrap
4. JavaScript Object Oriented Programming for better functionalities and to increase the re-usage of codes
5. Experienced from the very beginning to complete product - Planning, Development, Implementation, Deployment, Publishing
6. Went through possible error by requesting API calls such as CORS, Google API policy, or https/http call

## Live Site
* You can see and test the live version here: <a href="https://city.heegu.net" target="blank">city.heegu.net</a>

## Screen shot
[Desktop - Chrome browser]

![City-scape](https://github.com/heegupark/city-scape/blob/master/city-ss-001.gif)

[iPhone 6/7/8 - Portrait]

![City-scape](https://github.com/heegupark/city-scape/blob/master/city-ss-002.gif)

[iPhone 6/7/8 - Landscape]

![City-scape](https://github.com/heegupark/city-scape/blob/master/city-ss-003.gif)
