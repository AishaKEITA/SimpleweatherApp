var weather = new Vue({
  el: '#weather',

  data: {
      location: 'Malmo',
      city: "",
      tempconds: null,
    //   temperature: [""],
    //   condition: [""],
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
                self.tempconds = [{temperature: res.main.temp, condition: res.weather[0].description}];
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
            
                var days = [];
                for (let i = 0; i < res.list.length; i++) {
                    var ele = res.list[i];
                    if (ele.dt_txt.includes("12:00")) {
                        //days.push({temperature: res.list[i].main.temp, condition: res.list[i].weather[0].description, date: res.list[i].dt_txt});
                        days.push({temperature: ele.main.temp, condition: ele.weather[0].description, date: ele.dt_txt});
                    }
                }
                self.tempconds = days;
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