class DisplayData {
  constructor(formElement, appClass) {
    this.formElement = formElement
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.formElement.addEventListener('submit', this.handleSubmit)
  }

  // handleSubmit(event) {
  //   event.preventDefault()

  //   var formData = new FormData(event.target)
  //   var cityInput = formData.get('city-input')
  //   var unitData = formData.get('unit-radio')

  //   this.appClass.getAllData(cityInput, unitData)

  //   console.log(unitData)
  //   // Clearing the fields after submiting the form
  //   this.formElement.reset()
  // }

  makeElement(elementStr, classStr, text) {
    var el = document.createElement(elementStr)

    if (classStr) {
      el.classList.add(classStr)
    }

    if (text) {
      var p = document.createElement('p')
      p.textContent = text
      el.append(p)
    }

    return el
  }

  makeRow(title, data) {
    var divRow = this.makeElement('div', 'row', '')
    var divName = this.makeElement('div', 'col', title)
    var divContents = this.makeElement('div', 'col', data)
    divRow.append(divName, divContents)
    return divRow
  }

  displayWeatherData(data, unitData) {
    var weatherDataBoard = document.getElementById('weather-data-board')

    while (weatherDataBoard.firstChild) {
      weatherDataBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '')

    if(data) {
      var weatherTitle = data.name + '(' + data.sys.country + ')' + "'" + 's weather information'
      var divTitleCol = this.makeElement('div', 'col', weatherTitle)
      divTitleRow.append(divTitleCol)

      var tempDataStr = data.main.temp + ' ' + this.switchTempbyUnit(unitData)
      var divRow1 = this.makeRow('Current Tempature:', tempDataStr)

      var humidDataStr = data.main.humidity + ' %'
      var divRow2 = this.makeRow('Current Humidity:', humidDataStr)

      var windSpeed = data.wind.speed + ' ' + this.switchWindbyUnit(unitData)
      var divRow3 = this.makeRow('Current Wind Speed:', windSpeed)

      var weatherDesc = data.weather[0].main
      var divRow4 = this.makeRow('Weather:', weatherDesc)
      weatherDataBoard.append(divTitleRow, divRow1, divRow2, divRow3, divRow4)
    } else {
      var divRow1 = this.makeRow('Result:', 'Failed to load data!')
      weatherDataBoard.append(divRow1)
    }

  }

  displayGeoData(data) {
    var geoDataBoard = document.getElementById('geo-data-board')

    while (geoDataBoard.firstChild) {
      geoDataBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '')

    var geoTitle = 'Earthquake within a radius of 200km and within 100 days'
    var divTitleCol = this.makeElement('div', 'col', geoTitle)
    divTitleRow.append(divTitleCol)

    if (data.features[0]) {
      var magDataStr = data.features[0].properties.mag
      var divRow1 = this.makeRow('Maginitude:', magDataStr)

      var dateDataStr = data.features[0].properties.time
      var divRow2 = this.makeRow('When:', this.switchDateFormatToPST(dateDataStr))

      var originStr = data.features[0].properties.place
      var divRow3 = this.makeRow('Origin:', originStr)

      // var weatherDesc = data.weather[0].main
      // var divRow4 = this.makeRow('Weather:', weatherDesc)
      geoDataBoard.append(divTitleRow, divRow1, divRow2, divRow3)

    } else {
      var originStr = 'No earthquake!'
      var divRow1 = this.makeRow('Result:', originStr)
      geoDataBoard.append(divTitleRow, divRow1)
    }
  }

  displayPixabayImage(data) {
    var imgBoard = document.getElementById('img-data-board')

    while (imgBoard.firstChild) {
      imgBoard.firstChild.remove()
    }

    if(data) {
      var img = document.createElement('img')
      var num = Math.floor(Math.random() * data.hits.length)
      console.log(num)
      img.src = data.hits[num].webformatURL
      imgBoard.append(img)
    }
  }

  switchDateFormatToPST(date) {
    console.log(date)
    return new Date(date * 1000)
  }

  switchTempbyUnit(unitData) {
    return document.getElementById(unitData.toLowerCase()).textContent
  }

  switchWindbyUnit(unitData) {
    switch (unitData.toLowerCase()) {
      case 'metric':
        return 'meter/sec'
        break;
      case 'imperial':
        return 'miles/hour'
        break;
      default:
        return 'meter/sec'
    }
  }
}
