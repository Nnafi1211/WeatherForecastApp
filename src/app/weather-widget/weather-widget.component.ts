import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {

  weatherData: any;
  sunset_time: string;
  isDay: boolean;
  temp_celcius: string;
  temp_min: string;
  temp_max: string;
  temp_feels_like: string;
  dateName: any;
  humidity: any;
  cityName: any;
  country: any;
  currentDate: Date;
  weatherDesc: any;
  sunrise_time: string;
  lat;
  lon;
  date: Date;
  CurrentTime: string;

  constructor(private router: Router) {
    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' +  new Date().getSeconds()}, 1);
   }

  ngOnInit(): void {
    this.getWeaterData();
  }

  getWeaterData() {
    if (!navigator.geolocation) {
      this.router.navigate(['/no-access']);
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lon +
      '&appid=8547367d3ecb6824c1eb0fc48eba1418')
      .then(res => res.json())
      .then(data => {
        this.setWeatherData(data);
      });
      });
  }

  setWeatherData(data) {
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    let sunriseTime = new Date(this.weatherData.sys.sunrise * 1000);
    this.sunset_time = sunsetTime.toLocaleTimeString();
    this.sunrise_time = sunriseTime.toLocaleString();

    this.currentDate = new Date();
    this.isDay = (this.currentDate.getTime() < sunsetTime.getTime());

    this.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);

    this.cityName = this.weatherData.name;
    this.country = this.weatherData.sys.country;
    this.humidity = this.weatherData.main.humidity;

    this.weatherDesc = this.weatherData.weather[0].description;
  }

}
