class DisplayData {
  constructor(formElement) {
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
    var divName = this.makeElement('div', 'col-4', '', '', title)
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
    cityBoard.classList.add('card', 'border', 'border-dark')
    cityBoard.append(divTitleRow)
  }

  displayWeatherData(data, unitData) {
    var weatherDataBoard = document.getElementById('weather-data-board')

    while (weatherDataBoard.firstChild) {
      weatherDataBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '')

    if(data) {
      var weatherTitle = 'Weather'
      var divTitleCol = this.makeElement('div', 'h2', 'title', '', weatherTitle)
      divTitleRow.append(divTitleCol)

      var tempDataStr = data.main.temp + ' ' + this.switchTempbyUnit(unitData)
      var divRow1 = this.makeRow('', tempDataStr, 'fas', 'fa-temperature-high')

      var humidDataStr = data.main.humidity + ' %'
      var divRow2 = this.makeRow('', humidDataStr, 'fas', 'fa-percentage')

      var windSpeed = data.wind.speed + ' ' + this.switchWindbyUnit(unitData)
      var divRow3 = this.makeRow('', windSpeed, 'fas', 'fa-wind')

      var weatherDesc = data.weather[0].main
      var divRow4 = this.makeRow('', weatherDesc, 'fas', 'fa-cloud')
      weatherDataBoard.classList.add('card', 'border', 'border-dark')
      weatherDataBoard.append(divTitleRow, divRow1, divRow2, divRow3, divRow4)
     } else {
      var divRow1 = this.makeRow('Result', 'Failed to load data!')
      weatherDataBoard.classList.add('card', 'border', 'border-dark')
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
    var divTitleCol = this.makeElement('div', 'h2', 'title', '', geoTitle)

    divTitleRow.append(divTitleCol)

    if (data.features[0]) {
      var objArr = []
      for (var i = 0; i < data.features.length; i++) {
        var div = this.makeElement('div','col','','','')
        var magDataStr = data.features[i].properties.mag
        var divRow1 = this.makeRow('Maginitude', magDataStr)

        var dateDataStr = data.features[i].properties.time
        var divRow2 = this.makeRow('When', this.switchDateFormatToPST(dateDataStr))

        var originStr = data.features[i].properties.place
        var divRow3 = this.makeRow('Origin', originStr)
        div.append(divRow1, divRow2, divRow3)
        objArr.push(div)
      }

      geoDataBoard.classList.add('card', 'border', 'border-dark')
      geoDataBoard.append(divTitleRow, this.carouselContents(objArr, 'carouselContentControl', 'text'))

    } else {
      var originStr = 'No earthquake!'
      var divRow1 = this.makeRow('Result', originStr)
      geoDataBoard.classList.add('card', 'border', 'border-dark')
      geoDataBoard.append(divTitleRow, divRow1)
    }
  }

  displayPixabayImage(data) {
    var imgBoard = document.getElementById('img-data-board')

    while (imgBoard.firstChild) {
      imgBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '', '', '')

    var imgTitle = 'City photos'
    var divTitleCol = this.makeElement('div', 'h2', 'title', '', imgTitle)

    divTitleRow.append(divTitleCol)
    imgBoard.classList.add('card', 'border', 'border-dark')

    if(data && data.total > 0) {
      var imgArr = []
      for(var i=0;i<data.hits.length;i++) {
        imgArr.push(data.hits[i].webformatURL)
      }
      imgBoard.append(divTitleRow, this.carouselContents(imgArr, 'carouselImageControl', 'img'))
    } else {
      var divTextRow = this.makeElement('div', 'row', '', '', '', '', '')
      var text = 'Failed to find relevant images'
      var divTextCol = this.makeElement('div', 'col', 'card-text', '', text)
      divTextRow.append(divTextCol)
      imgBoard.append(divTextRow)
    }
  }

  carouselContents(arr, id, category) {
    var divControl = this.makeElement('div', 'carousel', 'slide', '', '')
    divControl.id = id
    divControl.setAttribute('data-ride', 'carousel')

    var divInner = this.makeElement('div', 'carousel-inner', '', '', '')

    for (var i = 0; i < arr.length; i++) {
      if (i === 0) {
        var divItem = this.makeElement('div', 'carousel-item', 'active', '', '')
      } else {
        var divItem = this.makeElement('div', 'carousel-item', '', '', '')
      }

      if (category === 'text') {
        var obj = this.makeElement('div', 'd-block', 'w-100', '', '')
        obj.append(arr[i])
      } else if (category === 'img') {
        var obj = this.makeElement('img', 'd-block', 'w-100', '', '')
        obj.src = arr[i]
      }

      obj.style.marginBottom = '10px'

      divItem.append(obj)
      divInner.append(divItem)
    }

    if (arr.length > 1) {
      var prev = this.carouselBtn('prev', id)
      var next = this.carouselBtn('next', id)

      divControl.append(divInner, prev, next)
    }

    return divControl
  }

  carouselBtn(string, id) {
    var object = this.makeElement('a', 'carousel-control-' + string, 'carousel-btn', '', '')
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

  displayInModal(title, body) {
    var modal = this.makeElement('div', 'modal', '', '', '')
    modal.setAttribute('tabindex', '-1')
    modal.setAttribute('role', 'dialog')

    var modalDiag = this.makeElement('div', 'modal-dialog', '', '', '')
    modalDiag.setAttribute('role', 'document')

    var modalContent = this.makeElement('div', 'modal-content', '', '', '')

    var modalHeader = this.makeElement('div', 'modal-header', '', '', '')

    var modalTitle = this.makeElement('h5', 'modal-title', '', '', '')
    modalTitle.textContent = title

    var closeBtn = this.makeElement('button', 'close', 'btn', 'btn-outline-dark', '')
    closeBtn.setAttribute('type', 'button')
    closeBtn.setAttribute('data-dismiss', 'modal')
    closeBtn.setAttribute('aria-label', 'Close')

    var closeSpan = document.createElement('span')
    closeSpan.setAttribute('aria-hidden', 'true')
    closeSpan.textContent = '&times;'
    closeBtn.append(closeSpan)

    modalHeader.append(modalTitle, closeBtn)

    var modalbody = this.makeElement('div', 'modal-body', '', '', '')
    var p = document.createElement('p')
    p.textContent = body
    modalbody.append(p)

    modalContent.append(modalHeader, modalbody)

    modalDiag.append(modalContent)
    modal.append(modalDiag)

    return modal
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
