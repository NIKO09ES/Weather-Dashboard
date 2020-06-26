var citySearchEl = document.querySelector("#btn-city");
var cityInputEl = document.querySelector("#city");
var cardWeatherEl = document.querySelector("#weather-card");
var addCityEl = document.getElementById('list-city')


var formWeather = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {

        listCity(cityName);
             
        
    } else {
        alert("Please enter a city name");
    }

};

var listCity = function(city) {
    var createCityEl = document.createElement('a');
    createCityEl.className = "list-group-item list-group-item-action"
    createCityEl.textContent = city;
    addCityEl.appendChild(createCityEl);

    getCity(city); 
}


var getCity = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=c6ee42eed2ff19934f4074a3340902d5";

    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json()
                console.log(response);
                // .then(function (data) {
                    
                //    displayWeather(data);
            };
            // } else {
            //     alert("Error: " + response.statusText);
            // }
        })
        // .catch(function (error) {
        //     // Notice this `.catch()` getting chained onto the end of the `.then()` method
        //     alert("Unable to connect to Weather Dashboard");
        // });

};

var displayWeather = function(data) {
    var cityEl = document.createElement("a");
    cityEl.classList = "list-item flex-row justify-space-between align-center";
    cityEl.textContent = city;
}


citySearchEl.addEventListener("click", formWeather)

// var weatherCardEl = document.querySelector("#weather-card");

// document.getElementById('btn-city').addEventListener('click', e => {
//     e.preventDefault();



//     var searchField = document.querySelector('#city').value;
//     preformSearch(searchField);
// });

// const preformSearch = city => {
//     fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6ee42eed2ff19934f4074a3340902d5`
//     )
//         // Converts the response to JSON
//         .then(function (response) {
//             return response.json().then(function(data) {
//                 console.log(data)
//                 var cardEl = document.createElement("div")
//                 cardEl.classList = "card"
//                 cardEl.textContent = data.name;
//                 console.log(date.name)

//                 weatherCardEl.appendChild(cardEl);
//             });
//         })
// };