var weatherDataBoard = document.getElementById('weather-data-board')

var cityBtn = document.getElementById('city-button')

var formElement = document.getElementById('form')

var displayData = new DisplayData(formElement)

var app = new App(displayData)

var unitData = 'metric'
formElement.addEventListener('submit', function(event) {
  event.preventDefault()

  var formData = new FormData(event.target)
  var cityInput = formData.get('city-input')
  var unitData = formData.get('unit-radio')

  app.start(cityInput, unitData)

  console.log(unitData)

  // Clearing the fields after submiting the form
  this.reset()
})
