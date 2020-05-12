class App {
  constructor(displayData, formData, unitData, lon, lat) {
    this.displayData = displayData
    this.formData = formData
    this.unitData = unitData
    this.lat = lat
    this.lon = lon
    this.getWeatherData = this.getWeatherData.bind(this)
    this.getGeoData = this.getGeoData.bind(this)
    this.handleWeatherDataError = this.handleWeatherDataError.bind(this)
    this.handleWeatherDataSuccess = this.handleWeatherDataSuccess.bind(this)
    this.handleGeoDataError = this.handleGeoDataError.bind(this)
    this.handleGeoDataSuccess = this.handleGeoDataSuccess.bind(this)
  }

  handleWeatherDataError(error) {
    console.error(error)
    this.displayData.displayWeatherData(null, null)
  }

  handleWeatherDataSuccess(data) {
    weatherResultArray = data

    this.lon = data.coord.lon
    this.lat = data.coord.lat

    this.getGeoData(this.lon, this.lat)
  }

  handleGeoDataError(error) {
    console.error(error)
  }

  handleGeoDataSuccess(data) {
    geoResultArray = data

    this.displayData.displayWeatherData(weatherResultArray, this.unitData)
    this.displayData.displayGeoData(geoResultArray)
  }

  getAllData(cityName) {
    this.getWeatherData(cityName)
    // this.getGeoData(this.lon, this.lat)
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

  addZero(num) {
    return num < 10 ? "0" + num : num.toString()
  }

  convertDate(date) {
    var year = this.addZero(date.getFullYear())
    var month = this.addZero(date.getMonth() + 1)
    var day = this.addZero(date.getDate())

    return year + month + day
  }

  getGeoData(lon, lat) {
    var url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'
    var lat = '&latitude=' + lat
    var lon = '&longitude=' + lon
    var radius = '&maxradiuskm=' + '200'
    var startDate = new Date(new Date().getTime() - (100 * 24 * 60 * 60 * 1000))
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

  start(cityName, unitData) {
    this.unitData = unitData
    this.getAllData(cityName)
  }
}
