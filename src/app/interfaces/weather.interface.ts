//https://openweathermap.org/current#format
export interface Coords {
	lon: number;
	lat: number;
}

export interface Cloudiness {
	all: number; //%
}

export interface Rain {
	'3h': number; // volume over last 3 hours
}

export interface Snow {
	'3h': number; // volume over last 3 hours
}

export interface Wind {
	speed: number;
	deg: number;
}

export interface WeatherMainData {
	temp: number;
	pressure?: number;
	humidity?: number;
	temp_min?: number;
	temp_max?: number;
	sea_level?: number;
	grnd_level?: number;
}

export interface WeatherEtcData {
	type: number;
	id: number;
	message: number;
	country: string;
	sunrise: number;  // unit timestamp UTC
	sunset: number; // unit timestamp UTC
}

export interface WeatherDescription {
	id: number;
	main: string; // ? possible options
	description: string; // ? possible options
	icon: string;
}

export interface Weather {
	coord: Coords;
	base: string;
	cod: number;
	dt: number; // time of data calculation
	id: number; // city ID
	main: WeatherMainData;
	name: string; // city name
	sys: WeatherEtcData;
	visibility: number;
	weather: WeatherDescription[];
	wind?: Wind;
	rain?: Rain;
	snow?: Snow;
	clouds?: Cloudiness;
}