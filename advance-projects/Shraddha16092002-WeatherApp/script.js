
        var date = new Date();
        document.getElementById("da_ti").innerHTML = date;
        var inputval1;
        function clicked() {
            var errorcode = 0;
            document.getElementById("newtry").style.display = "none";

            var d = new Date();
            var dayval = Number(d.getDay());
            inputval1 = document.getElementById("inputval").value;


            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputval1 + '&units=metric&appid=#')
                .then(response => response.json())
                .then(character => {
                    // current
                    console.log(character),
                        tempval = character.list[0].main.temp;
                    document.getElementById("temp").innerHTML = tempval + " \u00B0C";
                    humval = character.list[0].main.humidity;
                    document.getElementById("humid").innerHTML = "Humidity: " + humval + "%";
                    descval = character.list[0].weather[0].description;
                    document.getElementById("desc").innerHTML = descval;
                    windval = character.list[0].wind.speed;
                    document.getElementById("wind").innerHTML = "Wind Speed: " + windval + " km/h";
                    iconval = character.list[0].weather[0].icon;
                    document.getElementById("icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${iconval}@4x.png" class="iconic"/>`;

                    cityval = character.city.name;
                    countryval = character.city.country;
                    document.getElementById("city-name").innerHTML = cityval + ", " + countryval;


                    // day1
                    for (i = 1; i <= 5; i++) {

                        var res1 = check_day();
                        document.getElementById("dayname" + i).innerHTML = res1;

                        document.getElementById("temp" + i).innerHTML = character.list[i].main.temp + " \u00B0C";
                        document.getElementById("icon" + i).innerHTML = `<img src="http://openweathermap.org/img/wn/${character.list[i].weather[0].icon}@2x.png"/>`;

                    }

                }
                ).catch((error) => {
                    // Only network error comes here
                    //   document.write("error");
                    errorcode = 1;
                    // document.getElementById("icon").innerHTML = "error !";


                });
            // if (errorcode == 1) {
            //     document.getElementById("newtry").style.display = "none";

            // }
            function check_day() {

                if (dayval == 0) {
                    // document.getElementById("dayname1").innerHTML="Mon";
                    dayval++;
                    return "Monday";
                }
                else if (dayval == 1) {
                    dayval++;
                    return "Tuesday";
                }
                else if (dayval == 2) {
                    dayval++;
                    return "Wednesday";
                }
                else if (dayval == 3) {
                    dayval++;
                    return "Thursday";
                }
                else if (dayval == 4) {
                    dayval++;
                    return "Friday";
                }
                else if (dayval == 5) {
                    dayval++;
                    return "Saturday";
                }
                else if (dayval == 6) {
                    dayval = 0;
                    return "Sunday";
                }

            }
        }
