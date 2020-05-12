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
    var apiKey = '13390108-bda3baa35dd70ef6d86c74840'
    var q = '&q=' + query2
    $.ajax({
      method: 'GET',
      url: url + '?key=' + apiKey + q + '&image_type=photo',
      success: this.handlePixabayDataSuccess,
      error: this.handlePixabayDataError
    })
  }

  getWeatherData(cityName) {
    var url = 'http://api.openweathermap.org/data/2.5/'
    var path = 'weather?q='
    var apiKey = '04f4c3b048013ee766a8bfee23cb8ea0'
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
    var appID = 'b534716a'
    var appKey = '13140920cddf63a34f1865f5ee32d47d'
    $.ajax({
      method: 'GET',
      url: url + lat + lon + radius + startTime + endTime + limit,
      success: this.handleGeoDataSuccess,
      error: this.handleGeoDataError
    })
  }

  getOSMData(cityName) {
    var url = 'https://api.openstreetmap.org/'
    var path ='/api/0.6/'
    var radius = '&maxradiuskm=' + this.radiusData
    var startDate = new Date(new Date().getTime() - (this.periodData * 24 * 60 * 60 * 1000))
    var endDate = new Date()
    var startTime = '&starttime=' + this.convertDate(startDate)
    var endTime = '&endtime=' + this.convertDate(endDate)
    var limit = '&limit=' + 10
    var appID = 'b534716a'
    var appKey = '13140920cddf63a34f1865f5ee32d47d'
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

  start(cityName, unitData, radiusData, periodData) {
    this.city = cityName
    this.unitData = unitData
    this.radiusData = radiusData
    this.periodData = periodData
    this.getAllData(cityName)
  }
}
