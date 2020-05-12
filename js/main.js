var weatherDataBoard = document.getElementById('weather-data-board')

var cityBtn = document.getElementById('city-button')

var formElement = document.getElementById('form')
var msg = document.getElementById('msg')

var weatherResultArray = []
var geoResultArray = []
var displayData = new DisplayData(formElement)

var app = new App(displayData)

var unitData = 'metric'

formElement.addEventListener('submit', function (event) {
  event.preventDefault()

  var formData = new FormData(event.target)
  var cityInput = formData.get('city-input')
  var unitData = formData.get('unit-radio')

  if (cityInput.trim()) {
    app.start(cityInput, unitData)
  } else {
    setTimeout(function () {
      msg.textContent = ''
      msg.style.color = 'white'
    }, 1000)
    msg.textContent = 'Please enter city.'
    msg.style.color = 'red'
  }


  console.log(unitData)

  // Clearing the fields after submiting the form
  this.reset()
})
