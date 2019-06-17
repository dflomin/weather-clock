import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherEffectComponent } from './components/weather-effect/weather-effect.component';
import { ClockComponent } from './components/clock/clock.component';
import { ClassicClockComponent } from './components/clock/classic-clock/classic-clock.component';
import { DigitalClockComponent } from './components/clock/digital-clock/digital-clock.component';

import { Interval } from './services/interval.service';
import { TimeKeeperService } from './services/time-keeper.service';
import { WeatherTrackerService } from './services/weather-tracker.service';
import { ClockOptionsService } from './services/clock-options.service';
import { OptionsPopupComponent } from './components/options-popup/options-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherEffectComponent,
    ClockComponent,
    ClassicClockComponent,
    DigitalClockComponent,
    OptionsPopupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    WeatherTrackerService, 
    TimeKeeperService,
    ClockOptionsService,
    Interval
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
