class DisplayData {
  constructor(formElement) {
    this.formElement = formElement
    this.imgArr = []
    this.active = 0
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
      var divTitleRow = this.makeElement('div', 'row', '', '', '')
      var divTitleCol = this.makeElement('div', 'col-sm', 'city-name', '', cityName)
      var divCoordLonCol = this.makeElement('div', 'col-sm', 'city-coord', '', 'Longitude: ' + data.coord.lon + '°')
      var divCoordLatCol = this.makeElement('div', 'col-sm', 'city-coord', '', 'Latitude: ' + data.coord.lat + '°')

      divTitleRow.append(divTitleCol, divCoordLonCol, divCoordLatCol)
      cityBoard.classList.add('card', 'border', 'border-dark')

      cityBoard.append(divTitleRow)
      this.hideAndShow(cityBoard)
      this.displayMap(data.name)
    }
  }

  displayWeatherData(data, unitData) {
    var weatherDataBoard = document.getElementById('weather-data-board')

    while (weatherDataBoard.firstChild) {
      weatherDataBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '')

    if(data) {
      var weatherTitle = 'Weather'
      var divTitleCol = this.makeElement('div', 'col', 'title', 'weather-img', weatherTitle)
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
      this.hideAndShow(weatherDataBoard)
    } else {
      this.clearAllFields()

      var modalBoard = document.getElementById('modal-data-board')
      var modalObj = this.displayInModal('error-modal', 'Error', 'Failed to load data. Please search different city.','')
      modalBoard.append(modalObj)
      $("#error-modal").modal('show')
    }
  }

  displayGeoData(data) {
    var geoDataBoard = document.getElementById('geo-data-board')

    while (geoDataBoard.firstChild) {
      geoDataBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '', '', '')

    var geoTitle = 'Earthquake'
    var divTitleCol = this.makeElement('div', 'col', 'title', 'earthquake-img', geoTitle)

    divTitleRow.append(divTitleCol)

    if (data && data.features[0]) {
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
      this.hideAndShow(geoDataBoard)
    } else {
      var originStr = 'No earthquake!'
      var divRow1 = this.makeRow('Result', originStr)
      geoDataBoard.classList.add('card', 'border', 'border-dark')
      geoDataBoard.append(divTitleRow, divRow1)
      this.hideAndShow(geoDataBoard)
    }
  }

  displayPixabayImage(data) {
    var imgBoard = document.getElementById('img-data-board')

    while (imgBoard.firstChild) {
      imgBoard.firstChild.remove()
      this.active = 0
      this.imgArr = []
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '', '', '')

    var imgTitle = 'Photos'
    var divTitleCol = this.makeElement('div', 'col', 'title', 'photo-img', imgTitle)

    divTitleRow.append(divTitleCol)

    imgBoard.classList.add('card', 'border', 'border-dark')

    if(data && data.total > 0) {
      // var imgArr = []
      for(var i=0;i<data.hits.length;i++) {
        this.imgArr.push(data.hits[i].webformatURL)
      }
      imgBoard.append(divTitleRow, this.carouselContents(this.imgArr, 'carouselImageControl', 'img', false))
      this.hideAndShow(imgBoard)

    } else {
      var divTextRow = this.makeElement('div', 'row', '', '', '', '', '')
      var text = 'Failed to find relevant images'
      var divTextCol = this.makeElement('div', 'col', 'card-text', '', text)
      divTextRow.append(divTextCol)
      imgBoard.append(divTitleRow, divTextRow)
      this.hideAndShow(imgBoard)
    }
  }

  displayMap(cityName) {
    var mapDataBoard = document.getElementById('map-data-board')

    while (mapDataBoard.firstChild) {
      mapDataBoard.firstChild.remove()
    }

    var divTitleRow = this.makeElement('div', 'row', '', '', '', '', '')

    var mapTitle = 'Maps'
    var divTitleCol = this.makeElement('div', 'col', 'title', 'map-img', mapTitle)

    divTitleRow.append(divTitleCol)
    mapDataBoard.classList.add('card', 'border', 'border-dark')

    var divMapDataRow = this.makeElement('div', 'row', '', '', '', '', '')
    var divMapDataCol = this.makeElement('div', 'col', '', '', '')
    var divMapDataIFrame = this.makeElement('iframe', 'map', '', '', '')
    var src = 'https://www.google.com/maps/embed/v1/place?key=' + GOOGLE_MAP_API_KEY + '&q=' + cityName
    divMapDataIFrame.src = src
    divMapDataCol.append(divMapDataIFrame)
    divMapDataRow.append(divMapDataCol)
    mapDataBoard.append(divTitleRow, divMapDataRow)
    this.hideAndShow(mapDataBoard)
  }

  carouselContents(arr, id, category, isModal) {
    var divControl = this.makeElement('div', 'carousel', 'slide', 'img-box', '')
    divControl.id = id
    divControl.setAttribute('data-ride', 'carousel')

    var divInner = this.makeElement('div', 'carousel-inner', '', '', '')

    for (var i = 0; i < arr.length; i++) {
      if (i === this.active) {
        var divItem = this.makeElement('div', 'carousel-item', 'active', '', '')
      } else {
        var divItem = this.makeElement('div', 'carousel-item', '', '', '')
      }

      if (category === 'text') {
        var obj = this.makeElement('div', 'd-block', 'w-100', '', '')
        obj.append(arr[i])
      } else if (category === 'img') {
        if(isModal) {
          var obj = this.makeElement('img', 'd-block', 'w-100', 'modal-img', '')
        } else {
          var obj = this.makeElement('img', 'd-block', 'w-100', 'img-city', '')
          obj.id = i
        }

        obj.src = arr[i]
        obj.setAttribute('data-target', '#img-modal')
        obj.setAttribute('data-toggle', 'modal')

        if(!isModal) {
          obj.addEventListener('click', (e) => {
            e.preventDefault()
            this.onImgClick(e)
          })
        }
      }

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

  onImgClick(e) {
    this.active = Number(e.target.id)
    var modalBoard = document.getElementById('modal-data-board')
    var modalObj = this.displayInModalwithCarousel('img-modal', this.carouselContents(this.imgArr, 'carouselImageControlModal', 'img', true))

    if (modalBoard.firstChild) {
      modalBoard.firstChild.remove()
    }
    modalBoard.append(modalObj)
  }

  carouselBtn(string, id) {
    var object = this.makeElement('a', 'carousel-control-' + string, 'carousel-control-custom', '', '')
    object.href = '#' + id
    object.setAttribute('role', 'button')
    object.setAttribute('data-slide', string)

    var objectSpan1 = this.makeElement('span', 'carousel-control-' + string + '-icon', 'carousel-btn', '', '')
    objectSpan1.setAttribute('aria-hidden', 'true')

    var objectSpan2 = this.makeElement('span', 'sr-only', '', '', '')
    objectSpan2.textContent = string
    object.append(objectSpan1, objectSpan2)

    return object
  }

  displayInModal(id, title, text, src) {
    var modal = this.makeElement('div', 'modal', 'fade', '', '')
    modal.setAttribute('tabindex', '-1')
    modal.setAttribute('role', 'dialog')
    modal.id = id

    var modalDiag = this.makeElement('div', 'modal-dialog', '', '', '')
    modalDiag.setAttribute('role', 'document')

    var modalContent = this.makeElement('div', 'modal-content', 'modal-design-custom', '', '')

    if(title) {
      var modalHeader = this.makeElement('div', 'modal-header', 'modal-title-img', '', '')

      var modalTitle = this.makeElement('h5', 'modal-title', '', '', '')
      modalTitle.textContent = title

      var closeBtn = this.makeElement('button', 'close', '', '', '')
      closeBtn.setAttribute('type', 'button')
      closeBtn.setAttribute('data-dismiss', 'modal')
      closeBtn.setAttribute('aria-label', 'Close')

      var closeSpan = this.makeElement('span', 'modal-close-btn-custom','','','')
      closeSpan.setAttribute('aria-hidden', 'true')
      closeSpan.textContent = 'X'
      closeBtn.append(closeSpan)
      closeBtn.focus()

      modalHeader.append(modalTitle, closeBtn)
    }

    var modalbody = this.makeElement('div', 'modal-body', 'modal-custom-body', '', '')

    if(text) {
      var p = document.createElement('p')
      p.textContent = text
      modalbody.append(p)
    }

    if(src) {
      var img = this.makeElement('img', 'img-fit', '','','')
      img.src = src
      modalbody.append(img)
    }

    if(title) {
      modalContent.append(modalHeader, modalbody)
    } else {
      modalContent.append(modalbody)
    }

    modalDiag.append(modalContent)
    modal.append(modalDiag)

    return modal
  }

  displayInModalwithCarousel(id, obj) {
    var modal = this.makeElement('div', 'modal', 'fade', '', '')
    modal.setAttribute('tabindex', '-1')
    modal.setAttribute('role', 'dialog')
    modal.id = id

    var modalDiag = this.makeElement('div', 'modal-dialog', 'modal-xl', '', '')
    modalDiag.setAttribute('role', 'document')

    var modalContent = this.makeElement('div', 'modal-content', 'modal-custom-img-body', '', '')

    var modalbody = this.makeElement('div', 'modal-body', 'modal-body-img', '', '')

    modalbody.append(obj)
    modalContent.append(modalbody)
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

  clearAllFields() {
    this.active = 0
    this.imgArr = []
    var cityBoard = document.getElementById('city-data-board')
    var weatherDataBoard = document.getElementById('weather-data-board')
    var geoDataBoard = document.getElementById('geo-data-board')
    var imgBoard = document.getElementById('img-data-board')
    var mapDataBoard = document.getElementById('map-data-board')

    this.removeClasses(cityBoard)
    this.removeClasses(weatherDataBoard)
    this.removeClasses(geoDataBoard)
    this.removeClasses(imgBoard)
    this.removeClasses(mapDataBoard)

    while (cityBoard.firstChild) {
      cityBoard.firstChild.remove()
    }
    while (weatherDataBoard.firstChild) {
      weatherDataBoard.firstChild.remove()
    }
    while (geoDataBoard.firstChild) {
      geoDataBoard.firstChild.remove()
    }
    while (imgBoard.firstChild) {
      imgBoard.firstChild.remove()
    }
    while (mapDataBoard.firstChild) {
      mapDataBoard.firstChild.remove()
    }
  }

  removeClasses(obj) {
    obj.classList.remove('title', 'card', 'border', 'border-dark')
  }

  hideAndShow(obj) {
    $(obj).hide()
    $(obj).fadeIn('slow')
  }
}
