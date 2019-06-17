import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle} from '@angular/platform-browser';
import { ClockOptionsService } from '../../services/clock-options.service';
import { Time, TimeKeeperService, Animation } from '../../services/time-keeper.service';
import { WeatherTrackerService } from '../../services/weather-tracker.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  
  constructor(
    private clockOptions: ClockOptionsService, 
    private timeKeeperService: TimeKeeperService,
    private weatherTrackerService: WeatherTrackerService,
    private domSanitizer: DomSanitizer
  ) { }

  rightMeow: Time;
	clockType: string;
	subscriptions: object = {};
  timeAnimation: SafeStyle;

  ngOnInit() {
  	const t = this;
    this.subscriptions['clockType'] = this.clockOptions.clockType.subscribe((data: string) => { 
      t.clockType = data;
    });

  	this.subscriptions['rightMeow'] = this.timeKeeperService.time.subscribe((data: Time) => { 
  		t.rightMeow = { ...data };
  	});

    this.subscriptions['animation'] = this.timeKeeperService.animation.subscribe((data: Animation) => {
      t.timeAnimation = this.domSanitizer.bypassSecurityTrustHtml(`<style>` + data.backgroundKeyframes + `</style>`);
    });

    this.timeKeeperService.init();
  }

}
