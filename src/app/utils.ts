export function interval(interval: number, callback: Function) {
		const expected = Date.now() + interval;

		setTimeout(step, interval);

		function step() {
	    var dt = Date.now() - expected;
	    if (dt > interval) {
	        // something really bad happened. Maybe the browser (tab) was inactive?
	        // possibly special handling to avoid futile "catch up" run
	    }
	    
	    callback();

	    this.expected += interval;
	    setTimeout(step, Math.max(0, interval - dt));
		}
}