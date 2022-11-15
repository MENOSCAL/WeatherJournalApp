/* Global Variables */
const d = new Date();
const date = d.toDateString();
let zipElement, feelingsElement, tempElement, dateElement, contentElement;
// Personal API Key for OpenWeatherMap
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=#######################################&units=imperial';

document.addEventListener('DOMContentLoaded', () => {
    zipElement = document.getElementById('zip');
    feelingsElement = document.getElementById('feelings');
    tempElement = document.getElementById('temp');
    dateElement = document.getElementById('date');
    contentElement = document.getElementById('content');

    document.getElementById('generate').addEventListener('click', performAction);
});

function performAction(e) {
    e.preventDefault();
    const zip = zipElement.value;
    const feelings = feelingsElement.value;
    
    getWeather(baseURL, zip, apiKey)
    .then(data => {
        if(data.cod == 200) {
            return postData('/add', {
                date, city: data.name, country: data.sys.country, temp: fahrenheitToCelsius(data.main.temp), feel: feelings
            })
        } else {
            tempElement.innerHTML = '';
            dateElement.innerHTML = '';
            contentElement.innerHTML = data.message;
        }
    })
    .then(dataTest => {
        if(dataTest) {
            return retrieveData();
        }
    })
    .catch(console.log.bind(console));
}

const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json();
        // Write updated data to DOM elements
        tempElement.innerHTML = `Temperature: ${Math.round(allData.temp)}°C`;
        dateElement.innerHTML = `Date in ${allData.city}, ${allData.country}: ${allData.date}`;
        contentElement.innerHTML = `Feeling: ${allData.feel}`;
        return allData;
    } catch(error) {
        console.log('error', error);
    }
}

/* Convert Fahrenheit to Celsius: Reference: https://www.unitconverters.net/temperature/fahrenheit-to-celsius.htm */
function fahrenheitToCelsius(temp) {
    return 5 * (temp - 32) / 9;
}