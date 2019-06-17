import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle} from '@angular/platform-browser';
import { Time, TimeKeeperService, Animation } from '../../services/time-keeper.service';

@Component({
  selector: 'app-weather-effect',
  templateUrl: './weather-effect.component.html',
  styleUrls: ['./weather-effect.component.scss']
})
export class WeatherEffectComponent implements OnInit {

	subscriptions = {};
  backgroundColor: SafeStyle;

  constructor(private timeKeeperService: TimeKeeperService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscriptions['animation'] = this.timeKeeperService.animation.subscribe((data: Animation) => {
      this.backgroundColor = this.domSanitizer.bypassSecurityTrustStyle(data.backgroundAnimationStyle);
    });
  }

}
