import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Time, TimeKeeperService, Animation } from '../../../services/time-keeper.service';
import { DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-classic-clock',
  templateUrl: './classic-clock.component.html',
  styleUrls: ['./classic-clock.component.scss']
})
export class ClassicClockComponent implements OnInit {

  constructor(private timeKeeperService: TimeKeeperService, private domSanitizer: DomSanitizer) { }

	rightMeow: Time;
	subscriptions = {};
  hours = Array(12).fill(0).map((x,i)=>i);
	minutes = Array(60).fill(0).map((x,i)=>i);
  timeColor: SafeStyle;

	positionNumerals(number: number, units: number) {
		let r = 250 - 45;
    if (units === 60) {
      r = 250 - 12;
    }

    const padding = {
      x: units === 60 ? 0 : 20,
      y: units === 60 ? 0 : 15
    }
    const x = r * Math.sin(Math.PI * 2 * (number / units));
    const y = r * Math.cos(Math.PI * 2 * (number / units));

		return { x: (x + r + padding.x) + 'px', y: (-y + r + padding.y) + 'px' };
	}

  sanitize(minute: number) {
    const str = 'translate3d(10px, 7px, 0) rotateZ(' + minute + 'deg)';
    return this.domSanitizer.bypassSecurityTrustStyle(str);
  }

  ngOnInit() {
  	this.subscriptions['rightMeow'] = this.timeKeeperService.time.subscribe((data: Time) => { 
  		this.rightMeow = { ...data };
  	});

    this.subscriptions['animation'] = this.timeKeeperService.animation.subscribe((data: Animation) => {
      this.timeColor = this.domSanitizer.bypassSecurityTrustStyle(data.innerColor);
    });
  }

}
