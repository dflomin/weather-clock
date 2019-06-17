import { Component } from '@angular/core';
import { Interval } from './services/interval.service';
import { WeatherTrackerService } from './services/weather-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-clock';

  constructor(
  	private Interval: Interval,
  	private Weather: WeatherTrackerService
  ) { 
  	this.Interval.init();
    this.Weather.getWeather(() => {
    	this.Weather.registerCallback();
    });
  }
}
