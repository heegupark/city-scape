class DisplayData {
  constructor(formElement, appClass) {
    this.formElement = formElement
  }

  makeElement(elementStr, class1, class2, class3, text) {
    var el = document.createElement(elementStr)

    if (class1) {
      el.classList.add(class1)
    }

    if (class2) {
      el.classList.add(class2)
    }

    if (class3) {
      el.classList.add(class3)
    }

    if (text) {
      var p = document.createElement('p')
      p.textContent = text
      el.append(p)
    }

    return el
  }

  makeRow(title, data, faElement1, faElement2) {
    var divRow = this.makeElement('div', 'row', '', '',  '')
    var divName = this.makeElement('div', 'col', '', '', title)
    var divContents = this.makeElement('div', 'col', '', '', data)

    if (faElement1 && faElement2) {
      var p = this.makeElement('p', '','', '', '')
      var i = this.makeElement('i', faElement1, faElement2, '', '')
      p.append(i)
      divName.append(p)
    }

    divRow.append(divName, divContents)

    return divRow
  }

  displayCityName(data) {
    var cityBoard = document.getElementById('city-data-board')

    while (cityBoard.firstChild) {
      cityBoard.firstChild.remove()
    }

    if (data) {
      var cityName = data.name + '(' + data.sys.country + ')'
      var divTitleRow = this.makeElement('div', 'row', '', '', '', '', '')
      var divTitleCol = this.makeElement('div', 'h1', 'bolder', 'goldenrod', cityName)
      divTitleRow.append(divTitleCol)
    }
    cityBoard.classList.add('card')
    cityBoard.append(divTitleRow)
  }

  displayWeatherData(data, unitData) {
    var weatherDataBoard = document.getElementById('weather-data-board')

    while (weatherDataBoard.firstChild) {
      weatherDataBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '')

    if(data) {
      var weatherTitle = 'Weather information'
      var divTitleCol = this.makeElement('div', 'col', 'bolder', 'goldenrod', weatherTitle)
      divTitleRow.append(divTitleCol)

      var tempDataStr = data.main.temp + ' ' + this.switchTempbyUnit(unitData)
      var divRow1 = this.makeRow('', tempDataStr, 'fas', 'fa-temperature-high')

      var humidDataStr = data.main.humidity + ' %'
      var divRow2 = this.makeRow('', humidDataStr, 'fas', 'fa-percentage')

      var windSpeed = data.wind.speed + ' ' + this.switchWindbyUnit(unitData)
      var divRow3 = this.makeRow('', windSpeed, 'fas', 'fa-wind')

      var weatherDesc = data.weather[0].main
      var divRow4 = this.makeRow('', weatherDesc, 'fas', 'fa-cloud')
      weatherDataBoard.classList.add('card')
      weatherDataBoard.append(divTitleRow, divRow1, divRow2, divRow3, divRow4)
    } else {
      var divRow1 = this.makeRow('Result:', 'Failed to load data!')
      weatherDataBoard.classList.add('card')
      weatherDataBoard.append(divRow1)
    }
  }

  displayGeoData(data) {
    var geoDataBoard = document.getElementById('geo-data-board')

    while (geoDataBoard.firstChild) {
      geoDataBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '', '', '')

    var geoTitle = 'Earthquake'
    var divTitleCol = this.makeElement('div', 'col', 'bolder', 'goldenrod', geoTitle)

    divTitleRow.append(divTitleCol)

    if (data.features[0]) {
      var magDataStr = data.features[0].properties.mag
      var divRow1 = this.makeRow('Maginitude:', magDataStr)

      var dateDataStr = data.features[0].properties.time
      var divRow2 = this.makeRow('When:', this.switchDateFormatToPST(dateDataStr))

      var originStr = data.features[0].properties.place
      var divRow3 = this.makeRow('Origin:', originStr)

      geoDataBoard.classList.add('card')
      geoDataBoard.append(divTitleRow, divRow1, divRow2, divRow3)

    } else {
      var originStr = 'No earthquake!'
      var divRow1 = this.makeRow('Result:', originStr)
      geoDataBoard.classList.add('card')
      geoDataBoard.append(divTitleRow, divRow1)
    }
  }

  displayPixabayImage(data) {
    var imgBoard = document.getElementById('img-data-board')

    while (imgBoard.firstChild) {
      imgBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '', '', '')

    var imgTitle = 'City photo'
    var divTitleCol = this.makeElement('div', 'col', 'bolder', 'goldenrod', imgTitle)

    divTitleRow.append(divTitleCol)
    imgBoard.classList.add('card')

    if(data && data.total > 0) {
      var imgArr = []
      for(var i=0;i<data.hits.length;i++) {
        imgArr.push(data.hits[i].webformatURL)
      }
      imgBoard.append(divTitleRow, this.carouselImages(imgArr))
    } else {
      var divTextRow = this.makeElement('div', 'row', '', '', '', '', '')
      var text = 'Failed to find relevant images'
      var divTextCol = this.makeElement('div', 'col', 'card-text', '', text)
      divTextRow.append(divTextCol)
      imgBoard.append(divTextRow)
    }
  }

  carouselImages(imgArr) {
    var id = 'caourselControl'

    var divControl = this.makeElement('div', 'carousel', 'slide', '', '')
    divControl.id = id
    divControl.setAttribute('data-ride', 'carousel')

    var divInner = this.makeElement('div', 'carousel-inner', '', '', '')

    for(var i=0;i<imgArr.length;i++) {
      if(i===0) {
        var divItem = this.makeElement('div', 'carousel-item', 'active', '', '')
      } else {
        var divItem = this.makeElement('div', 'carousel-item', '', '', '')
      }
      var imgObj = this.makeElement('img', 'd-block', 'w-100', '', '')
      imgObj.src = imgArr[i]
      imgObj.classList.add('img-responsive')
      imgObj.style.width = '100%'
      imgObj.style.marginBottom = '10px'

      divItem.append(imgObj)
      divInner.append(divItem)
    }

    var prev = this.carouselBtn('prev', id)
    var next = this.carouselBtn('next', id)

    divControl.append(divInner, prev, next)

    return divControl
  }

  carouselBtn(string, id) {
    var object = this.makeElement('a', 'carousel-control-' + string, '', '', '')
    object.href = '#' + id
    object.setAttribute('role', 'button')
    object.setAttribute('data-slide', string)

    var objectSpan1 = this.makeElement('span', 'carousel-control-' + string + '-icon', '', '', '')
    objectSpan1.setAttribute('aria-hidden', 'true')

    var objectSpan2 = this.makeElement('span', 'sr-only', '', '', '')
    objectSpan2.textContent = string
    object.append(objectSpan1, objectSpan2)

    return object
  }

  switchDateFormatToPST(date) {
    var d = new Date(date)
    return d.toUTCString()
  }

  switchTempbyUnit(unitData) {
    return document.getElementById(unitData).textContent
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
