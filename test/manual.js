const metrics = require('./../');

// Initialize client for specific service (will add a statsd tag service=sam to each metric).
// This returns an unabstracted node-statsd client.
statsd = metrics.init('strigo-app');

// Counter => (metricName, kvPairs (default = {}), increment (default = 1))
metrics.increment('http_requests_total', {x: '1'}, 2);

const startTime = +new Date();

// Timer => (metricName, unixTime, kvPairs (default = {}))
setTimeout(() => { metrics.timing('http_response_duration_ms', startTime)}, 13);

// Gauge => (metricName, value, kvPairs (default = {}))
metrics.gauge('my_gauge', 120);

// Using the unabstracter client to send a histogram.
statsd.histogram('my_histogram,tag=value', 42);
