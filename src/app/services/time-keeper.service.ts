import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { WeatherTrackerService } from './weather-tracker.service';
import { Interval } from './interval.service';
import { Moment }  from 'moment';
import * as moment from 'moment';

export interface Time {
	hours: number;
	minutes: number;
	seconds: number;
}

export interface Animation {
	backgroundKeyframes: string;
	backgroundAnimationStyle: string;
	innerColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimeKeeperService {

  constructor(
  	private http: HttpClient, 
  	private Weather: WeatherTrackerService, 
  	private Interval: Interval
  ) { }

  subscriptions = {};
	colors = {
		night: ['091739', '0b0824', '060d26', '110d4b', '020316', '03051c', '01020e', '01020e', '070c34'],
		dawn: ['0c2745','153e64','1b5271','38647d','426a79','5f7b85','829ca6','898091','7f6f8d','5e4376','a4839a','cfa8ab','ffb8b9','d9b7c2','da9589'],
		morning: ['efc49b', 'f9ab74', 'ffe493', 'ffd876', 'ffff8e', 'feffdf', 'f4eeda', '94c3ce', '7dcdd6', '93dfe4'],
		afternoon: ['5cdeee','61b8de','54bbe0','52e5ef','49d7ef','2c6dbf','468ae0','44a1d9','2986c9','3cacd7'],
		dusk: ['aacac5','e7e9d4','fcf6d7','ffffe0','ffffd9','fef2a8','f5d5c6','e4b8ba','e2b5a4','d3b0b9','e0d7a4','bdb378','aea379'],
		evening: ['857444','9c866b','9a7a66','a07a63','bb7b62','a88683','776162','776460','563547','2e2333','18245c','1c315c','102750']
	};
	sunrise: Date;
	sunset: Date;
	currentColors: string;

	public time: BehaviorSubject<Time> = new BehaviorSubject(<Time>{});
	public animation: BehaviorSubject<Animation> = new BehaviorSubject(<Animation>{});

	public intervalCallback(): void {
		const t = this;
		// ignore these errors, dates CAN be subtracted...
		const newDate = moment();
		t.time.next(this.returnDateAsObj(newDate));
		const daylightHours = (moment(this.sunset).milliseconds() - moment(this.sunrise).milliseconds()) / 3.6e+6;
		const now = moment();
		let innerColor = '#000';
		let duration = 0;

		const timeRanges = {
			dawn      : moment(this.sunrise),
			morning   : moment(moment(this.sunrise).add(1, 'hours')['_d']),
			afternoon : moment((now.month() + 1) + '-' + now.date() + '-' + now.year() + ' ' + '12:00:00', 'M-DD-YYYY H:m:ss'),
			dusk      : moment(this.sunset),
			evening   : moment(moment(this.sunset).add(1, 'hours')['_d']),
			night     : moment(moment(this.sunset).add(2, 'hours')['_d'])
		}

		if (newDate >= timeRanges.dawn && newDate < timeRanges.morning) {
			this.currentColors = 'dawn';
			duration = timeRanges.morning - timeRanges.dawn;
		}
		else if (newDate >= timeRanges.morning && newDate < timeRanges.afternoon) {
			this.currentColors = 'morning';
			duration = timeRanges.afternoon - timeRanges.morning;
		}
		else if (newDate >= timeRanges.afternoon && newDate < timeRanges.dusk) {
			this.currentColors = 'afternoon';
			duration = timeRanges.dusk - timeRanges.afternoon;
		}
		else if (newDate >= timeRanges.dusk && newDate < timeRanges.evening) {
			this.currentColors = 'dusk';
			duration = timeRanges.evening - timeRanges.dusk;
			innerColor = '#fff';
		}
		else if (newDate >= timeRanges.evening && newDate < timeRanges.night) {
			this.currentColors = 'evening';
			duration = timeRanges.night - timeRanges.evening;
			innerColor = '#fff';
		}
		else {
			this.currentColors = 'night';
			duration = timeRanges.dawn - timeRanges.night;
			innerColor = '#fff';
		}

		const newAnimation = this.constructAnimation(this.currentColors, duration / 1000);
		newAnimation.innerColor = innerColor;
		this.animation.next(newAnimation);
	}

	public constructAnimation(category: string, duration: number) {
		const t = this;
		const activeColor = t.colors[category];
		const total = activeColor.length;
		let animation = {
			backgroundKeyframes: `@keyframes timeColors { `,
			backgroundAnimationStyle: `timeColors 1 steps(` + total + `) ` + duration + `s forwards`,
			innerColor: ``
		};
		const keyframeStep = Math.floor(100/(total - 1));
		let index = 0;

		for (let color of activeColor) {
			let newStep = index === activeColor.length - 1 ? '100' : (index * keyframeStep);
			animation.backgroundKeyframes += newStep + `% { background-color: #` + color + ` } `;
			index++;
		}

		animation.backgroundKeyframes += ` }`;

		return animation;
	}

	public returnDateAsObj(d: Moment): Time {
		if (Object.prototype.toString.call(d['_d']) === '[object Date]') {
			return {
				hours: d.hours(),
				minutes: d.minutes(),
				seconds: d.seconds()
			}
		}
	}

	public setAnimation(val: Animation) {

	}

	public init() {
		const t = this;
		t.subscriptions['weather'] = t.Weather.currentWeather.subscribe((data) => {
			if (data && data.sys) {
				const sunrise = new Date(new Date().getMilliseconds() + data.sys.sunrise * 1000);
				const sunset = new Date(new Date().getMilliseconds() + data.sys.sunset * 1000);

				if (t.sunrise != sunrise) {
					t.sunrise = sunrise;
					t.sunset  = sunset;
				}
			}
		})

    this.Interval.addCallback(this.intervalCallback.bind(this));
	}
}
