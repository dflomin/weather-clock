import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Weather } from '../interfaces/weather.interface';
import { Interval } from './interval.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherTrackerService {

  constructor(private http: HttpClient, private Interval: Interval) { }

  apiEndpoint = 'http://api.openweathermap.org/data/2.5/weather?zip=';
  apiKey = '4e6668a1062ee4a13454aa7224920b45';
  extras = '&units=Fahrenheit';

  public currentWeather: BehaviorSubject<Weather> = new BehaviorSubject(<Weather>{});

  public getWeather(callback?: Function) {
  	// this.http.get<Weather>(this.apiEndpoint + '07208,us&APPID=' + this.apiKey + this.extras, {}).subscribe(
  	// 	data => {
   //      console.log(data)
  	// 		this.currentWeather.next(data);
  	// 	},
  	// 	err =>{
  	// 		console.log(err)
  	// 	},
  	// 	() => {
   //      if (callback)
   //        callback();
  	// 	}
  	// )
    if (callback) callback()
  }

  public registerCallback() {
    this.Interval.addCallback(this.getWeather.bind(this), { frequency: 1, unit: 'hours' })
  }
}
