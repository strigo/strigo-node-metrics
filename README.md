# strigo-node-metrics

A NodeJS metrics instrumentation library for Strigo.

This is a very light abstraction on top of appmetrics, which provides not only a statsd client, but also emits additional process level metrics. See [appmetrics-statsd](https://github.com/RuntimeTools/appmetrics-statsd) for reference.


## Installation

Add `"node-metrics": "strigo/node-metrics.git#TAG"` to your `package.json`.


## Usage

```javascript
const metrics = require('node-metrics');

// Initialize client for specific service (will add a statsd tag service=sam to each metric).
// This returns an unabstracted appmetrics-statsd client.
statsd = metrics.init(SERVICE_NAME);

// Counter => (metricName, kvPairs (default = {}), increment (default = 1))
metrics.increment('http_requests_total', { org_name }, 2);

const startTime = +new Date();

// Timer => (metricName, unixTime, kvPairs (default = {}))
setTimeout(() => { metrics.timing('http_response_duration_ms', startTime)}, 13);

// Gauge => (metricName, value, kvPairs (default = {}))
metrics.gauge('my_gauge', 120);

// Using the unabstracted client to send a histogram.
statsd.histogram('my_histogram,org_name=Elastic', 42);
```

### Expose to your app

Simply add this as `statsd.js` under your `src/setup` folder.

```
const metrics = require('node-metrics');
metrics.init('strigo-app');

module.exports = metrics;
```

Then you can import

```
const metrics = require('setup/statsd');
...
```


## Metrics

Metrics are emitted in Etsy's [statsd](https://github.com/etsy/statsd) format, with the addition of tags (dimensions).

### Configuration

The following environment variables are exposed:

* `STATSD_HOST` -> The host to emit metrics to (defaults to `localhost`).
* `STATSD_PORT` -> The port to emit metrics to (defaults to `8125`).
* `STATSD_PREFIX` -> A prefix to add to each metric (defaults to the name given on init).
* `STRIGO_ENV` -> The environment in which the process is running (defaults to `os.hostname()`).

### Built-in Labels

There's a single label appended by the client by default: `env=ENV`.

* `ENV` is the value of the `STRIGO_ENV` environment variable.


### Example Output

* Counter -> `http_requests_total,x=1,env=prod:1|c`
* Timer -> `http_request_duration_ms,env=prod:120|ms`
* Gauge -> `my_gauge,env=prod:15|g`


## Manual Test

You can see if metrics are being emitted by running the client and listening on localhost 8125 UDP.

On Unix: `nc -ul -p STATSD_PORT`.

On OS X: `nc -ul STATSD_PORT`.

You can run `test/manual.js` to run the aforementioned example.
