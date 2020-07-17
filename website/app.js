/* Global Variables */

const btnGenerate = document.getElementById('generate')
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')
// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

// Personal API Key for OpenWeatherMap API and the url
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`

const api = '&appid=857363f2f48760ec902a3fbd46f2e9a8'

// Event listener to add function to existing HTML DOM element
btnGenerate.addEventListener('click', handleSubmit)
/* Function called by event listener */
function handleSubmit(e) {
  e.preventDefault()
  const zip = document.getElementById('zip').value
  const feelings = document.getElementById('feelings').value
  fetchData(baseUrl, zip, api).then((data) => {
    // Add data to POST request
    postData('/projectData', {
      temperature: data.main.temp,
      date: newDate,
      user_response: feelings,
    }).then(() => updateUI())
  })
  resetAll()
}
// clear zipcode and feelings values
const resetAll = () => {
  document.getElementById('zip').value = ''
  document.getElementById('feelings').value = ''
}
/* Function to GET Web API Data*/
const fetchData = async (baseUrl, zipCode, api) => {
  const res = await fetch(`${baseUrl}${zipCode},us${api}`)
  console.log(res)
  //Fetching data from api
  try {
    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    // appropriately handle the error
    console.log('error', error)
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  console.log(data)
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  })

  try {
    const newData = await response.json()
    console.log(newData)
    return newData
  } catch (error) {
    console.log('error', error)
  }
}

/* Function to GET Project Data */

const updateUI = async () => {
  const req = await fetch('/all')
  try {
    const data = await req.json()
    date.innerHTML = data.date
    temp.innerHTML = data.temperature
    content.innerHTML = data.user_response
  } catch (error) {
    console.log('error', error)
  }
}
