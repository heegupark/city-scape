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

    if(text) {
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

    var weatherTitle = data.name + '(' + data.sys.country + ')' + "'" + 's weather information'
    var divTitleCol = this.makeElement('div', 'col', weatherTitle)
    divTitleRow.append(divTitleCol)

    var tempDataStr = data.main.temp + ' ' + this.switchTempbyUnit(unitData)
    var divRow1 = this.makeRow('Current Tempature:', tempDataStr)

    var humidDataStr = data.main.humidity + ' %'
    var divRow2 = this.makeRow('Current Humidity:', humidDataStr)

    var windSpeed = data.wind.speed + ' ' + this.switchWindbyUnit(unitData)
    var divRow3 = this.makeRow('Current Wind Speed:', windSpeed)

    weatherDataBoard.append(divTitleRow, divRow1, divRow2, divRow3)
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
