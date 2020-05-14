class App {
  constructor(displayData, formData, unitData, radiusData, periodData, city, lon, lat) {
    this.displayData = displayData
    this.formData = formData
    this.unitData = unitData
    this.radiusData = radiusData
    this.periodData = periodData
    this.city = city
    this.lat = lat
    this.lon = lon
    this.displayAll = this.displayAll.bind(this)
    this.getWeatherData = this.getWeatherData.bind(this)
    this.getGeoData = this.getGeoData.bind(this)
    this.getPixabayData = this.getPixabayData.bind(this)
    this.handleWeatherDataError = this.handleWeatherDataError.bind(this)
    this.handleWeatherDataSuccess = this.handleWeatherDataSuccess.bind(this)
    this.handleGeoDataError = this.handleGeoDataError.bind(this)
    this.handleGeoDataSuccess = this.handleGeoDataSuccess.bind(this)
    this.handlePixabayDataError = this.handlePixabayDataError.bind(this)
    this.handlePixabayDataSuccess = this.handlePixabayDataSuccess.bind(this)
  }

  handleWeatherDataError(error) {
    console.error(error)
    this.displayData.clearAllFields()
    this.displayData.displayWeatherData(null, null)
  }

  handleWeatherDataSuccess(data) {
    weatherResultArray = data

    this.lon = weatherResultArray.coord.lon
    this.lat = weatherResultArray.coord.lat
    this.weather = weatherResultArray.weather[0].main
    this.getPixabayData(this.weather, this.city)
  }

  handleGeoDataError(error) {
    console.error(error)
  }

  handleGeoDataSuccess(data) {
    geoResultArray = data
    this.displayAll()
  }

  handlePixabayDataError(error) {
    console.error(error)
  }

  handlePixabayDataSuccess(data) {
    pixabayResultArray = data

    this.getGeoData(this.lon, this.lat)
  }

  displayAll() {
    this.displayData.clearAllFields()
    this.displayData.displayCityName(weatherResultArray)
    this.displayData.displayWeatherData(weatherResultArray, this.unitData)
    this.displayData.displayGeoData(geoResultArray)
    this.displayData.displayPixabayImage(pixabayResultArray)
  }

  getAllData(cityName) {
    this.getWeatherData(cityName)
  }

  getPixabayData(query1, query2) {
    var url = 'https://pixabay.com/api/'
    var apiKey = PIXABAY_API_KEY
    var q = '&q=' + query2
    $.ajax({
      method: 'GET',
      url: url + '?key=' + apiKey + q + '&image_type=photo',
      success: this.handlePixabayDataSuccess,
      error: this.handlePixabayDataError
    })
  }

  getWeatherData(cityName) {
    var url = 'https://api.openweathermap.org/data/2.5/'
    var path = 'weather?q='
    var apiKey = OPEN_WEATHER_API_KEY
    $.ajax({
      method: 'GET',
      url: url + path + cityName + '&appid=' + apiKey + '&units=' + this.unitData,
      success: this.handleWeatherDataSuccess,
      error: this.handleWeatherDataError
    })
  }

  getGeoData(lon, lat) {
    var url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'
    var lat = '&latitude=' + lat
    var lon = '&longitude=' + lon
    var radius = '&maxradiuskm=' + this.radiusData
    var startDate = new Date(new Date().getTime() - (this.periodData * 24 * 60 * 60 * 1000))
    var endDate = new Date()
    var startTime = '&starttime=' + this.convertDate(startDate)
    var endTime = '&endtime=' + this.convertDate(endDate)
    var limit = '&limit=' + 10
    var appID = GEOSERVICE_APP_ID
    var appKey = GEOSERVICE_API_KEY
    $.ajax({
      method: 'GET',
      url: url + lat + lon + radius + startTime + endTime + limit,
      success: this.handleGeoDataSuccess,
      error: this.handleGeoDataError
    })
  }

  addZero(num) {
    return num < 10 ? "0" + num : num.toString()
  }

  convertDate(date) {
    var year = this.addZero(date.getFullYear())
    var month = this.addZero(date.getMonth() + 1)
    var day = this.addZero(date.getDate())

    return year + month + day
  }

  start(cityInput, unitData, radiusData, periodData) {
    this.city = cityInput
    this.unitData = unitData
    this.radiusData = radiusData
    this.periodData = periodData
    this.getAllData(cityInput)
  }
}
