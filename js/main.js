var weatherDataBoard = document.getElementById('weather-data-board')

var cityBtn = document.getElementById('city-button')

var formElement = document.getElementById('form')

var weatherResultArray = []
var geoResultArray = []
var pixabayResultArray = []
var displayData = new DisplayData(formElement)

var app = new App(displayData)

var unitData = 'metric'

formElement.addEventListener('submit', function (event) {
  event.preventDefault()

  var formData = new FormData(event.target)
  var cityInput = formData.get('city-input')
  var unitData = formData.get('unit-radio')
  var radiusData = formData.get('radius-radio')
  var periodData = formData.get('period-radio')

  var cityElement = document.getElementById('city-input')

  console.log(radiusData)
  if (cityInput.trim()) {
    app.start(cityInput, unitData, radiusData, periodData)
  } else {
    setTimeout(function () {
      cityElement.placeholder = ''
    }, 1000)
    cityElement.placeholder = 'Please enter city.'
  }

  // Clearing the fields after submiting the form
  // this.reset()
  cityElement.value = ''
})
