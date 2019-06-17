import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockOptionsService {

	// classic or digital
	public clockType: BehaviorSubject<string> = new BehaviorSubject('classic');

	setClockType(type) {
		if (type === 'classic' || type === 'digital')
			this.clockType.next(type);
	}

  constructor() { }
}
