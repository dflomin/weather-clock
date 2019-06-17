import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { interval } from '../utils';
import { Moment }  from 'moment';
import * as moment from 'moment';

export interface Callback {
	callback: Function;
	trigger?: IntervalTrigger;
	lastRun?: Moment;
}

export interface IntervalTrigger {
	frequency: any;
	unit: string; 
}

@Injectable({
  providedIn: 'root'
})
export class Interval {
	callbacks: Callback[] = [];
	timeout: any;

	addCallback(cb: Function, trigger?: IntervalTrigger): number {
		if (!trigger) {
			trigger = { frequency: 1, unit: 'seconds' };
		}
		return this.callbacks.push({ callback: cb, trigger: trigger }) - 1;
	}

	removeCallback(index: number) {
		this.callbacks.splice(index, 1);
	}

	startInterval() {
		const t = this;
		const interval = 1000;
		const now = moment();
		let expected = Date.now() + interval;

		t.timeout = setTimeout(step, 1000);

		function step() {
	    var dt = Date.now() - expected;
	    if (dt > interval) {
	        // something really bad happened. Maybe the browser (tab) was inactive?
	        // possibly special handling to avoid futile "catch up" run
	    }
	    
	    for (let cb of t.callbacks) {
	    	console.log(cb.trigger.unit, 'last run: ', moment(cb.lastRun), 'now: ', now.add(cb.trigger.frequency, cb.trigger.unit), moment(cb.lastRun).add(cb.trigger.frequency, cb.trigger.unit) <= moment(now))
	    	if (!cb.lastRun || moment(cb.lastRun).add(cb.trigger.frequency, cb.trigger.unit) <= moment(now)) {
	    		cb.callback();
	    		cb.lastRun = now;
	    	}
	    }

	    expected += interval;
	    t.timeout = setTimeout(step, Math.max(0, interval - dt));
		}
	}

	clearInterval() {
		clearInterval(this.timeout);
	}

	init() {
		this.startInterval();
	}
}