# City-evrything

> - Maintained by: `Heegu Park`


## Functionality Overview
1. With a city name query, if brings weather data, earthquake data, and city-related images.
    - Weather data from Open Weather API(https://openweathermap.org/api)
    - Earthquake data from USGS API(https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
    - Images from Pixabay API(https://pixabay.com/api/docs/)
2. Different query condition for searching weather data and earthquake data
    - Weather data: Celsius, Fahrenheit, Kelvin
    - Earthquake data: Radius(100km, 200km, 300km, 400km, 500km, 600km), Period(100 days,  200 days, 300 days, 400 days, 500 days, 600 days) 
3. This dynamically creates the data board using DOM upon the data receiving from APIs
4. It has carousel function to view more data of earthquake data and image data
5. Support most of mobile devices(iPad - Landsacpe/Portrait, iPhone X - Landsacpe/Portrait, iPhone 6s/7s/8s - Landsacpe/Portrait, iPhone 6/7/8 - Landsacpe/Portrait, and so on)

## Planned Features
1. Request data from two APIs(Weather data, Earthquake data) and display those data to the document
2. Dynamically create the data board
3. Mobile responsibility - iPhone 6/7/8 - Landscape/Portrait, iPad - Landscape/Portrait

## Lessons Learned
1. Various ways of calling public APIs using Ajax and dynamically display received data using JS DOM functions
2. Experienced to deal with various kinds of data received from several APIs
2. JavaScript Object Oriented Programming for better functionalities and to increase the re-usage of codes
3. Experience from the very beginning to complete product - Planning, Development, Implementation, Deployment, Publishing

## Live Site
* You can see and test the live version here: <a href="https://city.heegu.net" target="blank">city.heegu.net</a>

## Screen shot
[Desktop - Chrome browser]

![Artistic Flower Memory Match](https://github.com/heegupark/memory_match/blob/master/omm-ss-001.gif)

[iPhone 6/7/8 - Portrait]

![Artistic Flower Memory Match](https://github.com/heegupark/memory_match/blob/master/omm-ss-002.gif)

[iPhone 6/7/8 - Landscape]

![Artistic Flower Memory Match](https://github.com/heegupark/memory_match/blob/master/omm-ss-003.gif)
