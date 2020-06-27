var citySearchEl = document.querySelector("#btn-city");
var cityInputEl = document.querySelector("#city");
var cardWeatherEl = document.querySelector("#weather-card");
var addCityEl = document.getElementById('list-city');
var addTempEl = document.getElementById('temp');
var forecastTitelEl = document.getElementById('forecast');
var cardDayEl = document.getElementById('daycards');


var formWeather = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {

        listCity(cityName);


    } else {
        alert("Please enter a city name");
    }

};

var listCity = function (city) {
    var createCityEl = document.createElement('a');
    createCityEl.className = "list-group-item list-group-item-action"
    createCityEl.textContent = city;

    addCityEl.appendChild(createCityEl);

    getCity(city);
}


var getCity = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c6ee42eed2ff19934f4074a3340902d5";

    var apiForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=c6ee42eed2ff19934f4074a3340902d5";

    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    // console.log(data)
                    displayWeather(data);

                })
            };

        });

    fetch(apiForecast)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {

                    getForecast(data);

                })
            };
        });
};

var displayWeather = function (data) {

    var iconEl = document.createElement('img');
    iconEl.className = 'img-icon';
    iconEl.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    var tempEl = document.createElement('p');
    tempEl.textContent = 'Temperature: ' + data.main.temp + ' °F';

    var humidityEl = document.createElement('p');
    humidityEl.textContent = 'Humidity' + data.main.humidity + '%';


    var speedEl = document.createElement('p');
    speedEl.textContent = 'Wind Speed: ' + data.wind.speed + ' MPH';

    var rightNow = moment().format("M/D/YYYY");

    var titleCityEl = document.createElement('h2');
    titleCityEl.textContent = data.name + ' ' + rightNow;

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var apiUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=c6ee42eed2ff19934f4074a3340902d5&lat=" + lat + "&lon=" + lon;

    fetch(apiUV)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (dataUV) {

                    var uvEl = document.createElement('p');
                    var indexEl = document.createElement('span');
                    
                    if (dataUV.value < 3) {
                        indexEl.className = 'bajo';
                    } else if (dataUV.value < 5) {
                        indexEl.className = 'moderado';
                    } else if (dataUV.value < 7) {
                        indexEl.className = 'alto';
                    } else if (dataUV.value < 10) {
                        indexEl.className = 'muy-alto';
                    } else {
                        indexEl.className = 'extremo';
                    }

                    uvEl.textContent = 'UV Index:';
                    indexEl.textContent = dataUV.value;
                                       
                    addTempEl.appendChild(uvEl);
                    uvEl.appendChild(indexEl);
                })
            };

        });

    cardWeatherEl.appendChild(titleCityEl);
    titleCityEl.appendChild(iconEl);
    addTempEl.appendChild(tempEl);
    addTempEl.appendChild(humidityEl);
    addTempEl.appendChild(speedEl);

}

var getForecast = function (data) {
    // console.log(data)
    var titleForecastEl = document.createElement('h2');
    titleForecastEl.textContent = '5-Day Forecast:';

    for (var i = 5; i < data.list.length; i = i + 8) {

        var foreCardEl = document.createElement('li');
        foreCardEl.className = 'card col-lg-2 list-group-item margin';
        // list-group-item-primary
        cardDayEl.appendChild(foreCardEl);



        var dateEl = document.createElement('h3');
        dateEl.textContent = moment(data.list[i].dt_txt).format("M/D/YYYY");

        var tempEl = document.createElement('p');
        tempEl.className = 'p2';
        tempEl.textContent = 'Temperature: ' + data.list[i].main.temp + ' °F';

        var humidityEl = document.createElement('p');
        humidityEl.className = 'p2';
        humidityEl.textContent = 'Humidity: ' + data.list[i].main.humidity + '%';;

        var iconEl = document.createElement('img');
        iconEl.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`);


        foreCardEl.appendChild(dateEl);
        foreCardEl.appendChild(iconEl);
        foreCardEl.appendChild(tempEl);
        foreCardEl.appendChild(humidityEl);
    }

    forecastTitelEl.appendChild(titleForecastEl);
}
citySearchEl.addEventListener("click", formWeather)