//Create an application that shows a weather forecast. 
//A user should be able to load weather forecast for a typed-in location. 
//A user should be able to select different types of forecasts: 
//current weather data, 5 day / 3-hour forecast.

var weather = new Vue({
  el: '#weather',

  data: {
      location: '',
      city: "",
      temperature: '',
      condition: '',
      icon: '',
      picked: 'current',
  },

  methods: {
        fetchCurrent: function() {
            var self = this;
            var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${self.location}&units=metric&appid=d1c737df96de3348de25c71e9673f1b8`;
            var xhr = new XMLHttpRequest();
            
            xhr.open("GET", apiURL);
            xhr.onload = function() {
                let res;
                res = JSON.parse(xhr.responseText);
                console.log(res);
                self.city = `${res.name}, ${res.sys.country}`;
                self.temperature = res.main.temp;
                self.condition = res.weather[0].description;
                self.icon = res.weather[0].icon;
            };
            xhr.send();
        },
        fetchDays: function() {
            var self = this;
            var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${self.location}&units=metric&appid=d1c737df96de3348de25c71e9673f1b8`;
        
            console.log(apiURL);
            var xhr = new XMLHttpRequest();
      
            xhr.open("GET", apiURL);
            xhr.onload = function() {
                let res;
                res = JSON.parse(xhr.responseText);
                console.log(res);
                self.city = `${res.city.name}, ${res.city.country}`;
                self.temperature = res.list[0].main.temp;
                self.condition = res.list[0].weather[0].description;
            };
            xhr.send();
        },
        searchButton: function(){
            var self = this;

            if (!self.location) {
                console.log("input box is empty, returning");
                return;
            }
            
            if (self.picked === 'current') {
                self.fetchCurrent();
            } else if (self.picked === 'days'){
                self.fetchDays();
            }
        }
  }

});